import type { Equipo } from './trabajos'

export type EdificioAltura = {
  slug: string
  nombre: string
  direccion: string
  localidad: string
  paradas: number
  estado: 'terminado' | 'en-obra'
  /** Cantidad de fotos de ascensores: public/images/gran-altura/<slug>/ascensor-1.jpg, ascensor-2.jpg… */
  fotosAscensores: number
  equipos?: Equipo[]
}

// Cada edificio necesita en public/images/gran-altura/<slug>/:
//   fachada.jpg   → foto desde la calle, donde se vea la fachada y la altura
//   ascensor-N.jpg → fotos de los ascensores instalados en ese edificio
// Mientras esta lista esté vacía, la sección no se muestra en la web.
export const EDIFICIOS_ALTURA: EdificioAltura[] = []

export const edificioPorSlug = (slug: string) => EDIFICIOS_ALTURA.find((e) => e.slug === slug)

export const fachadaDe = (e: EdificioAltura) => `/images/gran-altura/${e.slug}/fachada.jpg`

export const fotosAscensoresDe = (e: EdificioAltura) =>
  Array.from({ length: e.fotosAscensores }, (_, i) => `/images/gran-altura/${e.slug}/ascensor-${i + 1}.jpg`)

export const ESTADO_LABEL: Record<EdificioAltura['estado'], string> = {
  terminado: 'Terminado',
  'en-obra': 'En obra',
}
