import Link from 'next/link'
import type { CSSProperties } from 'react'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { HeroVideo } from '@/components/HeroVideo'
import { ProductShowcase } from '@/components/ProductShowcase'
import { TrabajosCarousel } from '@/components/TrabajosCarousel'
import { primeraFoto } from '@/lib/trabajoHelpers'
import { mediaUrl } from '@/lib/mediaUrl'
import { TargetIcon, ClockIcon, CertIcon, LightbulbIcon } from '@/components/icons'
import type { Categoria, Institucional as InstitucionalType, SiteSettings, Trabajo } from '@/lib/types'

const VALUE_PROPS = [
  {
    Icon: TargetIcon,
    titulo: 'Especialización',
    texto: 'Solo instalamos ascensores y montacargas nuevos en obras nuevas — no hacemos mantenimiento ni reparaciones.',
  },
  {
    Icon: ClockIcon,
    titulo: 'Cumplimiento de plazos',
    texto: 'Coordinamos con la dirección de obra para que nuestro cronograma se cumpla y no atrase el resto de la obra.',
  },
  {
    Icon: CertIcon,
    titulo: 'Normativa y seguridad',
    texto: 'Cada instalación se hace conforme a la normativa vigente, sin problemas de habilitación por el ascensor.',
  },
  {
    Icon: LightbulbIcon,
    titulo: 'Asesoramiento desde el anteproyecto',
    texto: 'Cuanto antes nos consultes, mejor va a ser el resultado técnico y económico de tu proyecto.',
  },
]

export const dynamic = 'force-dynamic'

export default async function Home() {
  const payload = await getPayload()

  const [settings, institucional, trabajosRes, categoriasRes, destacadosRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'institucional' }),
    payload.find({ collection: 'trabajos', limit: 300, depth: 1, overrideAccess: false }),
    payload.find({ collection: 'categorias', limit: 20, sort: 'orden' }),
    payload.find({
      collection: 'trabajos',
      where: { destacada: { equals: true } },
      limit: 8,
      depth: 1,
      overrideAccess: false,
    }),
  ])

  const trabajos = trabajosRes.docs as unknown as Trabajo[]
  const categorias = categoriasRes.docs as unknown as Categoria[]
  const destacados = (destacadosRes.docs as unknown as Trabajo[]).length > 0
    ? (destacadosRes.docs as unknown as Trabajo[])
    : trabajos.slice(0, 8)

  const heroImg = destacados.map((t) => mediaUrl(primeraFoto(t), 'hero')).find(Boolean)
  const featureImg = destacados.map((t) => mediaUrl(primeraFoto(t), 'card')).find(Boolean)
  const s = settings as SiteSettings
  const inst = institucional as InstitucionalType
  const localidades = Array.from(new Set(trabajos.map((t) => t.localidad).filter(Boolean))) as string[]

  return (
    <>
      <Header settings={s} />

      <section className="hero">
        <HeroVideo />
        <div className="wrap">
          <span className="kick hero-in" style={{ animationDelay: '0.1s' }}>
            Instalaciones, Obras y Proyectos
          </span>
          <h1 className="hero-in" style={{ animationDelay: '0.2s' }}>
            Ascensores y montacargas a medida, instalados por especialistas.
          </h1>
          <p className="hero-in" style={{ animationDelay: '0.35s' }}>
            Asesoramos, diseñamos, proyectamos, fabricamos e instalamos soluciones de transporte vertical para
            obras y edificios en todo el país.
          </p>
          <div className="hero-cta hero-in" style={{ animationDelay: '0.5s' }}>
            <Link href="/trabajos" className="btn btn-primary">
              Ver trabajos realizados
            </Link>
            <Link href="/contacto" className="btn btn-out-light">
              Contactanos
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="feature-split">
            <div className="feature-split-text">
              <div className="shead">
                <span className="kick">Por qué elegirnos</span>
                <h2 className="st">Lo que nos diferencia en una obra</h2>
              </div>
              <div className="feature-list">
                {VALUE_PROPS.map((v, i) => (
                  <div className="feature-list-item" key={i}>
                    <span className="vi">
                      <v.Icon size={19} />
                    </span>
                    <h3>{v.titulo}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="feature-split-img"
              style={featureImg ? ({ '--img': `url(${featureImg})` } as CSSProperties) : undefined}
            />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--wash)' }}>
        <div className="wrap">
          <div className="trayectoria-text">
            <span className="kick">Trayectoria en múltiples soluciones</span>
            <h2 className="st">No lo decimos nosotros, lo dicen los números</h2>
            <p>{inst.textoPrincipal}</p>
          </div>
          <div className="dir-stats" style={{ justifyContent: 'center' }}>
            <div className="dir-stat-chip">
              <b>{s.aniosTrayectoria ?? 30}+</b>
              <span>años de trayectoria</span>
            </div>
            <div className="dir-stat-chip">
              <b>{categoriasRes.totalDocs}</b>
              <span>tipos de equipo</span>
            </div>
            <div className="dir-stat-chip">
              <b>{localidades.length}</b>
              <span>localidades con obras</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cat-head">
            <div className="shead" style={{ marginBottom: 0 }}>
              <span className="kick">Productos y servicios</span>
              <h2 className="st">Toda la oferta de transporte vertical, un solo equipo</h2>
            </div>
            <Link href="/soluciones" className="btn btn-out">
              Conocé nuestras soluciones
            </Link>
          </div>
          {categorias.length === 0 ? (
            <p style={{ color: 'var(--slate)' }}>Todavía no hay categorías cargadas. Se agregan desde el backoffice.</p>
          ) : (
            <ProductShowcase categorias={categorias} />
          )}
        </div>
      </section>

      <section style={{ background: 'var(--wash)' }}>
        {destacados.length === 0 ? (
          <div className="wrap">
            <p style={{ color: 'var(--slate)' }}>Todavía no hay trabajos cargados. Se agregan desde el backoffice.</p>
          </div>
        ) : (
          <TrabajosCarousel trabajos={destacados} />
        )}
      </section>

      <div className="trust-band">
        <div className="wrap">
          <span className="kick">Confían en nosotros</span>
          <p>Trabajamos junto a constructoras, estudios de arquitectura y desarrolladoras en obras de todo el país.</p>
        </div>
      </div>

      <div className="closing-cta">
        <div className="wrap">
          <h2>¿Tenés un proyecto de obra en marcha?</h2>
          <p>Contanos en qué etapa está y te asesoramos sobre el equipo de transporte vertical que necesitás.</p>
          <Link href="/contacto" className="btn btn-out-light">
            Solicitar asesoramiento
          </Link>
        </div>
      </div>

      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
