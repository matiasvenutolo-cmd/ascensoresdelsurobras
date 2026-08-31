import { Isotipo } from '../Isotipo.tsx'

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Isotipo style={{ width: 140, height: 'auto', flexShrink: 0 }} />
    </div>
  )
}
