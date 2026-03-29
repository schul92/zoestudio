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
      title: '해켄색 웹사이트 제작 | Hackensack 한인 웹디자인 전문 | ZOE LUMOS',
      description: '해켄색(Hackensack) 웹사이트 제작 전문. 버겐카운티 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 한인 마케팅 에이전시. 100% 한국어 상담.',
      keywords: '해켄색 웹사이트, Hackensack 웹디자인, 해켄색 한인 비즈니스, 해켄색 SEO, 버겐카운티 웹사이트 제작, 한인 마케팅 에이전시, 뉴저지 웹사이트 제작, 해켄색 홈페이지 제작',
      openGraph: {
        title: '해켄색 웹사이트 제작 - ZOE LUMOS',
        description: '해켄색 한인 비즈니스를 위한 웹사이트 제작 & 디지털 마케팅 서비스.',
        url: `${baseUrl}/ko/hackensack-web-design`,
        siteName: 'ZOE LUMOS', locale: 'ko_KR', alternateLocale: 'en_US', type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/hackensack-web-design`,
        languages: { 'x-default': `${baseUrl}/hackensack-web-design`, 'en': `${baseUrl}/hackensack-web-design`, 'ko': `${baseUrl}/ko/hackensack-web-design` },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Hackensack Web Design | Bergen County Korean Business Website | ZOE LUMOS',
    description: 'Hackensack, NJ web design & SEO agency. Korean-American business website specialists in Bergen County. Local SEO, Google Ads, bilingual Korean-English websites. Free consultation.',
    keywords: 'Hackensack web design, Hackensack NJ website, Bergen County web design, Korean business Hackensack, Hackensack SEO, Hackensack digital marketing, Korean American web design NJ, small business website Hackensack, Bergen County SEO agency',
    openGraph: {
      title: 'Hackensack Web Design & SEO - ZOE LUMOS',
      description: 'Bergen County web design agency in Hackensack, NJ. Korean-American business website specialists.',
      url: `${baseUrl}/hackensack-web-design`,
      siteName: 'ZOE LUMOS', locale: 'en_US', alternateLocale: 'ko_KR', type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/hackensack-web-design`,
      languages: { 'x-default': `${baseUrl}/hackensack-web-design`, 'en': `${baseUrl}/hackensack-web-design`, 'ko': `${baseUrl}/ko/hackensack-web-design` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function HackensackWebDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: locale === 'ko' ? 'ZOE LUMOS - 해켄색 웹디자인' : 'ZOE LUMOS - Hackensack Web Design',
    description: locale === 'ko' ? '해켄색 한인 비즈니스를 위한 웹사이트 제작 에이전시' : 'Web design agency for Korean-American businesses in Hackensack, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}hackensack-web-design`,
    email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Hackensack', addressRegion: 'NJ', postalCode: '07601', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: '40.8859', longitude: '-74.0435' },
    areaServed: [
      { '@type': 'City', name: 'Hackensack' }, { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' }, { '@type': 'City', name: 'Englewood' },
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
      { '@type': 'Question', name: '해켄색에서 웹사이트 제작 비용은?', acceptedAnswer: { '@type': 'Answer', text: '해켄색 웹사이트 제작은 $1,000부터 시작합니다. 무료 상담 후 정확한 견적을 드립니다.' } },
      { '@type': 'Question', name: '해켄색 한인 비즈니스 전문 서비스가 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 해켄색과 버겐카운티 한인 비즈니스를 위한 이중언어 웹사이트, 한국어 SEO, 커뮤니티 마케팅 등을 제공합니다.' } },
    ] : [
      { '@type': 'Question', name: 'How much does web design cost in Hackensack?', acceptedAnswer: { '@type': 'Answer', text: 'Hackensack web design starts at $1,000. Free consultation to get an exact quote.' } },
      { '@type': 'Question', name: 'Do you specialize in Korean businesses in Bergen County?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we specialize in Korean-American businesses throughout Bergen County including Hackensack, Fort Lee, and Palisades Park. Bilingual websites, Korean SEO, and community marketing.' } },
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
              <span className="font-semibold">{locale === 'ko' ? '해켄색, NJ — 버겐카운티 중심' : 'Hackensack, NJ — Bergen County Hub'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko'
                ? <>해켄색 웹사이트 제작<br /><span className="text-blue-600">버겐카운티 한인 비즈니스 전문</span></>
                : <>Hackensack Web Design<br /><span className="text-blue-600">Bergen County Experts</span></>}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '해켄색, 포트리, 팰팍 한인 비즈니스를 위한 전문 웹사이트 제작 & 디지털 마케팅. 한영 이중언어, 구글 SEO.'
                : 'Expert web design & digital marketing for Korean-American businesses in Hackensack & Bergen County. Bilingual sites, local SEO, Google Ads.'}
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
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span>{locale === 'ko' ? '5.0 평점 (89개 리뷰)' : '5.0 Rating (89 Reviews)'}</span></div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-500" /><span>{locale === 'ko' ? '버겐카운티 한인 비즈니스 50+' : '50+ Bergen County Korean Businesses'}</span></div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-green-500" /><span>{locale === 'ko' ? '2주 내 완성' : 'Ready in 2 Weeks'}</span></div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '해켄색 비즈니스 맞춤 서비스' : 'Services for Hackensack Businesses'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Globe className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Sites'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '해켄색 한인 고객과 미국 고객 모두를 위한 이중언어 웹사이트. 자동 언어 전환, 한국어 SEO 포함.' : 'Websites optimized for both Korean and American customers in Hackensack. Auto language switching, Korean SEO included.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Search className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '해켄색 로컬 SEO' : 'Hackensack Local SEO'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '"해켄색 [업종]" 구글 검색 1페이지 노출. Google My Business 최적화, 버겐카운티 로컬 키워드.' : 'Rank page 1 for "Hackensack [your business]" on Google. GMB optimization, Bergen County local keyword targeting.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <MapPin className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '버겐카운티 한인 마케팅' : 'Bergen County Korean Marketing'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '해켄색, 포트리, 팰팍 한인 커뮤니티 타겟 마케팅. 카카오톡 연동, 한인 미디어 광고.' : 'Targeted marketing for the Korean community across Bergen County. KakaoTalk integration, Korean media ads.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{locale === 'ko' ? '해켄색 & 버겐카운티 전역 서비스' : 'Serving Hackensack & All of Bergen County'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: 'Hackensack', ko: '해켄색', zip: '07601', highlight: true },
                { en: 'Fort Lee', ko: '포트리', zip: '07024', highlight: true },
                { en: 'Palisades Park', ko: '팰리세이즈파크', zip: '07650', highlight: false },
                { en: 'Englewood', ko: '잉글우드', zip: '07631', highlight: false },
                { en: 'Ridgefield', ko: '리지필드', zip: '07657', highlight: false },
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: false },
                { en: 'North Bergen', ko: '노스버겐', zip: '07047', highlight: false },
                { en: 'Tenafly', ko: '테너플라이', zip: '07670', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <p className="font-bold text-gray-900">{locale === 'ko' ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'ko' ? '해켄색 비즈니스를 온라인에서 성장시키세요' : 'Grow Your Hackensack Business Online'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko' ? '오늘 무료 상담을 예약하세요. 전문 웹디자인으로 버겐카운티 고객을 늘리세요.' : 'Book your free consultation today. Attract more Bergen County customers with expert web design.'}
            </p>
            <Link href="#contact" className="inline-block px-10 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
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
