'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Categoria, Trabajo } from '@/lib/types'
import { categoriasDe } from '@/lib/trabajoHelpers'
import { TrabajoCard } from './TrabajoCard'

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: { value: string; label: string; count: number }[]
  selected: Set<string>
  onToggle: (value: string) => void
}) {
  if (options.length === 0) return null
  return (
    <details className="dir-group" open>
      <summary>{title}</summary>
      {options.map((o) => (
        <label className="dir-check" key={o.value}>
          <input type="checkbox" checked={selected.has(o.value)} onChange={() => onToggle(o.value)} />
          {o.label}
          <span className="n">{o.count}</span>
        </label>
      ))}
    </details>
  )
}

export function TrabajosClient({ trabajos, categorias }: { trabajos: Trabajo[]; categorias: Categoria[] }) {
  const searchParams = useSearchParams()
  const [cats, setCats] = useState<Set<string>>(new Set())

  useEffect(() => {
    const initialCat = searchParams.get('categoria')
    if (initialCat) {
      const match = categorias.find((c) => c.slug === initialCat)
      if (match) setCats(new Set([match.nombre]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const catOptions = useMemo(() => {
    const counts = new Map<string, number>()
    trabajos.forEach((t) => {
      categoriasDe(t).forEach((cat) => {
        counts.set(cat.nombre, (counts.get(cat.nombre) || 0) + 1)
      })
    })
    return categorias
      .filter((c) => counts.has(c.nombre))
      .map((c) => ({ value: c.nombre, label: c.nombre, count: counts.get(c.nombre) || 0 }))
  }, [trabajos, categorias])

  const toggle = (value: string) => {
    const next = new Set(cats)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    setCats(next)
  }

  const results = useMemo(() => {
    if (cats.size === 0) return trabajos
    return trabajos.filter((t) => {
      const tCats = categoriasDe(t).map((c) => c.nombre)
      return tCats.some((c) => cats.has(c))
    })
  }, [trabajos, cats])

  return (
    <div className="wrap">
      <p className="dir-count">{results.length} trabajos</p>
      <div className="dir-layout">
        <aside className="dir-sidebar">
          <FilterGroup title="Tipo de equipo" options={catOptions} selected={cats} onToggle={toggle} />
        </aside>
        <div className="partner-grid dir-results">
          {results.length === 0 && <div className="nores">Sin resultados para este filtro.</div>}
          {results.map((t) => (
            <TrabajoCard trabajo={t} key={t.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
