import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Building2, Globe, Search } from 'lucide-react'

export async function generateStaticParams() { return [{ locale: 'en' }, { locale: 'ko' }] }

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  if (locale === 'ko') {
    return {
      title: '플로리다 웹사이트 제작 전문 | 마이애미 올랜도 한인 비즈니스 웹개발 | ZOE LUMOS',
      description: '플로리다 웹사이트 제작 전문. 마이애미, 올랜도, 탬파 한인 비즈니스를 위한 전문 웹사이트 개발.',
      keywords: '플로리다 웹사이트, 마이애미 웹사이트 제작, 올랜도 웹사이트, 탬파 웹사이트, 플로리다 SEO',
      openGraph: { title: '플로리다 웹사이트 제작 전문 - ZOE LUMOS', url: `${baseUrl}/ko/fl-website`, siteName: 'ZOE LUMOS', locale: 'ko_KR', type: 'website' },
      alternates: { canonical: `${baseUrl}/ko/fl-website`, languages: { 'x-default': `${baseUrl}/fl-website`, 'en': `${baseUrl}/fl-website`, 'ko': `${baseUrl}/ko/fl-website` } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }
  return {
    title: 'Florida Website Design & Development | Miami Orlando Korean Web Agency | ZOE LUMOS',
    description: 'Professional website development in Florida. Web design for Miami, Orlando, Tampa Korean businesses. FL SEO, Google optimization.',
    keywords: 'Florida website, FL web design, Miami Korean website, Orlando website, Tampa website, FL SEO',
    openGraph: { title: 'Florida Website Design - ZOE LUMOS', url: `${baseUrl}/fl-website`, siteName: 'ZOE LUMOS', locale: 'en_US', type: 'website' },
    alternates: { canonical: `${baseUrl}/fl-website`, languages: { 'x-default': `${baseUrl}/fl-website`, 'en': `${baseUrl}/fl-website`, 'ko': `${baseUrl}/ko/fl-website` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function FLWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const ko = locale === 'ko'
  const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'ZOE LUMOS - Florida Website Design', description: ko ? '플로리다 한인 비즈니스를 위한 웹사이트 제작 전문' : 'Website design for Korean-American businesses in Florida', url: `${baseUrl}/${ko ? 'ko/' : ''}fl-website`, email: 'info@zoelumos.com', areaServed: [{ '@type': 'City', name: 'Miami' }, { '@type': 'City', name: 'Orlando' }, { '@type': 'City', name: 'Tampa' }, { '@type': 'City', name: 'Jacksonville' }], priceRange: '$1,000-$10,000' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">{ko ? '플로리다 웹사이트 제작 전문' : 'Florida Website Design & Development'}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">{ko ? '마이애미, 올랜도, 탬파 - 플로리다 전 지역 한인 비즈니스를 위한 웹사이트' : 'Premier web development for Miami, Orlando, Tampa Korean businesses.'}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${ko ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">{ko ? '가격 보기' : 'View Pricing'}</Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">{ko ? '무료 상담' : 'Free Consultation'}</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {[{ name: ko ? '마이애미' : 'Miami' }, { name: ko ? '올랜도' : 'Orlando' }, { name: ko ? '탬파' : 'Tampa' }, { name: ko ? '잭슨빌' : 'Jacksonville' }, { name: ko ? '포트로더데일' : 'Fort Lauderdale' }, { name: ko ? '세인트피터즈버그' : 'St. Petersburg' }].map((city) => (
                <div key={city.name} className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center"><p className="font-bold text-gray-900">{city.name}</p><p className="text-sm text-gray-600">{ko ? '서비스 지역' : 'Service Area'}</p></div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{ko ? '왜 플로리다 비즈니스들이 저희를 선택할까요?' : 'Why FL Businesses Choose Us'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-orange-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '플로리다 SEO 전문' : 'FL SEO Experts'}</h3><p className="text-gray-600">{ko ? '"마이애미 [업종]" 검색시 구글 1페이지 노출' : 'Rank #1 for "Miami [your business]" searches'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-blue-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '한영 이중언어' : 'Bilingual Korean-English'}</h3><p className="text-gray-600">{ko ? '플로리다 한인 고객과 미국 고객 모두를 위한 이중언어 웹사이트' : 'Bilingual websites for Korean and American customers in FL'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Building2 className="w-8 h-8 text-red-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '화상 미팅 & 카카오톡' : 'Video & KakaoTalk'}</h3><p className="text-gray-600">{ko ? '동부 시간대 동일. 화상 미팅과 카카오톡 상담' : 'Same Eastern time zone. Video and KakaoTalk consultations'}</p></div>
            </div>
          </div>
        </section>
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
