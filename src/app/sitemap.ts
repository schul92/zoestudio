import { MetadataRoute } from 'next'
import { blogContent } from '@/data/blogContent'
import { koreanCities } from '@/data/koreanCities'
import { usStates, STATES_WITH_CUSTOM_PAGES } from '@/data/usStates'
import { industries } from '@/data/industriesData'
import { cityMarkets } from '@/data/cityMarketData'
import { localSeoPages } from '@/data/localSeoPages'
import { SITE_URL } from '@/lib/siteUrl'
import { US_LAUNCH_PATHS, US_LAUNCH_UPDATED } from '@/data/usLaunch'
import { STATE_SLUG_PAIRS } from '@/lib/stateSlugs'

// Last real content change for non-blog pages; bump it when page copy changes (not on every build).
const CONTENT_UPDATED = '2026-09-26'
const LOCAL_LANDINGS_UPDATED = '2026-09-30'

export default function sitemap(): MetadataRoute.Sitemap {
  // Force www host — Vercel apex 307-redirects to www, so canonicals must be www
  const baseUrl = SITE_URL

  // Standard pages (English URLs)
  const standardPages = [
    '',
    '/about',
    '/contact',
    '/portfolio',
    '/pricing',
    '/ny-website',
    '/nj-website',
    '/fort-lee-web-design',
    '/korean-web-design-new-jersey',
    '/privacy',
    '/terms',
    '/reviews',
    '/blog',
    '/englewood-nj-seo',
    '/north-bergen-web-design',
    '/ca-website',
    '/tx-website',
    '/ga-website',
    '/va-website',
    '/il-website',
    '/wa-website',
    '/md-website',
    '/hi-website',
    '/pa-website',
    '/fl-website',
    '/palisades-park-marketing',
    '/ridgefield-web-design',
    '/edgewater-web-design',
    '/cliffside-park-web-design',
    '/fairview-nj-web-design',
    '/hackensack-web-design',
    '/bilingual-seo-new-york',
    '/korean-web-design-agencies-nj-compared',
    '/services',
    '/services/kakaotalk-integration',
    '/services/kakaotalk-marketing-usa',
    '/services/google-business-profile-optimization',
    '/services/shopify-cost-audit',
    '/compare/best-ecommerce-platform-korean-business-2026',
    '/tools',
    '/tools/website-cost-estimator',
    '/kakao-checklist',
    '/website-pricing-guide',
    // Content-cluster pillar guides
    '/bilingual-seo-guide',
    '/kakaotalk-marketing-guide',
    '/ai-consulting-korean-business',
    '/korean-restaurant-marketing-guide',
    '/korean-beauty-wellness-website-guide',
    '/website-cost-guide',
    '/korean-professional-services-website-guide',
    // All-50-states hub + programmatic state pages (38 new; 12 have custom pages above)
    '/states',
    ...usStates
      .filter((s) => !STATES_WITH_CUSTOM_PAGES.includes(s.abbr))
      .map((s) => `/${s.slug}`),
    // NOTE: Korean-American city hub pages are emitted separately below with
    // their correct ko-slug hreflang pair — they are intentionally NOT in
    // standardPages, because the blanket /ko${page} loop would otherwise
    // create /ko/{english-slug} URLs that self-canonical to /ko/{koSlug}.
  ]

  // Korean SEO pages (Korean URLs - high priority for Korean keywords)
  const koreanSeoPages = [
    // City hub Korean slugs
    ...koreanCities.map((c) => ({ path: `/${c.koSlug}`, enPath: `/${c.slug}`, priority: 0.95 })),
    { path: '/뉴저지-웹사이트', enPath: '/nj-website', priority: 0.95 },
    { path: '/뉴욕-웹사이트', enPath: '/ny-website', priority: 0.95 },
    { path: '/웹사이트-제작', enPath: '/웹사이트-제작', priority: 0.95 },
    { path: '/쇼핑몰-제작', enPath: '/pricing', priority: 0.9 },
    { path: '/캘리포니아-웹사이트', enPath: '/ca-website', priority: 0.95 },
    { path: '/텍사스-웹사이트', enPath: '/tx-website', priority: 0.95 },
    { path: '/조지아-웹사이트', enPath: '/ga-website', priority: 0.95 },
    { path: '/버지니아-웹사이트', enPath: '/va-website', priority: 0.95 },
    { path: '/일리노이-웹사이트', enPath: '/il-website', priority: 0.95 },
    { path: '/워싱턴-웹사이트', enPath: '/wa-website', priority: 0.95 },
    { path: '/메릴랜드-웹사이트', enPath: '/md-website', priority: 0.95 },
    { path: '/하와이-웹사이트', enPath: '/hi-website', priority: 0.95 },
    { path: '/펜실베이니아-웹사이트', enPath: '/pa-website', priority: 0.95 },
    { path: '/플로리다-웹사이트', enPath: '/fl-website', priority: 0.95 },
    { path: '/광고대행', enPath: '/광고대행', priority: 0.95 },
    // Korean-slug URLs for the 38 programmatic state pages ([주명]-웹사이트)
    ...usStates
      .filter((s) => !STATES_WITH_CUSTOM_PAGES.includes(s.abbr))
      .map((s) => ({ path: `/${s.koSlug}`, enPath: `/${s.slug}`, priority: 0.9 })),
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // State pages: the Korean version lives on the Hangul slug (/ko/캘리포니아-웹사이트, emitted with
  // koreanSeoPages below); /ko/ca-website only 308-redirects there (middleware), so it never goes in.
  if (usStates.some((s) => !STATE_SLUG_PAIRS.some(([en, ko]) => en === s.slug && ko === s.koSlug))) {
    throw new Error('src/lib/stateSlugs.ts is out of sync with src/data/usStates.ts')
  }
  const stateKo = new Map(STATE_SLUG_PAIRS.map(([en, ko]) => [`/${en}`, `/${ko}`] as [string, string]))

  // English pages (without locale prefix)
  standardPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(CONTENT_UPDATED),
      alternates: {
        languages: {
          'x-default': `${baseUrl}${page}`,
          'en': `${baseUrl}${page}`,
          'ko': `${baseUrl}/ko${stateKo.get(page) ?? page}`,
        }
      }
    })
  })

  // English copy served on Korean slugs (self-canonical, linked site-wide from the footer).
  ;['/웹사이트-제작', '/광고대행'].forEach((page) => {
    const en = `${baseUrl}${page}`
    const ko = `${baseUrl}/ko${page}`
    sitemapEntries.push({ url: en, lastModified: new Date(CONTENT_UPDATED), alternates: { languages: { 'x-default': en, en, ko } } })
  })

  // Korean pages (with /ko prefix for standard pages; state pages use their Hangul slug instead)
  standardPages.filter((page) => !stateKo.has(page)).forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}/ko${page}`,
      lastModified: new Date(CONTENT_UPDATED),
      alternates: {
        languages: {
          'x-default': `${baseUrl}${page}`,
          'en': `${baseUrl}${page}`,
          'ko': `${baseUrl}/ko${page}`,
        }
      }
    })
  })

  // Korean-American city hub pages — English URL with correct ko-slug alternate.
  // (The Korean-slug counterpart /ko/{koSlug} is emitted via koreanSeoPages below.)
  koreanCities.forEach((c) => {
    sitemapEntries.push({
      url: `${baseUrl}/${c.slug}`,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/${c.slug}`,
          en: `${baseUrl}/${c.slug}`,
          ko: `${baseUrl}/ko/${c.koSlug}`,
        },
      },
    })
  })

  // Korean SEO pages (Korean URL slugs - important for Korean search)
  koreanSeoPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}/ko${page.path}`,
      alternates: {
        languages: {
          'x-default': `${baseUrl}${page.enPath}`,
          'en': `${baseUrl}${page.enPath}`,
          'ko': `${baseUrl}/ko${page.path}`,
        }
      }
    })
  })

  // Bergen County landings: English slug + Korean slug, paired by hreflang.
  localSeoPages.forEach((p) => {
    const en = `${baseUrl}/${p.slug}`
    const ko = `${baseUrl}/ko/${p.koSlug}`
    const languages = { 'x-default': en, en, ko }
    sitemapEntries.push({ url: en, lastModified: new Date(LOCAL_LANDINGS_UPDATED), alternates: { languages } })
    sitemapEntries.push({ url: ko, lastModified: new Date(LOCAL_LANDINGS_UPDATED), alternates: { languages } })
  })

  // Korean companies launching in the US: Korean slug ↔ English slug, paired by hreflang.
  {
    const en = `${baseUrl}${US_LAUNCH_PATHS.en}`
    const ko = `${baseUrl}${US_LAUNCH_PATHS.ko}`
    const languages = { 'x-default': en, en, ko }
    sitemapEntries.push({ url: en, lastModified: new Date(US_LAUNCH_UPDATED), priority: 0.95, alternates: { languages } })
    sitemapEntries.push({ url: ko, lastModified: new Date(US_LAUNCH_UPDATED), priority: 0.95, alternates: { languages } })
  }

  // Audit tool (both locales)
  sitemapEntries.push({
    url: `${baseUrl}/audit`,
    alternates: {
      languages: {
        'x-default': `${baseUrl}/audit`,
        en: `${baseUrl}/audit`,
        ko: `${baseUrl}/ko/audit`,
      },
    },
  })
  sitemapEntries.push({
    url: `${baseUrl}/ko/audit`,
    alternates: {
      languages: {
        'x-default': `${baseUrl}/audit`,
        en: `${baseUrl}/audit`,
        ko: `${baseUrl}/ko/audit`,
      },
    },
  })

  // Industries index (both locales)
  sitemapEntries.push({
    url: `${baseUrl}/industries`,
    alternates: {
      languages: {
        'x-default': `${baseUrl}/industries`,
        en: `${baseUrl}/industries`,
        ko: `${baseUrl}/ko/industries`,
      },
    },
  })
  sitemapEntries.push({
    url: `${baseUrl}/ko/industries`,
    alternates: {
      languages: {
        'x-default': `${baseUrl}/industries`,
        en: `${baseUrl}/industries`,
        ko: `${baseUrl}/ko/industries`,
      },
    },
  })

  // Industry vertical pages
  industries.forEach((ind) => {
    sitemapEntries.push({
      url: `${baseUrl}/industries/${ind.slug.en}`,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/industries/${ind.slug.en}`,
          en: `${baseUrl}/industries/${ind.slug.en}`,
          ko: `${baseUrl}/ko/industries/${ind.slug.ko}`,
        },
      },
    })
    sitemapEntries.push({
      url: `${baseUrl}/ko/industries/${ind.slug.ko}`,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/industries/${ind.slug.en}`,
          en: `${baseUrl}/industries/${ind.slug.en}`,
          ko: `${baseUrl}/ko/industries/${ind.slug.ko}`,
        },
      },
    })

    // City × industry crossover pages (local SEO plays)
    cityMarkets.forEach((c) => {
      sitemapEntries.push({
        url: `${baseUrl}/industries/${ind.slug.en}/${c.slug.en}`,
        alternates: {
          languages: {
            'x-default': `${baseUrl}/industries/${ind.slug.en}/${c.slug.en}`,
            en: `${baseUrl}/industries/${ind.slug.en}/${c.slug.en}`,
            ko: `${baseUrl}/ko/industries/${ind.slug.ko}/${c.slug.ko}`,
          },
        },
      })
      sitemapEntries.push({
        url: `${baseUrl}/ko/industries/${ind.slug.ko}/${c.slug.ko}`,
        alternates: {
          languages: {
            'x-default': `${baseUrl}/industries/${ind.slug.en}/${c.slug.en}`,
            en: `${baseUrl}/industries/${ind.slug.en}/${c.slug.en}`,
            ko: `${baseUrl}/ko/industries/${ind.slug.ko}/${c.slug.ko}`,
          },
        },
      })
    })
  })

  // Blog posts
  blogContent.forEach((post) => {
    sitemapEntries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedDate || post.date),
      alternates: {
        languages: {
          'x-default': `${baseUrl}/blog/${post.slug}`,
          'en': `${baseUrl}/blog/${post.slug}`,
          'ko': `${baseUrl}/ko/blog/${post.slug}`,
        }
      }
    })
    sitemapEntries.push({
      url: `${baseUrl}/ko/blog/${post.slug}`,
      lastModified: new Date(post.updatedDate || post.date),
      alternates: {
        languages: {
          'x-default': `${baseUrl}/blog/${post.slug}`,
          'en': `${baseUrl}/blog/${post.slug}`,
          'ko': `${baseUrl}/ko/blog/${post.slug}`,
        }
      }
    })
  })

  return sitemapEntries
}