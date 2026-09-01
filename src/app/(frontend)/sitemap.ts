import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/getPayload'
import { getServerURL } from '@/lib/getURL'

// Sin esto, Next.js pre-renderiza /sitemap.xml en build time — y como el
// schema push (`push: true` en payload.config.ts) solo corre bajo `next dev`
// (nunca en NODE_ENV=production, que es como corre `next build`), la consulta
// puede fallar contra una base cuyo schema todavía no tiene una columna nueva.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getServerURL()
  const payload = await getPayload()

  const trabajosRes = await payload.find({
    collection: 'trabajos',
    limit: 300,
    overrideAccess: false,
  })

  const staticRoutes = [
    '',
    '/nosotros',
    '/servicios',
    '/productos',
    '/trabajos',
    '/certificaciones',
    '/faq',
    '/contacto',
    '/privacidad',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }))

  const trabajoRoutes = (trabajosRes.docs as { slug?: string | null }[])
    .filter((t) => t.slug)
    .map((t) => ({
      url: `${base}/trabajos/${t.slug}`,
      lastModified: new Date(),
    }))

  return [...staticRoutes, ...trabajoRoutes]
}
