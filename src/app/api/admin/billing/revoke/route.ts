import { stripe } from '@/lib/billing/stripe'
import { authed, unauthorized } from '@/lib/admin/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/admin/billing/revoke
 *
 * Kill a pending payment link by deactivating its Price. The /pay resolver only
 * matches active Prices, so the link stops working immediately — no deploy, no
 * expiry wait. Safe to call even on a Price a subscription already uses:
 * deactivating a Price never affects existing subscriptions or their renewals.
 */

type Body = { priceId?: unknown }

export async function POST(req: Request) {
  if (!(await authed())) return unauthorized()

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const priceId = typeof body.priceId === 'string' ? body.priceId.trim() : ''
  if (!priceId.startsWith('price_')) {
    return Response.json({ error: 'a valid priceId is required' }, { status: 400 })
  }

  await stripe().prices.update(priceId, { active: false })
  return Response.json({ revoked: true })
}
