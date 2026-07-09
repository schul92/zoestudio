import { createHmac, timingSafeEqual, randomBytes } from 'crypto'

/**
 * Signed, expiring payment tokens.
 *
 * Each client gets a private URL — /pay/<token> — that encodes which Stripe
 * customer and price the page should bill. The token is HMAC-signed with a
 * server secret, so a client cannot forge one, change the amount, or discover
 * another client's page by guessing. No database needed.
 */
export type PayPayload = {
  /** Stripe customer id */
  c: string
  /** Stripe price id */
  p: string
  /** expiry, unix seconds */
  exp: number
  /** nonce — makes two links for the same client differ */
  n: string
}

const secret = (): Buffer => {
  const s = process.env.AUTH_SECRET
  if (!s) throw new Error('AUTH_SECRET is not set (required to sign payment links)')
  return Buffer.from(s, 'utf8')
}

const b64url = (b: Buffer): string =>
  b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const unb64url = (s: string): Buffer =>
  Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64')

const sign = (body: string): string =>
  b64url(createHmac('sha256', secret()).update(body).digest())

/** Default link lifetime: 30 days. Long enough to email, short enough to expire. */
export function createPayToken(
  customerId: string,
  priceId: string,
  ttlSeconds = 60 * 60 * 24 * 30
): string {
  const payload: PayPayload = {
    c: customerId,
    p: priceId,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    n: randomBytes(6).toString('hex'),
  }
  const body = b64url(Buffer.from(JSON.stringify(payload), 'utf8'))
  return `${body}.${sign(body)}`
}

/** Returns the payload, or null if the token is malformed, forged, or expired. */
export function verifyPayToken(token: string): PayPayload | null {
  const dot = token.lastIndexOf('.')
  if (dot <= 0) return null
  const body = token.slice(0, dot)
  const given = token.slice(dot + 1)

  const expected = sign(body)
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  // Constant-time compare; timingSafeEqual throws on length mismatch.
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  let payload: PayPayload
  try {
    payload = JSON.parse(unb64url(body).toString('utf8'))
  } catch {
    return null
  }
  if (!payload?.c || !payload?.p || typeof payload.exp !== 'number') return null
  if (payload.exp < Math.floor(Date.now() / 1000)) return null
  return payload
}
