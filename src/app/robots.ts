import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

// Private and transactional routes: never crawled by search engines or AI crawlers.
const DISALLOW = ['/api/', '/admin/', '/pay/', '/book-demo', '/analytics/', '/private/']

// AI assistants and regional search engines, each allowed on every public page.
const NAMED_CRAWLERS = [
  'GPTBot', // OpenAI - ChatGPT
  'ChatGPT-User',
  'OAI-SearchBot', // OpenAI Search
  'ClaudeBot', // Anthropic - Claude
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended', // Google AI (Gemini, AI Overviews)
  'Applebot-Extended', // Apple Intelligence
  'Bingbot', // Microsoft Copilot / Bing
  'CCBot', // Common Crawl
  'FacebookBot', // Meta AI
  'cohere-ai',
  'Yeti', // Naver — Korean search market
  'Daum', // Daum — Korean portal
  'Bytespider', // ByteDance — Doubao AI / TikTok search
]

export default function robots(): MetadataRoute.Robots {
  // Force www host even if Vercel env var is set to non-www apex
  const baseUrl = SITE_URL

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...NAMED_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
