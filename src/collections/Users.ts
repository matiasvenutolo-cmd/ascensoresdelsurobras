import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles'],
    group: 'Administración',
  },
  auth: true,
  fields: [
    {
      name: 'nombre',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor de contenido', value: 'editor' },
      ],
    },
  ],
}
