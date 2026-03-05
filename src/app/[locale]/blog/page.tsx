import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

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

// Blog posts data (can be moved to a separate file or CMS later)
const blogPosts = [
  {
    id: 1,
    slug: 'local-seo-guide-small-business',
    date: '2024-12-15',
    readTime: 8,
    category: {
      en: 'SEO',
      ko: 'SEO'
    },
    title: {
      en: 'The Complete Local SEO Guide for Small Businesses in 2024',
      ko: '2024년 소규모 비즈니스를 위한 완벽한 로컬 SEO 가이드'
    },
    excerpt: {
      en: 'Learn how to dominate local search results and attract more customers in your area with proven SEO strategies.',
      ko: '검증된 SEO 전략으로 로컬 검색 결과를 장악하고 지역 고객을 더 많이 유치하는 방법을 배워보세요.'
    },
    image: '/blog/local-seo.jpg'
  },
  {
    id: 2,
    slug: 'google-ads-mistakes-avoid',
    date: '2024-12-10',
    readTime: 6,
    category: {
      en: 'Google Ads',
      ko: '구글 광고'
    },
    title: {
      en: '7 Google Ads Mistakes That Are Wasting Your Money',
      ko: '돈을 낭비하는 7가지 구글 광고 실수'
    },
    excerpt: {
      en: 'Avoid these common Google Ads mistakes that drain your budget without delivering results.',
      ko: '결과 없이 예산만 소진하는 흔한 구글 광고 실수들을 피하세요.'
    },
    image: '/blog/google-ads.jpg'
  },
  {
    id: 3,
    slug: 'website-speed-seo-ranking',
    date: '2024-12-05',
    readTime: 5,
    category: {
      en: 'Web Design',
      ko: '웹 디자인'
    },
    title: {
      en: 'How Website Speed Affects Your SEO Rankings',
      ko: '웹사이트 속도가 SEO 순위에 미치는 영향'
    },
    excerpt: {
      en: 'Discover why page speed is crucial for SEO and learn practical tips to make your website faster.',
      ko: '페이지 속도가 SEO에 왜 중요한지 알아보고 웹사이트를 더 빠르게 만드는 실용적인 팁을 배워보세요.'
    },
    image: '/blog/website-speed.jpg'
  },
  {
    id: 4,
    slug: 'shopify-seo-ecommerce',
    date: '2024-11-28',
    readTime: 10,
    category: {
      en: 'E-commerce',
      ko: '이커머스'
    },
    title: {
      en: 'Shopify SEO: The Ultimate Guide to Ranking Your Online Store',
      ko: '쇼피파이 SEO: 온라인 스토어 순위 올리기 완벽 가이드'
    },
    excerpt: {
      en: 'Master Shopify SEO with this comprehensive guide covering product pages, collections, and technical optimization.',
      ko: '제품 페이지, 컬렉션, 기술 최적화를 다루는 이 종합 가이드로 쇼피파이 SEO를 마스터하세요.'
    },
    image: '/blog/shopify-seo.jpg'
  },
  {
    id: 5,
    slug: 'yelp-advertising-restaurants',
    date: '2024-11-20',
    readTime: 7,
    category: {
      en: 'Yelp Ads',
      ko: '옐프 광고'
    },
    title: {
      en: 'Is Yelp Advertising Worth It for Restaurants?',
      ko: '레스토랑에게 옐프 광고가 가치가 있을까?'
    },
    excerpt: {
      en: 'An honest analysis of Yelp advertising for restaurants, including costs, benefits, and alternatives.',
      ko: '비용, 장점, 대안을 포함한 레스토랑을 위한 옐프 광고에 대한 솔직한 분석.'
    },
    image: '/blog/yelp-ads.jpg'
  },
  {
    id: 6,
    slug: 'korean-business-marketing-usa',
    date: '2024-11-15',
    readTime: 8,
    category: {
      en: 'Marketing',
      ko: '마케팅'
    },
    title: {
      en: 'Digital Marketing Strategies for Korean Businesses in the USA',
      ko: '미국 내 한인 비즈니스를 위한 디지털 마케팅 전략'
    },
    excerpt: {
      en: 'Tailored marketing strategies for Korean-American businesses targeting both Korean and American customers.',
      ko: '한인 및 미국인 고객 모두를 타겟팅하는 한인 비즈니스를 위한 맞춤형 마케팅 전략.'
    },
    image: '/blog/korean-business.jpg'
  }
]

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
    "blogPost": blogPosts.map(post => ({
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
    description: 'Tips, strategies, and best practices to grow your business online',
    readMore: 'Read More',
    minRead: 'min read',
    comingSoon: 'Full articles coming soon! Subscribe to get notified.',
    categories: 'Categories',
    subscribe: {
      title: 'Stay Updated',
      description: 'Get the latest digital marketing tips delivered to your inbox',
      placeholder: 'Enter your email',
      button: 'Subscribe'
    }
  },
  ko: {
    title: '블로그',
    subtitle: '디지털 마케팅 인사이트',
    description: '온라인 비즈니스 성장을 위한 팁, 전략, 모범 사례',
    readMore: '자세히 보기',
    minRead: '분 읽기',
    comingSoon: '전체 글은 곧 공개됩니다! 알림을 받으려면 구독하세요.',
    categories: '카테고리',
    subscribe: {
      title: '최신 소식 받기',
      description: '최신 디지털 마케팅 팁을 이메일로 받아보세요',
      placeholder: '이메일 입력',
      button: '구독하기'
    }
  }
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = content[locale]
  const prefix = locale === 'ko' ? '/ko' : ''

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category[locale])))

  return (
    <>
      <HeaderWrapper locale={locale} />

      {/* Blog Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogSchema(locale)),
        }}
      />

      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <Link href={prefix || '/'} className="text-gray-500 hover:text-black transition-colors">
              {locale === 'ko' ? '홈' : 'Home'}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{t.title}</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-xl text-gray-600 mb-2">{t.subtitle}</p>
            <p className="text-gray-500">{t.description}</p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
              >
                {/* Placeholder Image */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-4xl">
                    {post.category.en === 'SEO' && '🔍'}
                    {post.category.en === 'Google Ads' && '📊'}
                    {post.category.en === 'Web Design' && '🎨'}
                    {post.category.en === 'E-commerce' && '🛒'}
                    {post.category.en === 'Yelp Ads' && '⭐'}
                    {post.category.en === 'Marketing' && '📈'}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-black bg-gray-100 px-2 py-1 rounded">
                      {post.category[locale]}
                    </span>
                    <span className="text-xs text-gray-400">
                      {post.readTime} {t.minRead}
                    </span>
                  </div>

                  <h2 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {post.title[locale]}
                  </h2>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt[locale]}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(post.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-sm font-medium text-gray-900 group-hover:translate-x-1 transition-transform">
                      {t.readMore} →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center mb-16 p-8 bg-gray-50 rounded-2xl">
            <p className="text-gray-600">{t.comingSoon}</p>
          </div>

          {/* Newsletter Subscribe */}
          <div className="bg-black rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.subscribe.title}</h2>
            <p className="text-gray-300 mb-8">{t.subscribe.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t.subscribe.placeholder}
                className="flex-1 px-6 py-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors">
                {t.subscribe.button}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
