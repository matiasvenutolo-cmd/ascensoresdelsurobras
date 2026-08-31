import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { mediaUrl } from '@/lib/mediaUrl'
import { primeraFoto } from '@/lib/trabajoHelpers'
import type { Institucional as InstitucionalType, SiteSettings, Trabajo } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Nosotros — ADS Ascensores del Sur',
  description: 'Más de 30 años de trayectoria instalando ascensores y montacargas a medida en todo el país.',
}

export default async function NosotrosPage() {
  const payload = await getPayload()

  const [settings, institucional, trabajosRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'institucional' }),
    payload.find({ collection: 'trabajos', limit: 6, depth: 1, overrideAccess: false }),
  ])

  const s = settings as SiteSettings
  const inst = institucional as InstitucionalType
  const trabajos = trabajosRes.docs as unknown as Trabajo[]
  const heroImg = trabajos.map((t) => mediaUrl(primeraFoto(t), 'hero')).find(Boolean)

  return (
    <>
      <Header settings={s} />

      <div
        className="about-photo-panel"
        style={{ paddingTop: 150, ...(heroImg ? ({ '--img': `url(${heroImg})` } as CSSProperties) : {}) }}
      >
        <div className="wrap">
          <span className="kick">Nosotros</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, margin: '10px 0 16px', maxWidth: '20ch' }}>
            Instalaciones, Obras y Proyectos
          </h1>
          <p>{inst.textoPrincipal}</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="shead">
            <span className="kick">Cómo trabajamos</span>
            <h2 className="st">Nuestros pilares</h2>
          </div>
          <div className="objlist">
            {(inst.pilares || []).map((p, i) => (
              <div className="objrow" key={i}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.titulo}</h3>
                <p>{p.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--wash)' }}>
        <div className="wrap">
          <div className="dir-stats">
            <div className="dir-stat-chip">
              <b>{s.aniosTrayectoria ?? 30}+</b>
              <span>años de trayectoria</span>
            </div>
            <div className="dir-stat-chip">
              <b>{s.planta ?? 'Lanús'}</b>
              <span>planta industrial</span>
            </div>
            <div className="dir-stat-chip">
              <b>{s.sucursal ?? 'Villa Gesell'}</b>
              <span>sucursal propia</span>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
