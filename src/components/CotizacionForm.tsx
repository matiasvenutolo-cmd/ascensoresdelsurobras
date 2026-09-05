'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitCotizacion, type CotizacionFormState } from '@/app/(frontend)/contacto/actions'
import { BUILDING_TYPE_OPTIONS } from '@/lib/buildingTypes'

const initialState: CotizacionFormState = { ok: false }
const ROL_VALIDOS = ['constructora', 'arquitecto', 'desarrollador', 'particular', 'otro']

export function CotizacionForm() {
  const [state, formAction, pending] = useActionState(submitCotizacion, initialState)
  // Si venís desde un link tipo /contacto?rol=arquitecto (ej. desde /servicios),
  // el select arranca con ese rol ya elegido.
  const rolParam = useSearchParams().get('rol')
  const rolInicial = rolParam && ROL_VALIDOS.includes(rolParam) ? rolParam : ''

  if (state.ok) {
    return (
      <div className="empty-state">
        <h3>¡Listo!</h3>
        <p>Recibimos tu consulta. Te vamos a contactar a la brevedad.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="quote-form">
      {/* Honeypot: oculto para personas, visible para bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="_hp">No completar</label>
        <input type="text" id="_hp" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="nombre">Nombre *</label>
          <input id="nombre" name="nombre" required />
        </div>
        <div className="form-field">
          <label htmlFor="empresa">Empresa / Estudio</label>
          <input id="empresa" name="empresa" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="rol">Rol</label>
          <select id="rol" name="rol" defaultValue={rolInicial}>
            <option value="">Elegir...</option>
            <option value="constructora">Constructora</option>
            <option value="arquitecto">Arquitecto/a</option>
            <option value="desarrollador">Desarrollador/a</option>
            <option value="particular">Particular</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="tipoProyecto">Tipo de proyecto</label>
          <select id="tipoProyecto" name="tipoProyecto" defaultValue="">
            <option value="">Elegir...</option>
            {BUILDING_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="form-field">
          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="ubicacion">Ubicación de la obra</label>
        <input id="ubicacion" name="ubicacion" />
      </div>

      <div className="form-row form-row-3">
        <div className="form-field">
          <label htmlFor="cantidadPisos">Cantidad de pisos</label>
          <input id="cantidadPisos" name="cantidadPisos" type="number" min={0} />
        </div>
        <div className="form-field">
          <label htmlFor="cantidadAscensores">Cantidad de ascensores</label>
          <input id="cantidadAscensores" name="cantidadAscensores" type="number" min={0} />
        </div>
        <div className="form-field">
          <label htmlFor="etapaObra">Etapa de la obra</label>
          <select id="etapaObra" name="etapaObra" defaultValue="">
            <option value="">Elegir...</option>
            <option value="anteproyecto">Anteproyecto</option>
            <option value="proyecto-ejecutivo">Proyecto ejecutivo</option>
            <option value="obra-en-curso">Obra en curso</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="plazoEstimado">Plazo estimado de necesidad</label>
        <input id="plazoEstimado" name="plazoEstimado" placeholder="Ej: en 2 meses" />
      </div>

      <div className="form-field">
        <label htmlFor="comentarios">Comentarios</label>
        <textarea id="comentarios" name="comentarios" rows={4} />
      </div>

      {state.error && <p className="form-error">{state.error}</p>}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? 'Enviando…' : 'Solicitar presupuesto'}
      </button>
    </form>
  )
}
