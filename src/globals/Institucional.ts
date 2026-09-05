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
      type: 'collapsible',
      label: 'Misión, Visión y Valores (⚠ placeholder — ver descripción)',
      admin: {
        description:
          '⚠ PLACEHOLDER TEMPORAL: este texto es la Misión/Visión/Valores de ADSUR (la fábrica de máquinas de tracción, otra unidad de negocio del grupo), tomado tal cual del manual de marca porque todavía no hay una versión propia de ADS Obras. Reemplazar en cuanto el cliente confirme la de esta unidad — hoy dice literalmente que el objetivo es "la producción de máquinas de tracción", que no es el negocio de esta unidad (instalación en obras).',
      },
      fields: [
        {
          name: 'vision',
          type: 'textarea',
          label: 'Visión',
          defaultValue:
            'Ser la empresa Nº 1 en la producción de máquinas de tracción para ascensores en la ciudad de Buenos Aires, extendiendo este liderazgo a todo el mercado interno de nuestro país y procurando avanzar al exterior.',
        },
        {
          name: 'mision',
          type: 'textarea',
          label: 'Misión',
          defaultValue:
            'Brindar a los clientes la oportunidad de obtener una máquina de tracción para ascensores de altísima calidad con precios competitivos a nivel internacional, junto a un servicio personalizado para solucionar cualquier inconveniente que pueda surgir.',
        },
        {
          name: 'valores',
          type: 'array',
          labels: { singular: 'Valor', plural: 'Valores' },
          fields: [
            { name: 'titulo', type: 'text', required: true },
            { name: 'descripcion', type: 'textarea' },
          ],
          defaultValue: [
            { titulo: 'Integridad', descripcion: 'Implica tener una conducta responsable, transparente y honesta.' },
            {
              titulo: 'Confianza',
              descripcion:
                'Basar las relaciones con los clientes en la consideración personal y profesional, brindándoles respaldo, flexibilidad y seguridad.',
            },
            { titulo: 'Innovación', descripcion: 'Buscar el progreso continuo, en lo referido a lo tecnológico y a su gente.' },
            {
              titulo: 'Calidad',
              descripcion: 'Brindar siempre el mejor producto, disponiendo todos los esfuerzos del staff de la empresa para ese fin.',
            },
          ],
        },
      ],
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
        {
          titulo: 'Asesoramiento desde el anteproyecto',
          descripcion:
            'Asesoramos, diseñamos y proyectamos junto al equipo de obra desde las primeras etapas, para que el ascensor o montacargas se integre bien al proyecto.',
        },
      ],
    },
  ],
}
