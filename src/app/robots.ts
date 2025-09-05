import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', 
          '/analytics/', 
          '/en/'  // Only block /en/ redirects, not /_next/
        ],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap-ko.xml`],
    host: baseUrl,
  }
}