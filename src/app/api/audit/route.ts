import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Runs a Google PageSpeed Insights audit on a given URL.
 * Returns scores for Performance / SEO / Accessibility / Best Practices.
 * Public endpoint; optionally uses GOOGLE_PAGESPEED_API_KEY for higher quota.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const url = (body?.url || '').toString().trim()
    if (!url) return NextResponse.json({ error: 'missing url' }, { status: 400 })

    // Basic URL normalization/validation
    let target: URL
    try {
      target = new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      return NextResponse.json({ error: 'invalid url' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY
    const params = new URLSearchParams({
      url: target.toString(),
      strategy: 'mobile',
    })
    for (const cat of ['performance', 'seo', 'accessibility', 'best-practices']) {
      params.append('category', cat)
    }
    if (apiKey) params.set('key', apiKey)

    const psiRes = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
      { next: { revalidate: 0 } }
    )
    if (!psiRes.ok) {
      const text = await psiRes.text()
      return NextResponse.json(
        { error: 'pagespeed-failed', status: psiRes.status, detail: text.slice(0, 300) },
        { status: 502 }
      )
    }
    const data = await psiRes.json()
    const cats = data?.lighthouseResult?.categories || {}
    const audits = data?.lighthouseResult?.audits || {}

    const toScore = (key: string) =>
      cats[key]?.score != null ? Math.round(cats[key].score * 100) : null

    const result = {
      url: target.toString(),
      fetchedAt: Date.now(),
      scores: {
        performance: toScore('performance'),
        seo: toScore('seo'),
        accessibility: toScore('accessibility'),
        bestPractices: toScore('best-practices'),
      },
      metrics: {
        // Core Web Vitals + related
        lcp: audits['largest-contentful-paint']?.numericValue ?? null,
        cls: audits['cumulative-layout-shift']?.numericValue ?? null,
        fcp: audits['first-contentful-paint']?.numericValue ?? null,
        tti: audits['interactive']?.numericValue ?? null,
        tbt: audits['total-blocking-time']?.numericValue ?? null,
        speedIndex: audits['speed-index']?.numericValue ?? null,
      },
      displays: {
        lcp: audits['largest-contentful-paint']?.displayValue ?? null,
        cls: audits['cumulative-layout-shift']?.displayValue ?? null,
        fcp: audits['first-contentful-paint']?.displayValue ?? null,
        tti: audits['interactive']?.displayValue ?? null,
        tbt: audits['total-blocking-time']?.displayValue ?? null,
        speedIndex: audits['speed-index']?.displayValue ?? null,
      },
    }
    return NextResponse.json(result, { status: 200 })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
