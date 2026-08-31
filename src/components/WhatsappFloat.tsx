import { WhatsappIcon } from './icons'
import type { SiteSettings } from '@/lib/types'

export function WhatsappFloat({ settings }: { settings: SiteSettings }) {
  if (!settings.whatsapp) return null
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${settings.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
    >
      <WhatsappIcon size={28} />
    </a>
  )
}
