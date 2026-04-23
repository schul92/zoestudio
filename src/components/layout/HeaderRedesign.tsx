'use client'

import Link from 'next/link'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function HeaderRedesign({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : ''
  const pathname = usePathname()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const update = () => setHasScrolled(window.scrollY > 20)
    update()
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [mounted])

  useEffect(() => { setMobileMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const isActive = (path: string) => pathname?.includes(path)

  const navLinks = [
    { href: `${prefix}/about`, label: t.nav.about, active: isActive('/about') },
    { href: `${prefix}/#services`, label: t.nav.services, active: false },
    { href: `${prefix}/portfolio`, label: t.nav.portfolio, active: isActive('/portfolio') },
    { href: `${prefix}/pricing`, label: t.nav.pricing, active: isActive('/pricing') },
    { href: `${prefix}/blog`, label: t.nav.blog, active: isActive('/blog') },
    { href: `${prefix}/#contact`, label: t.nav.contact, active: false },
  ]

  const scrolledClass = mounted && hasScrolled
    ? 'bg-white/90 shadow-soft backdrop-blur-xl border-b border-brand-cream'
    : 'bg-transparent'

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolledClass}`}>
      <nav className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`${prefix}/`}
            className="group flex items-center space-x-2.5 transition-opacity"
            aria-label="ZOE LUMOS Homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
              <svg width="18" height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z" stroke="white" strokeWidth="4" fill="none"/>
                <path d="M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5" stroke="white" strokeWidth="4"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300">
              ZOE LUMOS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full
                  ${link.active
                    ? 'text-brand-gold bg-brand-cream'
                    : 'text-brand-graphite hover:text-brand-charcoal hover:bg-brand-cream/50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Lang toggle + CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <LanguageToggle lightMode={false} />

            {/* Desktop CTA */}
            <Link
              href={`${prefix}/#contact`}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-charcoal rounded-full hover:bg-brand-graphite transition-all duration-300 hover:shadow-elevated"
            >
              {locale === 'ko' ? '무료 상담' : 'Get Started'}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brand-charcoal"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-brand-charcoal/20 backdrop-blur-sm z-[90]"
          style={{ top: '64px' }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed left-0 right-0 bg-white shadow-elevated z-[95] transition-all duration-500 ease-spring overflow-hidden ${
          mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ top: '64px' }}
      >
        <nav className="px-6 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-4 rounded-xl text-lg font-medium transition-colors ${
                link.active
                  ? 'text-brand-gold bg-brand-cream'
                  : 'text-brand-charcoal hover:bg-brand-cream'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <div className="pt-4 mt-4 border-t border-brand-cream">
            <Link
              href={`${prefix}/#contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3.5 px-6 text-white bg-brand-charcoal rounded-full font-semibold text-lg hover:bg-brand-graphite transition-colors"
            >
              {locale === 'ko' ? '무료 상담 받기' : 'Get Started Free'}
            </Link>
          </div>

          {/* KakaoTalk */}
          <a
            href="http://pf.kakao.com/_xhxdxmlX/chat"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-3 px-4 text-[#3C1E1E] hover:bg-[#FEE500]/10 rounded-xl transition-colors text-base font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.463-.2.723-.722 2.62-.828 3.026-.13.502.184.496.387.36.16-.106 2.544-1.726 3.576-2.428.766.112 1.56.17 2.357.17 5.523 0 10-3.463 10-7.591S17.523 3 12 3Z" fill="#FEE500"/>
            </svg>
            {locale === 'ko' ? '카카오톡 상담' : 'KakaoTalk Chat'}
          </a>
        </nav>
      </div>
    </header>
  )
}
