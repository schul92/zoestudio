import { stripe } from '@/lib/billing/stripe'
import { verifyPayToken } from '@/lib/billing/token'
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
  const payload = verifyPayToken(token)
  if (!payload) return Response.json({ error: 'invalid_or_expired' }, { status: 400 })

  const session = await stripe().checkout.sessions.create({
    mode: 'subscription',
    // Clover-era API: the embedded UI mode is 'embedded_page'.
    ui_mode: 'embedded_page',
    customer: payload.c,
    line_items: [{ price: payload.p, quantity: 1 }],
    payment_method_types: ['us_bank_account', 'card'],
    return_url: `${SITE_URL}/pay/${token}?done={CHECKOUT_SESSION_ID}`,
    subscription_data: { metadata: { zl_price: payload.p } },
    saved_payment_method_options: { payment_method_save: 'enabled' },
  })

  return Response.json({ clientSecret: session.client_secret })
}
