import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Categorias } from './collections/Categorias.ts'
import { Trabajos } from './collections/Trabajos.ts'
import { Certificaciones } from './collections/Certificaciones.ts'
import { SiteSettings } from './globals/SiteSettings.ts'
import { Institucional } from './globals/Institucional.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// En Vercel no hay disco persistente: usamos Postgres si hay una connection
// string disponible, y SQLite local como fallback para desarrollo sin
// dependencias. La integración de Neon en este proyecto le puso a TODAS sus
// variables el prefijo `POSTGRESADS_` (para no chocar con la de otro proyecto
// en la misma cuenta) — no reemplaza el nombre entero, así que la pooled
// queda como `POSTGRESADS_POSTGRES_URL` / `POSTGRESADS_DATABASE_URL`, no
// `POSTGRESADS_URL` sola. En vez de perseguir el nombre exacto, buscamos
// cualquier variable que empiece con ese prefijo y sea una connection string
// de Postgres, priorizando la pooled sobre la _UNPOOLED/_NON_POOLING.
function findPostgresUrl(): string | undefined {
  const direct = process.env.POSTGRES_URL || process.env.DATABASE_URL
  if (direct) return direct

  const candidates = Object.entries(process.env)
    .filter(
      ([key, value]) =>
        key.startsWith('POSTGRESADS_') && typeof value === 'string' && value.startsWith('postgres'),
    )
    .sort(([a], [b]) => {
      const score = (k: string) => (/UNPOOLED|NON_POOLING|PRISMA/.test(k) ? 1 : 0)
      return score(a) - score(b)
    })

  return candidates[0]?.[1]
}

const postgresUrl = findPostgresUrl()
const db = postgresUrl
  ? // `push: true` crea/sincroniza el schema solo, sin correr migraciones a mano.
    // Bien para arrancar con una base vacía. Ojo: una vez que haya datos reales
    // en producción, conviene pasar a migraciones (`payload migrate`).
    postgresAdapter({ pool: { connectionString: postgresUrl }, push: true })
  : sqliteAdapter({ client: { url: process.env.DATABASE_URI || 'file:./dev.db' } })

// Vercel Blob guarda los archivos subidos (fotos de obras, certificados) en
// storage persistente. Se activa solo si existe el token (lo inyecta la
// integración de Vercel Blob al conectarla al proyecto).
const plugins = process.env.BLOB_READ_WRITE_TOKEN
  ? [
      vercelBlobStorage({
        collections: { media: true, certificaciones: true },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]
  : []

// Diagnóstico temporal: loguea (sin exponer valores) qué variables de entorno
// clave están realmente presentes en runtime. Ayuda a distinguir "no está
// seteada" de "está seteada pero el deploy no la tomó". Sacar una vez resuelto.
console.log('[env-check]', {
  postgresUrlFound: Boolean(postgresUrl),
  postgresadsKeysSeen: Object.keys(process.env).filter((k) => k.startsWith('POSTGRESADS_')),
  PAYLOAD_SECRET: Boolean(process.env.PAYLOAD_SECRET),
  BLOB_READ_WRITE_TOKEN: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || null,
  VERCEL_ENV: process.env.VERCEL_ENV || null,
})

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- ADS Obras Backoffice',
    },
    components: {
      graphics: {
        Logo: '/components/admin/AdminLogo.tsx#AdminLogo',
        Icon: '/components/admin/AdminIcon.tsx#AdminIcon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      collections: ['trabajos'],
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 375, height: 812 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Trabajos, Categorias, Certificaciones, Media, Users],
  globals: [SiteSettings, Institucional],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  plugins,
  sharp,
})
