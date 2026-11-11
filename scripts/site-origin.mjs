/** Canonical origin for production SEO (sitemap, canonical, robots). */
export const PRODUCTION_DOMAIN = 'aion-cheats.com';
export const PRODUCTION_ORIGIN = `https://${PRODUCTION_DOMAIN}`;

/** Ignore workers.dev preview URLs in CI — custom domain is canonical. */
export function resolveProductionSiteUrl(env = process.env) {
  const domain = (env.PUBLIC_SITE_DOMAIN || PRODUCTION_DOMAIN).trim();
  const raw = env.PUBLIC_SITE_URL?.trim();
  if (raw && !raw.includes('workers.dev')) return raw.replace(/\/$/, '');
  return `https://${domain}`;
}
