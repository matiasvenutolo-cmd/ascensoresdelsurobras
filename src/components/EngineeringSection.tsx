import Image from 'next/image'
import { SITE } from '@/data/site'

export function EngineeringSection() {
  return (
    <section className="section engineering" id="ingenieria">
      <div className="engineering-grid">
        <div className="diagram diagram-photo">
          <Image
            src="/images/trabajos/2-de-mayo-n-2831/7.jpg"
            alt="Estructura técnica de una instalación de ADS en obra"
            fill
            sizes="(max-width: 1050px) 90vw, 45vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="diagram-caption">Estructura de obra / 2 de Mayo N° 2831</div>
        </div>
        <div className="engineering-copy">
          <div className="label">Ingeniería</div>
          <h2 className="section-title">
            Ingeniería y gestión integral <span className="orange">de proyecto.</span>
          </h2>
          <p>
            Cada obra tiene una persona de ADS dedicada a la gestión integral del proyecto, para que el cumplimiento
            técnico y normativo sea acorde a la necesidad del cliente y de la obra — desde el anteproyecto hasta la
            puesta en servicio.
          </p>
          <div className="engineering-facts">
            <div className="fact">
              <strong>{SITE.aniosTrayectoria}+</strong>
              <span>Años de trayectoria sectorial</span>
            </div>
            <div className="fact">
              <strong>{SITE.planta}</strong>
              <span>y {SITE.sucursal} · Casas centrales</span>
            </div>
            <div className="fact">
              <strong>AMBA</strong>
              <span>Costa Atlántica · Zona de cobertura</span>
            </div>
            <div className="fact">
              <strong>360°</strong>
              <span>Mirada desde proyecto a puesta en servicio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
