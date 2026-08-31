// Datos reales del cliente + lógica de seed, compartidos entre el script CLI
// (`npm run seed`, `src/seed/import-trabajos.ts`) y cualquier otra forma de
// invocarlo (ver nota de Node/tsx en ese archivo).
import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

export const FOTOS_DIR = '/Users/matiasvenutolo/Downloads/AdsurObras/Página Web/Fotos'

type CategoriaSeed = {
  slug: string
  nombre: string
  descripcion: string
  orden: number
}

export const CATEGORIAS: CategoriaSeed[] = [
  {
    slug: 'ascensores-hidraulicos',
    nombre: 'Ascensores Hidráulicos',
    descripcion: 'Equipos utilizados en edificios de baja altura o sin la posibilidad de construir la sala de máquinas arriba del pasadizo.',
    orden: 1,
  },
  {
    slug: 'ascensores-electromecanicos',
    nombre: 'Ascensores Electromecánicos',
    descripcion: 'Equipos muy utilizados en edificios de viviendas y lugares públicos donde la carga útil y la velocidad de funcionamiento son relevantes.',
    orden: 2,
  },
  {
    slug: 'ascensores-sin-sala-de-maquinas',
    nombre: 'Ascensores Sin Sala de Máquinas',
    descripcion: 'Tipología de similar aplicación a los ascensores electromecánicos, pero con la sala de máquinas ubicada en el sobre recorrido.',
    orden: 3,
  },
  {
    slug: 'monta-camillero',
    nombre: 'Monta Camillero',
    descripcion: 'Ascensor hidráulico especialmente diseñado para el traslado de camillas, habitual en clínicas, sanatorios y clubes.',
    orden: 4,
  },
  {
    slug: 'monta-vehiculos',
    nombre: 'Monta Vehículos',
    descripcion: 'En su versión hidráulica (simple o doble acceso a 180°) o electromecánica, para la organización del ingreso de vehículos a cocheras, especialmente en edificios de altura.',
    orden: 5,
  },
  {
    slug: 'montacargas',
    nombre: 'Montacargas',
    descripcion: 'Con acceso a nivel de piso terminado, permitiendo la carga de pallets.',
    orden: 6,
  },
  {
    slug: 'monta-platos-papeles',
    nombre: 'Monta Platos / Papeles',
    descripcion: 'Con acceso a la altura de la cintura para carga manual, con bandeja o estante divisorio en cabina.',
    orden: 7,
  },
]

type EquipoSeed = {
  resumen: string
  paradas?: number
  cargaUtilKg?: number
  velocidadMpm?: number
  detalle?: string
}

type TrabajoSeed = {
  categoriaSlug: string
  titulo: string
  direccion: string
  localidad: string
  destacada?: boolean
  equipos: EquipoSeed[]
  folder: string
  observaciones?: string
}

export const TRABAJOS: TrabajoSeed[] = [
  {
    categoriaSlug: 'ascensores-hidraulicos',
    titulo: 'Esmeralda N° 1212 — Cancillería',
    direccion: 'Esmeralda N° 1212',
    localidad: 'Capital Federal',
    destacada: true,
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 2,
        cargaUtilKg: 450,
        velocidadMpm: 30,
        detalle: 'Cabina panorámica. Terminación de cabina y puertas de 2 hojas en acero inoxidable.',
      },
    ],
    folder: path.join(FOTOS_DIR, 'Hidráulico', 'Esmeralda Nº 1212'),
  },
  {
    categoriaSlug: 'ascensores-hidraulicos',
    titulo: 'Carlos Calvo N° 2560',
    direccion: 'Carlos Calvo N° 2560',
    localidad: 'Capital Federal',
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 2,
        cargaUtilKg: 450,
        velocidadMpm: 30,
        detalle: 'Doble acceso a 180°. Terminación de cabina y puertas de 2 hojas en acero inoxidable.',
      },
    ],
    folder: path.join(FOTOS_DIR, 'Hidráulico', 'Carlos Calvo Nº 2560'),
  },
  {
    categoriaSlug: 'monta-camillero',
    titulo: 'Club Español Villa Gesell',
    direccion: 'Avenida Buenos Aires N° 359',
    localidad: 'Villa Gesell',
    destacada: true,
    equipos: [
      {
        resumen: 'Instalación de un ascensor tipo camillero hidráulico',
        paradas: 3,
        cargaUtilKg: 900,
        velocidadMpm: 30,
        detalle: 'Terminación de cabina frente y detalles en acero inoxidable y puertas de 2 hojas en epoxi.',
      },
    ],
    folder: path.join(FOTOS_DIR, 'Monta Camillero', 'Club Español Villa Gesell'),
  },
  {
    categoriaSlug: 'montacargas',
    titulo: 'Paracas N° 285',
    direccion: 'Paracas N° 285',
    localidad: 'Capital Federal',
    equipos: [
      {
        resumen: 'Instalación de un montacargas llamada y envío hidráulico',
        paradas: 5,
        cargaUtilKg: 1000,
        velocidadMpm: 30,
        detalle: 'Terminación de cabina y puertas de 3 hojas en epoxi.',
      },
    ],
    folder: path.join(FOTOS_DIR, 'Monta cargas', 'Paracas Nº 285'),
  },
  {
    categoriaSlug: 'monta-platos-papeles',
    titulo: 'Bolívar N° 2319 — Mar del Plata',
    direccion: 'Bolívar N° 2319',
    localidad: 'Mar del Plata',
    equipos: [
      {
        resumen: 'Instalación de un montacargas tipo monta platos',
        paradas: 3,
        cargaUtilKg: 100,
        velocidadMpm: 18,
        detalle: 'Terminación de cabina y puertas tipo guillotina en acero inoxidable.',
      },
    ],
    folder: path.join(FOTOS_DIR, 'Montaplatos', 'Bolivar N° 2319 - Mar del Plata'),
  },
  {
    categoriaSlug: 'ascensores-electromecanicos',
    titulo: 'Sanchez de Loria N° 2364',
    direccion: 'Sanchez de Loria N° 2364',
    localidad: 'Capital Federal',
    equipos: [],
    folder: path.join(FOTOS_DIR, 'Electromecánicos', 'Sanchez de Loria Nº 2364'),
    observaciones:
      'El docx de detalle técnico entregado en esta carpeta describe en realidad la obra de Llavallol N° 66 (contenido duplicado/mal archivado por el cliente). No se cargó ficha técnica para no arriesgar datos incorrectos — pedir al cliente el detalle real de esta obra.',
  },
  {
    categoriaSlug: 'ascensores-electromecanicos',
    titulo: 'Venezuela N° 1278 — Ascensores N° 1 y 2',
    direccion: 'Venezuela N° 1278',
    localidad: 'Capital Federal',
    destacada: true,
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
    folder: path.join(FOTOS_DIR, 'Electromecánicos', 'Venezuela Nº 1278'),
  },
  {
    categoriaSlug: 'ascensores-electromecanicos',
    titulo: 'Llavallol N° 66',
    direccion: 'Llavallol N° 66',
    localidad: 'Lanús Oeste',
    equipos: [
      {
        resumen: 'Instalación de un ascensor',
        paradas: 11,
        cargaUtilKg: 450,
        velocidadMpm: 60,
        detalle: 'Terminación de cabina y puertas de 2 hojas en acero inoxidable.',
      },
    ],
    folder: path.join(FOTOS_DIR, 'Electromecánicos', 'Llavallol N° 66'),
  },
  {
    categoriaSlug: 'ascensores-electromecanicos',
    titulo: 'Av. San Martín N° 4747 — FAMIQ SRL',
    direccion: 'Avenida San Martín N° 4747',
    localidad: 'Capital Federal',
    equipos: [
      {
        resumen: 'Instalación de dos ascensores en batería',
        paradas: 8,
        cargaUtilKg: 900,
        velocidadMpm: 60,
        detalle: 'Terminación de cabina y puertas de 3 hojas en acero inoxidable anti vandálico especial.',
      },
    ],
    folder: path.join(FOTOS_DIR, 'Electromecánicos', 'FAMIQ - Av. San Martín Nº 4747'),
  },
  {
    categoriaSlug: 'ascensores-electromecanicos',
    titulo: 'SKF Tortuguitas',
    direccion: 'Ruta 8 KM 36,50 (Panamericana Ramal Pilar)',
    localidad: 'Tortuguitas',
    destacada: true,
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
    folder: path.join(FOTOS_DIR, 'Electromecánicos', 'SKF Tortuguitas'),
  },
]

function listPhotos(folder: string): string[] {
  if (!fs.existsSync(folder)) return []
  const out: string[] = []
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const full = path.join(folder, entry.name)
    if (entry.isDirectory()) {
      out.push(...listPhotos(full))
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      out.push(full)
    }
  }
  return out.sort()
}

export async function runSeed(payload: Payload, log: (msg: string) => void = console.log) {
  log('Creando categorías…')
  const categoriaIds = new Map<string, number | string>()
  for (const c of CATEGORIAS) {
    const existing = await payload.find({ collection: 'categorias', where: { slug: { equals: c.slug } }, limit: 1 })
    const doc =
      existing.docs[0] ??
      (await payload.create({
        collection: 'categorias',
        data: { nombre: c.nombre, slug: c.slug, descripcion: c.descripcion, orden: c.orden },
      }))
    categoriaIds.set(c.slug, doc.id)
  }

  log('Creando trabajos y subiendo fotos…')
  for (const t of TRABAJOS) {
    const existing = await payload.find({ collection: 'trabajos', where: { titulo: { equals: t.titulo } }, limit: 1 })
    if (existing.docs.length > 0) {
      log(`  ya existe: ${t.titulo}`)
      continue
    }

    const fotos = listPhotos(t.folder)
    const galeria: { imagen: number | string }[] = []
    for (const [i, fotoPath] of fotos.entries()) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: `${t.titulo} — foto ${i + 1}` },
        filePath: fotoPath,
      })
      galeria.push({ imagen: media.id })
    }

    const categoriaId = categoriaIds.get(t.categoriaSlug)

    await payload.create({
      collection: 'trabajos',
      data: {
        titulo: t.titulo,
        direccion: t.direccion,
        localidad: t.localidad,
        categoria: categoriaId ? [categoriaId] : [],
        destacada: Boolean(t.destacada),
        equipos: t.equipos,
        galeria,
        observaciones: t.observaciones,
        _status: 'published',
      },
    })
    log(`  creado: ${t.titulo} (${fotos.length} fotos)`)
  }

  log('Asignando foto de portada a las categorías con trabajos…')
  for (const c of CATEGORIAS) {
    const categoriaId = categoriaIds.get(c.slug)
    const trabajosRes = await payload.find({
      collection: 'trabajos',
      where: { categoria: { equals: categoriaId } },
      limit: 1,
      depth: 1,
    })
    const primero = trabajosRes.docs[0] as unknown as { galeria?: { imagen?: { id?: number | string } }[] } | undefined
    const primeraFoto = primero?.galeria?.[0]?.imagen?.id
    if (primeraFoto) {
      await payload.update({ collection: 'categorias', id: categoriaId as string, data: { imagen: primeraFoto } })
    }
  }

  log('Configurando textos institucionales y de contacto…')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      aniosTrayectoria: 30,
      planta: 'Lanús',
      sucursal: 'Villa Gesell',
      telefono: '11-3273-6626',
      email: 'obras@ascensoresdelsur.com.ar',
      direccion: 'Hernandarias N° 3161, Lanús Oeste, Prov. de Buenos Aires',
    },
  })

  log('Listo.')
}
