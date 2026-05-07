# AGENTS.md — PEpL Web Rebrand 2026

> **Lectura obligatoria** para cualquier IA o desarrollador antes de tocar este repo.
> Si esta guía y otra fuente entran en conflicto, **gana esta guía**.

## 1. Misión

Rebrandear https://www.pepl.app/ para presentación en **Munich, 15 mayo 2026**.
Calidad de pitch a inversores: visualmente moderno y "explosivo", performante,
seguro, accesible, bilingüe ES/EN, con theme switcher en vivo basado en el
PDF de brand (`BRAND PRESENTACION PEpL 2.pdf`).

## 2. Stack pinneado (no cambiar sin discusión)

- Node 20 LTS · pnpm 9.15
- Next.js 15 (App Router) · React 19 · TypeScript estricto
- Tailwind v4 (CSS vars + `@theme`)
- Framer Motion (presets centralizados en `lib/motion.ts`)
- Sanity CMS (Studio embebido en `/studio`)
- next-intl (i18n ES/EN)
- Resend (email transaccional)
- Upstash Redis + `@upstash/ratelimit`
- Cloudflare Turnstile (anti-bot)
- Sentry (errors + perf)
- Vercel (hosting + cron + env vars)
- Vitest (unit) · Playwright (e2e) · axe-core (a11y) · Lighthouse CI

## 3. Reglas de oro

1. **Servicios y colores SIEMPRE desde `lib/themes.ts` y `lib/services.ts`.**
   Prohibido hardcodear hex, fonts, copy de servicios o nombres de audiencias.
2. **Animaciones SIEMPRE vía `lib/motion.ts` y `<Reveal>`.** Mantiene timing,
   easing y stagger consistentes → fluidez uniforme.
3. **Diseño guiado por el brand PDF.** Antes de cualquier UI, leer
   `brand/brand-tokens.md`. Si no existe, ejecutar `pnpm brand:extract`.
4. **i18n día 1.** Toda string visible vive en `messages/{es,en}.json`.
   Cero strings en JSX.
5. **Validación server-side con Zod** en TODOS los endpoints. La validación
   client-side es UX, no seguridad.
6. **Secretos**: cero en código, cero en `.env` commiteado. Solo Vercel env
   vars o GitHub Actions secrets. `.env.local` ignorado por git.
7. **Componentes**: máximo 200 líneas. Si crece, partir.
8. **Tests por feature**: cada PR de feature trae al menos un test (unit o
   e2e). CI bloquea merge sin tests verdes.

## 4. Reglas de ahorro de tokens (para agentes IA)

1. **Leer una sola vez**: cachear hallazgos del repo en `/memories/repo/`
   apenas se descubren. No re-explorar lo conocido.
2. **Lecturas grandes > muchas chicas**: un `read_file` con rango amplio
   antes que 5 lecturas pequeñas.
3. **Búsquedas paralelas independientes** en un solo turno (`grep_search`
   y `file_search` agrupados).
4. **Subagente Explore** para investigaciones largas; no contaminar el
   hilo principal con cadenas de búsqueda.
5. **Plan vivo en `/memories/session/plan.md`**: consultar antes de
   re-derivar contexto.
6. **Confirmaciones cortas**: 1-3 líneas. No re-explicar lo hecho.
7. **No agregar comentarios decorativos** ni docstrings al código que
   no se modificó.
8. **Snippets canónicos** (sección 9 de este archivo): reutilizar, no
   reinventar.
9. **Respuestas en código, no en prosa**: cuando el usuario pide algo
   implementable, implementarlo. Sin propuestas largas previas.
10. **Tests autónomos en CI** evitan ciclos largos de "implementá → corré
    → leé output → fix" en el chat.

## 5. Estructura del repo

```
.
├── AGENTS.md                       ← este archivo
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/                  ← CI (lint, test, zap, lighthouse, backup)
├── brand/
│   ├── pages/                      ← PNGs extraídos del PDF
│   ├── brand-tokens.md             ← análisis del PDF
│   └── palettes.json               ← variantes de tema
├── docs/
│   ├── runbook.md                  ← deploy, rollback, restore env
│   ├── security.md                 ← rotación de tokens, contactos
│   └── social-setup.md
├── messages/{es,en}.json           ← i18n
├── public/brand/                   ← logos SVG, favicon
├── sanity/schemas/
├── scripts/
│   ├── brand-extract.ts
│   ├── env-backup.ts
│   └── env-restore.ts
├── src/
│   ├── app/[locale]/
│   │   ├── page.tsx
│   │   ├── theme-lab/page.tsx      ← oculto, gated
│   │   ├── studio/[[...tool]]/page.tsx
│   │   └── pitch/page.tsx          ← password-protected
│   ├── app/api/
│   │   ├── lead/route.ts
│   │   ├── revalidate/route.ts
│   │   └── cron/social-publish/route.ts
│   ├── components/
│   │   ├── ui/                     ← Reveal, Section, Tabs, ...
│   │   ├── sections/               ← Hero, Problem, ...
│   │   ├── layout/
│   │   └── brand/
│   ├── lib/
│   │   ├── themes.ts               ← variantes de tema (única fuente)
│   │   ├── services.ts             ← audiencias/servicios (única fuente)
│   │   ├── motion.ts               ← presets Framer Motion
│   │   ├── sanity.ts
│   │   ├── ratelimit.ts
│   │   └── social/{instagram,linkedin,tiktok,youtube}.ts
│   ├── middleware.ts
│   └── theme/ThemeProvider.tsx
├── tests/
│   ├── unit/
│   └── e2e/
├── next.config.ts                  ← security headers, CSP
├── package.json
└── tsconfig.json
```

## 6. Comandos canónicos

```bash
pnpm dev               # dev server :3000
pnpm build             # build prod
pnpm start             # serve build
pnpm lint              # eslint
pnpm typecheck         # tsc --noEmit
pnpm test              # vitest (unit)
pnpm test:e2e          # playwright
pnpm test:a11y         # axe-core sobre rutas clave
pnpm brand:extract     # PDF → PNG + análisis
pnpm env:backup        # backup encriptado de env vars
pnpm env:restore <ts>  # restaurar backup
pnpm sanity:dev        # studio local
```

## 7. Flujo de trabajo

1. Branch desde `main`: `feat/<scope>` o `fix/<scope>`.
2. Implementar con tests.
3. Commit conventional: `feat: ...`, `fix: ...`, `chore: ...`.
4. Push → PR → CI debe pasar (todos los gates de sección 8).
5. Review → merge a `main` (squash).
6. Vercel preview deploy automático.
7. Promote a prod **manual** desde Vercel UI; requiere job `pre-prod-deploy`
   verde (que incluye backup de env vars).

**Prohibido:**
- `--no-verify` en commits.
- `git push --force` a `main`.
- Mergear sin CI verde.
- `rm -rf` fuera de `node_modules` / `.next`.
- Instalar deps no aprobadas (>50KB sin justificar en PR).
- Commitear `.env*` excepto `.env.example`.

## 8. Gates de CI (obligatorios para merge y deploy)

| Gate | Comando | Falla si |
|------|---------|----------|
| Lint | `pnpm lint` | warnings o errors |
| Types | `pnpm typecheck` | cualquier error |
| Unit | `pnpm test --run` | algún test falla o cobertura < 70% |
| E2E | `pnpm test:e2e` | algún spec falla |
| A11y | `pnpm test:a11y` | violación AA |
| Lighthouse CI | `lhci autorun` | perf/seo/a11y/best-practices < 95 |
| Secret scan | `gitleaks detect` | hallazgos |
| Audit | `pnpm audit --audit-level=high` | high/critical |
| ZAP baseline | GH Action ZAP | warnings nuevos |

**Pre-prod adicional:**
- `pnpm env:backup` debe completar (artefacto encriptado generado).
- securityheaders.com → A+ (manual antes de Munich).
- SSL Labs → A+ (manual antes de Munich).

## 9. Snippets canónicos (copiar, no reinventar)

### Sección con animación de revelado
```tsx
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export function MySection() {
  return (
    <Section id="problema" tone="surface">
      <Reveal as="h2" preset="fadeUp">Título</Reveal>
      <Reveal preset="fadeUp" delay={0.1}>
        <p>Contenido</p>
      </Reveal>
    </Section>
  );
}
```

### Endpoint API con Zod + rate-limit
```ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ratelimit } from '@/lib/ratelimit';

const Body = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { success } = await ratelimit.limit(`lead:${ip}`);
  if (!success) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  // ... lógica
  return NextResponse.json({ ok: true });
}
```

### Acceso a tokens del tema en CSS
```css
.card {
  background: var(--color-surface);
  color: var(--color-fg);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
}
```

## 10. Respuestas a preguntas comunes

- **¿Dónde agrego un servicio nuevo?** → `src/lib/services.ts`. Copy en
  `messages/*.json`. Aparece automáticamente en la sección "Para quién".
- **¿Cómo agrego una variante de tema?** → `src/lib/themes.ts` (objeto en el
  array). Disponible en `/theme-lab` automáticamente.
- **¿Dónde cambio el tema oficial servido a usuarios?** → Sanity Studio →
  `siteTheme` singleton. Cambio aplicado en <30s vía revalidate webhook.
- **¿Cómo despliego a prod?** → Merge a `main` → Vercel preview → revisar →
  Vercel UI "Promote to Production" (bloqueado hasta backup verde).
- **Encontré un secreto leak**: revocar inmediato (Vercel/GitHub/Sanity) →
  rotar → seguir `docs/security.md`.

## 11. Contactos y custodia

- Repo: `coredesarrollos/web_pepl_abril_2026`.
- Email PEpL: `pepl.marketplace@gmail.com`.
- Custodia de keys (`age` para backups, tokens prod): documentar en
  `docs/security.md` (1 admin + 1 backup en password manager del equipo).
