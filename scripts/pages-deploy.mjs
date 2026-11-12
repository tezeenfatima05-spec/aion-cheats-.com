import { spawnSync } from 'node:child_process';
import { wranglerCliPath } from './wrangler-real-path.mjs';

export function deployPagesDist() {
  const project = process.env.CLOUDFLARE_PAGES_PROJECT?.trim() || 'aion-cheats-com';
  console.log(`pages-deploy: Cloudflare Pages → ${project}`);
  return spawnSync(
    process.execPath,
    [
      wranglerCliPath(),
      'pages',
      'deploy',
      'dist',
      `--project-name=${project}`,
      '--branch=main',
      '--commit-dirty=true',
    ],
    { stdio: 'inherit', env: process.env },
  );
}
