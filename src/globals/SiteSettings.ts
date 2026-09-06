import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del sitio',
  admin: {
    group: 'Administración',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Indicadores (home)',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'aniosTrayectoria', type: 'number', label: 'Años de trayectoria', defaultValue: 30, admin: { width: '33%' } },
            { name: 'planta', type: 'text', label: 'Planta industrial', defaultValue: 'Lanús', admin: { width: '33%' } },
            { name: 'sucursal', type: 'text', label: 'Sucursal', defaultValue: 'Villa Gesell', admin: { width: '33%' } },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contacto',
      fields: [
        { name: 'telefono', type: 'text', defaultValue: '11-3273-6626' },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp (formato internacional, sin espacios)',
          admin: {
            description: 'Ej: 5491132736626. Si está vacío, el botón de WhatsApp no se muestra.',
          },
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'obras@ascensoresdelsur.com.ar',
          admin: {
            description: 'La casilla todavía se está gestionando con el cliente — confirmar antes de publicar.',
          },
        },
        { name: 'direccion', type: 'text', defaultValue: 'Hernandarias N° 3161, Lanús Oeste, Prov. de Buenos Aires' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Redes sociales',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'linkedin', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'testimonio',
      label: 'Testimonio (⚠ ilustrativo — ver descripción)',
      admin: {
        description:
          '⚠ ILUSTRATIVO: esta cita es de ejemplo, no de un cliente real, para no dejar el formulario de contacto sin ningún incentivo mientras se consigue un testimonio real. Reemplazar por una cita real en cuanto el cliente la provea.',
      },
      fields: [
        {
          name: 'cita',
          type: 'textarea',
          label: 'Cita',
          defaultValue:
            'Desde que solicitamos el presupuesto avanzamos mucho más rápido con el proyecto gracias a las recomendaciones del equipo de ADS.',
        },
        { name: 'autor', type: 'text', label: 'Autor', defaultValue: 'Dirección de obra' },
        { name: 'rol', type: 'text', label: 'Rol / rubro', defaultValue: 'Estudio de arquitectura, Buenos Aires' },
      ],
    },
  ],
}
