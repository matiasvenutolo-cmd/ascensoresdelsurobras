'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIAS } from '@/data/categorias'
import { trabajoPorSlug, fotosDe } from '@/data/trabajos'

const FILTROS = [
  { value: 'all', label: 'Todas' },
  { value: 'personas', label: 'Personas' },
  { value: 'carga', label: 'Carga' },
  { value: 'especial', label: 'Especiales' },
] as const

export function SolutionsGrid() {
  const [filtro, setFiltro] = useState<string>('all')

  return (
    <>
      <div className="solution-toolbar" role="tablist" aria-label="Filtrar soluciones">
        {FILTROS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn${filtro === f.value ? ' active' : ''}`}
            onClick={() => setFiltro(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="solution-grid">
        {(() => {
          const visibleSlugs = CATEGORIAS.filter((c) => filtro === 'all' || c.filtro === filtro).map((c) => c.slug)
          const lastVisibleSlug =
            visibleSlugs.length % 2 === 1 ? visibleSlugs[visibleSlugs.length - 1] : null

          return CATEGORIAS.map((c, i) => {
            const ejemplo = c.trabajoEjemplo ? trabajoPorSlug(c.trabajoEjemplo) : undefined
            const foto = ejemplo ? fotosDe(ejemplo)[0] : undefined
            const hidden = filtro !== 'all' && c.filtro !== filtro
            const centered = c.slug === lastVisibleSlug
            const codigo = `${String(i + 1).padStart(2, '0')} / ${c.filtro.toUpperCase()}`
            const classes = [
              'solution-card',
              foto && ejemplo ? 'solution-card-photo' : '',
              hidden ? 'is-hidden' : '',
              centered ? 'solution-card-centered' : '',
            ]
              .filter(Boolean)
              .join(' ')

            if (foto && ejemplo) {
              return (
                <Link href={`/trabajos/${ejemplo.slug}`} className={classes} key={c.slug}>
                  <Image src={foto} alt={ejemplo.titulo} fill sizes="(max-width: 700px) 90vw, 45vw" style={{ objectFit: 'cover' }} />
                  <div className="solution-card-scrim" />
                  <div className="solution-card-content">
                    <div className="solution-code">{codigo}</div>
                    <h3>{c.nombre}</h3>
                    <span className="solution-card-link">Ver ejemplo de instalación →</span>
                  </div>
                </Link>
              )
            }

            return (
              <article className={classes} key={c.slug}>
                <div className="solution-code">{codigo}</div>
                <h3>{c.nombre}</h3>
                <p>{c.descripcion}</p>
                <div className="arrow">↗</div>
              </article>
            )
          })
        })()}
      </div>
    </>
  )
}
