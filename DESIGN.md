# Diseño del sitio — ADS Obras

Referencia del sistema de diseño del sitio (`ascensoresdelsurobras.vercel.app`), para compartir y discutir con el equipo. No es un manual de marca formal — es una descripción de las decisiones ya tomadas en el sitio actual, para tener un lenguaje común a la hora de pedir cambios.

## Concepto

Un sitio de una sola página (más una ficha por cada obra), pensado para transmitir capacidad técnica e industrial — no una landing de servicios genérica. La referencia visual es más cercana a una ficha de ingeniería o un catálogo técnico que a una landing de SaaS: tipografía grande y condensada, grillas técnicas de fondo, datos concretos (kg, mpm, paradas), fotos reales de obra en vez de ilustraciones.

Principio rector: **todo lo que se muestra es real**. Ninguna cifra, testimonio o certificación se inventa — si no hay un dato confirmado, la sección no se hace o queda marcada como pendiente.

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--blue` | `#034EA2` | Color de marca principal — botones, links, acentos |
| `--blue-deep` | `#023D80` | Variante oscura del azul — degradés, hover de botones azules |
| `--orange` | `#FAA61A` | Color secundario — única fuente de "color vivo" del sitio: CTAs primarios, números, subrayados |
| `--ink` | `#34393E` | Gris oscuro para títulos y texto principal (antes era azul casi negro; se cambió a gris a pedido explícito — se sentía "chocante" con el azul/amarillo) |
| `--muted` | `#5C6875` | Gris medio para texto secundario / bajadas |
| `--paper` | `#F4F6F7` | Fondo gris muy claro, alterna con blanco entre secciones |
| `--line` | `#D8E0E7` | Bordes y separadores |
| Footer (acero) | degradé de grises claros | Fondo del footer — efecto "acero inoxidable", el material de los propios ascensores |

**Regla de la paleta**: solo dos colores "de marca" (azul y naranja) y una escala de grises. El naranja se usa con moderación — es el único acento que debe saltar a la vista; si todo fuera naranja, dejaría de funcionar como señal.

## Tipografía

- **Títulos y elementos de marca** — [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) (700/800). Es una fuente condensada e industrial: permite títulos muy grandes sin ocupar tanto ancho, y da el aire "técnico" al sitio. Se usa en todos los `h1`/`h2`/`h3`, números, kickers y botones.
- **Texto de lectura** — [Inter](https://fonts.google.com/specimen/Inter) (400/500/600). Para párrafos y textos largos, donde Barlow Condensed sería incómodo de leer.
- Los kickers/etiquetas (ej. "SOLUCIONES", "01 / PERSONAS") van siempre en mayúscula, con tracking amplio y una línea u orange como marca visual — es el recurso que se repite en todo el sitio para introducir una sección.

## Estructura de la home

Una sola página larga, navegación por anclas:

1. **Hero** — video de fondo (obra real), overlay azul oscuro (no negro), título grande, 2 CTA, 3 datos (años / planta / sucursal).
2. **Marquee de confianza** — cinta con las palabras clave del negocio (Calidad · Seguridad · Normativa...) en loop.
3. **La empresa** — texto institucional + 3 pilares (Calidad, Seguridad, Normativa) + panel azul destacado.
4. **Cómo trabajamos** — proceso en 5 pasos (Asesoramos → Diseñamos → Proyectamos → Entregamos → Instalamos), con acompañamiento de texto sticky a la izquierda.
5. **Soluciones** — grid de cards por tipo de equipo (hidráulico, electromecánico, monta vehículos, etc.), filtrable por Personas/Carga/Especiales. Las categorías con una obra real cargada muestran su foto y linkean a la ficha de esa obra; las que no, quedan en texto simple — nunca se inventa un ejemplo.
6. **Obras realizadas** — rail horizontal (scroll + autoscroll) con las obras cargadas, fondo en degradé azul. Cada card linkea a la ficha completa de esa obra.
7. **Ingeniería** — foto real de una obra en construcción + copy sobre gestión técnica de proyecto + datos (años, casas centrales, zona de cobertura).
8. **Nuestro respaldo** — 4 puntos (Experiencia, Capacidad, Normativa, Continuidad), sobre fondo azul.
9. **Contacto** — copy + datos de contacto + botón que abre el panel lateral de consulta.

## Página de obra (`/trabajos/[obra]`)

Cada obra cargada tiene su propia página: título, dirección, tags de categoría, galería de fotos curadas (no todas las fotos que hay — se elige un subconjunto priorizando las tomas más logradas) y ficha técnica por cada equipo instalado (capacidad, paradas, velocidad, detalle).

## El panel de contacto (drawer)

En vez de una página de contacto aparte, cualquier botón "Hablemos" / "Solicitar presupuesto" abre un panel lateral (estilo pinaro.ar) con un formulario corto: nombre, mail, teléfono (opcional), mensaje (opcional). No hay backoffice ni base de datos — el envío llega directo por mail.

## Fotografía

No hay imágenes de stock ni ilustraciones genéricas — todas las fotos son de obras reales del cliente. Se revisan y curan a mano: se elige la foto más lograda como portada de cada obra (y de cada categoría de producto en Soluciones), priorizando encuadre, luz y que se entienda la instalación de un vistazo, en vez de usar la primera foto de la carpeta.

## Qué NO hace el sitio (a propósito)

- No tiene panel de administración — el contenido (obras, categorías, datos de contacto) vive en el código, y cualquier cambio se pide al desarrollador.
- No muestra certificaciones ISO ni cifras de "obras totales" — no hay datos confirmados para eso, y no se inventan.
- No tiene testimonios reales todavía — hay un texto ilustrativo marcado como pendiente de reemplazo, editable desde `src/data/site.ts`.
- No tiene blog, calculadoras ni configuradores — el foco es mostrar capacidad técnica real, no funcionalidades que no se van a mantener.

## Dónde tocar qué (referencia rápida)

| Querés cambiar... | Está en... |
|---|---|
| Colores, tipografía, todos los estilos | `src/app/(frontend)/globals.css` |
| Teléfono, mail, dirección, redes | `src/data/site.ts` |
| Tipos de equipo / categorías | `src/data/categorias.ts` |
| Obras cargadas y sus fichas técnicas | `src/data/trabajos.ts` |
| Fotos de cada obra | `public/images/trabajos/<obra>/` |
| Textos de cada sección de la home | `src/components/*Section.tsx` |
