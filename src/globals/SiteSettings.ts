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
  ],
}
