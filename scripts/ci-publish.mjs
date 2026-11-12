/** Alias for Workers Builds — same as `node scripts/wrangler-deploy-cf.mjs`. */
import { spawnSync } from 'node:child_process';

const child = spawnSync('node scripts/wrangler-deploy-cf.mjs', {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

process.exit(child.status ?? 0);
