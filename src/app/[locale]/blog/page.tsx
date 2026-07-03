import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import BlogListing from '@/components/blog/BlogListing'
import { blogContent } from '@/data/blogContent'
import { POST_TO_PILLAR } from '@/data/blogClusters'
import fs from 'fs'
import path from 'path'
import { SITE_URL } from '@/lib/siteUrl'

// Build-time check: which blog slugs have a static PNG on disk vs. need
// the dynamic /api/og fallback. Runs once at SSG time, zero runtime cost.
const BLOG_IMG_DIR = path.join(process.cwd(), 'public', 'blog')
const STATIC_BLOG_IMAGES: Set<string> = (() => {
  try {
    return new Set(
      fs.readdirSync(BLOG_IMG_DIR)
        .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
        .map((f) => f.replace(/\.[^.]+$/, ''))
    )
  } catch {
    return new Set<string>()
  }
})()

function blogImageUrl(slug: string, title: string): string {
  if (STATIC_BLOG_IMAGES.has(slug)) return `/blog/${slug}.png`
  const encodedTitle = encodeURIComponent(title.slice(0, 60))
  return `/api/og?title=${encodedTitle}&subtitle=Zoe+Lumos+%C2%B7+Korean+Web+%26+SEO`
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' }
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = SITE_URL

  const metadata = {
    en: {
      title: 'Digital Marketing Blog - ZOE LUMOS | SEO, Google Ads & Web Design Tips',
      description: 'Expert digital marketing insights, SEO tips, Google Ads strategies, and web design best practices. Learn how to grow your business online with ZOE LUMOS.',
      keywords: 'digital marketing blog, SEO tips, Google Ads tips, web design tips, small business marketing, local SEO guide, e-commerce tips',
    },
    ko: {
      title: '디지털 마케팅 블로그 - ZOE LUMOS | SEO, 구글 광고 & 웹 디자인 팁',
      description: '전문 디지털 마케팅 인사이트, SEO 팁, 구글 광고 전략, 웹 디자인 모범 사례. ZOE LUMOS와 함께 온라인 비즈니스 성장 방법을 배워보세요.',
      keywords: '디지털 마케팅 블로그, SEO 팁, 구글 광고 팁, 웹 디자인 팁, 소규모 비즈니스 마케팅, 로컬 SEO 가이드, 이커머스 팁',
    }
  }

  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    keywords: metadata[locale].keywords,
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/blog` : `${baseUrl}/ko/blog`,
      languages: {
        'x-default': `${baseUrl}/blog`,
        'en': `${baseUrl}/blog`,
        'ko': `${baseUrl}/ko/blog`,
      },
    },
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: locale === 'en' ? `${baseUrl}/blog` : `${baseUrl}/ko/blog`,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Blog Schema
function generateBlogSchema(locale: 'en' | 'ko') {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": locale === 'en' ? 'ZOE LUMOS Digital Marketing Blog' : 'ZOE LUMOS 디지털 마케팅 블로그',
    "description": locale === 'en'
      ? 'Expert digital marketing insights, SEO tips, and web design best practices'
      : '전문 디지털 마케팅 인사이트, SEO 팁, 웹 디자인 모범 사례',
    "url": `https://www.zoelumos.com${locale === 'ko' ? '/ko' : ''}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "ZOE LUMOS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.zoelumos.com/favicon.svg"
      }
    },
    "blogPost": blogPostsForSchema.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title[locale],
      "description": post.excerpt[locale],
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": "ZOE LUMOS"
      }
    }))
  }
}

const content = {
  en: {
    title: 'Blog',
    subtitle: 'Digital Marketing Insights',
    description: 'Tips, strategies, and best practices to grow your Korean-American business online',
    readMore: 'Read',
    minRead: 'min read',
    featured: 'Featured',
    all: 'All',
    searchPlaceholder: 'Search articles...',
    noResults: 'No articles match your filter.',
  },
  ko: {
    title: '블로그',
    subtitle: '디지털 마케팅 인사이트',
    description: '한인 비즈니스 온라인 성장을 위한 팁, 전략, 모범 사례',
    readMore: '읽기',
    minRead: '분',
    featured: '추천',
    all: '전체',
    searchPlaceholder: '검색...',
    noResults: '검색 결과가 없습니다.',
  },
}

// Auto-derive from blogContent.ts — single source of truth, never goes stale.
// Hand-curated featured ordering: TJ Flowers + 3 app-dev posts pinned at top
// (id 0-3), everything else by date desc.
const FEATURED_SLUGS = [
  'tj-flowers-shopify-revamp-case-study',
  'korean-restaurant-own-app-vs-doordash',
  'pwa-vs-native-app-korean-smb',
  'app-store-submission-korean-business-guide',
]
const sortedContent = [...blogContent].sort((a, b) => {
  const ai = FEATURED_SLUGS.indexOf(a.slug)
  const bi = FEATURED_SLUGS.indexOf(b.slug)
  if (ai !== -1 || bi !== -1) {
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  }
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})
const postsWithImages = sortedContent.map((p, i) => ({
  id: i,
  slug: p.slug,
  date: p.date,
  readTime: p.readTime,
  category: p.category,
  title: p.title,
  excerpt: p.metaDescription,
  // Static PNG if it exists, dynamic /api/og fallback otherwise.
  // Falls back automatically for any future post without a generated hero.
  image: blogImageUrl(p.slug, p.title.en),
  // Pillar cluster key — powers the series filter pills in BlogListing.
  pillarKey: POST_TO_PILLAR[p.slug],
}))
// Auto-derived list keeps the JSON-LD schema and rendered list in sync.
const blogPostsForSchema = postsWithImages

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = content[locale]

  const baseUrl = SITE_URL
  const prefix = locale === 'ko' ? '/ko' : ''
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: `${baseUrl}${prefix || ''}` },
      { '@type': 'ListItem', position: 2, name: t.title, item: `${baseUrl}${prefix}/blog` },
    ],
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogSchema(locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <BlogListing posts={postsWithImages} locale={locale} content={t} />
      <Footer locale={locale} />
    </>
  )
}
