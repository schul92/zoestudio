import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const clip = (v: unknown, n: number) => (typeof v === 'string' ? v.slice(0, n) : undefined)

// A lead that couldn't be emailed is written to the server log as one structured line, so it can be recovered
// from Vercel logs (search "LEAD_NOT_SENT") during a mail outage instead of vanishing.
function logUnsent(stage: string, lead: Record<string, unknown>, err?: unknown) {
  console.error(
    JSON.stringify({
      event: 'LEAD_NOT_SENT',
      stage,
      at: new Date().toISOString(),
      lead,
      error: err instanceof Error ? err.message : err ? String(err) : undefined,
    }),
  )
}

const mailUnavailable = () =>
  NextResponse.json({ error: 'Email service unavailable', code: 'MAIL_UNAVAILABLE' }, { status: 503 })

export async function POST(request: Request) {
  let lead: Record<string, unknown> = {}
  try {
    const body = await request.json()
    const { name, email, phone, business, message, services } = body
    const ads = {
      gclid: clip(body.gclid, 200),
      gbraid: clip(body.gbraid, 200),
      wbraid: clip(body.wbraid, 200),
      landing: clip(body.landing, 300),
      lead_source: clip(body.lead_source, 60),
    }
    lead = { name, email, phone, business, services, message, ...ads }

    // Message is optional — the homepage form allows submitting with just
    // name + email, and rejecting those was silently dropping leads.
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    const safeMessage = typeof message === 'string' && message.trim()
      ? message.trim()
      : '(no message provided)'
    const adLine = [
      ads.lead_source && `source=${ads.lead_source}`,
      ads.gclid && `gclid=${ads.gclid}`,
      ads.gbraid && `gbraid=${ads.gbraid}`,
      ads.wbraid && `wbraid=${ads.wbraid}`,
      ads.landing && `landing=${ads.landing}`,
    ].filter(Boolean).join(' · ')

    // Always send to the real owner inboxes. Never honor a client-supplied
    // `to` (open-relay vector), and info@zoelumos.com isn't monitored.
    const OWNER_INBOXES = 'zoestudiollc@gmail.com, steve.b.song92@gmail.com'
    const h = {
      name: escapeHtml(String(name)),
      email: escapeHtml(String(email)),
      phone: phone ? escapeHtml(String(phone)) : '',
      business: business ? escapeHtml(String(business)) : '',
      services: services ? escapeHtml(String(services)) : '',
      message: escapeHtml(safeMessage),
    }
    const emailData = {
      to: OWNER_INBOXES,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${h.name}</p>
        <p><strong>Email:</strong> ${h.email}</p>
        ${h.phone ? `<p><strong>Phone:</strong> ${h.phone}</p>` : ''}
        ${h.business ? `<p><strong>Business:</strong> ${h.business}</p>` : ''}
        ${h.services ? `
        <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
          <p><strong>Selected Services/Plans:</strong></p>
          <p style="color: #333; font-size: 14px;">${h.services}</p>
        </div>
        ` : ''}
        <p><strong>Message:</strong></p>
        <p>${h.message.replace(/\n/g, '<br>')}</p>
        ${adLine ? `<p style="color:#666;font-size:12px;"><strong>Attribution:</strong> ${escapeHtml(adLine)}</p>` : ''}
        <hr>
        <p><small>This email was sent from the ZOE LUMOS website contact form.</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${business ? `Business: ${business}` : ''}
${services ? `\nSelected Services/Plans: ${services}\n` : ''}

Message:
${safeMessage}
${adLine ? `\nAttribution: ${adLine}\n` : ''}
---
This email was sent from the ZOE LUMOS website contact form.
      `
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Email credentials not configured. Email data:', emailData)
        return NextResponse.json(
          { message: 'Email sent successfully (dev mode)' },
          { status: 200 }
        )
      }
      // In production this is an outage, not a success — never fake a 200.
      logUnsent('config', lead)
      return mailUnavailable()
    }

    // Create transporter with Gmail service - with better configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Verify connection configuration
    try {
      await transporter.verify()
    } catch (verifyError) {
      logUnsent('verify', lead, verifyError)
      return mailUnavailable()
    }

    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"ZOE LUMOS Website" <${process.env.EMAIL_USER}>`,
        to: emailData.to,
        replyTo: email, // Reply to the sender's email
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html
      })
    } catch (sendError) {
      logUnsent('send', lead, sendError)
      return mailUnavailable()
    }

    // Send confirmation email to user
    try {
      await transporter.sendMail({
        from: `"ZOE LUMOS" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting ZOE LUMOS',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for reaching out!</h2>
            <p>Hi ${h.name},</p>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${h.message.replace(/\n/g, '<br>')}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              ZOE LUMOS Team<br>
              ✉️ info@zoelumos.com
            </p>
          </div>
        `,
        text: `Thank you for reaching out!\n\nHi ${name},\n\nWe've received your message and will get back to you within 24 hours.\n\nYour Message:\n${safeMessage}\n\nBest regards,\nZOE LUMOS Team\ninfo@zoelumos.com`
      })
      console.log('Confirmation email sent to:', email)
    } catch (confirmError) {
      console.error('Failed to send confirmation email:', confirmError)
      // Don't fail the whole request if confirmation email fails
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    if (Object.keys(lead).length) logUnsent('unexpected', lead, error)
    else console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}