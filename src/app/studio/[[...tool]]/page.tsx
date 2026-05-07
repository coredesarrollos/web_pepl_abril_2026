/**
 * Studio embebido. Se renderiza solo cuando hay projectId configurado.
 * La ruta `/studio` está protegida por la cookie `pepl_pitch` (middleware).
 */
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export const dynamic = 'force-static';

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{ padding: 32, fontFamily: 'system-ui' }}>
        <h1>Studio no configurado</h1>
        <p>
          Definí <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> en las variables de entorno para
          habilitar Sanity Studio.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
