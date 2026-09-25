'use client'

import { useEffect, useRef, useState } from 'react'

export function IngenieriaAnimation() {
  const ref = useRef<HTMLElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure
      ref={ref}
      className="ia"
      data-paused={paused ? 'true' : 'false'}
      role="img"
      aria-label="Animación del proceso de trabajo de ADS: asesoramos, diseñamos, proyectamos, entregamos e instalamos"
    >
      <svg className="ia-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <pattern id="ia-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" className="ia-grid-minor" />
          </pattern>
          <pattern id="ia-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M100 0H0V100" className="ia-grid-major" />
          </pattern>
          <pattern id="ia-earth" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" className="ia-earth-line" />
          </pattern>
          <clipPath id="ia-bar-clip">
            <rect x="40" y="478" width="60" height="3" />
            <rect x="105" y="478" width="60" height="3" />
            <rect x="170" y="478" width="60" height="3" />
            <rect x="235" y="478" width="60" height="3" />
            <rect x="300" y="478" width="60" height="3" />
          </clipPath>
        </defs>

        <rect width="400" height="500" className="ia-bg" />
        <rect width="400" height="500" fill="url(#ia-grid)" />
        <rect width="400" height="500" fill="url(#ia-grid-major)" />

        <g className="ia-scene">
          <rect x="30" y="437" width="340" height="10" fill="url(#ia-earth)" className="ia-f-s1" />
          <line x1="30" y1="436" x2="370" y2="436" pathLength="1" className="ia-stroke ia-draw ia-d-ground" />
          <line x1="90" y1="376" x2="310" y2="376" pathLength="1" className="ia-slab ia-draw ia-d-slab" />
          <line x1="90" y1="316" x2="310" y2="316" pathLength="1" className="ia-slab ia-draw ia-d-slab" />
          <line x1="90" y1="256" x2="310" y2="256" pathLength="1" className="ia-slab ia-draw ia-d-slab" />
          <line x1="90" y1="196" x2="310" y2="196" pathLength="1" className="ia-slab ia-draw ia-d-slab" />
          <path d="M90 436V136H310V436" pathLength="1" className="ia-stroke ia-wall ia-draw ia-d-building" />
          <g className="ia-f-s1">
            <text x="78" y="431" className="ia-floor">PB</text>
            <text x="78" y="371" className="ia-floor">1°</text>
            <text x="78" y="311" className="ia-floor">2°</text>
            <text x="78" y="251" className="ia-floor">3°</text>
            <text x="78" y="191" className="ia-floor">4°</text>
          </g>

          <g className="ia-f-s2">
            <rect x="181" y="137" width="58" height="316" className="ia-shaft-cover" />
            <rect x="181" y="137" width="58" height="316" className="ia-shaft-tint" />
          </g>
          <path d="M180 136V454H240V136" pathLength="1" className="ia-stroke ia-draw ia-d-shaft" />
          <path d="M176 136V108H244V136" pathLength="1" className="ia-stroke ia-draw ia-d-room" />

          <g className="ia-f-s3">
            <path d="M314 196H344M314 436H344" className="ia-ext" />
            <line x1="336" y1="196" x2="336" y2="436" pathLength="1" className="ia-dim ia-draw ia-d-dim" />
            <path d="M331 201L341 191M331 441L341 431" className="ia-dim" />
            <text x="352" y="316" transform="rotate(-90 352 316)" className="ia-label ia-label--mid">
              RECORRIDO
            </text>
            <path d="M176 124H150" className="ia-dim" />
            <text x="146" y="127" className="ia-label ia-label--end">
              SALA DE MÁQUINAS
            </text>
            <path d="M184 286H154L142 272H136" className="ia-dim" />
            <text x="132" y="275" className="ia-label ia-label--end">
              HUECO
            </text>
            <path d="M180 450H160L152 458" className="ia-dim" />
            <text x="148" y="461" className="ia-label ia-label--end">
              FOSO
            </text>
          </g>

          <line x1="187" y1="454" x2="187" y2="136" pathLength="1" className="ia-rail ia-draw ia-d-rails" />
          <line x1="233" y1="454" x2="233" y2="136" pathLength="1" className="ia-rail ia-draw ia-d-rails" />
          <g className="ia-machine">
            <path d="M190 132V114H230V132Z" className="ia-stroke" />
            <circle cx="210" cy="123" r="5.5" className="ia-stroke ia-pulley" />
          </g>
          <g className="ia-f-s4">
            <rect x="248" y="406" width="6" height="6" className="ia-light ia-l0" />
            <rect x="248" y="346" width="6" height="6" className="ia-light ia-l1" />
            <rect x="248" y="286" width="6" height="6" className="ia-light ia-l2" />
            <rect x="248" y="226" width="6" height="6" className="ia-light ia-l3" />
            <rect x="248" y="166" width="6" height="6" className="ia-light ia-l4" />
          </g>
          <rect x="209.25" y="132" width="1.5" height="258" className="ia-cable" />
          <g className="ia-cabin">
            <rect x="192" y="390" width="36" height="44" className="ia-cabin-body" />
            <line x1="210" y1="395" x2="210" y2="429" className="ia-cabin-door" />
          </g>
        </g>

        <rect x="40" y="478" width="60" height="3" className="ia-bar-track" />
        <rect x="105" y="478" width="60" height="3" className="ia-bar-track" />
        <rect x="170" y="478" width="60" height="3" className="ia-bar-track" />
        <rect x="235" y="478" width="60" height="3" className="ia-bar-track" />
        <rect x="300" y="478" width="60" height="3" className="ia-bar-track" />
        <g clipPath="url(#ia-bar-clip)">
          <rect x="40" y="478" width="320" height="3" className="ia-bar-fill" />
        </g>
      </svg>

      <div className="ia-steps" aria-hidden="true">
        <div className="ia-step ia-step-1">
          <p className="ia-step-h">
            <span className="ia-step-n">01</span>
            <span>Asesoramos</span>
          </p>
          <p className="ia-step-d">Relevamos recorrido, cargas y condiciones de obra.</p>
        </div>
        <div className="ia-step ia-step-2">
          <p className="ia-step-h">
            <span className="ia-step-n">02</span>
            <span>Diseñamos</span>
          </p>
          <p className="ia-step-d">Integramos la solución al proyecto de arquitectura.</p>
        </div>
        <div className="ia-step ia-step-3">
          <p className="ia-step-h">
            <span className="ia-step-n">03</span>
            <span>Proyectamos</span>
          </p>
          <p className="ia-step-d">Definimos tipología, dimensiones y tecnología.</p>
        </div>
        <div className="ia-step ia-step-4">
          <p className="ia-step-h">
            <span className="ia-step-n">04</span>
            <span>Entregamos</span>
          </p>
          <p className="ia-step-d">Coordinamos la entrega con el respaldo de la planta propia.</p>
        </div>
        <div className="ia-step ia-step-5">
          <p className="ia-step-h">
            <span className="ia-step-n">05</span>
            <span>Instalamos</span>
          </p>
          <p className="ia-step-d">Acompañamos la obra hasta la puesta en servicio.</p>
        </div>
        <div className="ia-static">
          <p className="ia-step-h">
            <span>Proceso de obra</span>
          </p>
          <p className="ia-step-d">Asesoramos, diseñamos, proyectamos, entregamos e instalamos.</p>
        </div>
      </div>
    </figure>
  )
}
