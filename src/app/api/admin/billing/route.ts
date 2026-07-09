import type Stripe from 'stripe'
import { stripe, isTestMode, parseServices, retainerProduct, type ServiceKey } from '@/lib/billing/stripe'
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
}

type Counts = {
  active: number
  past_due: number
  canceled: number
  incomplete: number
  trialing: number
}

/** A payment link that was created but has not been paid (no subscription yet). */
type PendingLink = {
  priceId: string
  clientName: string
  amountCents: number
  interval: Interval
  services: ServiceKey[]
  payUrl: string
  expiresAt: number
  createdAt: number
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
      mrrCents += monthlyCents(amountCents, interval)
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
    }
  })

  // Pending links: active Prices on the retainer Product that carry a pay code
  // (lookup_key) but have no subscription yet. The webhook deactivates a Price
  // once its checkout completes, and we ALSO cross-check against live
  // subscriptions here, so this stays correct even if a webhook was missed.
  let pendingLinks: PendingLink[] = []
  try {
    const product = await retainerProduct()
    const prices = await s.prices
      .list({ product: product.id, active: true, limit: 100 })
      .autoPagingToArray({ limit: 1000 })

    const now = Math.floor(Date.now() / 1000)
    pendingLinks = prices
      .filter(
        (p) =>
          p.lookup_key &&
          p.metadata.zl_customer &&
          Number(p.metadata.zl_pay_exp ?? 0) > now &&
          !subscribedPriceIds.has(p.id)
      )
      .map((p) => ({
        priceId: p.id,
        clientName: p.metadata.zl_client || '—',
        amountCents: p.unit_amount ?? 0,
        interval: (p.recurring?.interval ?? 'month') as Interval,
        services: parseServices(p.metadata.zl_services),
        payUrl: `${SITE_URL}/pay/${p.lookup_key}`,
        expiresAt: Number(p.metadata.zl_pay_exp),
        createdAt: p.created,
      }))
      .sort((a, b) => b.createdAt - a.createdAt)
  } catch (err) {
    // A pending-links failure must not take down the whole dashboard.
    console.error('[admin.billing] pending links failed:', err instanceof Error ? err.message : err)
  }

  return Response.json({
    testMode: isTestMode(),
    mrrCents,
    counts,
    subscriptions,
    pendingLinks,
  })
}
