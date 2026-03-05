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
      title: '워싱턴 웹사이트 제작 전문 | 시애틀 한인 비즈니스 웹개발 | ZOE LUMOS',
      description: '워싱턴주 웹사이트 제작 전문. 시애틀, 페더럴웨이, 벨뷰 한인 비즈니스를 위한 전문 웹사이트 개발.',
      keywords: '워싱턴 웹사이트, 시애틀 웹사이트 제작, 페더럴웨이 웹사이트, 벨뷰 웹사이트, 워싱턴 SEO',
      openGraph: { title: '워싱턴 웹사이트 제작 전문 - ZOE LUMOS', url: `${baseUrl}/ko/wa-website`, siteName: 'ZOE LUMOS', locale: 'ko_KR', type: 'website' },
      alternates: { canonical: `${baseUrl}/ko/wa-website`, languages: { 'x-default': `${baseUrl}/wa-website`, 'en': `${baseUrl}/wa-website`, 'ko': `${baseUrl}/ko/wa-website` } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }
  return {
    title: 'Washington Website Design & Development | Seattle Korean Web Agency | ZOE LUMOS',
    description: 'Professional website development in Washington. Web design for Seattle, Federal Way, Bellevue Korean businesses. WA SEO, Google optimization.',
    keywords: 'Washington website, WA web design, Seattle Korean website, Federal Way website, Bellevue website, WA SEO',
    openGraph: { title: 'Washington Website Design - ZOE LUMOS', url: `${baseUrl}/wa-website`, siteName: 'ZOE LUMOS', locale: 'en_US', type: 'website' },
    alternates: { canonical: `${baseUrl}/wa-website`, languages: { 'x-default': `${baseUrl}/wa-website`, 'en': `${baseUrl}/wa-website`, 'ko': `${baseUrl}/ko/wa-website` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function WAWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const ko = locale === 'ko'
  const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'ZOE LUMOS - Washington Website Design', description: ko ? '워싱턴주 한인 비즈니스를 위한 웹사이트 제작 전문' : 'Website design for Korean-American businesses in Washington', url: `${baseUrl}/${ko ? 'ko/' : ''}wa-website`, email: 'info@zoelumos.com', areaServed: [{ '@type': 'City', name: 'Seattle' }, { '@type': 'City', name: 'Federal Way' }, { '@type': 'City', name: 'Bellevue' }, { '@type': 'City', name: 'Tacoma' }], priceRange: '$1,000-$10,000' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-sky-50 to-white">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">{ko ? '워싱턴 웹사이트 제작 전문' : 'Washington Website Design & Development'}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">{ko ? '시애틀, 페더럴웨이, 벨뷰 - 워싱턴 전 지역 한인 비즈니스를 위한 웹사이트' : 'Premier web development for Seattle, Federal Way, Bellevue Korean businesses.'}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${ko ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">{ko ? '가격 보기' : 'View Pricing'}</Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">{ko ? '무료 상담' : 'Free Consultation'}</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {[{ name: ko ? '시애틀' : 'Seattle' }, { name: ko ? '페더럴웨이' : 'Federal Way' }, { name: ko ? '벨뷰' : 'Bellevue' }, { name: ko ? '타코마' : 'Tacoma' }, { name: ko ? '린우드' : 'Lynnwood' }, { name: ko ? '에드먼즈' : 'Edmonds' }].map((city) => (
                <div key={city.name} className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center"><p className="font-bold text-gray-900">{city.name}</p><p className="text-sm text-gray-600">{ko ? '서비스 지역' : 'Service Area'}</p></div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{ko ? '왜 워싱턴 비즈니스들이 저희를 선택할까요?' : 'Why WA Businesses Choose Us'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center"><div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-sky-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '워싱턴 SEO 전문' : 'WA SEO Experts'}</h3><p className="text-gray-600">{ko ? '"시애틀 [업종]" 검색시 구글 1페이지 노출' : 'Rank #1 for "Seattle [your business]" searches'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-blue-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '한영 이중언어' : 'Bilingual Korean-English'}</h3><p className="text-gray-600">{ko ? '시애틀 한인 고객과 미국 고객 모두를 위한 이중언어 웹사이트' : 'Bilingual websites for Korean and American customers in WA'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4"><Building2 className="w-8 h-8 text-cyan-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '화상 미팅 & 카카오톡' : 'Video & KakaoTalk'}</h3><p className="text-gray-600">{ko ? '태평양 시간대 맞춤 화상 미팅과 카카오톡 상담' : 'Pacific time zone scheduling. Video and KakaoTalk consultations'}</p></div>
            </div>
          </div>
        </section>
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
