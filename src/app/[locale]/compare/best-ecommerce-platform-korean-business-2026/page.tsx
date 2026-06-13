import { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { SITE_URL } from '@/lib/siteUrl'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const baseUrl = SITE_URL
  const enUrl = `${baseUrl}/compare/best-ecommerce-platform-korean-business-2026`
  const koUrl = `${baseUrl}/ko/compare/best-ecommerce-platform-korean-business-2026`

  if (locale === 'ko') {
    return {
      title: '한인 비즈니스 이커머스 플랫폼 비교 [2026] — Shopify vs Squarespace vs Wix vs 커스텀',
      description: '미국 한인 비즈니스 최고 이커머스 플랫폼 — Shopify, Squarespace, Wix, Next.js 커스텀 정직한 비교. 실제 비용, Korean 결제 통합, 이중언어 지원, 실 케이스 (TJ Flowers 5배 검색 노출). 2026년 의사결정 프레임워크.',
      keywords: 'shopify vs squarespace 한인, 한인 비즈니스 이커머스 플랫폼, 한인 쇼핑몰 플랫폼, korean shopify, 한인 사장님 쇼핑몰, 이커머스 플랫폼 비교 2026',
      alternates: { canonical: koUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
      openGraph: {
        title: '한인 비즈니스 이커머스 플랫폼 비교 [2026]',
        description: 'Shopify vs Squarespace vs Wix vs 커스텀 — 한인 비즈니스 정직한 비교 + 실 케이스.',
        url: koUrl,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
        images: [{ url: `${baseUrl}/api/og?title=%ED%95%9C%EC%9D%B8+%EC%9D%B4%EC%BB%A4%EB%A8%B8%EC%8A%A4+%ED%94%8C%EB%9E%AB%ED%8F%BC+%EB%B9%84%EA%B5%90&subtitle=Zoe+Lumos+%C2%B7+2026`, width: 1200, height: 630 }],
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Best E-Commerce Platform for Korean Businesses 2026 — Shopify vs Squarespace vs Wix vs Custom',
    description: 'The honest 2026 comparison for US Korean-American businesses choosing an e-commerce platform. Real pricing, Korean payment integration, bilingual support, and a verified case (TJ Flowers 5×\'d search visibility on Shopify). Decision framework + verdict by use case.',
    keywords: 'best ecommerce platform korean business, shopify vs squarespace korean, shopify expert korean, korean american shopify, ecommerce platform comparison 2026, shopify vs wix korean restaurant, korean business website platform, shopify vs squarespace vs wix korean',
    alternates: { canonical: enUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: 'Best E-Commerce Platform for Korean Businesses 2026',
      description: 'Honest Shopify vs Squarespace vs Wix vs Custom comparison for Korean-American businesses. Real pricing + verified case studies.',
      url: enUrl,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
      images: [{ url: `${baseUrl}/api/og?title=Best+E-Commerce+Platform+for+Korean+Businesses&subtitle=Zoe+Lumos+%C2%B7+2026+Comparison`, width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

const COPY = {
  en: {
    eyebrow: 'Comparison · Updated May 2026',
    h1Lead: 'Best E-Commerce Platform',
    h1Sub: 'for Korean Businesses [2026]',
    updated: 'Last updated: May 30, 2026 · Methodology + author disclosed at bottom',
    intro: 'Korean-American business owners get pitched a different "best e-commerce platform" every week — by their nephew, their accountant, their POS vendor, every freelancer who has built two Shopify stores. This page is the honest 2026 comparison from a Shopify Expert + Korean-American studio that has shipped 60+ sites and run real conversion measurements on each platform. No affiliate links. No "this one is amazing" hedging. A real verdict for each use case, plus the proof points behind it.',
    verdictTitle: 'Quick verdict — pick by use case',
    verdicts: [
      { use: 'Korean restaurant / cafe / bakery', winner: 'Shopify (with native reservation) OR Squarespace', why: 'Shopify if takeout/delivery > 30% of revenue, Squarespace if booking/visual matters more than transactions' },
      { use: 'Korean salon / spa / medspa', winner: 'Squarespace + Square Appointments OR Next.js custom', why: 'Visual portfolio + booking integration are the conversion drivers' },
      { use: 'Korean retail / fashion / beauty product line', winner: 'Shopify, no contest', why: 'Inventory, multi-currency, Korean payments, abandoned cart recovery all native' },
      { use: 'Korean professional service (law, dental, RE, finance)', winner: 'Next.js custom OR WordPress', why: 'Forms, intake compliance, schema markup matter more than checkout' },
      { use: 'Korean publication / media / blog', winner: 'Next.js custom OR Ghost', why: 'Editorial CMS + bilingual hreflang + fast TTFB beat any builder' },
      { use: 'Korean church / nonprofit', winner: 'Squarespace OR Wix', why: 'Owner self-edit + giving integration matter more than performance' },
    ],
    matrixTitle: 'Full comparison matrix',
    matrixIntro: 'All data verified May 2026 from each platform\'s pricing page and from our own builds. Korean-specific notes added based on 60+ launched Korean-American SMB sites.',
    matrix: {
      headers: ['Criteria', 'Shopify', 'Squarespace', 'Wix', 'Next.js Custom'],
      rows: [
        ['Monthly cost (starting)', '$39', '$23', '$17', '$0 base + $0–20 hosting'],
        ['Monthly cost (typical Korean SMB)', '$79 + apps $200-400', '$30–65', '$27', '$0–20'],
        ['Setup time (DIY)', '5–14 days', '3–7 days', '2–5 days', 'Not DIY-friendly'],
        ['Setup time (with agency)', '4–8 weeks', '2–4 weeks', '1–3 weeks', '4–10 weeks'],
        ['Native Korean bilingual support', 'Plugins required', 'Plugins required', 'Plugins required', 'Native (proper hreflang)'],
        ['Korean payment processors', 'Via Shopify Payments + Stripe', 'Limited', 'Limited', 'Any (custom integration)'],
        ['KakaoTalk integration', 'Via custom Liquid', 'Embed only', 'Embed only', 'Native API'],
        ['Native reservation/booking', 'Via Square Appointments', 'Built-in (Squarespace Acuity)', 'Wix Bookings (built-in)', 'Any (custom)'],
        ['Page speed (avg LCP)', '2.0–3.5s', '2.5–4.0s', '3.0–5.0s', '0.8–1.5s'],
        ['SEO control (schema, hreflang, canonical)', 'Strong, some app hacks', 'Limited customization', 'Limited customization', 'Total control'],
        ['App marketplace size', '8,000+ apps', '~200 extensions', '~300 apps', 'NPM ecosystem (millions)'],
        ['Customizability', 'High (Liquid)', 'Low–Medium', 'Low–Medium', 'Unlimited'],
        ['You own the code', 'No (Shopify hosted)', 'No (Squarespace hosted)', 'No (Wix hosted)', 'Yes (your repo)'],
        ['Best for Korean SMB owner who...', 'Sells products + needs inventory', 'Needs beautiful + simple', 'Has $300/mo total budget', 'Needs performance + control'],
      ],
    },
    platformsTitle: 'Platform deep dives — Korean SMB lens',
    shopifyTitle: 'Shopify — the e-commerce winner if you sell products',
    shopifyBody: 'Shopify is the obvious choice for any Korean-American business where product sales drive revenue. Strengths — biggest app marketplace (8,000+), native multi-currency for KRW/USD, Shopify Payments handles cards + Apple Pay + Google Pay + Shop Pay, abandoned cart recovery is native, Liquid theme language is powerful enough to handle custom Korean payment processors and KakaoTalk integration. Real proof — TJ Flowers (Manhattan florist) rebuilt on Shopify in spring 2026, hit 5× search visibility in 6 weeks and $268/day in daily revenue (vs $87/day on the old OpenCart). Weaknesses — monthly cost compounds with apps (typical $200-400/mo on apps alone — see our cost audit service), bilingual requires plugins (Langify, Weglot) that add $20-50/mo each, hosted environment means you cannot deeply customize the checkout without Plus tier ($2K+/mo).',
    shopifyLink: '/blog/tj-flowers-shopify-revamp-case-study',
    shopifyLinkLabel: 'Read the TJ Flowers Shopify case study →',
    squarespaceTitle: 'Squarespace — for visual-first Korean salons, cafes, services',
    squarespaceBody: 'Squarespace is the right choice when the visual portfolio + appointment booking matter more than transactional commerce. Strengths — Squarespace Acuity booking is native (no extra cost), templates render beautifully out of the box, owners can self-edit without breaking the design, $30-65/mo total is sustainable for an owner-managed site. Weaknesses — Korean bilingual support requires Weglot or similar third-party tool that adds $24-49/mo, page speed is moderate (3-4s LCP typical, vs 1-1.5s on Next.js), schema markup customization is limited, you cannot do deep KakaoTalk Channel integration beyond an embed. Most Korean salon and small spa owners we work with end up on Squarespace + Square Appointments + a Korean-language Weglot translation layer.',
    wixTitle: 'Wix — only if budget is the absolute hard constraint',
    wixBody: 'Wix is the cheapest of the hosted options at $17-27/mo. It works for a Korean owner who needs an online presence but cannot allocate $1,500+ to a real build. Strengths — drag-and-drop editor is the easiest of the three hosted platforms, Wix Bookings is built-in, hosting + SSL + basic SEO are all included. Weaknesses — page speed is the worst of the four (3-5s LCP typical), templates are dated and hard to escape, SEO customization is limited (cannot edit robots.txt, limited schema), the URL structure is not always clean (often /pages/category-name-456). For most Korean SMBs we audit, moving off Wix to Squarespace or Shopify lifts conversion 2-4x within 90 days.',
    nextjsTitle: 'Next.js custom — for performance, control, or publications',
    nextjsBody: 'Next.js custom builds are what Zoe Lumos uses for ~65-75% of Korean SMB clients. Strengths — sub-1.5s LCP (huge SEO and AI-search advantage), total control over schema markup and hreflang (the cleanest bilingual implementation), native KakaoTalk/Naver/Korean payment integrations, you own the code and can move hosts anytime, no monthly platform fee (just Vercel hosting at $0-20/mo). The Miguk Story editorial publication runs on Next.js for exactly these reasons. Weaknesses — not DIY-friendly (requires a developer/agency), longer setup (4-10 weeks vs 2-4 for Squarespace), changes require developer involvement (we mitigate this by adding a CMS layer like Sanity or Contentful so owners can self-edit content).',
    nextjsLink: '/portfolio',
    nextjsLinkLabel: 'See Next.js builds in our portfolio →',
    wordpressTitle: 'WordPress — only for content-first sites with 50+ pages',
    wordpressBody: 'WordPress used to be the default for everything; in 2026 it is still the right answer for content-heavy sites (200+ blog posts, large knowledge bases, established content libraries). Strengths — massive plugin ecosystem, mature multilingual support (WPML, Polylang), familiar to many Korean web developers, scales to thousands of pages. Weaknesses — security maintenance is constant (monthly updates required to avoid hacks), page speed is slow without aggressive caching, modern editor experience lags behind Squarespace and Webflow, hosting + security + plugin licenses add up to $50-150/mo. For a Korean SMB starting fresh in 2026, we rarely recommend WordPress — but for migrating an existing 100+ page WordPress site, sometimes the right answer is to optimize what you have rather than rebuild.',
    decisionTitle: 'Decision framework — pick by answering 4 questions',
    decisionIntro: 'In order. The first "yes" answer is your platform.',
    decisions: [
      'Do you sell physical or digital products with inventory tracking? → Shopify',
      'Is performance / SEO / AI-search visibility the #1 priority? → Next.js Custom',
      'Will the owner self-edit content weekly and visual polish matters most? → Squarespace',
      'Is total monthly cost under $40 the hard constraint? → Wix',
    ],
    pricingNoteTitle: 'About these prices',
    pricingNote: 'All monthly costs reflect each platform\'s May 2026 published pricing for the starter or basic tier. "Typical Korean SMB" cost adds the average app/extension/plugin stack we see in our audits — usually 4-8 apps per store totaling $50-400/mo extra. Shopify Plus, Squarespace Commerce Advanced, and similar enterprise tiers are excluded (they are not relevant for the typical $400K-$1M revenue Korean SMB this comparison targets).',
    ctaTitle: 'Stuck choosing?',
    cta: 'Free 30-minute platform-fit call. We tell you honestly which platform fits your specific Korean SMB — even if the answer is "stay where you are."',
    ctaBtn: 'Book a free 30-min call',
    relatedTitle: 'Related comparisons + reads',
    related: [
      { title: 'Korean Web Design Agencies in NJ/NY — Compared Honestly', href: '/korean-web-design-agencies-nj-compared' },
      { title: 'Free Shopify Cost Audit (cut $200-$800/mo)', href: '/services/shopify-cost-audit' },
      { title: 'TJ Flowers Shopify Case Study (5× search visibility)', href: '/blog/tj-flowers-shopify-revamp-case-study' },
      { title: 'Squarespace vs Wix vs Next.js for Korean Business', href: '/blog/squarespace-vs-wix-vs-nextjs-korean-business' },
      { title: 'WordPress to Next.js Migration Case Study', href: '/blog/wordpress-to-nextjs-korean-business-migration' },
      { title: 'Shopify Setup for US Korean Sellers', href: '/blog/shopify-korean-ecommerce' },
    ],
    methodologyTitle: 'Methodology + disclosure',
    methodology: 'Comparisons built from each platform\'s published pricing as of May 2026, verified against our internal records from 60+ launched Korean-American SMB sites since 2019. Page speed numbers measured via Lighthouse on a representative product/services page for each platform under the same network conditions. Zoe Lumos is a Shopify Expert + Korean-American studio — when this page recommends Shopify, we benefit (we build them). We have tried to be honest about when Squarespace, Wix, or even Next.js custom is the better answer for a given Korean SMB; the verdict-by-use-case table is intentionally not "Shopify always."',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'I already have a Squarespace site — should I migrate to Shopify?',
        a: 'Only if your e-commerce volume justifies it. The migration cost is $4,000-$8,000 (we offer fixed-scope), and Shopify\'s monthly run rate is higher. Rule of thumb: if you do $5,000+/mo in online sales, Shopify pays for itself. Under $1,500/mo, stay on Squarespace and add a free cost-audit pass.',
      },
      {
        q: 'Can I run a Korean restaurant on Wix?',
        a: 'You can — but you will lose 30-50% of bookings to the worse mobile speed and limited reservation customization. For Korean restaurants in dense Korean corridors (Bergen, Flushing, LA Koreatown), the booking funnel matters more than the platform cost. See the Palpark Korean BBQ case study (3× bookings on Shopify + KakaoTalk).',
      },
      {
        q: 'Is Shopify good for a Korean small business that mostly serves dine-in customers?',
        a: 'Not really. Shopify\'s strength is online ordering + product catalog management. For a dine-in-first restaurant where 80%+ of revenue comes through the front door, Squarespace or Next.js with strong GBP + reservation integration is the right answer. The website\'s job there is to capture phone calls and reservations, not transactions.',
      },
      {
        q: 'What about Square Online, BigCommerce, WooCommerce?',
        a: 'Square Online makes sense if you already use Square POS heavily (free tier is good); the SEO controls are limited compared to Shopify. BigCommerce is fine but has a smaller app ecosystem and less Korean developer familiarity. WooCommerce is WordPress + commerce; only worth it for content-heavy sites with light commerce. We have built on all three but for a typical Korean SMB starting fresh, Shopify is the safer call.',
      },
      {
        q: 'Do Korean-American buyers prefer one platform over another?',
        a: 'No — Korean-American buyers do not know or care what platform a site runs on. What they DO care about: page speed (under 2s LCP), bilingual content, Korean payment options (cash/Zelle/Korean credit cards), and trust signals. Any of the four platforms can hit those criteria with the right build. The platform choice is a builder decision, not a buyer decision.',
      },
    ],
  },
  ko: {
    eyebrow: '비교 · 2026년 5월 업데이트',
    h1Lead: '한인 비즈니스 최고',
    h1Sub: '이커머스 플랫폼 [2026]',
    updated: '최종 업데이트: 2026년 5월 30일 · 방법론 + 작성자 페이지 하단 공개',
    intro: '한인 사장님은 매주 다른 사람으로부터 "최고의 이커머스 플랫폼"을 제안받습니다 — 조카, 회계사, POS 벤더, Shopify 스토어 두 개 만들어본 프리랜서. 이 페이지는 Shopify Expert + 한인·미국인 스튜디오 (60+ 사이트 런칭, 각 플랫폼 실 전환 측정 진행)의 2026년 정직한 비교. 어필리에이트 링크 X. "둘 다 좋아요" 헷지 X. 활용 사례별 진짜 판정 + 증거 포인트.',
    verdictTitle: '빠른 판정 — 활용 사례별 선택',
    verdicts: [
      { use: '한식당 / 카페 / 베이커리', winner: 'Shopify (네이티브 예약 포함) 또는 Squarespace', why: '포장·배달이 매출의 30%+ 이면 Shopify, 예약·비주얼이 거래보다 중요하면 Squarespace' },
      { use: '한인 미용실 / 스파 / 메드스파', winner: 'Squarespace + Square Appointments 또는 Next.js 커스텀', why: '비주얼 포트폴리오 + 예약 통합이 전환 동력' },
      { use: '한인 소매 / 패션 / 뷰티 제품 라인', winner: 'Shopify, 무조건', why: '재고, 다중 통화, 한국 결제, 장바구니 이탈 회수 모두 네이티브' },
      { use: '한인 전문 서비스 (법률, 치과, 부동산, 금융)', winner: 'Next.js 커스텀 또는 WordPress', why: '폼, 인테이크 컴플라이언스, 스키마 마크업이 체크아웃보다 중요' },
      { use: '한인 퍼블리케이션 / 미디어 / 블로그', winner: 'Next.js 커스텀 또는 Ghost', why: '에디토리얼 CMS + 이중언어 hreflang + 빠른 TTFB가 어떤 빌더도 이김' },
      { use: '한인 교회 / 비영리', winner: 'Squarespace 또는 Wix', why: '사장님 자체 편집 + 헌금 통합이 성능보다 중요' },
    ],
    matrixTitle: '전체 비교 매트릭스',
    matrixIntro: '2026년 5월 각 플랫폼 가격 페이지에서 확인 + 우리 빌드 기록. 60+ 한인·미국인 SMB 사이트 런칭 기반 한인 특화 노트 추가.',
    matrix: {
      headers: ['기준', 'Shopify', 'Squarespace', 'Wix', 'Next.js 커스텀'],
      rows: [
        ['월 비용 (시작)', '$39', '$23', '$17', '$0 베이스 + 호스팅 $0–20'],
        ['월 비용 (일반 한인 SMB)', '$79 + 앱 $200-400', '$30–65', '$27', '$0–20'],
        ['셋업 시간 (DIY)', '5–14일', '3–7일', '2–5일', 'DIY 불가'],
        ['셋업 시간 (대행사)', '4–8주', '2–4주', '1–3주', '4–10주'],
        ['네이티브 한국어 이중언어 지원', '플러그인 필요', '플러그인 필요', '플러그인 필요', '네이티브 (적절한 hreflang)'],
        ['한국 결제 프로세서', 'Shopify Payments + Stripe 경유', '제한적', '제한적', '모두 가능 (커스텀)'],
        ['카카오톡 통합', '커스텀 Liquid 경유', '임베드만', '임베드만', '네이티브 API'],
        ['네이티브 예약/부킹', 'Square Appointments 경유', '내장 (Squarespace Acuity)', 'Wix Bookings 내장', '모두 가능 (커스텀)'],
        ['페이지 속도 (평균 LCP)', '2.0–3.5초', '2.5–4.0초', '3.0–5.0초', '0.8–1.5초'],
        ['SEO 제어 (스키마, hreflang, canonical)', '강함, 일부 앱 해킹', '커스터마이즈 제한', '커스터마이즈 제한', '완전 제어'],
        ['앱 마켓플레이스 크기', '8,000+ 앱', '약 200 확장', '약 300 앱', 'NPM 생태계 (수백만)'],
        ['커스터마이즈', '높음 (Liquid)', '낮음-중간', '낮음-중간', '무제한'],
        ['코드 소유', '아니오 (Shopify 호스팅)', '아니오 (Squarespace 호스팅)', '아니오 (Wix 호스팅)', '네 (본인 리포)'],
        ['적합 한인 SMB 사장님', '제품 판매 + 재고 필요', '아름답고 단순 필요', '월 총 $300 예산', '성능 + 제어 필요'],
      ],
    },
    platformsTitle: '플랫폼 심층 분석 — 한인 SMB 관점',
    shopifyTitle: 'Shopify — 제품 판매면 이커머스 승자',
    shopifyBody: '제품 판매가 매출 견인하는 모든 한인·미국인 비즈니스에 명백한 선택. 강점 — 최대 앱 마켓플레이스 (8,000+), KRW/USD 네이티브 다중 통화, Shopify Payments가 카드 + Apple Pay + Google Pay + Shop Pay 모두 처리, 장바구니 이탈 회수 네이티브, Liquid 테마 언어가 커스텀 한국 결제 프로세서와 카카오톡 통합 처리할 만큼 강력. 실 증거 — TJ Flowers (맨해튼 플라워샵) 2026년 봄 Shopify 재구축, 6주 만에 검색 노출 5배 + 일 매출 $268 (기존 OpenCart $87/일 대비). 약점 — 앱과 함께 월 비용 누적 (앱비만 일반 월 $200-400 — 우리 비용 감사 서비스 참조), 이중언어엔 각 월 $20-50 추가하는 플러그인 (Langify, Weglot) 필요, 호스팅 환경이라 Plus 티어 (월 $2K+) 없이는 체크아웃 깊이 커스터마이즈 불가.',
    shopifyLink: '/ko/blog/tj-flowers-shopify-revamp-case-study',
    shopifyLinkLabel: 'TJ Flowers Shopify 케이스 스터디 읽기 →',
    squarespaceTitle: 'Squarespace — 비주얼 우선 한인 미용실, 카페, 서비스',
    squarespaceBody: '거래 커머스보다 비주얼 포트폴리오 + 예약 부킹이 중요할 때 올바른 선택. 강점 — Squarespace Acuity 부킹 네이티브 (추가 비용 X), 템플릿이 박스 밖에서 아름답게 렌더, 디자인 깨뜨리지 않고 사장님 자체 편집 가능, 사장님 자체 관리 사이트에 월 $30-65 지속 가능. 약점 — 한국어 이중언어 지원에 월 $24-49 추가하는 Weglot 같은 3자 도구 필요, 페이지 속도 중간 (일반 LCP 3-4초, Next.js 1-1.5초 대비), 스키마 마크업 커스터마이즈 제한, 임베드 이상 카카오톡 채널 통합 불가. 우리와 일하는 대부분 한인 미용실·소규모 스파 사장님이 Squarespace + Square Appointments + Weglot 한국어 번역 레이어로 정착.',
    wixTitle: 'Wix — 예산이 절대 제약일 때만',
    wixBody: 'Wix는 호스팅 옵션 중 가장 저렴 (월 $17-27). 온라인 존재는 필요하지만 실 빌드에 $1,500+ 배정 불가한 한인 사장님에게 작동. 강점 — 드래그앤드롭 에디터가 호스팅 플랫폼 3개 중 가장 쉬움, Wix Bookings 내장, 호스팅 + SSL + 기본 SEO 모두 포함. 약점 — 페이지 속도가 4개 중 최악 (일반 LCP 3-5초), 템플릿이 낡고 벗어나기 어려움, SEO 커스터마이즈 제한 (robots.txt 편집 불가, 스키마 제한), URL 구조가 항상 깨끗하지 않음 (자주 /pages/category-name-456). 우리가 감사하는 대부분 한인 SMB는 Wix에서 Squarespace 또는 Shopify로 이전 시 90일 내 전환 2-4배 상승.',
    nextjsTitle: 'Next.js 커스텀 — 성능, 제어, 또는 퍼블리케이션',
    nextjsBody: 'Next.js 커스텀 빌드가 Zoe Lumos가 한인 SMB 고객 약 65-75%에 사용. 강점 — LCP 1.5초 미만 (거대한 SEO + AI 검색 이점), 스키마 마크업·hreflang 완전 제어 (가장 깨끗한 이중언어 구현), 네이티브 카카오톡·Naver·한국 결제 통합, 코드 소유 + 호스트 언제든 이전, 월 플랫폼 비용 X (Vercel 호스팅 월 $0-20만). Miguk Story 에디토리얼 퍼블리케이션이 정확히 이 이유로 Next.js 운영. 약점 — DIY 불가 (개발자·대행사 필요), 셋업 더 김 (Squarespace 2-4주 대비 4-10주), 변경이 개발자 개입 필요 (Sanity·Contentful 같은 CMS 레이어 추가로 사장님 콘텐츠 자체 편집 가능하게 완화).',
    nextjsLink: '/ko/portfolio',
    nextjsLinkLabel: '포트폴리오의 Next.js 빌드 보기 →',
    wordpressTitle: 'WordPress — 50+ 페이지 콘텐츠 우선 사이트만',
    wordpressBody: 'WordPress가 한때 모든 것의 기본이었지만, 2026년엔 콘텐츠 중심 사이트 (200+ 블로그 포스트, 대형 지식 베이스, 자리잡은 콘텐츠 라이브러리) 에 여전히 올바른 답. 강점 — 거대 플러그인 생태계, 성숙한 다국어 지원 (WPML, Polylang), 많은 한인 웹 개발자에 친숙, 수천 페이지로 확장. 약점 — 보안 유지가 지속적 (해킹 방지에 월간 업데이트 필요), 공격적 캐싱 없이 페이지 속도 느림, 현대 에디터 경험이 Squarespace·Webflow 뒤처짐, 호스팅 + 보안 + 플러그인 라이선스 합쳐 월 $50-150. 2026년 새로 시작하는 한인 SMB엔 WordPress 거의 추천 X — 그러나 기존 100+ 페이지 WordPress 사이트 이전 시 가끔 재구축보다 기존 최적화가 답.',
    decisionTitle: '의사결정 프레임워크 — 4가지 질문으로 결정',
    decisionIntro: '순서대로. 첫 "예"가 본인 플랫폼.',
    decisions: [
      '재고 추적 있는 물리·디지털 상품 판매하나요? → Shopify',
      '성능 / SEO / AI 검색 가시성이 #1 우선순위? → Next.js 커스텀',
      '사장님이 주간 콘텐츠 자체 편집 + 비주얼 폴리시 가장 중요? → Squarespace',
      '월 총 비용 $40 미만이 절대 제약? → Wix',
    ],
    pricingNoteTitle: '가격에 대해',
    pricingNote: '모든 월 비용은 각 플랫폼 2026년 5월 공시 가격 (스타터·베이직 티어). "일반 한인 SMB" 비용은 우리 감사에서 보는 평균 앱·확장·플러그인 스택 추가 — 보통 스토어당 4-8 앱 합쳐 추가 월 $50-400. Shopify Plus, Squarespace Commerce Advanced 등 엔터프라이즈 티어 제외 (이 비교가 타겟하는 일반 매출 $400K-$1M 한인 SMB와 무관).',
    ctaTitle: '선택에 막혔다면?',
    cta: '30분 무료 플랫폼 적합성 통화. 본인 한인 SMB에 어느 플랫폼이 맞는지 정직하게 말씀드립니다 — 답이 "현재 플랫폼 유지"여도.',
    ctaBtn: '무료 30분 통화 예약',
    relatedTitle: '관련 비교 + 읽을 거리',
    related: [
      { title: 'NJ·NY 한인 웹디자인 대행사 — 솔직한 비교', href: '/ko/korean-web-design-agencies-nj-compared' },
      { title: '무료 Shopify 비용 감사 (월 $200-$800 절감)', href: '/ko/services/shopify-cost-audit' },
      { title: 'TJ Flowers Shopify 케이스 스터디 (검색 노출 5배)', href: '/ko/blog/tj-flowers-shopify-revamp-case-study' },
      { title: '한인 비즈니스 Squarespace vs Wix vs Next.js', href: '/ko/blog/squarespace-vs-wix-vs-nextjs-korean-business' },
      { title: 'WordPress에서 Next.js 마이그레이션 케이스 스터디', href: '/ko/blog/wordpress-to-nextjs-korean-business-migration' },
      { title: '미국 한인 셀러 Shopify 셋업', href: '/ko/blog/shopify-korean-ecommerce' },
    ],
    methodologyTitle: '방법론 + 공개',
    methodology: '비교는 2026년 5월 각 플랫폼 공시 가격 기준 + 2019년 이후 60+ 런칭 한인·미국인 SMB 사이트 내부 기록으로 검증. 페이지 속도 숫자는 같은 네트워크 조건 하 각 플랫폼 대표 상품·서비스 페이지에 Lighthouse 측정. Zoe Lumos는 Shopify Expert + 한인·미국인 스튜디오 — 이 페이지가 Shopify 추천 시 우리가 이득 (우리가 구축). 주어진 한인 SMB에 Squarespace, Wix, 또는 Next.js 커스텀이 더 나은 답일 때 정직하려 노력 — 활용 사례별 판정 테이블 의도적으로 "항상 Shopify" X.',
    faqTitle: '자주 묻는 질문',
    faqs: [
      {
        q: '이미 Squarespace 사이트가 있는데 Shopify로 이전해야 하나요?',
        a: '이커머스 볼륨이 정당화할 때만. 이전 비용 $4,000-$8,000 (고정 범위 제공), Shopify 월 운영 속도가 더 높음. 경험 법칙 — 월 온라인 매출 $5,000+ 이면 Shopify 회수. 월 $1,500 미만이면 Squarespace 유지 + 무료 비용 감사 추가.',
      },
      {
        q: 'Wix에서 한식당 운영 가능한가요?',
        a: '가능 — 그러나 더 나쁜 모바일 속도와 제한된 예약 커스터마이즈로 예약의 30-50% 손실. 한인 밀도 통로 한식당 (버겐, 플러싱, LA 코리아타운) 은 플랫폼 비용보다 예약 퍼널이 더 중요. 팰팍 한식 BBQ 케이스 스터디 참조 (Shopify + 카카오톡으로 예약 3배).',
      },
      {
        q: '주로 홀 손님 대상 한인 스몰비즈니스에 Shopify 좋나요?',
        a: '별로. Shopify 강점은 온라인 주문 + 상품 카탈로그 관리. 매출의 80%+가 출입구로 들어오는 홀 우선 식당엔 강한 GBP + 예약 통합 있는 Squarespace 또는 Next.js가 답. 거기서 웹사이트 일은 거래가 아닌 전화·예약 캡처.',
      },
      {
        q: 'Square Online, BigCommerce, WooCommerce는?',
        a: '이미 Square POS 무겁게 쓰면 Square Online 합당 (무료 티어 좋음); SEO 제어 Shopify 대비 제한. BigCommerce 괜찮으나 앱 생태계 작고 한인 개발자 친숙도 낮음. WooCommerce는 WordPress + 커머스; 가벼운 커머스의 콘텐츠 중심 사이트에만 가치. 셋 다 구축 경험 있지만 새로 시작하는 일반 한인 SMB엔 Shopify가 안전한 선택.',
      },
      {
        q: '한인·미국인 구매자가 특정 플랫폼 선호하나요?',
        a: '아닙니다 — 한인·미국인 구매자는 사이트가 어떤 플랫폼인지 모르고 신경 안 씀. 신경 쓰는 것 — 페이지 속도 (LCP 2초 미만), 이중언어 콘텐츠, 한국 결제 옵션 (현금·Zelle·한국 카드), 신뢰 신호. 4개 플랫폼 모두 적절한 빌드로 이 기준 가능. 플랫폼 선택은 빌더 결정, 구매자 결정 X.',
      },
    ],
  },
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const t = COPY[locale]
  const prefix = locale === 'ko' ? '/ko' : ''
  const baseUrl = 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/compare/best-ecommerce-platform-korean-business-2026`
  const koUrl = `${baseUrl}/ko/compare/best-ecommerce-platform-korean-business-2026`
  const pageUrl = locale === 'ko' ? koUrl : enUrl

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'ko' ? '한인 비즈니스 최고 이커머스 플랫폼 2026' : 'Best E-Commerce Platform for Korean Businesses 2026',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 4,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shopify', url: 'https://www.shopify.com' },
      { '@type': 'ListItem', position: 2, name: 'Squarespace', url: 'https://www.squarespace.com' },
      { '@type': 'ListItem', position: 3, name: 'Wix', url: 'https://www.wix.com' },
      { '@type': 'ListItem', position: 4, name: 'Next.js Custom (Zoe Lumos)', url: baseUrl },
    ],
  }

  const platformSchemas = [
    { name: 'Shopify', category: 'E-Commerce Platform', price: '39', url: 'https://www.shopify.com' },
    { name: 'Squarespace', category: 'Website Builder', price: '23', url: 'https://www.squarespace.com' },
    { name: 'Wix', category: 'Website Builder', price: '17', url: 'https://www.wix.com' },
    { name: 'Next.js Custom (Zoe Lumos)', category: 'Custom Web Framework', price: '0', url: baseUrl },
  ].map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    applicationCategory: p.category,
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: p.price, priceCurrency: 'USD' },
    url: p.url,
  }))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: locale === 'ko' ? `${baseUrl}/ko` : baseUrl },
      { '@type': 'ListItem', position: 2, name: locale === 'ko' ? '비교' : 'Comparisons', item: `${baseUrl}${prefix}/compare/best-ecommerce-platform-korean-business-2026` },
      { '@type': 'ListItem', position: 3, name: locale === 'ko' ? '한인 비즈니스 이커머스 플랫폼' : 'E-Commerce Platform Comparison', item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      {platformSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        {/* Hero */}
        <section className="container-edge pt-32 md:pt-40 pb-12 md:pb-16">
          <div className="overline text-ash mb-8">{t.eyebrow}</div>
          <h1 className="font-display text-display-lg md:text-display-xl tracking-luxury leading-[1.05]">
            <span className="block">{t.h1Lead}</span>
            <span className="block italic font-light text-gold">{t.h1Sub}</span>
          </h1>
          <p className="mt-6 text-[13px] text-ash">{t.updated}</p>
          <p className="mt-10 max-w-3xl text-body-lg text-graphite leading-[1.7]">{t.intro}</p>
        </section>

        {/* Quick verdicts */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline bg-bone">
          <h2 className="font-display text-display-md tracking-luxury mb-8">{t.verdictTitle}</h2>
          <ul className="space-y-4 max-w-4xl">
            {t.verdicts.map((v, i) => (
              <li key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-hairline">
                <div className="md:col-span-4 text-graphite font-medium">{v.use}</div>
                <div className="md:col-span-3 text-ink font-display tracking-luxury">{v.winner}</div>
                <div className="md:col-span-5 text-[14px] text-ash leading-[1.6]">{v.why}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Matrix */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-4">{t.matrixTitle}</h2>
          <p className="text-graphite max-w-3xl leading-[1.7] mb-8">{t.matrixIntro}</p>
          <div className="overflow-x-auto -mx-5 md:-mx-12 px-5 md:px-12">
            <table className="min-w-[820px] w-full border-collapse text-[13px] md:text-[14px]">
              <thead>
                <tr className="border-b-2 border-ink">
                  {t.matrix.headers.map((h, i) => (
                    <th key={i} className={`text-left py-3 pr-4 ${i === 0 ? 'text-graphite' : 'font-display tracking-luxury text-ink'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.matrix.rows.map((row, i) => (
                  <tr key={i} className="border-b border-hairline align-top">
                    {row.map((cell, j) => (
                      <td key={j} className={`py-3 pr-4 leading-[1.5] ${j === 0 ? 'text-graphite font-medium' : 'text-ink'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Platform deep dives */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-10">{t.platformsTitle}</h2>

          <div className="space-y-12 max-w-3xl">
            <article>
              <h3 className="font-display text-2xl md:text-3xl tracking-luxury mb-4">{t.shopifyTitle}</h3>
              <p className="text-graphite leading-[1.7] mb-4">{t.shopifyBody}</p>
              <Link href={t.shopifyLink} className="inline-flex items-center gap-2 text-[14px] text-ink border-b border-ink pb-0.5">
                {t.shopifyLinkLabel}
              </Link>
            </article>

            <article>
              <h3 className="font-display text-2xl md:text-3xl tracking-luxury mb-4">{t.squarespaceTitle}</h3>
              <p className="text-graphite leading-[1.7]">{t.squarespaceBody}</p>
            </article>

            <article>
              <h3 className="font-display text-2xl md:text-3xl tracking-luxury mb-4">{t.wixTitle}</h3>
              <p className="text-graphite leading-[1.7]">{t.wixBody}</p>
            </article>

            <article>
              <h3 className="font-display text-2xl md:text-3xl tracking-luxury mb-4">{t.nextjsTitle}</h3>
              <p className="text-graphite leading-[1.7] mb-4">{t.nextjsBody}</p>
              <Link href={t.nextjsLink} className="inline-flex items-center gap-2 text-[14px] text-ink border-b border-ink pb-0.5">
                {t.nextjsLinkLabel}
              </Link>
            </article>

            <article>
              <h3 className="font-display text-2xl md:text-3xl tracking-luxury mb-4">{t.wordpressTitle}</h3>
              <p className="text-graphite leading-[1.7]">{t.wordpressBody}</p>
            </article>
          </div>
        </section>

        {/* Decision framework */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline bg-bone">
          <h2 className="font-display text-display-md tracking-luxury mb-4">{t.decisionTitle}</h2>
          <p className="text-graphite mb-8 max-w-3xl">{t.decisionIntro}</p>
          <ol className="space-y-3 max-w-3xl">
            {t.decisions.map((d, i) => (
              <li key={i} className="flex gap-4 py-3 border-b border-hairline text-graphite leading-[1.6]">
                <span className="overline text-ash shrink-0 mt-1">0{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Pricing note */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-4">{t.pricingNoteTitle}</h2>
          <p className="text-graphite leading-[1.7] max-w-3xl">{t.pricingNote}</p>
        </section>

        {/* FAQs */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-8">{t.faqTitle}</h2>
          <ul className="space-y-6 max-w-3xl">
            {t.faqs.map((f, i) => (
              <li key={i} className="border-b border-hairline pb-6">
                <h3 className="font-display text-xl tracking-luxury text-ink mb-3">{f.q}</h3>
                <p className="text-graphite leading-[1.7]">{f.a}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="container-edge py-16 md:py-24 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-4">{t.ctaTitle}</h2>
          <p className="text-body-lg text-graphite leading-[1.7] max-w-2xl mb-8">{t.cta}</p>
          <Link
            href={`${prefix}/#contact`}
            className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-ink text-ivory text-[16px]"
          >
            {t.ctaBtn} <span aria-hidden>→</span>
          </Link>
        </section>

        {/* Related */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline bg-bone">
          <h2 className="font-display text-display-md tracking-luxury mb-8">{t.relatedTitle}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl">
            {t.related.map((r, i) => (
              <li key={i}>
                <Link
                  href={r.href}
                  className="flex items-center justify-between gap-4 py-3 border-b border-hairline text-graphite hover:text-ink transition-colors"
                >
                  <span>{r.title}</span>
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Methodology */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h3 className="overline text-ash mb-4">{t.methodologyTitle}</h3>
          <p className="text-[13px] text-ash leading-[1.7] max-w-3xl">{t.methodology}</p>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
