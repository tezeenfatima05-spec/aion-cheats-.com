import { PRODUCTION_ORIGIN } from './site-origin.mjs';

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
    return env.ASSETS.fetch(request);
  },
};
