import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import GuaranteeStrip from '@/components/sections/GuaranteeStrip'
import { AWS_PATHS, LOGISTICS_PATHS } from '@/data/enterprise'
import StartProjectForm from './StartProjectForm'

// ─────────────────────────────────────────────────────────────────────────────
// /pricing — the single published source of truth for prices.
// Same numbers live in public/pricing.md and public/llms.txt: keep in sync.
// Monthly: Basic $49 · Care $129 · Grow $199 (recommended) · Scale $499
// One-time builds: Basic $500–800 · Standard $1,100–1,500 · Store $1,800–2,400
// Premium builds: Premium $3,500–6,000 · Signature from $8,000
// Marketing: SEO from $500/mo · Google Ads standalone from $300/mo · KakaoTalk Channel $400 + $150/mo
// B2B & 3PL systems (from): B2B site + RFQ $3,500 · WMS data + dashboard $20,000 · EDI receive $8,000 ·
//   EDI two-way $19,000 · WMS file → API switch $6,000 · shipper portal quoted per scope
// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

type Tier = {
  name: string
  price: string
  tagline: { en: string; ko: string }
  forWho: { en: string; ko: string }
  includes: { en: string[]; ko: string[] }
  excludes?: { en: string; ko: string }
  recommended?: boolean
}

const MONTHLY_TIERS: Tier[] = [
  {
    name: 'Basic',
    price: '$49',
    tagline: { en: 'Hosting & protection only', ko: '호스팅·보안만' },
    forWho: { en: 'For owners who just need safe hosting', ko: '호스팅·보안만 필요한 분께' },
    includes: {
      en: ['Hosting + SSL', 'Security & backups', 'Uptime monitoring'],
      ko: ['호스팅 + SSL', '보안 · 백업', '모니터링'],
    },
    excludes: {
      en: 'No content edits — $75/hr or upgrade',
      ko: '콘텐츠 수정 없음 — $75/시간 또는 상위 플랜',
    },
  },
  {
    name: 'Care',
    price: '$129',
    tagline: { en: 'Maintenance + 2 edits a month', ko: '유지보수 + 월 2회 수정' },
    forWho: { en: 'For sites that need occasional edits', ko: '가끔 수정이 필요한 분께' },
    includes: {
      en: ['Everything in Basic', '2 content edits/mo (up to 30 min each)', 'Monthly report'],
      ko: ['Basic의 모든 기능', '월 2회 콘텐츠 수정 (회당 30분 이내)', '월간 리포트'],
    },
  },
  {
    name: 'Grow',
    price: '$199',
    tagline: { en: 'For sites that need to grow', ko: '성장이 필요한 사이트용' },
    forWho: { en: 'For owners investing in growth', ko: '검색 유입을 키우고 싶은 분께' },
    recommended: true,
    includes: {
      en: [
        'Everything in Care',
        '2 hrs content edits/mo',
        'GA4 analytics report',
        'SEO monitoring',
        'Google Business Profile management',
      ],
      ko: [
        'Care의 모든 기능',
        '월 2시간 수정',
        'GA4 분석 리포트',
        'SEO 모니터링',
        '구글 비즈니스 프로필(GBP) 관리',
      ],
    },
  },
  {
    name: 'Scale',
    price: '$499',
    tagline: { en: 'Content + local SEO engine', ko: '콘텐츠 + 로컬 SEO 엔진' },
    forWho: { en: 'For owners who want marketing handled', ko: '마케팅을 통째로 맡기실 분께' },
    includes: {
      en: [
        'Everything in Grow',
        '4 content pieces/mo (blog or social)',
        'Local SEO + review management',
        'Quarterly strategy session',
      ],
      ko: [
        'Grow의 모든 기능',
        '콘텐츠 제작 월 4회 (블로그·소셜)',
        '로컬 SEO + 리뷰 관리',
        '분기 전략 상담',
      ],
    },
  },
]

// Comparison table rows: [label, Basic, Care, Grow, Scale]
const COMPARE_ROWS: Array<{ label: { en: string; ko: string }; cells: [string, string, string, string] }> = [
  { label: { en: 'Hosting + SSL', ko: '호스팅 + SSL' }, cells: ['✓', '✓', '✓', '✓'] },
  { label: { en: 'Security & backups', ko: '보안 · 백업' }, cells: ['✓', '✓', '✓', '✓'] },
  { label: { en: 'Uptime monitoring', ko: '모니터링' }, cells: ['✓', '✓', '✓', '✓'] },
  { label: { en: 'Content edits', ko: '콘텐츠 수정' }, cells: ['—', '2 edits/mo', '2hrs/mo', '2hrs/mo'] },
  { label: { en: 'Monthly report', ko: '월간 리포트' }, cells: ['—', '✓', '✓', '✓'] },
  { label: { en: 'GA4 analytics report', ko: 'GA4 분석 리포트' }, cells: ['—', '—', '✓', '✓'] },
  { label: { en: 'SEO monitoring', ko: 'SEO 모니터링' }, cells: ['—', '—', '✓', '✓'] },
  { label: { en: 'Google Business Profile', ko: '구글 비즈니스 프로필 관리' }, cells: ['—', '—', '✓', '✓'] },
  { label: { en: '4 content pieces/mo', ko: '콘텐츠 제작 월 4회' }, cells: ['—', '—', '—', '✓'] },
  { label: { en: 'Local SEO + reviews', ko: '로컬 SEO + 리뷰 관리' }, cells: ['—', '—', '—', '✓'] },
  { label: { en: 'Quarterly strategy session', ko: '분기 전략 상담' }, cells: ['—', '—', '—', '✓'] },
]

const BUILD_TIERS = [
  {
    name: { en: 'Basic build', ko: '기본' },
    price: '$500–800',
    desc: { en: 'Up to 5 pages · responsive · basic SEO · contact form', ko: '5페이지 이하 · 반응형 · 기본 SEO · 문의 폼' },
  },
  {
    name: { en: 'Standard build', ko: '일반' },
    price: '$1,100–1,500',
    desc: { en: '6–15 pages · custom design · bilingual KO/EN · local SEO', ko: '6–15페이지 · 맞춤 디자인 · 한·영 이중언어 · 로컬 SEO' },
  },
  {
    name: { en: 'Store build', ko: '스토어' },
    price: '$1,800–2,400',
    desc: { en: 'Shopify / e-commerce · products & checkout · ordering or booking', ko: 'Shopify / 이커머스 · 상품·결제 · 주문·예약' },
  },
]

type L = { en: string; ko: string }

// Above the standard builds: the work clinics, multi-language brands and design-led clients actually buy.
const PREMIUM_TIERS: Array<{ name: L; price: string; forWho: L; timeline: L; includes: { en: string[]; ko: string[] } }> = [
  {
    name: { en: 'Premium', ko: '프리미엄' },
    price: '$3,500–6,000',
    forWho: { en: 'Clinics, professional practices, multi-language brands', ko: '병원·전문직 · 다국어 브랜드' },
    timeline: { en: 'Typically 4–6 weeks', ko: '보통 4–6주' },
    includes: {
      en: [
        '16–40 pages, up to 4 languages',
        'A detailed page per treatment or service (process · FAQ · summary)',
        'One custom interaction, such as picking a treatment on a tooth chart',
        'Naver Search Advisor + Google setup, industry structured data',
        'Copy written to advertising rules for your field',
        'Several design directions to choose from before the build',
      ],
      ko: [
        '16–40페이지 · 최대 4개 언어',
        '진료·서비스별 상세 페이지 (과정 · 자주 묻는 질문 · 요약)',
        '맞춤 인터랙션 1개 (예: 치아 그림에서 진료 고르기)',
        '네이버 서치어드바이저·구글 등록 · 업종 구조화 데이터',
        '업종 광고 기준에 맞춘 문구',
        '제작 전 여러 방향의 시안 중 선택',
      ],
    },
  },
  {
    name: { en: 'Signature', ko: '시그니처' },
    price: '$8,000+',
    forWho: { en: 'Brands that want a site people remember', ko: '기억에 남는 사이트가 필요한 브랜드' },
    timeline: { en: 'Typically 6–10 weeks', ko: '보통 6–10주' },
    includes: {
      en: [
        'Everything in Premium',
        'A design system and every page made to measure',
        'Cinematic scroll scenes (3D renders, image sequences)',
        'An admin panel your team edits in Korean or English',
        'Booking, payment and outside-system integrations',
        'Korean and English copywriting',
      ],
      ko: [
        '프리미엄의 모든 항목',
        '디자인 시스템과 모든 페이지 맞춤 제작',
        '스크롤 시네마틱 장면 (3D 렌더 · 이미지 시퀀스)',
        '한국어·영어로 직접 고치는 관리자 화면',
        '예약·결제·외부 시스템 연동',
        '한·영 카피라이팅',
      ],
    },
  },
]

// Ongoing marketing — the same figures public/pricing.md already published, now on the page too.
const GROWTH_SERVICES: Array<{ name: L; price: L; note: L; href: { en: string; ko: string } }> = [
  {
    name: { en: 'SEO retainer (local + bilingual)', ko: 'SEO 리테이너 (로컬 + 한·영)' },
    price: { en: 'from $500/mo', ko: '월 $500부터' },
    note: { en: 'Rankings, content and Google Business Profile', ko: '검색 순위 · 콘텐츠 · 구글 비즈니스 프로필' },
    href: { en: '/englewood-nj-seo', ko: '/ko/englewood-nj-seo' },
  },
  {
    name: { en: 'Google Ads management', ko: '구글 광고 운영' },
    price: { en: 'from $300/mo', ko: '월 $300부터' },
    note: { en: 'Standalone; +$150/mo as a care-plan add-on. Ad spend separate', ko: '단독 기준 · 관리 플랜 추가 시 월 +$150 · 광고비 별도' },
    href: { en: '/광고대행', ko: '/ko/광고대행' },
  },
  {
    name: { en: 'KakaoTalk Channel', ko: '카카오톡 채널' },
    price: { en: '$400 setup', ko: '셋업 $400' },
    note: { en: 'Optional management $150/mo', ko: '관리 선택 시 월 $150' },
    href: { en: '/services/kakaotalk-marketing-usa', ko: '/ko/services/kakaotalk-marketing-usa' },
  },
  {
    name: { en: 'Naver marketing (Korea)', ko: '네이버 마케팅 (한국)' },
    price: { en: 'Quoted per scope', ko: '범위별 견적' },
    note: { en: 'Naver Place, a brand blog, search ads', ko: '네이버 플레이스 · 브랜드 블로그 · 검색광고' },
    href: { en: '/services', ko: '/ko/services' },
  },
]

// B2B and logistics systems. Starting points from real scoped engagements; every project gets a fixed quote after
// an assessment, and cloud costs bill to the client's own AWS account.
const B2B_SYSTEMS: Array<{ name: L; detail: L; price: L }> = [
  {
    name: { en: 'B2B website + quote requests (RFQ)', ko: 'B2B 홈페이지 + 견적 요청(RFQ)' },
    detail: { en: 'Locations, capacity and services; RFQs routed to sales', ko: '거점·규모·서비스 정리, 견적 요청은 영업 담당자에게 바로' },
    price: { en: 'from $3,500', ko: '$3,500부터' },
  },
  {
    name: { en: 'WMS data + operations dashboard', ko: 'WMS 데이터 연동 + 운영 대시보드' },
    detail: {
      en: 'Read-only first; one screen across warehouses, even on different WMSs (API or scheduled reports)',
      ko: '읽기 전용으로 시작 · 서로 다른 WMS의 여러 창고를 한 화면에 (API 또는 정기 리포트)',
    },
    price: { en: 'from $20,000', ko: '$20,000부터' },
  },
  {
    name: { en: 'EDI integration: receive', ko: 'EDI 연동 · 수신' },
    detail: { en: 'Copies of 944 / 945 (receipts, shipments) read into the same data', ko: '944·945(입고·출고) 사본을 같은 데이터로 읽어들임' },
    price: { en: 'from $8,000', ko: '$8,000부터' },
  },
  {
    name: { en: 'EDI integration: two-way', ko: 'EDI 연동 · 양방향' },
    detail: { en: 'Adds sending 940 / 943 with an approval step and staged rollout', ko: '940·943 발신 추가 · 승인 단계와 단계적 적용' },
    price: { en: 'from $19,000', ko: '$19,000부터' },
  },
  {
    name: { en: 'Move a WMS feed from files to its API', ko: 'WMS 연결을 파일에서 API로 전환' },
    detail: { en: 'When the WMS publishes an API, the same data switches over', ko: 'WMS가 API를 열면 같은 데이터를 API로 전환' },
    price: { en: 'from $6,000', ko: '$6,000부터' },
  },
  {
    name: { en: 'Shipper (customer) portal', ko: '화주용 고객 포털' },
    detail: { en: 'Your brand; each shipper sees only its own inventory and orders', ko: '우리 회사 브랜드 · 화주별로 자기 재고·주문만' },
    price: { en: 'Quoted per scope', ko: '범위별 견적' },
  },
]

const FAQS: Array<{ q: { en: string; ko: string }; a: { en: string; ko: string } }> = [
  {
    q: { en: 'Which plan should I choose?', ko: '어떤 플랜을 선택해야 하나요?' },
    a: {
      en: 'Most small businesses are best served by Grow at $199/month, because it combines content edits, a GA4 report, SEO monitoring, and Google Business Profile management. Choose Basic ($49) if you only need safe hosting, Care ($129) if you need occasional edits, and Scale ($499) if you want content and local SEO fully handled for you.',
      ko: '대부분의 소상공인에게는 월 $199 Grow 플랜이 가장 잘 맞습니다. 콘텐츠 수정, GA4 리포트, SEO 모니터링, 구글 비즈니스 프로필 관리가 모두 포함되기 때문입니다. 호스팅·보안만 필요하면 Basic($49), 가끔 수정이 필요하면 Care($129), 콘텐츠와 로컬 SEO까지 통째로 맡기시려면 Scale($499)을 선택하세요.',
    },
  },
  {
    q: { en: 'How do I cancel a monthly plan?', ko: '월 플랜 해지는 어떻게 하나요?' },
    a: {
      en: 'You can cancel any monthly plan at any time with a single email or KakaoTalk message — service continues through the month you already paid for, and nothing is billed after that. There is no long-term lock-in unless you chose the 12-month commitment that waives the build setup fee.',
      ko: '월 관리 플랜은 이메일이나 카카오톡 한 통으로 언제든 해지할 수 있습니다. 결제한 달까지 서비스가 그대로 유지되며, 이후 추가 청구는 없습니다. 셋업비 면제를 위한 12개월 약정을 선택하지 않았다면 장기 계약 부담이 전혀 없습니다.',
    },
  },
  {
    q: { en: 'What are the conditions for the setup-fee waiver?', ko: '셋업비 면제 조건이 무엇인가요?' },
    a: {
      en: 'The website build setup fee is waived when you commit to any monthly care plan for 12 months. In other words, instead of paying the one-time build cost ($500–$2,400 depending on scope) upfront, you start with a monthly plan and we build the site as part of the engagement. The waiver covers the Basic, Standard and Store builds; Premium, Signature and B2B systems are billed as projects.',
      ko: '월 관리 플랜을 12개월 약정하면 웹사이트 제작 셋업비가 면제됩니다. 즉 일회성 제작비(범위에 따라 $500–$2,400)를 선불로 내는 대신, 월 플랜으로 시작하면 제작을 약정에 포함해 진행해 드립니다. 면제는 기본·일반·스토어 제작에 적용되며, 프리미엄·시그니처·B2B 시스템은 프로젝트 비용으로 따로 청구됩니다.',
    },
  },
  {
    q: { en: 'Can you take over an existing website?', ko: '기존 사이트도 이전해서 관리할 수 있나요?' },
    a: {
      en: 'Yes — we migrate existing sites from OpenCart, older WordPress, Wix, Squarespace, and similar platforms, then run them on a monthly care plan. Your domain and code stay 100% in your name during and after the migration, so you can leave anytime.',
      ko: '네, 가능합니다. OpenCart, 구형 워드프레스, Wix, Squarespace 등에서 운영 중인 기존 사이트를 이전한 뒤 월 관리 플랜으로 운영해 드립니다. 이전 과정과 이후에도 도메인과 코드는 100% 고객 명의로 유지되므로 언제든 떠나실 수 있습니다.',
    },
  },
  {
    q: { en: 'What does a one-time build include?', ko: '일회성 제작비에는 무엇이 포함되나요?' },
    a: {
      en: 'A Basic build at $500–800 includes up to 5 responsive pages, basic SEO, and a contact form. Standard at $1,100–1,500 adds custom design, bilingual Korean/English, and local SEO for 6–15 pages. A Store build at $1,800–2,400 covers Shopify or e-commerce with products, checkout, and ordering or booking. Two revision rounds per phase are included in every build.',
      ko: '기본 제작($500–800)에는 5페이지 이하 반응형 웹사이트, 기본 SEO, 문의 폼이 포함됩니다. 일반($1,100–1,500)은 6–15페이지에 맞춤 디자인, 한·영 이중언어, 로컬 SEO가 더해지고, 스토어($1,800–2,400)는 Shopify/이커머스 상품·결제·주문/예약까지 포함합니다. 모든 제작에는 단계별 수정 2회가 기본 포함됩니다.',
    },
  },
  {
    q: { en: 'How are Premium and Signature different from a Standard build?', ko: '프리미엄·시그니처는 일반 제작과 무엇이 다른가요?' },
    a: {
      en: 'Premium ($3,500–6,000) is for clinics, professional practices and brands that need more pages and languages: 16–40 pages in up to 4 languages, a detailed page for every treatment or service, one custom interaction, Naver and Google setup with industry structured data, and several design directions before the build. Signature (from $8,000) makes every page to measure on its own design system, adds cinematic scroll scenes, an admin panel your team edits in Korean or English, and booking, payment or outside-system integrations.',
      ko: '프리미엄($3,500–6,000)은 페이지와 언어가 많은 병원·전문직·브랜드를 위한 제작입니다. 최대 4개 언어 16–40페이지, 진료·서비스별 상세 페이지, 맞춤 인터랙션 1개, 네이버·구글 등록과 업종 구조화 데이터, 제작 전 여러 방향의 시안이 포함됩니다. 시그니처($8,000부터)는 디자인 시스템부터 모든 페이지를 맞춤으로 만들고, 스크롤 시네마틱 장면, 한국어·영어로 직접 고치는 관리자 화면, 예약·결제·외부 시스템 연동까지 더합니다.',
    },
  },
  {
    q: { en: 'How are B2B and logistics (3PL) systems priced?', ko: 'B2B·물류(3PL) 시스템 비용은 어떻게 정해지나요?' },
    a: {
      en: 'They start from published floors: a B2B website with quote requests from $3,500, WMS data with an operations dashboard from $20,000, EDI receive from $8,000 and two-way EDI from $19,000. The final price is fixed after an assessment of your WMS, partners and data. Most clients start read-only with one dashboard and add a shipper portal and EDI in phases. Cloud costs bill to your own AWS account.',
      ko: '공개된 시작가가 있습니다. 견적 요청이 되는 B2B 홈페이지 $3,500부터, WMS 데이터 연동과 운영 대시보드 $20,000부터, EDI 수신 $8,000부터, 양방향 EDI $19,000부터입니다. 최종 금액은 사용 중인 WMS, 거래처, 데이터 범위를 진단한 뒤 고정 견적으로 확정합니다. 대부분 읽기 전용 대시보드 하나로 시작해 화주 포털과 EDI를 단계적으로 더합니다. 클라우드 비용은 고객사 명의 AWS 계정으로 직접 청구됩니다.',
    },
  },
]

export default function PricingPage({ params }: { params: { locale: string } }) {
  const locale: 'en' | 'ko' = params.locale === 'ko' ? 'ko' : 'en'
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale] },
    })),
  }

  const t = {
    eyebrow: isKo ? '투명한 가격' : 'Transparent pricing',
    headline: isKo ? '가격표, 여기 다 있습니다.' : 'The full price list. Right here.',
    sub: isKo
      ? '견적 문의 뒤에 가격을 숨기지 않습니다. 월 관리 플랜과 제작 비용 전부 공개 — 최종 견적은 무료 상담에서 범위에 맞춰 확정됩니다.'
      : 'No "request a quote" wall. Every monthly plan and build price is published — the final quote is confirmed to your scope in a free consultation.',
    monthlyTitle: isKo ? '월 관리 플랜' : 'Monthly care plans',
    monthlySub: isKo
      ? '호스팅부터 마케팅까지, 필요한 만큼만. 12개월 약정 시 웹사이트 제작 셋업비 면제.'
      : 'From hosting to marketing — pay only for what you need. A 12-month commitment waives the website build setup fee.',
    recommended: isKo ? '★ 추천' : '★ Recommended',
    perMonth: isKo ? '/월' : '/mo',
    addons: isKo
      ? '애드온: 구글 광고 운영 +$150~/월 (플랜 없이 단독 운영은 월 $300~, 셋업 무료) · 예약 시스템 관리 +$50/월 · 추가 수정 $75/시간'
      : 'Add-ons: Google Ads management +$150~/mo (standalone without a plan from $300/mo, free setup) · booking system care +$50/mo · extra edits $75/hr',
    compareTitle: isKo ? '플랜 비교' : 'Compare plans',
    buildTitle: isKo ? '일회성 제작 비용' : 'One-time build pricing',
    buildSub: isKo
      ? '한 번에 제작하고 소유하세요. 월 관리 플랜을 12개월 약정하면 아래 셋업비가 면제됩니다.'
      : 'Build once, own it. Commit to any monthly care plan for 12 months and the setup fee below is waived.',
    buildNote: isKo
      ? '범위에 따라 달라집니다 — 30초 만에 내 프로젝트 예상 견적 보기 →'
      : 'Varies by scope — get your own 30-second estimate →',
    estimatorLink: isKo ? '무료 견적 계산기' : 'Free cost estimator',
    premiumTitle: isKo ? '프리미엄 제작' : 'Premium builds',
    premiumSub: isKo
      ? '페이지와 언어가 많은 병원·전문직, 그리고 디자인으로 기억되고 싶은 브랜드를 위한 제작입니다. 범위가 큰 만큼 시안과 인터랙션, 검수에 시간을 더 씁니다.'
      : 'For clinics and practices with more pages and languages, and for brands that want to be remembered for their design. Bigger scope, more time on design directions, interaction and review.',
    premiumCta: isKo ? '상담하기' : 'Talk to us',
    growthTitle: isKo ? '마케팅 · 성장 서비스' : 'Marketing and growth',
    growthSub: isKo
      ? '사이트를 만든 뒤 손님을 데려오는 일. 관리 플랜과 따로, 또는 함께 쓰실 수 있습니다.'
      : 'Bringing customers to the site after launch, on its own or alongside a care plan.',
    b2bTitle: isKo ? 'B2B · 물류(3PL) 시스템' : 'B2B and logistics (3PL) systems',
    b2bSub: isKo
      ? 'B2B 홈페이지부터 WMS·EDI 연동, 운영 대시보드, 화주 포털까지. 실제 진행한 프로젝트 범위를 기준으로 시작가를 공개합니다.'
      : 'From a B2B website to WMS and EDI integration, operations dashboards and shipper portals. Starting prices come from real scoped engagements.',
    b2bNote: isKo
      ? '시작가 기준입니다. 사용 중인 WMS·거래처·데이터 범위를 진단한 뒤 고정 견적으로 확정하며, 클라우드 비용은 고객사 명의 AWS 계정으로 직접 청구됩니다.'
      : 'Starting prices. A fixed quote follows an assessment of your WMS, partners and data; cloud costs bill to your own AWS account.',
    guaranteeTitle: isKo ? '저희가 지키는 약속' : 'What we guarantee',
    guaranteeSub: isKo
      ? '과장 없이, 이미 모든 프로젝트에 적용되는 원칙만 적었습니다.'
      : 'No inflated promises — only the policies already applied to every project.',
    faqTitle: isKo ? '자주 묻는 질문' : 'Frequently asked questions',
    ctaTitle: isKo ? '어떤 플랜이 맞는지 모르시겠어요?' : 'Not sure which plan fits?',
    ctaSub: isKo
      ? '무료 상담에서 15분이면 정리됩니다. 이메일 또는 카카오톡으로 편하게 문의하세요.'
      : 'A free 15-minute consultation sorts it out. Reach us by email or KakaoTalk.',
    ctaContact: isKo ? '무료 상담 신청' : 'Book a free consultation',
    ctaEstimator: isKo ? '견적 계산기 써보기' : 'Try the cost estimator',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen bg-ivory pt-28 pb-24 relative overflow-hidden">
        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,113,227,0.06),transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">

          {/* ── Hero ── */}
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] font-black text-link tracking-[0.25em] uppercase mb-4">{t.eyebrow}</p>
            <h1 className="text-5xl md:text-6xl font-black text-ink leading-[0.98] tracking-tight mb-5">
              {t.headline}
            </h1>
            <p className="text-ash text-base leading-relaxed max-w-xl">{t.sub}</p>
          </div>

          {/* ── Monthly tiers ── */}
          <section aria-label={t.monthlyTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-ink mb-2">{t.monthlyTitle}</h2>
            <p className="text-ash text-sm mb-8 max-w-2xl">{t.monthlySub}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MONTHLY_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-6 border flex flex-col ${
                    tier.recommended
                      ? 'bg-action/[0.08] border-action/50 shadow-[0_0_30px_rgba(0,113,227,0.12)]'
                      : 'bg-paper border-ink/10'
                  }`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-6 bg-action text-white text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full">
                      {t.recommended}
                    </span>
                  )}
                  <h3 className="text-lg font-black text-ink mb-1">{tier.name}</h3>
                  <p className="text-mute text-xs mb-4">{tier.tagline[locale]}</p>
                  <p className="mb-1">
                    <span className={`text-4xl font-black ${tier.recommended ? 'text-link' : 'text-ink'}`}>{tier.price}</span>
                    <span className="text-ash text-sm ml-1">{t.perMonth}</span>
                  </p>
                  <p className="text-[12px] text-ash font-medium mb-5">{tier.forWho[locale]}</p>
                  <ul className="space-y-2.5 mb-5 flex-1">
                    {tier.includes[locale].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-graphite leading-snug">
                        <span className="text-green-400 mt-[1px]" aria-hidden>✓</span>
                        {item}
                      </li>
                    ))}
                    {tier.excludes && (
                      <li className="flex items-start gap-2 text-[13px] text-mute leading-snug">
                        <span className="mt-[1px]" aria-hidden>✕</span>
                        {tier.excludes[locale]}
                      </li>
                    )}
                  </ul>
                  <Link
                    href={`${prefix}/contact`}
                    className={`block text-center rounded-xl px-4 py-2.5 text-[13px] font-bold transition-colors ${
                      tier.recommended
                        ? 'bg-action text-white hover:bg-[#0077ED]'
                        : 'bg-ink/[0.04] text-graphite border border-ink/10 hover:bg-bone hover:text-ink'
                    }`}
                  >
                    {isKo ? '이 플랜으로 상담' : 'Talk about this plan'}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-mute text-[12px] mt-5">{t.addons}</p>
          </section>

          {/* ── Comparison table ── */}
          <section aria-label={t.compareTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-ink mb-6">{t.compareTitle}</h2>
            <div className="overflow-x-auto rounded-2xl border border-ink/10">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="bg-paper">
                    <th scope="col" className="px-5 py-4 text-[12px] uppercase tracking-widest text-ash font-bold">
                      <span className="sr-only">{isKo ? '항목' : 'Feature'}</span>
                    </th>
                    {MONTHLY_TIERS.map((tier) => (
                      <th key={tier.name} scope="col" className="px-4 py-4 text-center">
                        <span className={`block text-sm font-black ${tier.recommended ? 'text-link' : 'text-ink'}`}>
                          {tier.name}{tier.recommended ? ' ★' : ''}
                        </span>
                        <span className="block text-[12px] text-ash font-medium mt-0.5">
                          {tier.price}{t.perMonth}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-ink/[0.04]'}>
                      <th scope="row" className="text-left px-5 py-3 text-[13px] text-graphite font-medium whitespace-nowrap">
                        {row.label[locale]}
                      </th>
                      {row.cells.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 text-center text-[13px] ${
                            cell === '—' ? 'text-mute' : cell === '✓' ? 'text-green-400' : 'text-graphite'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Per-tier "for who" row */}
                  <tr className="bg-paper">
                    <th scope="row" className="text-left px-5 py-3.5 text-[12px] uppercase tracking-widest text-mute font-bold whitespace-nowrap">
                      {isKo ? '이런 분께' : 'Best for'}
                    </th>
                    {MONTHLY_TIERS.map((tier) => (
                      <td key={tier.name} className="px-4 py-3.5 text-center text-[12px] text-ash leading-snug">
                        {tier.forWho[locale]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── One-time builds ── */}
          <section aria-label={t.buildTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-ink mb-2">{t.buildTitle}</h2>
            <p className="text-ash text-sm mb-8 max-w-2xl">{t.buildSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BUILD_TIERS.map((b) => (
                <div key={b.price} className="rounded-2xl p-6 bg-paper border border-ink/10">
                  <p className="text-[12px] uppercase tracking-[0.2em] text-ash font-black mb-2">{b.name[locale]}</p>
                  <p className="text-3xl font-black text-ink mb-3">{b.price}</p>
                  <p className="text-[13px] text-ash leading-relaxed">{b.desc[locale]}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-[13px] text-link font-bold m-0">
                {isKo ? '12개월 약정 시 셋업비 면제' : '12-month care-plan commitment waives the setup fee'}
              </p>
              <span className="hidden sm:block text-mute">·</span>
              <Link
                href={`${prefix}/tools/website-cost-estimator`}
                className="text-[13px] text-ash underline underline-offset-4 hover:text-ink transition-colors"
              >
                {t.buildNote}
              </Link>
            </div>
          </section>

          {/* ── Premium builds ── */}
          <section id="premium" aria-label={t.premiumTitle} className="mb-20 scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-black text-ink mb-2">{t.premiumTitle}</h2>
            <p className="text-ash text-sm mb-8 max-w-2xl">{t.premiumSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PREMIUM_TIERS.map((p, i) => (
                <div
                  key={p.price}
                  className={`relative rounded-2xl p-7 md:p-9 border flex flex-col ${
                    i === 1
                      ? 'border-ink/25 bg-[linear-gradient(155deg,rgb(var(--c-ink)/0.07),transparent_55%)]'
                      : 'border-ink/10 bg-paper'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-lg font-black text-ink m-0">{p.name[locale]}</h3>
                    <span className="text-[12px] text-ash">{p.timeline[locale]}</span>
                  </div>
                  <p className="text-4xl md:text-5xl font-black text-ink tracking-tight tabular-nums mb-2">{p.price}</p>
                  <p className="text-[13px] text-ash mb-7">{p.forWho[locale]}</p>
                  <ul className="space-y-3 mb-8 flex-1 list-none p-0">
                    {p.includes[locale].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] text-graphite leading-snug">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-link" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`${prefix}/contact`} className="btn-outline justify-center min-h-[44px] text-[14px]">
                    {p.name[locale]} {t.premiumCta}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── Marketing and growth ── */}
          <section aria-label={t.growthTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-ink mb-2">{t.growthTitle}</h2>
            <p className="text-ash text-sm mb-8 max-w-2xl">{t.growthSub}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
              {GROWTH_SERVICES.map((g) => (
                <li key={g.name.en} className="flex">
                  <Link href={g.href[locale]} className="kn-card group flex w-full items-start justify-between gap-6 p-6">
                    <span>
                      <span className="block text-[15px] font-bold text-ink">{g.name[locale]}</span>
                      <span className="block mt-1 text-[13px] text-ash leading-snug">{g.note[locale]}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-[15px] font-black text-ink tabular-nums">{g.price[locale]}</span>
                      <span aria-hidden className="inline-block mt-2 text-ash transition-transform duration-300 group-hover:translate-x-1 group-hover:text-link">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ── B2B and logistics systems ── */}
          <section id="b2b" aria-label={t.b2bTitle} className="mb-20 scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-black text-ink mb-2">{t.b2bTitle}</h2>
            <p className="text-ash text-sm mb-8 max-w-2xl">{t.b2bSub}</p>
            <div className="rounded-2xl border border-ink/10 bg-paper overflow-hidden">
              <ul className="divide-y divide-ink/10 list-none m-0 p-0">
                {B2B_SYSTEMS.map((s) => (
                  <li key={s.name.en} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 md:gap-10 px-6 py-5">
                    <div>
                      <p className="text-[15px] font-bold text-ink m-0">{s.name[locale]}</p>
                      <p className="text-[13px] text-ash leading-snug mt-1 mb-0">{s.detail[locale]}</p>
                    </div>
                    <p className="text-[15px] font-black text-ink tabular-nums m-0 md:self-center md:text-right whitespace-nowrap">
                      {s.price[locale]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-[13px] text-ash max-w-3xl">
              {t.b2bNote}{' '}
              <Link href={isKo ? LOGISTICS_PATHS.ko : LOGISTICS_PATHS.en} className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink">
                {isKo ? '물류·3PL 시스템 자세히' : 'Logistics & 3PL systems'}
              </Link>
              {' · '}
              <Link href={isKo ? AWS_PATHS.ko : AWS_PATHS.en} className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink">
                {isKo ? 'AWS·API 연동' : 'AWS and API integration'}
              </Link>
            </p>
          </section>

          {/* ── Guarantee ── */}
          <section aria-label={t.guaranteeTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-ink mb-2">{t.guaranteeTitle}</h2>
            <p className="text-ash text-sm mb-8 max-w-2xl">{t.guaranteeSub}</p>
            <GuaranteeStrip locale={locale} variant="full" />
          </section>

          {/* ── FAQ ── */}
          <section aria-label={t.faqTitle} className="mb-20 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-ink mb-8">{t.faqTitle}</h2>
            <ul className="space-y-3 m-0 p-0 list-none">
              {FAQS.map((f, i) => (
                <li key={i}>
                  <details className="group rounded-2xl bg-paper border border-ink/10 px-6 py-5">
                    <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                      <h3 className="text-[15px] font-bold text-ink m-0 leading-snug group-open:text-link transition-colors">
                        {f.q[locale]}
                      </h3>
                      <span aria-hidden className="text-mute text-xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-[14px] text-ash leading-[1.75] m-0">{f.a[locale]}</p>
                  </details>
                </li>
              ))}
            </ul>
          </section>

          {/* ── CTA ── */}
          <section className="mb-24 rounded-2xl border border-action/30 bg-action/[0.06] px-8 py-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-ink mb-3">{t.ctaTitle}</h2>
            <p className="text-ash text-base mb-8 max-w-xl mx-auto">{t.ctaSub}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center gap-2 bg-action text-white font-black px-8 py-4 rounded-xl text-sm hover:bg-[#0077ED] transition-colors"
              >
                {t.ctaContact} →
              </Link>
              <Link
                href={`${prefix}/tools/website-cost-estimator`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-ink/[0.04] border border-ink/10 text-graphite hover:bg-bone hover:text-ink transition text-sm font-bold"
              >
                {t.ctaEstimator}
              </Link>
            </div>
          </section>

          {/* ── Existing 2-step custom-plan form (kept as final section) ── */}
          <section id="start" className="pt-4 border-t border-ink/10">
            <div className="pt-16">
              <StartProjectForm locale={locale} />
            </div>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
