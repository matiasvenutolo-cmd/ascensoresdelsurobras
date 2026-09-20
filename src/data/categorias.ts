export type Categoria = {
  slug: string
  nombre: string
  descripcion: string
  filtro: 'personas' | 'carga' | 'especial'
}

export const CATEGORIAS: Categoria[] = [
  {
    slug: 'ascensores-hidraulicos',
    nombre: 'Ascensores hidráulicos',
    descripcion: 'Equipos para edificios de baja altura o cuando la obra no admite sala de máquinas en la parte superior.',
    filtro: 'personas',
  },
  {
    slug: 'ascensores-electromecanicos',
    nombre: 'Ascensores electromecánicos',
    descripcion: 'Una solución extendida para edificios de viviendas y espacios públicos donde carga y velocidad son relevantes.',
    filtro: 'personas',
  },
  {
    slug: 'ascensores-sin-sala-de-maquinas',
    nombre: 'Sin sala de máquinas',
    descripcion: 'Equipos de similar aplicación a los electromecánicos, con la sala de máquinas resuelta en el sobre recorrido.',
    filtro: 'personas',
  },
  {
    slug: 'monta-vehiculos',
    nombre: 'Monta vehículos',
    descripcion: 'Versiones hidráulicas o electromecánicas para traslado de vehículos e integración con cocheras.',
    filtro: 'especial',
  },
  {
    slug: 'monta-camillero',
    nombre: 'Monta camillas',
    descripcion: 'Configuraciones para edificios de salud y necesidades específicas de traslado vertical.',
    filtro: 'especial',
  },
  {
    slug: 'montacargas',
    nombre: 'Montacargas',
    descripcion: 'Equipos hidráulicos con acceso a nivel de piso terminado para movimiento de pallets y carga.',
    filtro: 'carga',
  },
  {
    slug: 'monta-platos-papeles',
    nombre: 'Monta platos / papeles',
    descripcion: 'Equipos para carga manual a altura de cintura, con bandeja o estante divisorio en cabina.',
    filtro: 'carga',
  },
]

export const categoriaPorSlug = (slug: string) => CATEGORIAS.find((c) => c.slug === slug)
