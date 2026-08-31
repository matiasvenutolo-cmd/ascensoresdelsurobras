import type { CollectionConfig } from 'payload'
import { getServerURL } from '../lib/getURL.ts'
import { slugify } from '../lib/slugify.ts'

export const Trabajos: CollectionConfig = {
  slug: 'trabajos',
  labels: {
    singular: 'Trabajo',
    plural: 'Trabajos',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', '_status', 'categoria', 'localidad', 'destacada'],
    group: 'Catálogo de obras',
    description: 'Obras de instalación realizadas. Es el contenido de mayor valor del sitio.',
    livePreview: {
      url: ({ data }) => `${getServerURL()}/trabajos/${data.slug}?preview=${data.id}`,
    },
  },
  versions: {
    drafts: {
      autosave: false,
    },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Datos generales',
          fields: [
            {
              name: 'titulo',
              type: 'text',
              required: true,
              admin: {
                description: 'Ej: "Esmeralda N° 1212 — Cancillería"',
              },
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              admin: {
                description: 'Se genera automáticamente a partir del título. No traducir.',
                position: 'sidebar',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (value) return value
                    if (data?.titulo) return slugify(data.titulo)
                    return value
                  },
                ],
              },
            },
            {
              name: 'direccion',
              type: 'text',
            },
            {
              name: 'localidad',
              type: 'text',
            },
            {
              name: 'categoria',
              type: 'relationship',
              relationTo: 'categorias',
              hasMany: true,
              admin: {
                description: 'Tipo(s) de equipo instalados en esta obra.',
              },
            },
            {
              name: 'destacada',
              type: 'checkbox',
              label: 'Destacar en la home',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Equipos instalados',
          fields: [
            {
              name: 'equipos',
              type: 'array',
              labels: { singular: 'Equipo', plural: 'Equipos' },
              admin: {
                description:
                  'Un ítem por equipo instalado en la obra. La mayoría de las obras tiene uno solo; algunas (ej. baterías de ascensores) tienen más de uno.',
              },
              fields: [
                {
                  name: 'resumen',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Ej: "Instalación de un ascensor" / "Instalación de dos ascensores en batería"',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'paradas', type: 'number', admin: { width: '33%' } },
                    { name: 'cargaUtilKg', type: 'number', label: 'Carga útil (kg)', admin: { width: '33%' } },
                    { name: 'velocidadMpm', type: 'number', label: 'Velocidad (mpm)', admin: { width: '33%' } },
                  ],
                },
                {
                  name: 'detalle',
                  type: 'textarea',
                  admin: {
                    description:
                      'Texto libre: relación de transmisión, tipo de cabina, terminación (acero inoxidable, epoxi), etc.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Multimedia',
          fields: [
            {
              name: 'galeria',
              type: 'array',
              labels: { singular: 'Foto', plural: 'Fotos' },
              fields: [
                {
                  name: 'imagen',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Notas internas',
          fields: [
            {
              name: 'observaciones',
              type: 'textarea',
              admin: {
                description: 'Notas internas. No se muestran en el sitio público.',
              },
            },
          ],
        },
      ],
    },
  ],
}
