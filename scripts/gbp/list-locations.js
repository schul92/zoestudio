#!/usr/bin/env node
/**
 * Lists your GBP accounts and locations.
 * Run: node scripts/gbp/list-locations.js
 */
const fs = require('fs');
const path = require('path');

const CREDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')
).web;
const TOKEN_PATH = path.join(__dirname, '../../.config/gbp-token.json');
const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

async function getAccessToken() {
  if (!tokens.refresh_token) throw new Error('No refresh_token. Re-run auth.js');
  const res = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CREDS.client_id,
      client_secret: CREDS.client_secret,
      refresh_token: tokens.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j));
  return j.access_token;
}

async function main() {
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  console.log('\n📋 Fetching accounts...');
  const accRes = await fetch(
    'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
    { headers }
  );
  const accounts = await accRes.json();
  if (accounts.error) {
    console.error('❌', accounts.error);
    return;
  }

  for (const acc of accounts.accounts || []) {
    console.log(`\n🏢 Account: ${acc.accountName} (${acc.name})`);
    const locRes = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${acc.name}/locations?readMask=name,title,storefrontAddress,websiteUri`,
      { headers }
    );
    const locs = await locRes.json();
    if (locs.error) {
      console.error('  ❌', locs.error.message);
      continue;
    }
    for (const loc of locs.locations || []) {
      console.log(`  📍 ${loc.title} → ${loc.name}`);
      if (loc.websiteUri) console.log(`     ${loc.websiteUri}`);
    }
  }
  console.log('\n✅ Done. Copy the location name (e.g. locations/123456) for the post script.\n');
}

main().catch(console.error);
