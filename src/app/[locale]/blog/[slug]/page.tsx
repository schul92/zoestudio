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
