import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { BlogSection } from '@/data/blogContent'
import { blogContent } from '@/data/blogContent'
import { PILLARS, type PillarKey } from '@/data/blogClusters'
import type { PillarPageContent } from '@/data/pillarPages'
import { SITE_URL } from '@/lib/siteUrl'

function Section({ section }: { section: BlogSection }) {
  if (section.type === 'intro') {
    return (
      <p className="font-display italic font-light text-[clamp(1.35rem,2vw,1.65rem)] leading-[1.55] text-ink mb-12 pl-6 border-l-2 border-gold">
        {section.content}
      </p>
    )
  }
  if (section.type === 'h2') {
    return (
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-luxury text-ink mt-16 mb-6 fraunces-soft">
        {section.content}
      </h2>
    )
  }
  if (section.type === 'ul') {
    return (
      <div className="mb-8">
        {section.content && <p className="text-ink font-medium mb-4">{section.content}</p>}
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
  }
  return <p className="text-[1.0625rem] text-graphite leading-[1.8] mb-6">{section.content}</p>
}

export default function PillarPage({
  data,
  locale = 'en',
}: {
  data: PillarPageContent
  locale?: 'en' | 'ko'
}) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const pageUrl = `${SITE_URL}${prefix}${data.url}`
  const sections = data.sections[locale]
  const learn = data.whatYouWillLearn[locale]

  // Cluster posts this pillar anchors — real internal-linking hub.
  const pillar = PILLARS[data.pillarKey as PillarKey]
  const clusterPosts = (pillar?.posts || [])
    .map((slug) => blogContent.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 10)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title[locale],
    description: data.metaDescription[locale],
    inLanguage: isKo ? 'ko-KR' : 'en-US',
    author: { '@type': 'Organization', name: 'ZOE LUMOS', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'ZOE LUMOS', url: SITE_URL },
    mainEntityOfPage: pageUrl,
    url: pageUrl,
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({
      '@type': 'Question',
      name: f.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale] },
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: isKo ? `${SITE_URL}/ko` : SITE_URL },
      { '@type': 'ListItem', position: 2, name: isKo ? '가이드' : 'Guides', item: `${SITE_URL}${prefix}/blog` },
      { '@type': 'ListItem', position: 3, name: data.heroH1[locale], item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        {/* Hero */}
        <section className="container-edge pt-32 md:pt-44 pb-12 md:pb-16">
          <nav className="flex items-center gap-2 overline text-ash mb-8 flex-wrap">
            <Link href={prefix || '/'} className="hover:text-ink transition-colors">{isKo ? '홈' : 'Home'}</Link>
            <span className="opacity-50">/</span>
            <Link href={`${prefix}/blog`} className="hover:text-ink transition-colors">{isKo ? '가이드' : 'Guides'}</Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{data.heroEyebrow[locale]}</span>
          </nav>
          <p className="overline text-gold mb-5">{data.heroEyebrow[locale]}</p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-luxury text-ink max-w-4xl">
            {data.heroH1[locale]}
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-graphite leading-[1.7]">{data.heroIntro[locale]}</p>
        </section>

        {/* What you'll learn — TOC */}
        {learn?.length > 0 && (
          <section className="container-edge py-10 md:py-12 border-t border-hairline">
            <p className="overline text-ash mb-6">{isKo ? '이 가이드에서 배우는 것' : "What you'll learn"}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 max-w-4xl">
              {learn.map((it, i) => (
                <li key={i} className="flex items-start gap-3 text-graphite leading-[1.7]">
                  <span className="overline text-gold mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Body */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <div className="max-w-[760px]">
            {sections.map((s, i) => (
              <Section key={i} section={s} />
            ))}
          </div>
        </section>

        {/* Cluster posts — internal-linking hub */}
        {clusterPosts.length > 0 && (
          <section className="container-edge py-12 md:py-16 border-t border-hairline">
            <h2 className="font-display text-display-sm tracking-luxury mb-8">
              {isKo ? '이 주제의 글 더 보기' : 'More on this topic'}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl">
              {clusterPosts.map((post) => (
                <li key={post!.slug}>
                  <Link
                    href={`${prefix}/blog/${post!.slug}`}
                    className="group flex items-baseline gap-3 py-2 border-b border-hairline text-graphite hover:text-ink transition-colors"
                  >
                    <span className="overline text-gold">→</span>
                    <span className="leading-[1.5]">{post!.title[locale]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {data.faq.length > 0 && (
          <section className="container-edge py-12 md:py-16 border-t border-hairline">
            <h2 className="font-display text-display-sm tracking-luxury mb-10">
              {isKo ? '자주 묻는 질문' : 'Frequently asked questions'}
            </h2>
            <div className="space-y-8 max-w-3xl">
              {data.faq.map((f, i) => (
                <div key={i}>
                  <h3 className="font-display text-xl md:text-2xl tracking-luxury text-ink mb-3">{f.q[locale]}</h3>
                  <p className="text-graphite leading-[1.7]">{f.a[locale]}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="container-edge py-20 md:py-28 border-t border-hairline">
          <p className="font-display italic font-light text-[clamp(1.35rem,2.5vw,2rem)] text-ink leading-[1.4] max-w-2xl mb-8">
            {isKo
              ? '한인 비즈니스를 위한 이중언어 웹사이트·SEO·GEO. 무료 30분 상담으로 시작하세요.'
              : 'Bilingual websites, SEO, and GEO for Korean-American businesses. Start with a free 30-minute consultation.'}
          </p>
          <Link href={`${prefix}/contact`} className="btn-ink">
            {isKo ? '상담 시작하기' : 'Start a conversation'}
            <span className="arrow">→</span>
          </Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
