'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-04-29';

export default defineConfig({
  name: 'pepl-studio',
  title: 'PEpL Studio',
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Tema oficial')
              .child(
                S.editor()
                  .schemaType('siteTheme')
                  .documentId('siteTheme')
                  .title('Tema oficial del sitio')
              ),
            S.divider(),
            S.documentTypeListItem('lead').title('Leads'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
