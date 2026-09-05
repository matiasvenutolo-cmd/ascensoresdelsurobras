import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import type { SiteSettings } from '@/lib/types'

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
    titulo: 'Constructoras y desarrolladoras',
    items: [
      'Cumplimiento de plazos que no retrasa la obra general.',
      'Coordinación fluida con otros gremios en obra.',
      'Experiencia en obras de distinta envergadura.',
      'Respaldo documental completo para la habilitación.',
    ],
  },
  {
    titulo: 'Arquitectos y estudios',
    items: [
      'Asesoramiento técnico que respeta el diseño arquitectónico.',
      'Flexibilidad en diseño de cabina y terminaciones.',
      'Soluciones para huecos no estándar.',
      'Información técnica clara para incorporar al proyecto.',
    ],
  },
  {
    titulo: 'Empresas y corporativos',
    items: [
      'Equipos de mayor capacidad y tráfico para edificios de uso intensivo.',
      'Diseño de cabina acorde a la imagen del edificio.',
      'Cumplimiento de normas de accesibilidad.',
    ],
  },
]

export default async function ServiciosPage() {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const s = settings as SiteSettings

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
            {AUDIENCIAS.map((a) => (
              <div className="audience-card" key={a.titulo}>
                <h3>{a.titulo}</h3>
                <ul>
                  {a.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
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
