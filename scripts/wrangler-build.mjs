import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { PRODUCTION_DOMAIN, resolveProductionSiteUrl } from './site-origin.mjs';

const toml = readFileSync(new URL('../wrangler.toml', import.meta.url), 'utf8');
const nameMatch = toml.match(/^name\s*=\s*"([^"]+)"/m);
console.log(`wrangler-build: wrangler.toml name=${nameMatch?.[1] ?? '?'}`);

process.env.PUBLIC_SITE_URL = resolveProductionSiteUrl(process.env);
process.env.PUBLIC_SITE_DOMAIN = process.env.PUBLIC_SITE_DOMAIN?.trim() || PRODUCTION_DOMAIN;

execSync('npm run build', { stdio: 'inherit', env: process.env, shell: true });
