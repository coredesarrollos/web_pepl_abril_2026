# Copilot instructions — PEpL Web Rebrand 2026

> Versión condensada de `AGENTS.md`. Lee también ese archivo para reglas completas.

## Stack
- Next.js 15 App Router · React 19 · TypeScript estricto · pnpm 9 · Node 20.
- Tailwind v4 con CSS vars (`@theme`). NO instalar `tailwindcss@3`.
- Framer Motion vía presets de `src/lib/motion.ts`. NO usar `transition` ad-hoc.
- next-intl para ES/EN. Cero strings hardcodeadas en JSX.
- Sanity CMS (`/studio`). Resend (email). Upstash (rate-limit). Sentry (errors).

## Reglas vinculantes
1. **Colores y servicios desde `src/lib/themes.ts` y `src/lib/services.ts`.**
   Nunca hex hardcodeado. Nunca copy de servicios duplicado.
2. **Animaciones desde `src/lib/motion.ts`** (`fadeUp`, `stagger`, `parallax`,
   `magnetic`). Wrap con `<Reveal>`.
3. **Validación server-side con Zod** en TODA route handler.
4. **Strings en `messages/{es,en}.json`**. Acceder con `useTranslations`.
5. **Componentes ≤ 200 líneas**. Si crece, partir.
6. **Tests por feature**: nuevo componente con interacción → spec Playwright;
   nueva util → test Vitest.
7. **Secretos solo en env vars de Vercel / GH Actions**. `.env.local`
   ignorado. Nunca pegar tokens en código o issues.

## Convenciones
- Componentes: `PascalCase.tsx`. Hooks: `use-kebab-case.ts`. Utils: `kebab-case.ts`.
- Imports absolutos con `@/*` desde `src/`.
- Server components por defecto. `'use client'` solo cuando hace falta
  estado/efectos/event handlers.
- Tipos compartidos en `src/lib/types.ts`. Schemas Zod junto al endpoint.

## Patrones canónicos

### Componente de sección
```tsx
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  return (
    <Section id="inicio" tone="hero">
      <Reveal as="h1" preset="fadeUp">{t('title')}</Reveal>
    </Section>
  );
}
```

### Tokens en CSS
```css
.card {
  background: var(--color-surface);
  color: var(--color-fg);
  border-radius: var(--radius-md);
}
```

### Endpoint
```ts
import { z } from 'zod';
import { NextResponse } from 'next/server';
const Body = z.object({ email: z.string().email() });
export async function POST(req: Request) {
  const data = Body.safeParse(await req.json());
  if (!data.success) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  return NextResponse.json({ ok: true });
}
```

## Comandos
`pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` ·
`pnpm test` · `pnpm test:e2e` · `pnpm brand:extract` ·
`pnpm env:backup` · `pnpm env:restore <ts>`.

## Prohibido
- Hex hardcodeado, copy de servicios duplicado, strings en JSX sin i18n.
- `--no-verify`, `git push --force`, `rm -rf` fuera de build.
- Instalar deps no aprobadas (>50KB sin justificar).
- Comentarios decorativos / docstrings agregados a código no modificado.
- Respuestas largas: confirmar en 1-3 líneas.
