'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

export default function AnalyticsWrapper() {
  // Render analytics components directly without mounting state
  // as they handle their own initialization internally
  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  )
}