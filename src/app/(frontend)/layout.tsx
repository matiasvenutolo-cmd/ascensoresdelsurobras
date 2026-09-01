import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { getPayload } from '@/lib/getPayload'
import type { SiteSettings } from '@/lib/types'
import './globals.css'

const title = 'ADS — Ascensores del Sur | Instalaciones, Obras y Proyectos'
const description =
  'Asesoramos, diseñamos, proyectamos, fabricamos e instalamos ascensores y montacargas a medida. Más de 30 años de trayectoria, planta industrial en Lanús y sucursal en Villa Gesell.'

export const metadata: Metadata = {
  metadataBase: new URL('https://ascensoresdelsurobras.vercel.app'),
  title,
  description,
  icons: {
    icon: '/logo/ads-logo.png',
  },
  openGraph: {
    title,
    description,
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const payload = await getPayload()
  const settings = (await payload.findGlobal({ slug: 'site-settings' })) as SiteSettings

  // JSON-LD Organization/LocalBusiness. Sin `email`: ese campo todavía no
  // está confirmado con el cliente (ver admin.description en SiteSettings),
  // y publicar un dato no confirmado en structured data es peor que omitirlo.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ADS — Ascensores del Sur',
    description,
    telephone: settings.telefono || undefined,
    address: settings.direccion
      ? {
          '@type': 'PostalAddress',
          streetAddress: settings.direccion,
          addressCountry: 'AR',
        }
      : undefined,
    url: 'https://ascensoresdelsurobras.vercel.app',
  }

  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
