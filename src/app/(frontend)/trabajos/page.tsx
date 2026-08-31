import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { TrabajosClient } from '@/components/TrabajosClient'
import { TrabajoLivePreview } from '@/components/TrabajoLivePreview'
import type { Categoria, SiteSettings, Trabajo } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Trabajos realizados — ADS Ascensores del Sur',
  description: 'Obras de instalación de ascensores y montacargas realizadas por ADS en todo el país.',
}

export default async function TrabajosPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams
  const payload = await getPayload()

  const [settings, trabajosRes, categoriasRes, previewTrabajo] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'trabajos', limit: 300, depth: 1, sort: 'titulo', overrideAccess: false }),
    payload.find({ collection: 'categorias', limit: 50, sort: 'orden' }),
    preview ? payload.findByID({ collection: 'trabajos', id: preview, depth: 1 }).catch(() => null) : null,
  ])

  const s = settings as SiteSettings
  const trabajos = trabajosRes.docs as unknown as Trabajo[]
  const categorias = categoriasRes.docs as unknown as Categoria[]

  return (
    <>
      <Header settings={s} />
      {previewTrabajo && <TrabajoLivePreview initialTrabajo={previewTrabajo as unknown as Trabajo} />}

      <section className="dir-hero">
        <div className="wrap">
          <span className="kick">Trabajos realizados</span>
          <h1>Obras de instalación en todo el país</h1>
          <p>
            Ascensores, monta vehículos y montacargas instalados por ADS. Filtrá por tipo de equipo para encontrar
            un trabajo similar al tuyo.
          </p>
          <div className="dir-stats">
            <div className="dir-stat-chip">
              <b>{trabajosRes.totalDocs}</b>
              <span>trabajos realizados</span>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <TrabajosClient trabajos={trabajos} categorias={categorias} />
      </Suspense>

      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
