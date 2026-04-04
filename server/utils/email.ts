import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import nodemailer from 'nodemailer'

export function createTransporter(user: string, pass: string) {
  return nodemailer.createTransport({
    auth: {
      pass,
      user,
    },
    service: 'Gmail',
  } as SMTPTransport.Options)
}
