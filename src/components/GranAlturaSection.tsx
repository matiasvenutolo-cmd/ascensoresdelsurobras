import Link from 'next/link'
import Image from 'next/image'
import { EDIFICIOS_ALTURA, ESTADO_LABEL, fachadaDe } from '@/data/edificiosAltura'

export function GranAlturaSection() {
  if (EDIFICIOS_ALTURA.length === 0) return null

  return (
    <section className="section gran-altura" id="gran-altura">
      <div className="section-head">
        <div>
          <div className="label">Gran altura</div>
          <h2 className="section-title">
            Edificios de <span className="orange">gran altura.</span>
          </h2>
        </div>
        <div className="section-copy">
          Nos estamos consolidando como el único proveedor para edificios de gran altura. Entrá a cada edificio para
          ver su fachada y los ascensores instalados.
        </div>
      </div>
      <div className="ga-grid">
        {EDIFICIOS_ALTURA.map((e) => (
          <Link href={`/gran-altura/${e.slug}`} className="ga-card" key={e.slug}>
            <Image src={fachadaDe(e)} alt={`Fachada de ${e.nombre}`} fill sizes="(max-width: 700px) 90vw, 30vw" style={{ objectFit: 'cover' }} />
            <span className={`ga-estado ga-estado-${e.estado}`}>{ESTADO_LABEL[e.estado]}</span>
            <div className="ga-card-body">
              <strong>{e.paradas} paradas</strong>
              <h3>{e.nombre}</h3>
              <span>{e.localidad}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
