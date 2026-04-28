import { MetadataRoute } from 'next'
import { blogContent } from '@/data/blogContent'
import { koreanCities } from '@/data/koreanCities'
import { industries } from '@/data/industriesData'
import { cityMarkets } from '@/data/cityMarketData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  // Standard pages (English URLs)
  const standardPages = [
    '',
    '/about',
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
    '/bilingual-seo-new-york',
    '/korean-web-design-agencies-nj-compared',
    '/services/kakaotalk-integration',
    '/services/google-business-profile-optimization',
    // Korean-American city hub pages
    ...koreanCities.map((c) => `/${c.slug}`),
  ]

  // Korean SEO pages (Korean URLs - high priority for Korean keywords)
  const koreanSeoPages = [
    // City hub Korean slugs
    ...koreanCities.map((c) => ({ path: `/${c.koSlug}`, enPath: `/${c.slug}`, priority: 0.95 })),
    { path: '/뉴저지-웹사이트', enPath: '/nj-website', priority: 0.95 },
    { path: '/뉴욕-웹사이트', enPath: '/ny-website', priority: 0.95 },
    { path: '/웹사이트-제작', enPath: '/nj-website', priority: 0.95 },
    { path: '/쇼핑몰-제작', enPath: '/pricing', priority: 0.9 },
    { path: '/포트리-웹디자인', enPath: '/fort-lee-web-design', priority: 0.95 },
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
    { path: '/팰팍-마케팅', enPath: '/palisades-park-marketing', priority: 0.95 },
    { path: '/광고대행', enPath: '/pricing', priority: 0.95 },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // English pages (without locale prefix)
  standardPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      alternates: {
        languages: {
          'x-default': `${baseUrl}${page}`,
          'en': `${baseUrl}${page}`,
          'ko': `${baseUrl}/ko${page}`,
        }
      }
    })
  })

  // Korean pages (with /ko prefix for standard pages)
  standardPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}/ko${page}`,
      alternates: {
        languages: {
          'x-default': `${baseUrl}${page}`,
          'en': `${baseUrl}${page}`,
          'ko': `${baseUrl}/ko${page}`,
        }
      }
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