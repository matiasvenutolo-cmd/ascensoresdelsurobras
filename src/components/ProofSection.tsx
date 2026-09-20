const PUNTOS = [
  {
    n: '01',
    titulo: 'Experiencia',
    texto: 'Más de tres décadas trabajando en transporte vertical y desarrollando soluciones personalizadas.',
  },
  {
    n: '02',
    titulo: 'Capacidad',
    texto: 'Equipo técnico estable y planta industrial propia en Lanús.',
  },
  {
    n: '03',
    titulo: 'Normativa',
    texto: 'La calidad, la seguridad y el cumplimiento normativo forman parte de la definición del proyecto.',
  },
  {
    n: '04',
    titulo: 'Continuidad',
    texto: 'Una relación de trabajo pensada más allá de la instalación del equipo.',
  },
]

export function ProofSection() {
  return (
    <section className="section proof" id="respaldo">
      <div className="proof-grid">
        <div>
          <div className="label">Nuestro respaldo</div>
          <h2 className="section-title">
            Proyectar bien también es <span className="orange">reducir riesgos.</span>
          </h2>
          <p className="proof-copy">
            La confianza de una obra se construye con experiencia, procesos y cumplimiento — no con una lista de
            certificados.
          </p>
        </div>
        <div className="proof-list">
          {PUNTOS.map((p) => (
            <article className="proof-item" key={p.n}>
              <strong>{p.n}</strong>
              <div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
