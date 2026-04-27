import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  if (locale === 'ko') {
    return {
      title: '클리프사이드파크 웹사이트 제작 | Cliffside Park 한인 웹디자인 | ZOE LUMOS',
      description: '클리프사이드파크(Cliffside Park) 웹사이트 제작 전문. 한인 비즈니스 홈페이지 제작, 구글 SEO, 디지털 마케팅. 버겐카운티 현지 에이전시. 100% 한국어 상담.',
      keywords: '클리프사이드파크 웹사이트, Cliffside Park 웹디자인, 클리프사이드파크 한인 비즈니스, 클리프사이드파크 SEO, 버겐카운티 웹사이트, 한인 마케팅 에이전시, 뉴저지 웹사이트 제작, 포트리 웹사이트, 팰팍 웹사이트',
      openGraph: {
        title: '클리프사이드파크 웹사이트 제작 - ZOE LUMOS',
        description: '클리프사이드파크 한인 비즈니스를 위한 전문 웹사이트 제작 & 디지털 마케팅.',
        url: `${baseUrl}/ko/cliffside-park-web-design`,
        siteName: 'ZOE LUMOS', locale: 'ko_KR', alternateLocale: 'en_US', type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/cliffside-park-web-design`,
        languages: { 'x-default': `${baseUrl}/cliffside-park-web-design`, 'en': `${baseUrl}/cliffside-park-web-design`, 'ko': `${baseUrl}/ko/cliffside-park-web-design` },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Cliffside Park Web Design | Korean Business Website NJ | ZOE LUMOS',
    description: 'Cliffside Park, NJ web design & digital marketing. Korean-American business website specialists in Bergen County. Local SEO, Google Ads, bilingual Korean-English websites. Free consultation.',
    keywords: 'Cliffside Park web design, Cliffside Park NJ website, Korean business Cliffside Park, Bergen County web design, small business SEO NJ, Cliffside Park digital marketing, Korean American web design NJ, Fort Lee web design, Palisades Park web design',
    openGraph: {
      title: 'Cliffside Park Web Design - ZOE LUMOS',
      description: 'Web design & SEO agency in Cliffside Park, NJ. Korean-American business specialists.',
      url: `${baseUrl}/cliffside-park-web-design`,
      siteName: 'ZOE LUMOS', locale: 'en_US', alternateLocale: 'ko_KR', type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/cliffside-park-web-design`,
      languages: { 'x-default': `${baseUrl}/cliffside-park-web-design`, 'en': `${baseUrl}/cliffside-park-web-design`, 'ko': `${baseUrl}/ko/cliffside-park-web-design` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function CliffsideParkWebDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: locale === 'ko' ? 'ZOE LUMOS - 클리프사이드파크 웹디자인' : 'ZOE LUMOS - Cliffside Park Web Design',
    description: locale === 'ko'
      ? '클리프사이드파크 한인 비즈니스를 위한 웹사이트 제작 에이전시'
      : 'Web design agency for Korean-American businesses in Cliffside Park, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}cliffside-park-web-design`,
    email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Cliffside Park', addressRegion: 'NJ', postalCode: '07010', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: '40.8218', longitude: '-73.9871' },
    areaServed: [
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Edgewater' },
      { '@type': 'City', name: 'North Bergen' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
    ],
    priceRange: '$$', openingHours: 'Mo-Fr 09:00-18:00',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '6' },
    knowsLanguage: ['English', 'Korean'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      {
        '@type': 'Question',
        name: '클리프사이드파크 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: { '@type': 'Answer', text: '클리프사이드파크 웹사이트 제작은 $1,000부터 시작합니다. 비즈니스 규모와 필요 기능에 따라 맞춤 견적을 드립니다. 무료 상담 신청 후 정확한 견적을 받아보세요.' }
      },
      {
        '@type': 'Question',
        name: '한국어로 상담이 가능한가요?',
        acceptedAnswer: { '@type': 'Answer', text: '네, 100% 한국어 상담이 가능합니다. 클리프사이드파크, 포트리, 팰팍 지역 한인 비즈니스 오너분들과 한국어로 편하게 소통합니다.' }
      },
      {
        '@type': 'Question',
        name: '클리프사이드파크 한인 비즈니스 SEO도 해주나요?',
        acceptedAnswer: { '@type': 'Answer', text: '네, 클리프사이드파크 지역 구글 로컬 SEO와 한영 이중언어 검색 최적화를 제공합니다. 한인 커뮤니티와 영어권 고객 모두를 타겟으로 합니다.' }
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How much does web design cost in Cliffside Park NJ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Cliffside Park web design packages start at $1,000. We offer custom quotes based on your business needs. Contact us for a free consultation.' }
      },
      {
        '@type': 'Question',
        name: 'Do you serve Korean-American businesses in Cliffside Park?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! We specialize in bilingual Korean-English websites for Korean-American businesses in Cliffside Park, Fort Lee, Palisades Park, and throughout Bergen County.' }
      },
      {
        '@type': 'Question',
        name: 'What digital marketing services do you offer in Cliffside Park?',
        acceptedAnswer: { '@type': 'Answer', text: 'We offer web design, local SEO, Google Ads management, social media marketing, and Shopify e-commerce development for Cliffside Park businesses. All services available in Korean and English.' }
      },
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">{locale === 'ko' ? '클리프사이드파크, NJ 현지 에이전시' : 'Local Cliffside Park, NJ Agency'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko'
                ? <>클리프사이드파크 웹사이트 제작<br /><span className="text-blue-600">한인 비즈니스 전문</span></>
                : <>Cliffside Park Web Design<br /><span className="text-blue-600">Korean Business Experts</span></>}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '클리프사이드파크, 포트리, 팰리세이즈파크 한인 비즈니스를 위한 전문 웹사이트 제작 & 디지털 마케팅. 한영 이중언어, 구글 SEO.'
                : 'Expert web design & digital marketing for Korean-American businesses in Cliffside Park, Fort Lee & Bergen County. Bilingual sites, local Google SEO.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '📞 무료 상담' : '📞 Free Consultation'}
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{locale === 'ko' ? '5.0 평점 (89개 리뷰)' : '5.0 Rating (89 Reviews)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>{locale === 'ko' ? '100+ 한인 클라이언트' : '100+ Korean-American Clients'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-500" />
                <span>{locale === 'ko' ? '한영 이중언어' : 'Korean & English'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900">
              {locale === 'ko' ? '클리프사이드파크 비즈니스를 위한 서비스' : 'Services for Cliffside Park Businesses'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: locale === 'ko' ? '웹사이트 제작' : 'Website Design',
                  desc: locale === 'ko'
                    ? '한인 비즈니스에 최적화된 전문 웹사이트. 모바일 최적화, 빠른 로딩, 한영 이중언어.'
                    : 'Professional websites optimized for Korean-American businesses. Mobile-ready, fast, bilingual.',
                },
                {
                  icon: <Search className="w-8 h-8" />,
                  title: locale === 'ko' ? '구글 SEO' : 'Local SEO',
                  desc: locale === 'ko'
                    ? '클리프사이드파크 지역 구글 검색 1위 목표. 한영 이중언어 검색 최적화.'
                    : 'Rank #1 on Google for Cliffside Park searches. English & Korean keyword optimization.',
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: locale === 'ko' ? '구글 광고' : 'Google Ads',
                  desc: locale === 'ko'
                    ? '클리프사이드파크, 포트리, 팰팍 지역 타겟 구글 광고. ROI 극대화.'
                    : 'Targeted Google Ads for Cliffside Park, Fort Lee & Palisades Park. Maximize ROI.',
                },
              ].map((s, i) => (
                <div key={i} className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-4">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local SEO Content */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-8 text-gray-900">
              {locale === 'ko'
                ? '클리프사이드파크 한인 비즈니스 디지털 마케팅 전문'
                : 'Cliffside Park Korean Business Digital Marketing Experts'}
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              {locale === 'ko' ? (
                <>
                  <p>클리프사이드파크(Cliffside Park)는 버겐카운티에 위치한 한인 커뮤니티로, 포트리, 팰팍과 인접한 주요 지역입니다. ZOE LUMOS는 클리프사이드파크 한인 비즈니스 오너들을 위한 전문 웹사이트 제작 및 디지털 마케팅 서비스를 제공합니다.</p>
                  <p>레스토랑, 뷰티살롱, 네일샵, 부동산, 법률, 의료 등 다양한 업종의 클리프사이드파크 한인 비즈니스가 ZOE LUMOS와 함께 온라인 존재감을 강화하고 있습니다. 한국어와 영어 모두 능통한 저희 팀이 비즈니스 성장을 도와드립니다.</p>
                  <p>구글 지역 SEO, 구글 광고(Google Ads), 소셜 미디어 마케팅, 쇼핑몰 제작까지 — 클리프사이드파크에서 필요한 모든 디지털 마케팅 서비스를 원스톱으로 제공합니다.</p>
                </>
              ) : (
                <>
                  <p>Cliffside Park, NJ is home to a growing Korean-American business community, located near Fort Lee and Palisades Park in Bergen County. ZOE LUMOS provides professional web design and digital marketing services tailored for Cliffside Park&apos;s Korean-American business owners.</p>
                  <p>From restaurants and beauty salons to nail shops, real estate, legal, and medical practices — Korean-owned businesses in Cliffside Park trust ZOE LUMOS to build their online presence. Our bilingual team understands both the Korean community and the broader Bergen County market.</p>
                  <p>Local Google SEO, Google Ads, social media marketing, and e-commerce development — we offer all the digital marketing services Cliffside Park businesses need, all in one place.</p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              {locale === 'ko' ? '주변 지역 서비스' : 'We Also Serve Nearby Areas'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: 'fort-lee-web-design', label: locale === 'ko' ? '포트리' : 'Fort Lee' },
                { href: 'palisades-park-marketing', label: locale === 'ko' ? '팰리세이즈파크' : 'Palisades Park' },
                { href: 'edgewater-web-design', label: locale === 'ko' ? '에지워터' : 'Edgewater' },
                { href: 'englewood-nj-seo', label: locale === 'ko' ? '잉글우드' : 'Englewood' },
                { href: 'ridgefield-web-design', label: locale === 'ko' ? '리지필드' : 'Ridgefield' },
                { href: 'north-bergen-web-design', label: locale === 'ko' ? '노스버겐' : 'North Bergen' },
              ].map((area) => (
                <Link
                  key={area.href}
                  href={`/${locale === 'ko' ? 'ko/' : ''}${area.href}`}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
