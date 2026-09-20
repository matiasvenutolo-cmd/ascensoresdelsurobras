import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ContactDrawerProvider } from '@/components/ContactDrawer'
import { SITE } from '@/data/site'
import './globals.css'

const title = 'Ascensores del Sur | Instalaciones, Obras y Proyectos'
const description =
  'Asesoramos, diseñamos, proyectamos, fabricamos e instalamos ascensores y montacargas a medida. Más de 30 años de trayectoria, planta industrial en Lanús y sucursal en Villa Gesell.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.legal,
  description,
  telephone: SITE.telefono,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.direccion,
    addressCountry: 'AR',
  },
  url: SITE.url,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ContactDrawerProvider>{children}</ContactDrawerProvider>
      </body>
    </html>
  )
}
