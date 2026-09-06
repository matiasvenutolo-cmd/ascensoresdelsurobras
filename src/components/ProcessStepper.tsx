'use client'

import { useState } from 'react'

export function ProcessStepper({ steps }: { steps: { titulo: string; descripcion: string }[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <div
          key={i}
          className={`stepper-item${active === i ? ' active' : ''}`}
          onMouseEnter={() => setActive(i)}
          onClick={() => setActive(i)}
        >
          <span className="num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{s.titulo}</h3>
          <p>{s.descripcion}</p>
        </div>
      ))}
    </div>
  )
}
