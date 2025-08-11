import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zoestudio.com'
  const lastModified = new Date()

  const routes = [
    '',
    '/about',
  ]

  const languages = ['en', 'ko']

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate entries for each language and route combination
  languages.forEach(lang => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ko: `${baseUrl}/ko${route}`,
          }
        }
      })
    })
  })

  return sitemapEntries
}