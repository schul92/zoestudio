import { NextResponse } from 'next/server'
import { createMailer } from '@/lib/mailer'

export const dynamic = 'force-dynamic'

// Uptime probe for the lead mailer: { ok: true } only if the SMTP server (src/lib/mailer.ts) accepts the site's
// credentials right now.
// Deliberately returns nothing else — no error text, no account details. /api/ is disallowed in robots.
export async function GET() {
  const headers = { 'Cache-Control': 'no-store' }
  const transporter = createMailer()
  if (!transporter) return NextResponse.json({ ok: false }, { status: 503, headers })

  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
  try {
    await Promise.race([transporter.verify(), timeout])
    return NextResponse.json({ ok: true }, { headers })
  } catch {
    return NextResponse.json({ ok: false }, { status: 503, headers })
  } finally {
    transporter.close()
  }
}
