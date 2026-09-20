import Link from 'next/link'
import { HeroVideoEl } from './HeroVideoEl'
import { OpenDrawerButton } from './ContactDrawer'
import { SITE } from '@/data/site'
import { trabajoPorSlug } from '@/data/trabajos'
import { categoriaPorSlug } from '@/data/categorias'

export function HeroSection() {
  const destacada = trabajoPorSlug('moreno-n-335')!
  const categoriaDestacada = categoriaPorSlug(destacada.categorias[0])?.nombre

  return (
    <section className="hero">
      <HeroVideoEl />
      <div className="hero-video-overlay" />
      <div className="hero-video-grid" />
      <div className="hero-copy">
        <div>
          <div className="eyebrow">Instalaciones · Obras · Proyectos</div>
          <h1>
            Potencia <em>segura</em> para cada obra.
          </h1>
          <p className="hero-intro">
            Asesoramos, diseñamos, proyectamos, fabricamos e instalamos ascensores y montacargas a medida. Una mirada
            integral para resolver el transporte vertical desde el proyecto hasta la puesta en servicio.
          </p>
          <div className="hero-actions">
            <Link href="#obras" className="btn btn-primary">
              Ver obras
            </Link>
            <OpenDrawerButton className="btn btn-ghost">Hablar con un especialista</OpenDrawerButton>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <strong>+{SITE.aniosTrayectoria}</strong>
            <span>Años en el sector</span>
          </div>
          <div className="stat">
            <strong>{SITE.planta}</strong>
            <span>Planta industrial propia</span>
          </div>
          <div className="stat">
            <strong>{SITE.sucursal}</strong>
            <span>Sucursal propia</span>
          </div>
        </div>
      </div>
      <div className="hero-media">
        <div className="technical-grid" />
        <div className="crosshair" />
        <div className="hero-index">ADS / OBRAS</div>
        <div className="hero-spec">
          <div>
            <span className="label">Proyecto destacado</span>
            <strong>{destacada.titulo}</strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="label">Solución</span>
            <strong>
              {categoriaDestacada} · {destacada.equipos[0]?.cargaUtilKg} kg
            </strong>
          </div>
        </div>
      </div>
      <a href="#empresa" className="hero-scroll-cue">
        <span />
        Explorar
      </a>
    </section>
  )
}
