import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { blogContent, BlogSection } from '@/data/blogContent'

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
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
      '@type': 'Organization',
      name: 'ZOE LUMOS',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
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
      url: `${baseUrl}/og-image.png`,
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

// ─── Section renderer ─────────────────────────────────────────────────────────
function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case 'intro':
      return (
        <p className="font-display italic font-light text-[clamp(1.35rem,2vw,1.65rem)] leading-[1.55] text-ink mb-12 pl-6 border-l-2 border-gold">
          {section.content}
        </p>
      )
    case 'h2':
      return (
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-luxury text-ink mt-16 mb-6 fraunces-soft">
          {section.content}
        </h2>
      )
    case 'p':
      return (
        <p className="text-[1.0625rem] text-graphite leading-[1.8] mb-6">
          {section.content}
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
          <Link
            href="/#contact"
            data-cursor="Begin"
            className="btn-ink"
          >
            Get a free consultation
            <span className="arrow">→</span>
          </Link>
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

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const ui = {
    home: locale === 'ko' ? '홈' : 'Home',
    blog: locale === 'ko' ? '블로그' : 'Blog',
    backToBlog: locale === 'ko' ? '← 블로그로 돌아가기' : '← Back to Blog',
    minRead: locale === 'ko' ? '분 읽기' : 'min read',
    by: locale === 'ko' ? '작성자' : 'By',
    ctaTitle:
      locale === 'ko'
        ? '비즈니스를 성장시킬 준비가 되셨나요?'
        : 'Ready to grow your business?',
    ctaDesc:
      locale === 'ko'
        ? 'ZOE LUMOS는 포트리 NJ 소재 한인 디지털 마케팅 에이전시입니다. 웹사이트 제작, 로컬 SEO, 구글 광고를 전문으로 합니다.'
        : 'ZOE LUMOS is a Korean-American digital marketing agency in Fort Lee, NJ, specializing in bilingual websites, local SEO, and Google Ads.',
    ctaButton:
      locale === 'ko' ? '무료 상담 받기 →' : 'Get a Free Consultation →',
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: `${baseUrl}${prefix || ''}` },
      { '@type': 'ListItem', position: 2, name: ui.blog, item: `${baseUrl}${prefix}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title[locale], item: `${baseUrl}${prefix}/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <BlogPostingSchema post={post} locale={locale} />
      <FAQPageSchema post={post} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <main className="min-h-screen bg-ivory text-ink">
        {/* Article header band */}
        <section className="hair-bottom pt-40 md:pt-48 pb-16 md:pb-20">
          <div className="container-edge">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 overline text-ash mb-10">
              <Link href={prefix || '/'} className="hover:text-ink transition-colors">
                {ui.home}
              </Link>
              <span className="opacity-50">/</span>
              <Link href={`${prefix}/blog`} className="hover:text-ink transition-colors">
                {ui.blog}
              </Link>
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
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="py-16 md:py-24">
          <div className="container-edge">
            <article className="mx-auto max-w-[720px]">
              {sections.map((section, i) => (
                <RenderSection key={i} section={section} />
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

        {/* Bottom CTA — editorial ivory */}
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
              <div className="md:col-span-4 md:text-right">
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={locale === 'ko' ? '시작' : 'Begin'}
                  className="btn-ink"
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
