import 'server-only'
import Stripe from 'stripe'
import { RETAINER_PRODUCT_NAME } from './services'

/**
 * Server-side Stripe client. Stripe is the source of truth for all billing —
 * we deliberately keep no local database, so subscription state, invoices and
 * payment status are always read live from the API (same pattern the admin
 * dashboard uses for GA4 / Search Console / Google Ads).
 *
 * `server-only` makes an accidental client import a build error rather than a
 * silent leak of the Node SDK (and its env access) into the browser bundle.
 * Client-safe primitives live in ./services and are re-exported below.
 */
let cached: Stripe | null = null

export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  if (!cached) {
    cached = new Stripe(key, {
      // Pinned to the version this SDK build targets, so a Stripe-side upgrade
      // can never silently change the shape of the objects we render. The SDK
      // types only accept its own pinned literal; bump both together.
      apiVersion: '2026-06-24.dahlia',
      appInfo: { name: 'ZOE LUMOS Billing', url: 'https://www.zoelumos.com' },
      typescript: true,
    })
  }
  return cached
}

/** True while we are on test keys — the UI surfaces this loudly. */
export const isTestMode = (): boolean =>
  (process.env.STRIPE_SECRET_KEY ?? '').startsWith('sk_test_')

/** Find (or lazily create) the single retainer Product. */
export async function retainerProduct(): Promise<Stripe.Product> {
  const s = stripe()
  const existing = await s.products.search({
    query: `active:'true' AND metadata['zl_kind']:'retainer'`,
    limit: 1,
  })
  if (existing.data[0]) return existing.data[0]
  return s.products.create({
    name: RETAINER_PRODUCT_NAME,
    description: 'Monthly retainer — scope and amount are set per client.',
    metadata: { zl_kind: 'retainer' },
  })
}

// Convenience re-exports so server callers keep one import site.
export {
  SERVICES,
  isServiceKey,
  parseServices,
  fmtUSD,
  RETAINER_PRODUCT_NAME,
  type ServiceKey,
} from './services'
