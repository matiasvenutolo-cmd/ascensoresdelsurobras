// Seed de datos reales del cliente (dev-only, `npm run seed`).
// Sube las fotos de obras entregadas por el cliente y crea las Categorías y
// Trabajos correspondientes vía Local API. No corre en producción.
//
// Nota: en esta máquina, `payload run` (Node 24 + tsx) choca con un bug de
// interop ESM/CJS conocido del toolchain (ERR_REQUIRE_ASYNC_MODULE / mismo
// problema que `payload generate:types`, documentado en el starter template).
// Si este comando falla así, la lógica de seed (`runSeed`, en `seedData.ts`)
// se puede invocar igual desde una API route temporal corriendo adentro de
// `next dev` (que sí resuelve el ESM de Payload sin problema) — es lo que se
// usó para la primera carga de datos de este proyecto.
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { runSeed } from './seedData.ts'

async function run() {
  const payload = await getPayload({ config })
  await runSeed(payload)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
