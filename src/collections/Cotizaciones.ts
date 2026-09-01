import type { CollectionConfig } from 'payload'
import { BUILDING_TYPE_OPTIONS } from '../lib/buildingTypes.ts'

export const Cotizaciones: CollectionConfig = {
  slug: 'cotizaciones',
  labels: {
    singular: 'Cotización',
    plural: 'Cotizaciones',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'empresa', 'tipoProyecto', 'createdAt'],
    group: 'Leads',
    description:
      'Solicitudes de cotización enviadas desde /contacto. No generan ninguna notificación automática todavía — hay que revisar esta sección a mano.',
  },
  access: {
    // Formulario público: cualquiera puede crear una solicitud.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'nombre', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'empresa', type: 'text', label: 'Empresa / Estudio', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rol',
          type: 'select',
          admin: { width: '50%' },
          options: [
            { label: 'Constructora', value: 'constructora' },
            { label: 'Arquitecto/a', value: 'arquitecto' },
            { label: 'Desarrollador/a', value: 'desarrollador' },
            { label: 'Particular', value: 'particular' },
            { label: 'Otro', value: 'otro' },
          ],
        },
        { name: 'tipoProyecto', type: 'select', label: 'Tipo de proyecto', admin: { width: '50%' }, options: [...BUILDING_TYPE_OPTIONS] },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
        { name: 'telefono', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'ubicacion', type: 'text', label: 'Ubicación de la obra' },
    {
      type: 'row',
      fields: [
        { name: 'cantidadPisos', type: 'number', label: 'Cantidad de pisos', admin: { width: '33%' } },
        { name: 'cantidadAscensores', type: 'number', label: 'Cantidad de ascensores', admin: { width: '33%' } },
        {
          name: 'etapaObra',
          type: 'select',
          label: 'Etapa de la obra',
          admin: { width: '33%' },
          options: [
            { label: 'Anteproyecto', value: 'anteproyecto' },
            { label: 'Proyecto ejecutivo', value: 'proyecto-ejecutivo' },
            { label: 'Obra en curso', value: 'obra-en-curso' },
          ],
        },
      ],
    },
    { name: 'plazoEstimado', type: 'text', label: 'Plazo estimado de necesidad' },
    { name: 'comentarios', type: 'textarea' },
  ],
}
