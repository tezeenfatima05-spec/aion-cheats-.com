export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'aion_ops',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: post.upvotes,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments: [{ author: 'aion_ops', age: 'From the guide', score: 0, body: tip }],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-is-in-player-esp',
    title: 'What does player ESP include in AION 2?',
    upvotes: 81,
    excerpt: 'Boxes, skeleton, faction colors, and flight state—without turning the screen into noise.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'AION 2 player ESP guide',
    sourcePath: '/blog/aion-2-player-esp-guide/',
    answer:
      'The guide covers box styles, health bars, nameplates, class and level readouts, plus Elyos, Asmodian, and Balaur color coding.',
    detail: 'It recommends starting with corner boxes and a modest max distance before you enable skeleton or arrows.',
    tip: 'Test in a quiet zone first; raise distance only after you can still track your own character in flight.',
  }),
  guideDiscussion({
    slug: 'how-to-set-soft-aim-fov',
    title: 'How wide should soft aim FOV be for PvP?',
    upvotes: 64,
    excerpt: 'Smaller FOV for duels, slightly wider for open-world skirmishes.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'AION 2 soft aim setup',
    sourcePath: '/blog/aion-2-soft-aim-setup/',
    answer: 'There is no universal number. The guide suggests a narrow FOV for Abyss duels and a modest bump for large fights.',
    detail: 'Pair FOV changes with smoothing—do not max both sliders on day one.',
    tip: 'Enable draw FOV temporarily so you can see the active cone while tuning.',
  }),
  guideDiscussion({
    slug: 'radar-range-for-open-world',
    title: 'What radar range works for open-world farming?',
    upvotes: 52,
    excerpt: 'Balance boss awareness with readable blip density on the 2D radar.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'AION 2 2D radar config',
    sourcePath: '/blog/aion-2-2d-radar-config/',
    answer: 'Use a mid range with gathering node markers off during Kinah routes, then widen range when rotating to world bosses.',
    detail: 'Radar zoom is personal—what matters is consistent blip size across sessions.',
    tip: 'Save separate PvE and PvP radar profiles instead of retuning mid-fight.',
  }),
  guideDiscussion({
    slug: 'auto-loot-vs-manual-pickup',
    title: 'When should I use auto loot filters?',
    upvotes: 47,
    excerpt: 'Filters shine on long farming loops; manual pickup is fine for short dungeon clears.',
    category: 'Community',
    categoryTone: 'green',
    sourceTitle: 'AION 2 auto loot and Kinah farming',
    sourcePath: '/blog/aion-2-auto-loot-kinah-farming/',
    answer: 'The farming guide enables pickup filters after you tag which materials you actually sell or craft with.',
    detail: 'Combine loot ESP with gathering node filters so you are not chasing every gray drop.',
    tip: 'Run one route three times with logging enabled, then tighten the filter list.',
  }),
  guideDiscussion({
    slug: 'cloud-dma-latency-check',
    title: 'How do I check Cloud DMA latency with ESP?',
    upvotes: 39,
    excerpt: 'Record a short clip and watch radar blip delay before competitive play.',
    category: 'Patch Talk',
    categoryTone: 'orange',
    sourceTitle: 'AION 2 Cloud DMA setup',
    sourcePath: '/blog/aion-2-cloud-dma-setup/',
    answer: 'The checklist asks you to verify overlay refresh against radar movement in a safe zone.',
    detail: 'If blips lag behind players, reload the loader and re-run the portal scan before PvP.',
    tip: 'Do not stack experimental DMA firmware the same day as a client patch.',
  }),
  guideDiscussion({
    slug: 'steam-vs-purple-overlay',
    title: 'Does overlay stability differ on Steam vs PURPLE?',
    upvotes: 36,
    excerpt: 'Launcher path and patch timing can change how quickly modules reload.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'AION 2 on Steam and PURPLE',
    sourcePath: '/blog/aion-2-steam-purple-client/',
    answer: 'Both clients are supported, but patch folders and update prompts differ. Follow the launcher-specific notes in the guide.',
    detail: 'After either launcher updates, hit the status banner before enabling soft aim or radar.',
    tip: 'Keep one profile per launcher if you play on both.',
  }),
  guideDiscussion({
    slug: 'stream-proof-test-obs',
    title: 'Quick OBS test for stream-proof mode?',
    upvotes: 28,
    excerpt: 'Record 30 seconds locally before going live.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Stream-proof overlay for AION 2',
    sourcePath: '/blog/aion-2-stream-proof-overlay/',
    answer: 'Enable stream-proof, record with your real scene, and review playback for ESP boxes or radar widgets.',
    detail: 'Game capture and display capture behave differently on multi-monitor rigs.',
    tip: 'Save the recording—do not trust the live preview alone.',
  }),
  guideDiscussion({
    slug: 'combat-mode-when-to-toggle',
    title: 'When should combat mode hide world ESP?',
    upvotes: 33,
    excerpt: 'Use it when node and chest markers distract during small PvP fights.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'Combat mode ESP guide',
    sourcePath: '/blog/aion-2-combat-mode-esp/',
    answer: 'Combat mode keeps player ESP and radar while hiding world markers. Toggle it before duels or arena scrims.',
    detail: 'Remember to switch back before leaving the fight zone or you will miss gathering cues.',
    tip: 'Bind combat mode near your panic key so both are reachable.',
  }),
  guideDiscussion({
    slug: 'how-to-buy-elite-safely',
    title: 'What should I verify before buying Elite?',
    upvotes: 45,
    excerpt: 'Status banner, feature list, and checkout redirect—before payment.',
    category: 'Community',
    categoryTone: 'green',
    sourceTitle: 'How to buy AION 2 cheats in 2026',
    sourcePath: '/blog/how-to-buy-aion-2-cheats-2026/',
    answer: 'Read the Elite feature page, confirm modules match your playstyle, and use the official checkout redirect only.',
    detail: 'After purchase, download the loader from the portal—not third-party mirrors.',
    tip: 'Never post order emails publicly; use the support page for billing questions.',
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'faction-colors-hard-to-read',
    category: 'General',
    categoryTone: 'purple',
    title: 'Faction ESP colors look washed out at night—any fixes?',
    excerpt: 'Try higher contrast visible/hidden colors and reduce skeleton thickness first.',
    author: 'elyos_scout',
    age: '3 hours ago',
    commentsCount: 3,
    upvotes: 94,
    flair: 'Config help',
    sourceTitle: 'Faction ESP colors guide',
    sourcePath: '/blog/aion-2-faction-esp-colors/',
    body: [
      'Storm zones and night cycles can flatten default palettes. The faction color guide recommends bumping contrast on Elyos and Asmodian tags before you touch box size.',
      'If Balaur events overlap player stacks, temporarily hide world ESP with combat mode and widen nameplate text.',
    ],
    comments: [
      { author: 'wing_rider', age: '2 hours ago', score: 21, body: 'I switched to corner boxes plus thicker health bars. Easier to parse than full boxes in rain.' },
      { author: 'abyss_caller', age: '90 min ago', score: 14, body: 'Save two profiles: one for day open world, one for night Abyss.' },
      { author: 'aion_ops', age: '1 hour ago', score: 9, body: 'Linked guide has hex examples—start there before custom neon colors.' },
    ],
  },
  {
    slug: 'flying-targets-off-screen-arrows',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Off-screen arrows feel jittery during flight fights',
    excerpt: 'Lower arrow refresh aggression and cap max ESP distance for aerial tabs.',
    author: 'sky_duels',
    age: '5 hours ago',
    commentsCount: 2,
    upvotes: 72,
    flair: 'Flight ESP',
    sourceTitle: 'Flight ESP and aerial markers',
    sourcePath: '/blog/aion-2-flight-esp-aerial/',
    body: [
      'Flight ESP adds altitude noise when every distant flyer gets an arrow. The aerial guide suggests tightening max distance during glide chases.',
      'Altitude readouts help, but only enable them after arrows feel stable.',
    ],
    comments: [
      { author: 'glide_main', age: '4 hours ago', score: 16, body: 'Dropped max distance by ~15% and jitter stopped. Still see rush targets.' },
      { author: 'aion_ops', age: '3 hours ago', score: 7, body: 'Check wing state icons—they are lighter than full skeleton during flight.' },
    ],
  },
  {
    slug: 'gathering-node-filter-overload',
    category: 'Community',
    categoryTone: 'green',
    title: 'Too many herb nodes on screen—filter advice?',
    excerpt: 'Pick two material types per route instead of enabling every ore and herb tag.',
    author: 'kinah_route',
    age: '7 hours ago',
    commentsCount: 2,
    upvotes: 58,
    flair: 'Farming',
    sourceTitle: 'Gathering node ESP',
    sourcePath: '/blog/aion-2-gathering-node-esp/',
    body: [
      'Gathering ESP is useful when filters match your actual auction house list. Enable one ore family and one herb family per path.',
      'Pair with auto loot filters so pickups match what you highlighted on the map.',
    ],
    comments: [
      { author: 'craft_alt', age: '6 hours ago', score: 11, body: 'I label profiles by zone—Morheim herbs vs volcano ore, never both.' },
      { author: 'aion_ops', age: '5 hours ago', score: 6, body: 'Blog walkthrough shows chest ESP off during pure gathering runs.' },
    ],
  },
  {
    slug: 'patch-day-loader-reload',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Client patch dropped—reload loader or wait?',
    excerpt: 'Check the status banner first, then update before enabling aim or radar.',
    author: 'patch_watch',
    age: '10 hours ago',
    commentsCount: 2,
    upvotes: 49,
    flair: 'Patch Talk',
    sourceTitle: 'Patch day checklist',
    sourcePath: '/blog/aion-2-patch-day-checklist/',
    body: [
      'After maintenance, launcher version and anti-cheat bundles can shift. The checklist says: read the banner, download the noted build, test in a safe zone.',
      'Do not carry yesterday’s aggressive aim profile into today’s client without retesting.',
    ],
    comments: [
      { author: 'purple_launcher', age: '8 hours ago', score: 12, body: 'PURPLE patched an hour before Steam for me—banner saved me from queuing early.' },
      { author: 'aion_ops', age: '7 hours ago', score: 8, body: 'Conservative preset is in the portal under “post-patch”.' },
    ],
  },
  {
    slug: 'world-boss-train-esp',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'World boss ESP—elite only or all mobs?',
    excerpt: 'Filter elite and world boss tags; mute generic NPC ESP during trains.',
    author: 'boss_timer',
    age: '14 hours ago',
    commentsCount: 1,
    upvotes: 41,
    flair: 'PvE',
    sourceTitle: 'World boss ESP guide',
    sourcePath: '/blog/aion-2-world-boss-esp/',
    body: [
      'Boss trains get unreadable if every critter stays lit. The guide enables world boss and dungeon boss markers while generic mob ESP stays off.',
      'Radar boss blips should match the same filter set or you will chase ghosts.',
    ],
    comments: [
      { author: 'aion_ops', age: '12 hours ago', score: 9, body: 'Dungeon section links to combat mode for add phases.' },
    ],
  },
  {
    slug: 'external-loader-order',
    category: 'General',
    categoryTone: 'purple',
    title: 'Launch order: game first or loader first?',
    excerpt: 'Follow the external loader guide—usually launcher, game to menu, then overlay attach.',
    author: 'new_operator',
    age: '1 day ago',
    commentsCount: 2,
    upvotes: 38,
    flair: 'Setup',
    sourceTitle: 'External loader workflow',
    sourcePath: '/blog/aion-2-external-loader-guide/',
    body: [
      'External stacks attach after the client reaches a stable menu state. Skipping steps can mean modules load without hooks.',
      'If overlays fail silently, restart both and import the default Elite preset before retesting.',
    ],
    comments: [
      { author: 'steam_only', age: '20 hours ago', score: 10, body: 'Steam took longer to patch today; waited at character select before attach.' },
      { author: 'aion_ops', age: '18 hours ago', score: 5, body: 'Guide has a short video checklist in the portal.' },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
