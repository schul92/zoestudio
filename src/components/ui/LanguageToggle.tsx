'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LanguageToggle({ lightMode = false }: { lightMode?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const locale = pathname.startsWith('/ko') ? 'ko' : 'en'
    setCurrentLocale(locale)
  }, [pathname])

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ko' : 'en'
    
    // Handle the root path specially
    if (pathname === '/' || pathname === '/en') {
      // From root (English) to Korean
      const newPath = newLocale === 'ko' ? '/ko' : '/'
      router.push(newPath)
    } else {
      // Remove any locale prefix and get the base path
      const basePath = pathname.replace(/^\/(en|ko)/, '') || '/'
      // For Korean, add /ko prefix; for English, use root without /en
      const newPath = newLocale === 'ko' ? `/ko${basePath}` : basePath
      
      // Preserve the current hash and scroll position
      const hash = window.location.hash
      const scrollY = window.scrollY
      
      router.push(newPath + hash)
      
      // Restore scroll position after navigation
      setTimeout(() => {
        window.scrollTo(0, scrollY)
      }, 100)
    }
  }

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return (
      <div className={`px-4 py-2 rounded-full border ${
        lightMode 
          ? 'border-white' 
          : 'border-black'
      }`}>
        <div className="text-sm font-medium w-12 h-5" />
      </div>
    )
  }

  return (
    <div className="relative group">
      <button
        onClick={toggleLanguage}
        className={`relative flex items-center space-x-2 px-4 py-2 rounded-full border ${
          lightMode 
            ? 'border-white hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]' 
            : 'border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
        } overflow-hidden transition-all duration-300`}
        aria-label="Toggle language / 언어 전환"
      >
        <span className={`absolute inset-0 ${lightMode ? 'bg-white' : 'bg-black'} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out`} />
        <span className={`relative z-10 text-sm font-medium ${
          lightMode 
            ? 'text-white group-hover:text-black' 
            : 'text-black group-hover:text-white'
        } transition-colors duration-300`}>
          {currentLocale === 'en' ? '🇺🇸 EN' : '🇰🇷 KO'}
        </span>
        <svg className={`relative z-10 w-4 h-4 ${
          lightMode 
            ? 'text-white group-hover:text-black' 
            : 'text-black group-hover:text-white'
        } transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown on hover */}
      <div className={`absolute top-full mt-2 right-0 w-32 py-2 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-lg
        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
        <div
          onClick={toggleLanguage}
          className="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center justify-between"
        >
          {currentLocale === 'en' ? (
            <span className="text-sm font-medium text-white">🇰🇷 KO</span>
          ) : (
            <span className="text-sm font-medium text-white">🇺🇸 EN</span>
          )}
        </div>
      </div>
    </div>
  )
}