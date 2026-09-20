const PILARES = [
  { num: '01', titulo: 'Calidad', texto: 'Procesos, proveedores y experiencia puestos al servicio de una solución confiable.' },
  { num: '02', titulo: 'Seguridad', texto: 'Diseño y ejecución con foco en la seguridad de las personas y del equipo técnico.' },
  { num: '03', titulo: 'Normativa', texto: 'Una condición de proyecto, no una revisión de último momento.' },
]

export function StatementSection() {
  return (
    <section className="section statement" id="empresa">
      <div className="section-head">
        <div>
          <div className="label">La empresa</div>
          <h2 className="section-title">
            El equipo entra <span className="orange">antes</span> que el ascensor.
          </h2>
        </div>
        <div className="section-copy">
          Una solución de transporte vertical no se resuelve al final de la obra. Se define mucho antes: con
          relevamiento, ingeniería, coordinación y decisiones que tienen que funcionar en conjunto.
        </div>
      </div>
      <div className="statement-grid">
        <div>
          <p className="statement-lead">Más de 30 años transformando requerimientos técnicos en soluciones a medida.</p>
          <div className="pillars">
            {PILARES.map((p) => (
              <article className="pillar" key={p.num}>
                <div className="pillar-num">{p.num}</div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="statement-panel">
          <div className="panel-kicker">ADS / Obras</div>
          <h3>Desde la obra, no desde el catálogo.</h3>
          <p>
            La unidad de Instalaciones, Obras y Proyectos trabaja con constructoras, estudios de arquitectura y
            desarrolladoras para resolver necesidades de transporte vertical con una respuesta integral.
          </p>
          <div className="panel-line" />
        </aside>
      </div>
    </section>
  )
}
