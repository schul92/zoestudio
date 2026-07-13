#!/usr/bin/env node
/**
 * Re-authorize Google for the admin dashboard (GSC, GA4, Google Ads, GBP).
 *
 *   node scripts/gbp/auth.js
 *
 * Writes the refresh token to .config/gbp-token.json. That one token backs every
 * Google panel on /admin, which is why they all go dark together when it dies.
 *
 * WHY THE TOKEN KEEPS DYING: Google revokes refresh tokens after SEVEN DAYS
 * while the OAuth consent screen is in "Testing" status. Re-running this buys
 * another week and nothing more. The actual fix is to publish the app:
 *
 *   https://console.cloud.google.com/apis/credentials/consent?project=zoe-studio-social
 *   -> Publishing status -> PUBLISH APP
 *
 * Publishing does not require Google's verification review while the only user
 * is the owner of the project, and published apps issue refresh tokens that do
 * not expire on a timer.
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { URL } = require('url');
const { exec, execSync } = require('child_process');

/**
 * Credentials live in the main checkout's .config/, never in a worktree — they
 * are deliberately outside version control, so a worktree has no copy. Ask git
 * where the main checkout is rather than assuming we are in it, or running this
 * from a worktree writes the token somewhere nothing reads.
 */
function configDir() {
  const local = path.join(__dirname, '../../.config');
  if (fs.existsSync(path.join(local, 'google-oauth.json'))) return local;
  try {
    const gitCommonDir = execSync('git rev-parse --path-format=absolute --git-common-dir', {
      cwd: __dirname,
      encoding: 'utf8',
    }).trim();
    return path.join(path.dirname(gitCommonDir), '.config');
  } catch {
    return local;
  }
}

const CONFIG_DIR = configDir();
const CREDS_PATH = path.join(CONFIG_DIR, 'google-oauth.json');
const TOKEN_PATH = path.join(CONFIG_DIR, 'gbp-token.json');

if (!fs.existsSync(CREDS_PATH)) {
  console.error(`\n  ✗ ${CREDS_PATH} not found.\n`);
  process.exit(1);
}
const raw = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8'));
const CREDS = raw.web || raw.installed;

/**
 * Every scope the admin dashboard needs.
 *
 * The previous version of this file omitted `adwords` and `analytics.edit`, so a
 * token minted by it brought GSC and GA4 back while leaving Google Ads broken —
 * a confusing half-fix. Keep this list in sync with what src/app/api/admin/*
 * actually calls.
 */
const SCOPE = [
  'https://www.googleapis.com/auth/business.manage', // GBP posts
  'https://www.googleapis.com/auth/webmasters', // Search Console
  'https://www.googleapis.com/auth/indexing', // Indexing API
  'https://www.googleapis.com/auth/analytics.readonly', // GA4 reports
  'https://www.googleapis.com/auth/analytics.edit', // GA4 key events
  'https://www.googleapis.com/auth/adwords', // Google Ads
].join(' ');

const REDIRECT = 'http://localhost:3000/callback';

const authUrl =
  `${CREDS.auth_uri}?` +
  new URLSearchParams({
    client_id: CREDS.client_id,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline',
    // Without prompt=consent, Google returns no refresh_token on a
    // re-authorization — we would write a token file that expires in an hour and
    // cannot renew itself.
    prompt: 'consent',
  });

console.log('\n  Opening Google authorization in your browser…');
console.log('  If it does not open, paste this URL yourself:\n');
console.log('  ' + authUrl + '\n');
exec(`open "${authUrl}"`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.end(`Authorization failed: ${error}`);
    console.error(`\n  ✗ Google returned: ${error}\n`);
    server.close();
    process.exitCode = 1;
    return;
  }
  if (!code) {
    res.end('Waiting for the authorization code…');
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
    console.error('\n  ✗', tokens.error_description || tokens.error, '\n');
    server.close();
    process.exitCode = 1;
    return;
  }

  // A token file with no refresh_token is worse than none: it looks valid and
  // dies in an hour. Refuse to write it.
  if (!tokens.refresh_token) {
    res.end('Google did not return a refresh token. See the terminal.');
    console.error('\n  ✗ No refresh_token returned. Revoke prior access, then retry:');
    console.error('    https://myaccount.google.com/permissions\n');
    server.close();
    process.exitCode = 1;
    return;
  }

  const granted = (tokens.scope || '').split(' ');
  const missing = SCOPE.split(' ').filter((s) => !granted.includes(s));

  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  res.end('Authorized. You can close this tab.');

  console.log(`\n  ✓ Token written to ${TOKEN_PATH}`);
  console.log('  ✓ refresh_token present');
  if (missing.length) {
    console.log('\n  ⚠ Scopes NOT granted — these panels will still fail:');
    missing.forEach((s) => console.log(`      ${s.split('/').pop()}`));
  } else {
    console.log(`  ✓ all ${SCOPE.split(' ').length} scopes granted`);
  }
  console.log('\n  The token is only on this machine. Push it to production or /admin stays dark.\n');
  server.close();
});

server.listen(3000, () => console.log('  Listening on http://localhost:3000/callback'));
