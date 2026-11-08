import fs from 'fs';

const productBase = '/products/aion-2-cheats/';
const gameplay = '/images/gameplay';

const posts = [
  {
    slug: 'aion-2-cheats-features-guide',
    tag: 'Features',
    title: 'AION 2 cheats features: ESP, soft aim, radar, and auto loot',
    image: `${gameplay}/aion-2-visuals.png`,
    desc: 'Walkthrough of Elite modules—player ESP, soft aim, 2D radar, gathering ESP, and stream-proof overlays.',
    date: 'Nov 1, 2026',
    readTime: '12 min read',
    featured: true,
  },
  {
    slug: 'aion-2-soft-aim-setup',
    tag: 'Setup',
    title: 'AION 2 soft aim setup for PC',
    image: `${gameplay}/aion-2-aimbot.png`,
    desc: 'Tune aim key, FOV, smoothing, bones, and visibility checks before Elyos vs Asmodian fights.',
    date: 'Oct 31, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'aion-2-player-esp-guide',
    tag: 'Guides',
    title: 'AION 2 player ESP and wallhack layout',
    image: `${gameplay}/aion-2-visuals.png`,
    desc: 'Box styles, skeleton, faction colors, and distance caps that stay readable in aerial combat.',
    date: 'Oct 30, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'aion-2-2d-radar-config',
    tag: 'Setup',
    title: 'AION 2 2D radar range and zoom',
    image: `${gameplay}/aion-2-radar.png`,
    desc: 'Radar markers, boss blips, and faction coding for open world and Abyss PvP.',
    date: 'Oct 29, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'aion-2-auto-loot-kinah-farming',
    tag: 'Guides',
    title: 'AION 2 auto loot and Kinah farming routes',
    image: '/images/blog/aion-2-kinah-farming-guide.png',
    desc: 'Loot ESP, pickup filters, and PvE loops that pair with gathering node ESP.',
    date: 'Oct 28, 2026',
    readTime: '9 min read',
  },
  {
    slug: 'aion-2-gathering-node-esp',
    tag: 'Guides',
    title: 'AION 2 gathering node and material ESP',
    image: `${gameplay}/aion-2-world-esp.png`,
    desc: 'Ore, herb, and chest filters without cluttering the whole map.',
    date: 'Oct 27, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'aion-2-flight-esp-aerial',
    tag: 'Features',
    title: 'AION 2 flight ESP and aerial markers',
    image: `${gameplay}/aion-2-flight-esp.png`,
    desc: 'Altitude readouts, glide state, and off-screen arrows for flying targets.',
    date: 'Oct 26, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'aion-2-pvp-abyss-tips',
    tag: 'Guides',
    title: 'AION 2 PvP ESP for Abyss and open world',
    image: `${gameplay}/aion-2-visuals.png`,
    desc: 'Faction ignore rules, party filters, and combat mode for large fights.',
    date: 'Oct 25, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'aion-2-cloud-dma-setup',
    tag: 'Setup',
    title: 'AION 2 Cloud DMA compatibility checklist',
    image: `${gameplay}/aion-2-misc.png`,
    desc: 'Pair hosted DMA with Elite overlays—hardware scan and latency checks.',
    date: 'Oct 24, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'aion-2-steam-purple-client',
    tag: 'Guides',
    title: 'AION 2 on Steam and PURPLE (Global PC)',
    image: `${gameplay}/aion-2-misc.png`,
    desc: 'Launcher differences, patch folders, and overlay stability on each client.',
    date: 'Oct 23, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'aion-2-stream-proof-overlay',
    tag: 'Setup',
    title: 'Stream-proof overlay for AION 2 creators',
    image: `${gameplay}/aion-2-misc.png`,
    desc: 'Hide ESP from capture tools while keeping HUD cues on your monitor.',
    date: 'Oct 22, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'aion-2-mod-menu-config',
    tag: 'Setup',
    title: 'AION 2 mod menu keys and config profiles',
    image: `${gameplay}/aion-2-misc.png`,
    desc: 'Menu key, panic key, save/load slots, and color presets explained.',
    date: 'Oct 21, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'aion-2-patch-day-checklist',
    tag: 'Updates',
    title: 'Patch day checklist for AION 2 cheats',
    image: `${gameplay}/aion-2-world-esp.png`,
    desc: 'Status banner, loader reload, and conservative profiles after client updates.',
    date: 'Oct 20, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-buy-aion-2-cheats-2026',
    tag: 'Guides',
    title: 'How to buy AION 2 cheats in 2026',
    image: `${gameplay}/aion-2-aimbot.png`,
    desc: 'Checkout flow, portal unlock, and first-launch checklist for new operators.',
    date: 'Oct 19, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'aion-2-world-boss-esp',
    tag: 'Guides',
    title: 'World boss and elite mob ESP',
    image: `${gameplay}/aion-2-world-esp.png`,
    desc: 'Dungeon boss markers and elite filters for scheduled boss trains.',
    date: 'Oct 18, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'aion-2-faction-esp-colors',
    tag: 'Guides',
    title: 'Faction ESP colors: Elyos, Asmodian, Balaur',
    image: `${gameplay}/aion-2-visuals.png`,
    desc: 'Color coding that stays distinct in night zones and storm weather.',
    date: 'Oct 17, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'aion-2-combat-mode-esp',
    tag: 'Setup',
    title: 'Combat mode: hide world ESP during duels',
    image: `${gameplay}/aion-2-aimbot.png`,
    desc: 'Toggle world markers off while keeping player ESP and radar active.',
    date: 'Oct 16, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'aion-2-external-loader-guide',
    tag: 'Guides',
    title: 'External loader workflow for AION 2',
    image: `${gameplay}/aion-2-misc.png`,
    desc: 'Why external overlays matter, launch order, and when to reload after patches.',
    date: 'Oct 15, 2026',
    readTime: '7 min read',
  },
];

function bodyFor(p) {
  return [
    {
      type: 'p',
      text: `${p.desc} This guide is written for PC players on Steam and PURPLE who use the Elite suite published at aion-cheats.com. Start with conservative sliders, then expand once overlays feel readable in your usual playstyle.`,
    },
    { type: 'h2', text: 'What this covers' },
    {
      type: 'p',
      text: 'We focus on practical configuration—not vague promises. Modules can shift when AION 2 patches land, so read the live status banner before you enable soft aim, radar, or auto loot in a competitive session.',
    },
    { type: 'h2', text: 'Recommended first steps' },
    {
      type: 'ul',
      items: [
        'Load the default Elite preset from the operator portal.',
        'Enable one module group at a time (ESP, then radar, then aim).',
        'Save a named profile after a successful test in a low-risk zone.',
        'Use combat mode before small-scale PvP if world ESP feels noisy.',
      ],
    },
    { type: 'h2', text: 'Related reading' },
    {
      type: 'p',
      text: `Pair this article with the [features overview](/blog/aion-2-cheats-features-guide/) and the [patch day checklist](/blog/aion-2-patch-day-checklist/). Product details live on the [Elite page](${productBase}elite/).`,
    },
    {
      type: 'cta',
      title: 'Ready to configure Elite?',
      text: 'Open checkout to unlock the operator portal and current loader build.',
      href: '/go/aion-2/',
    },
  ];
}

function serializePost(p) {
  const featured = p.featured ? '\n    featured: true,' : '';
  return `  {
    tag: ${JSON.stringify(p.tag)},
    title: ${JSON.stringify(p.title)},
    slug: ${JSON.stringify(p.slug)},
    image: ${JSON.stringify(p.image)},
    desc: ${JSON.stringify(p.desc)},
    date: ${JSON.stringify(p.date)},
    readTime: ${JSON.stringify(p.readTime)},${featured}
    body: ${JSON.stringify(bodyFor(p), null, 4).replace(/^/gm, '    ').trimStart()},
  }`;
}

const output = `import type { BlogPostFull } from './types';

export const blogPosts: BlogPostFull[] = [
${posts.map(serializePost).join(',\n')}
];
`;

fs.writeFileSync('src/data/blog/posts.ts', output);
