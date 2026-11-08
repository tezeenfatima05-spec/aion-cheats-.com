export type { BlogBlock, BlogPostFull } from './blog/types';
export { blogPosts } from './blog/posts';

import { blogPosts } from './blog/posts';

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
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
