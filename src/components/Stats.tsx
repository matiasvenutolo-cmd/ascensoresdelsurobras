'use client'

import { useEffect, useRef, useState } from 'react'

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const dur = 1400
            let t0: number | null = null
            const step = (ts: number) => {
              if (t0 === null) t0 = ts
              const p = Math.min((ts - t0) / dur, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              setVal(Math.round(to * eased))
              if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

export function Stats({
  aniosTrayectoria,
  totalTrabajos,
  categorias,
}: {
  aniosTrayectoria: number
  totalTrabajos: number
  categorias: number
}) {
  const stats = [
    { value: <CountUp to={aniosTrayectoria} suffix="+" />, label: 'Años de trayectoria' },
    { value: <CountUp to={totalTrabajos} suffix="+" />, label: 'Obras instaladas' },
    { value: <CountUp to={categorias} />, label: 'Tipos de equipo' },
  ]
  return (
    <div className="stats-strip">
      <div className="wrap stats-grid">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <b>{s.value}</b>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
