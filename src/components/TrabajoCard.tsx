import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Trabajo } from '@/lib/types'
import { categoriasDe, fichaTecnica, primeraFoto } from '@/lib/trabajoHelpers'
import { mediaUrl } from '@/lib/mediaUrl'

export function TrabajoCard({ trabajo: t }: { trabajo: Trabajo }) {
  const cats = categoriasDe(t)
  const img = mediaUrl(primeraFoto(t), 'card')
  const ficha = fichaTecnica(t)

  return (
    <Link href={t.slug ? `/trabajos/${t.slug}` : '#'} className="trabajo-card">
      <div className="tc-im" style={img ? ({ '--img': `url(${img})` } as CSSProperties) : undefined} />
      <div className="tc-body">
        {cats.length > 0 && (
          <div className="tc-tags">
            {cats.map((c) => (
              <span key={c.id}>{c.nombre}</span>
            ))}
          </div>
        )}
        <h3 className="tc-name">{t.titulo}</h3>
        {(t.direccion || t.localidad) && (
          <p className="tc-loc">{[t.direccion, t.localidad].filter(Boolean).join(' — ')}</p>
        )}
        {ficha && <div className="tc-ficha">{ficha}</div>}
      </div>
    </Link>
  )
}
