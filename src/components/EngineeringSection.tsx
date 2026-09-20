import { SITE } from '@/data/site'

export function EngineeringSection() {
  return (
    <section className="section engineering" id="ingenieria">
      <div className="engineering-grid">
        <div className="diagram" aria-label="Esquema técnico conceptual de un ascensor">
          <div className="diagram-grid" />
          <div className="machine" />
          <div className="rope" />
          <div className="shaft" />
          <div className="cabin" />
          <div className="counterweight" />
          <div className="diagram-pin p1">
            <span />
            Máquina
          </div>
          <div className="diagram-pin p2">
            <span />
            Seguridad
          </div>
          <div className="diagram-pin p3">
            <span />
            Cabina
          </div>
          <div className="diagram-pin p4">
            <span />
            Contrapeso
          </div>
          <div className="diagram-caption">Esquema conceptual / Transporte vertical</div>
        </div>
        <div className="engineering-copy">
          <div className="label">Ingeniería</div>
          <h2 className="section-title">
            La tecnología también tiene que <span className="orange">encajar.</span>
          </h2>
          <p>
            El proyecto no termina en elegir un equipo. Dimensiones, carga, recorrido, accesos, arquitectura y
            condiciones de obra tienen que convivir. Por eso el valor está en definir una solución que funcione en el
            edificio real.
          </p>
          <div className="engineering-facts">
            <div className="fact">
              <strong>{SITE.aniosTrayectoria}+</strong>
              <span>Años de trayectoria sectorial</span>
            </div>
            <div className="fact">
              <strong>{SITE.planta}</strong>
              <span>Planta industrial propia</span>
            </div>
            <div className="fact">
              <strong>{SITE.sucursal}</strong>
              <span>Sucursal propia</span>
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
