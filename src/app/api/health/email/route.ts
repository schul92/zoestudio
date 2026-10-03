import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

// Uptime probe for the lead mailer: { ok: true } only if Gmail SMTP accepts the site's credentials right now.
// Deliberately returns nothing else — no error text, no account details. /api/ is disallowed in robots.
export async function GET() {
  const headers = { 'Cache-Control': 'no-store' }
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  if (!user || !pass) return NextResponse.json({ ok: false }, { status: 503, headers })

  const transporter = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 587, secure: false, auth: { user, pass } })
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
