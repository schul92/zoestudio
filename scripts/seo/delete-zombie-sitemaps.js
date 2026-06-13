#!/usr/bin/env node
/**
 * Delete the 9 known-broken "zombie" sitemap entries from GSC for sc-domain:zoelumos.com.
 *
 * These are old/erroneous submissions (pages submitted as sitemaps, a non-www
 * duplicate sitemap.xml, and a typo'd .xm) that throw errors in GSC and muddy
 * sitemap processing. The REAL sitemap (https://www.zoelumos.com/sitemap.xml)
 * is explicitly excluded and guarded — it will never be deleted.
 *
 * Usage:  node scripts/seo/delete-zombie-sitemaps.js
 *         node scripts/seo/delete-zombie-sitemaps.js --dry-run   (list only, no deletes)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const CREDS = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/google-oauth.json'), 'utf8')).web;
const TOK = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/gbp-token.json'), 'utf8'));

const SITE = 'sc-domain:zoelumos.com';
const REAL = 'https://www.zoelumos.com/sitemap.xml'; // never delete this

const ZOMBIES = [
  'https://zoelumos.com/ko',
  'https://zoelumos.com/ko/%EB%89%B4%EC%9A%95-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8',
  'https://zoelumos.com/ko/%EB%89%B4%EC%A0%80%EC%A7%80-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8',
  'https://zoelumos.com/sitemap.xml',
  'https://zoelumos.com/sitemap-ko.xml',
  'https://www.zoelumos.com/sitemap.xm',
  'https://www.zoelumos.com/pricing',
  'https://www.zoelumos.com/ny-website',
  'https://www.zoelumos.com/nj-website',
];

const DRY = process.argv.includes('--dry-run');

async function token() {
  const r = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CREDS.client_id,
      client_secret: CREDS.client_secret,
      refresh_token: TOK.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  const j = await r.json();
  if (j.error) throw new Error(JSON.stringify(j));
  return j.access_token;
}

(async () => {
  const at = await token();
  console.log(`${DRY ? '[DRY RUN] ' : ''}Cleaning zombie sitemaps for ${SITE}\n`);
  for (const p of ZOMBIES) {
    if (p === REAL) { console.log(`  [GUARD] skipping real sitemap`); continue; }
    if (DRY) { console.log(`  [would delete] ${p}`); continue; }
    const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps/${encodeURIComponent(p)}`;
    const dr = await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${at}` } });
    console.log(`  [${dr.status === 204 ? 'DELETED' : 'status ' + dr.status}] ${p}`);
    await new Promise((r) => setTimeout(r, 300));
  }
  const vr = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps`, { headers: { Authorization: `Bearer ${at}` } });
  const vj = await vr.json();
  console.log('\nRemaining sitemaps in GSC:');
  (vj.sitemap || []).forEach((s) => console.log(`  ${s.path}  (errors:${s.errors || 0})`));
})();
