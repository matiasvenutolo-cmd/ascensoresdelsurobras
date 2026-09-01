'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Isotipo } from './Isotipo'
import { MobileMenu } from './MobileMenu'
import { PhoneIcon, WhatsappIcon } from './icons'
import type { SiteSettings } from '@/lib/types'

const NAV = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/productos', label: 'Productos' },
  { href: '/trabajos', label: 'Proyectos' },
  { href: '/certificaciones', label: 'Normativa' },
  { href: '/contacto', label: 'Contacto' },
]

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.45)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header className={!isHome || scrolled ? 'scrolled' : ''}>
      <div className="wrap nav">
        <Link href="/" className="brand">
          <Isotipo className="brand-mark" />
        </Link>
        <div className="nav-right">
          <nav className="links">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="nav-contact">
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-btn"
                aria-label="WhatsApp"
              >
                <WhatsappIcon size={18} />
              </a>
            )}
            {settings.telefono && (
              <a href={`tel:${settings.telefono.replace(/[^0-9+]/g, '')}`} className="nav-icon-btn" aria-label="Llamar">
                <PhoneIcon size={16} />
              </a>
            )}
            <Link href="/contacto" className="btn btn-primary btn-sm nav-cta">
              Solicitar presupuesto
            </Link>
          </div>
          <MobileMenu items={NAV} />
        </div>
      </div>
    </header>
  )
}
