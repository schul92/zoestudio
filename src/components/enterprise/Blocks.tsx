import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

/** Building blocks shared by the enterprise landings (AWS · API · dashboards, logistics), in the
 *  US-launch page's visual language: .ul-panel surfaces, blue icon chips, the [data-reveal] contract. */

export type L = 'en' | 'ko'
export type T = { en: string; ko: string }
export type FaqItem = { q: T; a: T }

export const KAKAO = 'http://pf.kakao.com/_xhxdxmlX/chat'

/** Sequence delay for .ent-* pieces: `ms` on phones (each stage plays as it scrolls in), `lg` on desktop
 *  where a whole scene is in view at once and plays as one timeline. */
export const seq = (ms: number, lg?: number) =>
  ({ ['--ul-d' as string]: `${ms}ms`, ...(lg === undefined ? {} : { ['--ul-d-lg' as string]: `${lg}ms` }) }) as CSSProperties

export function SectionHead({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 md:mb-14 max-w-3xl">
      {eyebrow && <p className="mb-3 text-[13px] font-semibold text-[var(--gold)]">{eyebrow}</p>}
      <h2 className="font-display text-[clamp(1.75rem,4.2vw,2.75rem)] leading-[1.12] tracking-luxury text-ink text-balance">{title}</h2>
      {intro && <p className="mt-4 text-[16px] md:text-[17px] leading-[1.7] text-graphite">{intro}</p>}
    </div>
  )
}

export function IconChip({ children, size = 'md' }: { children: ReactNode; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-8 w-8 rounded-full' : 'h-11 w-11 rounded-2xl'
  return <span className={`ul-chip grid ${box} shrink-0 place-items-center`}>{children}</span>
}

export function Breadcrumbs({ locale, current }: { locale: L; current: string }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 overline text-ash" aria-label={isKo ? '경로' : 'Breadcrumb'}>
      <Link href={prefix || '/'} className="transition-colors hover:text-ink">{isKo ? '홈' : 'Home'}</Link>
      <span className="opacity-50">/</span>
      <Link href={`${prefix}/services`} className="transition-colors hover:text-ink">{isKo ? '서비스' : 'Services'}</Link>
      <span className="opacity-50">/</span>
      <span className="text-ink">{current}</span>
    </nav>
  )
}

export function FaqList({ items, locale }: { items: FaqItem[]; locale: L }) {
  return (
    <div className="max-w-3xl divide-y divide-[var(--hairline)]">
      {items.map((f) => (
        <div key={f.q.en} className="py-7 first:pt-0">
          <h3 className="text-[18px] md:text-[20px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink">{f.q[locale]}</h3>
          <p className="mt-3 text-[15.5px] leading-[1.75] text-graphite">{f.a[locale]}</p>
        </div>
      ))}
    </div>
  )
}

export function CtaPanel({ locale, line }: { locale: L; line: T }) {
  const isKo = locale === 'ko'
  return (
    <div data-reveal className="ul-panel rounded-[32px] px-6 py-14 text-center md:px-16 md:py-20">
      <p className="mx-auto max-w-2xl font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.25] tracking-luxury text-ink text-balance">
        {line[locale]}
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link href={`${isKo ? '/ko' : ''}/contact`} className="btn-ink">
          {isKo ? '상담 요청하기' : 'Start a conversation'}
          <span className="arrow">→</span>
        </Link>
        <a href="mailto:info@zoelumos.com" className="btn-outline">info@zoelumos.com</a>
      </div>
    </div>
  )
}

/** Service + FAQPage + BreadcrumbList JSON-LD for an hreflang-paired landing. */
export function LandingSchema({
  locale,
  paths,
  siteUrl,
  name,
  serviceType,
  description,
  audience,
  offers,
  faq,
  crumb,
}: {
  locale: L
  paths: { en: string; ko: string }
  siteUrl: string
  name: T
  serviceType: T
  description: T
  audience: string
  offers: T[]
  faq: FaqItem[]
  crumb: T
}) {
  const isKo = locale === 'ko'
  const enUrl = `${siteUrl}${paths.en}`
  const pageUrl = isKo ? `${siteUrl}${paths.ko}` : enUrl
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${enUrl}#service`,
    name: name[locale],
    serviceType: serviceType[locale],
    description: description[locale],
    provider: { '@id': `${siteUrl}/#organization` },
    url: pageUrl,
    inLanguage: isKo ? 'ko-KR' : 'en-US',
    availableLanguage: ['ko', 'en'],
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'South Korea' },
    ],
    audience: { '@type': 'BusinessAudience', audienceType: audience },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: name[locale],
      itemListElement: offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o[locale] } })),
    },
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale] },
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: isKo ? `${siteUrl}/ko` : siteUrl },
      { '@type': 'ListItem', position: 2, name: isKo ? '서비스' : 'Services', item: `${siteUrl}${isKo ? '/ko' : ''}/services` },
      { '@type': 'ListItem', position: 3, name: crumb[locale], item: pageUrl },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}
