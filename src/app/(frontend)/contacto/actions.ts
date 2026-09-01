'use server'

import { getPayload } from '@/lib/getPayload'

export type CotizacionFormState = {
  ok: boolean
  error?: string
}

export async function submitCotizacion(_prevState: CotizacionFormState, formData: FormData): Promise<CotizacionFormState> {
  // Honeypot: campo oculto por CSS que solo un bot completaría. Si viene
  // lleno, respondemos éxito sin crear nada, para no delatar que lo detectamos.
  if (formData.get('_hp')) {
    return { ok: true }
  }

  const nombre = String(formData.get('nombre') || '').trim()
  const email = String(formData.get('email') || '').trim()
  if (!nombre || !email) {
    return { ok: false, error: 'Falta el nombre o el email.' }
  }

  const toNumber = (v: FormDataEntryValue | null) => {
    const n = Number(v)
    return Number.isFinite(n) && v ? n : undefined
  }

  const payload = await getPayload()
  await payload.create({
    collection: 'cotizaciones',
    data: {
      nombre,
      empresa: String(formData.get('empresa') || '') || undefined,
      rol: String(formData.get('rol') || '') || undefined,
      email,
      telefono: String(formData.get('telefono') || '') || undefined,
      tipoProyecto: String(formData.get('tipoProyecto') || '') || undefined,
      ubicacion: String(formData.get('ubicacion') || '') || undefined,
      cantidadPisos: toNumber(formData.get('cantidadPisos')),
      cantidadAscensores: toNumber(formData.get('cantidadAscensores')),
      etapaObra: String(formData.get('etapaObra') || '') || undefined,
      plazoEstimado: String(formData.get('plazoEstimado') || '') || undefined,
      comentarios: String(formData.get('comentarios') || '') || undefined,
    },
  })

  return { ok: true }
}
