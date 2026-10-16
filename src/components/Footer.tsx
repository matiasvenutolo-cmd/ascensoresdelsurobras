import Link from 'next/link'
import { SITE } from '@/data/site'

export function Footer() {
  return (
    <footer>
      <div className="footer-in">
        <div>
          <div className="footer-brand">{SITE.nombre}</div>
          <div className="footer-small">{SITE.slogan}</div>
        </div>
        <div>
          <div className="footer-slogan">Vendemos calidad, instalamos confianza.</div>
          <div className="footer-small">
            Cobertura: {[SITE.coberturaAmba, ...SITE.coberturaCosta].join(' · ')}
          </div>
        </div>
        <div className="footer-small">
          © {new Date().getFullYear()} ADS · <Link href="/privacidad">Política de privacidad</Link>
        </div>
      </div>
    </footer>
  )
}
