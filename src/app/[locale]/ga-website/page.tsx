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
      title: '조지아 웹사이트 제작 전문 | 애틀랜타 둘루스 한인 비즈니스 웹개발 | ZOE LUMOS',
      description: '조지아 웹사이트 제작 전문. 애틀랜타, 둘루스, 수와니, 존스크릭 한인 비즈니스를 위한 전문 웹사이트 개발. 조지아 로컬 SEO.',
      keywords: '조지아 웹사이트, 애틀랜타 웹사이트 제작, 둘루스 웹사이트, 수와니 웹사이트, 조지아 SEO',
      openGraph: { title: '조지아 웹사이트 제작 전문 - ZOE LUMOS', url: `${baseUrl}/ko/ga-website`, siteName: 'ZOE LUMOS', locale: 'ko_KR', type: 'website' },
      alternates: { canonical: `${baseUrl}/ko/ga-website`, languages: { 'x-default': `${baseUrl}/ga-website`, 'en': `${baseUrl}/ga-website`, 'ko': `${baseUrl}/ko/ga-website` } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }
  return {
    title: 'Georgia Website Design & Development | Atlanta Korean Web Agency | ZOE LUMOS',
    description: 'Professional website development in Georgia. Web design for Atlanta, Duluth, Suwanee, Johns Creek Korean businesses. GA SEO, Google optimization.',
    keywords: 'Georgia website, GA web design, Atlanta Korean website, Duluth website, Suwanee website, GA SEO',
    openGraph: { title: 'Georgia Website Design - ZOE LUMOS', url: `${baseUrl}/ga-website`, siteName: 'ZOE LUMOS', locale: 'en_US', type: 'website' },
    alternates: { canonical: `${baseUrl}/ga-website`, languages: { 'x-default': `${baseUrl}/ga-website`, 'en': `${baseUrl}/ga-website`, 'ko': `${baseUrl}/ko/ga-website` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function GAWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const ko = locale === 'ko'
  const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'ZOE LUMOS - Georgia Website Design', description: ko ? '조지아 한인 비즈니스를 위한 웹사이트 제작 전문' : 'Website design for Korean-American businesses in Georgia', url: `${baseUrl}/${ko ? 'ko/' : ''}ga-website`, email: 'info@zoelumos.com', areaServed: [{ '@type': 'City', name: 'Atlanta' }, { '@type': 'City', name: 'Duluth' }, { '@type': 'City', name: 'Suwanee' }, { '@type': 'City', name: 'Johns Creek' }], priceRange: '$1,000-$10,000' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-teal-50 to-white">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">{ko ? '조지아 웹사이트 제작 전문' : 'Georgia Website Design & Development'}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">{ko ? '애틀랜타, 둘루스, 수와니, 존스크릭 - 조지아 전 지역 한인 비즈니스를 위한 웹사이트' : 'Premier web development for Atlanta, Duluth, Suwanee, Johns Creek Korean businesses.'}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${ko ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">{ko ? '가격 보기' : 'View Pricing'}</Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">{ko ? '무료 상담' : 'Free Consultation'}</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {[{ name: ko ? '둘루스' : 'Duluth' }, { name: ko ? '수와니' : 'Suwanee' }, { name: ko ? '존스크릭' : 'Johns Creek' }, { name: ko ? '로렌스빌' : 'Lawrenceville' }, { name: ko ? '도라빌' : 'Doraville' }, { name: ko ? '애틀랜타' : 'Atlanta' }].map((city) => (
                <div key={city.name} className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center"><p className="font-bold text-gray-900">{city.name}</p><p className="text-sm text-gray-600">{ko ? '서비스 지역' : 'Service Area'}</p></div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{ko ? '왜 조지아 비즈니스들이 저희를 선택할까요?' : 'Why GA Businesses Choose Us'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center"><div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-teal-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '조지아 SEO 전문' : 'GA SEO Experts'}</h3><p className="text-gray-600">{ko ? '"둘루스 [업종]" 검색시 구글 1페이지 노출' : 'Rank #1 for "Duluth [your business]" searches'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-blue-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '한영 이중언어' : 'Bilingual Korean-English'}</h3><p className="text-gray-600">{ko ? '둘루스 한인 고객과 미국 고객 모두를 위한 이중언어 웹사이트' : 'Bilingual websites for Korean and American customers in GA'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4"><Building2 className="w-8 h-8 text-cyan-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '화상 미팅 & 카카오톡' : 'Video & KakaoTalk'}</h3><p className="text-gray-600">{ko ? 'Zoom 화상 미팅과 카카오톡으로 편리하게 상담' : 'Video meetings and KakaoTalk consultations'}</p></div>
            </div>
          </div>
        </section>
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
