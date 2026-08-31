# ADS Obras — Ascensores del Sur

Sitio web de la unidad de instalación de ascensores en obras de **ADS / Ascensores del Sur**. Next.js 15 (App Router) + Payload CMS 3 embebido, mismo esquema que otros proyectos de Pinaro (ver `payload.config.ts`).

## Arrancar en local

```bash
npm install
npm run dev
```

Sin variables de entorno adicionales, usa SQLite local (`dev.db`, gitignored). Entrá a `http://localhost:3000/admin` y creá el primer usuario.

Copiá `.env.example` a `.env` si necesitás cambiar algo (ya existe un `.env` local con los defaults de SQLite).

## Cargar el contenido real del cliente

```bash
npm run seed
```

Sube las fotos de obras entregadas por el cliente (carpeta `Fotos/` fuera del repo, en esta máquina) y crea las categorías y trabajos reales. Ver `src/seed/import-trabajos.ts` para el detalle y una nota sobre un docx del cliente con contenido mal archivado (Sanchez de Loria N° 2364).

## Producción (Vercel)

1. Conectar el repo a Vercel.
2. Sumar las variables de entorno: `POSTGRES_URL` (Neon), `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_SERVER_URL`.
3. Correr `npm run seed` localmente apuntando a esa `POSTGRES_URL`/`BLOB_READ_WRITE_TOKEN` para cargar el contenido real una sola vez (no corre solo en el deploy).

## Toolchain conocido

- `payload run <script>` falla en esta máquina (Node 24 + tsx: `ERR_REQUIRE_ASYNC_MODULE`). Ver la nota en `src/seed/import-trabajos.ts`.
- `npm run lint` / el paso de lint de `next build` fallan con `ESLint: Plugin "" not found` — bug de compatibilidad entre `eslint@9.39.5` y `eslint-config-next@15.4.11` en este entorno (existe igual en `caehfa-web`, no es algo de este proyecto). No bloquea `next build` (el build sigue y compila igual), solo el paso de lint en sí.

## Estructura

- `src/collections/` — Trabajos (obras realizadas), Categorías, Certificaciones, Media, Users.
- `src/globals/` — SiteSettings (contacto/redes/indicadores), Institucional (texto "Nosotros" + pilares).
- `src/app/(frontend)/` — sitio público.
- `src/app/(payload)/` — panel admin + API REST, generados por Payload.
