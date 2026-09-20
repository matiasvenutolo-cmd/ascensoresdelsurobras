const STEPS = [
  {
    n: '01',
    titulo: 'Asesoramos',
    texto: 'Analizamos necesidades, recorrido, cargas, arquitectura y condiciones de obra para definir el camino correcto.',
  },
  {
    n: '02',
    titulo: 'Diseñamos',
    texto: 'Traducimos el requerimiento en una solución funcional que pueda integrarse con el proyecto.',
  },
  {
    n: '03',
    titulo: 'Proyectamos',
    texto: 'Definimos tipología, dimensiones, tecnología y condiciones necesarias para ejecutar la solución.',
  },
  {
    n: '04',
    titulo: 'Fabricamos',
    texto: 'La solución se materializa con el respaldo industrial y la experiencia acumulada de la empresa.',
  },
  {
    n: '05',
    titulo: 'Instalamos',
    texto: 'Acompañamos la ejecución hasta la puesta en servicio del equipo.',
  },
]

export function ProcessSection() {
  return (
    <section className="section process" id="proceso">
      <div className="process-layout">
        <div className="process-side">
          <div className="label">Cómo trabajamos</div>
          <h3>Una solución. Varias decisiones bien hechas.</h3>
          <p>El valor de una solución a medida está en cómo se toman las decisiones antes, durante y después de instalar el equipo.</p>
          <div className="process-line" />
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <article className="step" key={s.n}>
              <div className="step-no">{s.n}</div>
              <h4>{s.titulo}</h4>
              <p>{s.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
