import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const alt = 'PEpL — No gritamos, acompañamos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  const logoPath = path.join(process.cwd(), 'public/brand/logo-wordmark-energia.png');
  const logoData = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #FF1493 0%, #F58634 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="PEpL" style={{ height: 64, width: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
            No gritamos,
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
            acompañamos.
          </div>
          <div style={{ fontSize: 28, opacity: 0.9, marginTop: 12 }}>
            Publicidad emocional por logro
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
