#!/usr/bin/env node
/**
 * One-time OAuth flow for Google Business Profile API.
 * Run: node scripts/gbp/auth.js
 * Saves refresh token to .config/gbp-token.json
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { URL } = require('url');
const { exec } = require('child_process');

const CREDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')
).web;

const SCOPE = [
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/indexing',
].join(' ');
const REDIRECT = 'http://localhost:3000/callback';
const TOKEN_PATH = path.join(__dirname, '../../.config/gbp-token.json');

const authUrl =
  `${CREDS.auth_uri}?` +
  new URLSearchParams({
    client_id: CREDS.client_id,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline',
    prompt: 'consent',
  });

console.log('\n🔐 Opening browser for Google authorization...');
console.log('If it does not open, visit this URL manually:\n', authUrl, '\n');
exec(`open "${authUrl}"`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get('code');
  if (!code) {
    res.end('No code.');
    return;
  }

  const tokenRes = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: CREDS.client_id,
      client_secret: CREDS.client_secret,
      redirect_uri: REDIRECT,
      grant_type: 'authorization_code',
    }),
  });
  const tokens = await tokenRes.json();

  if (tokens.error) {
    res.end(`Error: ${tokens.error_description || tokens.error}`);
    console.error('❌', tokens);
    server.close();
    return;
  }

  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  res.end('✅ Auth successful! You can close this tab.');
  console.log('\n✅ Tokens saved to', TOKEN_PATH);
  console.log('Refresh token present:', !!tokens.refresh_token);
  server.close();
});

server.listen(3000, () => console.log('Listening on http://localhost:3000/callback'));
