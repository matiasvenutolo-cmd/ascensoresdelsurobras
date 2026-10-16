import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { Lightbox } from '@/components/Lightbox'
import { EDIFICIOS_ALTURA, ESTADO_LABEL, edificioPorSlug, fachadaDe, fotosAscensoresDe } from '@/data/edificiosAltura'

export const dynamicParams = false

export function generateStaticParams() {
  return EDIFICIOS_ALTURA.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const e = edificioPorSlug(slug)
  if (!e) return { title: 'Edificio no encontrado — ADS Ascensores del Sur' }
  return {
    title: `${e.nombre} — Gran altura — ADS Ascensores del Sur`,
    description: `${e.direccion}, ${e.localidad} — ${e.paradas} paradas · ${ESTADO_LABEL[e.estado]}`,
  }
}

export default async function EdificioAlturaDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const e = edificioPorSlug(slug)
  if (!e) notFound()

  const fotos = fotosAscensoresDe(e)

  return (
    <>
      <SiteHeader />

      <div className="detail-hero">
        <Link href="/#gran-altura" className="detail-back">
          ← Ver todos los edificios
        </Link>
        <h1 className="detail-title">{e.nombre}</h1>
        <p className="detail-loc">
          {e.direccion}, {e.localidad}
        </p>
        <div className="detail-tags">
          <span className="detail-tag">{e.paradas} paradas</span>
          <span className={`detail-tag ga-tag-${e.estado}`}>{ESTADO_LABEL[e.estado]}</span>
        </div>
      </div>

      <div className="ga-fachada">
        <Image src={fachadaDe(e)} alt={`Fachada de ${e.nombre}`} fill sizes="(max-width: 1200px) 100vw, 1180px" priority style={{ objectFit: 'cover' }} />
      </div>

      {fotos.length > 0 && (
        <section className="equipo-block">
          <div className="equipo-head">
            <div className="ficha-num">ASCENSORES INSTALADOS</div>
          </div>
          <Lightbox photos={fotos} titulo={e.nombre} />
        </section>
      )}

      {e.equipos && e.equipos.length > 0 && (
        <div className="detail-ficha">
          {e.equipos.map((eq, i) => (
            <div className="ficha-card" key={i}>
              <div className="ficha-num">{String(i + 1).padStart(2, '0')} / EQUIPO</div>
              <h4>{eq.resumen}</h4>
              {eq.detalle && <p>{eq.detalle}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="detail-end" />
      <Footer />
      <WhatsappFloat />
    </>
  )
}
