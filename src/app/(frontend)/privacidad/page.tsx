import type { Metadata } from 'next'
import { SiteHeader } from '@/components/SiteHeader'
import { Footer } from '@/components/Footer'
import { SITE } from '@/data/site'

export const metadata: Metadata = {
  title: 'Política de privacidad — ADS Ascensores del Sur',
  description: 'Cómo tratamos los datos personales que nos dejás a través de este sitio.',
}

export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader />

      <div className="legal-hero">
        <div className="label">Legal</div>
        <h1>Política de privacidad</h1>
      </div>

      <div className="legal-body">
        <p>
          Este sitio pertenece a {SITE.legal}. Esta política explica qué datos personales recolectamos a través del
          sitio y cómo los tratamos, conforme a la Ley 25.326 de Protección de Datos Personales de la República
          Argentina.
        </p>
        <h3>Qué datos recolectamos</h3>
        <p>
          Cuando completás el formulario de contacto, recolectamos los datos que vos mismo nos proporcionás: nombre,
          email, teléfono, y los detalles de tu proyecto que decidas compartir.
        </p>
        <h3>Para qué los usamos</h3>
        <p>
          Usamos esos datos exclusivamente para responder tu consulta. No los compartimos con terceros ni los usamos
          con fines distintos a los que motivaron el contacto.
        </p>
        <h3>Tus derechos</h3>
        <p>
          Como titular de tus datos personales, tenés derecho a acceder, rectificar o solicitar la eliminación de la
          información que nos dejaste. Para ejercer estos derechos, escribinos a {SITE.email}.
        </p>
        <h3>Contacto</h3>
        <p>{SITE.direccion}</p>
      </div>

      <Footer />
    </>
  )
}
