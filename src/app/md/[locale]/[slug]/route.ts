import { blogContent } from '@/data/blogContent'
import { blogPostMarkdown, postUrl } from '@/lib/blogMarkdown'

// Reached only through rewrites: /blog/<slug>.md and /ko/blog/<slug>.md (next.config.js), and blog URLs
// requested with `Accept: text/markdown` (middleware). A direct /md/... request is locale-rewritten and 404s.
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return blogContent.flatMap((p) => [
    { locale: 'en', slug: p.slug },
    { locale: 'ko', slug: p.slug },
  ])
}

export function GET(_req: Request, { params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const post = blogContent.find((p) => p.slug === params.slug)
  if (!post) return new Response('Not found', { status: 404 })

  return new Response(blogPostMarkdown(post, locale), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // The HTML page stays the indexed URL; this is the same article as text.
      Link: `<${postUrl(post.slug, locale)}>; rel="canonical"`,
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
