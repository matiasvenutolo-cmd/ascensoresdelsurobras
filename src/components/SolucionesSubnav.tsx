'use client'

import { useEffect, useState } from 'react'

const ITEMS = [
  { id: 'que-hacemos', label: 'Qué hacemos' },
  { id: 'como-trabajamos', label: 'Cómo trabajamos' },
  { id: 'diferenciales', label: 'Diferenciales' },
  { id: 'normativa', label: 'Normativa' },
  { id: 'tu-rol', label: 'Tu rol' },
]

export function SolucionesSubnav() {
  const [activeId, setActiveId] = useState(ITEMS[0].id)

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="subnav">
      <div className="wrap">
        {ITEMS.map((i) => (
          <button key={i.id} className={activeId === i.id ? 'active' : ''} onClick={() => goTo(i.id)}>
            {i.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
