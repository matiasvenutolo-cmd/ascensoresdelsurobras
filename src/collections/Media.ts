import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Administración',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto alternativo',
    },
  ],
  upload: {
    imageSizes: [
      // 'attention' usa detección de saliencia (Sharp/libvips) para centrar el recorte
      // en la zona más relevante de la imagen, en vez de recortar siempre geométricamente al centro.
      { name: 'thumbnail', width: 400, height: 300, position: 'attention' },
      { name: 'card', width: 900, height: 600, position: 'attention' },
      { name: 'hero', width: 1600, height: 900, position: 'attention' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
