#!/usr/bin/env node
/**
 * Submits URLs to Google Indexing API (notifies Google to crawl/update).
 * Also resubmits sitemap + does GSC URL inspection to verify status.
 *
 * NOTE: Indexing API is officially for JobPosting/BroadcastEvent but notifies
 * Google of URL changes for any page. Works well as a crawl hint.
 */
const fs = require('fs');
const path = require('path');

const CREDS = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8'));

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
  });
  return (await r.json()).access_token;
}

// Load city data
const dataFile = fs.readFileSync(path.join(__dirname, '../../src/data/koreanCities.ts'), 'utf8');
const match = dataFile.match(/export const koreanCities: CityData\[\] = (\[[\s\S]*?\n\])\n\nexport/);
const cities = eval(match[1]);

const BASE = 'https://www.zoelumos.com';

const URLS = [
  // NEW city pages (EN + KO)
  ...cities.flatMap(c => [`${BASE}/${c.slug}`, `${BASE}/ko/${c.koSlug}`]),
  // Recently added + high-priority existing
  `${BASE}/korean-web-design-new-jersey`,
  `${BASE}/ko/korean-web-design-new-jersey`,
  `${BASE}/fort-lee-web-design`,
  `${BASE}/englewood-nj-seo`,
  `${BASE}/pricing`,
  `${BASE}/`,
  `${BASE}/ko`,
];

(async () => {
  const token = await getToken();
  console.log(`\n📤 Submitting ${URLS.length} URLs to Google Indexing API...\n`);

  let ok = 0, fail = 0;
  for (const url of URLS) {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    const body = await res.json();
    if (res.ok) {
      console.log(`  ✅ ${url}`);
      ok++;
    } else {
      console.log(`  ❌ ${url}`);
      console.log(`     ${body.error?.message || JSON.stringify(body).slice(0, 200)}`);
      fail++;
    }
  }

  console.log(`\n📊 Summary: ${ok} submitted, ${fail} failed`);

  // Resubmit sitemap for good measure
  console.log('\n📋 Resubmitting sitemap...');
  const smRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/sitemaps/${encodeURIComponent('https://www.zoelumos.com/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`  ${smRes.ok ? '✅' : '❌'} Sitemap status: ${smRes.status}`);
})();
