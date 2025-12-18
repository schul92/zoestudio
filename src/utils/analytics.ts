'use client'

// Comprehensive Google Analytics tracking utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Event types for better reporting in GA
export const GA_EVENTS = {
  // Conversion events (most important)
  FORM_SUBMIT_SUCCESS: 'form_submit_success',
  FORM_SUBMIT_ATTEMPT: 'form_submit_attempt', 
  FORM_SUBMIT_ERROR: 'form_submit_error',
  
  // Engagement events
  SERVICE_SELECT: 'service_select',
  SERVICE_DESELECT: 'service_deselect',
  FORM_FIELD_INTERACTION: 'form_field_interaction',
  
  // User behavior
  PAGE_SCROLL_DEPTH: 'page_scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  
  // Errors
  VALIDATION_ERROR: 'validation_error',
  API_ERROR: 'api_error',
} as const

// Main tracking function with enhanced data
export const trackGAEvent = (
  eventName: string,
  parameters?: {
    category?: string
    label?: string
    value?: number
    // Custom dimensions for better reporting
    services_selected?: string
    services_count?: number
    form_type?: string
    error_type?: string
    business_name?: string
    has_phone?: boolean
    message_length?: number
    submission_time?: number // Time taken to fill form
    page_source?: string
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: parameters?.category || 'engagement',
      event_label: parameters?.label,
      value: parameters?.value,
      // Custom parameters for enhanced reporting
      custom_parameters: {
        services_selected: parameters?.services_selected,
        services_count: parameters?.services_count,
        form_type: parameters?.form_type,
        error_type: parameters?.error_type,
        business_name: parameters?.business_name,
        has_phone: parameters?.has_phone,
        message_length: parameters?.message_length,
        submission_time: parameters?.submission_time,
        page_source: parameters?.page_source || window.location.pathname,
        timestamp: new Date().toISOString(),
      }
    })
  }
}

// Track successful form submission with all details
export const trackFormSuccess = (data: {
  services: string[]
  hasPhone: boolean
  hasBusinessName: boolean
  messageLength: number
  timeToSubmit?: number
}) => {
  // Main conversion event
  trackGAEvent(GA_EVENTS.FORM_SUBMIT_SUCCESS, {
    category: 'conversion',
    label: data.services.join(', ') || 'no_services',
    value: data.services.length,
    services_selected: data.services.join(', '),
    services_count: data.services.length,
    has_phone: data.hasPhone,
    message_length: data.messageLength,
    submission_time: data.timeToSubmit,
  })
  
  // Also send as a conversion goal
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      'value': data.services.length,
      'currency': 'USD',
      'transaction_id': Date.now().toString(),
    })
  }
}

// Track form errors for optimization
export const trackFormError = (errorType: string, details?: string) => {
  trackGAEvent(GA_EVENTS.FORM_SUBMIT_ERROR, {
    category: 'error',
    label: errorType,
    error_type: errorType,
  })
}

// Track service selection for interest analysis
export const trackServiceSelection = (
  service: string,
  action: 'select' | 'deselect',
  totalSelected: number
) => {
  trackGAEvent(
    action === 'select' ? GA_EVENTS.SERVICE_SELECT : GA_EVENTS.SERVICE_DESELECT,
    {
      category: 'engagement',
      label: service,
      value: totalSelected,
      services_count: totalSelected,
    }
  )
}

// Get form submission report data
export const getFormAnalyticsData = () => {
  // This would typically connect to GA Reporting API
  // For now, return structure for reference
  return {
    totalSubmissions: 0,
    successfulSubmissions: 0,
    failedSubmissions: 0,
    averageServicesSelected: 0,
    topServices: [],
    conversionRate: 0,
    averageTimeToSubmit: 0,
  }
}

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackGAEvent('scroll_depth', {
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
  })
}

// Track CTA button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackGAEvent('button_click', {
    category: 'engagement',
    label: buttonName,
    page_source: location,
  })
}

// Track outbound link clicks
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackGAEvent('outbound_link', {
    category: 'engagement',
    label: linkText || url,
  })
}

// Track page views with custom data (for Korean SEO pages)
export const trackCustomPageView = (pageName: string, pageType: string, locale: string) => {
  trackGAEvent('custom_page_view', {
    category: 'navigation',
    label: pageName,
    page_source: pageType,
  })

  // Also send standard page_view
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
      language: locale,
      page_type: pageType,
    })
  }
}

// Track phone number clicks
export const trackPhoneClick = (phoneNumber: string) => {
  trackGAEvent('phone_click', {
    category: 'conversion',
    label: phoneNumber,
  })
}

// Track email clicks
export const trackEmailClick = (email: string) => {
  trackGAEvent('email_click', {
    category: 'conversion',
    label: email,
  })
}

// Initialize scroll tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return

  const scrollDepths = [25, 50, 75, 90, 100]
  const trackedDepths: Set<number> = new Set()

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth)
        trackScrollDepth(depth)
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => window.removeEventListener('scroll', handleScroll)
}