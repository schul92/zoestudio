/**
 * Cal.com booking (the open-source Calendly, ~46k★) — applied here as a one-click
 * "book a free 30-min call" link in the contact flow, closing the funnel gap
 * where it previously dead-ended at a form.
 *
 * TO ACTIVATE: create a free account at https://cal.com, then set CAL_HANDLE to
 * your handle (e.g. 'zoe-lumos' or 'zoe-lumos/30min'). No env var or backend
 * needed. While empty, the booking CTA is hidden and the existing contact flow
 * is unchanged — safe to ship.
 */
export const CAL_HANDLE: string = ''

export const BOOKING_URL: string = CAL_HANDLE
  ? `https://cal.com/${CAL_HANDLE.replace(/^\/+/, '')}`
  : ''
