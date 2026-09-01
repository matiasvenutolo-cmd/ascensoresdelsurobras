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
          <span className="kick">Normativa y certificaciones</span>
          <h1>Instalaciones conformes a la normativa vigente</h1>
          <p>
            Cada instalación se lleva adelante conforme a la normativa argentina que regula el transporte vertical,
            trabajando en conjunto con proveedores y componentes certificados.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="shead">
            <span className="kick">Marco normativo</span>
            <h2 className="st">Qué normas aplican a una instalación</h2>
          </div>
          <div className="ficha-grid">
            <div className="ficha-card">
              <h4>Normas IRAM</h4>
              <p>
                Las normas IRAM 3617 (ascensores eléctricos) e IRAM 3625 (ascensores hidráulicos) establecen las
                reglas de seguridad para la construcción e instalación de ascensores en Argentina.
              </p>
            </div>
            <div className="ficha-card">
              <h4>Código de Edificación</h4>
              <p>
                Cada jurisdicción (por ejemplo, el Código de Edificación de CABA) establece los requisitos de
                ascensores según la altura y el uso del edificio.
              </p>
            </div>
            <div className="ficha-card">
              <h4>Accesibilidad</h4>
              <p>
                La Ley 24.314 de Protección Integral de los Discapacitados establece requerimientos de accesibilidad
                que se tienen en cuenta en el diseño de la instalación.
              </p>
            </div>
            <div className="ficha-card">
              <h4>Habilitación</h4>
              <p>
                Acompañamos la gestión de la documentación técnica necesaria para la habilitación del equipo ante el
                organismo de control de cada jurisdicción.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--wash)' }}>
        <div className="wrap">
          <div className="shead">
            <span className="kick">Certificaciones</span>
            <h2 className="st">Componentes de seguridad certificados</h2>
          </div>
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
