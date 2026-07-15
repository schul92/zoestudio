import { square, locationId, SquareError } from '@/lib/booking/square'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/booking/availability   [PUBLIC]
 *
 * { serviceVariationId, date: "2026-07-20", teamMemberId? }
 * -> { slots: [{ startAt, teamMemberId }] }
 *
 * Square computes the open slots from the seller's business hours, staff
 * schedules and existing bookings — we never re-derive any of that, so the
 * website can not double-book or offer a closed hour.
 */

type Body = { serviceVariationId?: unknown; teamMemberId?: unknown; date?: unknown }

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const serviceVariationId = typeof body.serviceVariationId === 'string' ? body.serviceVariationId : ''
  const teamMemberId = typeof body.teamMemberId === 'string' ? body.teamMemberId : ''
  const date = typeof body.date === 'string' ? body.date : ''
  if (!serviceVariationId || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ error: 'serviceVariationId and date (YYYY-MM-DD) are required' }, { status: 400 })
  }

  // Square requires the search window to start in the future; for "today" that
  // means now, not midnight (which would be in the past and get rejected).
  const dayStart = new Date(`${date}T00:00:00.000Z`)
  const dayEnd = new Date(`${date}T23:59:59.000Z`)
  const start = dayStart.getTime() < Date.now() ? new Date(Date.now() + 5 * 60_000) : dayStart
  if (start >= dayEnd) return Response.json({ slots: [] })

  try {
    const result = await square<{
      availabilities?: { start_at: string; appointment_segments?: { team_member_id?: string }[] }[]
    }>('bookings/availability/search', {
      method: 'POST',
      body: {
        query: {
          filter: {
            start_at_range: { start_at: start.toISOString(), end_at: dayEnd.toISOString() },
            location_id: await locationId(),
            segment_filters: [
              {
                service_variation_id: serviceVariationId,
                ...(teamMemberId ? { team_member_id_filter: { any: [teamMemberId] } } : {}),
              },
            ],
          },
        },
      },
    })

    const slots = (result.availabilities ?? []).map((a) => ({
      startAt: a.start_at,
      teamMemberId: a.appointment_segments?.[0]?.team_member_id ?? null,
    }))
    return Response.json({ slots })
  } catch (err) {
    const detail = err instanceof SquareError ? err.message : 'availability_failed'
    console.error('[booking.availability]', detail)
    return Response.json({ error: detail }, { status: 502 })
  }
}
