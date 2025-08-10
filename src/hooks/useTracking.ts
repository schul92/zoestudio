'use client'

import { useCallback } from 'react'
import { trackServiceClick as gaTrackService, trackFormSubmission } from '@/components/GoogleAnalytics'

export function useTracking() {
  const track = useCallback(async (
    type: 'service_click' | 'page_view' | 'form_submit' | 'contact_attempt',
    data?: { service?: string; page?: string }
  ) => {
    try {
      // Send to your custom tracking API
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          ...data,
        }),
      })

      // Also send to Google Analytics with enhanced tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        switch(type) {
          case 'service_click':
            gaTrackService(data?.service || 'unknown')
            break
          case 'form_submit':
            trackFormSubmission('contact_form')
            break
          case 'contact_attempt':
            (window as any).gtag('event', 'begin_checkout', {
              event_category: 'engagement',
              event_label: 'contact_form_started',
            })
            break
          default:
            (window as any).gtag('event', type, {
              event_category: 'user_interaction',
              event_label: data?.service || data?.page,
            })
        }
      }
    } catch (error) {
      console.error('Tracking error:', error)
    }
  }, [])

  return {
    trackServiceClick: (service: string) => track('service_click', { service }),
    trackPageView: (page: string) => track('page_view', { page }),
    trackFormSubmit: () => track('form_submit'),
    trackContactAttempt: () => track('contact_attempt'),
  }
}