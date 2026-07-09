import Stripe from 'stripe'
import { stripe } from '@/lib/billing/stripe'
import { authed, unauthorized } from '@/lib/admin/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/admin/billing/cancel   { subscriptionId, resume? }
 *
 * Schedule a subscription to stop renewing at the end of the period the client
 * has already paid for — never an immediate termination. They keep the service
 * they bought; we simply do not charge again.
 *
 * `resume: true` undoes it while the period is still running, which is the only
 * reason cancellation is a flag and not `subscriptions.cancel()`: an accidental
 * click must be recoverable without asking the client to pay again.
 *
 * Cancelling is owner-only by design — the Stripe customer portal deliberately
 * has `subscription_cancel` disabled, so clients reach us by KakaoTalk or email
 * and we get a chance to talk first.
 */

type Body = { subscriptionId?: unknown; resume?: unknown }

export async function POST(req: Request) {
  if (!(await authed())) return unauthorized()

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const subscriptionId = typeof body.subscriptionId === 'string' ? body.subscriptionId.trim() : ''
  if (!subscriptionId.startsWith('sub_')) {
    return Response.json({ error: 'a valid subscriptionId is required' }, { status: 400 })
  }
  const resume = body.resume === true

  try {
    const sub = await stripe().subscriptions.update(subscriptionId, {
      cancel_at_period_end: !resume,
    })
    return Response.json({
      id: sub.id,
      status: sub.status,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      // The last day the client keeps the service they already paid for.
      endsAt: sub.items.data[0]?.current_period_end ?? null,
    })
  } catch (err) {
    // Already fully canceled, or never existed: there is nothing to schedule.
    if (err instanceof Stripe.errors.StripeError && err.statusCode === 404) {
      return Response.json({ error: 'subscription_not_found' }, { status: 404 })
    }
    if (
      err instanceof Stripe.errors.StripeError &&
      err.message?.toLowerCase().includes('canceled subscription')
    ) {
      return Response.json({ error: 'already_canceled' }, { status: 409 })
    }
    throw err
  }
}
