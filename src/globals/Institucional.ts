import type { GlobalConfig } from 'payload'

export const Institucional: GlobalConfig = {
  slug: 'institucional',
  label: 'Institucional (Nosotros)',
  admin: {
    group: 'Contenido del sitio',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'textoPrincipal',
      type: 'textarea',
      defaultValue:
        'Ascensores del Sur – Instalaciones, Obras y Proyectos se especializa en asesorar, diseñar, proyectar, fabricar e instalar ascensores y montacargas a medida para solucionar las más diversas necesidades del transporte vertical. Contamos con una amplia gama de productos para otorgarle a nuestros clientes una respuesta eficiente para el traslado de personas. Nuestra experiencia cuenta con una trayectoria de más de 30 años trabajando en el sector con la planta industrial localizada en Lanús y sucursal propia en Villa Gesell. Nuestro fuerte radica en brindar soluciones personalizadas a nuestros clientes respetando tres pilares: calidad, seguridad y normativa, esto es posible por el trabajo en conjunto con proveedores y un plantel técnico especializado desde hace años.',
    },
    {
      name: 'pilares',
      type: 'array',
      labels: { singular: 'Pilar', plural: 'Pilares' },
      fields: [
        { name: 'titulo', type: 'text', required: true },
        { name: 'descripcion', type: 'textarea' },
      ],
      defaultValue: [
        {
          titulo: 'Calidad',
          descripcion:
            'Más de 30 años de trayectoria en instalación de ascensores y montacargas, con un plantel técnico especializado.',
        },
        {
          titulo: 'Seguridad',
          descripcion:
            'Priorizamos la seguridad de personas y edificios en cada obra, trabajando con componentes certificados.',
        },
        {
          titulo: 'Normativa',
          descripcion:
            'Cumplimos la normativa vigente para transporte vertical, en conjunto con proveedores especializados.',
        },
      ],
    },
  ],
}
