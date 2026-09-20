import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { TRABAJOS, trabajoPorSlug, fotosDe } from '@/data/trabajos'
import { categoriaPorSlug } from '@/data/categorias'

export function generateStaticParams() {
  return TRABAJOS.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const t = trabajoPorSlug(slug)
  if (!t) return { title: 'Obra no encontrada — ADS Ascensores del Sur' }
  return {
    title: `${t.titulo} — ADS Ascensores del Sur`,
    description: `${t.direccion}, ${t.localidad} — ${t.equipos.map((e) => e.resumen).join(', ')}`,
  }
}

export default async function TrabajoDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = trabajoPorSlug(slug)
  if (!t) notFound()

  const fotos = fotosDe(t)
  const cats = t.categorias.map((slug) => categoriaPorSlug(slug)?.nombre).filter(Boolean) as string[]

  return (
    <>
      <SiteHeader />

      <div className="detail-hero">
        <Link href="/#obras" className="detail-back">
          ← Ver todas las obras
        </Link>
        <h1 className="detail-title">{t.titulo}</h1>
        <p className="detail-loc">
          {t.direccion}, {t.localidad}
        </p>
        <div className="detail-tags">
          {cats.map((c) => (
            <span className="detail-tag" key={c}>
              {c}
            </span>
          ))}
          {t.tipoEdificio && <span className="detail-tag">{t.tipoEdificio}</span>}
        </div>
      </div>

      <div className="detail-gallery">
        {fotos.map((src, i) => (
          <a key={src} href={src} target="_blank" rel="noopener noreferrer">
            <Image src={src} alt={`${t.titulo} — foto ${i + 1}`} fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: 'cover' }} priority={i === 0} />
          </a>
        ))}
      </div>

      {t.equipos.length > 0 && (
        <div className="detail-ficha">
          {t.equipos.map((eq, i) => (
            <div className="ficha-card" key={i}>
              <div className="ficha-num">{String(i + 1).padStart(2, '0')} / EQUIPO</div>
              <h4>{eq.resumen}</h4>
              <div className="ficha-stats">
                {eq.cargaUtilKg && (
                  <div className="ficha-stat">
                    <b>{eq.cargaUtilKg}</b>
                    <span>kg</span>
                  </div>
                )}
                {eq.paradas && (
                  <div className="ficha-stat">
                    <b>{eq.paradas}</b>
                    <span>paradas</span>
                  </div>
                )}
                {eq.velocidadMpm && (
                  <div className="ficha-stat">
                    <b>{eq.velocidadMpm}</b>
                    <span>mpm</span>
                  </div>
                )}
              </div>
              {eq.detalle && <p>{eq.detalle}</p>}
            </div>
          ))}
        </div>
      )}

      <Footer />
      <WhatsappFloat />
    </>
  )
}
