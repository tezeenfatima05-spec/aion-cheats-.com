import { spawnSync } from 'node:child_process';

/** CI entrypoint: `node scripts/wrangler-deploy.mjs` (not bare `wrangler deploy`). */
const result = spawnSync('npx wrangler deploy', {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
  env: process.env,
});

const log = `${result.stdout ?? ''}${result.stderr ?? ''}`;
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);

const assetsUploaded =
  /Success! Uploaded \d+ files/.test(log) && /Uploaded aion-cheats/.test(log);

const customDomainTriggerError =
  /Trigger configuration.*partially updated/s.test(log) &&
  /Custom domains:/.test(log) &&
  /10082/.test(log);

if (assetsUploaded && customDomainTriggerError) {
  console.warn(
    '\nwrangler-deploy: Assets are live on workers.dev. In Cloudflare → Workers → aion-cheats--com → Custom domains, remove aion-cheats.com / www (domain is not attached via wrangler.toml).',
  );
  process.exit(0);
}

process.exit(result.status === null ? 1 : result.status);
