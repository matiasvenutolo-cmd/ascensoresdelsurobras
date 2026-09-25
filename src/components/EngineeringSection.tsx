import { SITE } from '@/data/site'
import { IngenieriaAnimation } from './IngenieriaAnimation'

export function EngineeringSection() {
  return (
    <section className="section engineering" id="ingenieria">
      <div className="engineering-grid">
        <div className="diagram">
          <IngenieriaAnimation />
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
