import 'server-only'
import { verifyPayToken } from './token'
import { resolvePayCode, PAYCODE_RE, type ResolvedPayCode } from './paycode'

/**
 * A /pay/<x> URL segment is either:
 *   - a short code   (k7m3q9xz4p)      -> looked up in Stripe price metadata
 *   - a signed token (body.signature)  -> the original long-form link
 *
 * Both resolve to the same (customer, price) pair. Short codes are what we
 * generate now; token support stays so links already sent out keep working.
 * Returns null for anything invalid or expired — callers must never tell the
 * client which of the two it was.
 */
export async function resolvePaySegment(segment: string): Promise<ResolvedPayCode | null> {
  if (!segment) return null

  // Signed tokens always contain a '.' separating body and signature; short
  // codes never do. Checking shape first avoids a pointless Stripe search.
  if (segment.includes('.')) {
    const payload = verifyPayToken(segment)
    return payload ? { customerId: payload.c, priceId: payload.p } : null
  }

  if (PAYCODE_RE.test(segment)) return resolvePayCode(segment)

  return null
}
