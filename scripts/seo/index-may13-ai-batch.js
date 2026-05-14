#!/usr/bin/env node
/**
 * Submit the 5 new AI-services bilingual posts from 2026-05-13
 * to Google Indexing API + resubmit sitemap.
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

const BASE = 'https://www.zoelumos.com';

const SLUGS = [
  'ai-consulting-korean-small-business-decision-guide-2026',
  'chatgpt-for-korean-restaurant-owners-2026',
  'ai-bilingual-customer-service-korean-business-2026',
  'ai-photography-korean-small-business-2026',
  'ai-google-review-response-korean-business-2026',
];

const URLS = SLUGS.flatMap(slug => [
  `${BASE}/blog/${slug}`,
  `${BASE}/ko/blog/${slug}`,
]);

(async () => {
  const token = await getToken();
  console.log(`\n📤 Submitting ${URLS.length} AI-services URLs to Google Indexing API...\n`);

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

  console.log('\n📋 Resubmitting sitemap...');
  const smRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/sitemaps/${encodeURIComponent('https://www.zoelumos.com/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`  ${smRes.ok ? '✅' : '❌'} Sitemap status: ${smRes.status}`);
})();
