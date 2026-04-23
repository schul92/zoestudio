#!/usr/bin/env node
/**
 * Tests what APIs our current token can reach.
 */
const fs = require('fs');
const path = require('path');

const CREDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')
).web;
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8')
);

async function getAccessToken() {
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
  return { token: j.access_token, scope: j.scope };
}

(async () => {
  const { token, scope } = await getAccessToken();
  console.log('🔑 Current scopes:', scope);
  console.log('');

  // Test Search Console
  console.log('🔍 Testing Search Console API...');
  const scRes = await fetch('https://searchconsole.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const scBody = await scRes.json();
  console.log('  Status:', scRes.status, scRes.ok ? '✅' : '❌');
  console.log('  Body:', JSON.stringify(scBody, null, 2).slice(0, 500));
  console.log('');

  // Test GA4
  console.log('📊 Testing GA4 Data API...');
  const gaRes = await fetch(
    'https://analyticsdata.googleapis.com/v1beta/properties/500538997:runReport',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      }),
    }
  );
  const gaBody = await gaRes.json();
  console.log('  Status:', gaRes.status, gaRes.ok ? '✅' : '❌');
  console.log('  Body:', JSON.stringify(gaBody, null, 2).slice(0, 500));
})();
