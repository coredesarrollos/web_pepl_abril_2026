/* eslint-disable no-console */
/**
 * Extracts every page of the brand PDF into PNGs under `brand/pages/`.
 * Uses pdfjs-dist + @napi-rs/canvas (no system deps required on Windows).
 *
 * Run: pnpm brand:extract
 */
import { mkdir, readFile, writeFile, readdir, unlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createCanvas } from '@napi-rs/canvas';
// pdfjs legacy build is the cjs-friendly one
// @ts-ignore — no types for legacy build
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const ROOT = resolve(process.cwd());
const SRC = join(ROOT, 'brand', 'source', 'BRAND PRESENTACION PEpL 2.pdf');
const OUT = join(ROOT, 'brand', 'pages');
const SCALE = 2; // 2x for crisp analysis

async function clean(dir: string) {
  try {
    const files = await readdir(dir);
    await Promise.all(files.filter(f => f.endsWith('.png')).map(f => unlink(join(dir, f))));
  } catch {
    /* ignore */
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await clean(OUT);

  const data = new Uint8Array(await readFile(SRC));
  const doc = await pdfjs.getDocument({
    data,
    disableFontFace: true,
    useSystemFonts: false,
  }).promise;

  console.log(`PDF loaded: ${doc.numPages} pages`);

  let ok = 0;
  const failed: number[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    try {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: SCALE });
      const canvas = createCanvas(viewport.width, viewport.height);
      const ctx = canvas.getContext('2d');
      await page.render({
        // @ts-expect-error pdfjs typing mismatch with napi canvas
        canvasContext: ctx,
        viewport,
      }).promise;

      const buf = canvas.toBuffer('image/png');
      const name = `page-${String(i).padStart(2, '0')}.png`;
      await writeFile(join(OUT, name), buf);
      console.log(`  ✓ ${name} (${viewport.width}x${viewport.height})`);
      ok++;
    } catch (err) {
      failed.push(i);
      console.warn(`  ✗ page ${i} failed:`, err instanceof Error ? err.message : err);
    }
  }

  console.log(`\nDone. ${ok}/${doc.numPages} pages → brand/pages/`);
  if (failed.length) {
    console.warn(`Failed pages (mockups, probably): ${failed.join(', ')}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
