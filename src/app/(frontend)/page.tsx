import Link from 'next/link'
import type { CSSProperties } from 'react'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { HeroVideo } from '@/components/HeroVideo'
import { Stats } from '@/components/Stats'
import { CategoriaCard } from '@/components/CategoriaCard'
import { TrabajoCard } from '@/components/TrabajoCard'
import { primeraFoto } from '@/lib/trabajoHelpers'
import { mediaUrl } from '@/lib/mediaUrl'
import { TargetIcon, ClockIcon, CertIcon, LightbulbIcon } from '@/components/icons'
import type { Categoria, Institucional as InstitucionalType, SiteSettings, Trabajo } from '@/lib/types'

const VALUE_PROPS = [
  {
    Icon: TargetIcon,
    titulo: 'Especialización',
    texto:
      'No hacemos mantenimiento ni reparaciones. Nos dedicamos exclusivamente a instalar ascensores y montacargas nuevos en obras nuevas — esa especialización es nuestra ventaja.',
  },
  {
    Icon: ClockIcon,
    titulo: 'Cumplimiento de plazos',
    texto:
      'Sabemos que un ascensor atrasado frena toda la obra. Coordinamos con la dirección de obra para que nuestro cronograma se cumpla.',
  },
  {
    Icon: CertIcon,
    titulo: 'Normativa y seguridad',
    texto: 'Cada instalación se hace conforme a la normativa vigente, para que tu obra no tenga problemas de habilitación por el ascensor.',
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
      limit: 6,
      depth: 1,
      overrideAccess: false,
    }),
  ])

  const trabajos = trabajosRes.docs as unknown as Trabajo[]
  const categorias = categoriasRes.docs as unknown as Categoria[]
  const destacados = (destacadosRes.docs as unknown as Trabajo[]).length > 0
    ? (destacadosRes.docs as unknown as Trabajo[])
    : trabajos.slice(0, 3)

  const heroImg = destacados.map((t) => mediaUrl(primeraFoto(t), 'hero')).find(Boolean)
  const s = settings as SiteSettings
  const inst = institucional as InstitucionalType

  return (
    <>
      <Header settings={s} />

      <section className="hero">
        <HeroVideo />
        <div className="wrap">
          <span className="kick hero-in" style={{ animationDelay: '0.1s' }}>
            ADS · Ascensores del Sur — Instalaciones, Obras y Proyectos
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
          <div className="shead" style={{ marginBottom: 36 }}>
            <span className="kick">Por qué elegirnos</span>
            <h2 className="st">Lo que nos diferencia en una obra</h2>
          </div>
          <div className="value-grid">
            {VALUE_PROPS.map((v, i) => (
              <div className="value-card" key={i}>
                <span className="vi">
                  <v.Icon size={22} />
                </span>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="shead ctr">
            <span className="kick">Calidad comprobable</span>
            <h2 className="st">No lo decimos nosotros, lo dicen los números</h2>
          </div>
        </div>
      </section>
      <Stats
        aniosTrayectoria={s.aniosTrayectoria ?? 30}
        totalTrabajos={trabajosRes.totalDocs}
        categorias={categoriasRes.totalDocs}
      />

      <section>
        <div className="wrap">
          <div className="cat-head">
            <div className="shead" style={{ marginBottom: 0 }}>
              <span className="kick">Productos</span>
              <h2 className="st">Soluciones de transporte vertical</h2>
            </div>
            <Link href="/productos" className="btn btn-out">
              Ver todos los productos
            </Link>
          </div>
          {categorias.length === 0 && (
            <p style={{ color: 'var(--slate)' }}>Todavía no hay categorías cargadas. Se agregan desde el backoffice.</p>
          )}
          <div className="cat-grid">
            {categorias.slice(0, 8).map((c) => (
              <CategoriaCard categoria={c} key={c.id} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--wash)' }}>
        <div className="wrap">
          <div className="cat-head">
            <div className="shead" style={{ marginBottom: 0 }}>
              <span className="kick">Trabajos realizados</span>
              <h2 className="st">Obras instaladas por ADS</h2>
            </div>
            <Link href="/trabajos" className="btn btn-primary">
              Ver todos los trabajos
            </Link>
          </div>
          {destacados.length === 0 && (
            <p style={{ color: 'var(--slate)' }}>Todavía no hay trabajos cargados. Se agregan desde el backoffice.</p>
          )}
          <div className="partner-grid">
            {destacados.slice(0, 3).map((t) => (
              <TrabajoCard trabajo={t} key={t.id} />
            ))}
          </div>
        </div>
      </section>

      <div
        className="about-photo-panel"
        style={heroImg ? ({ '--img': `url(${heroImg})` } as CSSProperties) : undefined}
      >
        <div className="wrap">
          <span className="kick">Nosotros</span>
          <h2 className="st">Más de {s.aniosTrayectoria ?? 30} años instalando transporte vertical.</h2>
          <p>{inst.textoPrincipal}</p>
          <div className="hero-cta" style={{ marginTop: 26 }}>
            <Link href="/nosotros" className="btn btn-primary">
              Conocé más
            </Link>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
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
