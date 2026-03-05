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
      title: '하와이 웹사이트 제작 전문 | 호놀룰루 한인 비즈니스 웹개발 | ZOE LUMOS',
      description: '하와이 웹사이트 제작 전문. 호놀룰루, 와이키키, 카폴레이 한인 비즈니스를 위한 전문 웹사이트 개발. 관광 비즈니스 웹사이트.',
      keywords: '하와이 웹사이트, 호놀룰루 웹사이트 제작, 와이키키 웹사이트, 하와이 관광 웹사이트, 하와이 SEO',
      openGraph: { title: '하와이 웹사이트 제작 전문 - ZOE LUMOS', url: `${baseUrl}/ko/hi-website`, siteName: 'ZOE LUMOS', locale: 'ko_KR', type: 'website' },
      alternates: { canonical: `${baseUrl}/ko/hi-website`, languages: { 'x-default': `${baseUrl}/hi-website`, 'en': `${baseUrl}/hi-website`, 'ko': `${baseUrl}/ko/hi-website` } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }
  return {
    title: 'Hawaii Website Design & Development | Honolulu Korean Web Agency | ZOE LUMOS',
    description: 'Professional website development in Hawaii. Web design for Honolulu, Waikiki, Kapolei Korean businesses. HI SEO, tourism websites.',
    keywords: 'Hawaii website, HI web design, Honolulu Korean website, Waikiki website, Hawaii tourism website, HI SEO',
    openGraph: { title: 'Hawaii Website Design - ZOE LUMOS', url: `${baseUrl}/hi-website`, siteName: 'ZOE LUMOS', locale: 'en_US', type: 'website' },
    alternates: { canonical: `${baseUrl}/hi-website`, languages: { 'x-default': `${baseUrl}/hi-website`, 'en': `${baseUrl}/hi-website`, 'ko': `${baseUrl}/ko/hi-website` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function HIWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const ko = locale === 'ko'
  const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'ZOE LUMOS - Hawaii Website Design', description: ko ? '하와이 한인 비즈니스를 위한 웹사이트 제작 전문' : 'Website design for Korean-American businesses in Hawaii', url: `${baseUrl}/${ko ? 'ko/' : ''}hi-website`, email: 'info@zoelumos.com', areaServed: [{ '@type': 'City', name: 'Honolulu' }, { '@type': 'City', name: 'Kapolei' }, { '@type': 'City', name: 'Pearl City' }, { '@type': 'City', name: 'Aiea' }], priceRange: '$1,000-$10,000' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-cyan-50 to-white">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">{ko ? '하와이 웹사이트 제작 전문' : 'Hawaii Website Design & Development'}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">{ko ? '호놀룰루, 와이키키, 카폴레이 - 하와이 전 지역 한인 비즈니스 & 관광 업체를 위한 웹사이트' : 'Premier web development for Honolulu, Waikiki Korean businesses & tourism.'}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${ko ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">{ko ? '가격 보기' : 'View Pricing'}</Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">{ko ? '무료 상담' : 'Free Consultation'}</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {[{ name: ko ? '호놀룰루' : 'Honolulu' }, { name: ko ? '와이키키' : 'Waikiki' }, { name: ko ? '카폴레이' : 'Kapolei' }, { name: ko ? '펄시티' : 'Pearl City' }, { name: ko ? '아이에아' : 'Aiea' }, { name: ko ? '마우이' : 'Maui' }].map((city) => (
                <div key={city.name} className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center"><p className="font-bold text-gray-900">{city.name}</p><p className="text-sm text-gray-600">{ko ? '서비스 지역' : 'Service Area'}</p></div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{ko ? '왜 하와이 비즈니스들이 저희를 선택할까요?' : 'Why HI Businesses Choose Us'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center"><div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-cyan-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '관광 SEO 전문' : 'Tourism SEO Experts'}</h3><p className="text-gray-600">{ko ? '"하와이 한국 투어" 검색시 구글 1페이지 노출. 네이버 검색 최적화.' : 'Rank #1 for "Hawaii Korean tour" searches. Naver optimization.'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-blue-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '다국어 지원' : 'Multilingual Support'}</h3><p className="text-gray-600">{ko ? '한국어, 영어, 일본어 다국어 웹사이트. 관광객과 현지 고객 모두 타겟팅.' : 'Korean, English, Japanese multilingual websites for tourists and locals'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4"><Building2 className="w-8 h-8 text-teal-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '화상 미팅 & 카카오톡' : 'Video & KakaoTalk'}</h3><p className="text-gray-600">{ko ? '하와이 시간대 맞춤 화상 미팅과 카카오톡 상담' : 'Hawaii time zone scheduling. Video and KakaoTalk consultations'}</p></div>
            </div>
          </div>
        </section>
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
