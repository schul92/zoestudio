import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  return {
    rules: [
      // Default rule for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/analytics/', '/private/'],
      },
      // OpenAI - ChatGPT
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Anthropic - Claude
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Google AI (Gemini, SGE, AI Overviews)
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Apple AI (Siri, Apple Intelligence)
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // Microsoft Copilot / Bing AI
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // Common Crawl (used by many AI models)
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // Meta AI
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
