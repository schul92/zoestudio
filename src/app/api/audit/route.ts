import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Website audit endpoint.
 *
 * Primary: Google PageSpeed Insights (real Lighthouse scores). PSI is heavily
 * rate-limited, so we:
 *  - cache results 6h per URL (repeat audits + bots don't re-burn the quota),
 *  - try keyed PSI then fall back to keyless PSI (separate quota pool).
 *
 * Fallback: if PSI is unavailable (rate-limited / down), run a real server-side
 * technical check (HTTPS, response time, title/meta/viewport/canonical/h1/lang/
 * structured data, alt-text coverage, security headers) and return honest
 * heuristic scores flagged as mode:'lite'. The tool always returns something
 * useful instead of dead-ending on an error.
 */

const CACHE_TTL_MS = 6 * 60 * 60 * 1000
const cache = new Map<string, { at: number; data: unknown }>()

type PsiAttempt = { ok: true; data: any } | { ok: false; status: number; detail: string }

async function callPsi(targetUrl: string, apiKey?: string): Promise<PsiAttempt> {
  const params = new URLSearchParams({ url: targetUrl, strategy: 'mobile' })
  for (const cat of ['performance', 'seo', 'accessibility', 'best-practices']) {
    params.append('category', cat)
  }
  if (apiKey) params.set('key', apiKey)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 45_000)
  try {
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
      { signal: controller.signal, cache: 'no-store' }
    )
    if (!res.ok) return { ok: false, status: res.status, detail: (await res.text()).slice(0, 300) }
    return { ok: true, data: await res.json() }
  } catch (e) {
    const aborted = e instanceof Error && e.name === 'AbortError'
    return { ok: false, status: aborted ? 504 : 500, detail: aborted ? 'timeout' : String(e) }
  } finally {
    clearTimeout(timer)
  }
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

/** Real server-side technical check — no external API, always available. */
async function liteAudit(target: URL) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15_000)
  const started = Date.now()
  let res: Response
  try {
    res = await fetch(target.toString(), {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZoeLumosAudit/1.0)' },
      cache: 'no-store',
    })
  } finally {
    clearTimeout(timer)
  }
  const ttfbMs = Date.now() - started
  const html = (await res.text()).slice(0, 600_000)
  const headers = res.headers
  const finalUrl = res.url || target.toString()
  const isHttps = finalUrl.startsWith('https://')

  const has = (re: RegExp) => re.test(html)
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim()
  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0] || ''
  const descContent = (metaDesc.match(/content=["']([^"']*)["']/i)?.[1] || '').trim()
  const hasViewport = has(/<meta[^>]+name=["']viewport["']/i)
  const hasCanonical = has(/<link[^>]+rel=["']canonical["']/i)
  const hasH1 = has(/<h1[\s>]/i)
  const hasLang = has(/<html[^>]+lang=/i)
  const hasOg = has(/<meta[^>]+property=["']og:/i)
  const hasStructuredData = has(/application\/ld\+json/i)
  const isNoindex = has(/<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i)
  const imgs = html.match(/<img\b[^>]*>/gi) || []
  const imgsWithAlt = imgs.filter((t) => /\balt=/i.test(t)).length
  const altRatio = imgs.length ? imgsWithAlt / imgs.length : 1
  const mixedContent = isHttps && /(?:src|href)=["']http:\/\//i.test(html)
  const hsts = headers.has('strict-transport-security')
  const xcto = (headers.get('x-content-type-options') || '').toLowerCase().includes('nosniff')
  const hasCsp = headers.has('content-security-policy')

  // Honest heuristic scores (correlate with Lighthouse for SEO/A11y/BP; perf is directional)
  const seo = clamp(
    (title ? 22 : 0) +
      (title.length >= 10 && title.length <= 65 ? 8 : 0) +
      (descContent ? 22 : 0) +
      (hasCanonical ? 12 : 0) +
      (hasH1 ? 12 : 0) +
      (hasViewport ? 8 : 0) +
      (hasStructuredData ? 8 : 0) +
      (isNoindex ? 0 : 8)
  )
  const accessibility = clamp(
    (hasLang ? 22 : 0) + (hasViewport ? 18 : 0) + altRatio * 38 + (title ? 12 : 0) + (hasH1 ? 10 : 0)
  )
  const bestPractices = clamp(
    (isHttps ? 45 : 0) +
      (mixedContent ? 0 : 18) +
      (hsts ? 13 : 0) +
      (xcto ? 12 : 0) +
      (hasCsp ? 12 : 0)
  )
  // Perf from TTFB + payload size (rough but real). <600ms & <600KB ≈ great.
  const sizeKB = html.length / 1024
  const perf = clamp(100 - Math.max(0, (ttfbMs - 500) / 28) - Math.max(0, (sizeKB - 400) / 30))

  return {
    url: finalUrl,
    fetchedAt: Date.now(),
    mode: 'lite' as const,
    scores: { performance: perf, seo, accessibility, bestPractices },
    metrics: { lcp: null, cls: null, fcp: null, tti: null, tbt: null, speedIndex: null },
    displays: {
      lcp: null,
      cls: null,
      fcp: null,
      tti: null,
      tbt: null,
      speedIndex: `${ttfbMs} ms`, // real time-to-first-byte
    },
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const raw = (body?.url || '').toString().trim()
    if (!raw) return NextResponse.json({ error: 'missing-url' }, { status: 400 })

    let target: URL
    try {
      target = new URL(raw.startsWith('http') ? raw : `https://${raw}`)
    } catch {
      return NextResponse.json({ error: 'invalid-url' }, { status: 400 })
    }
    if (!/^https?:$/.test(target.protocol)) {
      return NextResponse.json({ error: 'invalid-url' }, { status: 400 })
    }

    const cacheKey = `mobile:${target.toString()}`
    const hit = cache.get(cacheKey)
    if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
      return NextResponse.json(hit.data, { status: 200, headers: { 'x-audit-cache': 'hit' } })
    }

    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY
    let attempt = await callPsi(target.toString(), apiKey)
    if (!attempt.ok && apiKey && [429, 403, 500, 502, 503].includes(attempt.status)) {
      attempt = await callPsi(target.toString()) // keyless fallback (separate quota)
    }

    if (attempt.ok) {
      const data = attempt.data
      const cats = data?.lighthouseResult?.categories || {}
      const audits = data?.lighthouseResult?.audits || {}
      const toScore = (key: string) =>
        cats[key]?.score != null ? Math.round(cats[key].score * 100) : null
      const result = {
        url: target.toString(),
        fetchedAt: Date.now(),
        mode: 'full' as const,
        scores: {
          performance: toScore('performance'),
          seo: toScore('seo'),
          accessibility: toScore('accessibility'),
          bestPractices: toScore('best-practices'),
        },
        metrics: {
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
      if (result.scores.performance != null || result.scores.seo != null) {
        cache.set(cacheKey, { at: Date.now(), data: result })
      }
      return NextResponse.json(result, { status: 200, headers: { 'x-audit-cache': 'miss' } })
    }

    // PSI unavailable → real server-side lite audit so the tool never dead-ends.
    try {
      const lite = await liteAudit(target)
      cache.set(cacheKey, { at: Date.now(), data: lite })
      return NextResponse.json(lite, { status: 200, headers: { 'x-audit-cache': 'lite' } })
    } catch {
      // PSI was unavailable AND we couldn't fetch the page directly → unreachable.
      return NextResponse.json({ error: 'unreachable', psiStatus: attempt.status }, { status: 502 })
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
