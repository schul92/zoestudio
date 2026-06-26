// Server-only Google API layer for the admin dashboard.
// Reads OAuth + API config from environment variables (never the client).
// Only imported by /api/admin route handlers (server runtime).

const TOKEN_URI = 'https://oauth2.googleapis.com/token'
const GADS_VERSION = 'v21'

let cached: { token: string; exp: number } | null = null

export async function getAccessToken(): Promise<string> {
  if (cached && cached.exp > Date.now() + 30_000) return cached.token
  const r = await fetch(TOKEN_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  })
  const j = await r.json()
  if (!j.access_token) throw new Error('OAuth token refresh failed: ' + JSON.stringify(j).slice(0, 200))
  cached = { token: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 }
  return j.access_token
}

// ── Google Search Console ────────────────────────────────────────────
export async function gscQuery(body: Record<string, unknown>) {
  const token = await getAccessToken()
  const site = process.env.GSC_SITE!
  const r = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    }
  )
  if (!r.ok) throw new Error(`GSC ${r.status}: ${(await r.text()).slice(0, 200)}`)
  return r.json()
}

// ── Google Analytics 4 ───────────────────────────────────────────────
export async function ga4RunReport(body: Record<string, unknown>) {
  const token = await getAccessToken()
  const prop = process.env.GA4_PROPERTY_ID!
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${prop}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  if (!r.ok) throw new Error(`GA4 ${r.status}: ${(await r.text()).slice(0, 200)}`)
  return r.json()
}

// ── Google Ads ───────────────────────────────────────────────────────
export class AdsNotApprovedError extends Error {}

export async function adsSearch(gaql: string, customerId: string) {
  const token = await getAccessToken()
  const cid = String(customerId).replace(/-/g, '')
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'developer-token': process.env.GADS_DEVELOPER_TOKEN!,
    'Content-Type': 'application/json',
  }
  if (process.env.GADS_LOGIN_CUSTOMER_ID) {
    headers['login-customer-id'] = process.env.GADS_LOGIN_CUSTOMER_ID.replace(/-/g, '')
  }
  const r = await fetch(`https://googleads.googleapis.com/${GADS_VERSION}/customers/${cid}/googleAds:searchStream`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: gaql }),
    cache: 'no-store',
  })
  const text = await r.text()
  if (!r.ok) {
    if (text.includes('DEVELOPER_TOKEN_NOT_APPROVED')) {
      throw new AdsNotApprovedError('Google Ads developer token is pending Basic Access approval.')
    }
    throw new Error(`Ads ${r.status}: ${text.slice(0, 200)}`)
  }
  const chunks = JSON.parse(text)
  return chunks.flatMap((c: { results?: unknown[] }) => c.results || [])
}

export const adsCustomerId = () => process.env.GADS_CUSTOMER_ID || 'all'
export const adsLoginCustomerId = () => process.env.GADS_LOGIN_CUSTOMER_ID || ''
