#!/usr/bin/env node
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

(async () => {
  const token = await getToken();
  const site = 'sc-domain:zoelumos.com';
  const sitemap = 'https://www.zoelumos.com/sitemap.xml';

  console.log('📤 Submitting sitemap to GSC...');
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(sitemap)}`;
  const res = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
  console.log(`  ${res.ok ? '✅' : '❌'} Status: ${res.status}`);
  if (!res.ok) console.log('  Body:', await res.text());

  console.log('\n📋 Fetching sitemap status...');
  const listRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const list = await listRes.json();
  for (const sm of list.sitemap || []) {
    console.log(`  ${sm.path}`);
    console.log(`    lastSubmitted: ${sm.lastSubmitted}`);
    console.log(`    lastDownloaded: ${sm.lastDownloaded || 'pending'}`);
    console.log(`    isPending: ${sm.isPending}`);
    console.log(`    warnings: ${sm.warnings || 0}, errors: ${sm.errors || 0}`);
    if (sm.contents) {
      for (const c of sm.contents) {
        console.log(`    ${c.type}: ${c.submitted} submitted, ${c.indexed || 0} indexed`);
      }
    }
  }
})();
