import { resolvePaySegment } from '@/lib/billing/resolve'
import { spentPriceIds } from '@/lib/billing/spent'
import {
  stripe,
  parseServices,
  fmtUSD,
  SERVICES,
  BILLING_PERIODS,
  type BillingPeriod,
} from '@/lib/billing/stripe'
import CheckoutEmbed from '@/components/billing/CheckoutEmbed'

// Private per-client link — always resolve fresh, never cache.
export const dynamic = 'force-dynamic'

const MAIL = 'info@zoelumos.com'
const KAKAO_URL = 'http://pf.kakao.com/_xhxdxmlX/chat'

// ── Minimal on-brand header ──────────────────────────────────────────
function Wordmark() {
  return (
    <div className="text-sm font-medium tracking-[0.2em] text-ink">
      ZOE <span className="text-gold">LUMOS</span>
    </div>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-10 sm:py-16">
      <header className="mb-10">
        <Wordmark />
      </header>
      {children}
    </main>
  )
}

// ── Expired / invalid — never leak why ───────────────────────────────
function InvalidLink() {
  return (
    <Shell>
      <div className="rounded-2xl border border-hairline bg-paper p-8">
        <h1 className="font-display text-2xl text-ink">
          결제 링크를 열 수 없습니다
          <span className="mt-1 block text-base font-normal text-ash">This payment link has expired or is invalid.</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-graphite">
          링크가 만료되었거나 올바르지 않습니다. 저희에게 연락 주시면 새 결제 링크를 보내드리겠습니다.
          <br />
          <span className="text-ash">Please contact us and we&apos;ll send you a fresh link.</span>
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${MAIL}`}
            className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-opacity hover:opacity-90"
          >
            이메일 문의 / Email us
          </a>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-hairline px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
          >
            카카오톡 상담 / KakaoTalk
          </a>
        </div>
      </div>
    </Shell>
  )
}

// ── Success / processing (return_url ?done=<session_id>) ─────────────
// `processing` is the ACH path: checkout is complete but the bank transfer
// settles over a few days — saying "완료" there would be a lie.
function Success({ name, processing }: { name: string; processing: boolean }) {
  return (
    <Shell>
      <div className="rounded-2xl border border-hairline bg-paper p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold">
          ✓
        </div>
        <h1 className="mt-5 font-display text-2xl text-ink">
          {processing ? '결제가 접수되었습니다' : '결제가 완료되었습니다'}
          <span className="mt-1 block text-base font-normal text-ash">
            {processing ? 'Payment initiated' : 'Payment complete'}
          </span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-graphite">
          {processing ? (
            <>
              {name}님, 감사합니다. 은행 이체는 처리에 2–4 영업일이 걸리며, 완료되면 이메일로 알려드립니다.
              <br />
              <span className="text-ash">
                Thank you — bank transfers take 2–4 business days to settle. We&apos;ll email you a confirmation.
              </span>
            </>
          ) : (
            <>
              {name}님, 결제해 주셔서 감사합니다. 영수증을 이메일로 보내드렸습니다.
              <br />
              <span className="text-ash">Thank you — a receipt has been emailed to you.</span>
            </>
          )}
        </p>
        <p className="mt-6 text-xs text-mute">
          문의: <a href={`mailto:${MAIL}`} className="text-gold underline underline-offset-2">{MAIL}</a>
          {' · '}
          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">
            KakaoTalk
          </a>
        </p>
      </div>
    </Shell>
  )
}

// ── Already paid — the link was already used ──────────────────────────
function AlreadyPaid({ name, once }: { name: string; once: boolean }) {
  return (
    <Shell>
      <div className="rounded-2xl border border-hairline bg-paper p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold">
          ✓
        </div>
        <h1 className="mt-5 font-display text-2xl text-ink">
          {once ? '이미 결제가 완료되었습니다' : '이미 구독이 완료되었습니다'}
          <span className="mt-1 block text-base font-normal text-ash">
            {once ? 'This invoice is already paid' : "You're already subscribed"}
          </span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-graphite">
          {once ? (
            <>
              {name}님, 이 결제는 이미 처리되어 추가 결제가 필요하지 않습니다.
              <br />
              <span className="text-ash">This payment has already gone through — nothing further is needed.</span>
            </>
          ) : (
            <>
              {name}님의 정기 결제는 이미 등록되어 있어 추가 결제가 필요하지 않습니다.
              <br />
              <span className="text-ash">Your subscription is active — no further payment is needed.</span>
            </>
          )}
        </p>
        <p className="mt-6 text-xs text-mute">
          문의: <a href={`mailto:${MAIL}`} className="text-gold underline underline-offset-2">{MAIL}</a>
          {' · '}
          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">
            KakaoTalk
          </a>
        </p>
      </div>
    </Shell>
  )
}

export default async function PayPage({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams: { done?: string }
}) {
  // Accepts a short code or a legacy signed token; both yield (customer, price).
  //
  // Paying BURNS the link (the webhook deactivates its Price), and Stripe then
  // redirects the client straight back here with ?done. So the return trip must
  // be allowed to resolve a spent link, or the client would land on "expired"
  // one second after paying. Only this read path may do so — /api/checkout,
  // which can take money, always resolves strictly.
  const returning = Boolean(searchParams.done)
  const payload = await resolvePaySegment(params.token, { allowSpent: returning })
  if (!payload) return <InvalidLink />

  // Load the client + price server-side. Any Stripe failure or a deleted
  // customer collapses to the same neutral invalid-link page — we never leak
  // ids or the reason a token failed.
  let name = ''
  let amountLabel = ''
  let periodKo = '월 정기 결제'
  let periodEn = 'Monthly retainer'
  let suffixKo = '/월'
  let suffixEn = '/mo'
  let services: ReturnType<typeof parseServices> = []
  let alreadyPaid = false
  let once = false

  try {
    const s = stripe()
    const [customer, price, spent] = await Promise.all([
      s.customers.retrieve(payload.customerId),
      s.prices.retrieve(payload.priceId),
      spentPriceIds(payload.customerId),
    ])
    if (customer.deleted) return <InvalidLink />
    // A revoked link (price deactivated) must die here too — legacy signed
    // tokens skip the lookup-key resolver, so this is their revocation check.
    if (!price.active && !returning) return <InvalidLink />

    name = customer.name || customer.email || 'Valued client'
    amountLabel = fmtUSD(price.unit_amount ?? 0)

    // A Price with no `recurring` is a single payment.
    const period: BillingPeriod = price.recurring?.interval === 'year' ? 'year' : price.recurring ? 'month' : 'once'
    once = period === 'once'
    suffixKo = BILLING_PERIODS[period].suffixKo
    suffixEn = BILLING_PERIODS[period].suffixEn
    if (period === 'once') {
      periodKo = '1회 결제'
      periodEn = 'One-time payment'
    } else if (period === 'year') {
      periodKo = '연 정기 결제'
      periodEn = 'Yearly retainer'
    }

    services = parseServices(typeof price.metadata?.zl_services === 'string' ? price.metadata.zl_services : null)

    // Same rule as /api/checkout: money already taken on this Price means the
    // link was used. `incomplete` subscriptions stay payable — that is the
    // retry path after a failed first attempt, and spentPriceIds() excludes it.
    alreadyPaid = spent.has(payload.priceId)
  } catch {
    return <InvalidLink />
  }

  // Post-payment return. Verify the session id with Stripe instead of trusting
  // the query string — ?done=anything must not fabricate a success screen.
  if (searchParams.done) {
    try {
      const session = await stripe().checkout.sessions.retrieve(searchParams.done)
      const sessionCustomer =
        typeof session.customer === 'string' ? session.customer : (session.customer?.id ?? null)
      if (session.status === 'complete' && sessionCustomer === payload.customerId) {
        // Cards settle instantly (payment_status 'paid'); ACH returns 'unpaid'
        // while the debit is in flight.
        return <Success name={name} processing={session.payment_status !== 'paid'} />
      }
    } catch {
      /* unknown session id — fall through to the states below */
    }
  }

  if (alreadyPaid) return <AlreadyPaid name={name} once={once} />

  return (
    <Shell>
      <div className="space-y-8">
        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-mute">
            {periodKo} / {periodEn}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">{name}</h1>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl text-ink">{amountLabel}</span>
            {suffixKo && (
              <span className="text-lg text-ash">
                {suffixKo}
                <span className="ml-1 text-sm text-mute">{suffixEn}</span>
              </span>
            )}
          </div>
        </section>

        {services.length > 0 && (
          <section className="rounded-2xl border border-hairline bg-paper p-6">
            <h2 className="mb-4 text-sm font-medium text-graphite">포함된 서비스 / What&apos;s included</h2>
            <ul className="space-y-3">
              {services.map((k) => (
                <li key={k} className="flex gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-gold">✓</span>
                  <span>
                    <span className="block text-sm text-ink">{SERVICES[k].ko}</span>
                    <span className="block text-xs text-mute">{SERVICES[k].en}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          {/* Checkout reorders payment methods by its own conversion heuristics
              and gives us no ordering control, so we point at the cheaper rail
              here. ACH costs us 0.8% capped at $5; cards cost 2.9% + 30c. */}
          <div className="mb-4 flex gap-3 rounded-xl border border-gold/25 bg-gold/[0.06] p-4">
            <span className="mt-0.5 flex-shrink-0 text-gold">🏦</span>
            <p className="text-xs leading-relaxed text-graphite">
              <strong className="font-medium text-ink">은행 계좌(US bank account)로 결제하시길 권해드립니다.</strong>
              <br />
              카드보다 수수료가 낮아 그만큼을 서비스에 더 쓸 수 있습니다. 은행 로그인 한 번으로 몇 초 만에 인증됩니다.
              <br />
              <span className="text-mute">
                We recommend paying by US bank account — lower processing fees, verified in seconds.
              </span>
            </p>
          </div>
          <CheckoutEmbed token={params.token} />
          <p className="mt-4 text-xs leading-relaxed text-mute">
            결제는 Stripe가 안전하게 처리하며, 카드 정보는 저희 서버에 저장되지 않습니다.
            <br />
            <span>Payments are processed securely by Stripe; we never store your card details.</span>
          </p>
          {/* The Stripe portal has cancellation disabled on purpose, so say
              plainly how to cancel rather than letting a client hunt for it.
              A one-time payment has nothing to cancel. */}
          {!once && (
          <p className="mt-2 text-xs leading-relaxed text-mute">
            해지는 언제든 가능합니다.{' '}
            <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">
              카카오톡
            </a>
            {' 또는 '}
            <a href={`mailto:${MAIL}`} className="text-gold underline underline-offset-2">
              {MAIL}
            </a>
            로 알려주시면 결제하신 기간까지 서비스가 유지된 뒤 종료되며, 추가 청구는 없습니다.
            <br />
            <span>
              Cancel any time — message us and your service runs through the period you already paid for, with no
              further charges.
            </span>
          </p>
          )}
        </section>
      </div>
    </Shell>
  )
}
