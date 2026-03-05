import Link from 'next/link'
import { MapPin, ChevronRight } from 'lucide-react'

export default function LocationLinks({ locale = 'en' }: { locale?: string }) {
  const prefix = locale === 'ko' ? '/ko' : ''
  
  // Use Korean URL slugs for Korean locale (better for Korean SEO)
  const locations = [
    {
      name: locale === 'ko' ? '뉴저지 웹사이트 제작' : 'New Jersey Web Design',
      href: locale === 'ko' ? '/ko/뉴저지-웹사이트' : '/nj-website',
      description: locale === 'ko'
        ? '포트리, 팰팍, 에디슨, 체리힐 한인 비즈니스'
        : 'Fort Lee, Palisades Park, Edison specialists',
      icon: '🌉',
      keywords: locale === 'ko' ? ['뉴저지', 'NJ', '포트리'] : ['New Jersey', 'NJ', 'Fort Lee']
    },
    {
      name: locale === 'ko' ? '뉴욕 웹사이트 제작' : 'New York Web Design',
      href: locale === 'ko' ? '/ko/뉴욕-웹사이트' : '/ny-website',
      description: locale === 'ko'
        ? '맨하탄, 플러싱, 퀸즈, 브루클린 한인 비즈니스'
        : 'Manhattan, Flushing, Queens, Brooklyn specialists',
      icon: '🗽',
      keywords: locale === 'ko' ? ['뉴욕', 'NYC', '플러싱'] : ['New York', 'NYC', 'Flushing']
    },
    {
      name: locale === 'ko' ? '캘리포니아 웹사이트 제작' : 'California Web Design',
      href: locale === 'ko' ? '/ko/캘리포니아-웹사이트' : '/ca-website',
      description: locale === 'ko'
        ? 'LA 코리아타운, 오렌지카운티, 샌프란시스코'
        : 'LA Koreatown, Orange County, San Francisco',
      icon: '🌴',
      keywords: locale === 'ko' ? ['캘리포니아', 'LA', '코리아타운'] : ['California', 'LA', 'Koreatown']
    },
    {
      name: locale === 'ko' ? '텍사스 웹사이트 제작' : 'Texas Web Design',
      href: locale === 'ko' ? '/ko/텍사스-웹사이트' : '/tx-website',
      description: locale === 'ko'
        ? '달라스, 휴스턴, 오스틴 한인 비즈니스'
        : 'Dallas, Houston, Austin Korean businesses',
      icon: '⛳',
      keywords: locale === 'ko' ? ['텍사스', 'TX', '달라스'] : ['Texas', 'TX', 'Dallas']
    },
    {
      name: locale === 'ko' ? '조지아 웹사이트 제작' : 'Georgia Web Design',
      href: locale === 'ko' ? '/ko/조지아-웹사이트' : '/ga-website',
      description: locale === 'ko'
        ? '애틀랜타, 둘루스, 수와니 한인 비즈니스'
        : 'Atlanta, Duluth, Suwanee Korean businesses',
      icon: '🍑',
      keywords: locale === 'ko' ? ['조지아', 'GA', '애틀랜타'] : ['Georgia', 'GA', 'Atlanta']
    },
    {
      name: locale === 'ko' ? '버지니아 웹사이트 제작' : 'Virginia Web Design',
      href: locale === 'ko' ? '/ko/버지니아-웹사이트' : '/va-website',
      description: locale === 'ko'
        ? '노던버지니아, 애난데일, 센터빌 한인 비즈니스'
        : 'Northern Virginia, Annandale, Centreville Korean businesses',
      icon: '🏛️',
      keywords: locale === 'ko' ? ['버지니아', 'VA', '애난데일'] : ['Virginia', 'VA', 'Annandale']
    },
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
              ? '미국 전역 한인 비즈니스를 위한 전문 웹사이트 제작'
              : 'Professional web development for Korean-American businesses nationwide'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              ? 'ZOE LUMOS는 미국 전역 한인 비즈니스 웹사이트 제작 전문 에이전시입니다. 뉴저지, 뉴욕, 캘리포니아, 텍사스, 조지아, 버지니아 외 하와이, 일리노이, 워싱턴, 메릴랜드, 펜실베이니아, 플로리다까지 전국 서비스.'
              : 'ZOE LUMOS is the leading web design agency for Korean-American businesses nationwide. Serving NJ, NY, CA, TX, GA, VA, HI, IL, WA, MD, PA, FL and all 50 states.'}
          </p>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  )
}