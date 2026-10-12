import { blogContent } from '@/data/blogContent'
import { SITE_URL } from '@/lib/siteUrl'

// Korean blog feed — submitted to Naver Search Advisor (요청 › RSS 제출) so new posts get crawled
// quickly, and usable by any feed reader. Excluded from the locale middleware like sitemap.xml.
export const dynamic = 'force-static'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const posts = [...blogContent]
    .sort((a, b) => (b.updatedDate || b.date).localeCompare(a.updatedDate || a.date))
    .slice(0, 50)

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/ko/blog/${p.slug}`
      return [
        '    <item>',
        `      <title>${esc(p.title.ko)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${esc(p.metaDescription.ko)}</description>`,
        `      <category>${esc(p.category.ko)}</category>`,
        `      <pubDate>${new Date(p.date).toUTCString()}</pubDate>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const latest = posts[0] ? new Date(posts[0].updatedDate || posts[0].date) : new Date()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>조이루모스 ZOE LUMOS 블로그</title>
    <link>${SITE_URL}/ko/blog</link>
    <description>미국 한인 비즈니스와 미국 진출 기업을 위한 웹사이트·SEO·AI 검색 가이드</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
