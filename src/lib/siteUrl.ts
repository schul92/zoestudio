/**
 * Canonical site origin — ALWAYS the www host.
 *
 * Vercel's production env (`NEXT_PUBLIC_BASE_URL`) is set to the non-www apex
 * (`https://zoelumos.com`), but the apex 308-redirects to www. If pages emit
 * non-www canonical tags, Google flags them "Alternate page with proper
 * canonical tag" and refuses to index the www URLs in our sitemap. So every
 * canonical/OG/schema URL must use the www host. Import SITE_URL instead of
 * reading the env var directly.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com')
  .replace(/^https?:\/\/(www\.)?zoelumos\.com/, 'https://www.zoelumos.com')
  .replace(/\/$/, '')
