import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
