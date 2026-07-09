import {
  stripe,
  retainerProduct,
  fmtUSD,
  isServiceKey,
  type ServiceKey,
} from '@/lib/billing/stripe'
import { newPayCode } from '@/lib/billing/paycode'
import { authed, unauthorized } from '@/lib/admin/guard'
import { SITE_URL } from '@/lib/siteUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** How long a payment link stays usable. Long enough to email, short enough to expire. */
const PAY_LINK_TTL_SECONDS = 60 * 60 * 24 * 30

/**
 * POST /api/admin/billing/create
 *
 * Provision a client for billing: reuse-or-create the Stripe customer, mint a
 * per-client recurring Price on the single shared retainer Product, and return a
 * short /pay link. No amount is ever trusted from the client side after this —
 * it is baked into the Price, which the short code resolves to.
 */

const AMOUNT_MIN = 100 // $1.00
const AMOUNT_MAX = 5_000_000 // $50,000.00
// Deliberately conservative RFC-ish check: something@something.tld
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function bad(message: string, status = 400) {
  return Response.json({ error: message }, { status })
}

type Body = {
  name?: unknown
  email?: unknown
  amountCents?: unknown
  services?: unknown
  interval?: unknown
}

export async function POST(req: Request) {
  if (!(await authed())) return unauthorized()

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return bad('invalid_json')
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const amountCents = body.amountCents
  const interval: 'month' | 'year' = body.interval === 'year' ? 'year' : 'month'

  if (!name) return bad('name is required')
  if (!email || !EMAIL_RE.test(email)) return bad('a valid email is required')
  if (typeof amountCents !== 'number' || !Number.isInteger(amountCents)) {
    return bad('amountCents must be an integer number of cents')
  }
  if (amountCents < AMOUNT_MIN) return bad('amountCents must be at least 100 ($1)')
  if (amountCents > AMOUNT_MAX) return bad('amountCents must be at most 5000000 ($50k)')

  // Keep only known service keys; silently drop anything unrecognized.
  const rawServices = Array.isArray(body.services) ? body.services : []
  const services: ServiceKey[] = rawServices
    .filter((s): s is string => typeof s === 'string')
    .map((s) => s.trim())
    .filter(isServiceKey)

  const s = stripe()

  // Reuse an existing customer with the same email, else create one.
  const existing = await s.customers.list({ email, limit: 1 })
  const found = existing.data[0]
  const customer =
    found ??
    (await s.customers.create({
      email,
      name,
      metadata: { zl_client: name },
    }))

  const product = await retainerProduct()
  const now = Math.floor(Date.now() / 1000)
  const payExp = now + PAY_LINK_TTL_SECONDS
  const servicesCsv = services.join(',')

  // Double-click / re-issue protection, done as a read instead of an
  // idempotency key (a random lookup_key per request makes Stripe's key replay
  // impossible — same key + different params is a hard error). If an unpaid,
  // unexpired link already exists for this exact (customer, amount, interval,
  // services), hand it back — refreshed to a full TTL — so the owner can
  // "re-create" a link to resend it and the client always holds ONE live link.
  const [activePrices, custSubs] = await Promise.all([
    s.prices.list({ product: product.id, active: true, limit: 100 }).autoPagingToArray({ limit: 1000 }),
    s.subscriptions.list({ customer: customer.id, status: 'all', limit: 100 }),
  ])

  // A price already carrying a live subscription is a USED link, not a pending
  // one — never hand it back (the webhook normally deactivates these, but it
  // may not have fired, or may not be configured yet).
  const LIVE: readonly string[] = ['active', 'trialing', 'past_due', 'unpaid']
  const usedPriceIds = new Set(
    custSubs.data
      .filter((sub) => LIVE.includes(sub.status))
      .flatMap((sub) => sub.items.data.map((it) => it.price.id))
  )

  const reusable = activePrices.find(
    (p) =>
      p.lookup_key &&
      !usedPriceIds.has(p.id) &&
      p.metadata.zl_customer === customer.id &&
      p.unit_amount === amountCents &&
      p.recurring?.interval === interval &&
      (p.metadata.zl_services ?? '') === servicesCsv &&
      Number(p.metadata.zl_pay_exp ?? 0) > now
  )

  const origin = SITE_URL || new URL(req.url).origin

  if (reusable) {
    await s.prices.update(reusable.id, {
      metadata: { ...reusable.metadata, zl_pay_exp: String(payExp) },
    })
    return Response.json({
      customerId: customer.id,
      priceId: reusable.id,
      payUrl: `${origin}/pay/${reusable.lookup_key}`,
      reused: true,
    })
  }

  // The short code becomes the Price's lookup_key, so /pay/<code> resolves back
  // to (customer, price) without a database — and reads it back immediately,
  // which prices.search cannot do. Expiry travels alongside in metadata.
  const payCode = newPayCode()

  const price = await s.prices.create({
    product: product.id,
    unit_amount: amountCents,
    currency: 'usd',
    recurring: { interval },
    nickname: `${name} - ${fmtUSD(amountCents)}/${interval}`,
    lookup_key: payCode,
    metadata: {
      zl_services: servicesCsv,
      zl_client: name,
      zl_customer: customer.id,
      zl_pay_exp: String(payExp),
    },
  })

  return Response.json({
    customerId: customer.id,
    priceId: price.id,
    payUrl: `${origin}/pay/${payCode}`,
  })
}
