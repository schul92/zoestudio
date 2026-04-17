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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  if (locale === 'ko') {
    return {
      title: '클리프사이드파크 웹사이트 제작 | 한인 비즈니스 웹디자인 NJ | ZOE LUMOS',
      description: '클리프사이드파크(Cliffside Park) 웹사이트 제작 전문. 한인 비즈니스 홈페이지 디자인, 로컬 SEO, 구글광고, 소셜미디어 마케팅. 버겐카운티 한인 전문 에이전시. 100% 한국어 상담.',
      keywords: '클리프사이드파크 웹사이트 제작, Cliffside Park 웹디자인, 클리프사이드파크 한인 비즈니스, 클리프사이드파크 SEO, 버겐카운티 한인 마케팅, 한인 웹사이트 제작 NJ, 뉴저지 한인 웹에이전시',
      openGraph: {
        title: '클리프사이드파크 웹사이트 제작 - ZOE LUMOS',
        description: '클리프사이드파크 한인 비즈니스를 위한 전문 웹사이트 제작 & 디지털 마케팅.',
        url: `${baseUrl}/ko/cliffside-park-web-design`, siteName: 'ZOE LUMOS', locale: 'ko_KR', alternateLocale: 'en_US', type: 'website',
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
    description: 'Cliffside Park, NJ web design & digital marketing for Korean-American small businesses. Local SEO, bilingual websites, Google Ads. Serving Cliffside Park, Fort Lee, Edgewater & Bergen County. Free consultation.',
    keywords: 'Cliffside Park web design, Cliffside Park NJ website, Korean business Cliffside Park, Bergen County web design, small business SEO NJ, Cliffside Park digital marketing, Korean American web agency NJ',
    openGraph: {
      title: 'Cliffside Park Web Design - ZOE LUMOS',
      description: 'Web design & SEO for Korean-American businesses in Cliffside Park, NJ.',
      url: `${baseUrl}/cliffside-park-web-design`, siteName: 'ZOE LUMOS', locale: 'en_US', alternateLocale: 'ko_KR', type: 'website',
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
    description: locale === 'ko' ? '클리프사이드파크 한인 비즈니스를 위한 웹사이트 제작 에이전시' : 'Web design agency for Korean-American businesses in Cliffside Park, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}cliffside-park-web-design`,
    email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Cliffside Park', addressRegion: 'NJ', postalCode: '07010', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: '40.8218', longitude: '-73.9857' },
    areaServed: [
      { '@type': 'City', name: 'Cliffside Park' }, { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Edgewater' }, { '@type': 'City', name: 'Palisades Park' },
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
      { '@type': 'Question', name: '클리프사이드파크 웹사이트 제작 비용은 얼마인가요?', acceptedAnswer: { '@type': 'Answer', text: '클리프사이드파크 웹사이트 제작은 소규모 비즈니스 기준 $1,000부터 시작합니다. 무료 상담 후 정확한 견적을 드립니다.' } },
      { '@type': 'Question', name: '클리프사이드파크 한인 비즈니스 전문인가요?', acceptedAnswer: { '@type': 'Answer', text: '네, ZOE LUMOS는 클리프사이드파크를 포함한 버겐카운티 전역 한인 비즈니스 전문 에이전시입니다. 포트리, 팰팍, 에지워터 등 인근 지역도 서비스합니다.' } },
    ] : [
      { '@type': 'Question', name: 'How much does web design cost in Cliffside Park, NJ?', acceptedAnswer: { '@type': 'Answer', text: 'Web design in Cliffside Park starts at $1,000 for small businesses. Contact us for a free consultation and exact quote.' } },
      { '@type': 'Question', name: 'Do you specialize in Korean-American businesses in Cliffside Park?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! ZOE LUMOS specializes in bilingual Korean-English websites and SEO for Korean-American businesses throughout Bergen County, including Cliffside Park, Fort Lee, Palisades Park, and Edgewater.' } },
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">{locale === 'ko' ? '클리프사이드파크, NJ 현지 에이전시' : 'Local Cliffside Park, NJ Agency'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko'
                ? <>클리프사이드파크<br /><span className="text-purple-600">웹사이트 제작 전문</span></>
                : <>Cliffside Park<br /><span className="text-purple-600">Web Design Experts</span></>}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '클리프사이드파크, 포트리, 에지워터 한인 비즈니스를 위한 전문 웹사이트 제작 & 디지털 마케팅. 이중언어 웹사이트, 구글 SEO, Google My Business 최적화.'
                : 'Expert web design & digital marketing for Korean-American businesses in Cliffside Park, Fort Lee & Bergen County. Bilingual websites, Google SEO, GMB optimization.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors">
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '📞 무료 상담' : '📞 Free Consultation'}
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span>{locale === 'ko' ? '5.0 평점 (89개 리뷰)' : '5.0 Rating (89 Reviews)'}</span></div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-purple-500" /><span>{locale === 'ko' ? '버겐카운티 한인 비즈니스 50+' : '50+ Bergen County Korean Businesses'}</span></div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-green-500" /><span>{locale === 'ko' ? '2주 내 완성' : 'Ready in 2 Weeks'}</span></div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '클리프사이드파크 비즈니스 맞춤 서비스' : 'Services for Cliffside Park Businesses'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Globe className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Sites'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '클리프사이드파크 한인 고객과 미국 고객 모두를 위한 이중언어 웹사이트. 자동 언어 전환, 한국어 SEO 포함.' : 'Websites for both Korean and American customers in Cliffside Park. Auto language switching, Korean SEO included.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '클리프사이드파크 로컬 SEO' : 'Cliffside Park Local SEO'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '"클리프사이드파크 [업종]" 구글 검색 1페이지 노출. Google My Business 최적화, 로컬 키워드 타겟팅.' : 'Rank page 1 for "Cliffside Park [your business]" on Google. GMB optimization & local keyword targeting.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <MapPin className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '버겐카운티 한인 마케팅' : 'Bergen County Korean Marketing'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '클리프사이드파크, 포트리, 팰팍 한인 커뮤니티 타겟 마케팅. 구글 광고, 소셜미디어, 한인 미디어 광고.' : 'Targeted marketing for Cliffside Park, Fort Lee & Palisades Park Korean communities. Google Ads, social media, Korean media.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{locale === 'ko' ? '클리프사이드파크 & 주변 지역 서비스' : 'Serving Cliffside Park & Surrounding Areas'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: 'Cliffside Park', ko: '클리프사이드파크', zip: '07010', highlight: true },
                { en: 'Fort Lee', ko: '포트리', zip: '07024', highlight: true },
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: false },
                { en: 'Palisades Park', ko: '팰리세이즈파크', zip: '07650', highlight: false },
                { en: 'North Bergen', ko: '노스버겐', zip: '07047', highlight: false },
                { en: 'Fairview', ko: '페어뷰', zip: '07022', highlight: false },
                { en: 'Ridgefield', ko: '리지필드', zip: '07657', highlight: false },
                { en: 'Englewood', ko: '잉글우드', zip: '07631', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
                  <p className="font-bold text-gray-900">{locale === 'ko' ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'ko' ? '클리프사이드파크 비즈니스를 온라인에서 성장시키세요' : 'Grow Your Cliffside Park Business Online'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko' ? '오늘 무료 상담을 예약하세요. 버겐카운티 한인 비즈니스 전문 에이전시.' : 'Book your free consultation today. Bergen County\'s Korean-American business specialists.'}
            </p>
            <Link href="#contact" className="inline-block px-10 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              {locale === 'ko' ? '무료 상담 예약 →' : 'Book Free Consultation →'}
            </Link>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
