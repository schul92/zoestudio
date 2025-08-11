'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Report Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // First Contentful Paint (FCP)
      const paintEntries = performance.getEntriesByType('paint')
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
      
      if (fcp) {
        console.log('FCP:', fcp.startTime)
      }
      
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      
      // Cumulative Layout Shift (CLS)
      let cls = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any
          if (!layoutShiftEntry.hadRecentInput) {
            cls += layoutShiftEntry.value
            console.log('Current CLS:', cls)
          }
        }
      })
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        // Layout shift observer not supported
      }
      
      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const firstInputEntry = entry as any
          console.log('FID:', firstInputEntry.processingStart - firstInputEntry.startTime)
        }
      })
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        // First input observer not supported
      }
      
      // Time to Interactive (TTI)
      if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
        const ttiObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          console.log('Long tasks:', entries)
        })
        
        ttiObserver.observe({ entryTypes: ['longtask'] })
      }
      
      return () => {
        observer.disconnect()
        clsObserver.disconnect()
        fidObserver.disconnect()
      }
    }
  }, [])
  
  return null
}