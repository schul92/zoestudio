'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { industrySlugs, citySlugs, localSeoSlugs } from '@/lib/localeSlugs'

/**
 * Map an EN or KO path to the matching path in the other locale.
 * Handles: industries, home, fallback-to-root-swap.
 */
function computeOtherLocaleHref(pathname: string, locale: string): string {
  // Normalize: is current path Korean-prefixed?
  const isKo = locale === 'ko'
  // Strip BOTH /ko and /en prefixes — usePathname() may return either depending
  // on Next.js middleware behavior. Without this, an EN page emitted /ko/en/...
  // which 404s sitewide.
  const stripped =
    pathname.replace(/^\/(ko|en)(?=\/|$)/, '') || '/'

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
    const ind = industrySlugs.find((p) => p[fromKey === 'en' ? 0 : 1] === iSlug)
    const city = citySlugs.find((p) => p[fromKey === 'en' ? 0 : 1] === cSlug)
    if (ind && city) {
      const newPath = `/industries/${ind[toKey === 'en' ? 0 : 1]}/${city[toKey === 'en' ? 0 : 1]}`
      return isKo ? newPath : `/ko${newPath}`
    }
  }

  // Industry detail page translation
  const industryMatch = decoded.match(/^\/industries\/(.+?)\/?$/)
  if (industryMatch) {
    const slug = industryMatch[1]
    const fromKey = isKo ? 'ko' : 'en'
    const toKey = isKo ? 'en' : 'ko'
    const ind = industrySlugs.find((p) => p[fromKey === 'en' ? 0 : 1] === slug)
    if (ind) {
      const newPath = `/industries/${ind[toKey === 'en' ? 0 : 1]}`
      return isKo ? newPath : `/ko${newPath}`
    }
  }

  // Landing pages whose Korean URL uses a Korean slug
  const landing = localSeoSlugs.find(([en, ko]) => decoded === `/${en}` || decoded === `/${ko}`)
  if (landing) return isKo ? `/${landing[0]}` : `/ko/${landing[1]}`

  // Default: flip /ko prefix using normalized (stripped) path
  return isKo ? stripped : `/ko${stripped === '/' ? '' : stripped}`
}

export default function HeaderNew({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : ''
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = menuOpen ? 'hidden' : ''
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) return () => { root.style.overflow = ''; document.body.style.overflow = '' }
    menuRef.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      root.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const ko = locale === 'ko'
  const nav = [
    { href: `${prefix}/portfolio`, label: ko ? '작업' : 'Work' },
    { href: `${prefix}/services`, label: ko ? '서비스' : 'Services' },
    { href: `${prefix}/pricing`, label: ko ? '가격' : 'Pricing' },
    { href: `${prefix}/blog`, label: t.nav.blog },
  ]
  const more = [
    { href: `${prefix}/industries`, label: ko ? '업종' : 'Industries' },
    { href: `${prefix}/tools`, label: ko ? '무료 도구' : 'Free tools' },
    { href: `${prefix}/about`, label: ko ? '소개' : 'About' },
    { href: `${prefix}/contact`, label: ko ? '문의' : 'Contact' },
  ]
  const isActive = (href: string) => !!pathname && pathname.startsWith(href) && href !== prefix

  const otherLocaleHref = computeOtherLocaleHref(pathname || '/', locale)

  return (
    <header className={`kn-header fixed top-0 inset-x-0 z-[100] ${menuOpen ? 'kn-solid kn-header-open' : 'kn-frost'} border-b border-hairline`}>
      <div className="container-edge">
        <div className="flex items-center justify-between h-14 md:h-16 gap-6">
          <Link href={`${prefix}/`} className="inline-flex items-center min-h-[44px] text-[17px] md:text-[19px] font-bold tracking-[-0.03em] text-ink" aria-label="ZOE LUMOS home">
            Zoe Lumos
          </Link>

          <nav className="hidden lg:flex items-center gap-9 ml-auto" aria-label={ko ? '주요 메뉴' : 'Main'}>
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`text-[14px] transition-colors ${isActive(l.href) ? 'text-ink font-medium' : 'text-graphite hover:text-ink'}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <Link href={otherLocaleHref} className="hidden sm:inline-flex text-[13px] font-medium text-ash hover:text-ink" aria-label="Switch language">
              {ko ? 'EN' : 'KR'}
            </Link>
            <Link
              href={`${prefix}/audit`}
              className="hidden md:inline-flex items-center rounded-full bg-ink text-white text-[13px] font-semibold px-4 py-2 hover:bg-graphite transition-colors"
            >
              {ko ? '무료 진단' : 'Free audit'}
            </Link>
            <button
              ref={toggleRef}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? (ko ? '메뉴 닫기' : 'Close menu') : (ko ? '메뉴' : 'Menu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex lg:!hidden items-center justify-center w-11 h-11 -mr-2.5"
            >
              <div className="w-[18px] flex flex-col gap-[5px]">
                <span className={`h-[1.5px] bg-ink transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`h-[1.5px] bg-ink transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-[1.5px] bg-ink transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        // React 18 has no typed `inert` prop; passing it as a plain attribute keeps closed links out of the tab order.
        {...({ inert: menuOpen ? undefined : '' } as Record<string, string | undefined>)}
        aria-hidden={!menuOpen}
        className={`lg:hidden fixed inset-0 top-14 md:top-16 kn-solid z-[90] transition-[opacity,transform,visibility] duration-300 ease-out ${
          menuOpen ? 'visible opacity-100 translate-y-0 pointer-events-auto' : 'invisible opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="container-edge pt-8 pb-10 h-full flex flex-col gap-10 overflow-y-auto">
          <nav className="flex flex-col" aria-label={ko ? '모바일 메뉴' : 'Mobile'}>
            {[...nav, ...more].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-[28px] font-semibold tracking-[-0.03em] text-ink py-2.5 border-b border-hairline">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Link href={`${prefix}/audit`} onClick={() => setMenuOpen(false)} className="btn-ink justify-center">{ko ? '무료 진단 받기' : 'Get a free audit'}</Link>
            <Link href={otherLocaleHref} onClick={() => setMenuOpen(false)} className="text-center text-[15px] text-link py-3">{ko ? 'English' : '한국어'}</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
