import type Stripe from 'stripe'
import { stripe } from '@/lib/billing/stripe'
import { resolvePaySegment } from '@/lib/billing/resolve'
import { spentPriceIds } from '@/lib/billing/spent'
import { SITE_URL } from '@/lib/siteUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/checkout   [PUBLIC — but only usable with a valid /pay link]
 *
 * Creates an EMBEDDED Checkout session from a short pay code (or a legacy signed
 * token). The customer and price come ONLY from the resolved link — never from
 * the request body — so a client cannot alter the amount or bill someone else.
 *
 * The Price decides the mode: a Price with `recurring` opens a subscription,
 * one without opens a single payment. One link shape, both products.
 */

type Body = { token?: unknown }

/**
 * ACH is far cheaper than cards — 0.8% capped at $5 versus 2.9% + 30c, which on
 * a $500/mo retainer is $78/yr instead of $208/yr.
 *
 * This array does NOT control the display order. Stripe: "If multiple payment
 * methods are passed, Checkout will dynamically reorder them to prioritize the
 * most relevant payment methods based on the customer's location and other
 * characteristics." There is no ordering knob for embedded Checkout, so the
 * /pay page nudges toward the bank option in copy above the form instead.
 *
 * (Link is disabled account-side — it is card-backed and was burying the bank
 * option behind a full-width wallet button.)
 */
const PAYMENT_METHOD_TYPES = ['us_bank_account', 'card'] as const

const PAYMENT_METHOD_OPTIONS = {
  us_bank_account: {
    // Financial Connections: the client picks their bank and is verified in
    // seconds, instead of waiting 1-2 days for micro-deposits.
    verification_method: 'instant',
  },
} as const

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'invalid_or_expired' }, { status: 400 })
  }

  const token = typeof body.token === 'string' ? body.token : ''
  const payload = await resolvePaySegment(token)
  if (!payload) return Response.json({ error: 'invalid_or_expired' }, { status: 400 })

  const s = stripe()
  const [price, spent] = await Promise.all([
    s.prices.retrieve(payload.priceId),
    // A link is single-use. Refuse a second checkout rather than charge twice —
    // this holds even when the webhook that burns the link never fired.
    spentPriceIds(payload.customerId),
  ])

  if (spent.has(payload.priceId)) {
    return Response.json({ error: 'already_paid' }, { status: 409 })
  }

  const common = {
    // Clover-era API: the embedded UI mode is 'embedded_page'.
    ui_mode: 'embedded_page',
    customer: payload.customerId,
    line_items: [{ price: payload.priceId, quantity: 1 }],
    payment_method_types: [...PAYMENT_METHOD_TYPES],
    payment_method_options: PAYMENT_METHOD_OPTIONS,
    return_url: `${SITE_URL}/pay/${token}?done={CHECKOUT_SESSION_ID}`,
    // zl_price on the session lets the webhook burn the pay link the moment
    // this checkout completes, and lets spentPriceIds() see one-time payments.
    metadata: { zl_price: payload.priceId },
  } satisfies Partial<Stripe.Checkout.SessionCreateParams>

  const session = price.recurring
    ? await s.checkout.sessions.create({
        ...common,
        mode: 'subscription',
        subscription_data: { metadata: { zl_price: payload.priceId } },
        saved_payment_method_options: { payment_method_save: 'enabled' },
      })
    : await s.checkout.sessions.create({
        ...common,
        mode: 'payment',
        // No card is stored for a one-off: there is nothing to charge again.
        payment_intent_data: { metadata: { zl_price: payload.priceId } },
        // A one-time payment should produce a receipt the client can keep.
        invoice_creation: { enabled: true },
      })

  return Response.json({ clientSecret: session.client_secret })
}
