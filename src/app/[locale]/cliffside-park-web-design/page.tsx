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
      description: '클리프사이드파크(Cliffside Park) 웹사이트 제작 전문. 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 한인 마케팅. 버겐카운티 현지 에이전시. 100% 한국어 상담.',
      keywords: '클리프사이드파크 웹사이트, Cliffside Park 웹디자인, 클리프사이드파크 한인 비즈니스, 클리프사이드파크 SEO, 버겐카운티 웹사이트, 한인 마케팅 에이전시, 뉴저지 웹사이트 제작',
      openGraph: {
        title: '클리프사이드파크 웹사이트 제작 - ZOE LUMOS',
        description: '클리프사이드파크 한인 비즈니스를 위한 웹사이트 제작 서비스.',
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
    description: 'Cliffside Park, NJ web design & digital marketing. Korean-American business website specialists in Bergen County. Local SEO, Google Ads, bilingual websites. Free consultation.',
    keywords: 'Cliffside Park web design, Cliffside Park NJ website, Korean business Cliffside Park, Bergen County web design, small business SEO NJ, Cliffside Park digital marketing, Korean American website NJ',
    openGraph: {
      title: 'Cliffside Park Web Design - ZOE LUMOS',
      description: 'Web design agency in Cliffside Park, NJ. Korean-American business specialists.',
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
    description: locale === 'ko' ? '클리프사이드파크 한인 비즈니스를 위한 웹사이트 제작 에이전시' : 'Web design agency for Korean-American businesses in Cliffside Park, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}cliffside-park-web-design`,
    email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Cliffside Park', addressRegion: 'NJ', postalCode: '07010', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: '40.8212', longitude: '-73.9882' },
    areaServed: [
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Edgewater' },
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
      { '@type': 'Question', name: '클리프사이드파크에서 웹사이트 제작 비용은?', acceptedAnswer: { '@type': 'Answer', text: '클리프사이드파크 웹사이트 제작은 $1,000부터 시작합니다. 무료 상담 후 정확한 견적을 드립니다.' } },
      { '@type': 'Question', name: '클리프사이드파크 한인 비즈니스 전문 서비스가 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 클리프사이드파크와 주변 포트리, 팰팍 한인 비즈니스를 위한 이중언어 웹사이트, 한국어 SEO, 구글 광고 서비스를 제공합니다.' } },
    ] : [
      { '@type': 'Question', name: 'How much does web design cost in Cliffside Park?', acceptedAnswer: { '@type': 'Answer', text: 'Cliffside Park web design starts at $1,000. Free consultation to get an exact quote.' } },
      { '@type': 'Question', name: 'Do you specialize in Korean businesses in Cliffside Park?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we specialize in Korean-American businesses throughout Bergen County including Cliffside Park, Fort Lee, and Palisades Park. Bilingual websites, Korean SEO, and Google Ads.' } },
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {locale === 'ko' ? (
                <>클리프사이드파크 <span className="text-purple-600">웹사이트 제작</span></>
              ) : (
                <>Cliffside Park <span className="text-purple-600">Web Design</span></>
              )}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {locale === 'ko'
                ? '클리프사이드파크와 버겐카운티 한인 비즈니스를 위한 전문 웹사이트 제작. 이중언어 디자인, 구글 SEO, 온라인 마케팅.'
                : 'Professional web design for Korean-American businesses in Cliffside Park and Bergen County. Bilingual websites, local SEO, and digital marketing.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}#contact`} className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                {locale === 'ko' ? '무료 상담 받기' : 'Get Free Consultation'}
              </Link>
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}portfolio`} className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                {locale === 'ko' ? '포트폴리오 보기' : 'View Portfolio'}
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {locale === 'ko' ? '클리프사이드파크 비즈니스를 위한 서비스' : 'Services for Cliffside Park Businesses'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Globe, title: locale === 'ko' ? '웹사이트 제작' : 'Website Design', desc: locale === 'ko' ? '한국어·영어 이중언어 반응형 웹사이트' : 'Bilingual Korean-English responsive websites' },
                { icon: Search, title: locale === 'ko' ? '로컬 SEO' : 'Local SEO', desc: locale === 'ko' ? '클리프사이드파크 구글 검색 상위 노출' : 'Rank higher on Google in Cliffside Park' },
                { icon: Star, title: locale === 'ko' ? '구글 광고' : 'Google Ads', desc: locale === 'ko' ? '한인 타겟 구글 광고 캠페인 관리' : 'Korean-targeted Google Ads campaigns' },
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                  <s.icon className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local context */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {locale === 'ko' ? '클리프사이드파크 한인 비즈니스 전문' : 'Cliffside Park Korean Business Specialists'}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {locale === 'ko'
                ? 'ZOE LUMOS는 클리프사이드파크와 인접한 포트리, 팰리세이즈파크, 에지워터의 한인 비즈니스를 위한 디지털 마케팅 전문 에이전시입니다. 버겐카운티 한인 커뮤니티를 깊이 이해하고, 한국어와 영어 두 언어로 고객을 연결합니다.'
                : 'ZOE LUMOS is the digital marketing agency trusted by Korean-American businesses throughout Cliffside Park, Fort Lee, Palisades Park, and Edgewater. We understand Bergen County\'s Korean community deeply and connect your business to customers in both Korean and English.'}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {locale === 'ko'
                ? '클리프사이드파크는 점점 성장하는 한인 커뮤니티를 보유한 지역입니다. 한인 식당, 미용실, 네일샵, 부동산, 의료 클리닉 등 모든 업종의 비즈니스가 전문적인 온라인 존재감을 필요로 합니다. 저희는 $1,000부터 시작하는 이중언어 웹사이트 패키지를 제공합니다.'
                : 'Cliffside Park is home to a growing Korean-American community alongside Fort Lee and Palisades Park. From Korean restaurants and nail salons to beauty supply stores and medical clinics, every business needs a professional online presence. We offer bilingual website packages starting at $1,000.'}
            </p>
            <div className="flex flex-wrap gap-3">
              {['Fort Lee', 'Palisades Park', 'Edgewater', 'North Bergen', 'Englewood', 'Ridgefield'].map(city => (
                <span key={city} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">{city}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'ko' ? '클리프사이드파크 비즈니스, 지금 시작하세요' : 'Start Growing Your Cliffside Park Business Today'}
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              {locale === 'ko' ? '무료 상담으로 맞춤 견적을 받아보세요.' : 'Get a free consultation and custom quote.'}
            </p>
            <Link href={`/${locale === 'ko' ? 'ko/' : ''}#contact`} className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-block">
              {locale === 'ko' ? '무료 상담 신청' : 'Book Free Consultation'}
            </Link>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
