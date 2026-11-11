import { spawnSync } from 'node:child_process';
import { detachAionCheatsDomains } from './detach-worker-domains.mjs';

await detachAionCheatsDomains();

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
    '\nwrangler-deploy: Assets uploaded; remove Custom domains on worker aion-cheats--com in the dashboard.',
  );
  process.exit(0);
}

process.exit(result.status === null ? 1 : result.status);
