'use client'

import { useCallback, useState } from 'react'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

// Create the Stripe instance ONCE at module scope, never inside render — a new
// loadStripe() on every render re-downloads Stripe.js and remounts Checkout.
// When the publishable key is missing we keep this null and surface a clear
// operator-facing message instead of crashing.
const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise: Promise<Stripe | null> | null = pk ? loadStripe(pk) : null

const KAKAO_URL = 'http://pf.kakao.com/_xhxdxmlX/chat'

function ContactNote() {
  return (
    <p className="mt-3 text-sm text-ash">
      결제에 문제가 있으신가요? 카카오톡으로 문의해 주세요.{' '}
      <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">
        카카오톡 상담 / KakaoTalk
      </a>
    </p>
  )
}

function Fallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-hairline bg-paper p-5 text-sm text-ash">
      {children}
      <ContactNote />
    </div>
  )
}

export default function CheckoutEmbed({ token }: { token: string }) {
  const [failed, setFailed] = useState<'error' | 'already_paid' | null>(null)

  const fetchClientSecret = useCallback(
    () =>
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then((r) => r.json())
        .then((d: { clientSecret?: string; error?: string }) => {
          if (!d.clientSecret) throw new Error(d.error || 'checkout_failed')
          return d.clientSecret
        })
        .catch((e: unknown) => {
          // Swap to an on-brand message instead of Stripe's raw error. The
          // already-paid case (paid in another tab, then refreshed here) gets
          // its own copy — it is good news, not an error.
          const msg = e instanceof Error ? e.message : ''
          setFailed(msg === 'already_paid' ? 'already_paid' : 'error')
          throw e instanceof Error ? e : new Error('checkout_failed')
        }),
    [token]
  )

  // Operator misconfiguration: publishable key not set.
  if (!stripePromise) {
    return (
      <Fallback>
        결제 시스템을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.
        <br />
        <span className="text-mute">Payment is temporarily unavailable. Please try again shortly.</span>
      </Fallback>
    )
  }

  // The link was already used — most likely paid moments ago in another tab.
  if (failed === 'already_paid') {
    return (
      <Fallback>
        이미 결제가 완료되어 추가 결제가 필요하지 않습니다.
        <br />
        <span className="text-mute">This has already been paid — no further payment is needed.</span>
      </Fallback>
    )
  }

  // Checkout could not be initialized (network / token rejected server-side).
  if (failed) {
    return (
      <Fallback>
        결제 화면을 불러오지 못했습니다. 페이지를 새로고침하시거나 아래로 문의해 주세요.
        <br />
        <span className="text-mute">We couldn&apos;t load the payment form. Please refresh, or contact us below.</span>
      </Fallback>
    )
  }

  return (
    <div id="checkout" className="relative min-h-[280px]">
      {/* Loading placeholder — Stripe.js paints its Checkout iframe over this. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 text-ash">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-mute border-t-ink" />
        <span className="text-sm">결제 화면을 불러오는 중… / Loading…</span>
      </div>
      <div className="relative">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}
