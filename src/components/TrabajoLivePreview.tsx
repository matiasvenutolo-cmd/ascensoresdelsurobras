'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Trabajo } from '@/lib/types'
import { TrabajoCard } from './TrabajoCard'

export function TrabajoLivePreview({ initialTrabajo }: { initialTrabajo: Trabajo }) {
  const { data: t } = useLivePreview<Trabajo>({
    initialData: initialTrabajo,
    serverURL: typeof window !== 'undefined' ? window.location.origin : '',
    depth: 1,
  })

  return (
    <div className="wrap" style={{ paddingTop: 20 }}>
      <div className="preview-banner">
        <span>👁 Vista previa en vivo — {t.titulo}</span>
        <span className="preview-banner-hint">Los cambios que hagas en el panel admin se ven acá al instante.</span>
      </div>
      <div style={{ maxWidth: 380 }}>
        <TrabajoCard trabajo={t} />
      </div>
    </div>
  )
}
