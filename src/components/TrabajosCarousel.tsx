'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { Trabajo } from '@/lib/types'
import { TrabajoCard } from './TrabajoCard'
import { ArrowRightIcon } from './icons'

export function TrabajosCarousel({ trabajos }: { trabajos: Trabajo[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0)
  }

  return (
    <div className="wrap">
      <div className="trabajos-carousel">
        <div>
          <div className="shead" style={{ marginBottom: 0 }}>
            <span className="kick">Trabajos realizados</span>
            <h2 className="st">Obras instaladas por ADS</h2>
          </div>
          <Link href="/trabajos" className="btn btn-primary" style={{ marginTop: 22 }}>
            Ver todos los trabajos
          </Link>
          <div className="tc-carousel-nav">
            <button aria-label="Anterior" onClick={() => scrollBy(-1)}>
              <ArrowRightIcon size={16} className="icon-flip" />
            </button>
            <button aria-label="Siguiente" onClick={() => scrollBy(1)}>
              <ArrowRightIcon size={16} />
            </button>
          </div>
          <div className="tc-carousel-progress">
            <i style={{ width: `${Math.max(progress, 8)}%` }} />
          </div>
        </div>
        <div className="tc-carousel-track" ref={trackRef} onScroll={onScroll}>
          {trabajos.map((t) => (
            <TrabajoCard trabajo={t} key={t.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
