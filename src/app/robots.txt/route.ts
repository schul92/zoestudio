import { SITE_URL } from '@/lib/siteUrl'

// Hand-written instead of app/robots.ts: Next's MetadataRoute.Robots cannot emit Content-Signal lines.
// Excluded from the locale middleware by its matcher (robots.txt).
export const dynamic = 'force-static'

// Private and transactional routes: never crawled by search engines or AI crawlers.
const DISALLOW = ['/api/', '/admin/', '/pay/', '/book-demo', '/analytics/', '/private/']

// Cloudflare Content Signals Policy. Every public page may be indexed, quoted in AI answers and used for
// training — the same policy the Allow rules below already express for training crawlers (GPTBot, ClaudeBot,
// CCBot). A crawler obeys only the most specific group naming it (RFC 9309), so the line is repeated per group.
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=yes'

// One group per purpose, so each is a deliberate choice rather than a copy of `*`.
const GROUPS: { purpose: string; agents: string[] }[] = [
  {
    purpose: 'AI search indexes — decide citability in ChatGPT Search, Claude, Perplexity, Copilot, Apple, Amazon, DuckDuckGo',
    agents: ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'Bingbot', 'Applebot', 'Amazonbot', 'DuckAssistBot'],
  },
  {
    purpose: 'User-triggered fetches — an assistant reading a page because a person asked it to',
    agents: ['ChatGPT-User', 'Claude-User', 'Perplexity-User', 'MistralAI-User'],
  },
  {
    purpose: 'Model training and grounding — keeps the studio known to the models themselves',
    agents: [
      'GPTBot',
      'ClaudeBot',
      'Google-Extended',
      'Google-CloudVertexBot',
      'Applebot-Extended',
      'CCBot',
      'meta-externalagent',
      'FacebookBot',
      'cohere-ai',
      'Bytespider',
    ],
  },
  {
    purpose: 'Korean portals — Naver and Daum',
    agents: ['Yeti', 'Daum'],
  },
]

function group(agents: string[], comment?: string) {
  return [
    ...(comment ? [`# ${comment}`] : []),
    ...agents.map((a) => `User-agent: ${a}`),
    `Content-Signal: ${CONTENT_SIGNAL}`,
    'Allow: /',
    ...DISALLOW.map((p) => `Disallow: ${p}`),
  ].join('\n')
}

export function GET() {
  const body = [
    group(['*']),
    ...GROUPS.map((g) => group(g.agents, g.purpose)),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
