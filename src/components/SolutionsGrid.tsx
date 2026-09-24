'use client'

import { useEffect, useMemo, useState } from 'react'
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
  const [active, setActive] = useState<string | null>(null)

  const visibles = useMemo(() => CATEGORIAS.filter((c) => filtro === 'all' || c.filtro === filtro), [filtro])

  useEffect(() => {
    if (!visibles.find((c) => c.slug === active)) {
      setActive(visibles[0]?.slug ?? null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibles])

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
      <div className="showcase">
        {visibles.map((c, i) => {
          const ejemplo = c.trabajoEjemplo ? trabajoPorSlug(c.trabajoEjemplo) : undefined
          const foto = ejemplo ? fotosDe(ejemplo)[0] : undefined
          const isActive = active === c.slug
          const codigo = String(i + 1).padStart(2, '0')

          const col = (
            <div
              className={`showcase-col${isActive ? ' active' : ''}${!foto ? ' no-photo' : ''}`}
              onMouseEnter={() => setActive(c.slug)}
              onClick={() => setActive(c.slug)}
              onFocus={() => setActive(c.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActive(c.slug)
                }
              }}
              key={c.slug}
            >
              {foto && <Image src={foto} alt={ejemplo!.titulo} fill sizes="(max-width: 900px) 100vw, 20vw" style={{ objectFit: 'cover' }} />}
              <span className="showcase-num">{codigo}</span>
              <span className="showcase-label">{c.nombre}</span>
              <div className="showcase-detail">
                <p>{c.descripcion}</p>
                {ejemplo ? (
                  <Link href={`/trabajos/${ejemplo.slug}`} onClick={(e) => e.stopPropagation()}>
                    Ver ejemplo de instalación →
                  </Link>
                ) : (
                  <span className="showcase-consult">Consultanos por este equipo →</span>
                )}
              </div>
            </div>
          )
          return col
        })}
      </div>
    </>
  )
}
