import { execSync } from 'node:child_process';

/** Custom domain is canonical; ignore workers.dev in CI env vars. */
const PRODUCTION_ORIGIN = 'https://aion-cheats.com';
const raw = process.env.PUBLIC_SITE_URL?.trim();
const siteUrl =
  raw && !raw.includes('workers.dev') ? raw.replace(/\/$/, '') : PRODUCTION_ORIGIN;

process.env.PUBLIC_SITE_URL = siteUrl;
process.env.PUBLIC_SITE_DOMAIN = process.env.PUBLIC_SITE_DOMAIN?.trim() || 'aion-cheats.com';
execSync('npm run build', { stdio: 'inherit', env: process.env, shell: true });
