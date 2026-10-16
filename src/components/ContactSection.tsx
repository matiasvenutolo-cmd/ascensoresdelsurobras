import { SITE } from '@/data/site'
import { OpenDrawerButton } from './ContactDrawer'
import { WhatsappIcon } from './icons'

export function ContactSection() {
  return (
    <section className="section contact" id="contacto">
      <div className="contact-grid">
        <div>
          <div className="label">Contacto</div>
          <h2 className="section-title">
            Solicitá el <span className="orange">asesoramiento técnico</span> para tu obra.
          </h2>
          <p className="contact-copy">
            Una obra nueva o una necesidad de transporte vertical. El primer paso es entender el proyecto.
          </p>
          <div className="contact-actions">
            <a
              className="btn btn-whatsapp"
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon size={18} />
              Contactar por WhatsApp
            </a>
            <a className="btn btn-outline-blue" href={`mailto:${SITE.email}`}>
              Escribir por correo
            </a>
            <OpenDrawerButton className="btn btn-outline-blue">Enviar consulta</OpenDrawerButton>
          </div>
        </div>
        <aside className="contact-card">
          <div className="contact-row">
            <span>Mail</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="contact-row">
            <span>WhatsApp</span>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
              {SITE.telefono}
            </a>
          </div>
          <div className="contact-row">
            <span>Planta industrial</span>
            <strong>{SITE.direccion}</strong>
          </div>
          <div className="contact-row">
            <span>Cobertura</span>
            <strong>{[SITE.coberturaAmba, ...SITE.coberturaCosta].join(' · ')}</strong>
          </div>
        </aside>
      </div>
    </section>
  )
}
