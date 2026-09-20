'use server'

import { Resend } from 'resend'
import { SITE } from '@/data/site'

export type ContactFormState = {
  ok: boolean
  error?: string
}

export async function submitContacto(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Honeypot: si el campo oculto viene lleno, es un bot. Devolvemos éxito
  // sin enviar nada para no delatarle que lo detectamos.
  if (formData.get('_hp')) {
    return { ok: true }
  }

  const nombre = String(formData.get('nombre') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const telefono = String(formData.get('telefono') || '').trim()
  const mensaje = String(formData.get('mensaje') || '').trim()

  if (!nombre || !email) {
    return { ok: false, error: 'Completá tu nombre y email.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY no configurada — consulta no enviada:', { nombre, email, telefono, mensaje })
    return { ok: false, error: 'No pudimos enviar tu consulta. Escribinos directamente por WhatsApp o teléfono.' }
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'ADS Obras <web@ascensoresdelsur.com.ar>',
      to: SITE.email,
      replyTo: email,
      subject: `Consulta de obra — ${nombre}`,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        telefono ? `Teléfono: ${telefono}` : null,
        mensaje ? `\nMensaje:\n${mensaje}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    })
    return { ok: true }
  } catch (err) {
    console.error('Error enviando consulta:', err)
    return { ok: false, error: 'No pudimos enviar tu consulta. Escribinos directamente por WhatsApp o teléfono.' }
  }
}
