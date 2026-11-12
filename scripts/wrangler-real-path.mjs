import fs from 'node:fs';
import path from 'node:path';

/** Real wrangler CLI (bypasses CI deploy redirect wrapper). */
export function wranglerCliPath(root = process.cwd()) {
  const bin = path.join(root, 'node_modules', 'wrangler', 'bin');
  const patched = path.join(bin, 'wrangler.real.js');
  if (fs.existsSync(patched)) return patched;
  return path.join(bin, 'wrangler.js');
}
