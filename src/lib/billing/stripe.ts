import 'server-only'
import Stripe from 'stripe'
import { RETAINER_PRODUCT_NAME, ONE_TIME_PRODUCT_NAME } from './services'

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
  return findOrCreateProduct('retainer', {
    name: RETAINER_PRODUCT_NAME,
    description: 'Monthly retainer — scope and amount are set per client.',
  })
}

/**
 * Find (or lazily create) the Product one-time Prices hang off. Separate from
 * the retainer Product because Checkout renders the Product's name to the
 * client: a $1,500 site build must not say "Monthly Retainer".
 */
export async function oneTimeProduct(): Promise<Stripe.Product> {
  return findOrCreateProduct('one_time', {
    name: ONE_TIME_PRODUCT_NAME,
    description: 'One-time payment — scope and amount are agreed per project.',
  })
}

/** Both Products, for callers that must scan every pay link we ever minted. */
export async function billingProducts(): Promise<Stripe.Product[]> {
  return Promise.all([retainerProduct(), oneTimeProduct()])
}

/**
 * Look the Product up, create it the first time.
 *
 * Deliberately NOT products.search: that index runs seconds-to-minutes behind
 * (measured ~22s on this account), so a burst of dashboard loads each saw "no
 * product" and each created one — we ended up with three copies of the one-time
 * Product in live mode. products.list is read-after-write consistent, and the
 * idempotency key collapses genuinely concurrent creates onto one object.
 *
 * We only ever have two Products, so listing them is cheap. Oldest wins, so a
 * stray duplicate never flips which Product new Prices attach to.
 */
async function findOrCreateProduct(
  kind: 'retainer' | 'one_time',
  fields: { name: string; description: string }
): Promise<Stripe.Product> {
  const s = stripe()

  const find = async (): Promise<Stripe.Product | undefined> => {
    const products = await s.products.list({ active: true, limit: 100 }).autoPagingToArray({ limit: 500 })
    return products.filter((p) => p.metadata.zl_kind === kind).sort((a, b) => a.created - b.created)[0]
  }

  const existing = await find()
  if (existing) return existing

  try {
    return await s.products.create(
      { ...fields, metadata: { zl_kind: kind } },
      { idempotencyKey: `zl_product_${kind}` }
    )
  } catch (err) {
    // Another request holding the same idempotency key is mid-flight. It is
    // creating the Product we want, so wait for it rather than racing it into a
    // duplicate. Any other error is real and must surface.
    if (!(err instanceof Stripe.errors.StripeIdempotencyError)) throw err
    await new Promise((r) => setTimeout(r, 1500))
    const created = await find()
    if (!created) throw err
    return created
  }
}

// Convenience re-exports so server callers keep one import site.
export {
  SERVICES,
  isServiceKey,
  parseServices,
  fmtUSD,
  RETAINER_PRODUCT_NAME,
  ONE_TIME_PRODUCT_NAME,
  BILLING_PERIODS,
  isBillingPeriod,
  isRecurring,
  type ServiceKey,
  type BillingPeriod,
} from './services'
