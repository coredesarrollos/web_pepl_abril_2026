# PEpL Web — Rebrand 2026 (Munich, 15 may)

> **No gritamos, acompañamos.**
> Sitio de marca + pitch interactivo. Next.js 15, React 19, Tailwind v4, next-intl,
> Framer Motion, Sanity, OWASP-first.

## Quickstart

```powershell
# Node 20 LTS + pnpm 9
nvm use            # lee .nvmrc
pnpm install
cp .env.example .env.local   # rellenar valores reales

pnpm dev           # http://localhost:3000  (ES por defecto, /en para inglés)
```

## Comandos

| Comando | Para qué sirve |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` / `pnpm start` | Build de producción |
| `pnpm lint` | ESLint + reglas Next |
| `pnpm typecheck` | TypeScript estricto, sin emit |
| `pnpm test` | Vitest (unit) |
| `pnpm test:e2e` | Playwright (Chromium + WebKit) |
| `pnpm test:a11y` | axe-core sobre `/` y `/en` |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm brand:extract` | Re-extrae el PDF de marca a `brand/pages/` |
| `pnpm env:backup [target]` | Snapshot cifrado (age) de env vars de Vercel |
| `pnpm env:restore <file.age>` | Descifra un snapshot a stdout |

## Reglas vinculantes (ver `AGENTS.md`)

1. Colores y servicios desde `src/lib/themes.ts` y `src/lib/services.ts`. **Nada de hex hardcodeado**.
2. Animaciones desde `src/lib/motion.ts` (`fadeUp`, `stagger`, `magnetic`...). Wrap con `<Reveal>`.
3. Validación server-side con **Zod** en TODA route handler.
4. Strings en `messages/{es,en}.json`, accedidos con `useTranslations`.
5. Componentes ≤ 200 líneas.
6. Tests por feature: nuevo componente con interacción → `tests/e2e`; nueva util → `tests/unit`.
7. **Secretos solo en env vars de Vercel/GH Actions**. `.env.local` ignorado.

## Cambiar entre los 4 gradientes oficiales

Hay 4 themes (ver `brand/brand-tokens.md`):

| ID | Inicio | Fin | Concepto |
|---|---|---|---|
| `accion` | `#E91E5A` rojo | `#F58634` naranja | acción / impulso / decisión |
| `energia` | `#FF1493` magenta | `#F58634` naranja | identidad / intensidad / transformación |
| `autoconocimiento` | `#3F1E9B` morado | `#F58634` naranja | conocimiento / estrategia / liderazgo |
| `estructura` | `#00B7E9` cian | `#F58634` naranja | tecnología / sistema / control |

El equipo elige cuál sale a producción desde `/theme-lab` (ruta protegida por
cookie `pepl_pitch` = `PITCH_ACCESS_TOKEN`). El switcher del header es público y
vive en una cookie del usuario; el “oficial” se persiste en Sanity (TODO).

## Seguridad (OWASP-first)

- CSP por request con nonce (ver `src/middleware.ts`).
- HSTS, X-Frame-Options DENY, X-Content-Type-Options, Permissions-Policy, Referrer-Policy.
- Form lead: Zod, honeypot, Cloudflare Turnstile, Upstash rate-limit (5/h por IP).
- gitleaks en CI; secretos solo en Vercel/GH Actions.
- ZAP baseline semanal (`.github/workflows/zap-baseline.yml`).
- Backups cifrados de env vars con `age` antes de cada deploy a producción.

## Estructura

```
src/
  app/
    layout.tsx                  # raíz (metadata + viewport)
    [locale]/
      layout.tsx                # i18n + ThemeProvider
      page.tsx                  # landing
      theme-lab/page.tsx        # /theme-lab (gated)
    api/lead/route.ts           # POST formulario, Zod + ratelimit + turnstile
  components/
    brand/Logo.tsx              # SVG con gradiente activo
    layout/{SiteHeader,SiteFooter,LocaleSwitcher}.tsx
    sections/{Hero,Manifesto,HowItWorks,Audiences,ValueStats,CtaBlock}.tsx
    theme/{ThemeProvider,ThemeSwitcher}.tsx
    ui/{Section,Reveal,Button}.tsx
    forms/LeadForm.tsx
  i18n/{routing,request,navigation}.ts
  lib/{themes,services,motion,cn,ratelimit,turnstile}.ts
  lib/schemas/lead.ts
  middleware.ts                 # CSP por request + gates
messages/{es,en}.json
brand/{brand-tokens.md,palettes.json,pages/}
scripts/{brand-extract,env-backup,env-restore}.ts
tests/{unit,e2e,a11y}/
.github/workflows/{ci,zap-baseline,pre-prod-deploy}.yml
```

## Estado del rebrand

- [x] Extracción del PDF de marca → `brand/pages/` (14/18; faltan 4 con mockups)
- [x] Brand tokens + paleta canónica (`brand/brand-tokens.md`, `brand/palettes.json`)
- [x] Stack base: Next 15 + React 19 + Tailwind v4 + next-intl ES/EN
- [x] 4 themes oficiales conmutables en vivo (`/theme-lab` + header switcher)
- [x] Landing con secciones canónicas y animación con presets
- [x] Endpoint `/api/lead` con Zod + ratelimit + Turnstile + honeypot
- [x] CSP por request + headers de seguridad
- [x] Workflows CI (lint/type/test/build/e2e/secrets) + ZAP baseline + pre-prod-deploy con backup cifrado
- [ ] Recibir SVG vectorial oficial del logo (estudio brainer)
- [ ] Conectar a Sanity (schemas + cliente)
- [ ] Conectar a Resend (lead → email)
- [ ] Embeds e ingestión de redes sociales
- [ ] Lighthouse CI + Sentry
```
