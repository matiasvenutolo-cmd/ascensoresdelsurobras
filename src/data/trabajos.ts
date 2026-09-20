export type Equipo = {
  resumen: string
  paradas?: number
  cargaUtilKg?: number
  velocidadMpm?: number
  detalle?: string
}

export type Trabajo = {
  slug: string
  titulo: string
  direccion: string
  localidad: string
  categorias: string[]
  tipoEdificio?: string
  destacada?: boolean
  fotos: number
  equipos: Equipo[]
}

// Orden pensado para el rail de la home: las obras con las fotos más
// impactantes van primero (revisadas una por una), no un orden alfabético
// ni cronológico. La cantidad de obras acá no es el total real del cliente
// — es una selección con ficha técnica cargada.
export const TRABAJOS: Trabajo[] = [
  {
    slug: 'moreno-n-335',
    titulo: 'Moreno N° 335',
    direccion: 'Moreno N° 335',
    localidad: 'Lanús Oeste',
    categorias: ['ascensores-electromecanicos'],
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 14,
        cargaUtilKg: 450,
        velocidadMpm: 60,
        detalle:
          'Terminación de cabina con frente y detalles en acero inoxidable. Puertas de 2 hojas en acero inoxidable en Planta Baja, resto de los pisos en epoxi. Botonera de cabina táctil.',
      },
    ],
  },
  {
    slug: 'riobamba-n-147',
    titulo: 'Riobamba N° 147',
    direccion: 'Riobamba N° 147',
    localidad: 'Lanús Oeste',
    categorias: ['ascensores-electromecanicos', 'monta-vehiculos'],
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 11,
        cargaUtilKg: 600,
        velocidadMpm: 60,
        detalle:
          'Terminación de cabina con frente y detalles en acero inoxidable. Puertas de 2 hojas en acero inoxidable en Planta Baja, resto de los pisos en epoxi. Botonera de cabina táctil.',
      },
      {
        resumen: 'Instalación de un monta vehículo',
        paradas: 2,
        cargaUtilKg: 2500,
        velocidadMpm: 10,
        detalle:
          '3 accesos. Doble pistón lateral, relación 1:1. Terminación de cabina en epoxi. Doble botonera de cabina aplicada inoxidable. Paños laterales hasta 1600 mm. Piso en chapa estampada tipo semilla de melón.',
      },
    ],
  },
  {
    slug: '2-de-mayo-n-2831',
    titulo: '2 de Mayo N° 2831',
    direccion: '2 de Mayo N° 2831',
    localidad: 'Lanús Oeste',
    categorias: ['ascensores-electromecanicos', 'monta-vehiculos'],
    destacada: true,
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de dos ascensores',
        paradas: 13,
        cargaUtilKg: 600,
        velocidadMpm: 60,
        detalle:
          'Terminación de cabina y puertas de 2 hojas en acero inoxidable en Planta Baja, resto de los pisos en epoxi. Botonera de cabina táctil.',
      },
      {
        resumen: 'Instalación de un monta vehículo',
        paradas: 2,
        cargaUtilKg: 2500,
        velocidadMpm: 10,
        detalle:
          '3 accesos. Pistón central enterrado. Terminación de cabina en epoxi. Doble botonera de cabina aplicada inoxidable. Paños laterales hasta 1600 mm. Piso en chapa estampada tipo semilla de melón.',
      },
    ],
  },
  {
    slug: 'llavallol-n-361',
    titulo: 'Llavallol N° 361',
    direccion: 'Llavallol N° 361',
    localidad: 'Lanús Oeste',
    categorias: ['ascensores-electromecanicos'],
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de dos ascensores',
        paradas: 12,
        cargaUtilKg: 450,
        velocidadMpm: 60,
        detalle:
          'Terminación de cabina y puertas de 2 hojas en acero inoxidable en Planta Baja, resto de los pisos en epoxi. Botonera de cabina táctil.',
      },
    ],
  },
  {
    slug: 'ayacucho-n-873-coelpla-sudamericana',
    titulo: 'Ayacucho N° 873 — Coelpla Sudamericana',
    direccion: 'Ayacucho N° 873',
    localidad: 'Lanús Este',
    categorias: ['ascensores-hidraulicos'],
    tipoEdificio: 'corporativo',
    fotos: 7,
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 2,
        cargaUtilKg: 450,
        velocidadMpm: 30,
        detalle:
          'Terminación de cabina, frente y detalles en acero inoxidable. Puertas de 2 hojas acristaladas en acero inoxidable en todos los pisos. Botonera de cabina táctil.',
      },
    ],
  },
  {
    slug: 'esmeralda-n-1212-cancilleria',
    titulo: 'Esmeralda N° 1212 — Cancillería',
    direccion: 'Esmeralda N° 1212',
    localidad: 'Capital Federal',
    categorias: ['ascensores-hidraulicos'],
    tipoEdificio: 'corporativo',
    destacada: true,
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 2,
        cargaUtilKg: 450,
        velocidadMpm: 30,
        detalle: 'Cabina panorámica. Terminación de cabina y puertas de 2 hojas en acero inoxidable.',
      },
    ],
  },
  {
    slug: 'skf-tortuguitas',
    titulo: 'SKF Tortuguitas',
    direccion: 'Ruta 8 KM 36,50 (Panamericana Ramal Pilar)',
    localidad: 'Tortuguitas',
    categorias: ['ascensores-electromecanicos'],
    tipoEdificio: 'industrial',
    destacada: true,
    fotos: 5,
    equipos: [
      {
        resumen: 'Instalación de dos ascensores en batería (N° 1 y 2)',
        paradas: 3,
        cargaUtilKg: 750,
        velocidadMpm: 60,
        detalle: 'Terminación de cabina y puertas de 2 hojas en acero inoxidable.',
      },
      {
        resumen: 'Instalación de un ascensor (N° 3)',
        paradas: 3,
        cargaUtilKg: 1200,
        velocidadMpm: 30,
        detalle: 'Relación 2:1. Terminación de cabina y puertas de 3 hojas en acero inoxidable.',
      },
    ],
  },
  {
    slug: 'venezuela-n-1278-ascensores-n-1-y-2',
    titulo: 'Venezuela N° 1278 — Ascensores N° 1 y 2',
    direccion: 'Venezuela N° 1278',
    localidad: 'Capital Federal',
    categorias: ['ascensores-electromecanicos'],
    destacada: true,
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de dos ascensores en batería',
        paradas: 4,
        cargaUtilKg: 1200,
        velocidadMpm: 60,
        detalle:
          'Terminación de cabina y puertas de 3 hojas en acero inoxidable anti vandálico. Bajo techo especial a medida para el cliente. Dentro de estructura auto portante en caño estructural.',
      },
    ],
  },
  {
    slug: 'club-espanol-villa-gesell',
    titulo: 'Club Español Villa Gesell',
    direccion: 'Avenida Buenos Aires N° 359',
    localidad: 'Villa Gesell',
    categorias: ['monta-camillero'],
    destacada: true,
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de un ascensor tipo camillero hidráulico',
        paradas: 3,
        cargaUtilKg: 900,
        velocidadMpm: 30,
        detalle: 'Terminación de cabina frente y detalles en acero inoxidable y puertas de 2 hojas en epoxi.',
      },
    ],
  },
  {
    slug: 'carlos-calvo-n-2560',
    titulo: 'Carlos Calvo N° 2560',
    direccion: 'Carlos Calvo N° 2560',
    localidad: 'Capital Federal',
    categorias: ['ascensores-hidraulicos'],
    fotos: 6,
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 2,
        cargaUtilKg: 450,
        velocidadMpm: 30,
        detalle: 'Doble acceso a 180°. Terminación de cabina y puertas de 2 hojas en acero inoxidable.',
      },
    ],
  },
  {
    slug: 'o-higgins-n-365-adsur-s-a',
    titulo: "O'Higgins N° 365 — ADSUR S.A.",
    direccion: "O'Higgins N° 365",
    localidad: 'Lanús Este',
    categorias: ['montacargas'],
    tipoEdificio: 'industrial',
    destacada: true,
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 2,
        cargaUtilKg: 1500,
        velocidadMpm: 30,
        detalle:
          'Terminación de cabina y puertas de 6 hojas en epoxi. Doble botonera de cabina aplicada inoxidable. Piso de chapa estampada tipo semilla de melón.',
      },
    ],
  },
  {
    slug: 'sanchez-de-loria-n-2364',
    titulo: 'Sanchez de Loria N° 2364',
    direccion: 'Sanchez de Loria N° 2364',
    localidad: 'Capital Federal',
    categorias: ['ascensores-electromecanicos'],
    fotos: 8,
    equipos: [],
  },
  {
    slug: 'margarita-weild-n-1409',
    titulo: 'Margarita Weild N° 1409',
    direccion: 'Margarita Weild N° 1409',
    localidad: 'Lanús Este',
    categorias: ['monta-vehiculos'],
    fotos: 8,
    equipos: [
      {
        resumen: 'Instalación de un monta vehículo',
        paradas: 2,
        cargaUtilKg: 2500,
        velocidadMpm: 10,
        detalle:
          '3 accesos. Doble pistón lateral, relación 1:1. Terminación de cabina en epoxi. Doble botonera de cabina aplicada inoxidable. Paños laterales hasta 1600 mm. Piso en chapa estampada tipo semilla de melón.',
      },
    ],
  },
  {
    slug: 'coronel-delia-n-1551-sala-salud',
    titulo: 'Coronel Delia N° 1551 — Sala Salud',
    direccion: 'Coronel Delia N° 1551',
    localidad: 'Lanús Oeste',
    categorias: ['monta-camillero'],
    tipoEdificio: 'salud',
    destacada: true,
    fotos: 5,
    equipos: [
      {
        resumen: 'Instalación de un ascensor tipo camillero',
        paradas: 2,
        cargaUtilKg: 900,
        velocidadMpm: 30,
        detalle: 'Terminación de cabina y puertas de 2 hojas en acero inoxidable. Botonera de cabina estándar inoxidable.',
      },
    ],
  },
  {
    slug: 'gobernador-irigoyen-n-122',
    titulo: 'Gobernador Irigoyen N° 122',
    direccion: 'Gobernador Irigoyen N° 122',
    localidad: 'Lanús Oeste',
    categorias: ['monta-vehiculos'],
    destacada: true,
    fotos: 5,
    equipos: [
      {
        resumen: 'Instalación de un monta vehículo',
        paradas: 2,
        cargaUtilKg: 2500,
        velocidadMpm: 10,
        detalle:
          '3 accesos. Pistón central enterrado. Terminación de cabina en epoxi. Doble botonera de cabina aplicada inoxidable. Paños laterales hasta 1600 mm. Piso en chapa estampada tipo semilla de melón.',
      },
    ],
  },
  {
    slug: 'av-san-martin-n-4747-famiq-srl',
    titulo: 'Av. San Martín N° 4747 — FAMIQ SRL',
    direccion: 'Avenida San Martín N° 4747',
    localidad: 'Capital Federal',
    categorias: ['ascensores-electromecanicos'],
    tipoEdificio: 'industrial',
    fotos: 7,
    equipos: [
      {
        resumen: 'Instalación de dos ascensores en batería',
        paradas: 8,
        cargaUtilKg: 900,
        velocidadMpm: 60,
        detalle: 'Terminación de cabina y puertas de 3 hojas en acero inoxidable anti vandálico especial.',
      },
    ],
  },
  {
    slug: 'llavallol-n-66',
    titulo: 'Llavallol N° 66',
    direccion: 'Llavallol N° 66',
    localidad: 'Lanús Oeste',
    categorias: ['ascensores-electromecanicos'],
    fotos: 5,
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 11,
        cargaUtilKg: 450,
        velocidadMpm: 60,
        detalle: 'Terminación de cabina y puertas de 2 hojas en acero inoxidable.',
      },
    ],
  },
  {
    slug: 'bolivar-n-2319-mar-del-plata',
    titulo: 'Bolívar N° 2319 — Mar del Plata',
    direccion: 'Bolívar N° 2319',
    localidad: 'Mar del Plata',
    categorias: ['monta-platos-papeles'],
    fotos: 4,
    equipos: [
      {
        resumen: 'Instalación de un montacargas tipo monta platos',
        paradas: 3,
        cargaUtilKg: 100,
        velocidadMpm: 18,
        detalle: 'Terminación de cabina y puertas tipo guillotina en acero inoxidable.',
      },
    ],
  },
  {
    slug: 'paracas-n-285',
    titulo: 'Paracas N° 285',
    direccion: 'Paracas N° 285',
    localidad: 'Capital Federal',
    categorias: ['montacargas'],
    fotos: 2,
    equipos: [
      {
        resumen: 'Instalación de un montacargas llamada y envío hidráulico',
        paradas: 5,
        cargaUtilKg: 1000,
        velocidadMpm: 30,
        detalle: 'Terminación de cabina y puertas de 3 hojas en epoxi.',
      },
    ],
  },
]

export const trabajoPorSlug = (slug: string) => TRABAJOS.find((t) => t.slug === slug)

export const fotosDe = (t: Trabajo) => Array.from({ length: t.fotos }, (_, i) => `/images/trabajos/${t.slug}/${i + 1}.jpg`)
