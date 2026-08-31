import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { TrabajoLiveContent } from '@/components/TrabajoLiveContent'
import type { SiteSettings, Trabajo } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()
  const res = await payload.find({ collection: 'trabajos', where: { slug: { equals: slug } }, limit: 1 })
  const t = res.docs[0] as unknown as Trabajo | undefined
  if (!t) return { title: 'Trabajo no encontrado — ADS Ascensores del Sur' }
  return {
    title: `${t.titulo} — ADS Ascensores del Sur`,
    description: [t.direccion, t.localidad].filter(Boolean).join(', '),
  }
}

export default async function TrabajoDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload()

  const [settings, trabajoRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'trabajos', where: { slug: { equals: slug } }, limit: 1, depth: 1, overrideAccess: false }),
  ])

  const trabajo = trabajoRes.docs[0] as unknown as Trabajo | undefined
  if (!trabajo) notFound()

  const s = settings as SiteSettings

  return (
    <>
      <Header settings={s} />
      <TrabajoLiveContent initialTrabajo={trabajo} />
      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
