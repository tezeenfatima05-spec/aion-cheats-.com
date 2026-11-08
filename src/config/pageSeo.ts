/**
 * Central titles/descriptions for high-traffic routes.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Radar – AION 2 Cheats, ESP, Soft Aim & Auto Loot',
    description:
      'Explore AION 2 on PC with player ESP, soft aim, 2D radar, auto loot, Kinah farming, and gathering ESP—configurable mod menu at aion-cheats.com.',
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
    title: 'Guides – AION 2 setup, ESP & radar tips | Cheats',
    description:
      'Setup guides for soft aim, player ESP, 2D radar, auto loot, Kinah farming, and patch-day checks for AION 2 on PC.',
  },
  '/blog/aion-2-cheats-features-guide/': {
    title: 'AION 2 features: ESP, soft aim, radar & auto loot',
    description:
      'AION 2: Walkthrough of Elite modules—player ESP, soft aim, 2D radar, gathering ESP, and stream-proof overlays for PC.',
  },
  '/blog/aion-2-soft-aim-setup/': {
    title: 'Aim – AION 2 soft aim setup for PC | Cheats',
    description:
      'Tune aim key, FOV, smoothing, bones, and visibility checks before Elyos vs Asmodian fights. Step-by-step soft aim setup for PC.',
  },
  '/blog/aion-2-player-esp-guide/': {
    title: 'Player ESP – AION 2 wallhack layout | Cheats',
    description:
      'Player ESP: box styles, skeleton, faction colors, and distance caps that stay readable in aerial combat and open-world PvP.',
  },
  '/forum/': {
    title: 'Forum – AION 2 ESP, radar & patch discussion',
    description:
      'Forum for ESP tuning, radar range, PvP setups, gathering filters, and patch notes with other AION 2 operators on PC.',
  },
  '/faq/': {
    title: 'FAQ – AION 2 checkout, setup & modules | Cheats',
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
    title: 'About AION Cheats – PC guides & product pages',
    description:
      'About AION Cheats: feature guides, Elite product pages, Cloud DMA notes, and patch status for AION 2 on PC at aion-cheats.com.',
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
