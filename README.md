# ADS Obras — Ascensores del Sur

Sitio web de la unidad de instalación de ascensores en obras de **ADS / Ascensores del Sur**. Next.js 15 (App Router), 100% estático — sin CMS, sin base de datos, sin backoffice. Todo el contenido (obras, categorías, datos de contacto) vive en `src/data/`, versionado junto con el código. Cualquier cambio de contenido se hace editando esos archivos y deployando, no desde un panel de administración.

## Arrancar en local

```bash
npm install
npm run dev
```

No hace falta ninguna variable de entorno para desarrollar — todo el contenido es estático. Copiá `.env.example` a `.env` solo si necesitás probar el envío real de mails del formulario de contacto (ver abajo).

## Formulario de contacto

El botón "Hablemos" abre un panel lateral con un formulario compacto (Server Action en `src/app/(frontend)/contacto/actions.ts`). Al enviarse, manda un mail vía [Resend](https://resend.com) a la casilla configurada en `src/data/site.ts` — no guarda nada en ninguna base.

Para que funcione hace falta `RESEND_API_KEY` en `.env` (local) y en las variables de entorno de Vercel (producción). Sin esa key, el formulario muestra un mensaje pidiendo escribir por WhatsApp/teléfono en su lugar, en vez de fallar en silencio.

## Contenido (sin CMS)

- `src/data/site.ts` — teléfono, email, dirección, WhatsApp, años de trayectoria, planta, sucursal.
- `src/data/categorias.ts` — los 7 tipos de equipo (ascensores hidráulicos, electromecánicos, monta vehículos, etc.), usados en la sección "Soluciones" de la home.
- `src/data/trabajos.ts` — las obras reales cargadas: título, dirección, localidad, categorías, ficha técnica de cada equipo instalado, y cantidad de fotos (`fotos: N`). El orden del array define el orden en el rail de la home — está pensado para mostrar primero las fotos más impactantes, no un orden alfabético ni cronológico.

Para sumar una obra nueva: agregar una entrada en `trabajos.ts` y las fotos correspondientes en `public/images/trabajos/<slug>/1.jpg, 2.jpg, …` (recomendado: máx. ~1800px de lado mayor, calidad ~80, para no inflar el repo — ver el criterio de curación más abajo). `/trabajos/[slug]` genera la página automáticamente (`generateStaticParams`).

### Curación de fotos

Las fotos de cada obra no se cargan todas ni en el orden en que vienen de la cámara — se revisan y se eligen las más logradas (encuadre, luz, que se entienda la instalación de un vistazo), con la mejor como portada. El script usado para la migración inicial (redimensiona + resuelve el orden curado) quedó documentado en el historial de la sesión que hizo la migración; no es parte del repo porque fue un paso único.

## Producción (Vercel)

1. Conectar el repo a Vercel — no hace falta ninguna integración de base de datos ni de storage.
2. Variable de entorno: `RESEND_API_KEY` (para que el formulario de contacto envíe mails).
3. Deploy. Al ser 100% estático (`next build` prerenderiza todas las páginas, incluida cada obra), no hay build step que dependa de una base de datos externa.

## Toolchain conocido

- `npm run lint` / el paso de lint de `next build` fallan con `ESLint: Plugin "" not found` — bug de compatibilidad entre `eslint@9.39.5` y `eslint-config-next@15.4.11` en este entorno (existe igual en otros proyectos del mismo template, no es algo de este proyecto puntual). No bloquea `next build` (el build sigue y compila igual), solo el paso de lint en sí.

## Estructura

- `src/data/` — todo el contenido del sitio (ver arriba).
- `src/components/` — componentes de la landing (hero, proceso, soluciones, rail de obras, diagrama de ingeniería, drawer de contacto) y de las páginas de detalle.
- `src/app/(frontend)/` — home (one-pager), `/trabajos/[slug]` (ficha de cada obra), `/privacidad`.
- `public/images/trabajos/` — fotos curadas por obra. `public/video/` — video del hero.
