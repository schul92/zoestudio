import { remindNow } from '@/lib/billing/reminders'
import { authed, unauthorized } from '@/lib/admin/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/admin/billing/remind   { priceId }
 *
 * Send a payment reminder right now, skipping the waiting periods the nightly
 * cron respects. The hard ceiling on total reminders still applies — three
 * nudges is the point past which we should be calling, not emailing.
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

  const outcome = await remindNow(priceId)
  // Not a candidate: expired, revoked, or already paid.
  if (!outcome) return Response.json({ error: 'link_not_pending' }, { status: 404 })

  if (outcome.result === 'sent') return Response.json({ sent: true, to: outcome.email })
  // `error` carries the reason so the dashboard can render a specific message.
  return Response.json({ error: outcome.result }, { status: 409 })
}
