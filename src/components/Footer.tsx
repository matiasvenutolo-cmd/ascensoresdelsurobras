import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'
import { Isotipo } from './Isotipo'
import { InstagramIcon, FacebookIcon, LinkedinIcon } from './icons'

export function Footer({ settings }: { settings: SiteSettings }) {
  const redes = [
    settings.instagram && { href: settings.instagram, label: 'Instagram', Icon: InstagramIcon },
    settings.facebook && { href: settings.facebook, label: 'Facebook', Icon: FacebookIcon },
    settings.linkedin && { href: settings.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof InstagramIcon }[]

  return (
    <footer id="contacto">
      <div className="wrap">
        <div className="cols">
          <div>
            <Isotipo className="footer-brand-mark" />
            <p style={{ marginTop: 4, maxWidth: 320, fontSize: 13.5 }}>
              Instalaciones, obras y proyectos de ascensores y montacargas a medida. Más de{' '}
              {settings.aniosTrayectoria ?? 30} años de trayectoria, planta industrial en {settings.planta ?? 'Lanús'}{' '}
              y sucursal en {settings.sucursal ?? 'Villa Gesell'}.
            </p>
            {redes.length > 0 && (
              <div className="footer-social">
                {redes.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href.startsWith('http') ? href : `https://${href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4>Secciones</h4>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/servicios">Servicios</Link>
            <Link href="/productos">Productos</Link>
            <Link href="/trabajos">Proyectos</Link>
            <Link href="/certificaciones">Normativa</Link>
          </div>
          <div>
            <h4>Contacto</h4>
            {settings.direccion && <p>{settings.direccion}</p>}
            {settings.telefono && <p>{settings.telefono}</p>}
            {settings.email && <p>{settings.email}</p>}
            <Link href="/faq">Preguntas frecuentes</Link>
            <Link href="/privacidad">Política de privacidad</Link>
          </div>
        </div>
        <div className="bot">
          <span>© {new Date().getFullYear()} ADS — Ascensores del Sur · Instalaciones, Obras y Proyectos</span>
        </div>
      </div>
    </footer>
  )
}
