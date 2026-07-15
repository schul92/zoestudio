#!/usr/bin/env node
/**
 * Seed the Square SANDBOX with a nail-salon menu and report what the Bookings
 * API can actually do there.
 *
 *   node scripts/booking/seed-sandbox.js
 *
 * Reads SQUARE_ACCESS_TOKEN (sandbox) from .env.local. Creates appointment
 * services (idempotent — skips ones that already exist), then probes every
 * call the booking page makes: locations, booking profiles, availability.
 * The probe section is the real product: Square's docs don't say clearly
 * which Bookings features work in sandbox, so we ask the sandbox itself.
 */
const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')

const envPath = path.join(__dirname, '../../.env.local')
const env = Object.fromEntries(
  fs.readFileSync(envPath, 'utf8').split('\n').filter((l) => l.includes('=')).map((l) => {
    const i = l.indexOf('=')
    return [l.slice(0, i), l.slice(i + 1).trim()]
  })
)
const TOKEN = env.SQUARE_ACCESS_TOKEN
if (!TOKEN) {
  console.error('\n  ✗ SQUARE_ACCESS_TOKEN not in .env.local')
  console.error('    Developer Console -> your app -> Credentials -> Sandbox Access Token\n')
  process.exit(1)
}
const BASE = env.SQUARE_ENV === 'production' ? 'https://connect.squareup.com' : 'https://connect.squareupsandbox.com'

async function sq(p, method = 'GET', body) {
  const res = await fetch(`${BASE}/v2/${p}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Square-Version': '2026-05-21', 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, json }
}

const MENU = [
  { name: 'Gel Manicure', minutes: 60, cents: 4500 },
  { name: 'Classic Pedicure', minutes: 75, cents: 5500 },
  { name: 'Dip Powder Set', minutes: 90, cents: 6500 },
]

;(async () => {
  console.log(`\n  Square ${BASE.includes('sandbox') ? 'SANDBOX' : 'PRODUCTION'} probe\n`)

  // 1. locations
  const loc = await sq('locations')
  if (!loc.ok) {
    console.error('  ✗ locations:', loc.status, JSON.stringify(loc.json.errors))
    process.exit(1)
  }
  const location = loc.json.locations?.[0]
  console.log(`  ✓ location: ${location.id} (${location.name}, ${location.status})`)

  // 2. existing appointment services
  const cat = await sq('catalog/list?types=ITEM')
  const existing = new Set(
    (cat.json.objects ?? [])
      .filter((o) => o.item_data?.product_type === 'APPOINTMENTS_SERVICE')
      .map((o) => o.item_data?.name)
  )

  // 3. seed the menu (skip what exists)
  for (const svc of MENU) {
    if (existing.has(svc.name)) {
      console.log(`  · service exists: ${svc.name}`)
      continue
    }
    const up = await sq('catalog/object', 'POST', {
      idempotency_key: randomUUID(),
      object: {
        type: 'ITEM',
        id: `#${svc.name.replace(/\s/g, '')}`,
        item_data: {
          name: svc.name,
          product_type: 'APPOINTMENTS_SERVICE',
          variations: [
            {
              type: 'ITEM_VARIATION',
              id: `#${svc.name.replace(/\s/g, '')}Var`,
              item_variation_data: {
                name: 'Regular',
                pricing_type: 'FIXED_PRICING',
                price_money: { amount: svc.cents, currency: 'USD' },
                service_duration: svc.minutes * 60000,
                available_for_booking: true,
              },
            },
          ],
        },
      },
    })
    console.log(up.ok ? `  ✓ created service: ${svc.name}` : `  ✗ ${svc.name}: ${JSON.stringify(up.json.errors?.[0])}`)
  }

  // 4. team members + booking profiles — the likely sandbox weak spot
  const team = await sq('team-members/search', 'POST', { query: { filter: { status: 'ACTIVE' } } })
  const members = team.json.team_members ?? []
  console.log(`\n  team members: ${members.length}`)
  members.forEach((m) => console.log(`    - ${m.id} ${m.given_name ?? ''} ${m.family_name ?? ''} ${m.is_owner ? '(owner)' : ''}`))

  const profiles = await sq('bookings/team-member-booking-profiles?bookable_only=true')
  if (!profiles.ok) {
    console.log(`  ✗ booking profiles: ${profiles.status} ${JSON.stringify(profiles.json.errors?.[0])}`)
  } else {
    const bookable = profiles.json.team_member_booking_profiles ?? []
    console.log(`  bookable staff: ${bookable.length}`)
    bookable.forEach((p) => console.log(`    - ${p.team_member_id} ${p.display_name ?? ''}`))
    if (!bookable.length) {
      console.log('    ⚠ nobody is bookable — Appointments must be enabled for the seller,')
      console.log('      or staff marked bookable in the (sandbox) Dashboard -> Appointments -> Staff.')
    }
  }

  // 5. availability probe (uses the first service + tomorrow)
  const cat2 = await sq('catalog/list?types=ITEM')
  const svcObj = (cat2.json.objects ?? []).find((o) => o.item_data?.product_type === 'APPOINTMENTS_SERVICE')
  const variation = svcObj?.item_data?.variations?.[0]
  if (variation) {
    const start = new Date(Date.now() + 24 * 3600_000)
    const end = new Date(start.getTime() + 24 * 3600_000)
    const avail = await sq('bookings/availability/search', 'POST', {
      query: {
        filter: {
          start_at_range: { start_at: start.toISOString(), end_at: end.toISOString() },
          location_id: location.id,
          segment_filters: [{ service_variation_id: variation.id }],
        },
      },
    })
    if (avail.ok) {
      const n = (avail.json.availabilities ?? []).length
      console.log(`\n  ✓ availability search works — ${n} open slot(s) tomorrow`)
      if (!n) console.log('    (0 slots usually means: no bookable staff, or business hours unset)')
    } else {
      console.log(`\n  ✗ availability search: ${avail.status} ${JSON.stringify(avail.json.errors?.[0])}`)
    }
  }

  console.log('\n  done.\n')
})().catch((e) => {
  console.error('  ✗', e.message)
  process.exit(1)
})
