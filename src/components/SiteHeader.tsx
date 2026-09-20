'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { OpenDrawerButton } from './ContactDrawer'
import { SITE } from '@/data/site'

const NAV = [
  { href: '#empresa', label: 'La empresa' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#soluciones', label: 'Soluciones' },
  { href: '#obras', label: 'Obras' },
  { href: '#ingenieria', label: 'Ingeniería' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header className={`site-header${!isHome ? ' solid' : ''}${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav">
        <Link href="/" className="brand" aria-label={SITE.nombre}>
          <img src="/logo/ads-logo.png" alt={SITE.nombre} />
        </Link>
        <div className="nav-links">
          {NAV.map((n) => (
            <Link key={n.href} href={isHome ? n.href : `/${n.href}`}>
              {n.label}
            </Link>
          ))}
        </div>
        <OpenDrawerButton className="nav-cta">Hablemos</OpenDrawerButton>
      </nav>
    </header>
  )
}
