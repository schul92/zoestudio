'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState('en')

  useEffect(() => {
    const locale = pathname.startsWith('/ko') ? 'ko' : 'en'
    setCurrentLocale(locale)
  }, [pathname])

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ko' : 'en'
    // Remove any locale prefix and get the base path
    const basePath = pathname.replace(/^\/(en|ko)/, '') || '/'
    // Add the new locale prefix
    const newPath = `/${newLocale}${basePath === '/' ? '' : basePath}`
    
    // Preserve the current hash and scroll position
    const hash = window.location.hash
    const scrollY = window.scrollY
    
    router.push(newPath + hash)
    
    // Restore scroll position after navigation
    setTimeout(() => {
      window.scrollTo(0, scrollY)
    }, 100)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex items-center space-x-2 px-4 py-2 rounded-xl border border-black overflow-hidden transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      aria-label="Toggle language"
    >
      <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10 text-sm font-medium text-black group-hover:text-white transition-colors duration-300">
        {currentLocale === 'en' ? '🇺🇸 EN' : '🇰🇷 KO'}
      </span>
      <svg className="relative z-10 w-4 h-4 text-black group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
      </svg>
    </button>
  )
}