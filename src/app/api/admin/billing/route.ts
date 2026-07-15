import type Stripe from 'stripe'
import {
  stripe,
  isTestMode,
  parseServices,
  billingProducts,
  type ServiceKey,
  type BillingPeriod,
} from '@/lib/billing/stripe'
import { authed, unauthorized } from '@/lib/admin/guard'
import { SITE_URL } from '@/lib/siteUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/billing
 *
 * Live billing dashboard payload. Stripe is the single source of truth — we read
 * every subscription (all statuses) on each request, exactly like the rest of the
 * admin dashboard reads GA4 / Search Console / Google Ads live. No local database.
 *
 * Also surfaces "pending" payment links: a client we sent a link to but who has
 * not paid yet has NO subscription, so without this they would be invisible on
 * the dashboard entirely.
 */

type Interval = 'day' | 'week' | 'month' | 'year'
type PaymentMethodKind = 'us_bank_account' | 'card' | null

type LatestInvoice = {
  id: string
  status: Stripe.Invoice.Status | null
  hostedUrl: string | null
  amountDue: number
  dueDate: number | null
} | null

type SubscriptionRow = {
  id: string
  customerId: string
  customerName: string | null
  customerEmail: string | null
  status: Stripe.Subscription.Status
  amountCents: number
  interval: Interval
  services: ServiceKey[]
  currentPeriodEnd: number
  latestInvoice: LatestInvoice
  defaultPaymentMethod: PaymentMethodKind
  delinquent: boolean
  createdAt: number
  /** Scheduled to end: still active and serving, but will not renew. */
  cancelAtPeriodEnd: boolean
}

type Counts = {
  active: number
  past_due: number
  canceled: number
  incomplete: number
  trialing: number
}

/** A payment link that was created but has not been paid yet. */
type PendingLink = {
  priceId: string
  clientName: string
  clientEmail: string | null
  amountCents: number
  interval: BillingPeriod
  services: ServiceKey[]
  payUrl: string
  expiresAt: number
  createdAt: number
  /** Reminder history, kept on the Price metadata — see lib/billing/reminders. */
  remindedAt: number | null
  reminderCount: number
}

/** A completed one-time payment. These leave no subscription behind, so without
 *  this the money would never appear on the dashboard. */
type OneTimePayment = {
  sessionId: string
  clientName: string
  clientEmail: string | null
  amountCents: number
  /** 'paid' once the money landed; ACH sits at 'processing' for a few days;
   *  'refunded' when we gave the whole charge back. */
  status: 'paid' | 'processing' | 'refunded'
  /** What we actually kept: amount minus any refunds. */
  netCents: number
  paidAt: number
}

/** Normalize any recurring interval to a monthly-equivalent amount for MRR. */
function monthlyCents(amountCents: number, interval: Interval): number {
  switch (interval) {
    case 'year':
      return Math.round(amountCents / 12)
    case 'week':
      return Math.round((amountCents * 52) / 12)
    case 'day':
      return Math.round((amountCents * 365) / 12)
    case 'month':
    default:
      return amountCents
  }
}

export async function GET() {
  if (!(await authed())) return unauthorized()

  const s = stripe()

  // Auto-paginate: a plain list({limit: 100}) silently truncates the dashboard
  // (and understates MRR) once we pass 100 subscriptions. 1000 is a safety cap,
  // not a target — at ~$200/client that would be $200k+ MRR.
  const allSubs = await s.subscriptions
    .list({
      status: 'all',
      limit: 100,
      expand: ['data.customer', 'data.default_payment_method', 'data.latest_invoice'],
    })
    .autoPagingToArray({ limit: 1000 })

  let mrrCents = 0
  // Portion of MRR that is scheduled to stop renewing. Counted inside mrrCents
  // (the subscription is still active and still serving this period), but
  // surfaced separately so "MRR $700" never hides "$200 of that ends this month".
  let endingMrrCents = 0
  const counts: Counts = { active: 0, past_due: 0, canceled: 0, incomplete: 0, trialing: 0 }
  // Price ids already attached to a subscription — used to tell "link sent but
  // never paid" apart from "paid" below.
  const subscribedPriceIds = new Set<string>()

  const subscriptions: SubscriptionRow[] = allSubs.map((sub) => {
    // The primary (and, for our retainer model, only) line item carries the price
    // and — in this API version — the current period window.
    const item = sub.items.data[0]
    const price = item?.price
    if (price?.id) subscribedPriceIds.add(price.id)
    const amountCents = price?.unit_amount ?? 0
    const interval: Interval = price?.recurring?.interval ?? 'month'
    const services = parseServices(price?.metadata?.zl_services)

    // Customer can be an id (unexpanded), a deleted customer, or a full customer.
    let customerId: string
    let customerName: string | null = null
    let customerEmail: string | null = null
    let delinquent = false
    const cust = sub.customer
    if (typeof cust === 'string') {
      customerId = cust
    } else if (cust.deleted) {
      customerId = cust.id
    } else {
      customerId = cust.id
      customerName = cust.name ?? null
      customerEmail = cust.email ?? null
      delinquent = cust.delinquent ?? false
    }

    // latest_invoice is a string id (unexpanded) or a full Invoice; we expanded it.
    let latestInvoice: LatestInvoice = null
    const inv = sub.latest_invoice
    if (inv && typeof inv !== 'string') {
      latestInvoice = {
        id: inv.id ?? '',
        status: inv.status,
        hostedUrl: inv.hosted_invoice_url ?? null,
        amountDue: inv.amount_due,
        dueDate: inv.due_date,
      }
    }

    // default_payment_method is a string id (unexpanded) or a full PaymentMethod.
    let defaultPaymentMethod: PaymentMethodKind = null
    const pm = sub.default_payment_method
    if (pm && typeof pm !== 'string') {
      if (pm.type === 'us_bank_account') defaultPaymentMethod = 'us_bank_account'
      else if (pm.type === 'card') defaultPaymentMethod = 'card'
    }

    // Tally status counts and MRR (active + trialing only).
    switch (sub.status) {
      case 'active':
        counts.active += 1
        break
      // `unpaid` is what a subscription becomes after Stripe exhausts its
      // retries — money is still owed, so it belongs in the past-due KPI.
      case 'past_due':
      case 'unpaid':
        counts.past_due += 1
        break
      case 'canceled':
        counts.canceled += 1
        break
      case 'trialing':
        counts.trialing += 1
        break
      case 'incomplete':
      case 'incomplete_expired':
        counts.incomplete += 1
        break
      default:
        break
    }
    if (sub.status === 'active' || sub.status === 'trialing') {
      const monthly = monthlyCents(amountCents, interval)
      mrrCents += monthly
      if (sub.cancel_at_period_end) endingMrrCents += monthly
    }

    return {
      id: sub.id,
      customerId,
      customerName,
      customerEmail,
      status: sub.status,
      amountCents,
      interval,
      services,
      currentPeriodEnd: item?.current_period_end ?? 0,
      latestInvoice,
      defaultPaymentMethod,
      delinquent,
      createdAt: sub.created,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    }
  })

  // Every completed checkout, so we can (a) surface one-time payments, which
  // leave no subscription behind, and (b) tell a spent pay link from a pending
  // one even when the webhook that burns links never fired.
  let pendingLinks: PendingLink[] = []
  let oneTimePayments: OneTimePayment[] = []
  // Money actually kept from one-time work (paid, net of refunds) and money
  // still in flight (ACH debits that cleared checkout but not the bank).
  let oneTimeReceivedCents = 0
  let oneTimeProcessingCents = 0
  try {
    const [products, sessions, charges] = await Promise.all([
      billingProducts(),
      s.checkout.sessions.list({ limit: 100, expand: ['data.customer'] }).autoPagingToArray({ limit: 1000 }),
      // Sessions never learn about refunds — the charge ledger does. Keyed by
      // PaymentIntent so each one-time session can find its refund state.
      s.charges.list({ limit: 100 }).autoPagingToArray({ limit: 1000 }),
    ])

    const refundedByIntent = new Map<string, number>()
    for (const ch of charges) {
      const pi = typeof ch.payment_intent === 'string' ? ch.payment_intent : ch.payment_intent?.id
      if (!pi || !ch.amount_refunded) continue
      refundedByIntent.set(pi, (refundedByIntent.get(pi) ?? 0) + ch.amount_refunded)
    }

    const completed = sessions.filter((cs) => cs.status === 'complete')
    const spentPrices = new Set(
      completed.map((cs) => cs.metadata?.zl_price).filter((id): id is string => Boolean(id))
    )

    const nameOf = (cs: Stripe.Checkout.Session) => {
      const cust = cs.customer
      if (cust && typeof cust !== 'string' && !cust.deleted) return cust.name || cust.email || '—'
      return cs.customer_details?.name || cs.customer_details?.email || '—'
    }
    const emailOf = (cs: Stripe.Checkout.Session) => {
      const cust = cs.customer
      if (cust && typeof cust !== 'string' && !cust.deleted && cust.email) return cust.email
      return cs.customer_details?.email ?? null
    }

    oneTimePayments = completed
      .filter((cs) => cs.mode === 'payment')
      .map((cs) => {
        const amount = cs.amount_total ?? 0
        const pi = typeof cs.payment_intent === 'string' ? cs.payment_intent : cs.payment_intent?.id
        const refunded = pi ? (refundedByIntent.get(pi) ?? 0) : 0
        const net = Math.max(0, amount - refunded)
        // ACH clears the checkout screen days before it clears the bank; a
        // fully refunded charge kept us nothing regardless of how it settled.
        const status =
          refunded >= amount && amount > 0
            ? ('refunded' as const)
            : cs.payment_status === 'paid'
              ? ('paid' as const)
              : ('processing' as const)
        if (status === 'paid') oneTimeReceivedCents += net
        if (status === 'processing') oneTimeProcessingCents += amount
        return {
          sessionId: cs.id,
          clientName: nameOf(cs),
          clientEmail: emailOf(cs),
          amountCents: amount,
          status,
          netCents: net,
          paidAt: cs.created,
        }
      })
      .sort((a, b) => b.paidAt - a.paidAt)

    const productIds = new Set(products.map((p) => p.id))
    const prices = (
      await Promise.all(
        products.map((product) =>
          s.prices.list({ product: product.id, active: true, limit: 100 }).autoPagingToArray({ limit: 1000 })
        )
      )
    ).flat()

    const now = Math.floor(Date.now() / 1000)
    pendingLinks = prices
      .filter(
        (p) =>
          p.lookup_key &&
          p.metadata.zl_customer &&
          typeof p.product === 'string' &&
          productIds.has(p.product) &&
          Number(p.metadata.zl_pay_exp ?? 0) > now &&
          !subscribedPriceIds.has(p.id) &&
          !spentPrices.has(p.id)
      )
      .map((p) => ({
        priceId: p.id,
        clientName: p.metadata.zl_client || '—',
        clientEmail: null,
        amountCents: p.unit_amount ?? 0,
        // A Price with no `recurring` is a one-time charge.
        interval: (p.recurring?.interval ?? 'once') as BillingPeriod,
        services: parseServices(p.metadata.zl_services),
        payUrl: `${SITE_URL}/pay/${p.lookup_key}`,
        expiresAt: Number(p.metadata.zl_pay_exp),
        createdAt: p.created,
        remindedAt: Number(p.metadata.zl_reminded_at ?? 0) || null,
        reminderCount: Number(p.metadata.zl_reminder_count ?? 0),
      }))
      .sort((a, b) => b.createdAt - a.createdAt)
  } catch (err) {
    // A links/payments failure must not take down the whole dashboard.
    console.error('[admin.billing] links or one-time payments failed:', err instanceof Error ? err.message : err)
  }

  return Response.json({
    testMode: isTestMode(),
    mrrCents,
    endingMrrCents,
    counts,
    subscriptions,
    pendingLinks,
    oneTimePayments,
    oneTimeReceivedCents,
    oneTimeProcessingCents,
  })
}
