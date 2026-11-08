/**
 * Central titles/descriptions for high-traffic routes.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'AION 2 Cheats — Aimbot, ESP, Radar & Auto Loot | AION Cheats',
    description:
      'Explore AION 2 cheats for PC featuring player ESP, soft aim, 2D radar, auto loot, Kinah farming, gathering ESP, and customizable mod menu features at AION Cheats.',
  },
  '/products/aion-2-cheats/': {
    title: 'AION 2 Cheats & Cloud DMA | AION Cheats Products',
    description:
      'Full AION 2 cheat suite for Steam and PURPLE on PC plus Cloud DMA compatibility notes—updated guides at aion-cheats.com.',
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
    title: 'AION 2 Cheats Guides & Configuration Tips',
    description:
      'Setup guides for soft aim, player ESP, 2D radar, auto loot, Kinah farming, and patch-day checks for AION 2 on PC.',
  },
  '/forum/': {
    title: 'AION 2 Community Forum | AION Cheats',
    description: 'Discuss ESP tuning, radar range, PvP setups, gathering filters, and patch notes with other AION 2 operators.',
  },
  '/faq/': {
    title: 'FAQ | AION 2 Cheats, Checkout & Setup',
    description:
      'Answers on Steam and PURPLE support, feature modules, checkout, stream-proof mode, and blog guides at aion-cheats.com.',
  },
  '/terms/': {
    title: 'Terms & Conditions | AION Cheats',
    description: 'Purchase terms, license use, and refund policy for AION Cheats products sold through aion-cheats.com.',
  },
  '/privacy/': {
    title: 'Privacy Policy | AION Cheats',
    description: 'How aion-cheats.com uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About AION Cheats',
    description: 'What AION Cheats publishes: AION 2 feature guides, product pages, and status notes at aion-cheats.com.',
  },
  '/support/': {
    title: 'Support | AION Cheats',
    description: 'Get help with loader setup, module configuration, and checkout for AION 2 cheats on PC.',
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
