#!/usr/bin/env node
/**
 * Submits EVERY new/updated URL to Google Indexing API + resubmits sitemap.
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

// Load cities
const dataFile = fs.readFileSync(path.join(__dirname, '../../src/data/koreanCities.ts'), 'utf8');
const match = dataFile.match(/export const koreanCities: CityData\[\] = (\[[\s\S]*?\n\])\n\nexport/);
const cities = eval(match[1]);

const BASE = 'https://www.zoelumos.com';

// New blog slugs
const newBlogSlugs = [
  'do-i-need-a-website-korean-business',
  'website-cost-hidden-fees-usa',
  'korean-restaurant-website-essentials',
  'naver-vs-google-korean-business-usa',
  'kakaotalk-channel-us-korean-business',
  'case-study-korean-nail-salon-seo-10x',
  'bilingual-seo-technical-guide-hreflang',
  'wordpress-to-nextjs-korean-business-migration',
];

const URLS = [
  // Korean city hub pages (EN + KO)
  ...cities.flatMap(c => [`${BASE}/${c.slug}`, `${BASE}/ko/${c.koSlug}`]),
  // NJ page (already existed)
  `${BASE}/korean-web-design-new-jersey`,
  `${BASE}/ko/korean-web-design-new-jersey`,
  // New blog posts EN + KO
  ...newBlogSlugs.flatMap(slug => [`${BASE}/blog/${slug}`, `${BASE}/ko/blog/${slug}`]),
  // Blog listing (updated)
  `${BASE}/blog`,
  `${BASE}/ko/blog`,
  // Homepage + canonical-fix beneficiaries
  `${BASE}/`,
  `${BASE}/ko`,
  `${BASE}/pricing`,
  `${BASE}/fort-lee-web-design`,
  `${BASE}/englewood-nj-seo`,
];

(async () => {
  const token = await getToken();
  console.log(`\n📤 Submitting ${URLS.length} URLs to Google Indexing API...\n`);

  let ok = 0, fail = 0, failed = [];
  for (const url of URLS) {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    if (res.ok) {
      console.log(`  ✅ ${url.replace(BASE, '')}`);
      ok++;
    } else {
      const body = await res.json();
      console.log(`  ❌ ${url.replace(BASE, '')} — ${body.error?.message?.slice(0, 80)}`);
      fail++;
      failed.push({ url, error: body.error?.message });
    }
  }

  console.log(`\n📊 ${ok}/${URLS.length} submitted successfully${fail ? `, ${fail} failed` : ''}`);

  // Resubmit sitemap
  console.log('\n📋 Resubmitting sitemap...');
  const smRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/sitemaps/${encodeURIComponent('https://www.zoelumos.com/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`  ${smRes.ok ? '✅' : '❌'} Sitemap status: ${smRes.status}`);
})();
