import { execSync } from 'node:child_process';

/** Production GSC + canonicals must match the live custom domain, not workers.dev */
const siteUrl =
  process.env.PUBLIC_SITE_URL?.trim() || 'https://aion-cheats.com';

process.env.PUBLIC_SITE_URL = siteUrl;
execSync('npm run build', { stdio: 'inherit', env: process.env, shell: true });
