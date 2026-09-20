import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/nosotros', destination: '/', permanent: true },
      { source: '/servicios', destination: '/', permanent: true },
      { source: '/certificaciones', destination: '/', permanent: true },
      { source: '/productos', destination: '/', permanent: true },
      { source: '/soluciones', destination: '/', permanent: true },
      { source: '/trabajos', destination: '/#obras', permanent: true },
      { source: '/contacto', destination: '/?hablemos=1', permanent: true },
    ]
  },
}

export default nextConfig
