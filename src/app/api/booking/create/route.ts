import { randomUUID } from 'crypto'
import { square, locationId, SquareError } from '@/lib/booking/square'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/booking/create   [PUBLIC]
 *
 * { startAt, serviceVariationId, serviceVariationVersion, teamMemberId,
 *   givenName, email, phone?, note? }
 *
 * Buyer-level booking: the customer books themself, which is exactly what
 * Square's FREE Appointments tier allows through the API. Square enforces the
 * rules (no double booking, business hours) server-side, so a stale slot on
 * screen fails loudly here instead of overbooking the salon.
 *
 * The customer record is reused by email when one exists — repeat clients
 * accumulate a history in the seller's Square CRM instead of duplicates.
 */

type Body = {
  startAt?: unknown
  serviceVariationId?: unknown
  serviceVariationVersion?: unknown
  teamMemberId?: unknown
  givenName?: unknown
  email?: unknown
  phone?: unknown
  note?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const startAt = str(body.startAt)
  const serviceVariationId = str(body.serviceVariationId)
  const teamMemberId = str(body.teamMemberId)
  const givenName = str(body.givenName)
  const email = str(body.email)
  const phone = str(body.phone)
  const note = str(body.note).slice(0, 500)
  const serviceVariationVersion =
    typeof body.serviceVariationVersion === 'number' ? body.serviceVariationVersion : 0

  if (!startAt || Number.isNaN(Date.parse(startAt))) return Response.json({ error: 'valid startAt is required' }, { status: 400 })
  if (!serviceVariationId || !teamMemberId) return Response.json({ error: 'service and staff are required' }, { status: 400 })
  if (!givenName) return Response.json({ error: 'name is required' }, { status: 400 })
  if (!EMAIL_RE.test(email)) return Response.json({ error: 'a valid email is required' }, { status: 400 })

  try {
    // Reuse the customer by email, else create — same dedupe rule as billing.
    const found = await square<{ customers?: { id: string }[] }>('customers/search', {
      method: 'POST',
      body: { query: { filter: { email_address: { exact: email } } }, limit: 1 },
    })
    const customerId =
      found.customers?.[0]?.id ??
      (
        await square<{ customer: { id: string } }>('customers', {
          method: 'POST',
          body: {
            idempotency_key: randomUUID(),
            given_name: givenName,
            email_address: email,
            ...(phone ? { phone_number: phone } : {}),
          },
        })
      ).customer.id

    const { booking } = await square<{
      booking: { id: string; start_at: string; status: string }
    }>('bookings', {
      method: 'POST',
      body: {
        idempotency_key: randomUUID(),
        booking: {
          location_id: await locationId(),
          start_at: startAt,
          customer_id: customerId,
          ...(note ? { customer_note: note } : {}),
          appointment_segments: [
            {
              service_variation_id: serviceVariationId,
              service_variation_version: serviceVariationVersion,
              team_member_id: teamMemberId,
            },
          ],
        },
      },
    })

    return Response.json({ bookingId: booking.id, startAt: booking.start_at, status: booking.status })
  } catch (err) {
    // A slot that filled while the client was typing comes back from Square as
    // an error — surface it as "pick another time", not a server fault.
    if (err instanceof SquareError) {
      console.warn('[booking.create]', err.status, err.message)
      const taken = err.status === 400 || err.status === 409
      return Response.json(
        { error: taken ? 'slot_unavailable' : 'booking_failed', detail: err.message },
        { status: taken ? 409 : 502 }
      )
    }
    console.error('[booking.create]', err instanceof Error ? err.message : err)
    return Response.json({ error: 'booking_failed' }, { status: 502 })
  }
}
