import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIAS, GRUPOS } from '@/data/categorias'
import { TRABAJOS, fotosDe } from '@/data/trabajos'

export function ObrasTerminadas() {
  return (
    <>
      {GRUPOS.map((grupo, gi) => {
        const categorias = CATEGORIAS.filter((c) => c.grupo === grupo.slug)
        return (
          <div className="ot-grupo" key={grupo.slug}>
            <div className="ot-grupo-head">
              <span className="ot-grupo-num">{String(gi + 1).padStart(2, '0')}</span>
              <h3>{grupo.nombre}</h3>
            </div>
            <div className="ot-subtipos">
              {categorias.map((c) => {
                const obras = TRABAJOS.filter((t) => t.categorias.includes(c.slug))
                return (
                  <div className="ot-subtipo" key={c.slug}>
                    <div className="ot-subtipo-head">
                      <h4>{c.nombre}</h4>
                      <p>{c.descripcion}</p>
                    </div>
                    {obras.length > 0 ? (
                      <div className="ot-rail">
                        {obras.map((o) => (
                          <Link href={`/trabajos/${o.slug}`} className="ot-photo" key={o.slug}>
                            <Image src={fotosDe(o)[0]} alt={o.titulo} fill sizes="170px" style={{ objectFit: 'cover' }} />
                            <span>{o.titulo}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="ot-pending">Próximamente, ejemplos de obra para esta tipología.</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}
