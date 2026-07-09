import 'server-only'
import { stripe } from './stripe'

/**
 * Which of a customer's Prices have already been used to take money.
 *
 * A pay link is single-use. The webhook normally deactivates the Price the
 * moment its checkout completes, but we must not depend on that: the webhook
 * may be unconfigured, may have been missed, or may still be in flight when the
 * client taps the link a second time. So we ask Stripe directly.
 *
 * Two sources, because a one-time payment leaves no subscription behind:
 *
 *   - subscriptions in a live state  -> the recurring link was used
 *   - checkout sessions that completed -> the one-time link was used
 *
 * A completed session counts even when `payment_status` is still `unpaid`:
 * that is an ACH debit in flight, and letting the client "retry" would take the
 * money twice.
 */

/** Subscription statuses that mean the client is on the hook for money. */
const LIVE: readonly string[] = ['active', 'trialing', 'past_due', 'unpaid']

export async function spentPriceIds(customerId: string): Promise<Set<string>> {
  const s = stripe()

  const [subs, sessions] = await Promise.all([
    s.subscriptions.list({ customer: customerId, status: 'all', limit: 100 }),
    s.checkout.sessions.list({ customer: customerId, limit: 100 }),
  ])

  const spent = new Set<string>()

  for (const sub of subs.data) {
    if (!LIVE.includes(sub.status)) continue
    for (const item of sub.items.data) spent.add(item.price.id)
  }

  for (const session of sessions.data) {
    if (session.status !== 'complete') continue
    const priceId = session.metadata?.zl_price
    if (priceId) spent.add(priceId)
  }

  return spent
}
