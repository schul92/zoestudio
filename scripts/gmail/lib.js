/**
 * Shared Gmail API helpers.
 *
 * Auth reuses the same Google OAuth client as the GBP/Ads/GSC scripts —
 * .config/google-oauth.json + .config/gbp-token.json. The config lives in the
 * main checkout, so paths resolve via git-common-dir and these scripts work
 * unchanged from any worktree.
 */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function repoRoot() {
  const common = execSync('git rev-parse --git-common-dir', { encoding: 'utf8' }).trim()
  return path.resolve(common, '..')
}

const CONFIG_DIR = path.join(repoRoot(), '.config')
const TOKEN_PATH = path.join(CONFIG_DIR, 'gbp-token.json')
const CREDS_PATH = path.join(CONFIG_DIR, 'google-oauth.json')

/** Every scope this project holds. Re-auth must request ALL of them — dropping
 *  one silently revokes that capability (e.g. losing `adwords` breaks the
 *  Google Ads scripts). Add here, never replace. */
const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/analytics.edit',
  'https://www.googleapis.com/auth/indexing',
  'https://www.googleapis.com/auth/adwords',
  // Gmail: list/read drafts and move them to trash. `gmail.modify` is the
  // narrowest scope that permits drafts.delete — it cannot send mail.
  'https://www.googleapis.com/auth/gmail.modify',
]

function creds() {
  return JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8')).web
}

/** Exchange the stored refresh token for a fresh access token. */
async function accessToken() {
  const c = creds()
  const tok = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'))
  if (!tok.refresh_token) throw new Error('No refresh_token — run scripts/gmail/auth.js')

  const res = await fetch(c.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: c.client_id,
      client_secret: c.client_secret,
      refresh_token: tok.refresh_token,
      grant_type: 'refresh_token',
    }),
  })
  const j = await res.json()
  if (j.error) {
    throw new Error(`token refresh failed: ${j.error_description || j.error}`)
  }
  return j.access_token
}

async function gmail(token, endpoint, options = {}) {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me${endpoint}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  })
  if (res.status === 204) return null
  const j = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = j.error?.message || res.statusText
    const err = new Error(msg)
    err.status = res.status
    err.body = j
    throw err
  }
  return j
}

/** Which mailbox this token actually controls — always print before mutating. */
async function whoami(token) {
  const p = await gmail(token, '/profile')
  return p.emailAddress
}

module.exports = { SCOPES, TOKEN_PATH, CREDS_PATH, CONFIG_DIR, creds, accessToken, gmail, whoami }
