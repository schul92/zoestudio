#!/usr/bin/env node
/**
 * Bulk submit a list of URLs to Google Indexing API + resubmit sitemap.
 * Used after a content drop or title/meta refresh.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const CREDS = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/gbp-token.json'), 'utf8'));
const BASE = 'https://www.zoelumos.com';

const SLUGS = [
  'tj-flowers-shopify-revamp-case-study',
  'korean-restaurant-own-app-vs-doordash',
  'pwa-vs-native-app-korean-smb',
  'app-store-submission-korean-business-guide',
  'kakaotalk-channel-us-korean-business',
  'local-seo-guide-korean-business-2026',
  'do-i-need-a-website-korean-business',
  'shopify-korean-ecommerce',
  'yelp-ads-vs-google-ads-korean-restaurant',
];

const URLS = SLUGS.flatMap((s) => [`${BASE}/blog/${s}`, `${BASE}/ko/blog/${s}`]);

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

(async () => {
  const token = await getToken();
  console.log(`\n📡 Submitting ${URLS.length} URLs to Google Indexing API\n`);
  let ok = 0, fail = 0;
  for (const url of URLS) {
    const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    const status = r.status === 200;
    if (status) ok++; else fail++;
    console.log(`  ${status ? '✅' : '❌'} ${r.status}  ${url}`);
  }
  console.log(`\n📊 ${ok}/${URLS.length} submitted${fail ? `, ${fail} failed` : ''}`);

  console.log('\n🔄 Resubmitting sitemap');
  const s = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/sitemaps/${encodeURIComponent(BASE + '/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`  ${s.status === 200 || s.status === 204 ? '✅' : '⚠️'} ${s.status}`);
})();
