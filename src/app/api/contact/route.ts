import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, business, message, to, services } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email configuration
    const emailData = {
      to: to || 'info@zoelumos.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${business ? `<p><strong>Business:</strong> ${business}</p>` : ''}
        ${services ? `
        <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
          <p><strong>Selected Services/Plans:</strong></p>
          <p style="color: #333; font-size: 14px;">${services}</p>
        </div>
        ` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
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
${message}

---
This email was sent from the ZOE LUMOS website contact form.
      `
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not configured. Email data:', emailData)
      // In development without credentials, just return success
      return NextResponse.json(
        { message: 'Email sent successfully (dev mode)' },
        { status: 200 }
      )
    }

    // Create transporter with Gmail service - with better configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify connection configuration
    try {
      await transporter.verify()
      console.log('Email server connection verified successfully')
    } catch (verifyError) {
      console.error('Email verification failed:', verifyError)
      console.log('Email User:', process.env.EMAIL_USER)
      console.log('Password length:', process.env.EMAIL_PASS?.length || 0)
      throw verifyError
    }

    // Send email to admin
    await transporter.sendMail({
      from: `"ZOE LUMOS Website" <${process.env.EMAIL_USER}>`,
      to: emailData.to,
      replyTo: email, // Reply to the sender's email
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html
    })

    // Send confirmation email to user
    try {
      await transporter.sendMail({
        from: `"ZOE LUMOS" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting ZOE LUMOS',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for reaching out!</h2>
            <p>Hi ${name},</p>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              ZOE LUMOS Team<br>
              ✉️ info@zoelumos.com
            </p>
          </div>
        `,
        text: `Thank you for reaching out!\n\nHi ${name},\n\nWe've received your message and will get back to you within 24 hours.\n\nYour Message:\n${message}\n\nBest regards,\nZOE LUMOS Team\ninfo@zoelumos.com`
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
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}