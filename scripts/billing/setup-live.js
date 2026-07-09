#!/usr/bin/env node
/**
 * One-time live-mode setup for Stripe billing.
 *
 * Test mode and live mode are separate worlds: webhook endpoints, payment
 * method configurations and customer-portal settings do NOT carry over. This
 * script reproduces, in live mode, every account-side setting we configured by
 * hand in test mode, so the switch is a config change rather than a rediscovery.
 *
 *   node scripts/billing/setup-live.js            # dry run, changes nothing
 *   node scripts/billing/setup-live.js --apply     # actually writes
 *
 * Reads STRIPE_LIVE_SECRET_KEY from .env.local. The key is never printed, and
 * must never be pasted into a chat, a commit, or a terminal argument.
 *
 * The webhook signing secret it creates is printed ONCE — Stripe will not show
 * it again. Put it straight into Vercel as STRIPE_WEBHOOK_SECRET.
 */

const fs = require('fs')
const path = require('path')

const APPLY = process.argv.includes('--apply')
const ENDPOINT_URL = 'https://www.zoelumos.com/api/stripe/webhook'

const WEBHOOK_EVENTS = [
  'invoice.paid',
  'invoice.payment_failed',
  'checkout.session.completed',
  'checkout.session.async_payment_failed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]

function liveKey() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) fail('.env.local not found — run from the repo root.')

  const line = fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .find((l) => l.startsWith('STRIPE_LIVE_SECRET_KEY='))
  if (!line) fail('STRIPE_LIVE_SECRET_KEY is not in .env.local. Add it in your editor — never paste it into a chat.')

  const key = line.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '')
  if (!key.startsWith('sk_live_') && !key.startsWith('rk_live_')) {
    fail('STRIPE_LIVE_SECRET_KEY does not look like a live key (expected sk_live_ or rk_live_).')
  }
  return key
}

function fail(message) {
  console.error(`\n  ✗ ${message}\n`)
  process.exit(1)
}

async function api(key, path, method = 'GET', body) {
  const res = await fetch('https://api.stripe.com/v1/' + path, {
    method,
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`${path}: ${json.error?.message ?? 'request failed'}`)
  return json
}

/** Refuse to touch an account that cannot take money — a misread key, usually. */
async function assertLiveAndReady(key) {
  const account = await api(key, 'account')
  if (!account.charges_enabled || !account.payouts_enabled) {
    fail(`Account ${account.id} cannot take payments yet (charges=${account.charges_enabled}, payouts=${account.payouts_enabled}).`)
  }
  console.log(`  account            ${account.id} (${account.country}) — charges and payouts enabled`)
}

/** The endpoint that turns a payment into a confirmation email. */
async function webhook(key) {
  const existing = await api(key, 'webhook_endpoints?limit=100')
  const found = existing.data.find((e) => e.url === ENDPOINT_URL)
  if (found) {
    const missing = WEBHOOK_EVENTS.filter((e) => !found.enabled_events.includes(e))
    if (!missing.length) return console.log(`  webhook            already registered (${found.id}), all events present`)
    console.log(`  webhook            ${found.id} is missing: ${missing.join(', ')}`)
    if (!APPLY) return
    const params = new URLSearchParams()
    WEBHOOK_EVENTS.forEach((e, i) => params.set(`enabled_events[${i}]`, e))
    await api(key, `webhook_endpoints/${found.id}`, 'POST', params)
    return console.log(`  webhook            updated (signing secret unchanged)`)
  }

  if (!APPLY) return console.log(`  webhook            WOULD CREATE -> ${ENDPOINT_URL}`)

  const params = new URLSearchParams()
  params.set('url', ENDPOINT_URL)
  params.set('description', 'ZOE LUMOS billing notifications')
  WEBHOOK_EVENTS.forEach((e, i) => params.set(`enabled_events[${i}]`, e))
  const created = await api(key, 'webhook_endpoints', 'POST', params)

  console.log(`  webhook            created ${created.id}`)
  console.log('\n  ── Copy this into Vercel as STRIPE_WEBHOOK_SECRET. Stripe will not show it again. ──')
  console.log(`  ${created.secret}`)
  console.log('  ─────────────────────────────────────────────────────────────────────────────────\n')
}

/**
 * Link is card-backed and renders as a full-width wallet button, which buries
 * the bank option — and ACH is what keeps our fees at 0.8% instead of 2.9%.
 */
async function disableLink(key) {
  const configs = await api(key, 'payment_method_configurations?limit=10')
  const config = configs.data.find((c) => c.is_default) ?? configs.data[0]
  if (!config) return console.log('  link               no payment method configuration found — skipping')

  if (config.link?.display_preference?.value !== 'on') {
    return console.log(`  link               already off (${config.id})`)
  }
  if (!APPLY) return console.log(`  link               WOULD DISABLE on ${config.id}`)

  const params = new URLSearchParams({ 'link[display_preference][preference]': 'off' })
  const updated = await api(key, `payment_method_configurations/${config.id}`, 'POST', params)
  console.log(`  link               disabled (${updated.id})`)
}

/**
 * Cancellation is owner-only: clients reach us on KakaoTalk or email first,
 * which is our one chance to keep them. They can still update a card and pull
 * invoices themselves.
 */
async function portal(key) {
  const configs = await api(key, 'billing_portal/configurations?limit=10')
  const existing = configs.data.find((c) => c.is_default && c.active)

  const params = new URLSearchParams({
    'features[subscription_cancel][enabled]': 'false',
    'features[subscription_update][enabled]': 'false',
    'features[payment_method_update][enabled]': 'true',
    'features[invoice_history][enabled]': 'true',
    'features[customer_update][enabled]': 'true',
    'features[customer_update][allowed_updates][0]': 'email',
    'features[customer_update][allowed_updates][1]': 'address',
    'business_profile[headline]': 'ZOE LUMOS — manage your billing',
  })

  if (existing) {
    const cancelOn = existing.features.subscription_cancel?.enabled
    if (!cancelOn) return console.log(`  portal             already configured, self-cancel off (${existing.id})`)
    if (!APPLY) return console.log(`  portal             WOULD DISABLE self-cancel on ${existing.id}`)
    await api(key, `billing_portal/configurations/${existing.id}`, 'POST', params)
    return console.log(`  portal             self-cancel disabled (${existing.id})`)
  }

  if (!APPLY) return console.log('  portal             WOULD CREATE (self-cancel off)')
  const created = await api(key, 'billing_portal/configurations', 'POST', params)
  console.log(`  portal             created ${created.id} (self-cancel off)`)
}

/** Live mode starts empty. Say so, loudly, before anyone wonders where Vito's went. */
async function reportEmptyState(key) {
  const [customers, subs] = await Promise.all([
    api(key, 'customers?limit=1'),
    api(key, 'subscriptions?status=all&limit=1'),
  ])
  console.log(`\n  live customers     ${customers.data.length === 0 ? 'none' : `${customers.data.length}+`}`)
  console.log(`  live subscriptions ${subs.data.length === 0 ? 'none' : `${subs.data.length}+`}`)
  if (!customers.data.length) {
    console.log('\n  Test-mode clients do NOT carry over. Recreate each client in /admin/billing')
    console.log('  and send them a fresh pay link.')
  }
}

async function main() {
  const key = liveKey()
  console.log(`\n  Stripe live setup — ${APPLY ? 'APPLYING CHANGES' : 'DRY RUN (pass --apply to write)'}\n`)

  await assertLiveAndReady(key)
  await webhook(key)
  await disableLink(key)
  await portal(key)
  await reportEmptyState(key)

  if (!APPLY) console.log('\n  Nothing was changed. Re-run with --apply when this looks right.\n')
  else console.log('\n  Done.\n')
}

main().catch((err) => fail(err.message))
