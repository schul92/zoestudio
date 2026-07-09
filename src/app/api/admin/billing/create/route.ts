import { createHash } from 'crypto'
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

  // Idempotency key: a double-click with identical inputs must not create a
  // second Price. Derived from the inputs that define the Price.
  const idemBasis = [email, amountCents, interval, services.slice().sort().join(',')].join('|')
  const idempotencyKey = 'price_' + createHash('sha256').update(idemBasis).digest('hex').slice(0, 40)

  // The short code becomes the Price's lookup_key, so /pay/<code> resolves back
  // to (customer, price) without a database — and reads it back immediately,
  // which prices.search cannot do. Expiry travels alongside in metadata.
  const payCode = newPayCode()
  const payExp = Math.floor(Date.now() / 1000) + PAY_LINK_TTL_SECONDS

  const price = await s.prices.create(
    {
      product: product.id,
      unit_amount: amountCents,
      currency: 'usd',
      recurring: { interval },
      nickname: `${name} - ${fmtUSD(amountCents)}/${interval}`,
      lookup_key: payCode,
      metadata: {
        zl_services: services.join(','),
        zl_client: name,
        zl_customer: customer.id,
        zl_pay_exp: String(payExp),
      },
    },
    { idempotencyKey }
  )

  // If idempotency replayed an earlier Price, reuse the code it already carries
  // so the two links never diverge.
  const code = price.lookup_key || payCode

  const origin = SITE_URL || new URL(req.url).origin
  const payUrl = `${origin}/pay/${code}`

  return Response.json({ customerId: customer.id, priceId: price.id, payUrl })
}
