import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/nosotros', destination: '/soluciones', permanent: true },
      { source: '/servicios', destination: '/soluciones', permanent: true },
      { source: '/certificaciones', destination: '/soluciones', permanent: true },
      { source: '/productos', destination: '/soluciones', permanent: true },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
