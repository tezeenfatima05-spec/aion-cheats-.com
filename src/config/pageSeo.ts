/**
 * Central titles/descriptions for high-traffic routes.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Aion 2 Cheats For Pc Aimbot Esp Auto Loot Radar – Radar',
    description:
      'Aion 2 Cheats For Pc Aimbot Esp Auto Loot Radar: Explore AION 2 on PC with player ESP, soft aim, 2D radar, auto loot, Kinah farming, and gathering ESP.',
  },
  '/products/aion-2-cheats/': {
    title: 'AION 2 Cheats – ESP, Soft Aim & Flight Markers',
    description:
      'Elite PC suite: player ESP, faction filters, flight markers, gathering ESP, soft aim, and stream-proof overlay for Steam and PURPLE clients.',
  },
  '/products/aion-2-cheats/elite/': {
    title: 'AION 2 Elite Cheats | ESP, Soft Aim & 2D Radar',
    description:
      'Elite build: player ESP, soft aim, 2D radar, auto loot, gathering ESP, flight markers, stream-proof overlay, and config sync.',
  },
  '/products/aion-2-cheats/utilities/': {
    title: 'AION 2 Cloud DMA Utility | Hosted DMA Setup',
    description:
      'Cloud DMA compatibility checklist, hosted DMA notes, and how Elite features pair with external DMA setups on Windows.',
  },
  '/products/aion-2-cheats/cloud-dma/': {
    title: 'AION 2 Cloud DMA Support | External Setup Guide',
    description:
      'Hosted DMA paths, compatibility scans, and operator notes for pairing Cloud DMA with AION 2 external overlays.',
  },
  '/blog/': {
    title: 'Guides – AION 2 setup, ESP, radar tips & cheats',
    description:
      'Setup guides for soft aim, player ESP, 2D radar, auto loot, Kinah farming, and patch-day checks for AION 2 on PC—updated after patches.',
  },
  '/blog/aion-2-cheats-features-guide/': {
    title: 'Aion 2 – Walkthrough of Elite modules, ESP & soft aim',
    description:
      'AION 2 walkthrough: Elite modules with player ESP, soft aim, 2D radar, gathering ESP, stream-proof overlays, and config tips for PC clients.',
  },
  '/blog/aion-2-2d-radar-config/': {
    title: 'Range and zoom – AION 2 2D radar, Abyss PvP | Cheats',
    description:
      'Range and zoom: Radar markers, boss blips, and faction coding for open world and Abyss PvP. AION 2 2D radar setup guide for PC, 6 min read.',
  },
  '/blog/aion-2-soft-aim-setup/': {
    title: 'Aim – visibility checks before Elyos vs Asmodian | Cheats',
    description:
      'Aim: Tune key, FOV, smoothing, bones, and visibility checks before Elyos vs Asmodian fights. Step-by-step AION 2 soft setup for PC.',
  },
  '/blog/aion-2-player-esp-guide/': {
    title: 'Player Esp – AION 2 wallhack layout & aerial caps',
    description:
      'Player ESP: box styles, skeleton, faction colors, and distance caps that stay readable in aerial combat and open-world PvP.',
  },
  '/forum/': {
    title: 'Forum – AION 2 ESP, radar & patch discussion',
    description:
      'Forum for ESP tuning, radar range, PvP setups, gathering filters, and patch notes with other AION 2 operators on PC.',
  },
  '/faq/': {
    title: 'FAQ – AION 2 checkout, setup, modules & cheats',
    description:
      'FAQ: Answers on Steam and PURPLE support, feature modules, checkout, stream-proof mode, and blog guides at aion-cheats.com.',
  },
  '/terms/': {
    title: 'Terms & Conditions | AION Cheats',
    description: 'Purchase terms, license use, and refund policy for AION Cheats products sold through aion-cheats.com.',
  },
  '/privacy/': {
    title: 'Privacy – analytics, cookies & contact data | Cheats',
    description:
      'Privacy: How aion-cheats.com uses analytics, cookies, and contact data when you browse or request support. Read our full policy.',
  },
  '/about/': {
    title: 'Aion Cheats – PC guides, product pages & site info',
    description:
      'About this PC resource: Elite module guides, product pages, patch status, and support paths for AION 2 players at aion-cheats.com.',
  },
  '/support/': {
    title: 'Support | AION Cheats',
    description: 'Get help with loader setup, module configuration, and checkout for AION 2 on PC.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
