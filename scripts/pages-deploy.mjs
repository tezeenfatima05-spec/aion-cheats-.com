import { spawnSync } from 'node:child_process';

export function deployPagesDist() {
  const project = process.env.CLOUDFLARE_PAGES_PROJECT?.trim() || 'aion-cheats-com';
  console.log(`pages-deploy: Cloudflare Pages → ${project}`);
  return spawnSync(
    `npx wrangler pages deploy dist --project-name=${project} --branch=main --commit-dirty=true`,
    { stdio: 'inherit', shell: true, env: process.env },
  );
}
