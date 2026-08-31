import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Categoria } from '@/lib/types'
import { mediaUrl } from '@/lib/mediaUrl'

export function CategoriaCard({ categoria: c }: { categoria: Categoria }) {
  const img = mediaUrl(c.imagen, 'card')
  return (
    <Link href={`/trabajos?categoria=${c.slug}`} className="cat-card">
      <div className="im" style={img ? ({ '--img': `url(${img})` } as CSSProperties) : undefined} />
      <div className="bd">
        <h3>{c.nombre}</h3>
        {c.descripcion && <p>{c.descripcion}</p>}
      </div>
    </Link>
  )
}
