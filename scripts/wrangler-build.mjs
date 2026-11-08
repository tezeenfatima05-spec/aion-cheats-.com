import { execSync } from 'node:child_process';

const siteUrl =
  process.env.PUBLIC_SITE_URL?.trim() ||
  'https://aion-cheats--com.tazeenrooziroti.workers.dev';

process.env.PUBLIC_SITE_URL = siteUrl;
execSync('npm run build', { stdio: 'inherit', env: process.env, shell: true });
