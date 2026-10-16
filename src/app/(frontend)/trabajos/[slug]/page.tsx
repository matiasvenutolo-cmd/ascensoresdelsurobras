import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { Lightbox } from '@/components/Lightbox'
import { TRABAJOS, trabajoPorSlug, fotosDe, fotoDe, type Equipo } from '@/data/trabajos'
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

  const cats = t.categorias.map((slug) => categoriaPorSlug(slug)?.nombre).filter(Boolean) as string[]
  const porEquipo = t.equipos.some((eq) => eq.fotos?.length)
  const asignadas = new Set(t.equipos.flatMap((eq) => eq.fotos ?? []))
  const sueltas = Array.from({ length: t.fotos }, (_, i) => i + 1).filter((n) => !asignadas.has(n))

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

      {porEquipo ? (
        <>
          {t.equipos.map((eq, i) => {
            const cat = eq.categoria ? categoriaPorSlug(eq.categoria)?.nombre : undefined
            return (
              <section className="equipo-block" key={i}>
                <div className="equipo-head">
                  <div className="ficha-num">
                    {String(i + 1).padStart(2, '0')} / EQUIPO{cat ? ` · ${cat}` : ''}
                  </div>
                </div>
                {eq.fotos?.length ? (
                  <Lightbox photos={eq.fotos.map((n) => fotoDe(t, n))} titulo={cat ? `${t.titulo} — ${cat}` : t.titulo} />
                ) : null}
                <div className="detail-ficha detail-ficha-single">
                  <FichaCard eq={eq} />
                </div>
              </section>
            )
          })}
          {sueltas.length > 0 && (
            <section className="equipo-block">
              <div className="equipo-head">
                <div className="ficha-num">OTRAS FOTOS DE LA OBRA</div>
              </div>
              <Lightbox photos={sueltas.map((n) => fotoDe(t, n))} titulo={t.titulo} />
            </section>
          )}
          <div className="detail-end" />
        </>
      ) : (
        <>
          <Lightbox photos={fotosDe(t)} titulo={t.titulo} />
          {t.equipos.length > 0 && (
            <div className="detail-ficha">
              {t.equipos.map((eq, i) => (
                <FichaCard eq={eq} num={i + 1} key={i} />
              ))}
            </div>
          )}
        </>
      )}

      <Footer />
      <WhatsappFloat />
    </>
  )
}

function FichaCard({ eq, num }: { eq: Equipo; num?: number }) {
  return (
    <div className="ficha-card">
      {num !== undefined && <div className="ficha-num">{String(num).padStart(2, '0')} / EQUIPO</div>}
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
  )
}
