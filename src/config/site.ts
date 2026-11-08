/** Central site / game configuration — edit here for future template conversions. */
export const GAME_NAME = 'AION CHEATS';
export const PRODUCT_NAME = 'AION 2';
export const SITE_DOMAIN =
  (import.meta.env.PUBLIC_SITE_DOMAIN as string | undefined)?.trim() || 'aion-cheats.com';

export const SITE_URL =
  (import.meta.env.PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  `https://${SITE_DOMAIN}`;
export const PRODUCT_BASE = '/products/aion-2-cheats/';
export const PRIMARY_KEYWORD = 'AION 2 cheats';
export const TITLE_PREFIX = 'AION 2 Cheats — Aimbot, ESP, Radar & Auto Loot';
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;
export const CTA_URL = 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Faion-2';

export const ASSETS = {
  logo: '/logo.png',
  heroPoster: '/images/gameplay/aion-2-visuals.png',
  ogImage: '/images/gameplay/aion-2-visuals.png',
  screenshots: [
    '/images/gameplay/aion-2-visuals.png',
    '/images/gameplay/aion-2-world-esp.png',
    '/images/gameplay/aion-2-aimbot.png',
    '/images/gameplay/aion-2-misc.png',
    '/images/gameplay/aion-2-radar.png',
    '/images/gameplay/aion-2-flight-esp.png',
  ],
} as const;
