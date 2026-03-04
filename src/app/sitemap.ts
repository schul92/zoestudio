import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const lastModified = new Date()

  // Keep sitemap aligned with currently implemented routes only.
  // This avoids indexing soft-404 URLs and consolidates crawl budget.
  const pages = [
    { url: `${baseUrl}`, locale: 'en', priority: 1.0 },
    { url: `${baseUrl}/ko`, locale: 'ko', priority: 1.0 },
  ]

  return pages.map((page) => ({
    url: page.url,
    lastModified,
    changeFrequency: 'weekly',
    priority: page.priority,
    alternates: {
      languages: {
        'x-default': `${baseUrl}`,
        en: `${baseUrl}`,
        ko: `${baseUrl}/ko`,
      },
    },
  }))
}
