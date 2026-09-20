'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TRABAJOS, fotosDe } from '@/data/trabajos'
import { categoriaPorSlug } from '@/data/categorias'

export function ObrasRail() {
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    let timer: ReturnType<typeof setInterval>
    const start = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        if (window.innerWidth > 900 && !rail.matches(':hover')) {
          const max = rail.scrollWidth - rail.clientWidth
          const next = rail.scrollLeft + Math.min(480, rail.clientWidth * 0.6)
          rail.scrollTo({ left: next >= max ? 0 : next, behavior: 'smooth' })
        }
      }, 6500)
    }
    start()
    window.addEventListener('resize', start)
    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', start)
    }
  }, [])

  return (
    <div className="projects-rail" ref={railRef}>
      {TRABAJOS.map((t, i) => {
        const foto = fotosDe(t)[0]
        const cats = t.categorias.map((slug) => categoriaPorSlug(slug)?.nombre).filter(Boolean)
        const equipo = t.equipos[0]
        return (
          <Link href={`/trabajos/${t.slug}`} className={`project-card${i === 0 ? ' featured' : ''}`} key={t.slug}>
            <Image
              src={foto}
              alt={t.titulo}
              fill
              sizes="(max-width: 900px) 90vw, 45vw"
              priority={i === 0}
              style={{ objectFit: 'cover' }}
            />
            <div className="project-content">
              <div className="project-number">{String(i + 1).padStart(2, '0')} / OBRA</div>
              <h3>{t.titulo}</h3>
              <div className="project-meta">
                {cats.map((c) => (
                  <span className="tag" key={c}>
                    {c}
                  </span>
                ))}
                <span className="tag">{t.localidad}</span>
                {equipo?.cargaUtilKg && <span className="tag">{equipo.cargaUtilKg} kg</span>}
              </div>
              <span className="project-trigger">Ver ficha técnica →</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
