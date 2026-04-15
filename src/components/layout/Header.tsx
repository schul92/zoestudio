'use client'

import AnimatedLogo from '@/components/AnimatedLogo'
import Link from 'next/link'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { InstagramNavHover, InstagramMobileLink } from '@/components/ui/InstagramHover'

export default function Header({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : '' // English uses root, Korean uses /ko
  const pathname = usePathname()
  const isAboutPage = pathname?.includes('/about')
  const isPricingPage = pathname?.includes('/pricing')
  const isPortfolioPage = pathname?.includes('/portfolio')
  const isBlogPage = pathname?.includes('/blog')
  const [hasScrolled, setHasScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!mounted) return
    
    const updateScrolled = () => {
      setHasScrolled(window.scrollY > 20)
    }
    updateScrolled()
    window.addEventListener('scroll', updateScrolled)
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [mounted])
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Use consistent initial state for SSR - Dark theme
  const scrolledClass = mounted && hasScrolled
    ? 'bg-[#111111]/95 shadow-lg backdrop-blur-md border-b border-white/10'
    : 'bg-transparent backdrop-blur-sm'

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolledClass}`}
    >
      <nav className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href={`${prefix}/`}
            className="group flex items-center space-x-3 transition-opacity"
            aria-label={locale === 'ko' ? 'ZOE LUMOS 홈페이지' : 'ZOE LUMOS Homepage'}
            data-hover="true"
            data-hover-text=""
          >
            <div className="transition-all duration-300 group-hover:scale-110 text-white flex items-center">
              <AnimatedLogo width={28} height={28} animate={false} />
              <span className="text-base sm:text-lg md:text-xl font-bold ml-2 transition-all duration-300 group-hover:translate-x-1 whitespace-nowrap">ZOE LUMOS</span>
            </div>
          </Link>
          
          {/* Right Side Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Links - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <Link href={`${prefix}/about`} className="relative group py-2 px-4 min-w-[80px] text-center" data-hover="true" data-hover-text="">
                <span className="relative z-10 transition-colors duration-300 text-white">{t.nav.about}</span>
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 transition-transform duration-300 ease-out ${isAboutPage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
              <Link href={`${prefix}/#services`} className="relative group py-2 px-4 min-w-[80px] text-center" data-hover="true" data-hover-text="">
                <span className="relative z-10 transition-colors duration-300 text-white">{t.nav.services}</span>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
              <Link href={`${prefix}/portfolio`} className="relative group py-2 px-4 min-w-[80px] text-center" data-hover="true" data-hover-text="">
                <span className="relative z-10 transition-colors duration-300 text-white">{t.nav.portfolio}</span>
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 transition-transform duration-300 ease-out ${isPortfolioPage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
              <Link href={`${prefix}/pricing`} className="relative group py-2 px-4 min-w-[80px] text-center" data-hover="true" data-hover-text="">
                <span className="relative z-10 transition-colors duration-300 text-white">{t.nav.pricing}</span>
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 transition-transform duration-300 ease-out ${isPricingPage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
              <Link href={`${prefix}/blog`} className="relative group py-2 px-4 min-w-[80px] text-center" data-hover="true" data-hover-text="">
                <span className="relative z-10 transition-colors duration-300 text-white">{t.nav.blog}</span>
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 transition-transform duration-300 ease-out ${isBlogPage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
              <Link href={`${prefix}/#contact`} className="relative group py-2 px-4 min-w-[80px] text-center" data-hover="true" data-hover-text="">
                <span className="relative z-10 transition-colors duration-300 text-white">{t.nav.contact}</span>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>

              {/* Instagram with hover dropdown */}
              <InstagramNavHover locale={locale} lightMode={true} />
            </div>

            {/* Language Toggle - Always visible */}
            <LanguageToggle lightMode={true} />

            {/* Mobile Menu Button - Only on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[90]"
          style={{ top: '56px' }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed left-0 right-0 bg-[#1a1a1a] shadow-xl transition-all duration-300 ease-in-out z-[95] translate-y-0 border-t border-white/10"
          style={{ top: '56px' }}
        >
        <nav className="px-6 py-6 space-y-2">
          <Link
            href={`${prefix}/about`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors text-lg font-medium"
          >
            {t.nav.about}
          </Link>
          <Link
            href={`${prefix}/#services`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors text-lg font-medium"
          >
            {t.nav.services}
          </Link>
          <Link
            href={`${prefix}/portfolio`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors text-lg font-medium"
          >
            {t.nav.portfolio}
          </Link>
          <Link
            href={`${prefix}/pricing`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors text-lg font-medium"
          >
            {t.nav.pricing}
          </Link>
          <Link
            href={`${prefix}/blog`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors text-lg font-medium"
          >
            {t.nav.blog}
          </Link>
          <Link
            href={`${prefix}/#contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors text-lg font-medium"
          >
            {t.nav.contact}
          </Link>

          {/* KakaoTalk link in mobile menu */}
          <a
            href="http://pf.kakao.com/_xhxdxmlX/chat"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-3 px-4 text-[#FEE500] hover:bg-[#FEE500]/10 rounded-lg transition-colors text-lg font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.463-.2.723-.722 2.62-.828 3.026-.13.502.184.496.387.36.16-.106 2.544-1.726 3.576-2.428.766.112 1.56.17 2.357.17 5.523 0 10-3.463 10-7.591S17.523 3 12 3Z" fill="currentColor"/>
            </svg>
            {locale === 'ko' ? '카카오톡 상담' : 'KakaoTalk Chat'}
          </a>

          {/* Instagram link in mobile menu */}
          <InstagramMobileLink onClose={() => setMobileMenuOpen(false)} />
        </nav>
      </div>
      )}
    </header>
  )
}