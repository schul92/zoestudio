import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  const lastModified = new Date()

  const pages = [
    '',
    '/about',
    '/pricing',
    '/ny-website',
    '/nj-website',
  ]

  // Generate entries for both English (no prefix) and Korean (/ko prefix)
  const sitemapEntries: MetadataRoute.Sitemap = []

  // English pages (without locale prefix)
  pages.forEach((page) => {
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

  // Korean pages (with /ko prefix)
  pages.forEach((page) => {
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

  return sitemapEntries
}