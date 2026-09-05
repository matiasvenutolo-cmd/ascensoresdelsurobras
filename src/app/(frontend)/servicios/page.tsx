import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { primeraFoto } from '@/lib/trabajoHelpers'
import { mediaUrl } from '@/lib/mediaUrl'
import type { SiteSettings, Trabajo } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Servicios — ADS Ascensores del Sur',
  description: 'Asesoramiento técnico, provisión del equipo, instalación en obra, puesta en marcha y capacitación.',
}

const ETAPAS = [
  {
    titulo: 'Asesoramiento técnico en etapa de proyecto',
    descripcion:
      'Trabajamos junto al arquitecto o ingeniero desde el anteproyecto: revisión de planos, dimensionamiento del hueco de ascensor y recomendación del tipo de equipo según el uso y el tráfico esperado del edificio.',
  },
  {
    titulo: 'Provisión del equipo',
    descripcion:
      'Ascensores hidráulicos, electromecánicos, sin sala de máquinas, monta vehículos, montacargas y monta platos, con distintas opciones de cabina, puertas y sistemas de control según el proyecto.',
  },
  {
    titulo: 'Instalación en obra',
    descripcion:
      'Coordinamos con la dirección de obra y el resto de los gremios para instalar el equipo dentro del cronograma general, con supervisión técnica permanente.',
  },
  {
    titulo: 'Puesta en marcha y habilitación',
    descripcion:
      'Pruebas de funcionamiento, ajustes finales y acompañamiento en la gestión de la documentación técnica necesaria para la habilitación.',
  },
  {
    titulo: 'Capacitación post-instalación',
    descripcion:
      'Entrenamos al encargado del edificio en el uso y los cuidados básicos del equipo, y quedamos disponibles ante cualquier consulta posterior a la entrega.',
  },
]

const AUDIENCIAS = [
  {
    slug: 'constructora',
    titulo: 'Constructoras y desarrolladoras',
    items: [
      'Cumplimiento de plazos que no retrasa la obra general.',
      'Coordinación fluida con otros gremios en obra.',
      'Experiencia en obras de distinta envergadura.',
      'Respaldo documental completo para la habilitación.',
    ],
    cta: 'Coordiná el cronograma con nosotros',
    // Señal de escala: instalaciones de más de un equipo en la misma obra
    // (baterías de ascensores, ascensor + monta vehículo).
    filtro: (t: Trabajo) => (t.equipos?.length ?? 0) > 1,
  },
  {
    slug: 'arquitecto',
    titulo: 'Arquitectos y estudios',
    items: [
      'Asesoramiento técnico que respeta el diseño arquitectónico.',
      'Flexibilidad en diseño de cabina y terminaciones.',
      'Soluciones para huecos no estándar.',
      'Información técnica clara para incorporar al proyecto.',
    ],
    cta: 'Pedí asesoramiento técnico',
    filtro: null as ((t: Trabajo) => boolean) | null,
  },
  {
    slug: 'desarrollador',
    titulo: 'Empresas y corporativos',
    items: [
      'Equipos de mayor capacidad y tráfico para edificios de uso intensivo.',
      'Diseño de cabina acorde a la imagen del edificio.',
      'Cumplimiento de normas de accesibilidad.',
    ],
    cta: 'Cotizá tu proyecto corporativo',
    filtro: (t: Trabajo) => t.tipoEdificio === 'corporativo' || t.tipoEdificio === 'industrial',
  },
]

export default async function ServiciosPage() {
  const payload = await getPayload()
  const [settings, trabajosRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'trabajos', limit: 300, depth: 1, overrideAccess: false }),
  ])
  const s = settings as SiteSettings
  const trabajos = trabajosRes.docs as unknown as Trabajo[]

  // Reparte ejemplos reales entre audiencias sin repetir el mismo trabajo dos
  // veces: primero se asignan las audiencias con filtro específico
  // (constructoras, corporativos); lo que sobra de destacados va para
  // arquitectos, que no tiene una señal propia para filtrar por.
  const usados = new Set<string | number>()
  const ejemplosPorSlug = new Map<string, Trabajo[]>()
  const conFiltro = AUDIENCIAS.filter((a) => a.filtro)
  const sinFiltro = AUDIENCIAS.filter((a) => !a.filtro)
  for (const a of [...conFiltro, ...sinFiltro]) {
    const candidatos = a.filtro
      ? trabajos.filter((t) => a.filtro!(t) && !usados.has(t.id))
      : trabajos.filter((t) => t.destacada && !usados.has(t.id))
    const elegidos = candidatos.slice(0, 2)
    elegidos.forEach((t) => usados.add(t.id))
    ejemplosPorSlug.set(a.slug, elegidos)
  }

  return (
    <>
      <Header settings={s} />

      <section className="dir-hero">
        <div className="wrap">
          <span className="kick">Servicios</span>
          <h1>De la etapa de proyecto a la obra entregada</h1>
          <p>
            Nos dedicamos a la instalación de ascensores y montacargas nuevos en obras nuevas. Acompañamos cada
            proyecto desde el anteproyecto hasta la puesta en marcha.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="objlist">
            {ETAPAS.map((e, i) => (
              <div className="objrow" key={i}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{e.titulo}</h3>
                <p>{e.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--wash)' }}>
        <div className="wrap">
          <div className="shead">
            <span className="kick">Para quién trabajamos</span>
            <h2 className="st">Nos adaptamos al rol de cada interlocutor en la obra</h2>
          </div>
          <div className="audience-grid">
            {AUDIENCIAS.map((a) => {
              const ejemplos = ejemplosPorSlug.get(a.slug) || []
              return (
                <div className="audience-card" key={a.slug}>
                  <h3>{a.titulo}</h3>
                  <ul>
                    {a.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  {ejemplos.length > 0 && (
                    <div className="audience-examples">
                      {ejemplos.map((t) => {
                        const img = mediaUrl(primeraFoto(t), 'thumbnail')
                        return (
                          <Link
                            href={`/trabajos/${t.slug}`}
                            key={t.id}
                            className="audience-example"
                            style={img ? ({ '--img': `url(${img})` } as CSSProperties) : undefined}
                          >
                            <span className="ae-thumb" />
                            <span className="ae-title">{t.titulo}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                  <Link href={`/contacto?rol=${a.slug}`} className="btn btn-out btn-sm audience-cta">
                    {a.cta}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cat-head">
            <div className="shead" style={{ marginBottom: 0 }}>
              <span className="kick">Tipos de equipo</span>
              <h2 className="st">Conocé nuestra gama de productos</h2>
            </div>
            <Link href="/productos" className="btn btn-primary">
              Ver productos
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="shead ctr">
            <span className="kick">¿Tenés un proyecto en marcha?</span>
            <h2 className="st">Contanos en qué etapa está tu obra</h2>
          </div>
          <Link href="/contacto" className="btn btn-primary">
            Solicitar presupuesto
          </Link>
        </div>
      </section>

      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
