import 'server-only'
import type Stripe from 'stripe'
import { stripe, billingProducts } from './stripe'
import { sendPaymentReminder } from './email'
import { SITE_URL } from '@/lib/siteUrl'

/**
 * Payment reminders for clients who were sent a link but never used it.
 *
 * There is no database, so the send history rides on the Stripe Price metadata:
 *
 *   zl_reminded_at    unix seconds of the last reminder we sent
 *   zl_reminder_count how many we have sent in total
 *
 * The rules exist to stop this becoming spam. A reminder goes out only when the
 * link is at least GRACE_DAYS old (a client who got the link this morning is not
 * late), at most MAX_REMINDERS have been sent, and the last one was at least
 * COOLDOWN_DAYS ago. Expired and already-paid links are skipped entirely.
 *
 * Writing the metadata BEFORE sending is deliberate: a crash between the two
 * silently skips one reminder, which is strictly better than a retry loop that
 * mails a client the same nudge every few minutes.
 */

const DAY = 86_400
const GRACE_DAYS = 3
const COOLDOWN_DAYS = 7
const MAX_REMINDERS = 3

export type ReminderOutcome = {
  priceId: string
  clientName: string
  email: string | null
  amountCents: number
  /** 'sent', or why it was skipped. */
  result: 'sent' | 'too_new' | 'cooling_down' | 'max_reached' | 'no_email' | 'failed'
}

export type ReminderRun = {
  scanned: number
  sent: number
  outcomes: ReminderOutcome[]
}

type Candidate = {
  price: Stripe.Price
  customer: Stripe.Customer
  daysLeft: number
}

/** Every unpaid, unexpired pay link, with its customer resolved. */
async function candidates(): Promise<Candidate[]> {
  const s = stripe()
  const now = Math.floor(Date.now() / 1000)

  const [products, sessions, subs] = await Promise.all([
    billingProducts(),
    s.checkout.sessions.list({ limit: 100 }).autoPagingToArray({ limit: 1000 }),
    s.subscriptions.list({ status: 'all', limit: 100 }).autoPagingToArray({ limit: 1000 }),
  ])

  // A link is spent once its checkout completed or a subscription exists on it.
  const spent = new Set<string>()
  for (const cs of sessions) {
    if (cs.status === 'complete' && cs.metadata?.zl_price) spent.add(cs.metadata.zl_price)
  }
  const LIVE: readonly string[] = ['active', 'trialing', 'past_due', 'unpaid']
  for (const sub of subs) {
    if (!LIVE.includes(sub.status)) continue
    for (const item of sub.items.data) spent.add(item.price.id)
  }

  const prices = (
    await Promise.all(
      products.map((p) =>
        s.prices.list({ product: p.id, active: true, limit: 100 }).autoPagingToArray({ limit: 1000 })
      )
    )
  ).flat()

  const unpaid = prices.filter((p) => {
    if (!p.lookup_key || !p.metadata.zl_customer) return false
    if (spent.has(p.id)) return false
    const exp = Number(p.metadata.zl_pay_exp ?? 0)
    return Number.isFinite(exp) && exp > now
  })

  const out: Candidate[] = []
  for (const price of unpaid) {
    try {
      const customer = await s.customers.retrieve(price.metadata.zl_customer)
      if (customer.deleted) continue
      out.push({
        price,
        customer,
        daysLeft: Math.max(0, Math.ceil((Number(price.metadata.zl_pay_exp) - now) / DAY)),
      })
    } catch {
      // A deleted or unreadable customer is not worth failing the whole run.
    }
  }
  return out
}

/** Why this link should (or should not) be nudged right now. */
function decide(price: Stripe.Price, force: boolean): ReminderOutcome['result'] | 'ok' {
  const now = Math.floor(Date.now() / 1000)
  const count = Number(price.metadata.zl_reminder_count ?? 0)
  const last = Number(price.metadata.zl_reminded_at ?? 0)

  // The manual "Send reminder" button is an explicit human decision; it only
  // respects the hard ceiling, not the waiting periods.
  if (count >= MAX_REMINDERS) return 'max_reached'
  if (force) return 'ok'
  if (now - price.created < GRACE_DAYS * DAY) return 'too_new'
  if (last > 0 && now - last < COOLDOWN_DAYS * DAY) return 'cooling_down'
  return 'ok'
}

async function remindOne(c: Candidate, force: boolean): Promise<ReminderOutcome> {
  const { price, customer, daysLeft } = c
  const base = {
    priceId: price.id,
    clientName: customer.name || customer.email || '—',
    email: customer.email ?? null,
    amountCents: price.unit_amount ?? 0,
  }

  const verdict = decide(price, force)
  if (verdict !== 'ok') return { ...base, result: verdict }
  if (!customer.email) return { ...base, result: 'no_email' }

  // Record first: a crash here costs one reminder, not a mail loop.
  try {
    await stripe().prices.update(price.id, {
      metadata: {
        ...price.metadata,
        zl_reminded_at: String(Math.floor(Date.now() / 1000)),
        zl_reminder_count: String(Number(price.metadata.zl_reminder_count ?? 0) + 1),
      },
    })
  } catch {
    return { ...base, result: 'failed' }
  }

  await sendPaymentReminder({
    to: customer.email,
    clientName: base.clientName,
    amountCents: base.amountCents,
    payUrl: `${SITE_URL}/pay/${price.lookup_key}`,
    interval: price.recurring?.interval === 'year' ? 'year' : price.recurring ? 'month' : 'once',
    daysLeft,
  })

  return { ...base, result: 'sent' }
}

/** Scan every unpaid link and nudge the ones that are due. */
export async function runReminders(): Promise<ReminderRun> {
  const list = await candidates()
  const outcomes: ReminderOutcome[] = []
  for (const c of list) outcomes.push(await remindOne(c, false))
  return {
    scanned: list.length,
    sent: outcomes.filter((o) => o.result === 'sent').length,
    outcomes,
  }
}

/** Send one reminder now, on the operator's explicit say-so. */
export async function remindNow(priceId: string): Promise<ReminderOutcome | null> {
  const found = (await candidates()).find((c) => c.price.id === priceId)
  if (!found) return null
  return remindOne(found, true)
}
