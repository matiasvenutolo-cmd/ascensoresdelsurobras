'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import type { Categoria } from '@/lib/types'
import { mediaUrl } from '@/lib/mediaUrl'

export function ProductShowcase({ categorias }: { categorias: Categoria[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="showcase">
      {categorias.map((c, i) => {
        const img = mediaUrl(c.imagen, 'card')
        return (
          <div
            key={c.id}
            className={`showcase-col${active === i ? ' active' : ''}`}
            style={img ? ({ '--img': `url(${img})` } as CSSProperties) : undefined}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActive(i)
            }}
          >
            <span className="showcase-label">{c.nombre}</span>
            <div className="showcase-detail">
              {c.descripcion && <p>{c.descripcion}</p>}
              <Link href={`/trabajos?categoria=${c.slug}`}>Ver trabajos realizados →</Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
