#!/usr/bin/env node
/**
 * Submits EVERY page on zoelumos.com to Google Indexing API.
 * Pulls URLs directly from the live sitemap.
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
      client_id: CREDS.client_id, client_secret: CREDS.client_secret,
      refresh_token: tokens.refresh_token, grant_type: 'refresh_token',
    }),
  });
  return (await r.json()).access_token;
}

(async () => {
  // Fetch live sitemap and extract all URLs
  console.log('📥 Fetching live sitemap...');
  const smRes = await fetch('https://www.zoelumos.com/sitemap.xml');
  const xml = await smRes.text();
  const urls = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`Found ${urls.length} URLs in sitemap\n`);

  const token = await getToken();
  let ok = 0, fail = 0;

  console.log(`📤 Submitting all ${urls.length} URLs to Indexing API...\n`);
  for (const url of urls) {
    const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    const short = url.replace('https://zoelumos.com', '').replace('https://www.zoelumos.com', '');
    if (r.ok) { console.log(`  ✅ ${short}`); ok++; }
    else { const b = await r.json(); console.log(`  ❌ ${short} — ${(b.error?.message || '').slice(0, 60)}`); fail++; }
  }

  console.log(`\n📊 ${ok}/${urls.length} submitted, ${fail} failed`);

  // Resubmit sitemap
  const sm = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/sitemaps/${encodeURIComponent('https://www.zoelumos.com/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`📋 Sitemap resubmit: ${sm.ok ? '✅' : '❌'} ${sm.status}`);
})();
