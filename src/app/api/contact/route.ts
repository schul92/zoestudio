import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, business, message, to } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email configuration
    const emailData = {
      to: to || 'zoestudiollc@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${business ? `<p><strong>Business:</strong> ${business}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This email was sent from the Zoe Studio LLC website contact form.</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${business ? `Business: ${business}` : ''}

Message:
${message}

---
This email was sent from the Zoe Studio LLC website contact form.
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

    // Create transporter with Gmail service
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Send email
    await transporter.sendMail({
      from: `"Zoe Studio LLC Website" <${process.env.EMAIL_USER}>`,
      to: emailData.to,
      replyTo: email, // Reply to the sender's email
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html
    })

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