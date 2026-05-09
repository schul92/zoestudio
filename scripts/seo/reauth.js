#!/usr/bin/env node
/**
 * Re-authenticate Google APIs (GSC, GA4, Indexing, GBP).
 * Opens a consent URL, captures the code via local callback,
 * exchanges for a refresh_token, writes .config/gbp-token.json.
 *
 * Usage: node scripts/seo/reauth.js
 * Then open the printed URL in a browser, approve, done.
 */
const fs = require('fs')
const path = require('path')
const http = require('http')
const { URL } = require('url')
const { exec } = require('child_process')

const ROOT = path.join(__dirname, '../..')
const CREDS_PATH = path.join(ROOT, '.config/google-oauth.json')
const TOKEN_PATH = path.join(ROOT, '.config/gbp-token.json')

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/indexing',
  'https://www.googleapis.com/auth/business.manage',
]

const REDIRECT = 'http://localhost:3000/callback'
const CREDS = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8')).web

const authUrl =
  `${CREDS.auth_uri}?` +
  new URLSearchParams({
    client_id: CREDS.client_id,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  }).toString()

console.log('\nOpen this URL in your browser to grant access:\n')
console.log(authUrl)
console.log('\nWaiting for callback on http://localhost:3000/callback ...\n')

exec(`open "${authUrl}"`, () => {})

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, REDIRECT)
  if (u.pathname !== '/callback') {
    res.writeHead(404).end()
    return
  }
  const code = u.searchParams.get('code')
  if (!code) {
    res.writeHead(400).end('Missing code')
    return
  }

  try {
    const r = await fetch(CREDS.token_uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CREDS.client_id,
        client_secret: CREDS.client_secret,
        redirect_uri: REDIRECT,
        grant_type: 'authorization_code',
      }),
    })
    const tok = await r.json()
    if (tok.error) throw new Error(JSON.stringify(tok))
    if (!tok.refresh_token) {
      throw new Error(
        'No refresh_token returned. Revoke prior consent at https://myaccount.google.com/permissions and retry.'
      )
    }

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tok, null, 2))
    res.writeHead(200, { 'Content-Type': 'text/html' }).end(
      '<h1>Auth complete.</h1><p>You can close this tab.</p>'
    )
    console.log(`Token written to ${TOKEN_PATH}`)
    console.log(`Scopes: ${tok.scope}`)
    server.close()
    process.exit(0)
  } catch (e) {
    res.writeHead(500).end(String(e))
    console.error(e)
    process.exit(1)
  }
})

server.listen(3000)
