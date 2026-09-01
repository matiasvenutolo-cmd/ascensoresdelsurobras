import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import type { SiteSettings } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes — ADS Ascensores del Sur',
  description: 'Respuestas a las consultas más habituales sobre instalación de ascensores y montacargas en obra.',
}

const FAQ_GROUPS = [
  {
    categoria: 'Comerciales',
    preguntas: [
      {
        q: '¿Cuánto cuesta instalar un ascensor nuevo?',
        a: 'Depende del tipo de equipo, la cantidad de paradas, la carga y las terminaciones elegidas. Cotizamos a medida de cada proyecto — contanos los datos básicos de tu obra desde el formulario de contacto.',
      },
      {
        q: '¿En qué momento de la obra conviene contratar la instalación del ascensor?',
        a: 'Cuanto antes se defina el hueco del ascensor, mejor. Recomendamos consultarnos desde el anteproyecto para que el dimensionamiento quede bien resuelto desde el principio.',
      },
      {
        q: '¿Cuál es el plazo de entrega e instalación?',
        a: 'Varía según el tipo de equipo y la cantidad de ascensores del proyecto. Te lo precisamos en la cotización, una vez que conocemos los detalles de tu obra.',
      },
    ],
  },
  {
    categoria: 'Técnicas',
    preguntas: [
      {
        q: '¿Qué tipos de ascensores existen y cuál me conviene?',
        a: 'Trabajamos con equipos hidráulicos, electromecánicos y sin sala de máquinas, además de monta vehículos, montacargas y monta platos. La elección depende de la altura del edificio, el uso y el espacio disponible — te asesoramos para elegir el más adecuado.',
      },
      {
        q: '¿Qué dimensiones necesita el hueco del ascensor?',
        a: 'Cada tipo y capacidad de equipo tiene requisitos propios de hueco, foso y sobrerecorrido. Es justamente uno de los puntos que revisamos en el asesoramiento técnico de la etapa de proyecto.',
      },
      {
        q: '¿Qué es un ascensor sin sala de máquinas?',
        a: 'Es un ascensor de aplicación similar al electromecánico, pero con la sala de máquinas ubicada en el sobre recorrido, sin necesidad de un cuarto de máquinas aparte.',
      },
    ],
  },
  {
    categoria: 'De proceso',
    preguntas: [
      {
        q: '¿Cómo es el proceso de trabajo con ADS?',
        a: 'Asesoramos en la etapa de proyecto, proveemos el equipo, lo instalamos coordinando con la dirección de obra, hacemos la puesta en marcha y capacitamos al encargado del edificio. Podés ver el detalle en la sección Servicios.',
      },
      {
        q: '¿Puedo ver trabajos que ya hicieron?',
        a: 'Sí, en la sección Proyectos publicamos obras reales que instalamos, con fotos y ficha técnica de cada equipo.',
      },
    ],
  },
]

export default async function FaqPage() {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const s = settings as SiteSettings

  return (
    <>
      <Header settings={s} />

      <section className="dir-hero">
        <div className="wrap">
          <span className="kick">Preguntas frecuentes</span>
          <h1>Lo que más nos preguntan</h1>
          <p>Si tu consulta no está acá, escribinos directamente desde la sección de contacto.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {FAQ_GROUPS.map((group) => (
            <div key={group.categoria} style={{ marginBottom: 40 }}>
              <span className="kick">{group.categoria}</span>
              <div className="faq-list">
                {group.preguntas.map((item, i) => (
                  <details className="faq-item" key={i}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
