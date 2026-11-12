import { spawnSync } from 'node:child_process';

const SCRIPT_NAME = 'aion-cheats--com';

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

function resolveAccountId() {
  const fromEnv = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID;
  if (fromEnv?.trim()) return fromEnv.trim();
  const who = spawnSync('npx wrangler whoami', { encoding: 'utf8', shell: true });
  const m = `${who.stdout ?? ''}${who.stderr ?? ''}`.match(/Account ID:\s*([a-f0-9]+)/i);
  return m?.[1] ?? null;
}

async function api(headers, method, url, label) {
  const res = await fetch(url, { method, headers });
  if (method !== 'GET' || res.ok) {
    console.log(`detach-worker-domains: ${label} → HTTP ${res.status}`);
  }
  return res;
}

export async function detachAionCheatsDomains() {
  const token = resolveApiToken();
  if (!token) {
    console.warn('detach-worker-domains: no API token (set CLOUDFLARE_API_TOKEN or wrangler login) — skip');
    return;
  }

  const accountId = resolveAccountId();
  if (!accountId) {
    console.warn('detach-worker-domains: no account id — skip');
    return;
  }

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const listWorkersDomains = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/domains?service=${SCRIPT_NAME}`,
    { headers },
  );
  if (listWorkersDomains.ok) {
    const body = await listWorkersDomains.json();
    for (const row of body.result ?? []) {
      const host = row.hostname ?? '';
      if (!host.includes('aion-cheats.com')) continue;
      if (row.id) {
        await api(
          headers,
          'DELETE',
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/domains/${row.id}`,
          `deleted ${host}`,
        );
      }
    }
  }

  const scriptDomains = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${SCRIPT_NAME}/domains`,
    { headers },
  );
  if (scriptDomains.ok) {
    const body = await scriptDomains.json();
    for (const row of body.result ?? []) {
      const host = row.hostname ?? row.zone ?? '';
      if (!host.includes('aion-cheats.com')) continue;
      await api(
        headers,
        'DELETE',
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${SCRIPT_NAME}/domains/${encodeURIComponent(host)}`,
        `script domain ${host}`,
      );
    }
  }

  for (const host of ['aion-cheats.com', 'www.aion-cheats.com']) {
    await api(
      headers,
      'DELETE',
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${SCRIPT_NAME}/domains/${encodeURIComponent(host)}`,
      `script domain ${host} (direct)`,
    );
  }
}
