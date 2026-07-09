import 'server-only'
import { randomBytes } from 'crypto'
import { stripe } from './stripe'

/**
 * Short payment codes.
 *
 * The signed token in ./token.ts is secure but ~176 characters, which is awful
 * to paste into KakaoTalk. Instead we mint a short random code, set it as the
 * Stripe Price's `lookup_key`, and let Stripe hold the code -> price mapping.
 * Still no database.
 *
 *   /pay/k7m3q9xz4p   ->  price.lookup_key
 *
 * Why lookup_key and not metadata + prices.search: the search index is
 * eventually consistent and measured at ~22 seconds behind on this account, so
 * a link opened right after it was created would show "expired". prices.list
 * filtered by lookup_keys is read-after-write consistent (~400ms round trip).
 *
 * Security: 10 characters from a 32-char alphabet is ~50 bits of entropy, so
 * codes are not guessable. Expiry rides along in metadata and is enforced on
 * lookup. Revoking a link early is `prices.update(id, {active: false})` — the
 * active=true filter below stops resolving it immediately, no deploy needed.
 */

// Crockford-style alphabet: no I, L, O, U — unambiguous when read aloud or
// retyped from a phone screen.
const ALPHABET = '0123456789abcdefghjkmnpqrstvwxyz'

export function newPayCode(): string {
  const bytes = randomBytes(10)
  let out = ''
  for (let i = 0; i < 10; i++) out += ALPHABET[bytes[i] % ALPHABET.length]
  return out
}

export const PAYCODE_RE = /^[0-9a-hjkmnp-tv-z]{10}$/

export type ResolvedPayCode = { customerId: string; priceId: string }

/**
 * Look a code up in Stripe. Returns null for unknown, revoked, or expired
 * codes — callers must not distinguish these to the client.
 */
export async function resolvePayCode(code: string): Promise<ResolvedPayCode | null> {
  if (!PAYCODE_RE.test(code)) return null

  const { data } = await stripe().prices.list({
    lookup_keys: [code],
    active: true,
    limit: 1,
  })

  const price = data[0]
  if (!price) return null

  const customerId = price.metadata.zl_customer
  if (!customerId) return null

  const exp = Number(price.metadata.zl_pay_exp ?? 0)
  if (!Number.isFinite(exp) || exp <= 0) return null
  if (exp < Math.floor(Date.now() / 1000)) return null

  return { customerId, priceId: price.id }
}
