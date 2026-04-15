'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

  // Sort newest first, then pick featured (newest) + rest
  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts]
  )
  const featured = sorted[0]
  const rest = sorted.slice(1)

  // All unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const p of posts) set.add(p.category[locale])
    return Array.from(set)
  }, [posts, locale])

  // Filtered list
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
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href={prefix || '/'} className="text-gray-500 hover:text-black transition-colors">
            {locale === 'ko' ? '홈' : 'Home'}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{content.title}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-4">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content.description}</p>
        </div>

        {/* Featured article — hero card */}
        {featured && (
          <Link href={`${prefix}/blog/${featured.slug}`} className="group block mb-16">
            <article className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 hover:shadow-2xl transition-all">
              <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src={featured.image}
                  alt={featured.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {content.featured}
                </div>
              </div>
              <div className="px-2 md:px-4 py-4">
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {featured.category[locale]}
                  </span>
                  <span className="text-gray-500">{formatDate(featured.date)}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500">{featured.readTime} {content.minRead}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-gray-700 transition-colors">
                  {featured.title[locale]}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {featured.excerpt[locale]}
                </p>
                <span className="inline-flex items-center gap-2 text-gray-900 font-semibold group-hover:gap-3 transition-all">
                  {content.readMore} <span>→</span>
                </span>
              </div>
            </article>
          </Link>
        )}

        {/* Filter + search row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {content.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={content.searchPlaceholder}
            className="px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors lg:w-64"
          />
        </div>

        {/* Article grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">{content.noResults}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`${prefix}/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-5">
                    <Image
                      src={post.image}
                      alt={post.title[locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-semibold">
                      {post.category[locale]}
                    </span>
                    <span className="text-gray-500">{post.readTime} {content.minRead}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-gray-700 transition-colors line-clamp-2">
                    {post.title[locale]}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
                    {post.excerpt[locale]}
                  </p>
                  <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
