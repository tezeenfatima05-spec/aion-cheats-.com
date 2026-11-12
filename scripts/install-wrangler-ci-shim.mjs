import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isCI =
  ['true', '1'].includes(String(process.env.CI).toLowerCase()) ||
  String(process.env.CF_PAGES).toLowerCase() === '1' ||
  String(process.env.WORKERS_CI).toLowerCase() === '1' ||
  String(process.env.CF_BUILD).toLowerCase() === '1' ||
  (process.env.HOME || '').startsWith('/opt/buildhome');

if (!isCI) {
  console.log('install-wrangler-ci-shim: local install — wrangler CLI unchanged');
  process.exit(0);
}

if (process.platform === 'win32') {
  console.log('install-wrangler-ci-shim: Windows CI — skip .bin patch');
  process.exit(0);
}

const binWrangler = path.join(repoRoot, 'node_modules', '.bin', 'wrangler');
const shimRel = path.relative(path.dirname(binWrangler), path.join(repoRoot, 'scripts', 'wrangler-cli-shim.mjs')).replace(/\\/g, '/');

const launcher = `#!/usr/bin/env node
import '${shimRel}';
`;

try {
  fs.writeFileSync(binWrangler, launcher, { mode: 0o755 });
  console.log('install-wrangler-ci-shim: patched node_modules/.bin/wrangler (npx wrangler deploy → wrangler-deploy-cf)');
} catch (err) {
  console.warn(`install-wrangler-ci-shim: could not patch .bin/wrangler — ${err.message}`);
}
