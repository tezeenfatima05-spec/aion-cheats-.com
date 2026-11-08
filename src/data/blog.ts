export type { BlogBlock, BlogPostFull } from './blog/types';
export { blogPosts } from './blog/posts';

import { blogPosts } from './blog/posts';

const RELATED_FEATURE_LINKS = [
  '[Elite modules guide](/blog/aion-2-cheats-features-guide/)',
  '[Feature stack walkthrough](/blog/aion-2-cheats-features-guide/)',
  '[ESP and radar primer](/blog/aion-2-cheats-features-guide/)',
  '[Module overview article](/blog/aion-2-cheats-features-guide/)',
] as const;

const RELATED_PATCH_LINKS = [
  '[Patch-day checklist](/blog/aion-2-patch-day-checklist/)',
  '[Update readiness checklist](/blog/aion-2-patch-day-checklist/)',
  '[Patch window checklist](/blog/aion-2-patch-day-checklist/)',
  '[Client update checklist](/blog/aion-2-patch-day-checklist/)',
] as const;

const RELATED_ELITE_LINKS = [
  '[Elite tier product page](/products/aion-2-cheats/elite/)',
  '[Elite suite details](/products/aion-2-cheats/elite/)',
  '[Elite checkout listing](/products/aion-2-cheats/elite/)',
  '[Elite module lineup](/products/aion-2-cheats/elite/)',
] as const;

function relatedReadingIndex(slug: string, mod: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) hash = (hash + slug.charCodeAt(i)) % mod;
  return hash;
}

function relatedReadingParagraph(slug: string): string {
  const i = relatedReadingIndex(slug, RELATED_FEATURE_LINKS.length);
  return `Pair this article with the ${RELATED_FEATURE_LINKS[i]} and the ${RELATED_PATCH_LINKS[i]}. Product details live on the ${RELATED_ELITE_LINKS[i]}.`;
}

export function getBlogPost(slug: string) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;

  return {
    ...post,
    body: post.body.map((block) => {
      if (
        block.type === 'p' &&
        block.text.includes('Pair this article with the [features overview]')
      ) {
        return { ...block, text: relatedReadingParagraph(slug) };
      }
      return block;
    }),
  };
}

export function getAllBlogSlugs() {
  return blogPosts.map((p) => p.slug);
}

export function getFeaturedBlogPost() {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getNonFeaturedBlogPosts() {
  const featured = getFeaturedBlogPost();
  return blogPosts.filter((p) => p.slug !== featured?.slug);
}

export function getFeaturedBlogPosts(limit = 3) {
  const featured = getFeaturedBlogPost();
  const rest = blogPosts.filter((p) => p.slug !== featured?.slug);
  return featured ? [featured, ...rest].slice(0, limit) : blogPosts.slice(0, limit);
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  if (!current) return [];

  const sameTag = blogPosts.filter((p) => p.slug !== slug && p.tag === current.tag);
  const others = blogPosts.filter((p) => p.slug !== slug && p.tag !== current.tag);
  return [...sameTag, ...others].slice(0, limit);
}

export function getBlogPostsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((post): post is NonNullable<typeof post> => post != null);
}

export function getRelatedBlogPostsForProduct(relatedSlugs: string[], limit = 6) {
  const curated = getBlogPostsBySlugs(relatedSlugs);
  if (curated.length >= limit) return curated.slice(0, limit);

  const used = new Set(curated.map((p) => p.slug));
  const fill = blogPosts.filter((p) => !used.has(p.slug));
  return [...curated, ...fill].slice(0, limit);
}

export function getBlogTags() {
  return [...new Set(blogPosts.map((p) => p.tag))].sort((a, b) => a.localeCompare(b));
}

export function getBlogPostTimestamp(date: string) {
  return new Date(date).getTime();
}

export function getBlogReadMinutes(readTime: string) {
  const match = readTime.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}
