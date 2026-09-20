'use client'

import { useState } from 'react'
import { CATEGORIAS } from '@/data/categorias'

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
        {CATEGORIAS.map((c, i) => (
          <article
            className={`solution-card${filtro !== 'all' && c.filtro !== filtro ? ' is-hidden' : ''}`}
            key={c.slug}
          >
            <div className="solution-code">
              {String(i + 1).padStart(2, '0')} / {c.filtro.toUpperCase()}
            </div>
            <h3>{c.nombre}</h3>
            <p>{c.descripcion}</p>
            <div className="arrow">↗</div>
          </article>
        ))}
      </div>
    </>
  )
}
