import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { resolveProductionSiteUrl } from './scripts/site-origin.mjs';

const siteUrl = resolveProductionSiteUrl(process.env);

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/aion-2-cheats/',
    '/cheats/lite/': '/products/aion-2-cheats/',
    '/cheats/pro/': '/products/aion-2-cheats/',
    '/cheats/elite/': '/products/aion-2-cheats/elite/',
    '/cheats/compare/': '/blog/aion-2-cheats-features-guide/',
    '/contact/': '/support/',
    '/products/dota-2-cheats/': '/products/aion-2-cheats/',
    '/products/dota-2-cheats/elite/': '/products/aion-2-cheats/elite/',
    '/products/dota-2-cheats/utilities/': '/products/aion-2-cheats/utilities/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
