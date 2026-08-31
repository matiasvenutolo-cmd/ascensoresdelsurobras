'use client'

import type { CSSProperties } from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Trabajo } from '@/lib/types'
import { categoriasDe } from '@/lib/trabajoHelpers'
import { mediaUrl } from '@/lib/mediaUrl'

export function TrabajoLiveContent({ initialTrabajo }: { initialTrabajo: Trabajo }) {
  const { data: t } = useLivePreview<Trabajo>({
    initialData: initialTrabajo,
    serverURL: typeof window !== 'undefined' ? window.location.origin : '',
    depth: 1,
  })

  const cats = categoriasDe(t)
  const fotos = (t.galeria || []).map((g) => mediaUrl(g.imagen, 'card')).filter(Boolean) as string[]
  const heroImg = fotos[0]
  const equipos = t.equipos || []

  return (
    <article className="detail">
      <div className="wrap">
        <a href="/trabajos" className="back">
          ← Volver a trabajos realizados
        </a>
        {cats.length > 0 && (
          <div className="tc-tags" style={{ marginBottom: 10 }}>
            {cats.map((c) => (
              <span key={c.id}>{c.nombre}</span>
            ))}
          </div>
        )}
        <h1 className="detail-title">{t.titulo}</h1>
        {(t.direccion || t.localidad) && (
          <p className="detail-loc">{[t.direccion, t.localidad].filter(Boolean).join(' — ')}</p>
        )}
      </div>

      {heroImg && (
        <div className="wrap">
          <div className="detail-hero-img" style={{ '--img': `url(${heroImg})` } as CSSProperties} />
        </div>
      )}

      <div className="wrap">
        {equipos.length > 0 && (
          <div className="ficha-grid">
            {equipos.map((eq, i) => (
              <div className="ficha-card" key={i}>
                <h4>{eq.resumen}</h4>
                {(eq.paradas || eq.cargaUtilKg || eq.velocidadMpm) && (
                  <div className="ficha-stats">
                    {eq.paradas != null && (
                      <div className="ficha-stat">
                        <b>{eq.paradas}</b>
                        <span>Paradas</span>
                      </div>
                    )}
                    {eq.cargaUtilKg != null && (
                      <div className="ficha-stat">
                        <b>{eq.cargaUtilKg}</b>
                        <span>Kg carga útil</span>
                      </div>
                    )}
                    {eq.velocidadMpm != null && (
                      <div className="ficha-stat">
                        <b>{eq.velocidadMpm}</b>
                        <span>Mpm</span>
                      </div>
                    )}
                  </div>
                )}
                {eq.detalle && <p>{eq.detalle}</p>}
              </div>
            ))}
          </div>
        )}

        {fotos.length > 1 && (
          <>
            <div className="shead" style={{ marginBottom: 20 }}>
              <span className="kick">Galería</span>
              <h2 className="st">Fotos de la obra</h2>
            </div>
            <div className="gallery-grid" style={{ marginBottom: 40 }}>
              {fotos.map((f, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={f} alt={`${t.titulo} — foto ${i + 1}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  )
}
