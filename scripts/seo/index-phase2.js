const fs = require('fs');
const path = require('path');
const CREDS = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8'));

const BASE = 'https://www.zoelumos.com';
const slugs = [
  'korean-nail-salon-website-guide',
  'korean-dental-practice-website-guide',
  'korean-law-firm-website-guide',
  'korean-real-estate-agent-website',
  'korean-church-website-guide',
  'korean-tutoring-sat-prep-website',
  'korean-medspa-aesthetic-clinic-website',
  'korean-hair-salon-website-guide',
  'korean-insurance-financial-services-website',
];

const URLS = [
  ...slugs.flatMap(s => [`${BASE}/blog/${s}`, `${BASE}/ko/blog/${s}`]),
  `${BASE}/blog`, `${BASE}/ko/blog`,
];

(async () => {
  const tr = await fetch(CREDS.token_uri, {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: CREDS.client_id, client_secret: CREDS.client_secret, refresh_token: tokens.refresh_token, grant_type: 'refresh_token' }),
  });
  const token = (await tr.json()).access_token;
  let ok = 0;
  for (const url of URLS) {
    const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    console.log(`${r.ok ? '✅' : '❌'} ${url.replace(BASE, '')}`);
    if (r.ok) ok++;
  }
  console.log(`\n📊 ${ok}/${URLS.length} submitted`);

  // Resubmit sitemap
  const sm = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/sitemaps/${encodeURIComponent(`${BASE}/sitemap.xml`)}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
  console.log(`📋 Sitemap: ${sm.ok ? '✅' : '❌'} ${sm.status}`);
})();
