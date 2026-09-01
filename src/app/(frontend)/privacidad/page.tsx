import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { SiteSettings } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Política de privacidad — ADS Ascensores del Sur',
  description: 'Cómo tratamos los datos personales que nos dejás a través de este sitio.',
}

export default async function PrivacidadPage() {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const s = settings as SiteSettings

  return (
    <>
      <Header settings={s} />

      <section className="dir-hero">
        <div className="wrap">
          <span className="kick">Legal</span>
          <h1>Política de privacidad</h1>
        </div>
      </section>

      <section>
        <div className="wrap detail-body" style={{ maxWidth: 760 }}>
          <p>
            Este sitio pertenece a ADS — Ascensores del Sur. Esta política explica qué datos personales recolectamos
            a través del sitio y cómo los tratamos, conforme a la Ley 25.326 de Protección de Datos Personales de la
            República Argentina.
          </p>
          <h3>Qué datos recolectamos</h3>
          <p>
            Cuando completás el formulario de contacto o de solicitud de presupuesto, recolectamos los datos que vos
            mismo nos proporcionás: nombre, empresa, email, teléfono, y los detalles de tu proyecto que decidas
            compartir.
          </p>
          <h3>Para qué los usamos</h3>
          <p>
            Usamos esos datos exclusivamente para responder tu consulta y elaborar una cotización. No los
            compartimos con terceros ni los usamos con fines distintos a los que motivaron el contacto.
          </p>
          <h3>Tus derechos</h3>
          <p>
            Como titular de tus datos personales, tenés derecho a acceder, rectificar o solicitar la eliminación de
            la información que nos dejaste. Para ejercer estos derechos, escribinos a través de la sección de
            contacto.
          </p>
          <h3>Contacto</h3>
          <p>{s.direccion}</p>
        </div>
      </section>

      <Footer settings={s} />
    </>
  )
}
