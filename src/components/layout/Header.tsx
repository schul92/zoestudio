'use client'

import AnimatedLogo from '@/components/AnimatedLogo'
import Link from 'next/link'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : ''
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()
  const isAboutPage = pathname?.includes('/about')
  
  useEffect(() => {
    const updateScrolled = () => {
      setHasScrolled(window.scrollY > 20)
    }
    updateScrolled() // Check initial scroll position
    window.addEventListener('scroll', updateScrolled)
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        hasScrolled 
          ? 'bg-white/95 shadow-lg backdrop-blur-md' 
          : isAboutPage 
            ? 'bg-black/40 backdrop-blur-lg border-b border-white/20'
            : 'bg-white/10 backdrop-blur-sm'
      }`}
    >
      <nav className="w-full px-8 lg:px-12 xl:px-20 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href={`${prefix}/`} 
            className="group flex items-center space-x-3 transition-opacity"
            aria-label={locale === 'ko' ? 'ZOE LUMOS 홈페이지' : 'ZOE LUMOS Homepage'}
          >
            <div className={`transition-all duration-300 group-hover:scale-110 ${isAboutPage && !hasScrolled ? 'text-white' : 'text-black'} flex items-center`}>
              <AnimatedLogo width={40} height={40} animate={false} />
              <span className="text-xl font-bold ml-3 transition-all duration-300 group-hover:translate-x-1">ZOE LUMOS</span>
            </div>
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center">
            {/* Desktop Links - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <Link href={`${prefix}/about`} className="relative group py-2 px-4 min-w-[80px] text-center">
                <span className={`relative z-10 transition-colors duration-300 ${isAboutPage && !hasScrolled ? 'text-white' : 'text-black'}`}>{t.nav.about}</span>
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 ${isAboutPage && !hasScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`} />
              </Link>
              <Link href={`${prefix}/#services`} className="relative group py-2 px-4 min-w-[80px] text-center">
                <span className={`relative z-10 transition-colors duration-300 ${isAboutPage && !hasScrolled ? 'text-white' : 'text-black'}`}>{t.nav.services}</span>
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 ${isAboutPage && !hasScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`} />
              </Link>
              <Link href={`${prefix}/#contact`} className="relative group py-2 px-4 min-w-[80px] text-center">
                <span className={`relative z-10 transition-colors duration-300 ${isAboutPage && !hasScrolled ? 'text-white' : 'text-black'}`}>{t.nav.contact}</span>
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 ${isAboutPage && !hasScrolled ? 'bg-white' : 'bg-black'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`} />
              </Link>
            </div>
            
            {/* Language Toggle - Always visible */}
            <div className="ml-6">
              <LanguageToggle lightMode={isAboutPage && !hasScrolled} />
            </div>
            
            {/* Mobile Menu Button - Only on mobile */}
            <button className={`md:hidden ml-4 ${isAboutPage && !hasScrolled ? 'text-white' : 'text-black'}`}>
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