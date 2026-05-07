import { defineField, defineType } from 'sanity';
import { THEMES } from '../../src/lib/themes';

export const siteTheme = defineType({
  name: 'siteTheme',
  title: 'Tema oficial del sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: 'Tema activo',
      type: 'string',
      options: {
        list: THEMES.map((t) => ({ title: `${t.name} (${t.id})`, value: t.id })),
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'scheduledFor',
      title: 'Programar cambio (opcional, UTC)',
      type: 'datetime',
    }),
    defineField({
      name: 'updatedBy',
      title: 'Cambiado por',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: { active: 'active' },
    prepare: ({ active }) => ({ title: `Tema oficial: ${active ?? '—'}` }),
  },
});
