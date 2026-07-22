#!/usr/bin/env node
/**
 * Re-authorize the shared Google OAuth client, adding the Gmail scope.
 *
 *   node scripts/gmail/auth.js
 *
 * Requests EVERY scope in lib.js SCOPES (not just Gmail) — Google replaces the
 * grant wholesale, so omitting a scope silently revokes it. The existing token
 * is backed up first; if the new grant comes back missing scopes, we restore.
 */
const fs = require('fs')
const http = require('http')
const { URL } = require('url')
const { exec } = require('child_process')
const { SCOPES, TOKEN_PATH, creds } = require('./lib')

const REDIRECT = 'http://localhost:3000/callback'
const c = creds()

const backup = `${TOKEN_PATH}.bak-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
if (fs.existsSync(TOKEN_PATH)) {
  fs.copyFileSync(TOKEN_PATH, backup)
  console.log('🗄  Existing token backed up to', backup)
}

const authUrl =
  `${c.auth_uri}?` +
  new URLSearchParams({
    client_id: c.client_id,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  })

console.log('\n🔐 Opening browser for Google authorization...')
console.log('⚠️  Sign in with the SAME account that holds the Gmail drafts.')
console.log('If the browser does not open, visit:\n', authUrl, '\n')
exec(`open "${authUrl}"`)

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT)
  const code = url.searchParams.get('code')
  if (!code) {
    res.end('No code.')
    return
  }

  const tokenRes = await fetch(c.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: c.client_id,
      client_secret: c.client_secret,
      redirect_uri: REDIRECT,
      grant_type: 'authorization_code',
    }),
  })
  const tokens = await tokenRes.json()

  if (tokens.error) {
    res.end(`Error: ${tokens.error_description || tokens.error}`)
    console.error('❌', tokens)
    server.close()
    return
  }

  // Verify nothing was dropped before overwriting the working token.
  const granted = new Set((tokens.scope || '').split(' ').filter(Boolean))
  const missing = SCOPES.filter((s) => !granted.has(s))
  if (missing.length) {
    console.error('\n❌ Grant is missing scopes — NOT overwriting the existing token:')
    missing.forEach((s) => console.error('   -', s))
    console.error('\nEnable the matching APIs in Google Cloud Console, then re-run.')
    res.end('Missing scopes — token not replaced. Check the terminal.')
    server.close()
    return
  }

  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2))
  res.end('✅ Auth successful. You can close this tab.')
  console.log('\n✅ Tokens saved to', TOKEN_PATH)
  console.log('   scopes:', SCOPES.length, '· refresh_token:', !!tokens.refresh_token)
  server.close()
})

server.listen(3000, () => console.log('Listening on http://localhost:3000/callback'))
