'use client'

import { useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { initScrollTracking } from '@/utils/analytics'

export default function AnalyticsWrapper() {
  useEffect(() => {
    // Initialize scroll depth tracking
    const cleanup = initScrollTracking()
    return cleanup
  }, [])

  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  )
}