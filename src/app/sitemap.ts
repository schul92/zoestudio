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
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/pricing`,
          en: `${baseUrl}/pricing`,
          ko: `${baseUrl}/ko/pricing`,
        }
      }
    },
    {
      url: `${baseUrl}/ny-website`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/ny-website`,
          en: `${baseUrl}/ny-website`,
          ko: `${baseUrl}/ko/ny-website`,
        }
      }
    },
    {
      url: `${baseUrl}/nj-website`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/nj-website`,
          en: `${baseUrl}/nj-website`,
          ko: `${baseUrl}/ko/nj-website`,
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
    {
      url: `${baseUrl}/ko/pricing`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/pricing`,
          en: `${baseUrl}/pricing`,
          ko: `${baseUrl}/ko/pricing`,
        }
      }
    },
    {
      url: `${baseUrl}/ko/ny-website`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/ny-website`,
          en: `${baseUrl}/ny-website`,
          ko: `${baseUrl}/ko/ny-website`,
        }
      }
    },
    {
      url: `${baseUrl}/ko/nj-website`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/nj-website`,
          en: `${baseUrl}/nj-website`,
          ko: `${baseUrl}/ko/nj-website`,
        }
      }
    },
  ]

  return [...mainPages, ...koreanPages]
}