import nodemailer from 'nodemailer'
import type { ContactMessage } from './types.js'

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

export async function sendContactNotification(entry: ContactMessage) {
  const transport = getTransport()
  const to = process.env.CONTACT_TO_EMAIL

  if (!transport || !to) {
    console.log(
      '[mailer] SMTP not configured (see server/.env) — skipping email, message was still saved.\n',
      `New message from ${entry.name} <${entry.email}>: ${entry.message.slice(0, 120)}`,
    )
    return
  }

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to,
    replyTo: entry.email,
    subject: `Nouveau message de contact — ${entry.name}`,
    text: [
      `Nom: ${entry.name}`,
      `Email: ${entry.email}`,
      `Service souhaité: ${entry.service || 'Non précisé'}`,
      `Délai souhaité: ${entry.delay || 'Non précisé'}`,
      '',
      entry.message,
    ].join('\n'),
  })
}
