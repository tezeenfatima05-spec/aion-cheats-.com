# AION Cheats (aion-cheats.com)

Astro site cloned from the master game-website template and converted for **AION 2** on PC (Steam / PURPLE).

## Config

Edit `src/config/site.ts` for domain, CTA, and asset paths.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Checkout

Commercial CTAs use internal `/go/aion-2/` → `https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Faion-2`

## Cloudflare deploy

Wrangler needs a built `dist/` folder. Do **not** run `wrangler deploy` alone.

**Recommended (one command):**

```bash
npm ci
npm run deploy:cloudflare
```

**Or in the Cloudflare build UI:**

| Setting | Value |
| -------- | ----- |
| Build command | `npm ci && npm run build` |
| Deploy command | `npx wrangler deploy` (Wrangler runs `npm run build` from `wrangler.toml` first) |

Build output directory for **Pages** (if you switch away from Workers): `dist`
