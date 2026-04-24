'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import Magnetic from '@/components/ui/motion/Magnetic'
import { industries } from '@/data/industriesData'
import { cityMarkets } from '@/data/cityMarketData'

/**
 * Map an EN or KO path to the matching path in the other locale.
 * Handles: industries, home, fallback-to-root-swap.
 */
function computeOtherLocaleHref(pathname: string, locale: string): string {
  // Normalize: is current path Korean-prefixed?
  const isKo = locale === 'ko'
  const stripped = isKo ? pathname.replace(/^\/ko/, '') || '/' : pathname

  // Decode any URL-encoded hangul so we can match data slugs
  const decoded = (() => {
    try { return decodeURIComponent(stripped) } catch { return stripped }
  })()

  // Industry × city crossover: /industries/[industry]/[city]
  const crossover = decoded.match(/^\/industries\/([^/]+)\/([^/]+)\/?$/)
  if (crossover) {
    const [, iSlug, cSlug] = crossover
    const fromKey = isKo ? 'ko' : 'en'
    const toKey = isKo ? 'en' : 'ko'
    const ind = industries.find((i) => i.slug[fromKey] === iSlug)
    const city = cityMarkets.find((c) => c.slug[fromKey] === cSlug)
    if (ind && city) {
      const newPath = `/industries/${ind.slug[toKey]}/${city.slug[toKey]}`
      return isKo ? newPath : `/ko${newPath}`
    }
  }

  // Industry detail page translation
  const industryMatch = decoded.match(/^\/industries\/(.+?)\/?$/)
  if (industryMatch) {
    const slug = industryMatch[1]
    const fromKey = isKo ? 'ko' : 'en'
    const toKey = isKo ? 'en' : 'ko'
    const ind = industries.find((i) => i.slug[fromKey] === slug)
    if (ind) {
      const newPath = `/industries/${ind.slug[toKey]}`
      return isKo ? newPath : `/ko${newPath}`
    }
  }

  // Default: flip /ko prefix
  return isKo ? stripped : `/ko${pathname}`
}

export default function HeaderNew({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : ''
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const nav = [
    { href: `${prefix}/portfolio`, label: locale === 'ko' ? '작업' : 'Work' },
    { href: `${prefix}/industries`, label: locale === 'ko' ? '업종' : 'Industries' },
    { href: `${prefix}/audit`, label: locale === 'ko' ? '무료 감사' : 'Free audit' },
    { href: `${prefix}/blog`, label: t.nav.blog },
  ]

  const otherLocaleHref = computeOtherLocaleHref(pathname || '/', locale)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${
        scrolled
          ? 'bg-ivory/85 backdrop-blur-xl hair-bottom'
          : 'bg-transparent'
      }`}
    >
      <div className="container-edge">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Wordmark */}
          <Link href={`${prefix}/`} data-cursor="hide" className="group flex items-center gap-3">
            <span className="gold-dot transition-transform duration-700 group-hover:scale-150" />
            <span className="font-display text-[22px] md:text-[26px] leading-none tracking-luxury text-ink fraunces-soft">
              Zoe<span className="italic font-light text-gold">&nbsp;Lumos</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] tracking-wide text-graphite hover:text-ink transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-5 md:gap-7">
            <Link
              href={otherLocaleHref}
              className="hidden sm:inline-flex text-[11px] uppercase tracking-[0.24em] text-ash hover:text-ink transition-colors"
              aria-label="Switch language"
            >
              {locale === 'ko' ? 'EN' : 'KR'}
            </Link>

            <Link
              href={`${prefix}/#contact`}
              className="hidden md:inline-flex items-center gap-2 text-[13px] font-medium text-ink"
            >
              <span className="relative">
                {locale === 'ko' ? '프로젝트 의뢰' : 'Inquire'}
                <span className="absolute left-0 right-0 -bottom-1 h-px bg-ink" />
              </span>
              <span aria-hidden className="text-[11px]">↗</span>
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center"
            >
              <span className="sr-only">Menu</span>
              <div className="w-6 flex flex-col gap-[5px]">
                <span className={`h-px bg-ink transition-all duration-500 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`h-px bg-ink transition-all duration-500 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-px bg-ink transition-all duration-500 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-ivory transition-all duration-700 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-edge pt-16 pb-10 h-full flex flex-col justify-between">
          <nav className="flex flex-col gap-2">
            {nav.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-display text-4xl md:text-5xl text-ink py-3 border-b border-hairline transition-all duration-700 ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <span className="overline mr-4 text-ash">0{i + 1}</span>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between pt-10">
            <Link href={otherLocaleHref} className="overline text-ink">
              {locale === 'ko' ? 'English' : '한국어'}
            </Link>
            <Link href={`${prefix}/#contact`} className="btn-ink">
              {locale === 'ko' ? '프로젝트 의뢰' : 'Start a project'}
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
