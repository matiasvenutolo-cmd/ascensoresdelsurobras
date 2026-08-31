import type { CollectionConfig } from 'payload'

export const Certificaciones: CollectionConfig = {
  slug: 'certificaciones',
  labels: {
    singular: 'Certificación',
    plural: 'Certificaciones',
  },
  admin: {
    useAsTitle: 'nombre',
    group: 'Catálogo de obras',
    description: 'Certificados de componentes de seguridad (ej. Resolución 27/2025). Se muestran en /certificaciones.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    mimeTypes: ['application/pdf', 'image/*'],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      admin: {
        description: 'Ej: "Certificación EN 81-1" o "Resolución 27/2025 — componente X"',
      },
    },
  ],
}
