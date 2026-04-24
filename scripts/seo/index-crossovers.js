#!/usr/bin/env node
/**
 * Submit all crossover pages + /audit to Google Indexing API.
 * 60 city × industry crossovers (EN + KO) + 2 audit pages = 62 URLs.
 *
 * Note: Google's Indexing API allows 200 URL publishes per day per project.
 * 62 fits comfortably.
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

const INDUSTRIES = [
  { en: 'korean-restaurant', ko: '한식당-웹사이트' },
  { en: 'korean-beauty-salon', ko: '한인-뷰티샵-웹사이트' },
  { en: 'korean-church', ko: '한인-교회-홈페이지' },
  { en: 'korean-academy', ko: '한인-학원-웹사이트' },
  { en: 'korean-medical-dental', ko: '한인-병원-웹사이트' },
  { en: 'korean-ecommerce', ko: '한인-쇼핑몰-제작' },
]

const CITIES = [
  { en: 'fort-lee-nj', ko: '포트리' },
  { en: 'flushing-ny', ko: '플러싱' },
  { en: 'palisades-park-nj', ko: '팰팍' },
  { en: 'la-koreatown', ko: 'LA-코리아타운' },
  { en: 'atlanta-duluth-ga', ko: '애틀랜타-둘루스' },
]

const URLS = []
// Audit tool
URLS.push(`${BASE}/audit`, `${BASE}/ko/audit`)
// All 60 crossover pages
for (const ind of INDUSTRIES) {
  for (const city of CITIES) {
    URLS.push(`${BASE}/industries/${ind.en}/${city.en}`)
    URLS.push(`${BASE}/ko/industries/${encodeURIComponent(ind.ko)}/${encodeURIComponent(city.ko)}`)
  }
}

;(async () => {
  const token = await getToken()
  console.log(`\n📤 Submitting ${URLS.length} URLs to Google Indexing API...\n`)

  let ok = 0
  let fail = 0
  for (const url of URLS) {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    })
    if (res.ok) {
      const short = url.replace(BASE, '').replace(/%[0-9A-F]{2}/gi, (m) => {
        try { return decodeURIComponent(m) } catch { return m }
      })
      console.log(`  ✅ ${short}`)
      ok++
    } else {
      const body = await res.json().catch(() => ({}))
      const msg = body.error?.message?.slice(0, 100) || `HTTP ${res.status}`
      console.log(`  ❌ ${url.replace(BASE, '')} — ${msg}`)
      fail++
    }
    await new Promise((r) => setTimeout(r, 120))
  }

  console.log(`\n📊 ${ok}/${URLS.length} submitted${fail ? `, ${fail} failed` : ''}`)

  console.log('\n📋 Resubmitting sitemap...')
  const smRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      'sc-domain:zoelumos.com'
    )}/sitemaps/${encodeURIComponent('https://www.zoelumos.com/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  )
  console.log(`  ${smRes.ok ? '✅' : '❌'} Sitemap status: ${smRes.status}`)
})()
