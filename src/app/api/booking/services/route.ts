import { square, locationId } from '@/lib/booking/square'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/booking/services   [PUBLIC]
 *
 * Everything the booking page needs to render its first screen: the bookable
 * services (name, duration, price) and the bookable staff. Names and prices
 * come straight from the seller's Square catalog, so the salon edits their
 * menu in Square and the website follows — no redeploys.
 */

type CatalogObject = {
  id: string
  type: string
  version?: number
  item_data?: {
    name?: string
    product_type?: string
    variations?: CatalogObject[]
  }
  item_variation_data?: {
    name?: string
    price_money?: { amount?: number; currency?: string }
    service_duration?: number
  }
}

export async function GET() {
  try {
    const [catalog, profiles, location] = await Promise.all([
      square<{ objects?: CatalogObject[] }>('catalog/list?types=ITEM'),
      square<{ team_member_booking_profiles?: { team_member_id: string; display_name?: string; is_bookable?: boolean }[] }>(
        'bookings/team-member-booking-profiles?bookable_only=true'
      ),
      locationId(),
    ])

    const services = (catalog.objects ?? [])
      .filter((o) => o.item_data?.product_type === 'APPOINTMENTS_SERVICE')
      .flatMap((item) =>
        (item.item_data?.variations ?? []).map((v) => ({
          id: v.id,
          version: v.version ?? 0,
          name:
            item.item_data?.name && v.item_variation_data?.name && v.item_variation_data.name !== 'Regular'
              ? `${item.item_data.name} — ${v.item_variation_data.name}`
              : (item.item_data?.name ?? 'Service'),
          priceCents: v.item_variation_data?.price_money?.amount ?? null,
          durationMinutes: v.item_variation_data?.service_duration
            ? Math.round(v.item_variation_data.service_duration / 60000)
            : null,
        }))
      )

    const staff = (profiles.team_member_booking_profiles ?? []).map((p) => ({
      id: p.team_member_id,
      name: p.display_name ?? 'Staff',
    }))

    return Response.json({ locationId: location, services, staff })
  } catch (err) {
    console.error('[booking.services]', err instanceof Error ? err.message : err)
    return Response.json({ error: 'services_unavailable' }, { status: 502 })
  }
}
