import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const onCloudflareBuilder =
  (process.env.HOME || '').startsWith('/opt/buildhome') ||
  ['true', '1'].includes(String(process.env.CI).toLowerCase()) ||
  String(process.env.CF_BUILD).toLowerCase() === '1';

if (!onCloudflareBuilder) {
  console.log('install-wrangler-ci-shim: local install — wrangler CLI unchanged');
  process.exit(0);
}

if (process.platform === 'win32') {
  console.log('install-wrangler-ci-shim: Windows CI — skip');
  process.exit(0);
}

const binDir = path.join(repoRoot, 'node_modules', 'wrangler', 'bin');
const entry = path.join(binDir, 'wrangler.js');
const backup = path.join(binDir, 'wrangler.real.js');

if (!fs.existsSync(entry)) {
  console.warn('install-wrangler-ci-shim: wrangler.js not found — skip');
  process.exit(0);
}

if (!fs.existsSync(backup)) {
  fs.renameSync(entry, backup);
}

const wrapper = `#!/usr/bin/env node
/**
 * Cloudflare CI only — installed by scripts/install-wrangler-ci-shim.mjs
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const args = process.argv.slice(2);
const onCf = (process.env.HOME || '').startsWith('/opt/buildhome');

if (onCf && args[0] === 'deploy') {
  console.log('wrangler (CI patch): deploy → scripts/wrangler-deploy-cf.mjs');
  const child = spawnSync(process.execPath, [path.join(root, 'scripts', 'wrangler-deploy-cf.mjs')], {
    stdio: 'inherit',
    cwd: root,
    env: process.env,
  });
  process.exit(child.status ?? 0);
}

const child = spawnSync(process.execPath, [path.join(here, 'wrangler.real.js'), ...args], {
  stdio: 'inherit',
  cwd: root,
  env: process.env,
});
process.exit(child.status ?? 1);
`;

fs.writeFileSync(entry, wrapper, { mode: 0o755 });

console.log('install-wrangler-ci-shim: patched wrangler/bin/wrangler.js (npx wrangler deploy → wrangler-deploy-cf)');
