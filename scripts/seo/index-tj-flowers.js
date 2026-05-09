#!/usr/bin/env node
/**
 * Submits TJ Flowers case study URLs (EN + KO) to Google Indexing API
 * and resubmits the sitemap so Google picks up the new entry quickly.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const CREDS = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/gbp-token.json'), 'utf8'));

const BASE = 'https://www.zoelumos.com';
const SLUG = 'tj-flowers-shopify-revamp-case-study';
const URLS = [
  `${BASE}/blog/${SLUG}`,
  `${BASE}/ko/blog/${SLUG}`,
];

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
  const j = await r.json();
  if (j.error) throw new Error(JSON.stringify(j));
  return j.access_token;
}

async function notify(token, url) {
  const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  });
  return { status: r.status, body: await r.json() };
}

async function pingSitemap(token) {
  const r = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/sitemaps/${encodeURIComponent(BASE + '/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  return r.status;
}

(async () => {
  const token = await getToken();
  console.log('\n📡 Submitting TJ Flowers case study to Google Indexing API\n');
  for (const url of URLS) {
    const res = await notify(token, url);
    const ok = res.status === 200;
    console.log(`  ${ok ? '✅' : '❌'} ${url} — ${res.status}${ok ? '' : '  ' + JSON.stringify(res.body).slice(0, 200)}`);
  }
  console.log('\n🔄 Resubmitting sitemap');
  const s = await pingSitemap(token);
  console.log(`  ${s === 200 || s === 204 ? '✅' : '⚠️'} sitemap.xml — ${s}`);
  console.log('\nDone.');
})();
