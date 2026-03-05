import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Building2, Globe, Search } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  if (locale === 'ko') {
    return {
      title: '캘리포니아 웹사이트 제작 전문 | LA 한인 비즈니스 웹개발 | ZOE LUMOS',
      description: '캘리포니아 웹사이트 제작 전문 업체. LA 코리아타운, 오렌지카운티, 풀러턴, 어바인 한인 비즈니스를 위한 전문 웹사이트 개발. 캘리포니아 로컬 SEO, 구글 최적화.',
      keywords: '캘리포니아 웹사이트, LA 웹사이트 제작, CA 웹개발, 코리아타운 웹사이트, 오렌지카운티 웹사이트, 풀러턴 웹사이트, 캘리포니아 SEO',
      openGraph: { title: '캘리포니아 웹사이트 제작 전문 - ZOE LUMOS', description: '캘리포니아 최고의 한인 웹사이트 제작 업체.', url: `${baseUrl}/ko/ca-website`, siteName: 'ZOE LUMOS', locale: 'ko_KR', type: 'website' },
      alternates: { canonical: `${baseUrl}/ko/ca-website`, languages: { 'x-default': `${baseUrl}/ca-website`, 'en': `${baseUrl}/ca-website`, 'ko': `${baseUrl}/ko/ca-website` } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }

  return {
    title: 'California Website Design & Development | LA Korean Web Agency | ZOE LUMOS',
    description: 'Professional website development in California. Web design for LA Koreatown, Orange County, Fullerton, Irvine businesses. Local CA SEO, Google optimization, Shopify e-commerce.',
    keywords: 'California website, CA web design, LA Koreatown website, Orange County website, Fullerton website, Irvine website, CA Shopify, CA SEO',
    openGraph: { title: 'California Website Design - ZOE LUMOS', description: 'Leading web development for California Korean businesses.', url: `${baseUrl}/ca-website`, siteName: 'ZOE LUMOS', locale: 'en_US', type: 'website' },
    alternates: { canonical: `${baseUrl}/ca-website`, languages: { 'x-default': `${baseUrl}/ca-website`, 'en': `${baseUrl}/ca-website`, 'ko': `${baseUrl}/ko/ca-website` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function CAWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const ko = locale === 'ko'

  const schema = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService',
    name: 'ZOE LUMOS - California Website Design',
    description: ko ? '캘리포니아 한인 비즈니스를 위한 웹사이트 제작 전문' : 'Website design for Korean-American businesses in California',
    url: `${baseUrl}/${ko ? 'ko/' : ''}ca-website`, email: 'info@zoelumos.com',
    areaServed: [{ '@type': 'City', name: 'Los Angeles' }, { '@type': 'City', name: 'Fullerton' }, { '@type': 'City', name: 'Irvine' }, { '@type': 'City', name: 'Garden Grove' }],
    priceRange: '$1,000-$10,000',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">{ko ? '캘리포니아 웹사이트 제작 전문' : 'California Website Design & Development'}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">{ko ? 'LA 코리아타운, 오렌지카운티, 풀러턴, 어바인 - 캘리포니아 전 지역 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스' : 'Premier web development for LA Koreatown, Orange County, Fullerton, Irvine. #1 in California.'}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${ko ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">{ko ? '가격 보기' : 'View Pricing'}</Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">{ko ? '무료 상담' : 'Free Consultation'}</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {[
                { name: ko ? 'LA 코리아타운' : 'LA Koreatown' }, { name: ko ? '풀러턴' : 'Fullerton' }, { name: ko ? '가든그로브' : 'Garden Grove' },
                { name: ko ? '어바인' : 'Irvine' }, { name: ko ? '뷰에나파크' : 'Buena Park' }, { name: ko ? '샌프란시스코' : 'San Francisco' },
              ].map((city) => (
                <div key={city.name} className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                  <p className="font-bold text-gray-900">{city.name}</p>
                  <p className="text-sm text-gray-600">{ko ? '서비스 지역' : 'Service Area'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{ko ? '왜 캘리포니아 비즈니스들이 저희를 선택할까요?' : 'Why CA Businesses Choose Us'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-blue-600" /></div>
                <h3 className="text-xl font-bold mb-2">{ko ? '캘리포니아 SEO 전문' : 'CA SEO Experts'}</h3>
                <p className="text-gray-600">{ko ? '"LA [업종]" 검색시 구글 1페이지 노출. 로컬 SEO로 캘리포니아 고객 유치' : 'Rank #1 for "LA [your business]" searches. Local SEO for CA customers'}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-indigo-600" /></div>
                <h3 className="text-xl font-bold mb-2">{ko ? '한영 이중언어' : 'Bilingual Korean-English'}</h3>
                <p className="text-gray-600">{ko ? '코리아타운 한인 고객과 미국 고객 모두를 위한 완벽한 이중언어 웹사이트' : 'Perfect bilingual websites for both Korean and American customers in CA'}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><Building2 className="w-8 h-8 text-purple-600" /></div>
                <h3 className="text-xl font-bold mb-2">{ko ? '화상 미팅 & 카카오톡' : 'Video & KakaoTalk'}</h3>
                <p className="text-gray-600">{ko ? 'Zoom 화상 미팅과 카카오톡으로 편리하게 상담 가능' : 'Convenient video meetings and KakaoTalk consultations available'}</p>
              </div>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
