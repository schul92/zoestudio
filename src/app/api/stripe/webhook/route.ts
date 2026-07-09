import type Stripe from 'stripe'
import { stripe } from '@/lib/billing/stripe'
import {
  sendPaymentConfirmation,
  sendPaymentFailed,
  sendNewPaymentAlert,
  sendCancellationAlert,
} from '@/lib/billing/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/stripe/webhook   [PUBLIC, signature verified]
 *
 * Stripe's callback for money events. Verifies the signature against the RAW
 * request body, then notifies: the client on success/failure, and the owner on
 * failure and on every new subscription.
 *
 * There is no database — Stripe stays the source of truth and /admin/billing
 * reads live. These handlers only observe and notify.
 *
 * We always return 200 unless the signature is bad, so Stripe never retries an
 * event we already acted on. Every send path swallows its own errors for the
 * same reason: a Gmail hiccup must not replay a payment notification.
 */

// Reference a couple of ids without leaking full customer / bank / card data.
function log(event: string, fields: Record<string, string | number | null | undefined>) {
  const parts = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}=${v}`)
  console.log(`[stripe.webhook] ${event} ${parts.join(' ')}`.trim())
}

const idOf = (
  ref: string | { id: string } | { id: string; deleted: true } | null | undefined
): string | null => (typeof ref === 'string' ? ref : (ref?.id ?? null))

/**
 * Who to address, and by what name. Falls back through email -> "고객님" so a
 * customer without a name never produces a blank greeting. Returns null email
 * when the customer was deleted or has none — the caller decides whether that
 * is fatal (client mail) or not (owner mail).
 */
async function client(customerRef: unknown): Promise<{ email: string | null; name: string }> {
  const id = idOf(customerRef as Parameters<typeof idOf>[0])
  if (!id) return { email: null, name: '고객님' }

  try {
    const customer = await stripe().customers.retrieve(id)
    if (customer.deleted) return { email: null, name: '고객님' }
    return {
      email: customer.email ?? null,
      name: customer.name || customer.email || '고객님',
    }
  } catch {
    return { email: null, name: '고객님' }
  }
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    // Never process unverified events.
    return Response.json(
      { error: 'STRIPE_WEBHOOK_SECRET is not set; refusing to process unverified events' },
      { status: 500 }
    )
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return Response.json({ error: 'missing stripe-signature header' }, { status: 400 })

  const raw = await req.text()

  let evt: Stripe.Event
  try {
    evt = stripe().webhooks.constructEvent(raw, sig, secret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid signature'
    console.warn(`[stripe.webhook] signature verification failed: ${message}`)
    return Response.json({ error: 'invalid signature' }, { status: 400 })
  }

  switch (evt.type) {
    case 'invoice.payment_failed': {
      const inv = evt.data.object
      log('invoice.payment_failed', {
        invoice: inv.id,
        customer: idOf(inv.customer),
        amountDue: inv.amount_due,
        attempt: inv.attempt_count,
      })

      const { email, name } = await client(inv.customer)
      await sendPaymentFailed({
        to: email,
        clientName: name,
        amountCents: inv.amount_due,
        invoiceUrl: inv.hosted_invoice_url ?? null,
        attempt: inv.attempt_count ?? 1,
      })
      break
    }

    case 'invoice.paid': {
      const inv = evt.data.object
      log('invoice.paid', {
        invoice: inv.id,
        customer: idOf(inv.customer),
        amountPaid: inv.amount_paid,
      })

      // A $0 invoice (trial, full coupon) is not a payment worth announcing.
      if (inv.amount_paid <= 0) break

      const { email, name } = await client(inv.customer)
      if (!email) break

      await sendPaymentConfirmation({
        to: email,
        clientName: name,
        amountCents: inv.amount_paid,
        invoiceUrl: inv.hosted_invoice_url ?? null,
        testMode: !evt.livemode,
      })
      break
    }

    case 'customer.subscription.deleted': {
      const sub = evt.data.object
      log('customer.subscription.deleted', {
        subscription: sub.id,
        customer: idOf(sub.customer),
        status: sub.status,
      })
      break
    }

    case 'customer.subscription.updated': {
      const sub = evt.data.object
      log('customer.subscription.updated', {
        subscription: sub.id,
        customer: idOf(sub.customer),
        status: sub.status,
        cancelAtPeriodEnd: String(sub.cancel_at_period_end),
      })

      // This event fires on any change (price, payment method, period roll), so
      // alert only on the false -> true transition. previous_attributes carries
      // ONLY the fields that changed, which is exactly the signal we want:
      // an undo (true -> false) leaves previous = true and is skipped.
      const previous = evt.data.previous_attributes as
        | { cancel_at_period_end?: boolean }
        | undefined
      const justScheduledToCancel =
        sub.cancel_at_period_end === true && previous?.cancel_at_period_end === false

      if (justScheduledToCancel) {
        const { email, name } = await client(sub.customer)
        await sendCancellationAlert({
          clientName: name,
          amountCents: sub.items.data[0]?.price.unit_amount ?? 0,
          email,
          endsAt: sub.items.data[0]?.current_period_end ?? null,
        })
      }
      break
    }

    case 'checkout.session.completed': {
      const cs = evt.data.object
      log('checkout.session.completed', {
        session: cs.id,
        customer: idOf(cs.customer),
        mode: cs.mode,
        subscription: idOf(cs.subscription),
        paymentStatus: cs.payment_status,
      })

      // The pay link is single-use: deactivate its Price so /pay/<code> stops
      // resolving. Existing subscriptions (including this one) keep renewing on
      // an inactive Price — Stripe only blocks NEW checkouts against it.
      const priceId = cs.metadata?.zl_price
      if (priceId) {
        try {
          await stripe().prices.update(priceId, { active: false })
        } catch (err) {
          console.warn(
            `[stripe.webhook] could not deactivate ${priceId}:`,
            err instanceof Error ? err.message : err
          )
        }
      }

      // Owner alert only. The CLIENT's confirmation comes from invoice.paid,
      // which fires for one-time payments too (invoice_creation is on), so
      // sending here as well would double-email them.
      //
      // ACH debits reach this point as 'unpaid' and settle days later; announce
      // the signup either way — this is the "a client just paid" signal.
      const { email, name } = await client(cs.customer)
      await sendNewPaymentAlert({
        clientName: name,
        amountCents: cs.amount_total ?? 0,
        email: email ?? cs.customer_details?.email ?? null,
        kind: cs.mode === 'subscription' ? 'subscription' : 'one_time',
        pending: cs.payment_status !== 'paid',
      })
      break
    }

    // A one-time ACH debit bounced. There is no invoice yet, so
    // invoice.payment_failed never fires — this is the only signal.
    case 'checkout.session.async_payment_failed': {
      const cs = evt.data.object
      log('checkout.session.async_payment_failed', {
        session: cs.id,
        customer: idOf(cs.customer),
        amountTotal: cs.amount_total,
      })

      const { email, name } = await client(cs.customer)
      await sendPaymentFailed({
        to: email ?? cs.customer_details?.email ?? null,
        clientName: name,
        amountCents: cs.amount_total ?? 0,
        invoiceUrl: null,
        attempt: 1,
      })
      break
    }

    default:
      // Acknowledge everything else so Stripe stops retrying.
      break
  }

  return Response.json({ received: true })
}
