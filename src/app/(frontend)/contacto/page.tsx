import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { CotizacionForm } from '@/components/CotizacionForm'
import { MailIcon, PhoneIcon, PinIcon, WhatsappIcon } from '@/components/icons'
import { primeraFoto } from '@/lib/trabajoHelpers'
import { mediaUrl } from '@/lib/mediaUrl'
import type { SiteSettings, Trabajo } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contacto — ADS Ascensores del Sur',
  description: 'Contactanos para tu obra de instalación de ascensores o montacargas.',
}

export default async function ContactoPage() {
  const payload = await getPayload()
  const [settings, trabajosRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'trabajos',
      where: { destacada: { equals: true } },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    }),
  ])
  const s = settings as SiteSettings
  const destacado = (trabajosRes.docs as unknown as Trabajo[])[0]
  const panelImg = destacado ? mediaUrl(primeraFoto(destacado), 'hero') : undefined
  const testimonio = s.testimonio

  return (
    <>
      <Header settings={s} />

      <section className="dir-hero">
        <div className="wrap">
          <span className="kick">Contacto</span>
          <h1>Contanos sobre tu obra</h1>
          <p>Completá el formulario con los datos de tu proyecto y te respondemos con una cotización.</p>
        </div>
      </section>

      <section>
        <div className="wrap contact-grid">
          <div>
            <CotizacionForm />
          </div>
          <div>
            <div
              className="feature-split-img"
              style={panelImg ? ({ '--img': `url(${panelImg})` } as CSSProperties) : undefined}
            />
            {testimonio?.cita && (
              <div className="quote-card">
                <p>&ldquo;{testimonio.cita}&rdquo;</p>
                <cite>
                  {testimonio.autor}
                  {testimonio.rol && <span> — {testimonio.rol}</span>}
                </cite>
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--wash)' }}>
        <div className="wrap contact-grid">
          <div className="contact-info">
            {s.direccion && (
              <div className="contact-item">
                <span className="ci-icon">
                  <PinIcon size={18} />
                </span>
                <div>
                  <h4>Dirección</h4>
                  <p>{s.direccion}</p>
                </div>
              </div>
            )}
            {s.telefono && (
              <div className="contact-item">
                <span className="ci-icon">
                  <PhoneIcon size={18} />
                </span>
                <div>
                  <h4>Teléfono</h4>
                  <a href={`tel:${s.telefono.replace(/[^0-9+]/g, '')}`}>{s.telefono}</a>
                </div>
              </div>
            )}
            {s.email && (
              <div className="contact-item">
                <span className="ci-icon">
                  <MailIcon size={18} />
                </span>
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                </div>
              </div>
            )}
            {s.whatsapp && (
              <div className="contact-item">
                <span className="ci-icon">
                  <WhatsappIcon size={18} />
                </span>
                <div>
                  <h4>WhatsApp</h4>
                  <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    Escribinos por WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="map-frame">
            <iframe
              title="Ubicación ADS — Ascensores del Sur"
              src={`https://www.google.com/maps?q=${encodeURIComponent(s.direccion || 'Lanús, Buenos Aires')}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
