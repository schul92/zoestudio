'use client'

import dynamic from 'next/dynamic'

const PricingClient = dynamic(() => import('./PricingClient'), {
  ssr: false
})

export default function PricingClientWrapper({ locale }: { locale: 'en' | 'ko' }) {
  return <PricingClient locale={locale} />
}