import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const lastModified = new Date()

  // Standard pages (English URLs)
  const standardPages = [
    '',
    '/about',
    '/portfolio',
    '/pricing',
    '/ny-website',
    '/nj-website',
    '/fort-lee-web-design',
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
    '/korean-restaurant-website',
  ]

  // Korean SEO pages (Korean URLs - high priority for Korean keywords)
  const koreanSeoPages = [
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
    { path: '/한식당-웹사이트', enPath: '/korean-restaurant-website', priority: 0.95 },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // English pages (without locale prefix)
  standardPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      lastModified,
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : page.includes('website') ? 0.95 : page === '/pricing' ? 0.9 : 0.8,
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
      lastModified,
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : page.includes('website') ? 0.95 : page === '/pricing' ? 0.9 : 0.8,
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
  // Only include Korean locale versions with Korean URLs
  koreanSeoPages.forEach((page) => {
    // Korean version with Korean URL (primary for Korean SEO)
    sitemapEntries.push({
      url: `${baseUrl}/ko${page.path}`,
      lastModified,
      changeFrequency: 'daily',
      priority: page.priority,
      alternates: {
        languages: {
          'x-default': `${baseUrl}${page.enPath}`,
          'en': `${baseUrl}${page.enPath}`,
          'ko': `${baseUrl}/ko${page.path}`,
        }
      }
    })
  })

  return sitemapEntries
}