const PILARES = [
  { num: '01', titulo: 'Calidad', texto: 'Procesos, proveedores y experiencia puestos al servicio de una solución confiable.' },
  { num: '02', titulo: 'Seguridad', texto: 'Diseño y ejecución con foco en la seguridad de las personas y del equipo técnico.' },
  { num: '03', titulo: 'Normativa', texto: 'Una condición de proyecto, no una revisión de último momento.' },
  { num: '04', titulo: 'Experiencia', texto: 'Más de tres décadas trabajando en transporte vertical y desarrollando soluciones a medida.' },
  { num: '05', titulo: 'Capacidad', texto: 'Equipo técnico estable y planta industrial propia en Lanús.' },
  { num: '06', titulo: 'Continuidad', texto: 'Una relación de trabajo pensada más allá de la instalación del equipo.' },
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
      <p className="statement-lead">Más de 30 años transformando requerimientos técnicos en soluciones a medida.</p>
      <p className="statement-sub">
        La confianza en una obra no se gana con un cartel de certificaciones: se gana con experiencia real, procesos
        claros y cumplimiento normativo en cada instalación.
      </p>
      <div className="pillars">
        {PILARES.map((p) => (
          <article className="pillar" key={p.num}>
            <div className="pillar-num">{p.num}</div>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
