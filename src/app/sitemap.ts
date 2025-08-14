import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  const lastModified = new Date()

  // Main pages without locale prefix (treated as English)
  const mainPages = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          'x-default': `${baseUrl}`,
          en: `${baseUrl}`,
          ko: `${baseUrl}/ko`,
        }
      }
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/about`,
          en: `${baseUrl}/about`,
          ko: `${baseUrl}/ko/about`,
        }
      }
    },
  ]

  // Korean pages with /ko prefix
  const koreanPages = [
    {
      url: `${baseUrl}/ko`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          'x-default': `${baseUrl}`,
          en: `${baseUrl}`,
          ko: `${baseUrl}/ko`,
        }
      }
    },
    {
      url: `${baseUrl}/ko/about`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/about`,
          en: `${baseUrl}/about`,
          ko: `${baseUrl}/ko/about`,
        }
      }
    },
  ]

  return [...mainPages, ...koreanPages]
}