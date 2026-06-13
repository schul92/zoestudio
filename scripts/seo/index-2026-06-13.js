#!/usr/bin/env node
/**
 * Submit the 2026-06-13 batch to Google Indexing API + resubmit sitemap:
 *  - 4 new GSC-gap blog posts (EN + KO)
 *  - new /tools hub + cost estimator (EN + KO)
 *  - 2 previously "Discovered – not indexed" posts (nudge recrawl)
 *  - 2 canonical-fixed pages that were "Alternate page" (recrawl with www canonical)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const CREDS = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/gbp-token.json'), 'utf8'));
const BASE = 'https://www.zoelumos.com';

const newBlogs = [
  'korean-business-marketing-atlanta-johns-creek-suwanee-2026',
  'korean-seo-guide-american-businesses-2026',
  'kakaotalk-advertising-cost-roi-korean-business-2026',
  'korean-business-local-seo-englewood-bergen-county-nj-2026',
];
const stuckBlogs = [
  'kakaotalk-advertising-agency-usa-guide-2026',
  'korean-salon-spa-local-seo-new-jersey-2026',
];

const URLS = [
  ...newBlogs.flatMap((s) => [`${BASE}/blog/${s}`, `${BASE}/ko/blog/${s}`]),
  ...stuckBlogs.flatMap((s) => [`${BASE}/blog/${s}`, `${BASE}/ko/blog/${s}`]),
  `${BASE}/tools`, `${BASE}/ko/tools`,
  `${BASE}/tools/website-cost-estimator`, `${BASE}/ko/tools/website-cost-estimator`,
  // canonical-fixed pages (were "Alternate page with proper canonical tag")
  `${BASE}/flushing-korean-web-design`, `${BASE}/ga-website`,
];

async function getToken() {
  const r = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CREDS.client_id, client_secret: CREDS.client_secret,
      refresh_token: tokens.refresh_token, grant_type: 'refresh_token',
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

(async () => {
  const token = await getToken();
  console.log(`\n📡 Submitting ${URLS.length} URLs to Google Indexing API\n`);
  let ok = 0;
  for (const url of URLS) {
    const res = await notify(token, url);
    const good = res.status === 200;
    if (good) ok++;
    console.log(`  ${good ? '✅' : '❌'} ${res.status}  ${url}${good ? '' : '  ' + JSON.stringify(res.body).slice(0, 160)}`);
    await new Promise((r) => setTimeout(r, 200));
  }
  const s = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/sitemaps/${encodeURIComponent(BASE + '/sitemap.xml')}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`\n🔄 Sitemap resubmit — ${s.status === 200 || s.status === 204 ? '✅' : '⚠️'} ${s.status}`);
  console.log(`\n📊 ${ok}/${URLS.length} submitted OK.`);
})();
