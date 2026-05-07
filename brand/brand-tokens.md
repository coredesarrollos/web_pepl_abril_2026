# PEpL Brand Tokens

> Derivado del PDF `BRAND PRESENTACION PEpL 2.pdf` (18 páginas, agencia *brainer*, 2026).
> Páginas extraídas en `brand/pages/` (14 de 18 — el resto contienen mockups con
> imágenes embebidas que pdfjs+napi no procesa; ver TODO al final).

## Identidad

- **Nombre:** PEpL — *Publicidad emocional por logro*
- **Tagline / manifiesto:** “No gritamos, acompañamos.”
- **Logotipo:** wordmark `pepl` (lowercase, geométrica redondeada).
- **Isotipo:** la “e” como persona abrazando un círculo (logro). Versión
  reducida a la `e` con punto = persona.
- **Concepto visual rector:** *gradiente* — “PEpL no representa un estado,
  representa una transición”. Todo elemento clave usa gradiente; el destino
  siempre es el **Naranja** (color base del sistema = momento de validar el
  logro).

## Color base del sistema

**Naranja** — momento de validar el logro.
Conceptos: energía, reconocimiento, activación, acción, logro, avance,
resultado, ejecución, transformación.

`#F58634` (aprox)

## Variantes de gradiente (themes)

Cada variante representa un *concepto inicial* que evoluciona hacia el
naranja. Estos son los **4 temas oficiales** del switcher.

| ID | Nombre | Concepto | Inicio | Fin |
|----|--------|----------|--------|-----|
| `accion` | Tomar acción (Gradiente 1) | acción / impulso / decisión | **Rojo** `#E91E5A` | **Naranja** `#F58634` |
| `energia` | Energía interior (Gradiente 2) | identidad / intensidad / transformación | **Magenta** `#FF1493` | **Naranja** `#F58634` |
| `autoconocimiento` | Autoconocimiento (Gradiente 3) | conocimiento / estrategia / liderazgo | **Morado** `#3F1E9B` | **Naranja** `#F58634` |
| `estructura` | Estructura (Gradiente 4) | tecnología / sistema / control | **Cian** `#00B7E9` | **Naranja** `#F58634` |

El gradiente simboliza:
- paso del esfuerzo al logro
- transformación interna
- evolución emocional

> *La validación de un logro real en un momento emocional preciso.*

## Neutros

| Token | HEX | Uso |
|-------|-----|-----|
| `--ink` | `#0A0A0A` | fondo dark, tipografía display sobre claro |
| `--ink-soft` | `#1F2937` | body text sobre claro |
| `--paper` | `#F2EFE8` | fondo claro principal |
| `--paper-soft` | `#FFFFFF` | superficies elevadas claras |
| `--mute` | `#6B7280` | text secundario |
| `--line` | `#E5E7EB` | bordes sutiles |

## Tipografía

El PDF usa una sans-serif geométrica humanista (similar a Inter / Geist /
Söhne). Stack propuesto:

- **Display + Body:** [Inter](https://rsms.me/inter/) variable, con feature
  settings `cv11`, `ss01`. Fallback: `system-ui, -apple-system, Segoe UI,
  Roboto, sans-serif`.
- **Pesos:** 400 body, 500 ui, 700 display.
- **Tracking:** display `-0.02em`, body `-0.005em`.

## Geometría / radii / sombras

- Brand visual = **círculos y formas redondeadas** (mirar el isotipo). Por eso:
- `--radius-sm: 8px`, `--radius-md: 16px`, `--radius-lg: 24px`, `--radius-pill: 999px`.
- Sombras suaves, no duras: `--shadow-sm: 0 1px 2px rgba(0,0,0,.05)`,
  `--shadow-md: 0 8px 24px -8px rgba(0,0,0,.15)`,
  `--shadow-glow: 0 0 0 8px color-mix(in oklab, var(--accent) 25%, transparent)`.

## Tono visual

- Mucho aire, layouts editoriales (markers “| Branding | 2026 | brainer”).
- Fondos planos saturados (página 4 entera naranja).
- Tipografía grande, lower-case en marca, contraste alto.
- Modo dark y light coexisten en el deck (página 1 dark, mayoría light).

## Aplicación al sitio

- **Acento principal por tema:** `--accent` = color *de inicio* del gradiente
  del tema seleccionado.
- **Fondos hero / piezas explosivas:** `linear-gradient(120deg, var(--accent),
  var(--brand-anchor))` donde `--brand-anchor = #F58634`.
- **Logo en SVG**: pintado con `url(#peplGradient)` que apunta al gradiente
  activo → cambia con el tema.
- Modo dark: invertir `--paper` ↔ `--ink`, mantener acentos saturados.

## TODO

- [ ] Extraer páginas 15-18 (contienen mockups con imágenes embebidas).
  Workaround: convertir a PNG con `pdftoppm` (Poppler) si está disponible,
  o exportar desde el PDF con cualquier visor.
- [ ] Conseguir el logo PEpL en SVG vectorial (no rasterizado del PDF).
  Pedir al estudio *brainer* el archivo fuente.
- [ ] Definir favicons / OG image base.
