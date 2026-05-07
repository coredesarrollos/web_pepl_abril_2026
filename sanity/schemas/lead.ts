import { defineField, defineType } from 'sanity';

export const lead = defineType({
  name: 'lead',
  title: 'Leads',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({ name: 'company', title: 'Compañía', type: 'string' }),
    defineField({ name: 'message', title: 'Mensaje', type: 'text', rows: 4 }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: { list: ['es', 'en'] },
    }),
    defineField({
      name: 'source',
      title: 'Fuente',
      type: 'string',
      initialValue: 'web-landing',
    }),
    defineField({ name: 'ip', title: 'IP (hash)', type: 'string', readOnly: true }),
    defineField({
      name: 'createdAt',
      title: 'Creado',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Más reciente',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email' },
  },
});
