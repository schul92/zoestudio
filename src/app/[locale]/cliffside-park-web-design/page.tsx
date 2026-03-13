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
      title: '클리프사이드파크 웹사이트 제작 | Cliffside Park 한인 웹디자인 | ZOE LUMOS',
      description: '클리프사이드파크(Cliffside Park) 웹사이트 제작 전문. 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 로컬 마케팅. 포트리·팰팍 인접. 100% 한국어 상담.',
      keywords: '클리프사이드파크 웹사이트, Cliffside Park 웹디자인, 클리프사이드파크 한인, 버겐카운티 웹사이트, 한인 마케팅, 뉴저지 웹사이트 제작, 클리프사이드파크 SEO',
      openGraph: {
        title: '클리프사이드파크 웹사이트 제작 - ZOE LUMOS',
        description: '클리프사이드파크 한인 비즈니스를 위한 웹사이트 제작 서비스.',
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
    description: 'Cliffside Park, NJ web design & digital marketing for Korean-American businesses. Custom websites, local SEO, Google Ads. Adjacent to Fort Lee & Palisades Park. Free consultation.',
    keywords: 'Cliffside Park web design, Cliffside Park NJ website, Korean business Cliffside Park, Bergen County web design, small business SEO NJ, Cliffside Park digital marketing',
    openGraph: {
      title: 'Cliffside Park Web Design - ZOE LUMOS',
      description: 'Web design agency for Korean-American businesses in Cliffside Park, NJ.',
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebDesignAgency',
    name: locale === 'ko' ? 'ZOE LUMOS - 클리프사이드파크 웹디자인' : 'ZOE LUMOS - Cliffside Park Web Design',
    description: locale === 'ko' ? '클리프사이드파크 한인 비즈니스를 위한 웹사이트 제작 에이전시' : 'Web design agency for Korean-American businesses in Cliffside Park, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}cliffside-park-web-design`,
    email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Cliffside Park', addressRegion: 'NJ', postalCode: '07010', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: '40.8215', longitude: '-73.9876' },
    areaServed: [
      { '@type': 'City', name: 'Cliffside Park' }, { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' }, { '@type': 'City', name: 'Edgewater' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
    ],
    priceRange: '$$', openingHours: 'Mo-Fr 09:00-18:00',
    knowsLanguage: ['English', 'Korean'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      { '@type': 'Question', name: '클리프사이드파크에서 웹사이트 제작 비용은?', acceptedAnswer: { '@type': 'Answer', text: '클리프사이드파크 웹사이트 제작은 $1,000부터 시작합니다. 무료 상담 후 정확한 견적을 드립니다.' } },
      { '@type': 'Question', name: '클리프사이드파크 한인 비즈니스 전문인가요?', acceptedAnswer: { '@type': 'Answer', text: '네, 클리프사이드파크와 인접 포트리, 팰팍, 에지워터 한인 비즈니스를 위한 이중언어 웹사이트, 한국어 SEO를 제공합니다.' } },
    ] : [
      { '@type': 'Question', name: 'How much does a website cost in Cliffside Park?', acceptedAnswer: { '@type': 'Answer', text: 'Website design starts from $1,000. We offer free consultations to provide accurate quotes for Cliffside Park businesses.' } },
      { '@type': 'Question', name: 'Do you specialize in Korean businesses?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! We serve Korean-American businesses throughout Cliffside Park, Fort Lee, Palisades Park, and Bergen County with bilingual websites and Korean SEO.' } },
    ],
  }

  return (
    <div className="relative">
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen relative overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#111111] pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">
                {locale === 'ko' ? '클리프사이드파크, NJ' : 'Cliffside Park, NJ'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {locale === 'ko' ? (
                <>클리프사이드파크<br /><span className="text-blue-400">웹사이트 제작</span> 전문</>
              ) : (
                <>Cliffside Park<br /><span className="text-blue-400">Web Design</span> Agency</>
              )}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {locale === 'ko'
                ? '클리프사이드파크 한인 비즈니스를 위한 맞춤형 웹사이트 제작. 포트리·팰팍 인접 지역. 이중언어 SEO 전문.'
                : 'Custom web design for Korean-American businesses in Cliffside Park. Adjacent to Fort Lee & Palisades Park. Bilingual SEO specialists.'}
            </p>
            <Link href={`/${locale === 'ko' ? 'ko/' : ''}#contact`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              {locale === 'ko' ? '무료 상담 받기' : 'Get Free Consultation'}
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              {locale === 'ko' ? '클리프사이드파크 비즈니스를 위한 서비스' : 'Services for Cliffside Park Businesses'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Globe, title: locale === 'ko' ? '웹사이트 제작' : 'Website Design', desc: locale === 'ko' ? '반응형 이중언어 웹사이트. 모바일 최적화.' : 'Responsive bilingual websites. Mobile-optimized.' },
                { icon: Search, title: locale === 'ko' ? '로컬 SEO' : 'Local SEO', desc: locale === 'ko' ? '클리프사이드파크 & 버겐카운티 검색 최적화.' : 'Cliffside Park & Bergen County search optimization.' },
                { icon: Zap, title: locale === 'ko' ? '구글 광고' : 'Google Ads', desc: locale === 'ko' ? '클리프사이드파크 타겟 광고 캠페인.' : 'Targeted ad campaigns for Cliffside Park area.' },
              ].map((svc, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
                  <svc.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{svc.title}</h3>
                  <p className="text-gray-400">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why ZOE LUMOS */}
        <section className="py-20 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              {locale === 'ko' ? '왜 ZOE LUMOS인가요?' : 'Why Choose ZOE LUMOS?'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Users, text: locale === 'ko' ? '한인 비즈니스 전문 — 한국어/영어 이중언어' : 'Korean business specialists — bilingual Korean/English' },
                { icon: MapPin, text: locale === 'ko' ? '클리프사이드파크, 포트리, 팰팍 지역 전문' : 'Local experts in Cliffside Park, Fort Lee, Palisades Park' },
                { icon: Star, text: locale === 'ko' ? '89+ 5성 리뷰 — 검증된 실력' : '89+ five-star reviews — proven results' },
                { icon: Zap, text: locale === 'ko' ? '빠른 제작 — 2주 내 런칭' : 'Fast turnaround — launch within 2 weeks' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#1a1a1a] rounded-lg p-5">
                  <item.icon className="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 bg-[#111111]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">
              {locale === 'ko' ? '인근 지역 서비스' : 'Also Serving Nearby Areas'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: locale === 'ko' ? '포트리' : 'Fort Lee', href: `/${locale === 'ko' ? 'ko/' : ''}fort-lee-web-design` },
                { name: locale === 'ko' ? '팰팍' : 'Palisades Park', href: `/${locale === 'ko' ? 'ko/' : ''}palisades-park-marketing` },
                { name: locale === 'ko' ? '에지워터' : 'Edgewater', href: `/${locale === 'ko' ? 'ko/' : ''}edgewater-web-design` },
                { name: locale === 'ko' ? '리지필드' : 'Ridgefield', href: `/${locale === 'ko' ? 'ko/' : ''}ridgefield-web-design` },
                { name: locale === 'ko' ? '노스버겐' : 'North Bergen', href: `/${locale === 'ko' ? 'ko/' : ''}north-bergen-web-design` },
                { name: locale === 'ko' ? '잉글우드' : 'Englewood', href: `/${locale === 'ko' ? 'ko/' : ''}englewood-nj-seo` },
              ].map((area, i) => (
                <Link key={i} href={area.href}
                  className="bg-[#1a1a1a] border border-gray-700 hover:border-blue-500/50 text-gray-300 hover:text-white px-5 py-2.5 rounded-full transition-colors text-sm">
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
