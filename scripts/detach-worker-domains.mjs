import { spawnSync } from 'node:child_process';

const SCRIPT_NAME = 'aion-cheats--com';

function resolveAccountId() {
  const fromEnv = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID;
  if (fromEnv?.trim()) return fromEnv.trim();
  const who = spawnSync('npx wrangler whoami', { encoding: 'utf8', shell: true });
  const m = `${who.stdout ?? ''}${who.stderr ?? ''}`.match(/Account ID:\s*([a-f0-9]+)/i);
  return m?.[1] ?? null;
}

async function deleteDomain(headers, accountId, id, label) {
  const del = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/domains/${id}`,
    { method: 'DELETE', headers },
  );
  console.log(`detach-worker-domains: ${label} (HTTP ${del.status})`);
}

/** Remove aion-cheats.com custom domains from this Worker (avoids deploy API 10082). */
export async function detachAionCheatsDomains() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    console.warn('detach-worker-domains: CLOUDFLARE_API_TOKEN not set — skip');
    return;
  }

  const accountId = resolveAccountId();
  if (!accountId) {
    console.warn('detach-worker-domains: account id not found — skip');
    return;
  }

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const list = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/domains?service=${SCRIPT_NAME}`,
    { headers },
  );
  if (list.ok) {
    const body = await list.json();
    for (const row of body.result ?? []) {
      const host = row.hostname ?? row.zone_name ?? '';
      if (!host.includes('aion-cheats.com')) continue;
      if (row.id) await deleteDomain(headers, accountId, row.id, `removed ${host}`);
    }
  } else {
    console.warn(`detach-worker-domains: list HTTP ${list.status}`);
  }

  for (const host of ['aion-cheats.com', 'www.aion-cheats.com']) {
    const del = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${SCRIPT_NAME}/domains/${host}`,
      { method: 'DELETE', headers },
    );
    if (del.status !== 404) {
      console.log(`detach-worker-domains: script domain ${host} (HTTP ${del.status})`);
    }
  }
}
