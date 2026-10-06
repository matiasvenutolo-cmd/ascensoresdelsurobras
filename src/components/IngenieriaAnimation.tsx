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
      <svg className="ia-svg" viewBox="0 0 400 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
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
            <rect x="40" y="540" width="60" height="3" />
            <rect x="105" y="540" width="60" height="3" />
            <rect x="170" y="540" width="60" height="3" />
            <rect x="235" y="540" width="60" height="3" />
            <rect x="300" y="540" width="60" height="3" />
          </clipPath>
        </defs>

        <rect width="400" height="560" className="ia-bg" />
        <rect width="400" height="560" fill="url(#ia-grid)" />
        <rect width="400" height="560" fill="url(#ia-grid-major)" />

        <g className="ia-scene">
          <g className="ia-f-s1">
            <rect x="30" y="471" width="150" height="55" fill="url(#ia-earth)" />
            <rect x="240" y="471" width="130" height="55" fill="url(#ia-earth)" />
            <rect x="180" y="515" width="60" height="11" fill="url(#ia-earth)" />
          </g>
          <line x1="30" y1="470" x2="370" y2="470" pathLength="1" className="ia-stroke ia-draw ia-d-ground" />
          <line x1="90" y1="416" x2="310" y2="416" pathLength="1" className="ia-slab ia-draw ia-d-slab" />
          <line x1="90" y1="362" x2="310" y2="362" pathLength="1" className="ia-slab ia-draw ia-d-slab" />
          <line x1="90" y1="308" x2="310" y2="308" pathLength="1" className="ia-slab ia-draw ia-d-slab" />
          <line x1="90" y1="254" x2="310" y2="254" pathLength="1" className="ia-slab ia-draw ia-d-slab" />
          <path d="M90 470V150H310V470" pathLength="1" className="ia-stroke ia-wall ia-draw ia-d-building" />
          <g className="ia-f-s1">
            <text x="78" y="466" className="ia-floor ia-floor--zero">0</text>
            <text x="96" y="464" className="ia-label ia-label--soft">PLANTA BAJA</text>
            <text x="78" y="412" className="ia-floor">1°</text>
            <text x="78" y="358" className="ia-floor">2°</text>
            <text x="78" y="304" className="ia-floor">3°</text>
            <text x="78" y="250" className="ia-floor">4°</text>
          </g>

          <g className="ia-f-s2">
            <rect x="181" y="151" width="58" height="362" className="ia-shaft-cover" />
            <rect x="181" y="151" width="58" height="362" className="ia-shaft-tint" />
          </g>
          <path d="M180 150V514H240V150" pathLength="1" className="ia-stroke ia-draw ia-d-shaft" />
          <path d="M176 150V122H244V150" pathLength="1" className="ia-stroke ia-draw ia-d-room" />

          <g className="ia-f-s3">
            <rect x="181" y="151" width="58" height="59" className="ia-zone" />
            <rect x="181" y="471" width="58" height="42" className="ia-zone" />
            <path d="M314 254H344M314 470H344M314 514H344" className="ia-ext" />
            <line x1="336" y1="254" x2="336" y2="470" pathLength="1" className="ia-dim ia-draw ia-d-dim" />
            <path d="M331 259L341 249M331 475L341 465" className="ia-dim" />
            <text x="352" y="362" transform="rotate(-90 352 362)" className="ia-label ia-label--mid">RECORRIDO</text>
            <line x1="336" y1="470" x2="336" y2="514" pathLength="1" className="ia-dim ia-draw ia-d-dim" />
            <path d="M331 519L341 509" className="ia-dim" />
            <text x="346" y="490" className="ia-label ia-label--sm">BAJO</text>
            <text x="346" y="500" className="ia-label ia-label--sm">RECORRIDO</text>
            <path d="M176 136H150" className="ia-dim" />
            <text x="146" y="139" className="ia-label ia-label--end">SALA DE MÁQUINAS</text>
            <path d="M184 180H156L146 168H140" className="ia-dim" />
            <text x="136" y="171" className="ia-label ia-label--end">SOBRE RECORRIDO</text>
            <path d="M184 335H154L142 321H136" className="ia-dim" />
            <text x="132" y="324" className="ia-label ia-label--end">HUECO</text>
            <path d="M180 500H160L152 508" className="ia-dim" />
            <text x="148" y="511" className="ia-label ia-label--end">FOSO</text>
          </g>

          <line x1="187" y1="514" x2="187" y2="150" pathLength="1" className="ia-rail ia-draw ia-d-rails" />
          <line x1="233" y1="514" x2="233" y2="150" pathLength="1" className="ia-rail ia-draw ia-d-rails" />
          <g className="ia-machine">
            <path d="M190 146V128H230V146Z" className="ia-stroke" />
            <circle cx="210" cy="137" r="5.5" className="ia-stroke ia-pulley" />
          </g>
          <g className="ia-f-s4">
            <rect x="248" y="440" width="6" height="6" className="ia-light ia-l0" />
            <rect x="248" y="386" width="6" height="6" className="ia-light ia-l1" />
            <rect x="248" y="332" width="6" height="6" className="ia-light ia-l2" />
            <rect x="248" y="278" width="6" height="6" className="ia-light ia-l3" />
            <rect x="248" y="224" width="6" height="6" className="ia-light ia-l4" />
          </g>
          <rect x="209.25" y="146" width="1.5" height="278" className="ia-cable" />
          <g className="ia-cabin">
            <rect x="192" y="424" width="36" height="44" className="ia-cabin-body" />
            <line x1="210" y1="429" x2="210" y2="463" className="ia-cabin-door" />
          </g>
        </g>

        <rect x="40" y="540" width="60" height="3" className="ia-bar-track" />
        <rect x="105" y="540" width="60" height="3" className="ia-bar-track" />
        <rect x="170" y="540" width="60" height="3" className="ia-bar-track" />
        <rect x="235" y="540" width="60" height="3" className="ia-bar-track" />
        <rect x="300" y="540" width="60" height="3" className="ia-bar-track" />
        <g clipPath="url(#ia-bar-clip)">
          <rect x="40" y="540" width="320" height="3" className="ia-bar-fill" />
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
          <p className="ia-step-d">Integramos la solución al proyecto.</p>
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
