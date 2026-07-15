import 'server-only'

/**
 * Square API client for the booking system.
 *
 * Raw fetch, no SDK — same pattern as our Stripe layer: one less dependency to
 * keep in lockstep with an API version, and every call site states exactly
 * which endpoint it hits.
 *
 * SQUARE_ENV selects sandbox vs production. The prototype runs entirely against
 * the sandbox (fake sellers, fake bookings); pointing at a real salon later is
 * an env change plus that seller's OAuth token — no code change.
 *
 * Buyer-level booking (a customer booking themselves) is available on Square's
 * FREE Appointments tier, which is the entire reason this architecture works
 * without a paid plan. Seller-level operations need Appointments Plus.
 */

const SQUARE_VERSION = '2026-05-21'

function baseUrl(): string {
  return process.env.SQUARE_ENV === 'production'
    ? 'https://connect.squareup.com'
    : 'https://connect.squareupsandbox.com'
}

function token(): string {
  const t = process.env.SQUARE_ACCESS_TOKEN
  if (!t) throw new Error('SQUARE_ACCESS_TOKEN is not set')
  return t
}

export class SquareError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: unknown[]
  ) {
    super(message)
  }
}

export async function square<T = Record<string, unknown>>(
  path: string,
  init?: { method?: string; body?: unknown }
): Promise<T> {
  const res = await fetch(`${baseUrl()}/v2/${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token()}`,
      'Square-Version': SQUARE_VERSION,
      'Content-Type': 'application/json',
    },
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: 'no-store',
  })

  const json = (await res.json().catch(() => ({}))) as T & { errors?: { detail?: string; code?: string }[] }
  if (!res.ok) {
    const first = json.errors?.[0]
    throw new SquareError(first?.detail ?? first?.code ?? `Square ${path} failed`, res.status, json.errors ?? [])
  }
  return json
}

/** The location every booking hangs off. Configured, or the seller's first. */
export async function locationId(): Promise<string> {
  const configured = process.env.SQUARE_LOCATION_ID
  if (configured) return configured
  const { locations } = await square<{ locations?: { id: string; status: string }[] }>('locations')
  const active = locations?.find((l) => l.status === 'ACTIVE') ?? locations?.[0]
  if (!active) throw new Error('Square account has no locations')
  return active.id
}
