import 'server-only'
import nodemailer from 'nodemailer'

/**
 * One SMTP setup for every site email: contact form, lead clicks, billing notices and the health probe.
 *
 * The defaults are the original Gmail setup (smtp.gmail.com with the zoestudiollc app password in EMAIL_USER /
 * EMAIL_PASS). Google revokes that app password whenever the account password changes, and every site email
 * then fails silently — it happened 2026-09-17 and again in early November 2026. To move off it, set in Vercel:
 *
 *   SMTP_HOST=smtp.resend.com  SMTP_PORT=465  SMTP_USER=resend  SMTP_PASS=<Resend API key>  MAIL_FROM=info@zoelumos.com
 *
 * (zoelumos.com must be a verified domain in Resend). EMAIL_USER / EMAIL_PASS are then no longer used.
 */
export function mailConfig() {
  const port = Number(process.env.SMTP_PORT || 587)
  return {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465 || port === 2465,
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    from: process.env.MAIL_FROM || process.env.EMAIL_USER,
  }
}

/** A transport for the configured server, or null when credentials or the sender address are missing. */
export function createMailer() {
  const c = mailConfig()
  if (!c.user || !c.pass || !c.from) return null
  return nodemailer.createTransport({ host: c.host, port: c.port, secure: c.secure, auth: { user: c.user, pass: c.pass } })
}

/** `"Name" <sender>` with the configured sender address. */
export const mailFrom = (name: string) => `"${name}" <${mailConfig().from}>`
