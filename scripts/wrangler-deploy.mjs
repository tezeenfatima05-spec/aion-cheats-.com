import { spawnSync } from 'node:child_process';

const SCRIPT_NAME = 'aion-cheats--com';

function resolveAccountId() {
  const fromEnv = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID;
  if (fromEnv?.trim()) return fromEnv.trim();
  const who = spawnSync('npx wrangler whoami', { encoding: 'utf8', shell: true });
  const m = `${who.stdout ?? ''}${who.stderr ?? ''}`.match(/Account ID:\s*([a-f0-9]+)/i);
  return m?.[1] ?? null;
}

/** Drop stale custom domains so deploy does not fail with API 10082. */
async function detachAionCheatsDomains() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) return;

  const accountId = resolveAccountId();
  if (!accountId) {
    console.warn('wrangler-deploy: skip domain detach (no account id)');
    return;
  }

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/domains`;

  const list = await fetch(`${base}?service=${SCRIPT_NAME}`, { headers });
  if (!list.ok) {
    console.warn(`wrangler-deploy: domain list HTTP ${list.status}`);
    return;
  }

  const body = await list.json();
  for (const row of body.result ?? []) {
    const host = row.hostname ?? row.zone_name;
    if (!host || !host.includes('aion-cheats.com')) continue;
    const id = row.id;
    if (!id) continue;
    const del = await fetch(`${base}/${id}`, { method: 'DELETE', headers });
    console.log(`wrangler-deploy: detached ${host} (HTTP ${del.status})`);
  }
}

await detachAionCheatsDomains();

/** CI: set Deploy command to `node scripts/wrangler-deploy.mjs` or `npm run deploy`. */
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
    '\nwrangler-deploy: Assets uploaded. Remove Custom domains on worker aion-cheats--com in the dashboard, or set Deploy command to `node scripts/wrangler-deploy.mjs`.',
  );
  process.exit(0);
}

process.exit(result.status === null ? 1 : result.status);
