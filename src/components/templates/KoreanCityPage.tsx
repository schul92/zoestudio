import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap, CheckCircle, Shield, TrendingUp, Award, Clock, DollarSign } from 'lucide-react'
import type { CityData } from '@/data/koreanCities'

const themes: Record<string, { bg: string; accent: string; btn: string; btnHover: string; badge: string; badgeText: string; hero: string }> = {
  rose: { bg: 'from-rose-50 via-white to-blue-50', accent: 'text-rose-600', btn: 'bg-rose-600', btnHover: 'hover:bg-rose-700', badge: 'bg-rose-100', badgeText: 'text-rose-800', hero: 'from-rose-600 to-rose-700' },
  blue: { bg: 'from-blue-50 via-white to-sky-50', accent: 'text-blue-600', btn: 'bg-blue-600', btnHover: 'hover:bg-blue-700', badge: 'bg-blue-100', badgeText: 'text-blue-800', hero: 'from-blue-600 to-blue-700' },
  emerald: { bg: 'from-emerald-50 via-white to-teal-50', accent: 'text-emerald-600', btn: 'bg-emerald-600', btnHover: 'hover:bg-emerald-700', badge: 'bg-emerald-100', badgeText: 'text-emerald-800', hero: 'from-emerald-600 to-emerald-700' },
  amber: { bg: 'from-amber-50 via-white to-orange-50', accent: 'text-amber-600', btn: 'bg-amber-600', btnHover: 'hover:bg-amber-700', badge: 'bg-amber-100', badgeText: 'text-amber-800', hero: 'from-amber-600 to-amber-700' },
  violet: { bg: 'from-violet-50 via-white to-purple-50', accent: 'text-violet-600', btn: 'bg-violet-600', btnHover: 'hover:bg-violet-700', badge: 'bg-violet-100', badgeText: 'text-violet-800', hero: 'from-violet-600 to-violet-700' },
  teal: { bg: 'from-teal-50 via-white to-cyan-50', accent: 'text-teal-600', btn: 'bg-teal-600', btnHover: 'hover:bg-teal-700', badge: 'bg-teal-100', badgeText: 'text-teal-800', hero: 'from-teal-600 to-teal-700' },
  orange: { bg: 'from-orange-50 via-white to-amber-50', accent: 'text-orange-600', btn: 'bg-orange-600', btnHover: 'hover:bg-orange-700', badge: 'bg-orange-100', badgeText: 'text-orange-800', hero: 'from-orange-600 to-orange-700' },
  indigo: { bg: 'from-indigo-50 via-white to-blue-50', accent: 'text-indigo-600', btn: 'bg-indigo-600', btnHover: 'hover:bg-indigo-700', badge: 'bg-indigo-100', badgeText: 'text-indigo-800', hero: 'from-indigo-600 to-indigo-700' },
}

export default function KoreanCityPage({ data, locale, baseUrl }: { data: CityData; locale: 'en' | 'ko'; baseUrl: string }) {
  const prefix = locale === 'ko' ? '/ko' : ''
  const cityEn = data.city.en
  const cityKo = data.city.ko
  const city = locale === 'ko' ? cityKo : cityEn
  const theme = themes[data.theme] || themes.rose

  const slugPath = locale === 'ko' ? `/ko/${data.koSlug}` : `/${data.slug}`
  const canonicalUrl = `${baseUrl}${slugPath}`

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'WebDesignBusiness'],
    '@id': `${canonicalUrl}#business`,
    name: locale === 'ko' ? `ZOE LUMOS - ${cityKo} 한인 웹디자인` : `ZOE LUMOS - ${cityEn} Korean Web Design`,
    description: locale === 'ko'
      ? `${cityKo} 한인 비즈니스를 위한 #1 이중언어 웹사이트 제작 에이전시. ${data.hubDescription.ko}`
      : `#1 bilingual Korean web design agency for Korean-American businesses in ${cityEn}. ${data.hubDescription.en}`,
    url: canonicalUrl,
    email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressLocality: cityEn, addressRegion: data.region.en, addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: data.coords.lat, longitude: data.coords.lng },
    areaServed: [
      { '@type': 'State', name: data.region.en },
      { '@type': 'City', name: cityEn },
      ...data.neighborhoods.map(n => ({ '@type': 'City' as const, name: n.en })),
    ],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '24', bestRating: '5' },
    knowsLanguage: ['English', 'Korean', 'ko-KR', 'en-US'],
  }

  const faqs = locale === 'ko' ? [
    { q: `${cityKo}에서 한인 웹사이트 제작 비용은 얼마인가요?`, a: `${cityKo} 지역 한인 비즈니스 웹사이트는 $1,000부터 시작합니다. 소규모 비즈니스 $1,000-$3,000, 이커머스 $3,000-$6,000, 커스텀 $6,000+. 무료 상담 및 투명한 견적.` },
    { q: `${cityKo} 어느 지역까지 서비스하나요?`, a: `${data.neighborhoods.map(n => n.ko).join(', ')} 등 ${data.region.ko} 전역에서 서비스합니다. 원격 상담 및 화상 회의 지원.` },
    { q: `한국어로 상담 가능한가요?`, a: `네, 100% 한국어 상담 가능합니다. 카카오톡, 전화, 이메일, 화상통화 모두 지원. 한국어와 영어 모두 네이티브 수준.` },
    { q: `${cityKo} 한인 비즈니스에 특화된 기능이 있나요?`, a: `카카오톡 채널 연동, 네이버 지도 등록, 한국어 SEO, 이중언어 예약 시스템, ${cityEn} 지역 한인 커뮤니티 마케팅 모두 포함됩니다.` },
    { q: `기존 웹사이트 리뉴얼 가능한가요?`, a: `네, WordPress, Wix, Squarespace, GoDaddy 등 어떤 플랫폼에서도 고속 Next.js 사이트로 마이그레이션 가능. SEO 순위 보존, URL 리다이렉트 책임집니다.` },
  ] : [
    { q: `How much does Korean web design cost in ${cityEn}?`, a: `Korean business websites in ${cityEn} start at $1,000. Small business $1,000-$3,000, e-commerce $3,000-$6,000, custom $6,000+. Free consultation and transparent pricing.` },
    { q: `What ${cityEn} areas do you serve?`, a: `We serve ${data.neighborhoods.map(n => n.en).join(', ')} and all of ${data.region.en}. Remote consultation and video meetings available.` },
    { q: `Do you offer Korean-language support?`, a: `Yes — 100% Korean-language consultation available via KakaoTalk, phone, email, and video. Native-level Korean and English support.` },
    { q: `What features are specific to ${cityEn} Korean businesses?`, a: `KakaoTalk Channel integration, Naver Map listings, Korean SEO, bilingual booking systems, and ${cityEn}-specific Korean community marketing all included.` },
    { q: `Can you redesign my existing website?`, a: `Yes — we migrate WordPress, Wix, Squarespace, GoDaddy and any platform to a fast modern Next.js stack. We preserve SEO rankings and URL redirects.` },
  ]

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: `${baseUrl}${prefix}` },
      { '@type': 'ListItem', position: 2, name: locale === 'ko' ? `${cityKo} 한인 웹디자인` : `${cityEn} Korean Web Design`, item: canonicalUrl },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: locale === 'ko' ? `${cityKo} 한인 웹디자인` : `${cityEn} Korean Web Design`,
    provider: { '@id': `${canonicalUrl}#business` },
    areaServed: { '@type': 'City', name: cityEn },
    offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: '1000', highPrice: '15000' },
  }

  const industries = locale === 'ko' ? [
    { icon: '🍚', title: `${cityKo} 한식당 웹사이트`, desc: '온라인 메뉴, 예약, 배달 연동' },
    { icon: '💅', title: `${cityKo} 네일샵 & 뷰티`, desc: '온라인 예약, 갤러리, 카카오 알림' },
    { icon: '🦷', title: `${cityKo} 한인 치과 & 병원`, desc: 'HIPAA 준수, 환자 포털' },
    { icon: '⚖️', title: `${cityKo} 한인 변호사 & 회계`, desc: '상담 예약, 이중언어 자료' },
    { icon: '🏠', title: `${cityKo} 한인 부동산`, desc: 'MLS 연동, 가상 투어' },
    { icon: '📚', title: `${cityKo} 한인 학원 & SAT`, desc: '수강 등록, 학부모 포털' },
    { icon: '💇', title: `${cityKo} 한인 미용실`, desc: '디자이너 포트폴리오, 예약' },
    { icon: '🛒', title: `${cityKo} 한인 마트 & 쇼핑몰`, desc: 'Shopify, 당일 배송' },
    { icon: '🎓', title: `${cityKo} 한인 교회`, desc: '주보, 설교, 헌금, 이벤트' },
  ] : [
    { icon: '🍚', title: `${cityEn} Korean Restaurants`, desc: 'Online menus, reservations, delivery' },
    { icon: '💅', title: `${cityEn} Nail Salons & Beauty`, desc: 'Online booking, galleries, KakaoTalk' },
    { icon: '🦷', title: `${cityEn} Korean Dental & Medical`, desc: 'HIPAA compliant, patient portals' },
    { icon: '⚖️', title: `${cityEn} Korean Lawyers & CPAs`, desc: 'Consultation booking, bilingual docs' },
    { icon: '🏠', title: `${cityEn} Korean Real Estate`, desc: 'MLS integration, virtual tours' },
    { icon: '📚', title: `${cityEn} Korean Tutoring & SAT`, desc: 'Enrollment, parent portals' },
    { icon: '💇', title: `${cityEn} Korean Hair Salons`, desc: 'Designer portfolios, booking' },
    { icon: '🛒', title: `${cityEn} Korean Markets`, desc: 'Shopify, same-day delivery' },
    { icon: '🎓', title: `${cityEn} Korean Churches`, desc: 'Bulletins, sermons, giving' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className={`pt-32 pb-20 px-4 bg-gradient-to-br ${theme.bg}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 ${theme.badge} ${theme.badgeText} px-4 py-2 rounded-full mb-6`}>
              <Award className="w-4 h-4" />
              <span className="font-semibold">
                {locale === 'ko' ? `${cityKo} #1 한인 웹디자인 에이전시` : `${cityEn}'s #1 Korean Web Design Agency`}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 leading-tight">
              {locale === 'ko' ? <>{cityKo} 한인 웹사이트 제작<br /><span className={theme.accent}>한국계 미국인 비즈니스 전문</span></> : <>Korean Web Design in {cityEn}<br /><span className={theme.accent}>Built for Korean-American Businesses</span></>}
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko' ? data.hubDescription.ko : data.hubDescription.en}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`${prefix}/pricing`} className={`px-8 py-4 ${theme.btn} text-white rounded-lg font-bold text-lg ${theme.btnHover} transition-colors`}>
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '무료 상담' : 'Free Consultation'}
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-600 text-sm md:text-base">
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span>5.0 / 24+ Reviews</span></div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-500" /><span>{data.koreanPopulation}</span></div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-green-500" /><span>{locale === 'ko' ? '2주 내 완성' : '2 Weeks Delivery'}</span></div>
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-purple-500" /><span>{locale === 'ko' ? '100% 한국어 지원' : '100% Korean Support'}</span></div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? `왜 ${cityKo} 한인 사업주들이 ZOE LUMOS를 선택할까요?` : `Why Korean-American Businesses in ${cityEn} Choose Us`}
            </h2>
            <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
              {locale === 'ko' ? '일반 에이전시와 진짜 한인 전문의 차이' : 'The difference between a generic agency and a true Korean-American specialist'}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left font-bold border-b-2">{locale === 'ko' ? '비교 항목' : 'Feature'}</th>
                    <th className="p-4 text-center font-bold border-b-2 text-gray-400">{locale === 'ko' ? `일반 ${cityKo} 에이전시` : `Generic ${cityEn} Agency`}</th>
                    <th className={`p-4 text-center font-bold border-b-2 ${theme.badge} ${theme.accent}`}>ZOE LUMOS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [locale === 'ko' ? '한영 이중언어' : 'Bilingual Korean + English', false, true],
                    [locale === 'ko' ? '카카오톡 / 네이버' : 'KakaoTalk & Naver integration', false, true],
                    [locale === 'ko' ? '한국어 SEO' : 'Korean-language SEO', false, true],
                    [locale === 'ko' ? `${cityKo} 한인 커뮤니티 마케팅` : `${cityEn} Korean community marketing`, false, true],
                    [locale === 'ko' ? '100% 한국어 상담' : '100% Korean support', false, true],
                    [locale === 'ko' ? '로컬 SEO' : 'Local SEO', true, true],
                    [locale === 'ko' ? '모바일 반응형' : 'Mobile responsive', true, true],
                    [locale === 'ko' ? '월 $500+ 숨은 비용' : 'Hidden monthly fees $500+', true, false],
                  ].map(([label, generic, zoe], i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{label}</td>
                      <td className="p-4 text-center">{generic ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-red-400">✗</span>}</td>
                      <td className={`p-4 text-center ${theme.badge}`}>{zoe ? <CheckCircle className={`w-5 h-5 ${theme.accent} mx-auto`} /> : <span className="text-red-400">✗</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? `${cityKo} 한인 지역 전체 서비스` : `Serving ${cityEn}'s Korean-American Community`}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko' ? '모든 한인 밀집 지역을 커버합니다' : `All major Korean-American neighborhoods covered`}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.neighborhoods.map((n) => (
                <div key={n.en} className={`p-5 rounded-lg border-2 text-center ${n.note ? `border-gray-900 bg-white shadow-md` : 'border-gray-200 bg-white'}`}>
                  <p className="font-bold text-lg text-gray-900">{locale === 'ko' ? n.ko : n.en}</p>
                  {n.koreanPct && <p className={`text-sm ${theme.accent} font-semibold mt-1`}>{locale === 'ko' ? `한인 ${n.koreanPct}` : `${n.koreanPct} Korean`}</p>}
                  {n.note && <p className="text-xs text-gray-500 mt-1">{n.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? `${cityKo} 업종별 한인 웹사이트 전문` : `Industry-Specific Korean Websites in ${cityEn}`}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 rounded-lg border hover:shadow-md transition-shadow">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <details key={i} className="bg-white p-6 rounded-lg shadow-sm group">
                  <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                    {f.q}
                    <span className={`${theme.accent} group-open:rotate-45 transition-transform text-2xl`}>+</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`py-20 px-4 bg-gradient-to-br ${theme.hero} text-white`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {locale === 'ko' ? `${cityKo} #1 한인 웹디자인 에이전시` : `${cityEn}'s #1 Korean Web Design Agency`}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko' ? '오늘 무료 상담을 예약하세요. 100% 한국어 상담.' : `Book your free consultation today. 100% Korean-language support.`}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className={`px-10 py-4 bg-white ${theme.accent} rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors`}>
                {locale === 'ko' ? '무료 상담 예약 →' : 'Book Free Consultation →'}
              </Link>
              <Link href={`${prefix}/pricing`} className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors">
                {locale === 'ko' ? '가격 보기' : 'View Pricing'}
              </Link>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
