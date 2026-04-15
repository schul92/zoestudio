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
    category: { en: 'Pricing', ko: '비용 안내' },
    title: { en: 'How Much Does a Website Cost in 2026? (NJ/NY/CA/TX)', ko: '2026년 웹사이트 제작 비용 총정리 (뉴저지/뉴욕/캘리포니아/텍사스)' },
    excerpt: { en: 'Transparent pricing guide for website design in 2026. Compare costs across NJ, NY, California, Texas, and nationwide.', ko: '2026년 미국 한인 웹사이트 제작 비용 비교. 뉴저지, 뉴욕, 캘리포니아, 텍사스 지역별 가격 안내.' },
    image: '/blog/website-cost.jpg'
  },
  {
    id: 6,
    slug: 'do-i-need-a-website-korean-business',
    date: '2026-04-15',
    readTime: 9,
    category: { en: 'Foundations', ko: '기초 가이드' },
    title: { en: 'Do Korean-American Businesses Actually Need a Website in 2026?', ko: '2026년, 미국 한인 비즈니스에 정말 웹사이트가 필요할까요?' },
    excerpt: { en: 'An honest look at whether your Korean-American business needs a website in 2026, or if Instagram, KakaoTalk, and Google Business Profile are enough.', ko: '인스타그램, 카카오톡, 구글 비즈니스 프로필만 있으면 되는 시대에 과연 한인 비즈니스에 웹사이트가 필요한지 솔직하게 분석합니다.' },
    image: '/blog/need-website.jpg'
  },
  {
    id: 7,
    slug: 'website-cost-hidden-fees-usa',
    date: '2026-04-14',
    readTime: 8,
    category: { en: 'Pricing', ko: '비용 안내' },
    title: { en: 'The Real Cost of a Website in 2026 — A Korean-American Business Owner\'s Guide to Hidden Fees', ko: '2026년 웹사이트의 진짜 비용 — 한인 사업주를 위한 숨은 비용 완벽 가이드' },
    excerpt: { en: 'What a website actually costs in 2026 beyond the sticker price. Hidden fees, 3-year total cost of ownership, and red flags to avoid.', ko: '2026년 웹사이트의 표면 가격 너머 진짜 비용. 숨은 수수료, 3년 총 소유 비용, 피해야 할 위험 신호 총정리.' },
    image: '/blog/hidden-fees.jpg'
  },
  {
    id: 8,
    slug: 'korean-restaurant-website-essentials',
    date: '2026-04-13',
    readTime: 10,
    category: { en: 'Industry Guide', ko: '업종별 가이드' },
    title: { en: '11 Essentials Every Korean Restaurant Website Needs in 2026', ko: '2026년 한식당 웹사이트에 꼭 필요한 11가지' },
    excerpt: { en: 'From bilingual menus to KakaoTalk integration — the 11 must-have features every Korean restaurant website needs to convert visitors into diners.', ko: '이중언어 메뉴부터 카카오톡 연동까지 — 방문자를 실제 고객으로 전환시키는 한식당 웹사이트 필수 11가지 요소.' },
    image: '/blog/korean-restaurant.jpg'
  },
  {
    id: 9,
    slug: 'naver-vs-google-korean-business-usa',
    date: '2026-04-12',
    readTime: 7,
    category: { en: 'SEO', ko: 'SEO' },
    title: { en: 'Naver vs Google: Where Should Your US-Based Korean Business Actually Rank?', ko: '네이버 vs 구글: 미국 한인 비즈니스는 어디에 랭크해야 할까?' },
    excerpt: { en: 'Most Korean-Americans in the US search on Google, not Naver. An honest breakdown of where to invest your SEO budget for a US-based Korean business.', ko: '미국의 한인들은 대부분 네이버가 아닌 구글을 사용합니다. 미국 한인 비즈니스가 SEO 예산을 어디에 투자해야 하는지 솔직하게 분석합니다.' },
    image: '/blog/naver-vs-google.jpg'
  },
  {
    id: 10,
    slug: 'kakaotalk-channel-us-korean-business',
    date: '2026-04-11',
    readTime: 7,
    category: { en: 'Marketing', ko: '마케팅' },
    title: { en: 'How to Use KakaoTalk Channel for a US-Based Korean Business (2026 Guide)', ko: '미국 한인 비즈니스를 위한 카카오톡 채널 활용 가이드 (2026년 완벽판)' },
    excerpt: { en: 'A step-by-step guide to setting up and using KakaoTalk Channel from the US for your Korean-American business — customer service, marketing, and retention.', ko: '미국에서 한인 비즈니스용 카카오톡 채널을 설정하고 활용하는 단계별 가이드 — 고객 응대, 마케팅, 재방문 유도까지.' },
    image: '/blog/kakaotalk.jpg'
  },
  {
    id: 11,
    slug: 'case-study-korean-nail-salon-seo-10x',
    date: '2026-04-10',
    readTime: 9,
    category: { en: 'Case Study', ko: '사례 연구' },
    title: { en: 'Case Study: How We 10×\'d a Korean Nail Salon\'s Organic Traffic in 6 Months', ko: '사례 연구: 한인 네일샵의 유입 트래픽을 6개월 만에 10배로 만든 방법' },
    excerpt: { en: 'A step-by-step case study of how ZOE LUMOS grew a North Bergen Korean nail salon\'s organic Google traffic from 40 to 430 monthly visits in 6 months.', ko: 'North Bergen 한인 네일샵의 월 유입을 6개월 만에 40명에서 430명으로 늘린 ZOE LUMOS의 단계별 사례 연구.' },
    image: '/blog/nail-salon-case.jpg'
  },
  {
    id: 12,
    slug: 'bilingual-seo-technical-guide-hreflang',
    date: '2026-04-09',
    readTime: 11,
    category: { en: 'Technical SEO', ko: '기술 SEO' },
    title: { en: 'The Technical Bilingual SEO Playbook — hreflang, Canonicals, and Language-Aware Architecture', ko: '이중언어 SEO 기술 플레이북 — hreflang, 캐노니컬, 언어 인식 아키텍처' },
    excerpt: { en: 'A developer-friendly, honest guide to implementing bilingual Korean-English SEO correctly. hreflang, canonicals, URL structure, and common mistakes.', ko: '이중언어 한영 SEO를 올바르게 구현하는 개발자 친화적 가이드. hreflang, 캐노니컬, URL 구조, 흔한 실수들.' },
    image: '/blog/hreflang-seo.jpg'
  },
  {
    id: 13,
    slug: 'wordpress-to-nextjs-korean-business-migration',
    date: '2026-04-08',
    readTime: 10,
    category: { en: 'Technical', ko: '기술' },
    title: { en: 'Migrating from WordPress to Next.js — A Korean Business Case Study', ko: '워드프레스에서 Next.js로 — 한인 비즈니스 마이그레이션 사례' },
    excerpt: { en: 'A honest walkthrough of migrating a Korean-American business website from WordPress to Next.js — decisions, risks, metrics, and when NOT to migrate.', ko: '한인 비즈니스 웹사이트를 워드프레스에서 Next.js로 마이그레이션하는 솔직한 가이드 — 결정, 리스크, 지표, 그리고 마이그레이션하지 말아야 할 때.' },
    image: '/blog/wordpress-nextjs.jpg'
  },
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
              <Link
                key={post.id}
                href={`${prefix}/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                  {/* Placeholder Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl">
                      {post.category.en === 'SEO' && '🔍'}
                      {post.category.en === 'Google Ads' && '📊'}
                      {post.category.en === 'Web Design' && '🎨'}
                      {post.category.en === 'E-commerce' && '🛒'}
                      {post.category.en === 'Yelp Ads' && '⭐'}
                      {post.category.en === 'Marketing' && '📈'}
                      {post.category.en === 'Pricing' && '💰'}
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
              </Link>
            ))}
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
