import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  const lastModified = new Date()

  // Standard pages (English URLs)
  const standardPages = [
    '',
    '/about',
    '/portfolio',
    '/pricing',
    '/ny-website',
    '/nj-website',
    '/privacy',
    '/terms',
    '/reviews',
    '/blog',
  ]

  // Korean SEO pages (Korean URLs - high priority for Korean keywords)
  const koreanSeoPages = [
    { path: '/뉴저지-웹사이트', enPath: '/nj-website', priority: 0.95 },
    { path: '/뉴욕-웹사이트', enPath: '/ny-website', priority: 0.95 },
    { path: '/웹사이트-제작', enPath: '/website-design', priority: 0.9 },
    { path: '/쇼핑몰-제작', enPath: '/ecommerce', priority: 0.9 },
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
  koreanSeoPages.forEach((page) => {
    // Korean version with Korean URL
    sitemapEntries.push({
      url: `${baseUrl}/ko${page.path}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: page.priority,
      alternates: {
        languages: {
          'x-default': `${baseUrl}${page.enPath || page.path}`,
          'en': `${baseUrl}${page.enPath || page.path}`,
          'ko': `${baseUrl}/ko${page.path}`,
        }
      }
    })

    // English version with Korean URL (for cross-linking)
    sitemapEntries.push({
      url: `${baseUrl}${page.path}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: page.priority - 0.1,
      alternates: {
        languages: {
          'x-default': `${baseUrl}${page.enPath || page.path}`,
          'en': `${baseUrl}${page.path}`,
          'ko': `${baseUrl}/ko${page.path}`,
        }
      }
    })
  })

  return sitemapEntries
}