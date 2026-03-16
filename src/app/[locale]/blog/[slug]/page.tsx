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
        <p className="text-xl text-gray-700 leading-relaxed font-light mb-8 border-l-4 border-amber-400 pl-5">
          {section.content}
        </p>
      )
    case 'h2':
      return (
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 leading-snug">
          {section.content}
        </h2>
      )
    case 'p':
      return (
        <p className="text-gray-700 leading-relaxed mb-6 text-[1.0625rem]">
          {section.content}
        </p>
      )
    case 'ul':
      return (
        <div className="mb-6">
          {section.content && (
            <p className="text-gray-700 font-medium mb-3">{section.content}</p>
          )}
          <ul className="space-y-2 pl-1">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-[1.0625rem]">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'tip':
      return (
        <div className="my-8 rounded-xl bg-amber-50 border border-amber-200 px-6 py-5">
          <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">
            💡 Tip
          </p>
          <p className="text-gray-800 leading-relaxed">{section.content}</p>
        </div>
      )
    case 'cta':
      return (
        <div className="my-10 rounded-2xl bg-black px-8 py-8 text-white text-center">
          <p className="text-lg leading-relaxed mb-6">{section.content}</p>
          <Link
            href="/#contact"
            className="inline-block bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition-colors"
          >
            Get a Free Consultation →
          </Link>
        </div>
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

  return (
    <>
      <HeaderWrapper locale={locale} />
      <BlogPostingSchema post={post} locale={locale} />

      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* ── Breadcrumb ──────────────────────────────────────────────── */}
          <nav className="mb-8 text-sm flex items-center gap-1 flex-wrap">
            <Link href={prefix || '/'} className="text-gray-500 hover:text-black transition-colors">
              {ui.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`${prefix}/blog`} className="text-gray-500 hover:text-black transition-colors">
              {ui.blog}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 line-clamp-1">{post.title[locale]}</span>
          </nav>

          {/* ── Article header ──────────────────────────────────────────── */}
          <header className="mb-10">
            {/* Category badge */}
            <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              {post.category[locale]}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              {post.title[locale]}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-6">
              <span>{formattedDate}</span>
              <span className="text-gray-300">·</span>
              <span>
                {post.readTime} {ui.minRead}
              </span>
              <span className="text-gray-300">·</span>
              <span>
                {ui.by} {post.author}
              </span>
            </div>
          </header>

          {/* ── Article body ────────────────────────────────────────────── */}
          <article className="mb-16">
            {sections.map((section, i) => (
              <RenderSection key={i} section={section} />
            ))}
          </article>

          {/* ── Bottom CTA ──────────────────────────────────────────────── */}
          <div className="rounded-2xl bg-gray-950 text-white px-8 py-10 text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">{ui.ctaTitle}</h2>
            <p className="text-gray-300 mb-7 max-w-xl mx-auto leading-relaxed">
              {ui.ctaDesc}
            </p>
            <Link
              href={`${prefix}/#contact`}
              className="inline-block bg-amber-400 text-black font-semibold px-10 py-3 rounded-full hover:bg-amber-300 transition-colors"
            >
              {ui.ctaButton}
            </Link>
          </div>

          {/* ── Back to blog ────────────────────────────────────────────── */}
          <div className="text-center">
            <Link
              href={`${prefix}/blog`}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {ui.backToBlog}
            </Link>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  )
}
