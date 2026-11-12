/** Inlined so the Worker bundle never depends on build-time env. */
const PRODUCTION_ORIGIN = 'https://aion-cheats.com';
const WORKERS_DEV_HOST = /https:\/\/[^/\s"]+\.workers\.dev/gi;

/** @param {string} pathname */
function isSeoAsset(pathname) {
  const p = pathname.replace(/\/$/, '') || '/';
  return p === '/sitemap.xml' || p === '/robots.txt';
}

/** @param {Response} res */
async function normalizeSeoResponse(res, contentType) {
  let body = await res.text();
  if (body.includes('workers.dev')) {
    body = body.replace(WORKERS_DEV_HOST, PRODUCTION_ORIGIN);
  }
  return new Response(body, {
    status: res.status,
    headers: {
      'content-type': contentType,
      'cache-control': 'no-cache, no-store, must-revalidate',
    },
  });
}

/**
 * Preview hostnames should not be indexed; send crawlers to the custom domain.
 * Static HTML/XML is served from the ASSETS binding for aion-cheats.com.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.endsWith('.workers.dev')) {
      const target = new URL(`${url.pathname}${url.search}`, PRODUCTION_ORIGIN);
      return Response.redirect(target.href, 301);
    }

    const res = await env.ASSETS.fetch(request);
    if (!isSeoAsset(url.pathname) || !res.ok) return res;

    const type =
      url.pathname.includes('robots')
        ? 'text/plain; charset=utf-8'
        : res.headers.get('content-type') || 'application/xml; charset=utf-8';
    return normalizeSeoResponse(res, type);
  },
};
