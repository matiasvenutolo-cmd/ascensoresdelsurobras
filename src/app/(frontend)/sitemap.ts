import type { MetadataRoute } from 'next'
import { getServerURL } from '@/lib/getURL'
import { TRABAJOS } from '@/data/trabajos'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getServerURL()

  const staticRoutes = ['', '/privacidad'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }))

  const trabajoRoutes = TRABAJOS.map((t) => ({
    url: `${base}/trabajos/${t.slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...trabajoRoutes]
}
