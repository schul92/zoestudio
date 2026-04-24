'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'

type BlogPost = {
  id: number
  slug: string
  date: string
  readTime: number
  category: { en: string; ko: string }
  title: { en: string; ko: string }
  excerpt: { en: string; ko: string }
  image: string
}

type Content = {
  title: string
  subtitle: string
  description: string
  readMore: string
  minRead: string
  featured: string
  all: string
  searchPlaceholder: string
  noResults: string
}

export default function BlogListing({
  posts,
  locale,
  content,
}: {
  posts: BlogPost[]
  locale: 'en' | 'ko'
  content: Content
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [query, setQuery] = useState('')
  const prefix = locale === 'ko' ? '/ko' : ''
  const isKo = locale === 'ko'

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts]
  )
  const featured = sorted[0]
  const rest = sorted.slice(1)

  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const p of posts) set.add(p.category[locale])
    return Array.from(set)
  }, [posts, locale])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return rest.filter((p) => {
      if (activeCategory !== 'all' && p.category[locale] !== activeCategory) return false
      if (needle) {
        const hay = `${p.title[locale]} ${p.excerpt[locale]} ${p.category[locale]}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [rest, activeCategory, query, locale])

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <main className="min-h-screen bg-ivory text-ink">
      {/* Hero header */}
      <section className="relative hair-bottom pt-40 md:pt-48 pb-16 md:pb-24">
        <div className="container-edge">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 overline text-ash mb-12">
            <Link href={prefix || '/'} className="hover:text-ink transition-colors">
              {isKo ? '홈' : 'Home'}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{content.title}</span>
          </nav>

          <InView className="flex items-center gap-3 overline text-ash mb-8 hair-draw pb-4">
            <span className="section-num not-italic text-ink font-normal">§</span>
            <span className="h-px w-10 bg-hairline" />
            <span>{isKo ? '저널' : 'Journal'}</span>
            <span className="ml-2 text-ash/60">· {posts.length} {isKo ? '편' : 'pieces'}</span>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
            <h1 className="md:col-span-8 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] tracking-luxury text-ink">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{isKo ? '잘 만든' : 'Notes on'}</span>
              </InView>
              <InView as="span" className="mask-row" delay={140}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {isKo ? '웹사이트의 기록.' : 'making the web.'}
                </span>
              </InView>
            </h1>
            <InView as="p" className="reveal md:col-span-4 text-body-lg text-graphite leading-[1.7] max-w-md">
              <span>{content.description}</span>
            </InView>
          </div>
        </div>
      </section>

      {/* Featured piece */}
      {featured && (
        <section className="hair-bottom pb-20 md:pb-28">
          <div className="container-edge">
            <InView className="flex items-center gap-3 overline text-ash mb-10 hair-draw pb-3">
              <span className="section-num italic text-ink font-normal">—</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{isKo ? '피처드' : 'Featured'}</span>
            </InView>

            <Link
              href={`${prefix}/blog/${featured.slug}`}
              data-cursor={isKo ? '읽기' : 'Read'}
              className="group block"
            >
              <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
                <div className="md:col-span-7 relative aspect-[16/10] overflow-hidden rounded-[2px] bg-bone">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: 'radial-gradient(80% 60% at 50% 50%, rgba(184,145,74,0.25), transparent 80%)',
                    }}
                  />
                  <div className="absolute inset-6 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  {/* Corner marks */}
                  <span aria-hidden className="absolute top-5 right-5" style={{ width: 14, height: 14, borderTop: '1px solid rgba(20,20,20,0.3)', borderRight: '1px solid rgba(20,20,20,0.3)' }} />
                  <span aria-hidden className="absolute bottom-5 left-5" style={{ width: 14, height: 14, borderBottom: '1px solid rgba(20,20,20,0.3)', borderLeft: '1px solid rgba(20,20,20,0.3)' }} />
                  <div className="absolute top-4 left-4 overline text-ink bg-ivory/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <span className="gold-dot" />
                    {content.featured}
                  </div>
                </div>

                <div className="md:col-span-5 md:pr-4">
                  <div className="flex items-center gap-3 overline text-ash mb-6">
                    <span>{featured.category[locale]}</span>
                    <span className="w-6 h-px bg-hairline" />
                    <span>{formatDate(featured.date)}</span>
                    <span className="w-6 h-px bg-hairline" />
                    <span>{featured.readTime} {content.minRead}</span>
                  </div>
                  <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-luxury text-ink fraunces-soft group-hover:italic group-hover:text-gold group-hover:font-light transition-all duration-500">
                    {featured.title[locale]}
                  </h2>
                  <p className="mt-6 text-body text-graphite leading-[1.7] max-w-xl line-clamp-4">
                    {featured.excerpt[locale]}
                  </p>
                  <span className="mt-10 inline-flex items-center gap-3 text-[13px] font-medium text-ink border-b border-ink pb-1 group-hover:text-gold group-hover:border-gold transition-colors duration-500">
                    {content.readMore}
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Filters row */}
      <section className="hair-bottom">
        <div className="container-edge py-10 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
              <span className="overline text-ash shrink-0 pr-2">{isKo ? '카테고리' : 'Topics'}</span>
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-[13px] transition-all duration-300 border whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-ink text-ivory border-ink'
                    : 'text-graphite border-hairline hover:border-ink'
                }`}
              >
                {activeCategory === 'all' && <span className="mr-1">✓</span>}
                {content.all}
              </button>
              {categories.map((cat) => {
                const active = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[13px] transition-all duration-300 border whitespace-nowrap ${
                      active
                        ? 'bg-ink text-ivory border-ink'
                        : 'text-graphite border-hairline hover:border-ink'
                    }`}
                  >
                    {active && <span className="mr-1">✓</span>}
                    {cat}
                  </button>
                )
              })}
            </div>

            <div className="relative lg:w-72 shrink-0">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full bg-transparent border-b border-hairline focus:border-ink py-2 pr-7 text-[14px] focus:outline-none transition-colors placeholder:text-mute placeholder:italic"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-ash pointer-events-none">↵</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad">
        <div className="container-edge">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display italic text-2xl text-ink">{content.noResults}</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
              {filtered.map((post, i) => (
                <InView key={post.id} as="li" className="reveal" delay={(i % 3) * 80}>
                  <Link
                    href={`${prefix}/blog/${post.slug}`}
                    data-cursor={isKo ? '읽기' : 'Read'}
                    className="group block h-full"
                  >
                    <article className="h-full flex flex-col">
                      <div className="relative aspect-[5/4] overflow-hidden rounded-[2px] bg-bone">
                        <div className="absolute inset-5 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title[locale]}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                          />
                        </div>
                        <span aria-hidden className="absolute top-4 right-4" style={{ width: 12, height: 12, borderTop: '1px solid rgba(20,20,20,0.28)', borderRight: '1px solid rgba(20,20,20,0.28)' }} />
                        <span aria-hidden className="absolute bottom-4 left-4" style={{ width: 12, height: 12, borderBottom: '1px solid rgba(20,20,20,0.28)', borderLeft: '1px solid rgba(20,20,20,0.28)' }} />
                        <div className="absolute top-3 left-3 overline text-ink bg-ivory/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <span className="gold-dot" />
                          {String(i + 1).padStart(2, '0')}
                        </div>
                      </div>

                      <div className="mt-5 flex items-center gap-3 overline text-ash">
                        <span>{post.category[locale]}</span>
                        <span className="w-4 h-px bg-hairline" />
                        <span>{post.readTime} {content.minRead}</span>
                      </div>

                      <h3 className="mt-3 font-display text-[clamp(1.35rem,2.3vw,1.75rem)] leading-[1.15] tracking-luxury text-ink fraunces-soft group-hover:italic group-hover:text-gold group-hover:font-light transition-all duration-500 line-clamp-3">
                        {post.title[locale]}
                      </h3>

                      <p className="mt-3 text-[14px] text-graphite line-clamp-2 leading-[1.65] flex-1">
                        {post.excerpt[locale]}
                      </p>

                      <div className="mt-5 pt-4 border-t border-hairline flex items-center justify-between">
                        <span className="text-[12px] text-ash">{formatDate(post.date)}</span>
                        <span
                          aria-hidden
                          className="text-ash group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500"
                        >
                          ↗
                        </span>
                      </div>
                    </article>
                  </Link>
                </InView>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="hair-top section-pad">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                <span className="section-num italic text-ink">—</span>
                <span className="h-px w-10 bg-hairline" />
                <span>{isKo ? '다음 단계' : 'Next chapter'}</span>
              </InView>
              <h2 className="font-display text-display-lg text-ink tracking-luxury">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">{isKo ? '글로 읽으셨다면,' : 'Read enough.'}</span>
                </InView>
                <InView as="span" className="mask-row" delay={140}>
                  <span className="mask-rise block italic font-light text-gold fraunces-soft">
                    {isKo ? '이제 만들어볼 차례.' : 'Let us build.'}
                  </span>
                </InView>
              </h2>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Magnetic strength={14}>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={isKo ? '시작' : 'Begin'}
                  className="btn-ink"
                >
                  {isKo ? '프로젝트 시작' : 'Start a project'}
                  <span className="arrow">→</span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
