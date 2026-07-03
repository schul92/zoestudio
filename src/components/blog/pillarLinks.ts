import fs from 'fs'
import path from 'path'
import { PILLARS, PillarKey } from '@/data/blogClusters'

/**
 * Server-only helpers wiring blog posts to their pillar hub + money page.
 *
 * - MONEY_PAGES: pillar -> the commercial page the cluster should funnel to.
 * - pillarHubExists: build-time check that the pillar hub route actually
 *   exists under src/app/[locale]/ (e.g. 'switching-vendor' points at
 *   /switching-web-agency-guide, which is not built yet). All blog pages are
 *   statically generated, so this fs check runs at build time.
 * - pillarHubHref: hub URL when the route exists, otherwise falls back to
 *   the designated pillar blog post so we never emit a 404 link.
 *
 * NOTE: imports `fs` — never import this from a 'use client' component.
 */

export const MONEY_PAGES: Record<PillarKey, string> = {
  'bilingual-seo': '/englewood-nj-seo',
  'restaurant-marketing': '/services',
  'beauty-wellness': '/services',
  'website-cost': '/웹사이트-제작',
  'kakaotalk-marketing': '/services/kakaotalk-marketing-usa',
  'professional-services': '/웹사이트-제작',
  'ai-services': '/services',
  'switching-vendor': '/services',
}

export const DEFAULT_MONEY_PAGE = '/services'

const HUB_EXISTS: Record<string, boolean> = (() => {
  const result: Record<string, boolean> = {}
  const appLocaleDir = path.join(process.cwd(), 'src', 'app', '[locale]')
  for (const key of Object.keys(PILLARS) as PillarKey[]) {
    const dir = PILLARS[key].pillarUrl.replace(/^\//, '')
    try {
      result[key] = fs.existsSync(path.join(appLocaleDir, dir, 'page.tsx'))
    } catch {
      result[key] = false
    }
  }
  return result
})()

export function pillarHubExists(key: PillarKey): boolean {
  return HUB_EXISTS[key] === true
}

/** Hub URL if the route exists; otherwise the pillar blog post. Locale-prefixed. */
export function pillarHubHref(key: PillarKey, prefix: string): string {
  const pillar = PILLARS[key]
  return pillarHubExists(key)
    ? `${prefix}${pillar.pillarUrl}`
    : `${prefix}/blog/${pillar.pillarSlug}`
}
