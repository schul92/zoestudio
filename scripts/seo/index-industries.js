#!/usr/bin/env node
/**
 * Submit the 14 new industry URLs to Google Indexing API.
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

const URLS = [
  // Industries indexes
  `${BASE}/industries`,
  `${BASE}/ko/industries`,
  // EN industry pages
  `${BASE}/industries/korean-restaurant`,
  `${BASE}/industries/korean-beauty-salon`,
  `${BASE}/industries/korean-church`,
  `${BASE}/industries/korean-academy`,
  `${BASE}/industries/korean-medical-dental`,
  `${BASE}/industries/korean-ecommerce`,
  // KO industry pages (hangul URLs — encode for HTTP)
  `${BASE}/ko/industries/${encodeURIComponent('한식당-웹사이트')}`,
  `${BASE}/ko/industries/${encodeURIComponent('한인-뷰티샵-웹사이트')}`,
  `${BASE}/ko/industries/${encodeURIComponent('한인-교회-홈페이지')}`,
  `${BASE}/ko/industries/${encodeURIComponent('한인-학원-웹사이트')}`,
  `${BASE}/ko/industries/${encodeURIComponent('한인-병원-웹사이트')}`,
  `${BASE}/ko/industries/${encodeURIComponent('한인-쇼핑몰-제작')}`,
]

;(async () => {
  const token = await getToken()
  console.log(`\n📤 Submitting ${URLS.length} industry URLs...\n`)

  let ok = 0,
    fail = 0
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
      console.log(`  ❌ ${url.replace(BASE, '')} — ${body.error?.message?.slice(0, 90) || `HTTP ${res.status}`}`)
      fail++
    }
    await new Promise((r) => setTimeout(r, 150))
  }

  console.log(`\n📊 ${ok}/${URLS.length} submitted${fail ? `, ${fail} failed` : ''}`)

  console.log('\n📋 Resubmitting sitemap (includes new URLs)...')
  const smRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      'sc-domain:zoelumos.com'
    )}/sitemaps/${encodeURIComponent('https://www.zoelumos.com/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  )
  console.log(`  ${smRes.ok ? '✅' : '❌'} Sitemap status: ${smRes.status}`)
})()
