import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTION_ORIGIN, resolveProductionSiteUrl } from './site-origin.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'sitemap-0.xml');

if (!fs.existsSync(source)) {
  console.error('finalize-sitemap: dist/sitemap-0.xml not found — run astro build first.');
  process.exit(1);
}

const raw = fs.readFileSync(source, 'utf8');
const siteOrigin = resolveProductionSiteUrl(process.env);

const urlsetOpen = raw.match(/<urlset([^>]*)>/)?.[0] ?? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

/** @param {string} pathname */
function canonicalPath(pathname) {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  try {
    path = decodeURI(path);
  } catch {
    /* keep encoded */
  }
  const lower = path.toLowerCase();
  if (lower === '/') return '/';
  return lower.endsWith('/') ? lower : `${lower}/`;
}

/** @param {string} loc */
function canonicalLoc(loc) {
  const trimmed = loc.trim().replace(/https:\/\/[^/\s]*\.workers\.dev/gi, siteOrigin);
  let url;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  const path = canonicalPath(url.pathname);
  return `${PRODUCTION_ORIGIN}${path}`;
}

/** @param {string} block */
function patchLoc(block, loc) {
  return block.replace(/<loc>[^<]*<\/loc>/, `<loc>${loc}</loc>`);
}

/** @type {Map<string, string>} */
const byLoc = new Map();
const blockRe = /<url>[\s\S]*?<\/url>/g;
for (const block of raw.match(blockRe) ?? []) {
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
  if (!locMatch) continue;
  const loc = canonicalLoc(locMatch[1]);
  if (!loc) continue;
  if (!byLoc.has(loc)) byLoc.set(loc, patchLoc(block, loc));
}

const urlCount = byLoc.size;
if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap-0.xml contains no URLs.');
  process.exit(1);
}

const sortedLocs = [...byLoc.keys()].sort();
const urlBlocks = sortedLocs.map((loc) => byLoc.get(loc)).join('\n');

const urlsetXml = `<?xml version="1.0" encoding="UTF-8"?>
${urlsetOpen}
${urlBlocks}
</urlset>
`;

if (urlsetXml.includes('workers.dev')) {
  console.error('finalize-sitemap: sitemap still contains workers.dev URLs — aborting build.');
  process.exit(1);
}

const duplicateCount = (raw.match(/<url>/g) ?? []).length - urlCount;
if (duplicateCount > 0) {
  console.log(`finalize-sitemap: removed ${duplicateCount} duplicate URL block(s).`);
}

fs.writeFileSync(path.join(dist, 'sitemap.xml'), urlsetXml, 'utf8');

const indexPath = path.join(dist, 'sitemap-index.xml');
if (fs.existsSync(indexPath)) fs.unlinkSync(indexPath);

const legacySitemap0 = path.join(dist, 'sitemap-0.xml');
if (fs.existsSync(legacySitemap0)) fs.unlinkSync(legacySitemap0);

const robotsTxt = `User-agent: *
Allow: /

Disallow: /go/

Sitemap: ${PRODUCTION_ORIGIN}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robotsTxt, 'utf8');

console.log(`Sitemap finalized: ${urlCount} unique URLs → dist/sitemap.xml (${PRODUCTION_ORIGIN})`);
