import { stripe } from '@/lib/billing/stripe'
import { resolvePaySegment } from '@/lib/billing/resolve'
import { SITE_URL } from '@/lib/siteUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/checkout   [PUBLIC — but only usable with a valid signed token]
 *
 * Creates an EMBEDDED Checkout session from a signed /pay token. The customer and
 * price come ONLY from the verified token — never from the request body — so a
 * client cannot alter the amount or bill a different customer.
 *
 * ACH (us_bank_account) is listed first so it is the default payment method
 * (0.8% capped at $5 vs 2.9% + 30c on cards).
 */

type Body = { token?: unknown }

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'invalid_or_expired' }, { status: 400 })
  }

  const token = typeof body.token === 'string' ? body.token : ''
  // Accepts either a short code or a legacy signed token; both resolve to the
  // same (customer, price). The amount never comes from the request body.
  const payload = await resolvePaySegment(token)
  if (!payload) return Response.json({ error: 'invalid_or_expired' }, { status: 400 })

  // A link is single-use: if this (customer, price) pair already carries a live
  // subscription, refuse to open a second checkout — otherwise a client who
  // taps a 30-day link twice would be billed twice. `incomplete` is deliberately
  // NOT blocked: that is the retry path after a failed first payment.
  const existing = await stripe().subscriptions.list({
    customer: payload.customerId,
    price: payload.priceId,
    status: 'all',
    limit: 10,
  })
  const LIVE: readonly string[] = ['active', 'trialing', 'past_due', 'unpaid']
  if (existing.data.some((sub) => LIVE.includes(sub.status))) {
    return Response.json({ error: 'already_subscribed' }, { status: 409 })
  }

  const session = await stripe().checkout.sessions.create({
    mode: 'subscription',
    // Clover-era API: the embedded UI mode is 'embedded_page'.
    ui_mode: 'embedded_page',
    customer: payload.customerId,
    line_items: [{ price: payload.priceId, quantity: 1 }],
    // ACH first, deliberately: 0.8% capped at $5 versus 2.9% + 30c on cards.
    // On a $500/mo retainer that is $78/yr instead of $208/yr. Checkout renders
    // the methods in this order, so the cheaper rail is what the client sees
    // first. (Link is disabled account-side — it is card-backed and was burying
    // the bank option behind a full-width wallet button.)
    payment_method_types: ['us_bank_account', 'card'],
    payment_method_options: {
      us_bank_account: {
        // Financial Connections: the client picks their bank and is verified in
        // seconds, instead of waiting 1-2 days for micro-deposits.
        verification_method: 'instant',
      },
    },
    return_url: `${SITE_URL}/pay/${token}?done={CHECKOUT_SESSION_ID}`,
    // zl_price on the session lets the webhook deactivate the pay link the
    // moment this checkout completes, without extra lookups.
    metadata: { zl_price: payload.priceId },
    subscription_data: { metadata: { zl_price: payload.priceId } },
    saved_payment_method_options: { payment_method_save: 'enabled' },
  })

  return Response.json({ clientSecret: session.client_secret })
}
