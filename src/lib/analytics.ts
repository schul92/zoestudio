export function track(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      page_location: window.location.href,
    })
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: url,
    })
  }
}

export function trackFormSubmit(formName: string, formData?: Record<string, any>) {
  track('form_submit', {
    form_name: formName,
    ...formData,
  })
}

export function trackClick(elementName: string, elementType: string, value?: string) {
  track('click', {
    element_name: elementName,
    element_type: elementType,
    value,
  })
}

export function trackPricingInteraction(action: string, plan?: string, tier?: string) {
  track('pricing_interaction', {
    action,
    plan,
    tier,
    currency: 'USD',
  })
}

export function trackConversion(conversionType: string, value?: number, currency = 'USD') {
  track('conversion', {
    conversion_type: conversionType,
    value,
    currency,
  })
}