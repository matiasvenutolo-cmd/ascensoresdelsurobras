import { SITE } from '@/data/site'
import { OpenDrawerButton } from './ContactDrawer'

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
            Una obra nueva, una ampliación, un requerimiento especial o una necesidad de transporte vertical. El
            primer paso es entender el proyecto.
          </p>
          <div className="contact-actions">
            <OpenDrawerButton className="btn btn-solid-blue">Enviar consulta</OpenDrawerButton>
            <a className="btn btn-outline-blue" href={`tel:${SITE.telefonoHref}`}>
              Llamar al {SITE.telefono}
            </a>
          </div>
        </div>
        <aside className="contact-card">
          <div className="contact-row">
            <span>Mail</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="contact-row">
            <span>Teléfono</span>
            <a href={`tel:${SITE.telefonoHref}`}>{SITE.telefono}</a>
          </div>
          <div className="contact-row">
            <span>Planta industrial</span>
            <strong>{SITE.direccion}</strong>
          </div>
          <div className="contact-row">
            <span>Provincia</span>
            <strong>Buenos Aires · Argentina</strong>
          </div>
        </aside>
      </div>
    </section>
  )
}
