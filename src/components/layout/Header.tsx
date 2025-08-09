'use client'

import AnimatedLogo from '@/components/AnimatedLogo'
import Link from 'next/link'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'

export default function Header({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : ''
  const [hasScrolled, setHasScrolled] = useState(false)
  
  useEffect(() => {
    const updateScrolled = () => {
      setHasScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', updateScrolled)
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])
  
  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        hasScrolled ? 'bg-white/95 shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href={`${prefix}/`} 
            className="group flex items-center space-x-3 transition-opacity"
            aria-label={locale === 'ko' ? 'ZOE LUMOS 홈페이지' : 'ZOE LUMOS Homepage'}
          >
            <div className="transition-all duration-300 group-hover:scale-110 text-black flex items-center">
              <AnimatedLogo width={40} height={40} animate={false} />
              <span className="text-xl font-bold ml-3 transition-all duration-300 group-hover:translate-x-1">ZOE LUMOS</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`${prefix}/#about`} className="relative group py-2">
              <span className="relative z-10 text-black transition-colors duration-300">{t.nav.about}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
            <Link href={`${prefix}/#services`} className="relative group py-2">
              <span className="relative z-10 text-black transition-colors duration-300">{t.nav.services}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
            <Link href={`${prefix}/#portfolio`} className="relative group py-2">
              <span className="relative z-10 text-black transition-colors duration-300">{t.nav.portfolio}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
            <Link href={`${prefix}/#contact`} className="relative group py-2">
              <span className="relative z-10 text-black transition-colors duration-300">{t.nav.contact}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
            <LanguageToggle />
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <LanguageToggle />
            <button>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}