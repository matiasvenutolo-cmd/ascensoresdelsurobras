export type Categoria = {
  slug: string
  nombre: string
  descripcion: string
  grupo: 'ascensores' | 'monta-vehiculos' | 'monta-cargas'
}

export const CATEGORIAS: Categoria[] = [
  {
    slug: 'ascensores-hidraulicos',
    nombre: 'Ascensores hidráulicos',
    descripcion: 'Equipos para edificios de baja altura o cuando la obra no admite sala de máquinas en la parte superior.',
    grupo: 'ascensores',
  },
  {
    slug: 'ascensores-electromecanicos',
    nombre: 'Ascensores electromecánicos',
    descripcion: 'Una solución extendida para edificios de viviendas y espacios públicos donde carga y velocidad son relevantes.',
    grupo: 'ascensores',
  },
  {
    slug: 'ascensores-sin-sala-de-maquinas',
    nombre: 'Sin sala de máquinas',
    descripcion: 'Equipos de similar aplicación a los electromecánicos, con la sala de máquinas resuelta en el sobre recorrido.',
    grupo: 'ascensores',
  },
  {
    slug: 'monta-camillero',
    nombre: 'Monta camillas',
    descripcion: 'Configuraciones para edificios de salud y necesidades específicas de traslado vertical.',
    grupo: 'ascensores',
  },
  {
    slug: 'monta-vehiculos',
    nombre: 'Monta vehículos',
    descripcion: 'Versiones hidráulicas o electromecánicas para traslado de vehículos e integración con cocheras.',
    grupo: 'monta-vehiculos',
  },
  {
    slug: 'montacargas',
    nombre: 'Montacargas',
    descripcion: 'Equipos hidráulicos con acceso a nivel de piso terminado para movimiento de pallets y carga.',
    grupo: 'monta-cargas',
  },
  {
    slug: 'monta-platos-papeles',
    nombre: 'Monta platos / papeles',
    descripcion: 'Equipos para carga manual a altura de cintura, con bandeja o estante divisorio en cabina.',
    grupo: 'monta-cargas',
  },
]

export const GRUPOS = [
  { slug: 'ascensores', nombre: 'Ascensores' },
  { slug: 'monta-vehiculos', nombre: 'Monta Vehículos' },
  { slug: 'monta-cargas', nombre: 'Monta Cargas' },
] as const

export const categoriaPorSlug = (slug: string) => CATEGORIAS.find((c) => c.slug === slug)
