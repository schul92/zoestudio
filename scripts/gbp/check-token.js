#!/usr/bin/env node
/**
 * Is the Google token still alive?
 *
 *   node scripts/gbp/check-token.js
 *
 * One refresh token backs every Google panel on /admin (Search Console, GA4,
 * Google Ads, GBP), so its death takes all of them out at once — and the only
 * symptom is an empty dashboard. This answers the question directly, and checks
 * each scope by actually calling the API rather than trusting the scope list.
 *
 * Exit code 1 when anything is broken, so it can gate a deploy or a cron.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Credentials live in the main checkout's .config/, never in a worktree — they
 * are deliberately outside version control, so a worktree has no copy of them.
 * Ask git where the main checkout is rather than assuming we are in it.
 */
function configDir() {
  const local = path.join(__dirname, '../../.config');
  if (fs.existsSync(path.join(local, 'google-oauth.json'))) return local;
  try {
    const main = execSync('git rev-parse --path-format=absolute --git-common-dir', {
      cwd: __dirname,
      encoding: 'utf8',
    }).trim();
    return path.join(path.dirname(main), '.config');
  } catch {
    return local;
  }
}

const CONFIG_DIR = configDir();
const CREDS_PATH = path.join(CONFIG_DIR, 'google-oauth.json');
const TOKEN_PATH = path.join(CONFIG_DIR, 'gbp-token.json');

const ok = (m) => console.log(`  ✓ ${m}`);
const bad = (m) => console.log(`  ✗ ${m}`);
const warn = (m) => console.log(`  ⚠ ${m}`);

function read(p, label) {
  if (!fs.existsSync(p)) {
    bad(`${label} not found at ${p}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

async function main() {
  const raw = read(CREDS_PATH, 'OAuth client');
  const creds = raw.web || raw.installed;
  const token = read(TOKEN_PATH, 'Token file');

  const ageDays = (Date.now() - fs.statSync(TOKEN_PATH).mtimeMs) / 86_400_000;
  console.log(`\n  token file is ${ageDays.toFixed(1)} days old\n`);

  if (!token.refresh_token) {
    bad('no refresh_token in the token file — re-run scripts/gbp/auth.js');
    process.exit(1);
  }

  // The one question that matters: can we still mint an access token?
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: token.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  const json = await res.json();

  if (!res.ok) {
    bad(`refresh failed: ${json.error} — ${json.error_description || ''}`);
    if (json.error === 'invalid_grant') {
      console.log('\n  Google revokes refresh tokens after 7 DAYS while the OAuth consent');
      console.log('  screen is in "Testing" status. Publishing the app stops this for good:');
      console.log('  https://console.cloud.google.com/apis/credentials/consent?project=zoe-studio-social');
      console.log('\n  To get running again now:  node scripts/gbp/auth.js\n');
    }
    process.exit(1);
  }

  ok(`refresh works (access token valid for ${json.expires_in}s)`);
  const access = json.access_token;

  // Scope strings lie: a scope can be granted while the underlying API is
  // disabled, or the account can lack access to the property. Call each one.
  const probes = [
    {
      name: 'Search Console',
      url: 'https://searchconsole.googleapis.com/webmasters/v3/sites',
    },
    {
      name: 'GA4',
      url: `https://analyticsadmin.googleapis.com/v1beta/properties/${process.env.GA4_PROPERTY_ID || '500538997'}`,
    },
    {
      name: 'Google Business Profile',
      url: 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
    },
  ];

  for (const p of probes) {
    const r = await fetch(p.url, { headers: { Authorization: `Bearer ${access}` } });
    if (r.ok) ok(`${p.name} responds`);
    else {
      const body = await r.json().catch(() => ({}));
      bad(`${p.name} -> HTTP ${r.status} ${body.error?.message ?? ''}`);
    }
  }

  // Google Ads needs a developer token and a customer id, so it fails
  // differently from the rest — check that we even have them before blaming the
  // OAuth token.
  const adsScope = (json.scope || '').includes('adwords');
  if (!adsScope) {
    bad('adwords scope NOT granted — the Google Ads panel will stay empty');
    console.log('    Re-run scripts/gbp/auth.js (the old version omitted this scope)');
  } else {
    ok('adwords scope granted');
  }

  if (ageDays > 6) {
    warn(`token is ${ageDays.toFixed(1)} days old — if the OAuth app is still in "Testing",`);
    warn('it is about to be revoked (7-day limit). Publish the app.');
  }

  console.log('');
}

main().catch((err) => {
  bad(err.message);
  process.exit(1);
});
