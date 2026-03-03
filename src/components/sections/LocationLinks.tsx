import Link from 'next/link'
import { MapPin, ChevronRight } from 'lucide-react'

export default function LocationLinks({ locale = 'en' }: { locale?: string }) {
  const prefix = locale === 'ko' ? '/ko' : ''
  
  // Use Korean URL slugs for Korean locale (better for Korean SEO)
  const locations = [
    {
      name: locale === 'ko' ? '뉴욕 웹사이트 제작' : 'New York Web Design',
      href: locale === 'ko' ? '/ko/뉴욕-웹사이트' : '/ny-website',
      description: locale === 'ko'
        ? '맨하탄, 브루클린, 퀸즈, 플러싱 지역 전문'
        : 'Manhattan, Brooklyn, Queens, Flushing specialists',
      icon: '🗽',
      keywords: locale === 'ko' ? ['뉴욕', 'NYC', '맨하탄'] : ['New York', 'NYC', 'Manhattan']
    },
    {
      name: locale === 'ko' ? '뉴저지 웹사이트 제작' : 'New Jersey Web Design',
      href: locale === 'ko' ? '/ko/뉴저지-웹사이트' : '/nj-website',
      description: locale === 'ko'
        ? '포트리, 팰리세이드파크, 에지워터 지역 전문'
        : 'Fort Lee, Palisades Park, Edgewater specialists',
      icon: '🌉',
      keywords: locale === 'ko' ? ['뉴저지', 'NJ', '포트리'] : ['New Jersey', 'NJ', 'Fort Lee']
    },
    {
      name: locale === 'ko' ? '잉글우드 SEO 서비스' : 'Englewood NJ SEO',
      href: `${prefix}/englewood-nj-seo`,
      description: locale === 'ko'
        ? '소상공인 대상 로컬 SEO 및 구글 마이비즈니스 최적화'
        : 'Local SEO and Google Business Profile optimization for small businesses',
      icon: '🔎',
      keywords: locale === 'ko' ? ['잉글우드', 'SEO', '버겐카운티'] : ['Englewood', 'SEO', 'Bergen County']
    },
    {
      name: locale === 'ko' ? '노스버겐 웹디자인' : 'North Bergen Web Design',
      href: `${prefix}/north-bergen-web-design`,
      description: locale === 'ko'
        ? '노스버겐/허드슨카운티 비즈니스 대상 웹디자인 + SEO'
        : 'Web design + SEO for North Bergen and Hudson County businesses',
      icon: '📍',
      keywords: locale === 'ko' ? ['노스버겐', '웹디자인', '허드슨'] : ['North Bergen', 'Web Design', 'Hudson County']
    }
  ]
  
  return (
    <section className="grain-overlay py-16 bg-[#111111] relative overflow-hidden">
      {/* Subtle radial gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(245,158,11,0.02),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(96,165,250,0.02),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Link
              key={location.href}
              href={location.href}
              className="group relative bg-white/[0.03] rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-1 border border-white/[0.08] hover:border-amber-500/30 hover:shadow-glow-sm"
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
                        className="px-3 py-1 bg-white/[0.04] text-gray-500 rounded-full text-sm border border-white/[0.06] group-hover:border-amber-500/20 group-hover:text-amber-400/80 transition-colors"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-amber-400 transition-colors transform group-hover:translate-x-1" />
              </div>

              {/* SEO-friendly additional text */}
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
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
              ? 'ZOE LUMOS는 뉴욕 웹사이트 제작과 뉴저지 웹사이트 제작 분야의 선두 업체입니다. 구글 검색 최적화를 통해 귀하의 비즈니스가 "뉴욕 웹사이트" 또는 "뉴저지 웹사이트" 검색 시 상위에 노출되도록 지원합니다.'
              : 'ZOE LUMOS is a specialized web design agency for New York and New Jersey businesses. We help improve local visibility through practical, bilingual SEO strategies.'}
          </p>
        </div>

        {/* Question-based local intent content block */}
        <div className="mt-10 max-w-4xl mx-auto rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            {locale === 'ko' ? '자주 검색되는 지역 SEO 질문' : 'Popular Local SEO Questions'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {locale === 'ko' ? (
              <>
                <li>• 포트리 한인 비즈니스 웹사이트 제작 비용은 얼마나 드나요?</li>
                <li>• 팰리세이즈파크 소상공인을 위한 로컬 SEO는 어떻게 시작하나요?</li>
                <li>• 버겐카운티에서 구글맵 상위 노출을 하려면 무엇이 필요한가요?</li>
              </>
            ) : (
              <>
                <li>• How much does small business web design cost in Fort Lee, NJ?</li>
                <li>• What is the best local SEO strategy for Palisades Park businesses?</li>
                <li>• How can Bergen County businesses rank higher on Google Maps?</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  )
}