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
      title: '펜실베이니아 웹사이트 제작 전문 | 필라델피아 한인 비즈니스 웹개발 | ZOE LUMOS',
      description: '펜실베이니아 웹사이트 제작 전문. 필라델피아, 킹오브프러시아, 첼튼햄 한인 비즈니스를 위한 전문 웹사이트 개발.',
      keywords: '펜실베이니아 웹사이트, 필라델피아 웹사이트 제작, 킹오브프러시아 웹사이트, 펜실베이니아 SEO',
      openGraph: { title: '펜실베이니아 웹사이트 제작 전문 - ZOE LUMOS', url: `${baseUrl}/ko/pa-website`, siteName: 'ZOE LUMOS', locale: 'ko_KR', type: 'website' },
      alternates: { canonical: `${baseUrl}/ko/pa-website`, languages: { 'x-default': `${baseUrl}/pa-website`, 'en': `${baseUrl}/pa-website`, 'ko': `${baseUrl}/ko/pa-website` } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }
  return {
    title: 'Pennsylvania Website Design & Development | Philadelphia Korean Web Agency | ZOE LUMOS',
    description: 'Professional website development in Pennsylvania. Web design for Philadelphia, King of Prussia, Cheltenham Korean businesses. PA SEO, Google optimization.',
    keywords: 'Pennsylvania website, PA web design, Philadelphia Korean website, King of Prussia website, PA SEO',
    openGraph: { title: 'Pennsylvania Website Design - ZOE LUMOS', url: `${baseUrl}/pa-website`, siteName: 'ZOE LUMOS', locale: 'en_US', type: 'website' },
    alternates: { canonical: `${baseUrl}/pa-website`, languages: { 'x-default': `${baseUrl}/pa-website`, 'en': `${baseUrl}/pa-website`, 'ko': `${baseUrl}/ko/pa-website` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function PAWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const ko = locale === 'ko'
  const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'ZOE LUMOS - Pennsylvania Website Design', description: ko ? '펜실베이니아 한인 비즈니스를 위한 웹사이트 제작 전문' : 'Website design for Korean-American businesses in Pennsylvania', url: `${baseUrl}/${ko ? 'ko/' : ''}pa-website`, email: 'info@zoelumos.com', areaServed: [{ '@type': 'City', name: 'Philadelphia' }, { '@type': 'City', name: 'King of Prussia' }, { '@type': 'City', name: 'Cheltenham' }, { '@type': 'City', name: 'Upper Darby' }], priceRange: '$1,000-$10,000' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-violet-50 to-white">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">{ko ? '펜실베이니아 웹사이트 제작 전문' : 'Pennsylvania Website Design & Development'}</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">{ko ? '필라델피아, 킹오브프러시아, 첼튼햄 - 펜실베이니아 전 지역 한인 비즈니스를 위한 웹사이트' : 'Premier web development for Philadelphia, King of Prussia Korean businesses.'}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${ko ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">{ko ? '가격 보기' : 'View Pricing'}</Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">{ko ? '무료 상담' : 'Free Consultation'}</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {[{ name: ko ? '필라델피아' : 'Philadelphia' }, { name: ko ? '킹오브프러시아' : 'King of Prussia' }, { name: ko ? '첼튼햄' : 'Cheltenham' }, { name: ko ? '어퍼다비' : 'Upper Darby' }, { name: ko ? '엘킨스파크' : 'Elkins Park' }, { name: ko ? '노리스타운' : 'Norristown' }].map((city) => (
                <div key={city.name} className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center"><p className="font-bold text-gray-900">{city.name}</p><p className="text-sm text-gray-600">{ko ? '서비스 지역' : 'Service Area'}</p></div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{ko ? '왜 펜실베이니아 비즈니스들이 저희를 선택할까요?' : 'Why PA Businesses Choose Us'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center"><div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-violet-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '펜실베이니아 SEO 전문' : 'PA SEO Experts'}</h3><p className="text-gray-600">{ko ? '"필라델피아 [업종]" 검색시 구글 1페이지 노출' : 'Rank #1 for "Philadelphia [your business]" searches'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-blue-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? '한영 이중언어' : 'Bilingual Korean-English'}</h3><p className="text-gray-600">{ko ? '필라델피아 한인 고객과 미국 고객 모두를 위한 이중언어 웹사이트' : 'Bilingual websites for Korean and American customers in PA'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><Building2 className="w-8 h-8 text-purple-600" /></div><h3 className="text-xl font-bold mb-2">{ko ? 'NJ 본사 인접' : 'Near NJ HQ'}</h3><p className="text-gray-600">{ko ? '뉴저지 본사에서 가까워 방문 미팅 가능. 화상 미팅과 카카오톡도 지원.' : 'Close to NJ HQ. In-person, video, and KakaoTalk available.'}</p></div>
            </div>
          </div>
        </section>
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
