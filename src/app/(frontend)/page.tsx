import { SiteHeader } from '@/components/SiteHeader'
import { HeroSection } from '@/components/HeroSection'
import { TrustMarquee } from '@/components/TrustMarquee'
import { StatementSection } from '@/components/StatementSection'
import { ProcessSection } from '@/components/ProcessSection'
import { SolutionsGrid } from '@/components/SolutionsGrid'
import { ObrasRail } from '@/components/ObrasRail'
import { EngineeringSection } from '@/components/EngineeringSection'
import { ProofSection } from '@/components/ProofSection'
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

        <section className="section solutions" id="soluciones">
          <div className="section-head">
            <div>
              <div className="label">Soluciones</div>
              <h2 className="section-title">
                La oferta <span className="orange">más amplia</span> de productos y soluciones.
              </h2>
            </div>
            <div className="section-copy">
              La oferta se adapta al uso, la carga, el recorrido y las condiciones de cada obra. Elegí qué necesitás
              resolver para encontrar la familia de solución correspondiente.
            </div>
          </div>
          <SolutionsGrid />
        </section>

        <section className="section projects" id="obras" style={{ paddingRight: 0 }}>
          <div className="projects-head">
            <div className="label">Obras realizadas</div>
            <h2 className="section-title">
              La mejor prueba está en <span className="orange">la obra terminada.</span>
            </h2>
            <div className="section-copy" style={{ color: 'rgba(255,255,255,.65)', margin: '24px 0 48px' }}>
              Una selección de obras para mostrar tipologías, escalas y desafíos distintos. Entrá a cada una para ver
              la ficha técnica completa.
            </div>
          </div>
          <ObrasRail />
        </section>

        <EngineeringSection />

        <ProofSection />

        <ContactSection />
      </main>

      <Footer />
      <WhatsappFloat />
    </>
  )
}
