import { execSync } from 'node:child_process';
import { PRODUCTION_DOMAIN, resolveProductionSiteUrl } from './site-origin.mjs';

process.env.PUBLIC_SITE_URL = resolveProductionSiteUrl(process.env);
process.env.PUBLIC_SITE_DOMAIN = process.env.PUBLIC_SITE_DOMAIN?.trim() || PRODUCTION_DOMAIN;
execSync('npm run build', { stdio: 'inherit', env: process.env, shell: true });
