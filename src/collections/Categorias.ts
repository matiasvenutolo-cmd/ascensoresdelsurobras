import type { CollectionConfig } from 'payload'
import { slugify } from '../lib/slugify.ts'

export const Categorias: CollectionConfig = {
  slug: 'categorias',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  defaultSort: 'orden',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'orden', 'slug'],
    group: 'Catálogo de obras',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'Se genera automáticamente a partir del nombre. Usado en URLs y filtros.',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.nombre) return slugify(data.nombre)
            return value
          },
        ],
      },
    },
    {
      name: 'orden',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Controla el orden en /productos. Menor primero.',
        position: 'sidebar',
      },
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'descripcion',
      type: 'textarea',
      admin: {
        description: 'Bajada corta para la card de la categoría en /productos.',
      },
    },
  ],
}
