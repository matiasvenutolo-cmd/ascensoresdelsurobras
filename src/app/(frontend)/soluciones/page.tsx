import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { SolucionesSubnav } from '@/components/SolucionesSubnav'
import { ProcessStepper } from '@/components/ProcessStepper'
import { RoleTabs, type RoleTabData } from '@/components/RoleTabs'
import { CertIcon, ClockIcon, FactoryIcon, LightbulbIcon, TargetIcon } from '@/components/icons'
import { mediaUrl } from '@/lib/mediaUrl'
import { primeraFoto } from '@/lib/trabajoHelpers'
import type { Categoria, Certificacion, Institucional as InstitucionalType, SiteSettings, Trabajo } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Soluciones — ADS Ascensores del Sur',
  description:
    'Asesoramiento técnico, provisión del equipo, instalación en obra, normativa y cobertura de ADS — Ascensores del Sur.',
}

const ETAPAS = [
  {
    titulo: 'Asesoramiento técnico en etapa de proyecto',
    descripcion:
      'Trabajamos junto al arquitecto o ingeniero desde el anteproyecto: revisión de planos, dimensionamiento del hueco y recomendación del tipo de equipo según uso y tráfico esperado.',
  },
  {
    titulo: 'Provisión del equipo',
    descripcion:
      'Hidráulicos, electromecánicos, sin sala de máquinas, monta vehículos, montacargas y monta platos, con distintas opciones de cabina, puertas y sistemas de control.',
  },
  {
    titulo: 'Instalación en obra',
    descripcion:
      'Coordinamos con la dirección de obra y el resto de los gremios para instalar dentro del cronograma general, con supervisión técnica permanente.',
  },
  {
    titulo: 'Puesta en marcha y habilitación',
    descripcion: 'Pruebas de funcionamiento, ajustes finales y acompañamiento en la documentación técnica para la habilitación.',
  },
  {
    titulo: 'Capacitación post-instalación',
    descripcion: 'Entrenamos al encargado del edificio en el uso y los cuidados básicos del equipo.',
  },
]

const DIFERENCIALES = [
  {
    Icon: TargetIcon,
    titulo: 'Especialización',
    texto:
      'Solo instalación de equipos nuevos en obra nueva. No hacemos mantenimiento ni reparaciones — esa especialización es la ventaja.',
  },
  {
    Icon: ClockIcon,
    titulo: 'Cumplimiento de plazos',
    texto: 'Un ascensor atrasado frena toda la obra. Coordinamos con la dirección de obra para que el cronograma se cumpla.',
  },
  {
    Icon: FactoryIcon,
    titulo: 'Fabricación propia y equipos a medida',
    texto: 'Planta industrial propia en Lanús: soluciones para huecos no estándar y terminaciones según proyecto.',
  },
  {
    Icon: LightbulbIcon,
    titulo: 'Asesoramiento desde el anteproyecto',
    texto: 'Cuanto antes entramos, mejor es el resultado técnico y económico del proyecto.',
  },
]

const NORMATIVA = [
  {
    norma: 'IRAM 3617',
    tag: 'Ascensores eléctricos',
    detalle: 'Reglas de seguridad de construcción e instalación para ascensores eléctricos.',
  },
  {
    norma: 'IRAM 3625',
    tag: 'Ascensores hidráulicos',
    detalle: 'Reglas de seguridad de construcción e instalación para ascensores hidráulicos.',
  },
  {
    norma: 'Código de Edificación',
    tag: 'Según altura y uso',
    detalle: 'Cada jurisdicción (ej. CABA) establece requisitos de ascensores según la altura y el uso del edificio.',
  },
  {
    norma: 'Ley 24.314',
    tag: 'Accesibilidad',
    detalle: 'Requerimientos de accesibilidad considerados en el diseño de la instalación.',
  },
  {
    norma: 'Habilitación',
    tag: 'Documentación técnica',
    detalle: 'Acompañamiento en la documentación técnica ante el organismo de control de cada jurisdicción.',
  },
]

const ROLES: {
  slug: string
  titulo: string
  items: string[]
  cta: string
  ejemploSlugs: string[]
}[] = [
  {
    slug: 'constructora',
    titulo: 'Constructoras y desarrolladoras',
    items: [
      'Cumplimiento de plazos que no retrasa la obra general.',
      'Coordinación fluida con otros gremios.',
      'Experiencia en obras de distinta envergadura.',
      'Respaldo documental completo para la habilitación.',
    ],
    cta: 'Coordiná el cronograma con nosotros',
    ejemploSlugs: ['riobamba-n-147', '2-de-mayo-n-2831'],
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
    ejemploSlugs: ['gobernador-irigoyen-n-122', 'coronel-delia-n-1551-sala-salud'],
  },
  {
    slug: 'desarrollador',
    titulo: 'Empresas y corporativos',
    items: [
      'Equipos de mayor capacidad y tráfico para uso intensivo.',
      'Diseño de cabina acorde a la imagen del edificio.',
      'Cumplimiento de normas de accesibilidad.',
    ],
    cta: 'Cotizá tu proyecto corporativo',
    ejemploSlugs: ['o-higgins-n-365-adsur-s-a', 'ayacucho-n-873-coelpla-sudamericana'],
  },
]

export default async function SolucionesPage() {
  const payload = await getPayload()

  const [settings, institucional, trabajosRes, categoriasRes, certificacionesRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'institucional' }),
    payload.find({ collection: 'trabajos', limit: 300, depth: 1, overrideAccess: false }),
    payload.find({ collection: 'categorias', limit: 50, sort: 'orden' }),
    payload.find({ collection: 'certificaciones', limit: 100 }),
  ])

  const s = settings as SiteSettings
  const inst = institucional as InstitucionalType
  const trabajos = trabajosRes.docs as unknown as Trabajo[]
  const categorias = categoriasRes.docs as unknown as Categoria[]
  const certificaciones = certificacionesRes.docs as unknown as Certificacion[]

  const trabajosPorSlug = new Map(trabajos.map((t) => [t.slug, t]))
  const roleTabs: RoleTabData[] = ROLES.map((r) => ({
    slug: r.slug,
    titulo: r.titulo,
    items: r.items,
    cta: r.cta,
    ejemplos: r.ejemploSlugs
      .map((slug) => trabajosPorSlug.get(slug))
      .filter((t): t is Trabajo => Boolean(t))
      .map((t) => ({ slug: t.slug as string, titulo: t.titulo, img: mediaUrl(primeraFoto(t), 'thumbnail') })),
  }))

  const localidades = Array.from(new Set(trabajos.map((t) => t.localidad).filter(Boolean))) as string[]

  return (
    <>
      <Header settings={s} />

      <section className="dir-hero">
        <div className="wrap">
          <span className="kick">Soluciones</span>
          <h1>Del anteproyecto a la obra entregada</h1>
          <p>
            Más de {s.aniosTrayectoria ?? 30} años instalando transporte vertical a medida en obra nueva, con
            asesoramiento desde las primeras etapas del proyecto.
          </p>
          <div className="hero-cta">
            <Link href="/contacto" className="btn btn-primary">
              Solicitar presupuesto
            </Link>
            <Link href="/trabajos" className="btn btn-out">
              Ver obras realizadas
            </Link>
          </div>
        </div>
      </section>

      <SolucionesSubnav />

      <section id="que-hacemos" style={{ background: 'var(--wash)' }}>
        <div className="wrap">
          <div className="shead" style={{ maxWidth: 720, margin: '0 auto 36px', textAlign: 'center' }}>
            <span className="kick">Qué hacemos</span>
            <h2 className="st">{inst.textoPrincipal}</h2>
          </div>

          <div className="value-chain" style={{ justifyContent: 'center', marginBottom: 36 }}>
            {['Asesoramos', 'Diseñamos', 'Proyectamos', 'Fabricamos', 'Instalamos'].map((v, i, arr) => (
              <span key={v} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {v}
                {i < arr.length - 1 && <span className="vc-arrow">→</span>}
              </span>
            ))}
          </div>

          <div className="dir-stats" style={{ justifyContent: 'center', marginBottom: 36 }}>
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

          {categorias.length > 0 && (
            <div className="chip-row" style={{ justifyContent: 'center' }}>
              {categorias.map((c) => (
                <Link href={`/trabajos?categoria=${c.slug}`} key={c.id}>
                  {c.nombre}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="como-trabajamos">
        <div className="wrap">
          <div className="shead">
            <span className="kick">Cómo trabajamos</span>
            <h2 className="st">El proceso, paso a paso</h2>
          </div>
          <ProcessStepper steps={ETAPAS} />
        </div>
      </section>

      <section id="diferenciales" style={{ background: 'var(--wash)' }}>
        <div className="wrap">
          <div className="shead">
            <span className="kick">Lo que nos diferencia</span>
            <h2 className="st">Por qué elegir a ADS</h2>
          </div>
          <div className="value-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {DIFERENCIALES.map((v, i) => (
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

      <section id="normativa">
        <div className="wrap">
          <div className="shead">
            <span className="kick">Normativa y seguridad</span>
            <h2 className="st">Instalaciones conformes a la normativa vigente</h2>
            <p>
              Cada instalación se lleva adelante conforme a la normativa argentina que regula el transporte vertical,
              trabajando con proveedores y componentes certificados.
            </p>
          </div>

          <div className="faq-list">
            {NORMATIVA.map((n) => (
              <details className="faq-item" key={n.norma}>
                <summary>
                  {n.norma}
                  <span
                    style={{
                      marginLeft: 12,
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'var(--slate)',
                      textTransform: 'none',
                      letterSpacing: 'normal',
                    }}
                  >
                    · {n.tag}
                  </span>
                </summary>
                <p>{n.detalle}</p>
              </details>
            ))}
          </div>

          <div className="callout-amber">
            <span className="badge">En trámite</span>
            <p>
              Estamos gestionando las certificaciones de componentes de seguridad ante la Secretaría de Industria y
              Comercio (Resolución 27/2025). Se publican acá a medida que estén disponibles.
            </p>
          </div>

          {certificaciones.length > 0 && (
            <div className="cert-grid" style={{ marginTop: 30 }}>
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

      <section id="tu-rol" style={{ background: 'var(--wash)' }}>
        <div className="wrap">
          <div className="shead">
            <span className="kick">Según tu rol</span>
            <h2 className="st">Nos adaptamos al rol de cada interlocutor en la obra</h2>
          </div>
          <RoleTabs tabs={roleTabs} />
        </div>
      </section>

      {localidades.length > 0 && (
        <section>
          <div className="wrap">
            <div className="shead">
              <span className="kick">Cobertura</span>
              <h2 className="st">Dónde ya instalamos</h2>
              <p>Localidades donde tenemos obras realizadas.</p>
            </div>
            <div className="tag-row">
              {localidades.map((loc) => (
                <span className="tag" key={loc}>
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="closing-cta">
        <div className="wrap">
          <h2>¿En qué etapa está tu obra?</h2>
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
