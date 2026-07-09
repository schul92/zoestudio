import type Stripe from 'stripe'
import { stripe } from '@/lib/billing/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/stripe/webhook   [PUBLIC, signature verified]
 *
 * Verifies the Stripe signature against the RAW request body, then logs a
 * structured line per handled event. There is no database yet — Stripe stays the
 * source of truth and the dashboard reads live — so these handlers only observe.
 * We always return 200 quickly on success so Stripe does not retry.
 */

// Reference a couple of ids without leaking full customer / bank / card data.
function log(event: string, fields: Record<string, string | number | null | undefined>) {
  const parts = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}=${v}`)
  console.log(`[stripe.webhook] ${event} ${parts.join(' ')}`.trim())
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
        customer: typeof inv.customer === 'string' ? inv.customer : (inv.customer?.id ?? null),
        amountDue: inv.amount_due,
        attempt: inv.attempt_count,
      })
      break
    }
    case 'invoice.paid': {
      const inv = evt.data.object
      log('invoice.paid', {
        invoice: inv.id,
        customer: typeof inv.customer === 'string' ? inv.customer : (inv.customer?.id ?? null),
        amountPaid: inv.amount_paid,
      })
      break
    }
    case 'customer.subscription.deleted': {
      const sub = evt.data.object
      log('customer.subscription.deleted', {
        subscription: sub.id,
        customer: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
        status: sub.status,
      })
      break
    }
    case 'customer.subscription.updated': {
      const sub = evt.data.object
      log('customer.subscription.updated', {
        subscription: sub.id,
        customer: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
        status: sub.status,
        cancelAtPeriodEnd: String(sub.cancel_at_period_end),
      })
      break
    }
    case 'checkout.session.completed': {
      const cs = evt.data.object
      log('checkout.session.completed', {
        session: cs.id,
        customer: typeof cs.customer === 'string' ? cs.customer : (cs.customer?.id ?? null),
        subscription:
          typeof cs.subscription === 'string' ? cs.subscription : (cs.subscription?.id ?? null),
        paymentStatus: cs.payment_status,
      })
      break
    }
    default:
      // Acknowledge everything else so Stripe stops retrying.
      break
  }

  return Response.json({ received: true })
}
