'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'

export type RoleTabData = {
  slug: string
  titulo: string
  items: string[]
  cta: string
  ejemplos: { slug: string; titulo: string; img?: string }[]
}

export function RoleTabs({ tabs }: { tabs: RoleTabData[] }) {
  const [active, setActive] = useState(0)
  const tab = tabs[active]

  return (
    <div>
      <div className="tabs-head" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.slug}
            role="tab"
            aria-selected={active === i}
            className={active === i ? 'active' : ''}
            onClick={() => setActive(i)}
          >
            {t.titulo}
          </button>
        ))}
      </div>
      <div className="audience-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="audience-card">
          <ul>
            {tab.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          {tab.ejemplos.length > 0 && (
            <div className="audience-examples">
              {tab.ejemplos.map((e) => (
                <Link
                  href={`/trabajos/${e.slug}`}
                  key={e.slug}
                  className="audience-example"
                  style={e.img ? ({ '--img': `url(${e.img})` } as CSSProperties) : undefined}
                >
                  <span className="ae-thumb" />
                  <span className="ae-title">{e.titulo}</span>
                </Link>
              ))}
            </div>
          )}
          <Link href={`/contacto?rol=${tab.slug}`} className="btn btn-primary btn-sm audience-cta">
            {tab.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
