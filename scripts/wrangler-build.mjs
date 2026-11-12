import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { detachAionCheatsDomains } from './detach-worker-domains.mjs';
import { PRODUCTION_DOMAIN, resolveProductionSiteUrl } from './site-origin.mjs';

if (process.env.WRANGLER_SKIP_BUILD === '1') {
  console.log('wrangler-build: skip npm build (dist already prepared); detaching domains…');
  await detachAionCheatsDomains();
  process.exit(0);
}

const toml = readFileSync(new URL('../wrangler.toml', import.meta.url), 'utf8');
const nameMatch = toml.match(/^name\s*=\s*"([^"]+)"/m);
console.log(`wrangler-build: ci-publish v3 name=${nameMatch?.[1] ?? '?'}`);

process.env.PUBLIC_SITE_URL = resolveProductionSiteUrl(process.env);
process.env.PUBLIC_SITE_DOMAIN = process.env.PUBLIC_SITE_DOMAIN?.trim() || PRODUCTION_DOMAIN;

console.log('wrangler-build: detaching worker domains (pre-build)…');
await detachAionCheatsDomains();

execSync('npm run build', { stdio: 'inherit', env: process.env, shell: true });

console.log('wrangler-build: detaching worker custom domains before upload…');
await detachAionCheatsDomains();
