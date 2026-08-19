import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Search, Globe, BarChart3 } from 'lucide-react'
import { SITE_URL } from '@/lib/siteUrl'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' }
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = SITE_URL
  
  if (locale === 'ko') {
    return {
      title: '버겐카운티 SEO 업체 | 잉글우드 NJ 한인 비즈니스 검색 최적화 | ZOE LUMOS',
      description: '포트리에 있는 버겐카운티 SEO 업체. 로컬 SEO 월 $50부터, 구글 비즈니스 프로필 관리 월 $50. 실제 사례: 맨해튼 꽃집 하루 매출 $87 → $268. 잉글우드·포트리·팰팍 한인 비즈니스 전문.',
      keywords: '잉글우드 SEO, Englewood NJ SEO, 잉글우드 디지털 마케팅, 버겐카운티 SEO, 한인 SEO 서비스, 잉글우드 한인 비즈니스',
      alternates: {
        canonical: `${baseUrl}/ko/englewood-nj-seo`,
        languages: {
          'x-default': `${baseUrl}/englewood-nj-seo`,
          'en': `${baseUrl}/englewood-nj-seo`,
          'ko': `${baseUrl}/ko/englewood-nj-seo`,
        },
      },
      openGraph: {
        title: '잉글우드 NJ SEO 전문 - ZOE LUMOS',
        description: '잉글우드, 버겐카운티 한인 비즈니스 SEO & 디지털 마케팅 전문.',
        url: `${baseUrl}/ko/englewood-nj-seo`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
      },
    }
  }

  return {
    title: 'SEO Company Bergen County NJ | Englewood & Fort Lee Local SEO | ZOE LUMOS',
    description: 'Bergen County SEO company based in Fort Lee, NJ. Local SEO from $50/mo, Google Business Profile management $50/mo. Real result: a Manhattan florist went from $87 to $268 in daily revenue. Bilingual English & Korean.',
    keywords: 'seo company bergen county, seo company bergen county nj, bergen county seo, local seo company bergen county nj, Englewood NJ SEO, SEO agency Englewood NJ, Fort Lee SEO, Korean SEO New Jersey',
    alternates: {
      canonical: `${baseUrl}/englewood-nj-seo`,
      languages: {
        'x-default': `${baseUrl}/englewood-nj-seo`,
        'en': `${baseUrl}/englewood-nj-seo`,
        'ko': `${baseUrl}/ko/englewood-nj-seo`,
      },
    },
    openGraph: {
      title: 'Englewood NJ SEO Agency - ZOE LUMOS',
      description: 'Expert SEO services for small businesses in Englewood, NJ and Bergen County.',
      url: `${baseUrl}/englewood-nj-seo`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function EnglewoodSEO({ params }: { params: { locale: string } }) {
  const isKo = params.locale === 'ko'
  const canonical = isKo ? `${SITE_URL}/ko/englewood-nj-seo` : `${SITE_URL}/englewood-nj-seo`

  // JSON-LD: ProfessionalService
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ZOE LUMOS',
    description: isKo
      ? '잉글우드 NJ 및 버겐카운티 소상공인을 위한 SEO 전문 업체. 로컬 SEO, 워드프레스 SEO, 영어/한국어 이중언어 SEO.'
      : 'Small business SEO agency in Englewood, NJ serving Bergen County. Local SEO, WordPress SEO, and bilingual English & Korean SEO.',
    url: canonical,
    image: `${SITE_URL}/og-image.png`,
    // No telephone: we take inquiries by email and KakaoTalk only.
    email: 'info@zoelumos.com',
    priceRange: '$$',
    serviceType: 'Search Engine Optimization (SEO)',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fort Lee',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      postalCode: '07024',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.8509,
      longitude: -73.9701,
    },
    areaServed: [
      { '@type': 'City', name: 'Englewood' },
      { '@type': 'City', name: 'North Bergen' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
      { '@type': 'AdministrativeArea', name: 'New Jersey' },
    ],
  }

  // JSON-LD: FAQPage (bilingual-aware)
  const faqs = isKo
    ? [
        {
          q: '잉글우드 NJ SEO 대행사 비용은 얼마인가요?',
          a: '대부분의 잉글우드 소상공인 SEO 프로젝트는 작업 범위에 따라 월 단위로 진행되며, 합리적이고 투명한 견적을 드립니다. 무료 상담을 통해 비즈니스 규모와 목표에 맞는 맞춤 견적을 받아보세요.',
        },
        {
          q: '워드프레스(WordPress) SEO도 해주시나요?',
          a: '네. 워드프레스 SEO 전문으로, 사이트 속도 개선, 메타 태그, 스키마, 콘텐츠 구조 최적화까지 워드프레스 사이트에 맞춘 SEO를 제공합니다.',
        },
        {
          q: '노스버겐과 버겐카운티 지역도 서비스하나요?',
          a: '네. 잉글우드뿐 아니라 노스버겐, 포트리, 팰팍, 엣지워터 등 버겐카운티 및 허드슨카운티 전역의 비즈니스를 지원합니다.',
        },
        {
          q: '영어와 한국어 이중언어 SEO가 가능한가요?',
          a: '네. 영어와 한국어 모두 최적화하는 이중언어(Korean + English) SEO가 저희의 핵심 강점입니다. 두 언어로 검색하는 고객 모두에게 도달할 수 있습니다.',
        },
        {
          q: '버겐카운티 SEO 업체는 어떻게 골라야 하나요?',
          a: '세 가지만 확인하시면 됩니다. 첫째, 가격을 먼저 말해주는가 — 상담 전화를 해야만 견적을 주는 곳은 견적이 사람마다 다릅니다. 둘째, 실제 고객 결과를 숫자로 보여주는가. 셋째, 순위를 보장한다고 말하는가 — 보장한다면 지킬 수 없는 약속입니다. 저희는 가격(로컬 SEO 월 $50, GBP 관리 월 $50)과 실제 사례를 이 페이지에 적어두었고, 순위는 보장하지 않습니다.',
        },
        {
          q: '포트리에 계신데 잉글우드까지 오시나요?',
          a: '포트리에서 잉글우드까지 차로 약 10분입니다. 필요하면 직접 찾아뵙고, 대부분의 작업과 리포트는 원격으로 진행합니다. 잉글우드·잉글우드클리프·티넥·팰팍·레오니아 모두 같은 지역으로 보고 서비스합니다.',
        },
        {
          q: '이미 다른 업체에서 SEO를 받고 있는데 옮길 수 있나요?',
          a: '가능합니다. 다만 먼저 지금 무엇이 되고 있는지 확인부터 합니다. 구글 비즈니스 프로필과 Search Console 접근 권한이 사장님 명의로 되어 있는지가 가장 중요합니다 — 이전 업체 계정에 묶여 있으면 그것부터 되찾아야 합니다. 무료 점검으로 현재 상태를 정리해 드립니다.',
        },
        {
          q: 'SEO 성과는 얼마나 걸리나요?',
          a: '로컬 SEO와 구글 비즈니스 프로필 개선은 보통 몇 주 내에 효과가 나타나기 시작하며, 경쟁 키워드의 의미 있는 순위 상승은 일반적으로 3~6개월이 걸립니다.',
        },
      ]
    : [
        {
          q: 'How much does an SEO agency in Englewood NJ cost?',
          a: 'Most Englewood small business SEO engagements run on a monthly basis and are priced by scope. We keep pricing transparent and affordable for local businesses. Book a free consultation for a custom quote based on your size and goals.',
        },
        {
          q: 'Do you offer WordPress SEO in Englewood?',
          a: 'Yes. We are WordPress SEO experts and tune WordPress sites specifically — site speed, meta tags, schema markup, internal linking, and content structure — so they rank in Englewood and Bergen County.',
        },
        {
          q: 'Do you serve North Bergen and Bergen County?',
          a: 'Yes. Beyond Englewood we work with businesses across North Bergen, Fort Lee, Palisades Park, Edgewater, and the rest of Bergen County and Hudson County, NJ.',
        },
        {
          q: 'Do you do bilingual (Korean + English) SEO?',
          a: 'Yes. Bilingual SEO is a core strength. We optimize in both English and Korean so you reach customers searching in either language across New York and New Jersey.',
        },
        {
          q: 'How do I choose an SEO company in Bergen County?',
          a: 'Check three things. First, whether they will say a price before you book a call — agencies that quote only on the phone quote differently to different people. Second, whether they show client results as numbers. Third, whether they guarantee rankings; if they do, they are promising something no agency controls. Our prices are on this page (local SEO $50/mo, Google Business Profile management $50/mo), our results are named, and we do not guarantee rankings.',
        },
        {
          q: 'You are in Fort Lee — do you actually serve Englewood?',
          a: 'Fort Lee to Englewood is about a ten-minute drive. We meet in person when it helps, and run the work and reporting remotely. Englewood, Englewood Cliffs, Tenafly, Palisades Park, and Leonia are all the same market to us.',
        },
        {
          q: 'Can I switch if another agency already handles my SEO?',
          a: 'Yes, but we start by checking what is actually in place. The critical question is whether your Google Business Profile and Search Console are owned by you rather than sitting inside the previous agency account — if they are not, reclaiming them comes first. Our free audit documents where you stand.',
        },
        {
          q: 'How long until SEO results?',
          a: 'Local SEO and Google Business Profile improvements often show within a few weeks, while meaningful ranking gains on competitive keywords typically take 3 to 6 months of consistent work.',
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isKo ? '홈' : 'Home',
        item: isKo ? `${SITE_URL}/ko` : SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isKo ? '잉글우드 NJ SEO' : 'Englewood NJ SEO',
        item: canonical,
      },
    ],
  }

  const cities = [
    'Englewood',
    'Englewood Cliffs',
    'Tenafly',
    'Fort Lee',
    'Palisades Park',
    'Leonia',
    'Teaneck',
    'North Bergen',
    'Edgewater',
    'Cliffside Park',
    'Ridgefield',
    'Bergenfield',
  ]

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeaderWrapper locale={params.locale} />
      <main className="min-h-screen relative overflow-x-hidden">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#111111] to-[#1a1a2e]">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isKo ? (
                <>버겐카운티 SEO 업체<br /><span className="text-blue-400">잉글우드 · 포트리 · 팰팍</span></>
              ) : (
                <>SEO Company in<br /><span className="text-blue-400">Bergen County, NJ</span></>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {isKo
                ? '포트리에 사무실을 둔 버겐카운티 SEO 업체입니다. 로컬 SEO 월 $50, 구글 비즈니스 프로필 관리 월 $50 — 가격을 먼저 공개합니다. 영어와 한국어 두 언어로 검색되는 것이 저희의 전문 분야입니다.'
                : 'We are an SEO company in Bergen County, NJ, based in Fort Lee — ten minutes from Englewood. Local SEO from $50/month, Google Business Profile management $50/month, prices published up front. Bilingual English and Korean search is what we specialize in.'}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isKo ? 'SEO 서비스' : 'Our SEO Services in Englewood'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Search className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '로컬 SEO' : 'Local SEO'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? '구글 마이비즈니스 최적화, 로컬 검색 순위 개선, 지역 키워드 타겟팅'
                    : 'Google Business Profile optimization, local search rankings, and geo-targeted keyword strategy for Englewood businesses'}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Globe className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '온페이지 SEO' : 'On-Page SEO'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? '메타 태그 최적화, 콘텐츠 전략, 사이트 구조 개선'
                    : 'Meta tag optimization, content strategy, site structure improvements, and bilingual content optimization'}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <BarChart3 className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '성과 분석' : 'Performance Analytics'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? '월간 SEO 리포트, 키워드 순위 추적, 경쟁사 분석'
                    : 'Monthly SEO reports, keyword ranking tracking, competitor analysis, and ROI measurement'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-[#0d0d1a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              {isKo ? '왜 ZOE LUMOS인가?' : 'Why Choose ZOE LUMOS for Englewood SEO?'}
            </h2>
            <div className="space-y-6 text-gray-300">
              <p>
                {isKo
                  ? 'ZOE LUMOS는 잉글우드, 노스버겐, 포트리, 팰팍 등 버겐카운티 전역의 한인 비즈니스를 위한 SEO 전문가 팀입니다. 영어와 한국어 모두 최적화하는 이중언어(Korean SEO) 전략으로 더 많은 고객에게 도달할 수 있도록 도와드립니다.'
                  : 'Located in Fort Lee, ZOE LUMOS is a small business SEO agency in Englewood NJ that understands the local Bergen County market. As SEO experts in Englewood, we help small businesses — especially Korean-American owned businesses across North Bergen and Bergen County — rank higher on Google with proven SEO and WordPress SEO strategies.'}
              </p>
              <p>
                {isKo
                  ? '구글 검색에서 상위 노출되면 더 많은 고객이 찾아옵니다. 로컬 SEO, 구글 광고, 웹사이트 최적화를 통해 비즈니스 성장을 도와드리겠습니다.'
                  : 'Whether you run a restaurant, salon, medical practice, or retail store in Englewood, our bilingual team creates SEO strategies that drive real results — more phone calls, more walk-ins, and more online visibility.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {cities.map(city => (
                <span key={city} className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">
                  {city}, NJ
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Results / What You Get */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isKo ? '함께하면 얻는 것' : 'What You Get With Our Englewood SEO'}
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              {isKo
                ? '잉글우드와 노스버겐의 소상공인 SEO에 집중하는 SEO 전문가 팀이 측정 가능한 성장을 만들어 드립니다.'
                : 'As small business SEO experts in Englewood and North Bergen, we focus on measurable growth — not vanity metrics.'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {(isKo
                ? [
                    ['로컬 검색 가시성', '구글 비즈니스 프로필과 로컬 팩(Map Pack)에서 더 자주 노출되어 잉글우드와 버겐카운티 고객이 먼저 발견합니다.'],
                    ['워드프레스 SEO 최적화', '워드프레스 사이트 속도, 메타 태그, 스키마, 내부 링크를 정비해 검색 순위를 끌어올립니다.'],
                    ['이중언어(한/영) 도달', '영어와 한국어로 검색하는 고객 모두에게 도달하는 한인 비즈니스 맞춤 SEO.'],
                    ['투명한 월간 리포트', '키워드 순위, 트래픽, 전환을 매달 투명하게 공유해 무엇이 효과 있는지 명확히 보여드립니다.'],
                  ]
                : [
                    ['Local search visibility', 'Show up more often in Google Business Profile and the local Map Pack so Englewood and Bergen County customers find you first.'],
                    ['WordPress SEO tuning', 'We optimize WordPress site speed, meta tags, schema, and internal links to lift your rankings.'],
                    ['Bilingual (KO/EN) reach', 'Korean-business-friendly SEO that reaches customers searching in both English and Korean.'],
                    ['Transparent monthly reporting', 'Clear monthly reports on keyword rankings, traffic, and conversions so you always see what is working.'],
                  ]
              ).map(([title, body]) => (
                <div key={title} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold mb-2 text-blue-400">{title}</h3>
                  <p className="text-gray-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Local proof — named results with real numbers */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isKo ? '실제로 만든 결과' : 'Results We Actually Produced'}
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              {isKo
                ? '순위표 스크린샷 대신 매출과 예약 숫자로 보여드립니다. 아래는 모두 저희가 직접 작업한 뉴저지·뉴욕 지역 사업체입니다.'
                : 'Not ranking screenshots — revenue and booking numbers. Every business below is one we personally built and still maintain in the NJ/NY area.'}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {(isKo
                ? [
                    ['TJ Flowers · 맨해튼 꽃집', '하루 매출 $87 → $268', '쇼피파이 사이트를 다시 만들고 로컬 검색을 정리한 뒤 6주 만에 나온 숫자입니다. 광고비를 늘린 것이 아니라 검색으로 들어오는 주문이 늘었습니다.'],
                    ['Salt & Polish · 포트리 네일살롱', '웹사이트 + 온라인 예약 오픈', '구글 비즈니스 프로필과 예약 시스템을 연결해, 전화를 받지 못하는 시간에도 예약이 들어오도록 만들었습니다.'],
                    ['Vito\'s Pizza · 애틀랜타', '케이터링 문의 폼 가동', '메뉴 페이지와 케이터링 문의를 분리해 단체 주문 문의가 사이트에서 직접 들어옵니다.'],
                  ]
                : [
                    ['TJ Flowers · Manhattan florist', '$87 → $268 daily revenue', 'Six weeks after we rebuilt the Shopify storefront and cleaned up local search. No extra ad spend — the growth came from orders that found them through search.'],
                    ['Salt & Polish · Fort Lee nail salon', 'Website + online booking live', 'We connected the Google Business Profile to a booking system so appointments come in during the hours nobody can answer the phone.'],
                    ['Vito\'s Pizza · Atlanta', 'Catering inquiries flowing', 'Separating the catering request flow from the menu page turned the site into a source of group orders.'],
                  ]
              ).map(([name, metric, body]) => (
                <div key={name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-2xl font-bold text-blue-400 mb-2">{metric}</div>
                  <h3 className="text-base font-bold mb-3">{name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Published pricing — the thing competitors hide */}
        <section className="py-20 bg-[#0d0d1a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isKo ? '버겐카운티 SEO 비용' : 'What Bergen County SEO Costs With Us'}
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
              {isKo
                ? '견적을 받으려고 상담 전화부터 해야 하는 곳이 많습니다. 저희는 가격을 먼저 적어둡니다.'
                : 'Most agencies make you book a call before they will say a number. Here are ours, in writing.'}
            </p>
            <div className="space-y-4">
              {(isKo
                ? [
                    ['월간 SEO / GEO 최적화', '$50/월', '키워드 타겟팅, 지역 SEO 전략 실행, 콘텐츠 개선, ChatGPT 등 AI 검색 노출 유지 작업.'],
                    ['구글 비즈니스 프로필 관리', '$50/월', '사진·영업시간·게시물 정기 업데이트, 리뷰 응답. 로컬 검색(맵팩) 노출의 핵심입니다.'],
                    ['구글 광고 운영', '$200/월 (유지관리 플랜 이용 시)', '캠페인 설계와 월간 리포트 포함. 광고비는 사장님 계정에서 직접 나가 지출이 투명합니다.'],
                    ['웹사이트 제작', '$900부터 (일회성)', '검색에 잡히도록 만든 5페이지 사이트. 기본 SEO 설정과 구글 등록까지 포함됩니다.'],
                  ]
                : [
                    ['Monthly SEO / GEO optimization', '$50/mo', 'Keyword targeting, local SEO execution, content improvements, and upkeep for AI search visibility (ChatGPT, Perplexity, AI Overviews).'],
                    ['Google Business Profile management', '$50/mo', 'Photos, hours, posts, and review responses — the engine behind Map Pack visibility in Bergen County.'],
                    ['Google Ads management', '$200/mo with a care plan', 'Campaign build and monthly reporting. Ad budget stays on your own Google account, so spend is always visible to you.'],
                    ['Website build', 'from $900 one-time', 'A five-page site built to be found: SEO setup, schema, sitemap, and Google registration included.'],
                  ]
              ).map(([name, price, body]) => (
                <div key={name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-bold text-white">{name}</h3>
                    <div className="text-blue-400 font-bold mt-1">{price}</div>
                  </div>
                  <p className="text-gray-400 text-sm md:w-2/3 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm text-center mt-8">
              {isKo
                ? '순위나 매출을 보장하지 않습니다. SEO는 3~6개월 누적되어야 움직이며, 단기 순위를 보장하는 업체가 있다면 지킬 수 없는 약속입니다.'
                : 'We do not guarantee rankings or revenue. SEO compounds over three to six months, and any agency promising short-term rankings is promising something it cannot control.'}
            </p>
          </div>
        </section>

        {/* The 90-day plan — shows method, not adjectives */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isKo ? '첫 90일에 하는 일' : 'What the First 90 Days Look Like'}
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              {isKo
                ? '버겐카운티 소상공인 기준으로 저희가 실제로 밟는 순서입니다.'
                : 'The actual sequence we run for a Bergen County small business.'}
            </p>
            <div className="space-y-6">
              {(isKo
                ? [
                    ['1–30일 · 기반 정리', '구글 비즈니스 프로필 정보 통일(상호·주소·전화), 사이트 속도와 모바일 문제 수정, 지역 키워드 조사, Search Console·GA4 연결. 이 단계에서 이미 맵팩 노출이 움직이는 경우가 많습니다.'],
                    ['31–60일 · 지역 콘텐츠', '잉글우드·포트리·팰팍 등 실제 상권 단위로 페이지를 만들고, 업종 질문에 답하는 글을 발행합니다. 한국어와 영어 두 버전을 함께 만들어 두 검색 시장을 동시에 노립니다.'],
                    ['61–90일 · 신뢰 신호와 측정', '리뷰 요청 흐름을 만들고, 지역 디렉토리 정보를 맞추고, 어떤 키워드가 실제 문의로 이어졌는지 리포트로 정리합니다. 여기서부터 예산을 어디에 더 쓸지 숫자로 결정합니다.'],
                  ]
                : [
                    ['Days 1–30 · Foundation', 'Unify your Google Business Profile (name, address, phone), fix site speed and mobile issues, research local keywords, and connect Search Console and GA4. Map Pack visibility often moves during this phase alone.'],
                    ['Days 31–60 · Local content', 'Build pages around the neighborhoods you actually serve — Englewood, Fort Lee, Palisades Park — and publish answers to the questions your customers ask. Each one ships in English and Korean, so both search markets are covered.'],
                    ['Days 61–90 · Trust signals and measurement', 'Set up a review request flow, correct your listings across local directories, and report which keywords produced real inquiries. From here, budget decisions are made on numbers instead of guesses.'],
                  ]
              ).map(([title, body], i) => (
                <div key={title} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{title}</h3>
                    <p className="text-gray-400 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who we are the wrong / right fit for */}
        <section className="py-20 bg-[#0d0d1a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">
              {isKo ? '저희와 맞는 경우, 맞지 않는 경우' : 'Who We Fit — And Who We Do Not'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-blue-400/30">
                <h3 className="text-lg font-bold mb-4 text-blue-400">{isKo ? '잘 맞습니다' : 'Good fit'}</h3>
                <ul className="space-y-3 text-gray-400 text-sm leading-relaxed">
                  {(isKo
                    ? ['버겐카운티에서 손님이 직접 찾아오는 업종 (식당, 살롱, 병원, 세탁소, 학원)',
                       '영어와 한국어 손님을 모두 받는 사업체',
                       '월 $50~$200 사이에서 꾸준히 관리받고 싶은 소상공인',
                       '숫자로 보고받고 직접 판단하고 싶은 사장님']
                    : ['Bergen County businesses customers walk into — restaurants, salons, clinics, dry cleaners, academies',
                       'Businesses serving both English and Korean speaking customers',
                       'Owners who want steady management in the $50–$200/month range',
                       'Owners who want to see the numbers and decide for themselves']
                  ).map(t => <li key={t}>· {t}</li>)}
                </ul>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 text-gray-300">{isKo ? '맞지 않습니다' : 'Not a fit'}</h3>
                <ul className="space-y-3 text-gray-500 text-sm leading-relaxed">
                  {(isKo
                    ? ['한 달 안에 1페이지를 약속받고 싶은 경우 — 저희는 그런 약속을 하지 않습니다',
                       '저희가 만들지 않은 사이트의 응급 수리만 필요한 경우',
                       '전국 단위 대형 이커머스 SEO (저희는 로컬 전문입니다)',
                       '콘텐츠 승인에 참여할 시간이 전혀 없는 경우']
                    : ['Anyone who wants a promise of page one within a month — we do not make that promise',
                       'One-off emergency fixes on a website we did not build',
                       'National-scale enterprise ecommerce SEO — we work local',
                       'Owners with no time at all to approve content']
                  ).map(t => <li key={t}>· {t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#0d0d1a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white flex justify-between items-center gap-4">
                    <span>{f.q}</span>
                    <span className="text-blue-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-gray-400 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-[#111111]">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {isKo ? '관련 서비스' : 'Related Services'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href={`/${params.locale}/웹사이트-제작`}
                className="block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-blue-400">{isKo ? '웹사이트 제작' : 'Website Design'}</h3>
                <p className="text-gray-400 text-sm">
                  {isKo ? 'SEO에 강한 맞춤형 웹사이트 디자인 및 개발.' : 'Custom, SEO-ready website design and development.'}
                </p>
              </Link>
              <Link
                href={`/${params.locale}/광고대행`}
                className="block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-blue-400">{isKo ? '구글 광고 대행' : 'Google Ads Management'}</h3>
                <p className="text-gray-400 text-sm">
                  {isKo ? '구글 광고로 즉각적인 고객 유입을 만듭니다.' : 'Drive immediate leads with managed Google Ads.'}
                </p>
              </Link>
              <Link
                href={`/${params.locale}/bilingual-seo-new-york`}
                className="block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-blue-400">{isKo ? '뉴욕 이중언어 SEO' : 'Bilingual SEO New York'}</h3>
                <p className="text-gray-400 text-sm">
                  {isKo ? '영어/한국어 이중언어 SEO로 뉴욕 시장 공략.' : 'Reach the NY market with Korean + English SEO.'}
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#111111]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isKo ? '무료 SEO 상담 받기' : 'Get Your Free SEO Consultation'}
            </h2>
            <p className="text-gray-400 mb-8">
              {isKo ? '지금 바로 연락주세요. 100% 한국어 상담 가능합니다.' : 'Contact us today for a free SEO audit of your Englewood business website.'}
            </p>
            <Link
              href={`/${params.locale}/contact`}
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              {isKo ? '무료 상담 신청' : 'Free Consultation'}
            </Link>
          </div>
        </section>

        <Contact locale={params.locale} />
      </main>
      <Footer locale={params.locale} />
    </div>
  )
}
