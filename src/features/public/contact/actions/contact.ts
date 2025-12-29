'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
})

export async function submitContactForm(
  prevState: unknown,
  formData: FormData,
) {
  const result = contactSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { name, email, subject, message } = result.data

  const contactEmail = process.env.CONTACT_EMAIL

  if (!contactEmail) {
    return {
      message:
        'Contact email is not configured. Please contact the administrator.',
    }
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      message:
        'Email service is not configured. Please contact the administrator.',
    }
  }

  // Extract domain from contact email for the "from" address
  // Resend requires the from address to be from a verified domain
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || `info@${contactEmail.split('@')[1]}`

  try {
    await resend.emails.send({
      from: `Contact Form <${fromEmail}>`,
      to: contactEmail,
      replyTo: email,
      subject: `Monica Esgueva Art - Contact Form: ${subject}`,
      html: `
        <h2>Monica Esgueva Art - New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
Monica Esgueva Art - New Contact Form Submission

From: ${name} (${email})
Subject: ${subject}

Message:
${message}
      `,
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      message: 'Failed to send message. Please try again later.',
    }
  }
}
