/**
 * Cloudflare Workers Builds deploy command (replace `npx wrangler deploy`):
 *   node scripts/wrangler-deploy-cf.mjs
 */
import { execSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { detachAionCheatsDomains } from './detach-worker-domains.mjs';
import { deployPagesDist } from './pages-deploy.mjs';
import { purgeSitemapAndRobots } from './purge-cf-cache.mjs';

const PAGES_PROJECT = process.env.CLOUDFLARE_PAGES_PROJECT?.trim() || 'aion-cheats-com';

if (!existsSync('dist/index.html')) {
  console.log('wrangler-deploy-cf: dist missing — full build…');
  execSync('node scripts/wrangler-build.mjs', { stdio: 'inherit', shell: true, env: process.env });
} else {
  console.log('wrangler-deploy-cf: dist present — detach stale worker domains…');
  await detachAionCheatsDomains();
}

const deployEnv = { ...process.env, WRANGLER_SKIP_BUILD: '1' };

console.log('wrangler-deploy-cf: uploading Worker assets…');
const worker = spawnSync('npx wrangler deploy --no-bundle', {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
  env: deployEnv,
});

const log = `${worker.stdout ?? ''}${worker.stderr ?? ''}`;
process.stdout.write(worker.stdout ?? '');
process.stderr.write(worker.stderr ?? '');

const assetsOk =
  /Success! Uploaded \d+ files/.test(log) && /Uploaded aion-cheats/.test(log);
const err10082 = /10082/.test(log);
const workerOk = worker.status === 0 || (assetsOk && err10082);

if (!workerOk) {
  console.error('wrangler-deploy-cf: Worker upload failed');
  process.exit(worker.status ?? 1);
}

if (err10082) {
  console.warn(
    'wrangler-deploy-cf: assets uploaded; error 10082 — remove aion-cheats.com from Worker Custom domains in the dashboard.',
  );
}

const pages = deployPagesDist();

if (pages.status !== 0) {
  console.error(
    `wrangler-deploy-cf: Pages deploy failed. Create Pages project "${PAGES_PROJECT}" and attach aion-cheats.com.`,
  );
  process.exit(pages.status ?? 1);
}

await purgeSitemapAndRobots();

console.log('wrangler-deploy-cf: done — https://aion-cheats.com/sitemap.xml');
