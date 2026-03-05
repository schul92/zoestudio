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
    slug: 'korean-business-website-guide-2026',
    date: '2026-03-01',
    readTime: 10,
    category: {
      en: 'Web Design',
      ko: '웹 디자인'
    },
    title: {
      en: '2026 Guide: Building a Website for Korean-American Businesses',
      ko: '2026년 미국 한인 비즈니스 웹사이트 제작 완벽 가이드'
    },
    excerpt: {
      en: 'Everything Korean-American business owners need to know about building a bilingual website in 2026. From NJ to CA, TX to GA.',
      ko: 'NJ, NY, CA, TX, GA 등 미국 전역 한인 사업주를 위한 이중언어 웹사이트 제작 가이드. 비용, 기간, 필수 기능 총정리.'
    },
    image: '/blog/korean-business-website.jpg'
  },
  {
    id: 2,
    slug: 'local-seo-korean-business-2026',
    date: '2026-02-20',
    readTime: 8,
    category: {
      en: 'SEO',
      ko: 'SEO'
    },
    title: {
      en: 'Local SEO for Korean Businesses: NJ, NY, CA, TX & Beyond',
      ko: '한인 비즈니스 로컬 SEO 가이드: 뉴저지, 뉴욕, 캘리포니아, 텍사스'
    },
    excerpt: {
      en: 'How Korean-American businesses can dominate local Google search in their city. Proven strategies for Fort Lee, Flushing, LA Koreatown, and more.',
      ko: '포트리, 플러싱, LA 코리아타운, 애틀랜타 등 한인 밀집 지역에서 구글 상위 노출하는 방법. 실전 SEO 전략.'
    },
    image: '/blog/local-seo.jpg'
  },
  {
    id: 3,
    slug: 'google-ads-korean-business',
    date: '2026-02-10',
    readTime: 6,
    category: {
      en: 'Google Ads',
      ko: '구글 광고'
    },
    title: {
      en: 'Google Ads for Korean Businesses: Stop Wasting Money',
      ko: '한인 비즈니스 구글 광고: 돈 낭비 없는 광고 전략'
    },
    excerpt: {
      en: 'Korean-American business owners: avoid these 7 Google Ads mistakes. Bilingual ad strategies that actually convert.',
      ko: '한인 사업주가 흔히 하는 구글 광고 7가지 실수. 한영 이중언어 광고로 실제 고객 전환하는 전략.'
    },
    image: '/blog/google-ads.jpg'
  },
  {
    id: 4,
    slug: 'shopify-korean-ecommerce',
    date: '2026-01-28',
    readTime: 10,
    category: {
      en: 'E-commerce',
      ko: '이커머스'
    },
    title: {
      en: 'Shopify for Korean Businesses: Complete Setup Guide',
      ko: '한인 비즈니스 Shopify 쇼핑몰 제작 완벽 가이드'
    },
    excerpt: {
      en: 'Set up a Shopify store for your Korean-American business. Korean payment options, bilingual product pages, and SEO tips.',
      ko: '미국 한인 사업주를 위한 Shopify 쇼핑몰 구축 가이드. 한국어 상품 페이지, 결제 시스템, SEO 최적화 총정리.'
    },
    image: '/blog/shopify-seo.jpg'
  },
  {
    id: 5,
    slug: 'nj-ny-website-cost-2026',
    date: '2026-01-15',
    readTime: 7,
    category: {
      en: 'Pricing',
      ko: '비용 안내'
    },
    title: {
      en: 'How Much Does a Website Cost in 2026? (NJ/NY/CA/TX)',
      ko: '2026년 웹사이트 제작 비용 총정리 (뉴저지/뉴욕/캘리포니아/텍사스)'
    },
    excerpt: {
      en: 'Transparent pricing guide for website design in 2026. Compare costs across NJ, NY, California, Texas, and nationwide.',
      ko: '2026년 미국 한인 웹사이트 제작 비용 비교. 뉴저지, 뉴욕, 캘리포니아, 텍사스 지역별 가격 안내.'
    },
    image: '/blog/website-cost.jpg'
  },
  {
    id: 6,
    slug: 'yelp-advertising-korean-restaurants',
    date: '2026-01-05',
    readTime: 7,
    category: {
      en: 'Yelp Ads',
      ko: '옐프 광고'
    },
    title: {
      en: 'Yelp Advertising for Korean Restaurants: Worth It?',
      ko: '한인 레스토랑 옐프 광고: 효과 있을까?'
    },
    excerpt: {
      en: 'Should your Korean restaurant invest in Yelp ads? Honest ROI analysis with real data from NJ, NY, and LA restaurants.',
      ko: '한인 레스토랑 옐프 광고 효과 분석. NJ, NY, LA 한인 레스토랑 실제 데이터 기반 ROI 분석.'
    },
    image: '/blog/yelp-ads.jpg'
  },
  {
    id: 7,
    slug: 'california-korean-website-design',
    date: '2025-12-20',
    readTime: 8,
    category: {
      en: 'Web Design',
      ko: '웹 디자인'
    },
    title: {
      en: 'Website Design for Korean Businesses in California',
      ko: '캘리포니아 한인 비즈니스 웹사이트 제작 가이드'
    },
    excerpt: {
      en: 'LA Koreatown, Orange County, San Francisco — web design tips for California Korean-American businesses.',
      ko: 'LA 코리아타운, 오렌지카운티, 샌프란시스코 한인 비즈니스를 위한 웹사이트 제작 팁과 전략.'
    },
    image: '/blog/california-korean.jpg'
  },
  {
    id: 8,
    slug: 'texas-georgia-korean-business-online',
    date: '2025-12-10',
    readTime: 8,
    category: {
      en: 'Marketing',
      ko: '마케팅'
    },
    title: {
      en: 'Growing Your Korean Business Online in Texas & Georgia',
      ko: '텍사스·조지아 한인 비즈니스 온라인 성장 전략'
    },
    excerpt: {
      en: 'Dallas, Houston, Atlanta — how Korean businesses in the South are winning with digital marketing in 2026.',
      ko: '달라스, 휴스턴, 애틀랜타 한인 비즈니스의 디지털 마케팅 성공 전략. 2026년 최신 트렌드.'
    },
    image: '/blog/texas-georgia.jpg'
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
