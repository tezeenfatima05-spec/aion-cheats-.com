/**
 * Cloudflare Workers Builds — use as the ONLY deploy command:
 *   node scripts/ci-publish.mjs
 * (Do not use bare `npx wrangler deploy`.)
 */
import { execSync, spawnSync } from 'node:child_process';
import { detachAionCheatsDomains } from './detach-worker-domains.mjs';

const PAGES_PROJECT = process.env.CLOUDFLARE_PAGES_PROJECT?.trim() || 'aion-cheats-com';

console.log('ci-publish: building site…');
execSync('node scripts/wrangler-build.mjs', { stdio: 'inherit', shell: true, env: process.env });

console.log('ci-publish: detaching stale worker custom domains…');
await detachAionCheatsDomains();

console.log('ci-publish: uploading Worker (preview only)…');
const worker = spawnSync('npx wrangler deploy --no-bundle', {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
  env: process.env,
});

const workerLog = `${worker.stdout ?? ''}${worker.stderr ?? ''}`;
process.stdout.write(worker.stdout ?? '');
process.stderr.write(worker.stderr ?? '');

const assetsOk =
  /Success! Uploaded \d+ files/.test(workerLog) && /Uploaded aion-cheats/.test(workerLog);
const trigger10082 = /10082/.test(workerLog);

if (worker.status !== 0 && !(assetsOk && trigger10082)) {
  console.error('ci-publish: Worker upload failed');
  process.exit(worker.status === null ? 1 : worker.status);
}
if (trigger10082) {
  console.warn(
    'ci-publish: Worker assets uploaded; trigger 10082 ignored — remove Custom domains on aion-cheats--com in the dashboard.',
  );
}

console.log(`ci-publish: deploying to Cloudflare Pages (${PAGES_PROJECT})…`);
const pages = spawnSync(
  `npx wrangler pages deploy dist --project-name=${PAGES_PROJECT} --branch=main --commit-dirty=true`,
  { stdio: 'inherit', shell: true, env: process.env },
);

if (pages.status !== 0) {
  console.error(
    `ci-publish: Pages deploy failed (HTTP ${pages.status}). Create a Pages project named "${PAGES_PROJECT}" and attach aion-cheats.com as custom domain.`,
  );
  process.exit(pages.status === null ? 1 : pages.status);
}

console.log('ci-publish: done — check https://aion-cheats.com/sitemap.xml');
