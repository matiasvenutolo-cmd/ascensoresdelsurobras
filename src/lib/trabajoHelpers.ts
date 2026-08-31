import type { Categoria, Trabajo } from './types'

export function categoriasDe(t: Trabajo): Categoria[] {
  return (t.categoria || []).filter((c): c is Categoria => typeof c === 'object' && c !== null)
}

export function primeraFoto(t: Trabajo) {
  const first = (t.galeria || [])[0]
  return first ? first.imagen : undefined
}

export function fichaTecnica(t: Trabajo): string | undefined {
  const eq = (t.equipos || [])[0]
  if (!eq) return undefined
  const partes = [
    eq.paradas ? `${eq.paradas} paradas` : null,
    eq.cargaUtilKg ? `${eq.cargaUtilKg} kg` : null,
    eq.velocidadMpm ? `${eq.velocidadMpm} mpm` : null,
  ].filter(Boolean)
  return partes.length > 0 ? partes.join(' · ') : undefined
}
