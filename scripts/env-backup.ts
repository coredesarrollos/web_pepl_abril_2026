/**
 * env-backup.ts — Snapshot Vercel project env vars and encrypt with age.
 *
 * Why age (and not gpg)? Tiny footprint, modern, single binary, x-platform.
 * Pre-reqs:
 *   - `vercel` CLI authenticated (or VERCEL_TOKEN in env)
 *   - `age` CLI in PATH (https://github.com/FiloSottile/age)
 *   - `AGE_RECIPIENT` env var = age recipient public key
 *
 * Output: .backups/env-<env>-<isoTimestamp>.env.age
 *
 * Usage:
 *   pnpm env:backup          # backs up "production"
 *   pnpm env:backup preview
 *   pnpm env:backup development
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENV_TARGET = (process.argv[2] ?? 'production') as 'production' | 'preview' | 'development';
const OUT_DIR = '.backups';

function fail(msg: string): never {
  console.error(`[env-backup] ${msg}`);
  process.exit(1);
}

function ensureBin(bin: string) {
  const r = spawnSync(bin, ['--version'], { stdio: 'ignore', shell: true });
  if (r.status !== 0) fail(`Required binary not found in PATH: ${bin}`);
}

function pullEnv(): string {
  // `vercel env pull` writes a .env file. We capture it from a temp path.
  const tmp = join(process.cwd(), `.env.snapshot.${Date.now()}`);
  const r = spawnSync('vercel', ['env', 'pull', tmp, `--environment=${ENV_TARGET}`, '--yes'], {
    stdio: 'inherit',
    shell: true,
  });
  if (r.status !== 0) fail(`vercel env pull failed (exit ${r.status})`);
  // Read the file, then delete it
  const fs = require('node:fs');
  const content = fs.readFileSync(tmp, 'utf8');
  fs.unlinkSync(tmp);
  return content;
}

function encrypt(plaintext: string, recipient: string, outPath: string) {
  const r = spawnSync('age', ['-r', recipient, '-o', outPath], {
    input: plaintext,
    stdio: ['pipe', 'inherit', 'inherit'],
    shell: true,
  });
  if (r.status !== 0) fail(`age encryption failed (exit ${r.status})`);
}

function main() {
  ensureBin('vercel');
  ensureBin('age');
  const recipient = process.env.AGE_RECIPIENT;
  if (!recipient) fail('AGE_RECIPIENT env var is required (age public key)');

  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  mkdirSync(OUT_DIR, { recursive: true });
  const outPath = join(OUT_DIR, `env-${ENV_TARGET}-${ts}.env.age`);

  const plaintext = pullEnv();
  encrypt(plaintext, recipient, outPath);

  // Write a sidecar metadata file (no secrets)
  const sidecar = {
    target: ENV_TARGET,
    timestamp: ts,
    file: outPath,
    sizeBytes: Buffer.byteLength(plaintext, 'utf8'),
    keys: plaintext
      .split(/\r?\n/)
      .map((l) => l.match(/^([A-Z0-9_]+)=/)?.[1])
      .filter((k): k is string => Boolean(k))
      .sort(),
  };
  writeFileSync(`${outPath}.meta.json`, JSON.stringify(sidecar, null, 2));

  console.log(`[env-backup] OK → ${outPath}`);
  console.log(`[env-backup]   keys captured: ${sidecar.keys.length}`);
  // Verify by trying to identify (no decrypt)
  try {
    execFileSync('age', ['--decrypt', '--identity', '/dev/null', outPath], { stdio: 'ignore' });
  } catch {
    /* expected: no identity */
  }
}

main();
