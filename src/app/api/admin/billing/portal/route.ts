import Stripe from 'stripe'
import { stripe } from '@/lib/billing/stripe'
import { authed, unauthorized } from '@/lib/admin/guard'
import { SITE_URL } from '@/lib/siteUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/admin/billing/portal
 *
 * Open a Stripe Billing Portal session for a customer so the operator (or the
 * client) can manage payment methods and invoices. The portal must be enabled
 * once in the Stripe dashboard; if it is not, we surface a clear 409.
 */

type Body = { customerId?: unknown }

export async function POST(req: Request) {
  if (!(await authed())) return unauthorized()

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const customerId = typeof body.customerId === 'string' ? body.customerId.trim() : ''
  if (!customerId) return Response.json({ error: 'customerId is required' }, { status: 400 })

  try {
    const session = await stripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${SITE_URL}/admin/billing`,
    })
    return Response.json({ url: session.url })
  } catch (err) {
    // The most common first-run failure: the Customer Portal has never been
    // configured in this Stripe account/mode.
    if (
      err instanceof Stripe.errors.StripeError &&
      (err.message?.toLowerCase().includes('no configuration') ||
        err.message?.toLowerCase().includes('configuration provided'))
    ) {
      return Response.json(
        {
          error: 'portal_not_configured',
          message:
            'The Stripe Customer Portal has not been configured yet. Enable it once at ' +
            'https://dashboard.stripe.com/settings/billing/portal (match test vs live mode), then retry.',
        },
        { status: 409 }
      )
    }
    throw err
  }
}
