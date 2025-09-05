import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  const lastModified = new Date().toISOString()
  
  const pages = [
    { url: '', priority: '1.0' },
    { url: '/about', priority: '0.8' },
    { url: '/pricing', priority: '0.9' },
    { url: '/ny-website', priority: '0.95' },
    { url: '/nj-website', priority: '0.95' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${baseUrl}/ko${page.url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.url === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="ko" href="${baseUrl}/ko${page.url}"/>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}