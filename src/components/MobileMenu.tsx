'use client'

import { useState } from 'react'
import { MenuIcon, CloseIcon } from './icons'

export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Abrir menú" className="menu-btn">
        <MenuIcon />
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.45)',
            zIndex: 100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 'min(84vw, 340px)',
              height: '100%',
              background: '#fff',
              padding: 22,
              overflow: 'auto',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}
              aria-label="Cerrar menú"
            >
              <CloseIcon size={24} />
            </button>
            <div style={{ clear: 'both' }} />
            {items.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 4px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 17,
                  color: 'var(--ink)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
