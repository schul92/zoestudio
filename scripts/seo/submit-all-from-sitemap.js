#!/usr/bin/env node
/**
 * Pulls every URL from the live sitemap.xml and submits each to the
 * Google Indexing API. Resubmits the sitemap itself at the end.
 *
 * Submits in parallel batches of 10 with retry+backoff on 429/503.
 *
 * Usage: node scripts/seo/submit-all-from-sitemap.js
 *
 * Requires: .config/google-oauth.json + .config/gbp-token.json
 * If the OAuth token is expired, run `node scripts/seo/reauth.js` first.
 */
const fs = require('fs');
const path = require('path');

const CREDS_PATH = path.join(__dirname, '../../.config/google-oauth.json');
const TOKEN_PATH = path.join(__dirname, '../../.config/gbp-token.json');

if (!fs.existsSync(CREDS_PATH) || !fs.existsSync(TOKEN_PATH)) {
  console.error('Missing .config/google-oauth.json or .config/gbp-token.json — run scripts/seo/reauth.js first');
  process.exit(1);
}

const CREDS = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

const SITEMAP_URL = 'https://www.zoelumos.com/sitemap.xml';
const BATCH_SIZE = 10;
const SITE = 'sc-domain:zoelumos.com';

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
  const body = await r.json();
  if (!r.ok || !body.access_token) {
    throw new Error(`OAuth refresh failed: ${body.error_description || JSON.stringify(body)}. Run scripts/seo/reauth.js to re-authenticate.`);
  }
  return body.access_token;
}

async function fetchSitemapUrls() {
  const r = await fetch(SITEMAP_URL);
  if (!r.ok) throw new Error(`Failed to fetch sitemap: ${r.status}`);
  const xml = await r.text();
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) urls.push(m[1].trim());
  return urls;
}

async function submitOne(token, url, attempt = 1) {
  try {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    if (res.ok) return { ok: true, url };
    const body = await res.json().catch(() => ({}));
    const msg = body.error?.message || `HTTP ${res.status}`;
    if (attempt < 3 && (res.status === 429 || res.status === 503 || res.status >= 500)) {
      const wait = 8000 * attempt;
      await new Promise((r) => setTimeout(r, wait));
      return submitOne(token, url, attempt + 1);
    }
    return { ok: false, url, err: msg };
  } catch (e) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 5000 * attempt));
      return submitOne(token, url, attempt + 1);
    }
    return { ok: false, url, err: e.message };
  }
}

async function submitInBatches(token, urls) {
  const results = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const slice = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(urls.length / BATCH_SIZE);
    process.stdout.write(`  batch ${batchNum}/${totalBatches} (${slice.length} URLs)... `);
    const batchResults = await Promise.all(slice.map((u) => submitOne(token, u)));
    const batchOk = batchResults.filter((r) => r.ok).length;
    process.stdout.write(`${batchOk}/${slice.length} ok\n`);
    results.push(...batchResults);
    // gentle pacing — avoid hammering the API
    if (i + BATCH_SIZE < urls.length) await new Promise((r) => setTimeout(r, 1500));
  }
  return results;
}

(async () => {
  console.log('🔑 Refreshing OAuth token...');
  let token;
  try {
    token = await getToken();
    console.log('   ✅ token ok');
  } catch (e) {
    console.error(`   ❌ ${e.message}`);
    process.exit(1);
  }

  console.log(`\n🗺️  Fetching sitemap: ${SITEMAP_URL}`);
  const urls = await fetchSitemapUrls();
  console.log(`   ✅ ${urls.length} URLs found in sitemap`);

  console.log(`\n📤 Submitting ${urls.length} URLs to Google Indexing API (batches of ${BATCH_SIZE})...\n`);
  const results = await submitInBatches(token, urls);
  const ok = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok);

  console.log(`\n📊 Summary: ${ok}/${urls.length} submitted successfully${fail.length ? `, ${fail.length} failed` : ''}`);
  if (fail.length > 0) {
    console.log('\nFailed URLs (first 10):');
    fail.slice(0, 10).forEach((r) => console.log(`  ❌ ${r.url}\n     ${r.err}`));
    if (fail.length > 10) console.log(`  ... and ${fail.length - 10} more`);
  }

  console.log('\n📋 Resubmitting sitemap to Search Console...');
  const smRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`   ${smRes.ok ? '✅' : '❌'} sitemap status: ${smRes.status}`);

  // Bing IndexNow — free additional submission to Bing/Copilot
  console.log('\n🅱️  Pinging Bing IndexNow with all URLs...');
  try {
    const ixRes = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'www.zoelumos.com',
        key: 'e0a469877ff0c7c06436ab1285d726f4',
        keyLocation: 'https://www.zoelumos.com/e0a469877ff0c7c06436ab1285d726f4.txt',
        urlList: urls,
      }),
    });
    console.log(`   ${ixRes.ok ? '✅' : '⚠️ '} Bing IndexNow status: ${ixRes.status}`);
  } catch (e) {
    console.log(`   ⚠️  Bing IndexNow skipped: ${e.message}`);
  }

  process.exit(fail.length > 0 ? 0 : 0);
})();
