/**
 * CI-only: `npx wrangler deploy` is redirected to wrangler-deploy-cf (see install-wrangler-ci-shim.mjs).
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);

function runRealWrangler() {
  const real = path.join(repoRoot, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  const child = spawnSync(process.execPath, [real, ...args], {
    stdio: 'inherit',
    cwd: repoRoot,
    env: process.env,
  });
  process.exit(child.status ?? 1);
}

if (args[0] === 'deploy') {
  console.log('wrangler-cli-shim: CI deploy → scripts/wrangler-deploy-cf.mjs');
  const child = spawnSync(process.execPath, [path.join(repoRoot, 'scripts', 'wrangler-deploy-cf.mjs')], {
    stdio: 'inherit',
    cwd: repoRoot,
    env: process.env,
  });
  process.exit(child.status ?? 0);
}

runRealWrangler();
