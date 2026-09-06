import type { GlobalConfig } from 'payload'

export const Institucional: GlobalConfig = {
  slug: 'institucional',
  label: 'Institucional (Soluciones)',
  admin: {
    group: 'Contenido del sitio',
    description: 'Texto institucional que se muestra en la sección "Qué hacemos" de /soluciones.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'textoPrincipal',
      type: 'textarea',
      defaultValue:
        'Ascensores del Sur – Instalaciones, Obras y Proyectos diseña, fabrica e instala ascensores y montacargas a medida para obra nueva, con más de 30 años de trayectoria, planta industrial propia en Lanús y sucursal en Villa Gesell. Trabajamos con un plantel técnico especializado y proveedores certificados para sostener tres pilares: calidad, seguridad y normativa.',
    },
  ],
}
