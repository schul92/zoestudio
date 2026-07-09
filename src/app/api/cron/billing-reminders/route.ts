import { timingSafeEqual } from 'crypto'
import { runReminders } from '@/lib/billing/reminders'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Reminder mail is slow (one SMTP round trip per client); give it room.
export const maxDuration = 300

/**
 * GET /api/cron/billing-reminders   [Vercel Cron only]
 *
 * Nudges clients who were sent a pay link and never used it. The schedule and
 * spam guards live in lib/billing/reminders — this route only authenticates.
 *
 * Vercel signs cron invocations with `Authorization: Bearer $CRON_SECRET`. We
 * refuse to run without that secret set, rather than leave a public endpoint
 * that mails our clients on demand.
 */

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false

  const header = req.headers.get('authorization') ?? ''
  const expected = `Bearer ${secret}`
  // Compare in constant time, and only when lengths match (timingSafeEqual
  // throws on a length mismatch).
  if (header.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(header), Buffer.from(expected))
}

export async function GET(req: Request) {
  if (!process.env.CRON_SECRET) {
    return Response.json(
      { error: 'CRON_SECRET is not set; refusing to run an unauthenticated mail job' },
      { status: 500 }
    )
  }
  if (!authorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const run = await runReminders()
  console.log(`[cron.reminders] scanned=${run.scanned} sent=${run.sent}`)
  for (const o of run.outcomes) {
    if (o.result !== 'sent') continue
    console.log(`[cron.reminders] sent to ${o.clientName} (${o.priceId})`)
  }

  return Response.json({ scanned: run.scanned, sent: run.sent })
}
