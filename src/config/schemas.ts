/**
 * Schema.org helpers.
 *
 * All helpers return plain objects ready for JSON.stringify inside a
 * <script type="application/ld+json"> tag.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

export function baseUrl() {
  return BASE
}

/* ── BreadcrumbList ─────────────────────────────────────────────── */

export type Crumb = { name: string; url: string }

export function breadcrumbList(trail: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : `${BASE}${c.url}`,
    })),
  }
}

/* ── WebPage ────────────────────────────────────────────────────── */

export function webPage({
  url,
  name,
  description,
  inLanguage = 'en-US',
  breadcrumb,
}: {
  url: string
  name: string
  description: string
  inLanguage?: string
  breadcrumb?: ReturnType<typeof breadcrumbList>
}) {
  const fullUrl = url.startsWith('http') ? url : `${BASE}${url}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name,
    description,
    inLanguage,
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    publisher: { '@id': `${BASE}/#organization` },
    ...(breadcrumb ? { breadcrumb } : {}),
  }
}

/* ── ItemList (generic) ─────────────────────────────────────────── */

export function itemList<T>({
  name,
  items,
  getItem,
}: {
  name: string
  items: T[]
  getItem: (item: T, i: number) => Record<string, unknown>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: getItem(item, i),
    })),
  }
}

/* ── Selected Work — CreativeWork list ──────────────────────────── */

export type WorkItem = {
  name: string
  url: string
  image: string
  year: string
  location: string
  industry: string
  disciplines: string[]
}

export function selectedWorkItemList(works: WorkItem[]) {
  return itemList({
    name: 'Selected Work — Zoe Lumos',
    items: works,
    getItem: (w) => ({
      '@type': 'CreativeWork',
      name: w.name,
      url: w.url.startsWith('http') ? w.url : `${BASE}${w.url}`,
      image: w.image.startsWith('http') ? w.image : `${BASE}${w.image}`,
      about: w.industry,
      locationCreated: w.location,
      dateCreated: w.year,
      keywords: w.disciplines.join(', '),
      creator: { '@id': `${BASE}/#organization` },
    }),
  })
}

/* ── Review ─────────────────────────────────────────────────────── */

export type Testimonial = {
  id: string
  body: string
  author: string
  role?: string
  project?: string
  rating?: number
}

export function reviewSchema(t: Testimonial) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${BASE}/#review-${t.id}`,
    reviewBody: t.body,
    author: { '@type': 'Person', name: t.author, ...(t.role ? { jobTitle: t.role } : {}) },
    itemReviewed: { '@id': `${BASE}/#organization` },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating ?? 5,
      bestRating: 5,
    },
    ...(t.project ? { about: t.project } : {}),
  }
}

/* ── CollectionPage (blog index) ────────────────────────────────── */

export type BlogIndexItem = {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
  category: string
  locale: 'en' | 'ko'
}

export function blogCollection({
  name,
  description,
  url,
  posts,
  locale = 'en',
}: {
  name: string
  description: string
  url: string
  posts: BlogIndexItem[]
  locale?: 'en' | 'ko'
}) {
  const fullUrl = url.startsWith('http') ? url : `${BASE}${url}`
  const prefix = locale === 'ko' ? '/ko' : ''
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${fullUrl}#collection`,
    url: fullUrl,
    name,
    description,
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 20).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${BASE}${prefix}/blog/${p.slug}`,
          url: `${BASE}${prefix}/blog/${p.slug}`,
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          image: p.image.startsWith('http') ? p.image : `${BASE}${p.image}`,
          articleSection: p.category,
          inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
          publisher: { '@id': `${BASE}/#organization` },
        },
      })),
    },
  }
}
