import Image from 'next/image'
import { SiteHeader } from '@/components/SiteHeader'
import { HeroSection } from '@/components/HeroSection'
import { TrustMarquee } from '@/components/TrustMarquee'
import { StatementSection } from '@/components/StatementSection'
import { ProcessSection } from '@/components/ProcessSection'
import { ObrasTerminadas } from '@/components/ObrasTerminadas'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="inicio">
        <HeroSection />

        <TrustMarquee />

        <StatementSection />

        <ProcessSection />

        <section className="special-band" aria-label="Proyecto especial">
          <div className="special-band-in">
            <Image
              className="special-project-photo"
              src="/images/especial/papa-leon-xiv.jpg"
              alt="Papa León XIV"
              width={208}
              height={240}
            />
            <div>
              <div className="special-project-head">
                <div className="special-project-kicker">Proyecto especial</div>
                <span className="special-project-tag">En construcción</span>
              </div>
              <p>El Papa León XIV usó un ascensor de nuestras obras en su visita a Argentina.</p>
            </div>
          </div>
        </section>

        <section className="section obras-terminadas" id="obras">
          <div className="section-head">
            <div>
              <div className="label">Obras terminadas</div>
              <h2 className="section-title">
                La oferta más amplia de soluciones, <span className="orange">resuelta en obra real.</span>
              </h2>
            </div>
            <div className="section-copy">
              Cada tipología de equipo está resuelta en trabajos reales — entrá a cualquiera para ver la ficha
              técnica completa de la instalación.
            </div>
          </div>
          <ObrasTerminadas />
        </section>

        <ContactSection />
      </main>

      <Footer />
      <WhatsappFloat />
    </>
  )
}
