'use client'

import Script from 'next/script'

// The dataLayer/gtag stub, `js` + `config` commands, ad click-ID capture and the KakaoTalk click listener run
// inline in <head> (analyticsBoot in src/lib/analyticsBoot.ts), so events fired before this script arrives are
// queued, not dropped. This component only loads gtag.js, after the first interaction.
export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  return <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
}

// Helper function to track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Track service selections
export const trackServiceClick = (serviceName: string) => {
  trackEvent('service_click', 'engagement', serviceName);
}

// Track contact form submissions
export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', 'conversion', formType);
}

// Track page views (automatic with GA4, but can be custom)
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}