import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { CertIcon } from '@/components/icons'
import type { Certificacion, SiteSettings } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Certificaciones — ADS Ascensores del Sur',
  description: 'Certificados de componentes de seguridad para ascensores y montacargas.',
}

export default async function CertificacionesPage() {
  const payload = await getPayload()

  const [settings, certificacionesRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'certificaciones', limit: 100 }),
  ])

  const s = settings as SiteSettings
  const certificaciones = certificacionesRes.docs as unknown as Certificacion[]

  return (
    <>
      <Header settings={s} />

      <section className="dir-hero">
        <div className="wrap">
          <span className="kick">Certificaciones</span>
          <h1>Componentes de seguridad certificados</h1>
          <p>Certificados de componentes de seguridad para ascensores y montacargas, según la normativa vigente.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {certificaciones.length === 0 ? (
            <div className="empty-state">
              <h3>Certificaciones en trámite</h3>
              <p>
                Estamos gestionando las certificaciones de componentes de seguridad ante la Secretaría de Industria
                y Comercio (Resolución 27/2025). Se van a publicar acá a medida que estén disponibles.
              </p>
            </div>
          ) : (
            <div className="cert-grid">
              {certificaciones.map((c) => (
                <a key={c.id} className="cert-card" href={c.url || '#'} target="_blank" rel="noopener noreferrer">
                  <span className="cert-icon">
                    <CertIcon size={22} />
                  </span>
                  <span className="cert-name">{c.nombre}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
