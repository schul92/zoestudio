#!/usr/bin/env node
/**
 * Submits the redesigned URLs to Google Indexing API.
 * Run after deploying the luxury-bright redesign to force Google to
 * re-crawl the pages with updated titles/content/schemas.
 */
const fs = require('fs')
const path = require('path')

const CREDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')
).web
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8')
)

async function getToken() {
  const r = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CREDS.client_id,
      client_secret: CREDS.client_secret,
      refresh_token: tokens.refresh_token,
      grant_type: 'refresh_token',
    }),
  })
  return (await r.json()).access_token
}

const BASE = 'https://www.zoelumos.com'

// Highest-value URLs impacted by the luxury-bright redesign.
// Prioritise new URL + heavily-changed landing pages first.
const URLS = [
  // Brand new URL
  `${BASE}/blog/why-anthropic-chose-aws`,
  `${BASE}/ko/blog/why-anthropic-chose-aws`,

  // Homepage (new title, meta, schemas)
  `${BASE}/`,
  `${BASE}/ko`,

  // Redesigned sections
  `${BASE}/portfolio`,
  `${BASE}/ko/portfolio`,
  `${BASE}/blog`,
  `${BASE}/ko/blog`,
  `${BASE}/about`,
  `${BASE}/ko/about`,
  `${BASE}/pricing`,
  `${BASE}/ko/pricing`,

  // Existing blog posts that now use the new theme
  `${BASE}/blog/korean-business-website-guide-2026`,
  `${BASE}/ko/blog/korean-business-website-guide-2026`,
  `${BASE}/blog/wordpress-to-nextjs-korean-business-migration`,
  `${BASE}/ko/blog/wordpress-to-nextjs-korean-business-migration`,
  `${BASE}/blog/bilingual-seo-technical-guide-hreflang`,
  `${BASE}/ko/blog/bilingual-seo-technical-guide-hreflang`,

  // Top converting state/city pages (got new schemas via layout)
  `${BASE}/nj-website`,
  `${BASE}/ny-website`,
  `${BASE}/ca-website`,
  `${BASE}/fort-lee-web-design`,
  `${BASE}/ko/뉴저지-웹사이트`,
  `${BASE}/ko/뉴욕-웹사이트`,
  `${BASE}/ko/캘리포니아-웹사이트`,
  `${BASE}/ko/포트리-웹디자인`,
]

;(async () => {
  const token = await getToken()
  console.log(`\n📤 Submitting ${URLS.length} URLs to Google Indexing API...\n`)

  let ok = 0,
    fail = 0
  const failed = []

  for (const url of URLS) {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    })
    if (res.ok) {
      console.log(`  ✅ ${url.replace(BASE, '')}`)
      ok++
    } else {
      const body = await res.json().catch(() => ({}))
      const msg = body.error?.message?.slice(0, 100) || `HTTP ${res.status}`
      console.log(`  ❌ ${url.replace(BASE, '')} — ${msg}`)
      fail++
      failed.push({ url, error: msg })
    }
    // Brief pause — be polite
    await new Promise((r) => setTimeout(r, 150))
  }

  console.log(
    `\n📊 ${ok}/${URLS.length} submitted${fail ? `, ${fail} failed` : ''}`
  )

  if (failed.length) {
    console.log('\nFailed URLs:')
    for (const f of failed) console.log(`  - ${f.url}: ${f.error}`)
  }

  // Resubmit sitemap so Google discovers anything we missed
  console.log('\n📋 Resubmitting sitemap to Search Console...')
  const smRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      'sc-domain:zoelumos.com'
    )}/sitemaps/${encodeURIComponent('https://www.zoelumos.com/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  )
  console.log(`  ${smRes.ok ? '✅' : '❌'} Sitemap status: ${smRes.status}`)
})()
