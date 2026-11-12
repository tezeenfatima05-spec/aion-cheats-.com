import { spawnSync } from 'node:child_process';
import { PRODUCTION_DOMAIN, PRODUCTION_ORIGIN } from './site-origin.mjs';

function resolveApiToken() {
  const fromEnv =
    process.env.CLOUDFLARE_API_TOKEN ||
    process.env.CF_API_TOKEN ||
    process.env.TTP_CF_API_TOKEN;
  if (fromEnv?.trim()) return fromEnv.trim();
  const out = spawnSync('npx wrangler auth token', { encoding: 'utf8', shell: true });
  const tok = (out.stdout ?? '').trim();
  return tok.length > 10 ? tok : null;
}

/** @param {string} token */
async function zoneIdForDomain(token) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(PRODUCTION_DOMAIN)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) return null;
  const body = await res.json();
  return body.result?.[0]?.id ?? null;
}

export async function purgeSitemapAndRobots() {
  const token = resolveApiToken();
  if (!token) {
    console.warn('purge-cf-cache: no API token — skip (purge sitemap manually in dashboard)');
    return;
  }

  const zoneId = process.env.CLOUDFLARE_ZONE_ID?.trim() || (await zoneIdForDomain(token));
  if (!zoneId) {
    console.warn('purge-cf-cache: zone id not found — skip');
    return;
  }

  const files = [
    `${PRODUCTION_ORIGIN}/sitemap.xml`,
    `${PRODUCTION_ORIGIN}/robots.txt`,
  ];

  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files }),
  });

  console.log(`purge-cf-cache: ${files.join(', ')} → HTTP ${res.status}`);
}
