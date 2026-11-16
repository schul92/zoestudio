'use client'

import { useState } from 'react'
import CheckoutEmbed from './CheckoutEmbed'

/**
 * For links with a card price (Price metadata zl_card_fee): the client picks card or bank first, and Checkout opens for
 * that method at that amount. Nothing is preselected and neither is pushed (Steve, Nov 13: the card amount covers the
 * fee, so just offer both). Switching remounts Checkout, since a session's amount and methods are fixed at creation.
 */
export default function PayMethodPicker({
  token,
  bank,
  card,
  fee,
  suffixKo,
  suffixEn,
}: {
  token: string
  bank: string
  card: string
  fee: string
  suffixKo: string
  suffixEn: string
}) {
  const [method, setMethod] = useState<'bank' | 'card' | null>(null)
  const options = [
    {
      key: 'card' as const,
      ko: '카드',
      en: 'Credit or debit card',
      amount: card,
      feeKo: `${bank} + 카드 수수료 ${fee}`,
      feeEn: `incl. ${fee} card processing fee`,
    },
    { key: 'bank' as const, ko: '은행 계좌', en: 'US bank account', amount: bank, feeKo: '수수료 없음', feeEn: 'No fee' },
  ]

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-graphite">결제 방법 / Pay with</p>
      <div role="radiogroup" aria-label="결제 방법 / Pay with" className="mb-5 grid grid-cols-2 gap-3">
        {options.map((o) => {
          const on = method === o.key
          return (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setMethod(o.key)}
              className={`rounded-xl border p-4 text-left transition-[border-color,background-color] duration-150 active:scale-[0.98] ${
                on ? 'border-gold bg-gold/[0.06]' : 'border-hairline bg-paper hover:border-mute'
              }`}
            >
              <span className="block text-sm text-ink">{o.ko}</span>
              <span className="block text-xs text-mute">{o.en}</span>
              <span className="mt-3 block font-display text-2xl text-ink">
                {o.amount}
                {suffixKo && (
                  <span className="ml-1 text-sm text-ash">
                    {suffixKo}
                    <span className="ml-0.5 text-xs text-mute">{suffixEn}</span>
                  </span>
                )}
              </span>
              <span className="mt-2 block text-xs text-graphite">{o.feeKo}</span>
              <span className="block text-[11px] text-mute">{o.feeEn}</span>
            </button>
          )
        })}
      </div>
      {method && <CheckoutEmbed key={method} token={token} method={method} />}
    </div>
  )
}
