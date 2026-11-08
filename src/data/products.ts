import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import { PRODUCT_BASE as productBase } from '../config/site';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

export const productRelatedBlogSlugs: Record<string, string[]> = {
  elite: [
    'aion-2-cheats-features-guide',
    'aion-2-soft-aim-setup',
    'aion-2-player-esp-guide',
    'aion-2-2d-radar-config',
    'how-to-buy-aion-2-cheats-2026',
  ],
  'cloud-dma': [
    'aion-2-cloud-dma-setup',
    'aion-2-external-loader-guide',
    'aion-2-patch-day-checklist',
    'aion-2-steam-purple-client',
  ],
};

const gameplay = '/images/gameplay';

function makeSlide(src: string, alt: string, caption: string, captionDesc: string): ProductSlide {
  return { src, alt, caption, captionDesc };
}

const gallery: Record<string, ProductSlide> = {
  visuals: makeSlide(
    `${gameplay}/aion-2-visuals.png`,
    'AION 2 player ESP with faction colors and distance readouts',
    'Player ESP',
    'Box styles, skeleton, nameplate, and faction colors tuned for Elyos and Asmodian PvP.',
  ),
  world: makeSlide(
    `${gameplay}/aion-2-world-esp.png`,
    'AION 2 world ESP showing gathering nodes and chest markers',
    'World ESP',
    'NPC, boss, gathering node, and chest filters for open-world and dungeon runs.',
  ),
  aim: makeSlide(
    `${gameplay}/aion-2-aimbot.png`,
    'AION 2 soft aim menu with FOV and bone selection',
    'Soft aim',
    'Aim key, smoothing, visibility check, and friendly faction ignore options.',
  ),
  radar: makeSlide(
    `${gameplay}/aion-2-radar.png`,
    'AION 2 2D radar with player and boss markers',
    '2D radar',
    'Faction-coded blips, boss markers, and adjustable zoom and range.',
  ),
  flight: makeSlide(
    `${gameplay}/aion-2-flight-esp.png`,
    'AION 2 aerial ESP with flight path and altitude readout',
    'Flight ESP',
    'Flying targets, glide state, and off-screen arrows for aerial combat.',
  ),
  misc: makeSlide(
    `${gameplay}/aion-2-misc.png`,
    'AION 2 mod menu with stream-proof and config save slots',
    'Mod menu',
    'Combat mode, panic key, color presets, and save/load config profiles.',
  ),
};

function slide(...keys: (keyof typeof gallery)[]): ProductSlide[] {
  return keys.map((k) => gallery[k]);
}

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on aion-cheats.com before purchase—especially after an AION 2 client or anti-cheat update.',
  },
  {
    num: '02',
    title: 'Choose your access',
    desc: 'Select Elite for the full module stack or Cloud DMA utility if you run a hosted external setup.',
  },
  {
    num: '03',
    title: 'Complete secure checkout',
    desc: 'Finish checkout through our secure redirect, then unlock the operator portal and setup walkthrough.',
  },
  {
    num: '04',
    title: 'Configure and test',
    desc: 'Load conservative presets, test overlays in a low-risk zone, then save profiles before PvP or farming sessions.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'AION 2 receives frequent client updates. Confirm module availability on the live status panel at aion-cheats.com before you purchase or launch. Overlay behavior may differ in instances, aerial combat, and crowded PvP zones after patches.';

const sharedLimitations =
  'Third-party software for online games can violate publisher terms and lead to account action. You use this software at your own risk. Compatibility can change after game, platform, or Windows updates without notice.';

const aionSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator rights for the external loader.' },
  { icon: 'reqSteam', text: 'AION 2 via Steam or PURPLE (Global PC) with the latest client patch.' },
  { icon: 'reqCpu', text: 'A PC that meets AION 2 published system requirements with stable frame times.' },
  { icon: 'reqWifi', text: 'Stable internet for portal updates and license verification.' },
];

function slugFromHref(href: string): string {
  const trimmed = href.replace(productBase, '').replace(/\/$/, '');
  const segment = trimmed.split('/')[0];
  return segment || 'elite';
}

const tierAbout: Record<string, { type: 'h2' | 'p'; text: string }[]> = {
  elite: [
    {
      type: 'p',
      text: 'Elite is the private AION 2 build with soft aim, full player ESP, 2D radar, auto loot, gathering filters, flight markers, and stream-proof overlays—maintained with patch-day operator notes.',
    },
  ],
};

const tierBodies: Record<string, { type: 'h2' | 'p'; text: string }[]> = {
  elite: [
    { type: 'h2', text: 'AION 2 Aimbot and soft aim features' },
    {
      type: 'p',
      text: 'Configure aim key, FOV, smoothing, bone selection, visibility checks, and max aim distance. Ignore friendly faction and party members when you run mixed PvE groups. Draw FOV and target line toggles help you tune without guessing.',
    },
    { type: 'h2', text: 'Player ESP and radar' },
    {
      type: 'p',
      text: 'Box styles, skeleton, health bars, class, level, faction colors, and flight state ship beside a 2D radar with zoom and range sliders. Combat mode hides world ESP when you focus on duels.',
    },
    { type: 'h2', text: 'World, loot, and Kinah farming' },
    {
      type: 'p',
      text: 'NPC and boss markers, gathering node filters, chest ESP, and auto loot paths support Kinah and material farming when you pair them with the filters described in our [auto loot guide](/blog/aion-2-auto-loot-kinah-farming/).',
    },
  ],
};

const utilityBodies: Record<string, { type: 'h2' | 'p'; text: string }[]> = {
  'cloud-dma': [
    { type: 'h2', text: 'Hosted DMA compatibility' },
    {
      type: 'p',
      text: 'Cloud DMA pairs external read paths with the Elite overlay stack on supported Windows rigs. Run the portal compatibility scan before enabling flight ESP or radar on a second machine.',
    },
    { type: 'h2', text: 'When to use Cloud DMA' },
    {
      type: 'p',
      text: 'Choose this path when your operator requires a hosted DMA session instead of a single-PC external loader. Checkout still unlocks Elite modules—DMA is an optional deployment layer, not a separate cheat build.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  elite: {
    images: slide('visuals', 'aim', 'radar'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: aionSystemRequirements,
    fullFeatures: [
      'Soft aim with FOV and bone selection',
      'Player ESP with box, skeleton, and nameplate',
      'Health bar, class, level, and faction readouts',
      '2D radar with zoom and range',
      'Off-screen arrows and max ESP distance',
      'NPC, boss, and gathering node ESP',
      'Auto loot and chest ESP',
      'Flight and aerial target markers',
      'Stream-proof overlay mode',
      'Combat mode and panic key',
      'Custom ESP colors and crosshair',
      'Config save and load profiles',
      'Steam and PURPLE client support',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Built around a clear AION 2 operator workflow',
      paragraphs: [
        'Elite groups soft aim, player ESP, 2D radar, auto loot, gathering ESP, and flight markers into one mod menu with stream-proof and combat-mode toggles. Modules stay readable in Elyos vs Asmodian PvP and in open-world Kinah farming routes.',
        'Conservative presets ship from the portal so you can test overlays before Abyss or world-boss rotations. Status notes land on aion-cheats.com after each major AION 2 patch.',
      ],
    },
  },
  'cloud-dma': {
    images: slide('misc', 'radar', 'visuals'),
    goodToKnow:
      'Run the Cloud DMA compatibility checklist in the portal before pairing hosted DMA with Elite overlays. Document your Windows build and client launcher (Steam vs PURPLE).',
    limitations:
      'Cloud DMA requires supported hardware and operator setup. Not every PC qualifies. You accept all risk from external DMA tooling and game policy enforcement.',
    systemRequirements: [
      ...aionSystemRequirements,
      { icon: 'reqShieldGuide', text: 'Follow the Cloud DMA setup guide before syncing radar and ESP modules.' },
    ],
    fullFeatures: [
      'Hosted DMA compatibility scan',
      'External overlay pairing guide',
      'Radar sync checklist',
      'Second-machine deployment notes',
      'Portal verification workflow',
      'Operator Discord escalation path',
      'Elite module cross-reference',
      'Steam and PURPLE launcher notes',
    ],
    overview: {
      title: 'Built around Cloud DMA deployment',
      paragraphs: [
        'The Cloud DMA utility documents how hosted DMA setups pair with Elite ESP, radar, and aim modules on Windows. It does not replace Elite—it explains deployment when your operator requires external read hardware.',
        'Use the checklist after checkout to confirm DMA firmware, overlay latency, and panic-key behavior before you queue competitive PvP.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(cheat.title),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides = slide('visuals', 'world', 'aim', 'radar', 'flight', 'misc');

export const productHub = {
  path: productBase,
  title: 'AION 2 Cheats & Products',
  subtitle: t.products.subtitle,
  description:
    'Elite PC suite with soft aim, ESP, 2D radar, auto loot, and Cloud DMA deployment notes for Steam and PURPLE.',
  buyUrl: checkoutPath('aion2'),
};
