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
        {CATEGORIAS.map((c, i) => {
          const ejemplo = c.trabajoEjemplo ? trabajoPorSlug(c.trabajoEjemplo) : undefined
          const foto = ejemplo ? fotosDe(ejemplo)[0] : undefined
          const hidden = filtro !== 'all' && c.filtro !== filtro
          const codigo = `${String(i + 1).padStart(2, '0')} / ${c.filtro.toUpperCase()}`

          if (foto && ejemplo) {
            return (
              <Link
                href={`/trabajos/${ejemplo.slug}`}
                className={`solution-card solution-card-photo${hidden ? ' is-hidden' : ''}`}
                key={c.slug}
              >
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
            <article className={`solution-card${hidden ? ' is-hidden' : ''}`} key={c.slug}>
              <div className="solution-code">{codigo}</div>
              <h3>{c.nombre}</h3>
              <p>{c.descripcion}</p>
              <div className="arrow">↗</div>
            </article>
          )
        })}
      </div>
    </>
  )
}
