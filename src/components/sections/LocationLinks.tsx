import Link from 'next/link'
import { MapPin, ChevronRight } from 'lucide-react'

export default function LocationLinks({ locale = 'en' }: { locale?: string }) {
  const prefix = locale === 'ko' ? '/ko' : ''
  
  const locations = [
    {
      name: locale === 'ko' ? '뉴욕 웹사이트 제작' : 'New York Web Design',
      href: `${prefix}/ny-website`,
      description: locale === 'ko' 
        ? '맨하탄, 브루클린, 퀸즈, 플러싱 지역 전문'
        : 'Manhattan, Brooklyn, Queens, Flushing specialists',
      icon: '🗽',
      keywords: locale === 'ko' ? ['뉴욕', 'NYC', '맨하탄'] : ['New York', 'NYC', 'Manhattan']
    },
    {
      name: locale === 'ko' ? '뉴저지 웹사이트 제작' : 'New Jersey Web Design',
      href: `${prefix}/nj-website`,
      description: locale === 'ko'
        ? '포트리, 팰리세이드파크, 에지워터 지역 전문'
        : 'Fort Lee, Palisades Park, Edgewater specialists',
      icon: '🌉',
      keywords: locale === 'ko' ? ['뉴저지', 'NJ', '포트리'] : ['New Jersey', 'NJ', 'Fort Lee']
    }
  ]
  
  return (
    <section className="py-16 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {locale === 'ko' ? '서비스 지역' : 'Service Areas'}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {locale === 'ko'
              ? '뉴욕과 뉴저지 전 지역의 한인 비즈니스를 위한 전문 웹사이트 제작'
              : 'Professional web development for businesses across New York and New Jersey'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <Link
              key={location.href}
              href={location.href}
              className="group relative bg-[#1a1a1a] rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-1 border-2 border-white/10 hover:border-amber-400/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{location.icon}</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {location.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 mb-4">
                    {location.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {location.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-sm group-hover:bg-amber-400/20 group-hover:text-amber-400 transition-colors"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-amber-400 transition-colors transform group-hover:translate-x-1" />
              </div>

              {/* SEO-friendly additional text */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500">
                  {locale === 'ko'
                    ? '✓ 로컬 SEO 최적화 ✓ 구글 1위 보장 ✓ 한국어/영어 지원'
                    : '✓ Local SEO Optimized ✓ Google #1 Rankings ✓ Bilingual Support'}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional SEO text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            {locale === 'ko'
              ? 'ZOE LUMOS는 뉴욕 웹사이트 제작과 뉴저지 웹사이트 제작 분야의 선두 업체입니다. 구글 검색 최적화를 통해 귀하의 비즈니스가 "뉴욕 웹사이트" 또는 "뉴저지 웹사이트" 검색 시 상위에 노출되도록 보장합니다.'
              : 'ZOE LUMOS is the leading web design agency for New York website development and New Jersey website creation. We ensure your business ranks #1 for local searches through expert SEO optimization.'}
          </p>
        </div>
      </div>
    </section>
  )
}