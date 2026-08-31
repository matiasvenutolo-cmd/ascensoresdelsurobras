import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsappFloat } from '@/components/WhatsappFloat'
import { CategoriaCard } from '@/components/CategoriaCard'
import type { Categoria, SiteSettings } from '@/lib/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Productos — ADS Ascensores del Sur',
  description: 'Ascensores hidráulicos y electromecánicos, monta vehículos, montacargas y monta platos a medida.',
}

export default async function ProductosPage() {
  const payload = await getPayload()

  const [settings, categoriasRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'categorias', limit: 50, sort: 'orden' }),
  ])

  const s = settings as SiteSettings
  const categorias = categoriasRes.docs as unknown as Categoria[]

  return (
    <>
      <Header settings={s} />

      <section className="dir-hero">
        <div className="wrap">
          <span className="kick">Productos</span>
          <h1>Soluciones de transporte vertical a medida</h1>
          <p>
            Diseñamos, fabricamos e instalamos ascensores, monta vehículos y montacargas para cada necesidad de
            obra. Elegí un tipo de producto para ver los trabajos realizados.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {categorias.length === 0 && (
            <p style={{ color: 'var(--slate)' }}>Todavía no hay categorías cargadas.</p>
          )}
          <div className="cat-grid">
            {categorias.map((c) => (
              <CategoriaCard categoria={c} key={c.id} />
            ))}
          </div>
        </div>
      </section>

      <Footer settings={s} />
      <WhatsappFloat settings={s} />
    </>
  )
}
