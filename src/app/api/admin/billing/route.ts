import type Stripe from 'stripe'
import { stripe, isTestMode, parseServices, type ServiceKey } from '@/lib/billing/stripe'
import { authed, unauthorized } from '@/lib/admin/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/billing
 *
 * Live billing dashboard payload. Stripe is the single source of truth — we read
 * every subscription (all statuses) on each request, exactly like the rest of the
 * admin dashboard reads GA4 / Search Console / Google Ads live. No local database.
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

  const list = await stripe().subscriptions.list({
    status: 'all',
    limit: 100,
    expand: ['data.customer', 'data.default_payment_method', 'data.latest_invoice'],
  })

  let mrrCents = 0
  const counts: Counts = { active: 0, past_due: 0, canceled: 0, incomplete: 0, trialing: 0 }

  const subscriptions: SubscriptionRow[] = list.data.map((sub) => {
    // The primary (and, for our retainer model, only) line item carries the price
    // and — in this API version — the current period window.
    const item = sub.items.data[0]
    const price = item?.price
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

  return Response.json({
    testMode: isTestMode(),
    mrrCents,
    counts,
    subscriptions,
  })
}
