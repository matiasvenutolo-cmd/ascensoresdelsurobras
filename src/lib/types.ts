// Tipos livianos escritos a mano para el frontend.
// `payload generate:types` tiene un bug de toolchain conocido en este entorno
// (Node 24 + tsx + payload run: ERR_REQUIRE_ASYNC_MODULE). No afecta a la app en
// sí (Next.js la resuelve bien vía su propio bundler) — solo al CLI standalone.

export type MediaDoc = {
  id: number | string
  url?: string | null
  alt?: string | null
  sizes?: Record<string, { url?: string | null }> | null
}

export type Categoria = {
  id: number | string
  nombre: string
  slug: string
  imagen?: MediaDoc | number | string | null
  descripcion?: string | null
  orden?: number | null
}

export type Equipo = {
  resumen: string
  paradas?: number | null
  cargaUtilKg?: number | null
  velocidadMpm?: number | null
  detalle?: string | null
}

export type Trabajo = {
  id: number | string
  titulo: string
  slug?: string | null
  direccion?: string | null
  localidad?: string | null
  categoria?: (Categoria | number | string)[] | null
  destacada?: boolean | null
  equipos?: Equipo[] | null
  galeria?: { imagen: MediaDoc | number | string }[] | null
}

export type Certificacion = {
  id: number | string
  nombre: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
}

export type SiteSettings = {
  telefono?: string | null
  whatsapp?: string | null
  email?: string | null
  direccion?: string | null
  instagram?: string | null
  facebook?: string | null
  linkedin?: string | null
  aniosTrayectoria?: number | null
  planta?: string | null
  sucursal?: string | null
}

export type Institucional = {
  textoPrincipal?: string | null
  pilares?: { titulo: string; descripcion?: string | null }[] | null
}
