import { Fragment } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import RelatedCluster from '@/components/blog/RelatedCluster'
import ReadingProgress from '@/components/blog/ReadingProgress'
import { blogContent, BlogSection } from '@/data/blogContent'
import { PILLARS, POST_TO_PILLAR } from '@/data/blogClusters'
import { MONEY_PAGES, DEFAULT_MONEY_PAGE, pillarHubExists, pillarHubHref } from '@/components/blog/pillarLinks'
import { SITE_URL } from '@/lib/siteUrl'

// ─── Static params: every slug × every locale ────────────────────────────────
export function generateStaticParams() {
  const locales = ['en', 'ko']
  const params: { locale: string; slug: string }[] = []
  for (const post of blogContent) {
    for (const locale of locales) {
      params.push({ locale, slug: post.slug })
    }
  }
  return params
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const post = blogContent.find((p) => p.slug === params.slug)
  if (!post) return {}

  const baseUrl = SITE_URL
  const prefix = locale === 'ko' ? '/ko' : ''
  const url = `${baseUrl}${prefix}/blog/${post.slug}`

  return {
    title: `${post.title[locale]} | ZOE LUMOS`,
    description: post.metaDescription[locale],
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${baseUrl}/blog/${post.slug}`,
        en: `${baseUrl}/blog/${post.slug}`,
        ko: `${baseUrl}/ko/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title[locale],
      description: post.metaDescription[locale],
      url,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate,
      authors: [post.author],
    },
    robots: { index: true, follow: true },
  }
}

// ─── JSON-LD schema ───────────────────────────────────────────────────────────
function BlogPostingSchema({
  post,
  locale,
}: {
  post: (typeof blogContent)[0]
  locale: 'en' | 'ko'
}) {
  const baseUrl = SITE_URL
  const prefix = locale === 'ko' ? '/ko' : ''
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[locale],
    description: post.metaDescription[locale],
    datePublished: post.date,
    dateModified: post.updatedDate,
    url: `${baseUrl}${prefix}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Steve Song',
      jobTitle: locale === 'ko' ? '대표 — ZOE LUMOS' : 'Founder — ZOE LUMOS',
      url: `${baseUrl}/about`,
      sameAs: [
        'https://www.linkedin.com/in/stevesong',
      ],
      knowsAbout: [
        'Korean-American web design',
        'Bilingual SEO',
        'Shopify development',
        'KakaoTalk Channel marketing',
        'Mobile app development',
      ],
      worksFor: {
        '@id': `${baseUrl}/#organization`,
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'ZOE LUMOS',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`,
      },
    },
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    articleSection: post.category[locale],
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/api/og?title=ZOE+LUMOS&subtitle=Korean+Web+Design+%26+SEO`,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${prefix}/blog/${post.slug}`,
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── FAQPage JSON-LD schema (only emitted when post.faq exists) ───────────────
function FAQPageSchema({
  post,
  locale,
}: {
  post: (typeof blogContent)[0]
  locale: 'en' | 'ko'
}) {
  if (!post.faq || post.faq.length === 0) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.q[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[locale],
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── HowTo JSON-LD schema (only emitted when post.howto exists) ───────────────
function HowToSchema({
  post,
  locale,
}: {
  post: (typeof blogContent)[0]
  locale: 'en' | 'ko'
}) {
  if (!post.howto) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.howto.name[locale],
    description: post.howto.description[locale],
    ...(post.howto.totalTime ? { totalTime: post.howto.totalTime } : {}),
    step: post.howto.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name[locale],
      text: s.text[locale],
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── First-mention auto internal links ────────────────────────────────────────
// Ordered longest-phrase-first ('SEO' last so 'local SEO' / '로컬 SEO' win).
// Each keyword links at most once per post; max 3 auto-links per post total.
const AUTO_LINK_TARGETS: Array<{ term: string; href: string }> = [
  { term: '웹사이트 제작', href: '/웹사이트-제작' },
  { term: '홈페이지 제작', href: '/웹사이트-제작' },
  { term: '구글 광고', href: '/광고대행' },
  { term: 'Google Ads', href: '/광고대행' },
  { term: '카카오톡 채널', href: '/kakaotalk-marketing-guide' },
  { term: 'KakaoTalk Channel', href: '/kakaotalk-marketing-guide' },
  { term: '로컬 SEO', href: '/englewood-nj-seo' },
  { term: 'local SEO', href: '/englewood-nj-seo' },
  { term: 'SEO', href: '/englewood-nj-seo' },
]

interface AutoLink {
  before: string
  text: string
  href: string
  after: string
}

function findTermIndex(content: string, term: string): number {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // ASCII word boundaries so 'SEO' never matches inside 'Seoul' etc.
  const re = new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`, 'i')
  const m = re.exec(content)
  return m ? m.index : -1
}

/**
 * Pure pre-render pass over a post's sections: for each 'p' section, find the
 * first not-yet-linked keyword (ordered map above), and record a single split
 * so the renderer can hyperlink exactly that occurrence. Tracked per post via
 * a local Set; capped at 3 links per post. Server-side only — no client JS.
 */
function computeAutoLinks(sections: BlogSection[], prefix: string): Map<number, AutoLink> {
  const usedTerms = new Set<string>()
  const links = new Map<number, AutoLink>()
  const MAX_LINKS = 3
  sections.forEach((section, i) => {
    if (links.size >= MAX_LINKS) return
    if (section.type !== 'p' || !section.content) return
    for (const { term, href } of AUTO_LINK_TARGETS) {
      if (usedTerms.has(term)) continue
      const idx = findTermIndex(section.content, term)
      if (idx === -1) continue
      links.set(i, {
        before: section.content.slice(0, idx),
        text: section.content.slice(idx, idx + term.length),
        href: `${prefix}${href}`,
        after: section.content.slice(idx + term.length),
      })
      usedTerms.add(term)
      break // at most one auto-link per paragraph
    }
  })
  return links
}

// ─── Mid-article CTA (slim inline banner) ─────────────────────────────────────
function MidArticleCta({
  prefix,
  locale,
  moneyHref,
}: {
  prefix: string
  locale: 'en' | 'ko'
  moneyHref: string
}) {
  const isKo = locale === 'ko'
  return (
    <aside className="my-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 bg-bone rounded-[2px] border-l-2 border-gold">
      <p className="font-display italic font-light text-[1.05rem] text-ink leading-[1.5] m-0">
        {isKo
          ? '이런 고민, 15분 상담으로 정리해 드립니다'
          : 'A 15-minute call can sort this out'}
      </p>
      <div className="flex items-center gap-5 shrink-0">
        <Link
          href={`${prefix}/#contact`}
          className="text-[13px] font-medium text-ink border-b border-ink pb-0.5 hover:text-gold hover:border-gold transition-colors whitespace-nowrap"
        >
          {isKo ? '무료 상담' : 'Free consultation'}
        </Link>
        <Link
          href={moneyHref}
          className="text-[13px] text-graphite border-b border-hairline pb-0.5 hover:text-ink hover:border-ink transition-colors whitespace-nowrap"
        >
          {isKo ? '서비스 보기' : 'See the service'}
        </Link>
      </div>
    </aside>
  )
}

// ─── Table of contents (long posts, readTime >= 8) ────────────────────────────
function TableOfContents({
  headings,
  locale,
}: {
  headings: Array<{ id: string; text: string }>
  locale: 'en' | 'ko'
}) {
  if (headings.length < 2) return null
  return (
    <nav className="my-10 px-7 py-6 bg-bone rounded-[2px] hair-y">
      <p className="overline text-gold mb-4">
        {locale === 'ko' ? '목차' : 'Contents'}
      </p>
      <ol className="space-y-2.5 list-none m-0 p-0">
        {headings.map((h, i) => (
          <li key={h.id} className="flex items-baseline gap-3">
            <span className="overline text-ash shrink-0 w-6">
              {String(i + 1).padStart(2, '0')}
            </span>
            <a
              href={`#${h.id}`}
              className="text-[14px] text-graphite leading-[1.5] hover:text-ink transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ─── Section renderer ─────────────────────────────────────────────────────────
function RenderSection({
  section,
  prefix,
  locale,
  moneyHref,
  autoLink,
  h2Id,
}: {
  section: BlogSection
  prefix: string
  locale: 'en' | 'ko'
  moneyHref: string
  autoLink?: AutoLink
  h2Id?: string
}) {
  switch (section.type) {
    case 'intro':
      return (
        <p className="font-display italic font-light text-[clamp(1.35rem,2vw,1.65rem)] leading-[1.55] text-ink mb-12 pl-6 border-l-2 border-gold">
          {section.content}
        </p>
      )
    case 'h2':
      return (
        <h2
          id={h2Id}
          className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-luxury text-ink mt-16 mb-6 fraunces-soft scroll-mt-28"
        >
          {section.content}
        </h2>
      )
    case 'p':
      return (
        <p className="text-[1.0625rem] text-graphite leading-[1.8] mb-6">
          {autoLink ? (
            <>
              {autoLink.before}
              <Link
                href={autoLink.href}
                className="text-ink underline decoration-gold/60 decoration-1 underline-offset-4 hover:text-gold transition-colors"
              >
                {autoLink.text}
              </Link>
              {autoLink.after}
            </>
          ) : (
            section.content
          )}
        </p>
      )
    case 'ul':
      return (
        <div className="mb-8">
          {section.content && (
            <p className="text-ink font-medium mb-4">{section.content}</p>
          )}
          <ul className="space-y-3 pl-1">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-[1.0625rem] text-graphite">
                <span className="mt-[0.7em] h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                <span className="leading-[1.8]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'tip':
      return (
        <aside className="my-10 px-7 py-6 bg-bone rounded-[2px] hair-y">
          <p className="overline text-gold mb-3">Note</p>
          <p className="text-ink leading-[1.7] font-display italic font-light text-[1.0625rem]">
            {section.content}
          </p>
        </aside>
      )
    case 'cta':
      return (
        <aside className="my-12 py-10 border-t border-b border-hairline text-center">
          <p className="font-display italic font-light text-[clamp(1.25rem,2vw,1.6rem)] text-ink leading-[1.5] mb-8 max-w-xl mx-auto">
            {section.content}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href={`${prefix}/#contact`}
              data-cursor="Begin"
              className="btn-ink"
            >
              {locale === 'ko' ? '무료 상담 받기' : 'Get a free consultation'}
              <span className="arrow">→</span>
            </Link>
            <Link
              href={moneyHref}
              className="inline-flex items-center gap-2 text-[14px] text-ink border-b border-ink/30 hover:border-ink pb-1 transition-colors"
            >
              {locale === 'ko' ? '서비스 자세히 보기' : 'Explore the service'}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      )
    case 'stats': {
      // items: 'CHANGE|LABEL|ABSOLUTE'
      const cards = (section.items || []).map((s) => {
        const [change, label, absolute] = s.split('|')
        const positive = change?.trim().startsWith('+')
        return { change: change?.trim(), label: label?.trim(), absolute: absolute?.trim(), positive }
      })
      return (
        <div className="my-12">
          {section.content && (
            <p className="overline text-gold mb-5">{section.content}</p>
          )}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {cards.map((c, i) => (
              <li
                key={i}
                className="relative bg-bone rounded-[2px] p-5 md:p-6 hair-y overflow-hidden"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className={`font-display text-[clamp(1.75rem,3.4vw,2.6rem)] leading-none tracking-luxury ${
                      c.positive ? 'text-ink' : 'text-graphite'
                    }`}
                  >
                    {c.change}
                  </span>
                  {c.positive && (
                    <span aria-hidden className="text-gold text-sm">↑</span>
                  )}
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-graphite mt-2">
                  {c.label}
                </p>
                {c.absolute && (
                  <p className="text-[13px] text-ink/70 mt-1">{c.absolute}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    case 'bars': {
      // items: 'LABEL|VALUE[|highlight]' — value as a number string (for relative widths)
      const rows = (section.items || []).map((s) => {
        const [label, value, flag] = s.split('|')
        return { label: label?.trim(), value: parseFloat(value), highlight: flag?.trim() === 'highlight', raw: value?.trim() }
      })
      const max = Math.max(...rows.map((r) => r.value || 0))
      return (
        <div className="my-12">
          {section.content && (
            <p className="overline text-gold mb-5">{section.content}</p>
          )}
          <ul className="space-y-4">
            {rows.map((r, i) => {
              const pct = max > 0 ? Math.max(8, (r.value / max) * 100) : 0
              return (
                <li key={i}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span
                      className={`text-[14px] ${r.highlight ? 'text-ink font-medium' : 'text-graphite'}`}
                    >
                      {r.label}
                      {r.highlight && (
                        <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-gold">
                          new
                        </span>
                      )}
                    </span>
                    <span
                      className={`font-display text-[clamp(1rem,1.4vw,1.25rem)] tracking-luxury ${
                        r.highlight ? 'text-ink' : 'text-graphite'
                      }`}
                    >
                      ${r.raw}
                    </span>
                  </div>
                  <div className="relative h-3 rounded-[2px] bg-ink/[0.04] overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 ${
                        r.highlight ? 'bg-gold' : 'bg-ink/40'
                      }`}
                      style={{ width: `${pct}%`, transition: 'width 600ms cubic-bezier(0.2,0.8,0.2,1)' }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
    case 'screenshot':
      // content: image src; items[0]: caption
      return (
        <figure className="my-12">
          <div className="rounded-[2px] overflow-hidden hair-y bg-bone">
            <img
              src={section.content}
              alt={section.items?.[0] || ''}
              loading="lazy"
              className="w-full h-auto block"
            />
          </div>
          {section.items?.[0] && (
            <figcaption className="overline text-graphite mt-3">
              {section.items[0]}
            </figcaption>
          )}
        </figure>
      )
    default:
      return null
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const locale = params.locale as 'en' | 'ko'
  const post = blogContent.find((p) => p.slug === params.slug)

  if (!post) return notFound()

  const prefix = locale === 'ko' ? '/ko' : ''
  const sections = post.sections[locale]

  // ─── Pillar funnel wiring ───────────────────────────────────────────────────
  const pillarKey = POST_TO_PILLAR[post.slug]
  const pillar = pillarKey ? PILLARS[pillarKey] : undefined
  const hubExists = pillarKey ? pillarHubExists(pillarKey) : false
  // Money page this cluster funnels to (locale-prefixed at usage sites).
  const moneyPage = pillarKey ? MONEY_PAGES[pillarKey] : DEFAULT_MONEY_PAGE
  const moneyHref = `${prefix}${moneyPage}`
  // Hub link with route-existence guard (falls back to pillar blog post).
  // Suppressed when the fallback would point at the current post itself.
  const rawPillarNavHref = pillarKey ? pillarHubHref(pillarKey, prefix) : null
  const pillarNavHref =
    rawPillarNavHref === `${prefix}/blog/${post.slug}` ? null : rawPillarNavHref

  // ─── Body enrichment (server-side, computed once per render) ────────────────
  const autoLinks = computeAutoLinks(sections, prefix)
  const midCtaIndex = Math.floor(sections.length / 2)
  const showToc = post.readTime >= 8
  const tocHeadings = showToc
    ? sections
        .map((s, i) => ({ id: `s-${i}`, text: s.content, type: s.type }))
        .filter((s) => s.type === 'h2')
        .map(({ id, text }) => ({ id, text }))
    : []
  const introIndex = sections.findIndex((s) => s.type === 'intro')
  const tocAfterIndex = introIndex === -1 ? 0 : introIndex

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  // Bottom-CTA headline keyed to the pillar's money page.
  const CTA_HEADLINES: Record<string, { en: string; ko: string }> = {
    '/englewood-nj-seo': {
      en: 'Ready to rank in both languages?',
      ko: '영어와 한국어, 두 언어로 상위 노출될 준비 되셨나요?',
    },
    '/웹사이트-제작': {
      en: 'Ready for a website that earns its keep?',
      ko: '제 몫을 하는 웹사이트, 시작해 볼까요?',
    },
    '/services/kakaotalk-marketing-usa': {
      en: 'Ready to reach customers where they chat?',
      ko: '고객이 매일 쓰는 카카오톡에서 만날 준비 되셨나요?',
    },
    '/services': {
      en: 'Ready to grow your business?',
      ko: '비즈니스를 성장시킬 준비가 되셨나요?',
    },
  }
  const ctaHeadline = CTA_HEADLINES[moneyPage] || CTA_HEADLINES['/services']

  const ui = {
    home: locale === 'ko' ? '홈' : 'Home',
    blog: locale === 'ko' ? '블로그' : 'Blog',
    backToBlog: locale === 'ko' ? '← 블로그로 돌아가기' : '← Back to Blog',
    minRead: locale === 'ko' ? '분 읽기' : 'min read',
    by: locale === 'ko' ? '작성자' : 'By',
    partOf: locale === 'ko' ? '시리즈' : 'Part of',
    ctaTitle: ctaHeadline[locale],
    ctaDesc:
      locale === 'ko'
        ? 'ZOE LUMOS는 포트리 NJ 소재 한인 디지털 마케팅 에이전시입니다. 웹사이트 제작, 로컬 SEO, 구글 광고를 전문으로 합니다.'
        : 'ZOE LUMOS is a Korean-American digital marketing agency in Fort Lee, NJ, specializing in bilingual websites, local SEO, and Google Ads.',
    ctaButton:
      locale === 'ko' ? '무료 상담 받기 →' : 'Get a Free Consultation →',
    ctaMoney:
      locale === 'ko' ? '서비스 자세히 보기' : 'Explore the service',
  }

  const baseUrl = SITE_URL
  // Pillar breadcrumb node only when the hub route actually exists.
  const includePillarCrumb = Boolean(pillar && hubExists)
  const crumbItems: Array<{ name: string; item: string }> = [
    { name: ui.home, item: `${baseUrl}${prefix || ''}` },
    { name: ui.blog, item: `${baseUrl}${prefix}/blog` },
  ]
  if (includePillarCrumb && pillar) {
    crumbItems.push({ name: pillar.label[locale], item: `${baseUrl}${prefix}${pillar.pillarUrl}` })
  }
  crumbItems.push({ name: post.title[locale], item: `${baseUrl}${prefix}/blog/${post.slug}` })
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbItems.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <BlogPostingSchema post={post} locale={locale} />
      <FAQPageSchema post={post} locale={locale} />
      <HowToSchema post={post} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* Reading progress bar — only worth the JS on longer reads */}
      {post.readTime >= 6 && <ReadingProgress />}

      <main className="min-h-screen bg-ivory text-ink">
        {/* Article header band */}
        <section className="hair-bottom pt-40 md:pt-48 pb-16 md:pb-20">
          <div className="container-edge">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-2 overline text-ash mb-10">
              <Link href={prefix || '/'} className="hover:text-ink transition-colors">
                {ui.home}
              </Link>
              <span className="opacity-50">/</span>
              <Link href={`${prefix}/blog`} className="hover:text-ink transition-colors">
                {ui.blog}
              </Link>
              {includePillarCrumb && pillar && (
                <>
                  <span className="opacity-50">/</span>
                  <Link
                    href={`${prefix}${pillar.pillarUrl}`}
                    className="hover:text-ink transition-colors line-clamp-1 max-w-[16rem]"
                  >
                    {pillar.label[locale]}
                  </Link>
                </>
              )}
              <span className="opacity-50">/</span>
              <span className="text-ink line-clamp-1 max-w-xs">{post.title[locale]}</span>
            </nav>

            <div className="max-w-4xl">
              {/* Category + date eyebrow */}
              <div className="flex flex-wrap items-center gap-3 overline text-ash mb-8">
                <span className="gold-dot" />
                <span>{post.category[locale]}</span>
                <span className="w-6 h-px bg-hairline" />
                <span>{formattedDate}</span>
                <span className="w-6 h-px bg-hairline" />
                <span>
                  {post.readTime} {ui.minRead}
                </span>
                <span className="w-6 h-px bg-hairline" />
                <span>
                  {ui.by} {post.author}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] tracking-luxury text-ink">
                {post.title[locale]}
              </h1>

              {/* Part-of pillar line */}
              {pillar && pillarNavHref && (
                <p className="mt-6 flex items-center gap-2 text-[13px] text-graphite">
                  <span className="overline text-ash">{ui.partOf}:</span>
                  <Link
                    href={pillarNavHref}
                    className="inline-flex items-center gap-1.5 text-ink border-b border-ink/30 hover:border-ink hover:text-gold pb-0.5 transition-colors"
                  >
                    {pillar.label[locale]}
                    <span aria-hidden>→</span>
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="py-16 md:py-24">
          <div className="container-edge">
            <article className="mx-auto max-w-[720px]">
              {/* Visible HowTo answer block — surfaces concrete steps for AI /
                  featured-snippet capture and gives buyers an immediate skim. */}
              {post.howto && (
                <aside className="mb-14 px-7 py-7 md:px-9 md:py-9 bg-bone rounded-[2px] hair-y">
                  <p className="overline text-gold mb-3">
                    {locale === 'ko' ? '빠른 답변' : 'Quick answer'}
                  </p>
                  <h2 className="font-display text-[clamp(1.4rem,2vw,1.8rem)] leading-[1.2] tracking-luxury text-ink m-0 mb-4">
                    {post.howto.name[locale]}
                  </h2>
                  <p className="text-[15px] text-graphite leading-[1.65] mb-6">
                    {post.howto.description[locale]}
                  </p>
                  <ol className="space-y-4">
                    {post.howto.steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="font-display text-[1.4rem] leading-none tracking-luxury text-gold shrink-0 mt-[0.05em] w-7">
                          {i + 1}.
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-[1.05rem] md:text-[1.1rem] leading-[1.35] tracking-luxury text-ink m-0">
                            {s.name[locale]}
                          </h3>
                          <p className="mt-1.5 text-[14px] md:text-[15px] text-graphite leading-[1.65]">
                            {s.text[locale]}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </aside>
              )}
              {sections.map((section, i) => (
                <Fragment key={i}>
                  <RenderSection
                    section={section}
                    prefix={prefix}
                    locale={locale}
                    moneyHref={moneyHref}
                    autoLink={autoLinks.get(i)}
                    h2Id={section.type === 'h2' ? `s-${i}` : undefined}
                  />
                  {showToc && i === tocAfterIndex && (
                    <TableOfContents headings={tocHeadings} locale={locale} />
                  )}
                  {i === midCtaIndex && (
                    <MidArticleCta prefix={prefix} locale={locale} moneyHref={moneyHref} />
                  )}
                </Fragment>
              ))}
            </article>
          </div>
        </section>

        {/* Visible FAQ accordion — only when post.faq exists */}
        {post.faq && post.faq.length > 0 && (
          <section className="hair-top bg-ivory">
            <div className="container-edge max-w-3xl py-16 md:py-24">
              <div className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                <span className="section-num italic text-ink">FAQ</span>
                <span className="h-px w-10 bg-hairline" />
                <span>{locale === 'ko' ? '자주 묻는 질문' : 'Frequently asked questions'}</span>
              </div>
              <ul className="space-y-3">
                {post.faq.map((item, i) => (
                  <li key={i}>
                    <details className="group border-b border-hairline py-4">
                      <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                        <h3 className="font-display text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.4] tracking-luxury text-ink m-0 group-open:text-gold transition-colors">
                          {item.q[locale]}
                        </h3>
                        <span
                          aria-hidden
                          className="mt-1 text-ink/40 transition-transform duration-300 group-open:rotate-45 text-2xl leading-none"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-[15px] md:text-[16px] text-graphite leading-[1.75]">
                        {item.a[locale]}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related cluster — pillar + 5 sibling posts in same topic */}
        <RelatedCluster currentSlug={post.slug} locale={locale} />

        {/* Author box — mirrors the BlogPosting schema author, no fake credentials */}
        <section className="hair-top">
          <div className="container-edge">
            <div className="mx-auto max-w-[720px] py-12 md:py-14">
              <div className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bone hair-y font-display italic text-lg text-gold"
                >
                  SS
                </span>
                <div className="min-w-0">
                  <p className="overline text-ash mb-1.5">
                    {locale === 'ko' ? '글쓴이' : 'Written by'}
                  </p>
                  <p className="font-display text-[1.15rem] tracking-luxury text-ink m-0">
                    Steve Song
                    <span className="ml-3 text-[13px] font-sans not-italic text-graphite">
                      {locale === 'ko' ? '대표 — ZOE LUMOS' : 'Founder — ZOE LUMOS'}
                    </span>
                  </p>
                  <p className="mt-2 text-[14px] text-graphite leading-[1.7]">
                    {locale === 'ko'
                      ? '포트리 NJ에서 한인 비즈니스를 위한 이중언어 웹사이트, 로컬 SEO, 구글 광고를 직접 만들고 운영합니다.'
                      : 'Builds bilingual websites and runs local SEO and Google Ads for Korean-American businesses from Fort Lee, NJ.'}
                  </p>
                  <Link
                    href={`${prefix}/about`}
                    className="mt-3 inline-flex items-center gap-2 text-[13px] text-ink border-b border-ink/30 hover:border-ink hover:text-gold pb-0.5 transition-colors"
                  >
                    {locale === 'ko' ? '스티브 소개 보기' : 'About Steve'}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA — editorial ivory, headline keyed to the pillar money page */}
        <section className="hair-top hair-bottom bg-bone">
          <div className="container-edge py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                  <span className="section-num italic text-ink">—</span>
                  <span className="h-px w-10 bg-hairline" />
                  <span>{locale === 'ko' ? '다음 단계' : 'Next chapter'}</span>
                </div>
                <h2 className="font-display text-display-lg text-ink tracking-luxury leading-[1.05]">
                  {ui.ctaTitle}
                </h2>
                <p className="mt-6 text-body-lg text-graphite leading-[1.7] max-w-xl">
                  {ui.ctaDesc}
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col items-start md:items-end gap-5">
                <Link
                  href={moneyHref}
                  data-cursor={locale === 'ko' ? '보기' : 'View'}
                  className="btn-ink"
                >
                  {ui.ctaMoney}
                  <span className="arrow">→</span>
                </Link>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={locale === 'ko' ? '시작' : 'Begin'}
                  className="inline-flex items-center gap-2 text-[14px] text-ink border-b border-ink/30 hover:border-ink pb-1 transition-colors"
                >
                  {ui.ctaButton}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Back to blog */}
        <section className="py-14 text-center">
          <Link
            href={`${prefix}/blog`}
            data-cursor="view"
            className="overline text-ash hover:text-ink transition-colors"
          >
            {ui.backToBlog}
          </Link>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  )
}
