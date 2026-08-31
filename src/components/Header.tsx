'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Isotipo } from './Isotipo'
import { MobileMenu } from './MobileMenu'
import type { SiteSettings } from '@/lib/types'

const NAV = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/productos', label: 'Productos' },
  { href: '/trabajos', label: 'Trabajos realizados' },
  { href: '/certificaciones', label: 'Certificaciones' },
  { href: '/contacto', label: 'Contacto' },
]

export function Header({}: { settings: SiteSettings }) {
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
          <MobileMenu items={NAV} />
        </div>
      </div>
    </header>
  )
}
