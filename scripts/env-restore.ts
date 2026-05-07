/**
 * env-restore.ts — Decrypt a previously created backup with age.
 *
 * Usage:
 *   pnpm env:restore .backups/env-production-2026-04-29T12-00-00-000Z.env.age
 *
 * Outputs decrypted content to stdout (so you can pipe into a file or
 * `vercel env add` programmatically). Does NOT auto-push to Vercel.
 *
 * Requires:
 *   - `age` CLI in PATH
 *   - `AGE_IDENTITY_FILE` env var pointing at the age private-key file
 *     (or pass --identity <path> as the second argv).
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function fail(msg: string): never {
  console.error(`[env-restore] ${msg}`);
  process.exit(1);
}

const file = process.argv[2];
if (!file) fail('Usage: pnpm env:restore <path-to-.env.age>');
if (!existsSync(file!)) fail(`File not found: ${file}`);

const identity =
  (process.argv[3] && process.argv[3] !== '--identity'
    ? process.argv[3]
    : process.argv[4]) ?? process.env.AGE_IDENTITY_FILE;

if (!identity) fail('AGE_IDENTITY_FILE env var or 2nd arg required');
if (!existsSync(identity)) fail(`Identity file not found: ${identity}`);

const r = spawnSync('age', ['--decrypt', '--identity', identity, file!], {
  stdio: ['inherit', 'inherit', 'inherit'],
  shell: true,
});
process.exit(r.status ?? 1);
