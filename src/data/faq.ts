import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const elite = link('AION 2 Cheats', productPath('elite'));
const cloudDma = link('Cloud DMA utility', productPath('cloud-dma'));
const productsHub = link('AION 2 products', ROUTES.products);
const faqPage = link('full FAQ', ROUTES.faq);
const blog = link('blog guides', ROUTES.blog);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if AION 2 modules are online?',
    a: a('The live status banner is on aion-cheats.com. Always check after a client patch or maintenance window.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('Your portal unlocks the loader, setup guide, and config library via secure checkout. Follow the guide before launching AION 2.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party tools?',
    a: a('Yes—online games can penalize unauthorized software. Read current status and accept the risk before use.'),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('AION 2 on Steam and PURPLE (Global PC) for Windows 10/11 64-bit. macOS and Linux are not supported.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Use the portal device reset flow or open a support ticket with your order email.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are products listed?',
    a: `${productsHub} lists ${elite} and ${cloudDma} with feature breakdowns and checkout via our partner.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is AION 2 player ESP?',
    a: `Player ESP shows boxes, skeleton, health, class, level, faction, and flight state. ${elite} includes full visual modules plus radar and world ESP.`,
    scopes: ['elite'],
  },
  {
    id: 'esp-vs-aim',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What is the difference between ESP and soft aim?',
    a: a('ESP is information-only. Soft aim assists targeting when enabled. You can run ESP-heavy profiles with aim disabled.'),
  },
  {
    id: 'which-tier-esp',
    topic: 'plans',
    icon: 'faqWhichTierEsp',
    q: 'Which product includes radar and world ESP?',
    a: `${elite} ships player ESP, 2D radar, world markers, auto loot, and flight ESP together.`,
    scopes: ['elite'],
  },
  {
    id: 'which-tier-aim',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'Which product includes soft aim?',
    a: `${elite} includes soft aim with FOV, smoothing, bone selection, and visibility checks.`,
    scopes: ['elite'],
  },
  {
    id: 'elite-slots',
    topic: 'plans',
    icon: 'faqEliteSlots',
    q: 'Why is Elite limited slots?',
    a: a('Elite is a private build with priority patch notes. Slot caps keep maintenance fast. Check the status banner before checkout.'),
    scopes: ['elite'],
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Can OBS capture my overlay?',
    a: a('Stream-proof mode hides overlays from common capture tools. Record a local test before going live.'),
  },
  {
    id: 'undetected',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Are undetected builds guaranteed?',
    a: a('No. Status reflects the current build—not a permanent guarantee. Stop if the banner shows updating or offline.'),
  },
  {
    id: 'cloud-dma',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'What is the Cloud DMA utility?',
    a: `${cloudDma} documents hosted DMA pairing with Elite modules—it is not a separate cheat tier.`,
    scopes: ['cloud-dma'],
  },
  {
    id: 'vac-update',
    topic: 'safety',
    icon: 'faqVacUpdate',
    q: 'What should I do after a game patch?',
    a: a('Read the status banner, update the loader, import the post-patch preset, and test in a safe zone before PvP.'),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `See the ${faqPage} for all answers—or read ${blog} for configuration guides.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'ban-risk', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Filter Elite features, ESP, radar, products, setup, and blog answers.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'scripts',
  'safety',
  'products',
  'blog',
  'setup',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter((f) => !f.scopes && ['setup', 'safety', 'plans', 'esp', 'scripts'].includes(f.topic));
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const combined = kind === 'tier' ? [...scoped, ...general.slice(0, 8)] : [...scoped, ...general.slice(0, 6)];
  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-guide-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which product matches this guide?',
      a: `Feature guides reference ${elite}. Cloud DMA articles reference ${cloudDma}.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: a('Check the article date and the live status banner. Patch-day articles note when modules change.'),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout—not from third-party links.'),
    },
    {
      id: 'blog-setup-safe',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test in a safe zone first?',
      a: a('Yes. Load conservative presets in a low-risk area before Abyss or boss trains.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official documentation?',
    a: `Articles explain workflows and link to ${elite} and ${productsHub}. Product pages are authoritative for checkout.`,
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings work after the next patch?',
    a: a('Re-check status after every AION 2 update. Reload portal presets instead of copying old sliders.'),
  },
];

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('esp') || slug.includes('radar')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which modules does this ESP article cover?',
      a: `${elite} includes player ESP, 2D radar, and world markers described in the guide.`,
    });
  }
  if (slug.includes('soft-aim') || slug.includes('aim')) {
    slugHints.push({
      id: 'blog-slug-aim',
      topic: 'scripts',
      icon: 'faqBlogSlugScripts',
      q: 'Does Elite include the aim settings here?',
      a: a('Yes—soft aim, FOV, and smoothing live in the Elite mod menu.'),
    });
  }
  if (slug.includes('cloud-dma') || slug.includes('external')) {
    slugHints.push({
      id: 'blog-slug-dma',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does this article replace Cloud DMA utility?',
      a: `${cloudDma} complements setup guides—read both before hosted DMA deployment.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8);
}

export const compareRows = [
  { feature: 'Soft aim & FOV', icon: 'compareAutoCombo' as const, lite: false, pro: false, elite: true },
  { feature: 'Player ESP & radar', icon: 'comparePlayerEsp' as const, lite: false, pro: false, elite: true },
  { feature: 'World & boss ESP', icon: 'compareWardLocator' as const, lite: false, pro: false, elite: true },
  { feature: 'Auto loot & gathering', icon: 'compareRuneTimer' as const, lite: false, pro: false, elite: true },
  { feature: 'Stream-proof overlay', icon: 'compareStreamproof' as const, lite: false, pro: false, elite: true },
  { feature: 'Cloud DMA pairing notes', icon: 'compareMinimapHack' as const, lite: false, pro: false, elite: true },
];
