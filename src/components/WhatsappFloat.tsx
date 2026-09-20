import { SITE } from '@/data/site'
import { WhatsappIcon } from './icons'

export function WhatsappFloat() {
  if (!SITE.whatsapp) return null
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
    >
      <WhatsappIcon size={28} />
    </a>
  )
}
