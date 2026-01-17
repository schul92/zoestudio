'use client'

import { useState, useEffect } from 'react'

interface OneTimeToggleProps {
  locale: 'en' | 'ko'
}

export default function OneTimeToggle({ locale }: OneTimeToggleProps) {
  const [isAnnual, setIsAnnual] = useState(false)

  useEffect(() => {
    updatePricing(isAnnual)
  }, [isAnnual])

  const updatePricing = (annual: boolean) => {
    // Update Hobby: $1k -> $700 (30% off)
    const hobbyPrice = document.querySelector('[data-tier="hobby"] .price-display')
    if (hobbyPrice) {
      hobbyPrice.textContent = annual ? '$700' : '$1k'
    }

    // Update Plus: $2k-3k -> $1.4k-2.1k (30% off)
    const plusPrice = document.querySelector('[data-tier="plus"] .price-display')
    if (plusPrice) {
      plusPrice.textContent = annual ? '$1.4k-2.1k' : '$2k-3k'
    }

    // Update Pro: $3k-6k -> $2.1k-4.2k (30% off)
    const proPrice = document.querySelector('[data-tier="pro"] .price-display')
    if (proPrice) {
      proPrice.textContent = annual ? '$2.1k-4.2k' : '$3k-6k'
    }

    // Show/hide discount badges
    const discountBadges = document.querySelectorAll('.annual-discount-badge')
    discountBadges.forEach((badge) => {
      if (annual) {
        badge.classList.remove('hidden')
      } else {
        badge.classList.add('hidden')
      }
    })

    // Update subscription commitment text
    const commitmentTexts = document.querySelectorAll('.subscription-commitment')
    commitmentTexts.forEach((text) => {
      if (annual) {
        text.classList.remove('hidden')
      } else {
        text.classList.add('hidden')
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-12">
      <div className="flex items-center gap-4">
        <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>
          {locale === 'en' ? 'No Commitment' : '약정 없음'}
        </span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          role="switch"
          aria-checked={isAnnual}
          aria-label="Toggle annual subscription commitment"
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isAnnual ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
            {locale === 'en' ? 'Annual Subscription' : '연간 구독'}
          </span>
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 text-xs font-bold text-white">
            {locale === 'en' ? '30% OFF Build Fee' : '제작비 30% 할인'}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-400 text-center max-w-2xl">
        {isAnnual ? (
          locale === 'en'
            ? 'Commit to an annual subscription and save 30% on your one-time build fee. Cancel anytime after 12 months.'
            : '연간 구독을 약정하고 일회성 제작비에서 30% 할인을 받으세요. 12개월 후 언제든지 취소 가능합니다.'
        ) : (
          locale === 'en'
            ? 'Start with our standard pricing. You can upgrade to a subscription plan anytime.'
            : '표준 가격으로 시작하세요. 언제든지 구독 플랜으로 업그레이드할 수 있습니다.'
        )}
      </p>
    </div>
  )
}