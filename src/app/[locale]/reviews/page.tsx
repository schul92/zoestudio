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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  const metadata = {
    en: {
      title: 'Client Reviews & Testimonials - ZOE LUMOS | 5-Star Rated Agency',
      description: 'Read what our clients say about ZOE LUMOS. 5-star rated digital marketing agency specializing in SEO, Google Ads, and web design for small businesses.',
      keywords: 'ZOE LUMOS reviews, digital marketing agency reviews, SEO agency testimonials, web design reviews, Google Ads management reviews, NY NJ marketing agency',
    },
    ko: {
      title: '고객 후기 & 리뷰 - ZOE LUMOS | 5성급 에이전시',
      description: 'ZOE LUMOS 고객 리뷰를 확인하세요. 소규모 비즈니스를 위한 SEO, 구글 광고, 웹 디자인 전문 5성급 디지털 마케팅 에이전시.',
      keywords: 'ZOE LUMOS 리뷰, 디지털 마케팅 에이전시 후기, SEO 에이전시 리뷰, 웹 디자인 후기, 구글 광고 관리 리뷰, NY NJ 마케팅 에이전시',
    }
  }

  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    keywords: metadata[locale].keywords,
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/reviews` : `${baseUrl}/ko/reviews`,
      languages: {
        'x-default': `${baseUrl}/reviews`,
        'en': `${baseUrl}/reviews`,
        'ko': `${baseUrl}/ko/reviews`,
      },
    },
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: locale === 'en' ? `${baseUrl}/reviews` : `${baseUrl}/ko/reviews`,
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

// Client reviews data
const reviews = [
  {
    id: 1,
    author: 'James K.',
    business: 'Restaurant Owner',
    location: 'Fort Lee, NJ',
    rating: 5,
    date: '2024-11-15',
    title: {
      en: 'Outstanding SEO Results',
      ko: '뛰어난 SEO 결과'
    },
    content: {
      en: 'ZOE LUMOS helped our restaurant rank #1 for "Korean BBQ Fort Lee" within 3 months. Our reservations have increased by 200%. The team is professional and truly understands local SEO.',
      ko: 'ZOE LUMOS 덕분에 3개월 만에 "Fort Lee 한국 BBQ" 검색 1위를 달성했습니다. 예약이 200% 증가했어요. 팀이 전문적이고 로컬 SEO를 정말 잘 이해합니다.'
    }
  },
  {
    id: 2,
    author: 'Sarah L.',
    business: 'Nail Salon Owner',
    location: 'Palisades Park, NJ',
    rating: 5,
    date: '2024-10-20',
    title: {
      en: 'Best Investment for My Business',
      ko: '사업에 최고의 투자'
    },
    content: {
      en: 'I was skeptical about digital marketing, but ZOE LUMOS proved me wrong. My Google Ads campaign brings in 15-20 new clients every month. Korean-speaking support made everything so easy!',
      ko: '디지털 마케팅에 회의적이었는데, ZOE LUMOS가 증명해 보였습니다. 구글 광고 캠페인으로 매달 15-20명의 신규 고객이 옵니다. 한국어 상담이 모든 것을 쉽게 만들었어요!'
    }
  },
  {
    id: 3,
    author: 'Michael C.',
    business: 'Law Firm Partner',
    location: 'Manhattan, NY',
    rating: 5,
    date: '2024-09-08',
    title: {
      en: 'Professional Website That Converts',
      ko: '전환율 높은 전문 웹사이트'
    },
    content: {
      en: 'Our new website looks amazing and loads incredibly fast. More importantly, we\'re getting quality leads through our contact form. ZOE LUMOS delivered exactly what we needed.',
      ko: '새 웹사이트가 멋지고 매우 빠르게 로드됩니다. 더 중요한 건 문의 폼을 통해 양질의 리드를 받고 있다는 것입니다. ZOE LUMOS가 정확히 필요한 것을 제공했습니다.'
    }
  },
  {
    id: 4,
    author: 'Jenny P.',
    business: 'Boutique Shop Owner',
    location: 'Flushing, NY',
    rating: 5,
    date: '2024-08-25',
    title: {
      en: 'Shopify Store Success',
      ko: '쇼피파이 스토어 성공'
    },
    content: {
      en: 'They built my Shopify store from scratch and set up everything perfectly. Now I\'m selling products 24/7 online. The e-commerce SEO is bringing in organic traffic every day.',
      ko: '쇼피파이 스토어를 처음부터 완벽하게 구축해 주었습니다. 이제 온라인으로 24시간 제품을 판매하고 있어요. 이커머스 SEO로 매일 자연 유입이 들어옵니다.'
    }
  },
  {
    id: 5,
    author: 'David H.',
    business: 'Dental Clinic',
    location: 'Ridgewood, NJ',
    rating: 5,
    date: '2024-07-12',
    title: {
      en: 'Google Ads Expert',
      ko: '구글 광고 전문가'
    },
    content: {
      en: 'Our cost per acquisition dropped by 40% after ZOE LUMOS took over our Google Ads. They know how to target the right patients in Bergen County. Highly recommend!',
      ko: 'ZOE LUMOS가 구글 광고를 맡은 후 고객 획득 비용이 40% 줄었습니다. 버겐 카운티에서 적합한 환자를 타겟팅하는 방법을 알고 있습니다. 강력 추천!'
    }
  },
  {
    id: 6,
    author: 'Lisa M.',
    business: 'Real Estate Agent',
    location: 'Englewood, NJ',
    rating: 5,
    date: '2024-06-30',
    title: {
      en: 'Finally Found the Right Agency',
      ko: '드디어 맞는 에이전시를 찾았습니다'
    },
    content: {
      en: 'After working with 3 other agencies, I finally found ZOE LUMOS. They understand the real estate market and created a personal brand website that sets me apart from competitors.',
      ko: '다른 3개 에이전시와 일한 후, 드디어 ZOE LUMOS를 찾았습니다. 부동산 시장을 이해하고 경쟁사와 차별화되는 개인 브랜드 웹사이트를 만들어 주었습니다.'
    }
  }
]

// Generate Review Schema for SEO
function generateReviewSchema(locale: 'en' | 'ko') {
  const reviewSchemas = reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "datePublished": review.date,
    "reviewBody": review.content[locale],
    "name": review.title[locale],
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "ZOE LUMOS",
      "image": "https://zoelumos.com/favicon.svg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fort Lee",
        "addressRegion": "NJ",
        "addressCountry": "US"
      }
    }
  }))

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ZOE LUMOS",
    "image": "https://zoelumos.com/favicon.svg",
    "url": "https://zoelumos.com",
    "telephone": "+1-201-555-0123",
    "email": "info@zoelumos.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fort Lee",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviewSchemas
  }
}

const content = {
  en: {
    title: 'Client Reviews',
    subtitle: 'What Our Clients Say About Us',
    description: 'Real testimonials from real businesses we\'ve helped grow online.',
    stats: {
      rating: '5.0',
      reviews: `${reviews.length}+ Reviews`,
      satisfaction: '100% Satisfaction'
    },
    cta: {
      title: 'Ready to Join Our Success Stories?',
      subtitle: 'Let us help your business grow online',
      button: 'Get Free Consultation'
    }
  },
  ko: {
    title: '고객 후기',
    subtitle: '고객들이 말하는 ZOE LUMOS',
    description: '온라인 성장을 도운 실제 비즈니스들의 진솔한 후기입니다.',
    stats: {
      rating: '5.0',
      reviews: `${reviews.length}+ 리뷰`,
      satisfaction: '100% 만족'
    },
    cta: {
      title: '성공 스토리에 함께하시겠습니까?',
      subtitle: '온라인에서 비즈니스 성장을 도와드립니다',
      button: '무료 상담 받기'
    }
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = content[locale]
  const prefix = locale === 'ko' ? '/ko' : ''

  return (
    <>
      <HeaderWrapper locale={locale} />

      {/* Review Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateReviewSchema(locale)),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16">
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-xl text-gray-600 mb-2">{t.subtitle}</p>
            <p className="text-gray-500">{t.description}</p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">{t.stats.rating}</span>
                  <StarRating rating={5} />
                </div>
                <p className="text-sm text-gray-500 mt-1">{t.stats.reviews}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{t.stats.satisfaction}</p>
                <p className="text-sm text-gray-500 mt-1">{locale === 'ko' ? '고객 만족률' : 'Client Satisfaction'}</p>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-500">{review.business}</p>
                    <p className="text-xs text-gray-400">{review.location}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{review.title[locale]}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{review.content[locale]}</p>
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(review.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-black rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-gray-300 mb-8">{t.cta.subtitle}</p>
            <Link
              href={`${prefix}#contact`}
              className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
            >
              {t.cta.button}
            </Link>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
