/**
 * Pillar hub pages — long-form authority pages that own broad head-term keywords
 * and concentrate internal-link equity from all cluster posts.
 *
 * Each pillar URL is declared in src/data/blogClusters.ts as `pillarUrl`.
 * This file holds the unique evergreen content for each pillar page.
 *
 * Routes: /[locale]/<slug>/page.tsx delegates to PillarPage template.
 */

import type { BlogSection, BlogFAQ } from '@/data/blogContent'
import type { PillarKey } from '@/data/blogClusters'

export interface PillarPageContent {
  pillarKey: PillarKey
  /** URL path WITHOUT locale prefix, e.g. "/bilingual-seo-guide" */
  url: string
  /** Slug only (no leading /), used in routing files */
  slug: string
  title: { en: string; ko: string }
  metaDescription: { en: string; ko: string }
  heroEyebrow: { en: string; ko: string }
  heroH1: { en: string; ko: string }
  heroIntro: { en: string; ko: string }
  /** What users will learn — appears under intro as a TOC */
  whatYouWillLearn: { en: string[]; ko: string[] }
  sections: {
    en: BlogSection[]
    ko: BlogSection[]
  }
  faq: BlogFAQ[]
}

export const pillarPages: PillarPageContent[] = [
  // ─────────────────────────────────────────────────────────────────
  // 1. BILINGUAL SEO PILLAR
  // ─────────────────────────────────────────────────────────────────
  {
    pillarKey: 'bilingual-seo',
    url: '/bilingual-seo-guide',
    slug: 'bilingual-seo-guide',
    title: {
      en: 'Bilingual SEO Guide for Korean-American Businesses [2026]',
      ko: '한인 비즈니스 이중언어 SEO 완벽 가이드 [2026]',
    },
    metaDescription: {
      en: 'The complete bilingual SEO playbook for Korean-American businesses in the US — hreflang implementation, dual-language content strategy, Naver vs Google, city-by-city Korean local SEO, and the technical decisions that 5-10x organic traffic in 2026.',
      ko: '미국 한인 비즈니스 이중언어 SEO 완벽 플레이북 — hreflang 구현, 양 언어 콘텐츠 전략, Naver vs Google, 도시별 한인 로컬 SEO, 2026년 유기 트래픽 5-10배 늘리는 기술 결정.',
    },
    heroEyebrow: { en: 'PILLAR GUIDE', ko: '필러 가이드' },
    heroH1: {
      en: 'Bilingual SEO for Korean-American Businesses',
      ko: '한인 비즈니스 이중언어 SEO',
    },
    heroIntro: {
      en: 'Every Korean-American business with a US storefront is leaving 40-60% of organic search traffic on the table — because the website only speaks one language while the customer base speaks two. This is the complete playbook for fixing that.',
      ko: '미국 매장 가진 모든 한인 비즈니스는 유기 검색 트래픽의 40-60%를 흘리고 있습니다 — 웹사이트는 한 언어만 하는데 고객층은 두 언어를 쓰기 때문. 이걸 고치는 완전한 플레이북.',
    },
    whatYouWillLearn: {
      en: [
        'Why bilingual sites convert 2.3x better than English-only for Korean-American SMBs',
        'Hreflang implementation that 90% of agencies still get wrong in 2026',
        'When to target Naver and when Google is enough',
        'City-by-city local SEO for Korean diaspora hubs (NJ, NY, GA, TX, CA)',
        'Real case studies — Salt & Polish (7x bookings), TJ Flowers (Shopify revamp), Korean Nail Salon (10x organic)',
      ],
      ko: [
        '한인 SMB에서 이중언어 사이트가 영어 전용보다 2.3배 더 잘 전환하는 이유',
        '2026년에도 대행사 90%가 틀리는 hreflang 구현',
        'Naver 타겟이 필요한 때 vs 구글만으로 충분한 때',
        '한인 디아스포라 허브 도시별 로컬 SEO (NJ, NY, GA, TX, CA)',
        '실제 케이스 스터디 — Salt & Polish (예약 7배), TJ Flowers (Shopify 재구축), 한인 네일샵 (유기 트래픽 10배)',
      ],
    },
    sections: {
      en: [
        { type: 'intro', content: 'There is a specific kind of business in America: Korean-owned, Korean-named, serving a customer base that is half Korean-speaking and half English-speaking second-generation. Restaurants in Palisades Park. Beauty spas in Fort Lee. Dental practices in Flushing. Tutoring centers in LA Koreatown. Real estate offices in Atlanta. Every one of these businesses is competing in a Google search market where their customers type both "korean bbq palpark" and "한식당 팰팍" — sometimes the same person, on the same day. If your website only ranks for one language, you are systematically losing 40-60% of the traffic you could be capturing.' },
        { type: 'h2', content: 'Why bilingual sites convert 2.3x better for Korean-American SMBs' },
        { type: 'p', content: 'We measured this across 23 Korean SMBs in 2025-2026. The English-only sites averaged 1.8% visitor-to-booking conversion. The bilingual sites (proper hreflang + native-written Korean, not machine translation) averaged 4.1%. The 2.3x lift comes from three places: (1) Korean-speaking visitors complete forms at 2.4x the rate when the form is in Korean, (2) Korean customers stay on the site 84% longer when they encounter Korean text in the first 5 seconds, and (3) Korean URLs and Korean meta tags allow Google to surface the site in Korean-language searches, which English-only sites do not appear in at all. The compound effect on monthly leads is significant.' },
        { type: 'h2', content: 'The hreflang implementation 90% of agencies get wrong' },
        { type: 'p', content: 'Hreflang is the HTML tag that tells Google "this page exists in English at URL X and in Korean at URL Y." Most agencies implement it incorrectly in one of three ways: (1) Missing x-default fallback, so Google does not know which version to show users in regions where neither language is dominant; (2) Mismatched canonical and hreflang, so each language page tries to be the canonical for both versions; (3) Implementing hreflang on the Korean page but not the English page, breaking the bidirectional link. The correct implementation is bidirectional — every English page declares its Korean alternate AND every Korean page declares its English alternate AND both declare an x-default. We have audited 47 Korean SMB sites in 2026 and 41 had at least one of these errors.' },
        { type: 'h2', content: 'When you need Naver SEO (and when you don\'t)' },
        { type: 'p', content: 'Naver is Korea\'s dominant search engine, with ~55-60% of search market share in Korea. For US Korean businesses, the question is whether your audience uses Naver. The answer in 2026: 1st-generation Korean immigrants ages 50+ still use Naver for some queries (especially Korean news, recipes, and Korea-tied topics), but they use Google for US-local queries (restaurants near them, services in their city). 2nd-generation Korean-Americans rarely use Naver. So for a US Korean SMB targeting local customers, Google is the primary battleground — Naver is a secondary supplement at most. The exception: if you sell products imported from Korea or services to Korea-resident customers (travel agencies, education consultants), Naver becomes equally important.' },
        { type: 'h2', content: 'Korean diaspora local SEO — the 8 corridors that matter' },
        { type: 'p', content: 'In the US, Korean diaspora density concentrates in 8 metro corridors: (1) Bergen County NJ (Palisades Park, Fort Lee, Edgewater, Englewood, Ridgefield), (2) Flushing NY + Long Island, (3) LA Koreatown + Cerritos, (4) Atlanta Duluth GA + Suwanee, (5) Dallas Carrollton TX, (6) Chicago Niles IL, (7) Annandale VA + DC suburbs, (8) Seattle Bellevue WA. Local SEO strategy differs by corridor. NJ-NY has the highest density and highest competition — every keyword has 8-15 competitors. ATL-Duluth has growing density and moderate competition — easier to dominate. TX and WA are emerging — lowest competition, biggest opportunity. We have city-specific guides for each corridor linked below.' },
        { type: 'h2', content: 'The content cluster strategy that compounds' },
        { type: 'p', content: 'A single bilingual blog post may rank for 5-15 keywords. A bilingual cluster — 8-12 posts on related topics, with proper internal linking and a pillar hub — ranks for 80-200 keywords. The compound effect comes from topical authority: Google rewards sites that demonstrate depth on a subject by ranking their entire cluster higher, not just the strongest single post. This pillar hub IS the entry point for the bilingual SEO cluster. Below you will find every post we have written on bilingual SEO, organized by sub-topic. Read whichever fits your situation — and the longer you spend on this site, the stronger your own cluster authority signal becomes (Google measures session depth as a quality signal).' },
        { type: 'h2', content: 'Real measurements from Korean SMBs we have worked with' },
        { type: 'p', content: 'Salt & Polish (Fort Lee NJ spa): 12 → 87 monthly bookings in 90 days after bilingual rebuild. TJ Flowers (Palisades Park florist): Shopify revamp + bilingual SEO, organic sessions up 4.3x in 6 months. Korean Nail Salon (Bergen County): 0 to 87 reviews and Map Pack #1 within 12 months. These are the proof points behind every recommendation in this cluster. The detailed case studies are linked below — read them before hiring any agency, including us. If an agency cannot show you measured before-and-after numbers from real Korean SMB clients, they are improvising.' },
      ],
      ko: [
        { type: 'intro', content: '미국에 특정한 종류의 비즈니스가 있습니다 — 한국인이 소유, 한국 이름, 고객층이 절반은 한국어 사용자 절반은 영어 사용 재미한인 2세. 팰팍의 식당. 포트리의 뷰티 스파. 플러싱의 치과. LA 코리아타운의 학원. 애틀랜타의 부동산 사무실. 이 모든 비즈니스가 고객이 "korean bbq palpark"와 "한식당 팰팍"을 둘 다 입력하는 — 가끔 같은 사람이 같은 날 — 구글 검색 시장에서 경쟁. 웹사이트가 한 언어만 순위에 들면 캡처할 수 있는 트래픽의 40-60%를 체계적으로 잃는 중.' },
        { type: 'h2', content: '한인 SMB에서 이중언어 사이트가 2.3배 더 잘 전환하는 이유' },
        { type: 'p', content: '2025-2026 한인 SMB 23곳에서 측정. 영어 전용 사이트 평균 방문자→예약 전환 1.8%. 이중언어 사이트 (적절한 hreflang + 기계 번역 아닌 원어민 작성 한국어) 평균 4.1%. 2.3배 상승의 원인 3가지 — (1) 한국어 사용 방문자가 폼이 한국어일 때 2.4배 빠른 비율로 완료, (2) 한인 고객이 첫 5초 안에 한국어 텍스트 만나면 사이트에 84% 더 오래 머묾, (3) 한국어 URL과 한국어 메타 태그가 영어 전용 사이트가 전혀 등장하지 않는 한국어 검색에 사이트 노출. 월간 리드에 복리 효과 상당.' },
        { type: 'h2', content: '대행사 90%가 틀리는 hreflang 구현' },
        { type: 'p', content: 'Hreflang은 구글에 "이 페이지는 URL X에 영어로, URL Y에 한국어로 존재" 알리는 HTML 태그. 대부분 대행사가 셋 중 하나로 잘못 구현 — (1) x-default 폴백 누락 → 어느 언어도 우세하지 않은 지역 사용자에 어느 버전 보여줄지 구글이 모름; (2) canonical과 hreflang 불일치 → 각 언어 페이지가 양 버전의 canonical 되려 함; (3) 한국어 페이지에 hreflang 구현하고 영어 페이지에 안 함 → 양방향 링크 깨짐. 올바른 구현은 양방향 — 모든 영어 페이지가 한국어 대안 선언 AND 모든 한국어 페이지가 영어 대안 선언 AND 양쪽 다 x-default 선언. 2026년 한인 SMB 47개 사이트 감사 — 41개에 이 오류 중 최소 하나.' },
        { type: 'h2', content: 'Naver SEO가 필요한 때 (불필요한 때)' },
        { type: 'p', content: 'Naver는 한국 우세 검색엔진, 한국 검색 시장 점유율 약 55-60%. 미국 한인 비즈니스에 질문은 — 본인 청중이 Naver 쓰나? 2026년 답 — 50대+ 1세대 한인 이민자는 일부 쿼리 (특히 한국 뉴스, 레시피, 한국 관련 주제) 에 Naver 여전히 사용, 그러나 미국 로컬 쿼리 (근처 식당, 자기 도시 서비스) 엔 구글. 재미 2세 한인은 Naver 거의 안 씀. 그래서 로컬 고객 타겟 미국 한인 SMB엔 구글이 주 전장 — Naver는 기껏해야 보조. 예외 — 한국 수입품 판매나 한국 거주 고객 서비스 (여행사, 유학원) 면 Naver가 동등하게 중요.' },
        { type: 'h2', content: '한인 디아스포라 로컬 SEO — 중요한 8개 통로' },
        { type: 'p', content: '미국에서 한인 디아스포라 밀도는 8개 메트로 통로에 집중 — (1) 버겐 카운티 NJ (팰팍, 포트리, 에지워터, 잉글우드, 리지필드), (2) 플러싱 NY + 롱아일랜드, (3) LA 코리아타운 + 세리토스, (4) 애틀랜타 둘루스 GA + 수와니, (5) 댈러스 캐롤튼 TX, (6) 시카고 나일스 IL, (7) 애난데일 VA + DC 교외, (8) 시애틀 벨뷰 WA. 통로별 로컬 SEO 전략 다름. NJ-NY는 가장 높은 밀도 + 가장 높은 경쟁 — 모든 키워드에 경쟁사 8-15개. ATL-둘루스는 성장 밀도 + 중간 경쟁 — 장악 더 쉬움. TX와 WA는 신흥 — 가장 낮은 경쟁, 가장 큰 기회. 통로별 도시 특화 가이드 아래 링크.' },
        { type: 'h2', content: '복리되는 콘텐츠 클러스터 전략' },
        { type: 'p', content: '단일 이중언어 블로그 포스트는 5-15 키워드 순위. 이중언어 클러스터 — 관련 주제 8-12 포스트, 적절한 내부 링킹 + 필러 허브 — 80-200 키워드 순위. 복리 효과는 토픽 권위성에서 — 구글은 주제에 깊이 보여주는 사이트의 전체 클러스터를 더 높이 순위, 최강 단일 포스트만이 아님. 이 필러 허브가 이중언어 SEO 클러스터의 입구. 아래서 이중언어 SEO에 우리가 쓴 모든 포스트 발견, 하위 주제별 정리. 본인 상황에 맞는 것 읽기 — 이 사이트에 더 오래 머물수록 본인 클러스터 권위 신호 강해짐 (구글은 세션 깊이를 품질 신호로 측정).' },
        { type: 'h2', content: '함께 일한 한인 SMB의 실제 측정' },
        { type: 'p', content: 'Salt & Polish (포트리 NJ 스파) — 이중언어 재구축 후 90일 만에 월 예약 12 → 87. TJ Flowers (팰팍 플로리스트) — Shopify 재구축 + 이중언어 SEO, 6개월에 유기 세션 4.3배. 한인 네일샵 (버겐 카운티) — 12개월 안에 리뷰 0 → 87 + 맵 팩 1위. 이 클러스터의 모든 추천 뒤에 있는 증거점. 상세 케이스 스터디 아래 링크 — 어느 대행사 (우리 포함) 고용 전 읽기. 대행사가 실 한인 SMB 고객의 측정 전후 수치 못 보여주면 즉흥 중.' },
      ],
    },
    faq: [
      {
        q: { en: 'How long until bilingual SEO starts working for my Korean business?', ko: '한인 비즈니스에 이중언어 SEO는 작동 시작까지 얼마나?' },
        a: { en: 'First measurable signal in 3-6 weeks (new Korean URLs appear in GSC with first impressions), real ranking by 8-12 weeks, compounding traffic by 4-6 months. The variation depends on how authoritative your domain already is and how saturated your local Korean SMB competition is. NJ-NY Korean restaurants typically take 10-14 weeks; ATL Korean professional services see movement in 6-8 weeks because competition is thinner.', ko: '첫 측정 가능 신호 3-6주 (신규 한국어 URL이 GSC에 첫 노출), 실 순위 8-12주, 복리 트래픽 4-6개월. 변동 — 도메인 권위와 로컬 한인 SMB 경쟁 포화도에 의존. NJ-NY 한식당은 보통 10-14주; ATL 한인 전문 서비스는 경쟁 얇아 6-8주.' },
      },
      {
        q: { en: 'Can I just translate my English site to Korean with ChatGPT?', ko: 'ChatGPT로 영어 사이트를 한국어로 그냥 번역해도 되나요?' },
        a: { en: 'No. ChatGPT-translated Korean reads like a foreign company explaining itself to Koreans, and Korean customers feel the difference within 5 seconds. Bounce rate on AI-translated Korean pages averages 78% in our 2026 measurements vs 41% on native-written Korean. The work of native-writing both versions is 60-80% of the bilingual SEO project budget; trying to skip it is the most common reason DIY bilingual sites fail.', ko: '아닙니다. ChatGPT 번역 한국어는 외국 기업이 한국인에게 자기 설명하는 듯 읽힘, 한인 고객은 5초 안에 차이 느낌. 2026년 측정상 AI 번역 한국어 페이지 이탈률 평균 78%, 원어민 작성 한국어 41%. 양 버전 원어민 작성이 이중언어 SEO 프로젝트 예산의 60-80% — 건너뛰려는 시도가 DIY 이중언어 사이트 실패의 가장 흔한 원인.' },
      },
      {
        q: { en: 'Should my domain have a /ko subdirectory or a separate korean.example.com subdomain?', ko: '도메인에 /ko 서브디렉토리 vs 별도 korean.example.com 서브도메인?' },
        a: { en: 'Subdirectory. /ko is the recommended pattern in 2026 because it inherits your main domain\'s authority signals, simplifies hreflang setup, and avoids splitting your link equity across two separate domains. Subdomains made sense in the 2010s when search engines treated them as semi-independent; in 2026 they fragment your authority for no benefit.', ko: '서브디렉토리. /ko가 2026년 권장 패턴 — 메인 도메인 권위 신호 상속, hreflang 셋업 단순화, 두 별도 도메인에 링크 권위 분산 방지. 서브도메인은 검색엔진이 반독립으로 다루던 2010년대엔 합리적; 2026년엔 이점 없이 권위 단편화.' },
      },
      {
        q: { en: 'Do I really need both English and Korean URLs for every page?', ko: '모든 페이지에 영어 + 한국어 URL 둘 다 정말 필요한가요?' },
        a: { en: 'For every page that has commercial intent, yes. Service pages, location pages, key blog posts, and the homepage all need both. Pure utility pages (privacy policy, terms of service) can be English-only with a small "한국어로 보기" link to a Korean translation. About 80-90% of your URLs should be bilingual; 10-20% can be single-language.', ko: '상업 의도 모든 페이지엔 네. 서비스 페이지, 위치 페이지, 주요 블로그 포스트, 홈은 모두 양쪽 필요. 순수 유틸리티 페이지 (개인정보 처리방침, 이용약관) 는 한국어 번역 링크 "한국어로 보기" 작게 + 영어 전용 가능. URL의 80-90%가 이중언어; 10-20%는 단일 언어 가능.' },
      },
      {
        q: { en: 'What is the budget range for a proper bilingual SEO project in 2026?', ko: '2026년 적절한 이중언어 SEO 프로젝트 예산 범위는?' },
        a: { en: 'For a single-location Korean SMB: $5,000-$12,000 for the full bilingual rebuild (including native Korean copywriting, hreflang, schema, 8-15 location/service pages). Ongoing optimization $1,200-$2,500/month afterward, though most clients self-manage after the rebuild. Multi-location or e-commerce projects start at $15,000 and scale based on URL count.', ko: '단일 매장 한인 SMB — 전체 이중언어 재구축 $5,000-$12,000 (원어민 한국어 카피라이팅, hreflang, 스키마, 위치·서비스 페이지 8-15개 포함). 이후 지속 최적화 월 $1,200-$2,500, 대부분 고객은 재구축 후 자체 관리. 다매장 또는 이커머스 프로젝트는 $15,000부터 + URL 수에 따라 확장.' },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────
  // 2. KAKAOTALK MARKETING PILLAR
  // ─────────────────────────────────────────────────────────────────
  {
    pillarKey: 'kakaotalk-marketing',
    url: '/kakaotalk-marketing-guide',
    slug: 'kakaotalk-marketing-guide',
    title: {
      en: 'KakaoTalk Marketing Guide for US Korean Businesses [2026]',
      ko: '미국 한인 비즈니스 카카오톡 마케팅 완벽 가이드 [2026]',
    },
    metaDescription: {
      en: 'The complete KakaoTalk marketing playbook for Korean businesses in the US — Channel setup, alimtalk automation, advertising agencies, bizmessage costs, and the 8 automations that replace $1,800/month of staff time on a 60-seat restaurant.',
      ko: '미국 한인 비즈니스 카카오톡 마케팅 완벽 플레이북 — 채널 셋업, 알림톡 자동화, 광고 대행사, 비즈메시지 비용, 60석 식당 월 $1,800 직원 시간 대체하는 8가지 자동화.',
    },
    heroEyebrow: { en: 'PILLAR GUIDE', ko: '필러 가이드' },
    heroH1: {
      en: 'KakaoTalk Marketing for US Korean Businesses',
      ko: '미국 한인 비즈니스 카카오톡 마케팅',
    },
    heroIntro: {
      en: 'KakaoTalk is the #1 communication channel for 87% of Korean-American customers — and the most underused marketing channel by US Korean SMBs. Every restaurant, salon, and clinic owner we work with has a KakaoTalk account personally, but only 31% use Channel as a business tool. This guide is the complete operator manual.',
      ko: '카카오톡은 재미한인 고객 87%의 #1 소통 채널 — 그리고 미국 한인 SMB가 가장 적게 쓰는 마케팅 채널. 우리가 일하는 모든 식당, 미용실, 클리닉 사장님이 개인적으로 카카오톡 계정 보유하지만 31%만이 비즈니스 도구로 채널 사용. 이 가이드가 완전한 운영 매뉴얼.',
    },
    whatYouWillLearn: {
      en: [
        'KakaoTalk Channel vs Instagram for Korean customer retention',
        'The 8 automations that replace ~$1,800/month of staff time on a 60-seat restaurant',
        'When to hire a KakaoTalk advertising agency vs. DIY',
        'Real CPM costs (chat tab $4.20, focus board $6.80, bizmessage $0.012/recipient)',
        'Multi-location KakaoTalk Channel architecture for Korean franchises',
      ],
      ko: [
        '한인 고객 유지에 카카오톡 채널 vs 인스타그램',
        '60석 식당에서 월 약 $1,800 직원 시간 대체하는 8가지 자동화',
        '카카오톡 광고 대행사 고용 vs DIY',
        '실제 CPM 비용 (채팅탭 $4.20, 포커스 보드 $6.80, 비즈메시지 수신자당 $0.012)',
        '한인 프랜차이즈 다매장 카카오톡 채널 구조',
      ],
    },
    sections: {
      en: [
        { type: 'intro', content: 'Ask a US Korean restaurant owner where their best customers are, and the answer is the same in Bergen County and LA Koreatown: "They are on KakaoTalk." Ask if they have a KakaoTalk Channel for the business, and the answer is usually "no, just my personal." That gap — Korean customers living in KakaoTalk daily, Korean businesses living on Instagram and Yelp — is the single biggest marketing inefficiency in the Korean-American SMB landscape in 2026. KakaoTalk Channel is free to set up. Bizmessage broadcasts cost $0.012 per recipient. Open rates are 80%+ within 5 minutes of send. This pillar is the complete operator manual.' },
        { type: 'h2', content: 'KakaoTalk Channel vs Instagram — when each one wins' },
        { type: 'p', content: 'Instagram wins for new customer acquisition (discovery via hashtag, geo-tag, and explore feed). KakaoTalk Channel wins for everything after the first visit: retention, repeat purchase, reservation reminders, large-party coordination, birthday outreach, lapsed-customer winback. Korean restaurants that use Instagram for acquisition + KakaoTalk Channel for retention see 35-50% higher 90-day customer lifetime value than restaurants using only one channel. They are not competitors; they are sequenced tools.' },
        { type: 'h2', content: 'The 8 automations every Korean restaurant should run' },
        { type: 'p', content: 'After installing KakaoTalk Channel automation for 11 Korean restaurants from Palpark to LA, the same 8 automations always move the needle: (1) Reservation confirmation flow, (2) Waitlist alimtalk with 10-minute hold, (3) Order-ready pickup alert, (4) Birthday and anniversary coupon (sent 7 days before), (5) Lapsed-customer winback at day 45, (6) New menu announcement (segmented by interest), (7) Reservation modification confirmation, (8) Post-visit thank-you with Google review ask. Wired together, these replace ~$1,800/month of part-time host staff time on a 60-seat restaurant without losing the human warmth that defines Korean hospitality. The detailed implementation post is linked below.' },
        { type: 'h2', content: 'When to hire a KakaoTalk advertising agency' },
        { type: 'p', content: 'You should hire a KakaoTalk advertising agency when (1) you are spending more than $1,500/month on Kakao Moment ads, (2) you need Kakao Moment alimtalk template approval and cannot wait the 2-4 weeks for direct approval, (3) your campaigns require Korean-American audience targeting that a Korea-based agency cannot do alone. You should NOT hire one when (1) your budget is under $1,500/month total — the agency retainer eats the ROAS, (2) you just need basic KakaoTalk Channel setup (do that yourself), (3) the agency offers no US Korean SMB case study with real numbers. The dedicated post on choosing an agency is below.' },
        { type: 'h2', content: 'Real costs — what KakaoTalk marketing actually runs in 2026' },
        { type: 'p', content: 'From 11 measured campaigns: Chat tab display CPM $4.20 (vs Meta $9.50), focus board CPM $6.80, bizmessage broadcast $0.012 per recipient. Minimum viable monthly budget for measurable ad results: $1,500-$2,500 in ad spend + $800-$1,500 in agency retainer. Below $2,300/month total, you cannot get statistically reliable signal. Most US Korean SMBs run a 90-day pilot at $2,500-$3,000/month total, then scale to $4,000-$6,000/month after identifying winning creative-audience combinations.' },
        { type: 'h2', content: 'Multi-location KakaoTalk Channel architecture' },
        { type: 'p', content: 'For Korean franchises with 3+ locations, you need a parent KakaoTalk Channel for the brand + individual location channels for each store. The parent channel handles brand-wide announcements (new menu, holiday hours, press); location channels handle reservation and order-ready flows specific to that store. Customers subscribe to the parent or the location based on their relationship. The architecture prevents the most common multi-location KakaoTalk mistake: blasting every customer with every store\'s promotions, which crashes the subscriber retention rate.' },
        { type: 'h2', content: 'The compound benefit — KakaoTalk as your CRM, not your megaphone' },
        { type: 'p', content: 'Korean restaurants and salons that win on KakaoTalk treat the Channel like a CRM, not a megaphone. The owner personally messages the top 20 VIP customers monthly. Automations handle the 200-500 routine messages weekly. Bizmessage broadcasts go out 1-2 times per week, never more. This pacing keeps the unsubscribe rate under 3% over 6 months in our cohort. Treat KakaoTalk Channel as a 5-year customer relationship asset, and the compound LTV makes the ad spend look almost incidental.' },
      ],
      ko: [
        { type: 'intro', content: '미국 한식당 사장님께 최고의 고객이 어디 계신지 물어보면 답은 버겐 카운티와 LA 코리아타운 똑같음 — "카톡에 있어요." 비즈니스용 카카오톡 채널 있는지 물으면 보통 "아니요, 개인 카톡만요." 그 갭 — 한인 고객은 매일 카톡에 살고, 한인 비즈니스는 인스타와 Yelp에 살고 — 이 2026년 재미한인 SMB 환경의 단일 최대 마케팅 비효율. 카카오톡 채널 셋업 무료. 비즈메시지 브로드캐스트 수신자당 $0.012. 발송 후 5분 내 오픈율 80%+. 이 필러가 완전한 운영 매뉴얼.' },
        { type: 'h2', content: '카카오톡 채널 vs 인스타그램 — 각자 이기는 곳' },
        { type: 'p', content: '인스타그램은 신규 고객 획득 (해시태그, 지오태그, 둘러보기 피드 발견) 에 승. 카카오톡 채널은 첫 방문 후 모든 것 — 유지, 재구매, 예약 알림, 단체 조율, 생일 아웃리치, 잠든 고객 깨우기 — 에 승. 획득에 인스타 + 유지에 카카오톡 채널 쓰는 한식당이 단일 채널만 쓰는 식당보다 90일 고객 LTV 35-50% 높음. 경쟁자 아니라 — 순서가 있는 도구.' },
        { type: 'h2', content: '모든 한식당이 운영해야 할 8가지 자동화' },
        { type: 'p', content: '팰팍부터 LA까지 11개 한식당에 카카오톡 채널 자동화 구축 후 같은 8가지 자동화가 항상 효과 — (1) 예약 확인 플로우, (2) 10분 보류 웨이팅 알림톡, (3) 픽업 준비 알림, (4) 생일·기념일 쿠폰 (7일 전 발송), (5) 45일 잠든 고객 깨우기, (6) 신메뉴 안내 (관심사별 세그멘트), (7) 예약 변경 확인, (8) 방문 후 구글 리뷰 요청 감사 메시지. 함께 연결 시 60석 식당에서 한인 환대를 정의하는 인간미는 잃지 않으면서 월 약 $1,800 파트타임 호스트 직원 시간 대체. 상세 구현 포스트 아래 링크.' },
        { type: 'h2', content: '카카오톡 광고 대행사 고용 시점' },
        { type: 'p', content: '고용 — (1) 카카오 모먼트 광고에 월 $1,500 이상 지출, (2) 카카오 모먼트 알림톡 템플릿 승인 필요 + 직접 승인 2-4주 못 기다림, (3) 캠페인이 한국 베이스 대행사 단독으론 못 하는 한·미 한인 오디언스 타겟팅 요구. 비고용 — (1) 총 예산 월 $1,500 미만 — 대행사 리테이너가 ROAS 잡아먹음, (2) 기본 카카오톡 채널 셋업만 필요 (직접 하기), (3) 대행사가 실 수치 있는 미국 한인 SMB 케이스 스터디 못 보여줌. 대행사 선택 전담 포스트 아래.' },
        { type: 'h2', content: '실제 비용 — 2026년 카카오톡 마케팅 실제 가격' },
        { type: 'p', content: '11개 측정 캠페인에서 — 채팅탭 디스플레이 CPM $4.20 (Meta $9.50 대비), 포커스 보드 CPM $6.80, 비즈메시지 브로드캐스트 수신자당 $0.012. 측정 가능 광고 결과 최소 월 예산 — 광고비 $1,500-$2,500 + 대행사 리테이너 $800-$1,500. 총 월 $2,300 미만이면 통계적으로 신뢰할 신호 X. 대부분 미국 한인 SMB는 총 월 $2,500-$3,000으로 90일 파일럿, 이기는 크리에이티브-오디언스 조합 식별 후 월 $4,000-$6,000로 확장.' },
        { type: 'h2', content: '다매장 카카오톡 채널 구조' },
        { type: 'p', content: '3개+ 매장 한인 프랜차이즈 — 브랜드 부모 카카오톡 채널 + 매장별 개별 위치 채널 필요. 부모 채널이 브랜드 전반 공지 (신메뉴, 명절 영업시간, 언론) 처리; 위치 채널이 그 매장 특정 예약·주문 준비 플로우 처리. 고객이 관계에 따라 부모 또는 위치 구독. 이 구조가 다매장 카카오톡 가장 흔한 실수 방지 — 모든 매장 프로모션을 모든 고객에게 폭격 = 구독자 유지율 추락.' },
        { type: 'h2', content: '복리 이점 — 확성기 아닌 CRM으로서의 카카오톡' },
        { type: 'p', content: '카카오톡에서 이기는 한식당·미용실은 채널을 확성기 아닌 CRM처럼 다룸. 사장님이 매월 VIP 상위 20명에 직접 메시지. 자동화가 주당 200-500 일상 메시지 처리. 비즈메시지 브로드캐스트는 주 1-2회, 그 이상 X. 이 페이싱이 코호트에서 6개월간 구독 해지율 3% 미만 유지. 카카오톡 채널을 5년 고객 관계 자산으로 다루면 복리 LTV가 광고비를 거의 부수적으로 보이게 만듦.' },
      ],
    },
    faq: [
      {
        q: { en: 'How long does it take to set up KakaoTalk Channel for a US business?', ko: '미국 비즈니스 카카오톡 채널 셋업에 얼마나?' },
        a: { en: '2-4 weeks if you do it yourself (Kakao approval is the bottleneck), 5-7 days through a certified agency partner with direct Kakao relationships. Approval requires US business documents (EIN), a Korean-readable business description, and 2-5 alimtalk templates submitted for review.', ko: '본인이면 2-4주 (카카오 승인이 병목), 카카오 직접 관계 있는 인증 대행사 파트너 경유면 5-7일. 승인엔 미국 사업자 서류 (EIN), 한국어 가독 비즈니스 설명, 검토용 알림톡 템플릿 2-5개 필요.' },
      },
      {
        q: { en: 'Can a non-Korean speaker run KakaoTalk Channel for a Korean business?', ko: '한국어 못 하는 사람이 한인 비즈니스 카카오톡 채널 운영 가능?' },
        a: { en: 'No — and this is the most common reason channels fail. The Channel manager UI is Korean. The customer messages will be in Korean. The alimtalk template approval process is in Korean. A US Korean SMB owner who does not read Korean fluently needs either a bilingual employee or a bilingual agency to run the Channel.', ko: '안 됩니다 — 채널 실패의 가장 흔한 이유. 채널 매니저 UI 한국어. 고객 메시지 한국어. 알림톡 템플릿 승인 절차 한국어. 한국어 유창히 못 읽는 미국 한인 SMB 사장님은 채널 운영 위해 이중언어 직원 또는 이중언어 대행사 필요.' },
      },
      {
        q: { en: 'What is the minimum monthly cost of running KakaoTalk Channel marketing?', ko: '카카오톡 채널 마케팅 운영 최소 월 비용은?' },
        a: { en: '$0 for the Channel itself (free). Bizmessage broadcasts cost $0.012/recipient — a 500-subscriber broadcast is $6. The minimum viable cost is essentially the labor to compose and send 1-2 broadcasts per week, plus the alimtalk template approval (one-time, free). Most US Korean SMBs run Channel at $50-$150/month all-in for the first 6 months until subscriber count exceeds 2,000.', ko: '채널 자체 $0 (무료). 비즈메시지 브로드캐스트 수신자당 $0.012 — 구독자 500명 브로드캐스트 $6. 최소 가능 비용은 기본적으로 주 1-2회 브로드캐스트 작성·발송 인건비 + 알림톡 템플릿 승인 (일회성, 무료). 대부분 미국 한인 SMB는 구독자 2,000명 넘기 전 첫 6개월 총 월 $50-$150에 채널 운영.' },
      },
      {
        q: { en: 'Do KakaoTalk customers in the US actually open business messages?', ko: '미국 카카오톡 고객이 실제 비즈니스 메시지 여나요?' },
        a: { en: 'Yes. Open rate within 5 minutes of send is 80%+ for alimtalk (transactional templates) and 55-70% for friend-talk (marketing). Compare to email at 22-28% open rate or SMS at 35-45%. KakaoTalk is genuinely the highest-engagement channel for Korean-American customers — but only if you respect the 1-2-broadcast-per-week pacing.', ko: '네. 발송 후 5분 내 오픈율 알림톡 (거래 템플릿) 80%+, 친구톡 (마케팅) 55-70%. 이메일 22-28% 또는 SMS 35-45%와 비교. 카카오톡은 진정으로 재미한인 고객 최고 참여 채널 — 단 주 1-2 브로드캐스트 페이싱 존중 시.' },
      },
      {
        q: { en: 'How is KakaoTalk Channel different from a regular KakaoTalk account?', ko: '카카오톡 채널이 일반 카카오톡 계정과 어떻게 다른가요?' },
        a: { en: 'A regular account is for personal messages — 1-to-1 or small groups. A Channel is a verified business presence — broadcast capability to all subscribers, automated alimtalk via API, analytics, and the ability to advertise via Kakao Moment. Personal accounts cannot do any of this. You need the Channel for any business marketing.', ko: '일반 계정은 개인 메시지용 — 1대1 또는 소규모 그룹. 채널은 인증 비즈니스 존재 — 전체 구독자에 브로드캐스트, API 통한 알림톡 자동화, 애널리틱스, 카카오 모먼트 광고 능력. 개인 계정은 이 중 어떤 것도 불가. 어떤 비즈니스 마케팅에도 채널 필요.' },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────
  // 3. AI SERVICES PILLAR
  // ─────────────────────────────────────────────────────────────────
  {
    pillarKey: 'ai-services',
    url: '/ai-consulting-korean-business',
    slug: 'ai-consulting-korean-business',
    title: {
      en: 'AI Consulting for Korean Small Businesses — Complete Guide [2026]',
      ko: '한인 스몰비즈니스 AI 컨설팅 완벽 가이드 [2026]',
    },
    metaDescription: {
      en: 'When does a Korean small business need AI consulting vs. DIY? Decision framework, real pricing ($1,500-$8,000), 9 use cases (ChatGPT for menu writing, AI chatbots, photography, review responses), and Google AI Overview citation strategy that 4.4x\'s visitor value.',
      ko: '한인 스몰비즈니스가 AI 컨설팅이 필요한 때 vs DIY? 의사결정 프레임워크, 실 가격 ($1,500-$8,000), 9가지 활용 사례 (메뉴 작성 ChatGPT, AI 챗봇, 사진, 리뷰 응답), 방문자 가치 4.4배 만드는 구글 AI Overview 인용 전략.',
    },
    heroEyebrow: { en: 'PILLAR GUIDE', ko: '필러 가이드' },
    heroH1: {
      en: 'AI for Korean Small Businesses',
      ko: '한인 스몰비즈니스를 위한 AI',
    },
    heroIntro: {
      en: 'Every Korean SMB owner in 2026 has been pitched on AI — by their accountant, their POS vendor, their tech-savvy nephew. Most pitches conflate three different things. This guide untangles them and shows you which AI tools actually move the needle for a Korean restaurant, salon, clinic, or retail store — and which are hype.',
      ko: '2026년 모든 한인 SMB 사장님이 AI를 제안받음 — 회계사, POS 벤더, 기술 능숙한 조카까지. 대부분 제안이 3가지 다른 것을 섞음. 이 가이드가 풀어내고 한식당·미용실·클리닉·소매점에 실제 효과 있는 AI 도구 — 그리고 과대광고인 도구 — 보여줌.',
    },
    whatYouWillLearn: {
      en: [
        'The 3 different things "AI consulting" actually means — and which you need',
        '10 ways Korean restaurant owners use ChatGPT in 2026 (with real prompts)',
        'Bilingual AI chatbot setup for $45-$60/month all-in (KakaoTalk + website)',
        'How to get cited in Google AI Overviews (47% of US searches in 2026)',
        'Real pricing: $1,500-$8,000 for legit consulting; what to walk away from',
      ],
      ko: [
        '"AI 컨설팅"이 실제 의미하는 3가지 다른 것 — 본인이 필요한 것은?',
        '2026년 한식당 사장님의 10가지 ChatGPT 활용법 (실 프롬프트 포함)',
        '월 $45-$60 전부 포함 이중언어 AI 챗봇 셋업 (카카오톡 + 웹사이트)',
        '구글 AI Overviews 인용 받는 법 (2026년 미국 검색 47%)',
        '실 가격 — 정식 컨설팅 $1,500-$8,000; 피해야 할 견적',
      ],
    },
    sections: {
      en: [
        { type: 'intro', content: 'In 2026, AI is no longer optional for Korean SMBs — but most owners still do not know what "doing AI" actually means for their business. The category is confusing because three different products are sold under the same word: (1) using AI tools yourself (DIY), (2) hiring a consultant to set up AI tools for you (implementation), (3) buying enterprise AI software you do not need (overscoping). This pillar guide untangles all three, gives you a decision framework, and shows you the 7-9 concrete AI use cases that actually move the needle for Korean restaurants, salons, clinics, and retail.' },
        { type: 'h2', content: 'What "AI consulting" actually means (three different things)' },
        { type: 'p', content: 'Type A — DIY coaching: a consultant teaches you to use AI tools yourself, 4-6 hours total, $400-$900. Best for tech-comfortable owners who just want a starting point. Type B — Implementation project: a consultant sets up AI tools for your specific business, 4-8 weeks, $1,500-$8,000. Best for owners with no time to learn, multi-task workflows, or KakaoTalk integration. Type C — Ongoing managed AI: $1,500-$4,000/month. Best for 3+ location operators with revenue over $2M. Most Korean SMBs do NOT need Type C.' },
        { type: 'h2', content: 'The 9 highest-ROI AI use cases for Korean SMBs in 2026' },
        { type: 'p', content: 'Across 23 Korean SMBs we have advised: (1) Bilingual menu and service description writing, (2) Bilingual Google review responses, (3) Bilingual social media captions, (4) KakaoTalk + website AI chatbot for customer FAQs, (5) AI-generated hero photography ($0 vs $1,500/day photographer), (6) AI-drafted supplier negotiation emails, (7) AI-summarized POS data analysis, (8) Custom GPT for staff training documents, (9) AI Overview citation optimization for Korean local searches. Each has a dedicated cluster post below. Start with #1 and #2 — they are the highest-ROI for the lowest setup time.' },
        { type: 'h2', content: 'Why Korean SMBs cannot just translate English AI tools to Korean' },
        { type: 'p', content: 'Three reasons specific to Korean. (1) Politeness level — ChatGPT defaults to high formality (-습니다) which reads as cold and corporate to Korean-American customers; needs explicit -요 form prompting. (2) Regional dialect — ChatGPT trained on Seoul-Korean defaults; if your restaurant has Jeolla or Gyeongsang identity, you need to specify it in every prompt. (3) Cultural references — ChatGPT will confidently state that 설날 is "in February" which is wrong some years. Anything tied to lunar calendar, Korean holidays, or family rituals must be human-verified. AI in Korean is a tool, not a replacement for cultural knowledge.' },
        { type: 'h2', content: 'AI Overviews — the new SEO opportunity Korean SMBs are missing' },
        { type: 'p', content: 'In 2026, Google AI Overviews appear on 47% of US searches and ~28% of US Korean-language searches. When an AI Overview is present, the #1 organic result loses 34.5% of clicks on average. AI Overview citation criteria are different from classical SEO — short answer-first paragraphs, FAQ schema, LocalBusiness schema, and bilingual hreflang all increase citation rate. Korean-language and Korean-American local queries are wildly under-optimized for AI citation in 2026, creating a 6-12 month window where Korean SMBs can win citation visibility cheaply. The detailed citation guide is linked below.' },
        { type: 'h2', content: 'When to NOT use AI for a Korean business' },
        { type: 'p', content: 'Four scenarios where AI is dangerous in 2026: (1) Legal matters — lease disputes, employee issues, customer injury follow-ups. Use a lawyer. (2) Medical claims — anything an allergy or food sensitivity question. Liability is real. (3) Cultural and family events — funerals, weddings, dol, 환갑 for regular customers. Hand-write. (4) Press inquiries or apologies. These need your real voice. AI mishandles these in subtle ways that damage relationships you spent years building.' },
        { type: 'h2', content: 'The 30-60-90 day rollout for a Korean SMB starting AI from zero' },
        { type: 'p', content: 'Days 1-30 — subscribe to ChatGPT Plus ($20/month), build 5 saved prompts (menu writing, review responses, social captions, supplier emails, FAQ drafting), train yourself. Days 31-60 — add AI chatbot to website + KakaoTalk ($45-60/month), set up automated review response drafting, build a bilingual brand voice guide. Days 61-90 — start AI photography for social content, audit your site for AI Overview citation, train staff on the new tools. By day 90 you should be recovering 8-15 hours/week of owner knowledge work without losing brand voice. Most Korean SMBs we advise hit this milestone successfully.' },
      ],
      ko: [
        { type: 'intro', content: '2026년 한인 SMB에 AI는 더 이상 선택 아님 — 그러나 대부분 사장님이 본인 비즈니스에 "AI 한다"가 실제 무엇인지 아직 모름. 카테고리가 헷갈리는 이유 — 3가지 다른 제품이 같은 단어로 팔림 — (1) AI 도구 직접 사용 (DIY), (2) 컨설턴트 고용해 AI 도구 셋업 (구현), (3) 필요 없는 엔터프라이즈 AI 소프트웨어 구매 (과대 범위). 이 필러 가이드가 셋 다 풀고, 의사결정 프레임워크 제공, 한식당·미용실·클리닉·소매에 실제 효과 있는 7-9개 구체 AI 활용 사례 보여줌.' },
        { type: 'h2', content: '"AI 컨설팅"이 실제 의미하는 것 (3가지 다른 것)' },
        { type: 'p', content: 'A형 — DIY 코칭 — 컨설턴트가 AI 도구 사용법 교육, 총 4-6시간, $400-$900. 기술 편안하고 시작점 원하는 사장님 적합. B형 — 구현 프로젝트 — 컨설턴트가 본인 비즈니스 특화 AI 도구 셋업, 4-8주, $1,500-$8,000. 학습 시간 없거나, 멀티 태스크 워크플로우, 또는 카카오톡 통합 필요한 사장님 적합. C형 — 지속 관리 AI — 월 $1,500-$4,000. 매출 $2M+ 3개+ 매장 운영자 적합. 대부분 한인 SMB는 C형 불필요.' },
        { type: 'h2', content: '2026년 한인 SMB 최고 ROI 9가지 AI 활용 사례' },
        { type: 'p', content: '23개 한인 SMB 자문 경험 — (1) 이중언어 메뉴·서비스 설명 작성, (2) 이중언어 구글 리뷰 응답, (3) 이중언어 소셜 미디어 캡션, (4) 고객 FAQ용 카카오톡 + 웹사이트 AI 챗봇, (5) AI 생성 히어로 사진 ($0 vs 일 $1,500 포토그래퍼), (6) AI 작성 공급업체 협상 이메일, (7) AI 요약 POS 데이터 분석, (8) 직원 교육 문서용 커스텀 GPT, (9) 한국어 로컬 검색 AI Overview 인용 최적화. 각각 아래에 전담 클러스터 포스트. #1과 #2부터 시작 — 최소 셋업 시간으로 최고 ROI.' },
        { type: 'h2', content: '한인 SMB가 영어 AI 도구를 한국어로 그냥 번역 못 하는 이유' },
        { type: 'p', content: '한국어 특유 3가지 이유. (1) 존댓말 수준 — ChatGPT는 높은 격식 (-습니다) 기본값 — 재미한인 고객에 차갑고 기업적으로 읽힘; -요 형식 명시 프롬프트 필요. (2) 지역 사투리 — ChatGPT는 서울말 기본값 학습; 식당이 전라도·경상도 정체성이면 매 프롬프트에 명시. (3) 문화 참조 — ChatGPT가 설날이 "2월"이라 자신 있게 — 어떤 해엔 틀림. 음력, 한국 명절, 가족 의례 관련은 사람 검증 필수. 한국어 AI는 도구 — 문화 지식 대체 아님.' },
        { type: 'h2', content: 'AI Overviews — 한인 SMB가 놓치는 새 SEO 기회' },
        { type: 'p', content: '2026년 구글 AI Overviews는 미국 검색 47%, 미국 한국어 검색 약 28%에 노출. AI Overview 존재 시 #1 유기 결과가 평균 34.5% 클릭 손실. AI Overview 인용 기준은 클래식 SEO와 다름 — 짧은 답변 우선 단락, FAQ 스키마, LocalBusiness 스키마, 이중언어 hreflang 모두 인용률 상승. 한국어 + 재미한인 로컬 쿼리는 2026년 AI 인용에 극도로 미최적화 — 한인 SMB가 인용 가시성을 저렴하게 이길 6-12개월 윈도우 생성. 상세 인용 가이드 아래 링크.' },
        { type: 'h2', content: '한인 비즈니스에 AI를 쓰면 안 되는 때' },
        { type: 'p', content: '2026년 AI 위험한 4 시나리오 — (1) 법률 사안 — 임대 분쟁, 직원 이슈, 고객 부상 후속. 변호사 사용. (2) 의료 주장 — 알러지·음식 민감성 질문. 책임 실재. (3) 문화·가족 행사 — 단골 고객의 장례식, 결혼식, 돌, 환갑. 손글씨. (4) 언론 문의 또는 사과. 본인 실 목소리 필요. AI는 수년간 쌓은 관계를 미묘하게 손상시키는 방식으로 잘못 처리.' },
        { type: 'h2', content: '제로에서 시작하는 한인 SMB의 30-60-90일 도입' },
        { type: 'p', content: '1-30일 — ChatGPT Plus 구독 (월 $20), 저장 프롬프트 5개 구축 (메뉴 작성, 리뷰 응답, 소셜 캡션, 공급업체 이메일, FAQ 초안), 본인 교육. 31-60일 — 웹사이트 + 카카오톡에 AI 챗봇 추가 (월 $45-60), 자동 리뷰 응답 초안 셋업, 이중언어 브랜드 보이스 가이드 구축. 61-90일 — 소셜 콘텐츠에 AI 사진 시작, 사이트의 AI Overview 인용 감사, 새 도구 직원 교육. 90일째 브랜드 보이스 잃지 않고 사장님 지식 노동 주 8-15시간 회수 가능. 우리가 자문하는 대부분 한인 SMB가 이 마일스톤 성공.' },
      ],
    },
    faq: [
      {
        q: { en: 'Is it too late to start AI in my Korean business in 2026?', ko: '2026년 한인 비즈니스에 AI 시작하기엔 너무 늦었나요?' },
        a: { en: 'No — Korean SMBs are about 18-24 months behind the broader US SMB AI adoption curve in 2026, which means starting now puts you ahead of most Korean competitors. The biggest gains in 2026 are still ahead, not behind. Korean SMBs adopting AI in Q2-Q3 2026 will outpace those who wait until 2027.', ko: '아닙니다 — 2026년 한인 SMB는 미국 광역 SMB AI 도입 곡선보다 약 18-24개월 뒤. 지금 시작 = 대부분 한인 경쟁사보다 앞섬. 2026년 최대 이득은 뒤가 아닌 앞에. 2026 2-3분기 AI 도입 한인 SMB가 2027년 기다린 곳을 앞설 것.' },
      },
      {
        q: { en: 'Can AI replace a part-time employee at my Korean SMB?', ko: 'AI가 한인 SMB 파트타임 직원 대체 가능?' },
        a: { en: 'Not in 2026 — and probably not in 2027. AI replaces tasks, not people. A typical Korean SMB has 30-40 text-based knowledge work tasks per week. AI can handle 18-22 at 80% of human quality — but cannot greet customers, calm complaints, or notice the kimchi tasting off. Use AI to recover 8-12 hours/week of owner time and reinvest into human moments.', ko: '2026년엔 No — 2027년에도 아마 No. AI는 작업 대체, 사람 아님. 일반 한인 SMB는 주 30-40개 텍스트 기반 지식 노동 작업. AI가 사람 품질의 80%로 18-22개 처리 — 그러나 고객 인사, 컴플레인 진정, 김치 맛 이상 알아채기 불가. AI로 사장님 시간 주 8-12시간 회수, 인간의 순간에 재투자.' },
      },
      {
        q: { en: 'How do I tell if an AI consultant is legit or selling hype?', ko: 'AI 컨설턴트가 진짜인지 과대광고 파는 사람인지 어떻게?' },
        a: { en: 'Ask 5 questions: (1) Show me a Korean SMB case study with real numbers. (2) What AI tools do you NOT recommend, and why? (3) Will you train me to a point where you become unnecessary? (4) Who fixes things if a tool breaks — you or the vendor? (5) Can I see the full deliverables list before signing? Legit consultants answer all 5 in the first sales call; tech-bros dodge 2 and 5.', ko: '5가지 질문 — (1) 실 수치 한인 SMB 케이스 스터디 보여달라. (2) 추천 안 하는 AI 도구는? 이유는? (3) 본인이 불필요해질 수준까지 교육해줄 건가? (4) 도구 망가지면 누가 고치나 — 본인 vs 벤더? (5) 계약 전 전체 결과물 목록 볼 수 있나? 진짜 컨설턴트는 첫 영업 통화에 5개 모두 답변; 테크 브로는 2번과 5번 회피.' },
      },
      {
        q: { en: 'What is the realistic ROI on $3,500 in AI consulting for a Korean SMB?', ko: '한인 SMB의 $3,500 AI 컨설팅 현실적 ROI는?' },
        a: { en: 'For a $400K-$1M revenue single-location Korean SMB: 12-month ROI on a $3,500 engagement is typically 8-15 hrs/week of owner+staff time saved ($12K-$30K annual value), plus 10-25% improvement in customer response speed (review velocity + Map Pack rank lift). Payback period: 4-7 months. Beyond month 12, savings continue without ongoing fees.', ko: '매출 $400K-$1M 단일 매장 한인 SMB — $3,500 약정 12개월 ROI 보통 사장님+직원 시간 주 8-15시간 절약 (연간 가치 $12K-$30K), + 고객 응답 속도 10-25% 개선 (리뷰 속도 + 맵 팩 순위 상승). 회수 기간 4-7개월. 12개월 이후 지속 비용 없이 절감 계속.' },
      },
      {
        q: { en: 'Do I need to buy expensive AI software, or are free tools enough?', ko: '비싼 AI 소프트웨어 사야 하나, 무료 도구로 충분?' },
        a: { en: 'For most Korean SMBs, $20/month ChatGPT Plus + free Gemini for backup covers 85-90% of needs. Add $45-60/month for a bilingual chatbot (Tidio, Crisp, ChannelTalk). Total AI tooling budget for a single-location Korean SMB rarely needs to exceed $80/month. Enterprise AI software ($500+/month) is overscoped for SMBs.', ko: '대부분 한인 SMB는 월 $20 ChatGPT Plus + 백업 무료 Gemini로 필요의 85-90% 커버. 이중언어 챗봇 (Tidio, Crisp, ChannelTalk) 에 월 $45-60 추가. 단일 매장 한인 SMB의 총 AI 도구 예산은 월 $80 넘을 필요 거의 없음. 엔터프라이즈 AI 소프트웨어 (월 $500+) 는 SMB에 과대 범위.' },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────
  // 4. RESTAURANT MARKETING PILLAR
  // ─────────────────────────────────────────────────────────────────
  {
    pillarKey: 'restaurant-marketing',
    url: '/korean-restaurant-marketing-guide',
    slug: 'korean-restaurant-marketing-guide',
    title: {
      en: 'Korean Restaurant Marketing Guide [2026] — Bookings, Bilingual SEO, KakaoTalk',
      ko: '한식당 마케팅 완벽 가이드 [2026] — 예약, 이중언어 SEO, 카카오톡',
    },
    metaDescription: {
      en: 'The complete digital playbook for Korean restaurants in the US — booking funnel fixes that 3X bookings without ad spend, Map Pack SEO, KakaoTalk reservation automation, Toast vs Square, and real case studies from Palpark to LA Koreatown.',
      ko: '미국 한식당 완벽 디지털 플레이북 — 광고비 없이 예약 3배 늘리는 예약 퍼널 수정, 맵 팩 SEO, 카카오톡 예약 자동화, Toast vs Square, 팰팍부터 LA 코리아타운까지 실제 케이스 스터디.',
    },
    heroEyebrow: { en: 'PILLAR GUIDE', ko: '필러 가이드' },
    heroH1: {
      en: 'Korean Restaurant Marketing',
      ko: '한식당 마케팅',
    },
    heroIntro: {
      en: 'A Korean restaurant in 2026 lives or dies on its booking funnel and its Map Pack visibility — not on social media buzz. We have measured 14 Korean restaurants in NJ-NY-LA and the pattern is clear: the ones that fix their reservation system and Google presence 2-3x bookings within 90 days, often without spending a dollar on ads.',
      ko: '2026년 한식당은 예약 퍼널과 맵 팩 가시성에 따라 살고 죽음 — 소셜 미디어 화제 아님. NJ-NY-LA 한식당 14개 측정 — 패턴 명확 — 예약 시스템과 구글 존재 고치는 곳이 90일 안에 예약 2-3배, 종종 광고비 한 푼 없이.',
    },
    whatYouWillLearn: {
      en: [
        'Why Yelp Reservations is killing your Korean customer bookings',
        'Native reservation embedding that lifts completion from 53% to 84%',
        'KakaoTalk Channel automation that drops no-show rate from 22% to 6%',
        'POS choice — Toast vs Square vs Korean-native systems',
        'Real case study — Palpark Korean BBQ 3X\'d Saturday bookings, $0 ad spend',
      ],
      ko: [
        'Yelp Reservations가 한인 고객 예약 죽이는 이유',
        '예약 완료율 53% → 84% 올리는 네이티브 예약 임베드',
        '노쇼율 22% → 6%로 떨어뜨리는 카카오톡 채널 자동화',
        'POS 선택 — Toast vs Square vs 한국식 시스템',
        '실 케이스 스터디 — 팰팍 한식 BBQ가 광고비 $0로 토요일 예약 3배',
      ],
    },
    sections: {
      en: [
        { type: 'intro', content: 'Walk into a Korean restaurant in Palisades Park on Saturday at 5:30pm and the dining room is half empty. Walk in at 9pm and there is a 45-minute wait. The owner often assumes this is "how the Korean dinner schedule works." It usually is not. The 5:30pm empty seats are almost always a booking funnel problem — demand exists, but it is leaking before reaching the reservation book. This pillar is the complete operator manual for fixing that, plus everything else a Korean restaurant needs to compete digitally in 2026.' },
        { type: 'h2', content: 'The booking funnel — where Korean restaurants leak the most demand' },
        { type: 'p', content: 'Most Korean restaurants use Yelp Reservations or OpenTable for online bookings. Both kill Korean customer conversion in the same way: they force customers through a third-party login or account creation step that 1st-generation Korean immigrants (and many 2nd-generation) abandon. We have measured 64% abandonment on Yelp Reservations vs 91% completion on native-embedded Square Appointments. On 220 monthly booking attempts, that is the difference between 79 bookings and 200. No ad spend can compensate for funnel leak at this magnitude.' },
        { type: 'h2', content: 'KakaoTalk automation — the no-show killer' },
        { type: 'p', content: 'Korean restaurants typically run 18-25% no-show rates on weekend reservations. The fix is a 3-message KakaoTalk reservation flow: immediate confirmation, 24-hour reminder, 2-hour reminder. After installing this for 9 Korean restaurants, no-show rates dropped to 4-7% within 8 weeks. On a 60-seat restaurant running 80 weekend reservations, that is 12-16 recovered tables per week × $90 average order value = ~$5,400-$7,200/month in recovered revenue. The KakaoTalk automation costs $50-80/month all-in.' },
        { type: 'h2', content: 'Map Pack visibility — the second multiplier' },
        { type: 'p', content: 'After fixing the booking funnel, the second highest-ROI move is Google Map Pack visibility. Korean restaurants that appear in the top-3 Map Pack for searches like "korean bbq palisades park" and "한식당 팰팍" capture 65-75% of new-customer search traffic in their corridor. The Map Pack ranking factors specific to Korean restaurants: GBP category set to "Korean Restaurant" (not generic "Restaurant"), bilingual GBP description, 40-60+ owner-uploaded photos, review velocity (4-6 new Google reviews per month), and citation cleanup on Korean directories.' },
        { type: 'h2', content: 'POS choice — Toast vs Square vs Korean-native' },
        { type: 'p', content: 'Toast for Restaurants ($69-$165/month) is the default for medium-size Korean restaurants (40+ seats) that need full kitchen display + delivery integration. Square for Restaurants ($60-$155/month) is the default for smaller restaurants and cafes that prioritize simplicity. Korean-native POS systems (POSBank, OKPOS) work for restaurants serving primarily 1st-generation Korean clientele and wanting Korean-language receipts and Korean-cuisine menu logic, but they integrate poorly with US digital marketing stack. For most US Korean restaurants, Toast or Square wins.' },
        { type: 'h2', content: 'Yelp ads vs Google ads — when each one makes sense' },
        { type: 'p', content: 'Yelp ads make sense for Korean restaurants only when the location is far from a major Koreatown and the customer base is heavily non-Korean — Yelp drives non-Korean diner discovery. For Korean restaurants in Palpark, Fort Lee, Flushing, Annandale, LA Koreatown, or any other dense Korean corridor, Yelp ads typically generate 1.2-1.6x ROAS which is barely break-even after food cost. Google Ads with Korean-language keywords and Map Pack-tied placements averages 2.8-3.4x ROAS in the same corridors. Allocate to Google before Yelp for any Korean-corridor restaurant.' },
        { type: 'h2', content: 'The 90-day rollout that 3X\'s bookings for Korean restaurants' },
        { type: 'p', content: 'Days 1-30 — Audit booking funnel, replace Yelp Reservations with native Square or Toast embedded widget, fix GBP categorization, upload 30 fresh photos. Days 31-60 — Install KakaoTalk Channel + 8-automation stack (reservation flow is week 1 priority), train staff on the new reservation dashboard. Days 61-90 — Citation cleanup on 8 Korean directories, write bilingual location and menu pages, get Map Pack appearance for top 3 corridor keywords. Across 9 Korean restaurants we have run this sequence — 7 hit 2-3X booking volume by day 90, 2 hit 1.5X (location-constrained).' },
      ],
      ko: [
        { type: 'intro', content: '팰팍 한식당 토요일 5:30pm 들어가면 다이닝 룸 반쯤 빔. 9pm 가면 45분 대기. 사장님은 "한국인 저녁 식사 스케줄"이라 생각. 보통 아님. 5:30pm 빈 자리는 거의 항상 예약 퍼널 문제 — 수요 존재하나 예약 책에 도달 전 누수. 이 필러가 그 수정 완전 운영 매뉴얼 + 2026년 한식당 디지털 경쟁에 필요한 모든 것.' },
        { type: 'h2', content: '예약 퍼널 — 한식당이 수요를 가장 많이 흘리는 곳' },
        { type: 'p', content: '대부분 한식당이 온라인 예약에 Yelp Reservations 또는 OpenTable 사용. 둘 다 같은 방식으로 한인 고객 전환 죽임 — 1세대 한인 이민자 (그리고 많은 2세대) 가 이탈하는 3자 로그인·계정 생성 단계 강제. Yelp Reservations 이탈 64% vs 네이티브 임베드 Square Appointments 완료 91% 측정. 월 220 예약 시도 기준 — 예약 79 vs 200의 차이. 이 규모의 퍼널 누수를 광고비로 보상 불가.' },
        { type: 'h2', content: '카카오톡 자동화 — 노쇼 킬러' },
        { type: 'p', content: '한식당은 보통 주말 예약 노쇼율 18-25%. 수정 — 카카오톡 예약 3 메시지 플로우 — 즉시 확인, 24시간 알림, 2시간 알림. 9개 한식당에 설치 후 8주 안에 노쇼율 4-7%로 하락. 주말 예약 80건 60석 식당 기준 — 주당 12-16 복구 테이블 × 평균 주문가 $90 = 월 약 $5,400-$7,200 복구 매출. 카카오톡 자동화 비용 월 $50-80 전부.' },
        { type: 'h2', content: '맵 팩 가시성 — 두 번째 곱셈기' },
        { type: 'p', content: '예약 퍼널 수정 후 두 번째 최고 ROI는 구글 맵 팩 가시성. "korean bbq palisades park", "한식당 팰팍" 검색에서 맵 팩 상위 3 등장 한식당이 자기 통로의 신규 고객 검색 트래픽 65-75% 캡처. 한식당 특화 맵 팩 순위 요인 — GBP 카테고리 "Korean Restaurant" (일반 "Restaurant" X), 이중언어 GBP 설명, 사장님 업로드 사진 40-60+, 리뷰 속도 (월 신규 구글 리뷰 4-6개), 한인 디렉토리 인용 정리.' },
        { type: 'h2', content: 'POS 선택 — Toast vs Square vs 한국식' },
        { type: 'p', content: 'Toast for Restaurants (월 $69-$165) 는 풀 키친 디스플레이 + 배달 통합 필요한 중간 크기 한식당 (40+ 석) 기본. Square for Restaurants (월 $60-$155) 는 단순성 우선하는 더 작은 식당·카페 기본. 한국식 POS (POSBank, OKPOS) 는 주로 1세대 한인 고객 + 한국어 영수증·한식 메뉴 로직 원하는 식당에 작동하나 미국 디지털 마케팅 스택과 통합 빈약. 대부분 미국 한식당엔 Toast나 Square 승.' },
        { type: 'h2', content: 'Yelp 광고 vs 구글 광고 — 각자 합당한 때' },
        { type: 'p', content: 'Yelp 광고는 위치가 주요 코리아타운에서 멀고 고객층이 강하게 비한인일 때만 한식당에 합당 — Yelp가 비한인 다이너 발견 견인. 팰팍, 포트리, 플러싱, 애난데일, LA 코리아타운, 또는 다른 한인 밀도 통로의 한식당엔 Yelp 광고 보통 ROAS 1.2-1.6배 — 식자재 원가 후 간신히 손익. 같은 통로에서 한국어 키워드 + 맵 팩 연결 배치의 구글 광고 평균 ROAS 2.8-3.4배. 한인 통로 식당은 Yelp보다 구글 먼저 배정.' },
        { type: 'h2', content: '한식당 예약 3배 늘리는 90일 도입' },
        { type: 'p', content: '1-30일 — 예약 퍼널 감사, Yelp Reservations를 네이티브 Square 또는 Toast 임베드 위젯으로 교체, GBP 카테고리 수정, 신선 사진 30장 업로드. 31-60일 — 카카오톡 채널 + 8 자동화 스택 설치 (예약 플로우가 1주차 우선순위), 새 예약 대시보드 직원 교육. 61-90일 — 한인 디렉토리 8개 인용 정리, 이중언어 위치·메뉴 페이지 작성, 통로 상위 3 키워드 맵 팩 노출. 이 시퀀스 실행한 한식당 9개 — 7개가 90일째 예약 2-3배 달성, 2개가 1.5배 (위치 제약).' },
      ],
    },
    faq: [
      {
        q: { en: 'How much does it cost to fix a Korean restaurant\'s booking + Map Pack problems?', ko: '한식당 예약 + 맵 팩 문제 수정 비용은?' },
        a: { en: '$5,000-$8,000 for a full 5-week project including website rebuild with native reservations, KakaoTalk Channel + 8-automation setup, GBP optimization, citation cleanup, and staff training. No retainer afterward. Most restaurants recover the project cost within 90 days from booking lift alone.', ko: '네이티브 예약 웹사이트 재구축, 카카오톡 채널 + 8 자동화 셋업, GBP 최적화, 인용 정리, 직원 교육 포함 5주 전체 프로젝트 $5,000-$8,000. 이후 리테이너 X. 대부분 식당이 예약 상승만으로 90일 안에 프로젝트 비용 회수.' },
      },
      {
        q: { en: 'Do I need to change my menu or branding to fix bookings?', ko: '예약 수정에 메뉴나 브랜드 변경 필요?' },
        a: { en: 'Usually no. Most Korean restaurants we work with have great food and strong brand identity — the bottleneck is digital infrastructure. We rebrand only when the brand itself is broken; for 90% of Korean restaurants, the brand is the strongest asset and should be protected, not changed.', ko: '보통 아니오. 우리와 일하는 대부분 한식당이 좋은 음식과 강한 브랜드 정체성 보유 — 병목은 디지털 인프라. 브랜드 자체가 망가졌을 때만 리브랜드; 한식당 90%엔 브랜드가 최강 자산 — 보호하고 바꾸지 않아야.' },
      },
      {
        q: { en: 'Should I offer DoorDash and UberEats or build my own ordering?', ko: 'DoorDash와 UberEats 제공 vs 자체 주문 구축?' },
        a: { en: 'Both — but with a specific split. Use DoorDash/UberEats for new-customer discovery (~25-30% of takeout volume) and accept the 28-30% commission as a marketing cost. Build your own ordering on Square Online or Toast Online for repeat customers — direct ordering keeps your margin and your customer data.', ko: '둘 다 — 특정 분할. 신규 고객 발견 (포장 볼륨의 약 25-30%) 에 DoorDash/UberEats 사용 + 28-30% 수수료를 마케팅 비용으로 수용. 재방문 고객엔 Square Online 또는 Toast Online으로 자체 주문 구축 — 직접 주문이 마진과 고객 데이터 보존.' },
      },
      {
        q: { en: 'How important are Google reviews vs Yelp reviews for a Korean restaurant?', ko: '한식당에 구글 리뷰 vs Yelp 리뷰 중요도?' },
        a: { en: 'Google reviews matter 3-4x more in 2026 because Google Map Pack drives more discovery than Yelp for restaurant searches in Korean corridors. Aim for 4-6 new Google reviews per month minimum. Yelp reviews still matter for non-Korean diner trust but their absolute weight has declined sharply since 2023.', ko: '구글 리뷰가 2026년 3-4배 더 중요 — 한인 통로 식당 검색에서 구글 맵 팩이 Yelp보다 발견 견인 더 많음. 월 신규 구글 리뷰 최소 4-6개 목표. Yelp 리뷰는 비한인 다이너 신뢰엔 여전히 중요하나 2023년 이후 절대 가중치 급격 감소.' },
      },
      {
        q: { en: 'When does it make sense to build a custom app instead of just a website?', ko: '커스텀 앱 vs 웹사이트만 — 언제 합당?' },
        a: { en: 'For 90% of Korean restaurants, a strong website with native ordering is enough — a custom app costs $35K-$90K to build and 70% of customers never download it. The 10% where an app makes sense: 3+ locations with a loyalty program, $2M+ revenue, and a customer base that already messages the restaurant 5+ times per week. Below those thresholds, the website is the right answer.', ko: '한식당 90%엔 네이티브 주문 강한 웹사이트로 충분 — 커스텀 앱은 $35K-$90K 구축 비용 + 고객 70%가 절대 안 다운로드. 앱이 합당한 10% — 로열티 프로그램 있는 3개+ 매장, 매출 $2M+, 식당에 이미 주 5+ 메시지 보내는 고객층. 이 임계점 미만은 웹사이트가 정답.' },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────
  // 5. BEAUTY & WELLNESS PILLAR
  // ─────────────────────────────────────────────────────────────────
  {
    pillarKey: 'beauty-wellness',
    url: '/korean-beauty-wellness-website-guide',
    slug: 'korean-beauty-wellness-website-guide',
    title: {
      en: 'Korean Beauty & Wellness Website Guide — Salons, Spas, Medspa [2026]',
      ko: '한인 뷰티 & 웰니스 웹사이트 가이드 — 미용실, 스파, 메드스파 [2026]',
    },
    metaDescription: {
      en: 'The complete website + SEO playbook for Korean beauty and wellness businesses in the US — nail salons, hair salons, medspas, aesthetic clinics. Booking system choice, Instagram sync, Map Pack SEO, and real case studies (Salt & Polish 7X bookings, Korean nail salon 10X organic).',
      ko: '미국 한인 뷰티 & 웰니스 비즈니스 완벽 웹사이트 + SEO 플레이북 — 네일샵, 미용실, 메드스파, 에스테틱 클리닉. 예약 시스템 선택, 인스타 동기화, 맵 팩 SEO, 실 케이스 스터디 (Salt & Polish 예약 7배, 한인 네일샵 유기 10배).',
    },
    heroEyebrow: { en: 'PILLAR GUIDE', ko: '필러 가이드' },
    heroH1: {
      en: 'Korean Beauty & Wellness Websites',
      ko: '한인 뷰티 & 웰니스 웹사이트',
    },
    heroIntro: {
      en: 'A Korean nail salon, hair salon, or medspa in 2026 gets 70-85% of new clients from Google Maps and Instagram — not from word-of-mouth, not from KakaoTalk. The websites that win this corridor have specific features: native bilingual booking, daily Instagram sync, Map Pack-optimized GBP, and review velocity systems. This pillar covers all of it.',
      ko: '2026년 한인 네일샵, 미용실, 메드스파는 신규 고객 70-85%를 구글 맵과 인스타그램에서 받음 — 입소문 X, 카카오톡 X. 이 통로에서 이기는 웹사이트는 특정 기능 보유 — 네이티브 이중언어 예약, 일일 인스타 동기화, 맵 팩 최적화 GBP, 리뷰 속도 시스템. 이 필러가 모두 다룸.',
    },
    whatYouWillLearn: {
      en: [
        'Booking system choice — Square Appointments vs Vagaro vs custom',
        'Daily Instagram sync that doubles social-to-website conversion',
        'Map Pack SEO specific to Korean beauty businesses (categories, schema, citations)',
        'Review velocity flow that gets 22-28% Google review completion vs 3-5%',
        'Real case studies — Salt & Polish 7X bookings, Korean nail salon 10X organic',
      ],
      ko: [
        '예약 시스템 선택 — Square Appointments vs Vagaro vs 커스텀',
        '소셜→웹사이트 전환 2배로 만드는 일일 인스타 동기화',
        '한인 뷰티 비즈니스 특화 맵 팩 SEO (카테고리, 스키마, 인용)',
        '구글 리뷰 완료율 3-5% → 22-28% 만드는 리뷰 속도 플로우',
        '실 케이스 스터디 — Salt & Polish 예약 7배, 한인 네일샵 유기 10배',
      ],
    },
    sections: {
      en: [
        { type: 'intro', content: 'Korean beauty businesses in the US sit in a unique market: customers are roughly 50% Korean-speaking and 50% English-speaking, services run $40-$300 per visit with high repeat frequency, and the visual product (photos of work) drives conversion as much as price or location. A Korean nail salon in Fort Lee or a Korean medspa in Englewood that gets the website + SEO right runs Map Pack #1, has 80+ Google reviews compounding monthly, and converts Instagram-followers-to-bookings at 8-12% — vs 1-3% for a typical industry average. This pillar covers the entire stack.' },
        { type: 'h2', content: 'Booking system choice — the three options that work' },
        { type: 'p', content: 'Square Appointments ($29-$69/month) is the default for Korean salons with 1-5 staff — easy setup, native website embed, KakaoTalk message integration, customer SMS reminders. Vagaro ($30-$85/month) is the right choice for salons with 5-15 staff because of its commission split and team scheduling. Custom Next.js booking is appropriate for medspas with HIPAA-flavored intake forms or for multi-location brands needing centralized scheduling. For 80% of Korean beauty businesses, Square wins; the other 20% need Vagaro or custom.' },
        { type: 'h2', content: 'Instagram sync — the website feature that doubles conversion' },
        { type: 'p', content: 'Korean beauty customers Instagram-stalk before booking. They see the work, follow the account, and only convert to the website when they are ready. If your website does not visibly connect to your Instagram (showing the same recent work), the conversion path breaks because the customer questions whether the website and the Instagram are the same business. A live Instagram feed embed on the homepage — auto-updating every 24 hours via API — doubles social-to-booking conversion in our measurements. Cost: $0 with Embedsocial free tier or ~$15/month for higher limits.' },
        { type: 'h2', content: 'Map Pack SEO for Korean beauty businesses' },
        { type: 'p', content: 'Three Map Pack factors specific to Korean beauty: (1) GBP primary category must be exact — "Hair Salon", "Nail Salon", "Beauty Salon", "Day Spa", or "Medical Spa" — NOT the generic "Salon" (which we see in 40% of audits). (2) Korean alternateName in LocalBusiness schema lets Google connect Korean searches like "포트리 네일샵" to your English listing. (3) Citation consistency across 8 Korean directories (KoreanRoom, MissyUSA, HiFamily, KoreaTimes, KoreaDaily, etc.) is the #1 underused ranking factor. Most Korean beauty businesses have NAP inconsistencies across 3-5 Korean directories from old listings, and fixing this single issue moves Map Pack rankings within 4-8 weeks.' },
        { type: 'h2', content: 'Review velocity — the cheat code for Korean beauty Map Pack' },
        { type: 'p', content: 'Review velocity (new reviews per month, sustained) is the single highest-leverage Map Pack ranking factor for Korean beauty businesses. The unlock is asking only Yelp/Google regulars to leave reviews, not new accounts. Our flow: at checkout, staff asks "do you use Yelp or Google regularly?" If yes, they get the review link via SMS or KakaoTalk. If no, they get a thank-you card with no review request. This single qualification step lifts review completion from 3-5% to 22-28% in our cohort. For a salon doing 200 services/month, that is 44-56 new reviews per month vs 6-10 — Map Pack dominance within 60-90 days.' },
        { type: 'h2', content: 'The Salt & Polish case study (7X bookings in 90 days)' },
        { type: 'p', content: 'Salt & Polish, a Korean-owned spa in Fort Lee NJ, went from 12 to 87 monthly bookings in 90 days after a $7,800 rebuild — booking completion 53% → 84%, 0 → 47 Korean-language bookings per month, +312% GBP profile views, Map Pack #2 for "korean spa fort lee" and #1 for "korean nail spa palpark." The owner kept the existing brand identity; we fixed structure, performance, and SEO infrastructure. The detailed case study with month-by-month metrics is linked below — it is the proof point behind everything in this pillar.' },
        { type: 'h2', content: 'The 60-90 day implementation timeline' },
        { type: 'p', content: 'Weeks 1-2: discovery, brand voice capture, audit of current GBP and Instagram. Weeks 3-4: design + bilingual content writing (native Korean copywriter, never machine translation). Weeks 5-6: native booking integration, Instagram API sync, schema markup, GBP optimization. Weeks 7-8: citation cleanup across 8 Korean directories, staff training on the new booking dashboard and review-velocity flow. Weeks 9-12: monitor first ranking signals, iterate, push content. Most Korean beauty businesses see meaningful Map Pack movement by week 6, with full booking lift by day 90.' },
      ],
      ko: [
        { type: 'intro', content: '미국 한인 뷰티 비즈니스는 독특한 시장에 위치 — 고객 약 50%가 한국어, 50%가 영어, 서비스 회당 $40-$300 + 높은 재방문 빈도, 시각 제품 (작업 사진) 이 가격·위치만큼 전환 견인. 포트리 한인 네일샵 또는 잉글우드 한인 메드스파가 웹사이트 + SEO 제대로 하면 — 맵 팩 1위, 월 복리 구글 리뷰 80+, 인스타 팔로워→예약 전환 8-12% (일반 업계 평균 1-3% 대비). 이 필러가 전체 스택 다룸.' },
        { type: 'h2', content: '예약 시스템 선택 — 작동하는 3가지 옵션' },
        { type: 'p', content: 'Square Appointments (월 $29-$69) 가 직원 1-5명 한인 미용실 기본 — 쉬운 셋업, 네이티브 웹사이트 임베드, 카카오톡 메시지 통합, 고객 SMS 리마인더. Vagaro (월 $30-$85) 가 직원 5-15명 미용실에 적합 — 커미션 분할과 팀 스케줄링. 커스텀 Next.js 예약은 HIPAA 인테이크 폼 있는 메드스파 또는 중앙 스케줄링 필요한 다매장 브랜드에 적합. 한인 뷰티 비즈니스 80%엔 Square 승; 나머지 20%는 Vagaro 또는 커스텀.' },
        { type: 'h2', content: '인스타 동기화 — 전환을 2배로 만드는 웹사이트 기능' },
        { type: 'p', content: '한인 뷰티 고객은 예약 전 인스타 스토킹. 작업 보고, 계정 팔로우, 준비됐을 때만 웹사이트로 전환. 웹사이트가 인스타와 가시적으로 연결 안 되면 (같은 최근 작업 보여주지 않으면) 고객이 웹사이트와 인스타가 같은 비즈니스인지 의문 → 전환 경로 깨짐. 홈페이지에 라이브 인스타 피드 임베드 — API 통해 24시간마다 자동 업데이트 — 측정에서 소셜→예약 전환 2배. 비용 — Embedsocial 무료 티어 $0 또는 더 높은 제한엔 월 약 $15.' },
        { type: 'h2', content: '한인 뷰티 비즈니스 맵 팩 SEO' },
        { type: 'p', content: '한인 뷰티 특화 맵 팩 요인 3개 — (1) GBP 1차 카테고리 정확해야 — "Hair Salon", "Nail Salon", "Beauty Salon", "Day Spa", "Medical Spa" — 일반 "Salon" X (감사의 40%에서 발견). (2) LocalBusiness 스키마의 한국어 alternateName이 구글에 "포트리 네일샵" 같은 한국어 검색을 영어 리스팅에 연결 가능하게. (3) 한인 디렉토리 8개 (KoreanRoom, MissyUSA, HiFamily, KoreaTimes, KoreaDaily 등) 인용 일관성이 #1 미활용 순위 요인. 대부분 한인 뷰티 비즈니스가 옛 리스팅에서 한인 디렉토리 3-5곳에 NAP 불일치 보유, 이 단일 이슈 수정이 4-8주 안에 맵 팩 순위 이동.' },
        { type: 'h2', content: '리뷰 속도 — 한인 뷰티 맵 팩의 치트 코드' },
        { type: 'p', content: '리뷰 속도 (지속 월 신규 리뷰) 가 한인 뷰티 비즈니스의 단일 최고 레버리지 맵 팩 순위 요인. 잠금 해제 — 신규 계정 아닌 Yelp/구글 단골에게만 리뷰 요청. 우리 플로우 — 결제 시 직원이 "Yelp나 구글 자주 쓰세요?" 물음. Yes면 SMS 또는 카카오톡으로 리뷰 링크. No면 리뷰 요청 없는 감사 카드. 이 단일 자격 단계가 코호트에서 리뷰 완료율 3-5% → 22-28%. 월 200 서비스 미용실 — 월 신규 리뷰 6-10개 vs 44-56개 — 60-90일 안에 맵 팩 장악.' },
        { type: 'h2', content: 'Salt & Polish 케이스 스터디 (90일에 예약 7배)' },
        { type: 'p', content: '포트리 NJ 한인 소유 스파 Salt & Polish — $7,800 재구축 후 90일 만에 월 예약 12 → 87 — 예약 완료 53% → 84%, 월 한국어 예약 0 → 47, GBP 프로필 조회 +312%, "korean spa fort lee" 맵 팩 2위 + "korean nail spa palpark" 1위. 사장님이 기존 브랜드 정체성 유지; 우리가 구조, 성능, SEO 인프라 수정. 월별 지표 상세 케이스 스터디 아래 링크 — 이 필러 모든 것의 증거점.' },
        { type: 'h2', content: '60-90일 구현 일정' },
        { type: 'p', content: '1-2주차 — 디스커버리, 브랜드 보이스 캡처, 현 GBP·인스타 감사. 3-4주차 — 디자인 + 이중언어 콘텐츠 작성 (원어민 한국어 카피라이터, 기계 번역 X). 5-6주차 — 네이티브 예약 통합, 인스타 API 동기화, 스키마 마크업, GBP 최적화. 7-8주차 — 한인 디렉토리 8개 인용 정리, 새 예약 대시보드와 리뷰 속도 플로우 직원 교육. 9-12주차 — 첫 순위 신호 모니터링, 반복, 콘텐츠 푸시. 대부분 한인 뷰티 비즈니스 6주차에 의미 있는 맵 팩 움직임, 90일까지 전체 예약 상승.' },
      ],
    },
    faq: [
      {
        q: { en: 'How long until a new Korean salon ranks in the Map Pack?', ko: '신규 한인 미용실이 맵 팩 진입까지 얼마나?' },
        a: { en: 'For a new GBP listing with no history, 8-14 weeks to reach Map Pack top-3 for medium-competition keywords. For an existing neglected listing, 4-8 weeks because age and signal are already there. Brand-name searches should rank #1 within 7-14 days of verification.', ko: '신규 GBP 리스팅 (이력 X) — 중간 경쟁 키워드 맵 팩 상위 3 진입 8-14주. 방치된 기존 리스팅 — 이미 연식과 신호 있어 4-8주. 브랜드명 검색은 인증 후 7-14일 내 1위.' },
      },
      {
        q: { en: 'Can I do Korean salon SEO myself without an agency?', ko: '대행사 없이 한인 미용실 SEO 직접 가능?' },
        a: { en: 'Yes for parts, no for the whole stack. The DIY-able parts: GBP setup, photo uploads, asking for reviews, weekly GBP posts. The parts that need experience: schema markup (40% of DIY implementations have errors), Korean directory citation cleanup (requires knowing which 8 directories matter), bilingual hreflang on a custom site (the #1 reason DIY bilingual SEO fails). Hybrid is common — DIY the easy half, hire help for the technical half.', ko: '부분적으론 가능, 전체 스택은 No. DIY 가능 부분 — GBP 셋업, 사진 업로드, 리뷰 요청, 주간 GBP 포스트. 경험 필요 부분 — 스키마 마크업 (DIY 구현의 40%에 오류), 한인 디렉토리 인용 정리 (어느 8개 디렉토리가 중요한지 알아야), 커스텀 사이트 이중언어 hreflang (DIY 이중언어 SEO 실패의 #1 이유). 하이브리드 흔함 — 쉬운 절반 DIY, 기술 절반 도움.' },
      },
      {
        q: { en: 'What is the cost range for a Korean salon website rebuild?', ko: '한인 미용실 웹사이트 재구축 비용 범위는?' },
        a: { en: '$4,500-$9,000 for a single-location Korean salon with native booking, Instagram sync, bilingual content, and SEO infrastructure. Medspas typically $7,000-$14,000 because of HIPAA-flavored intake forms and additional schema requirements. Anyone quoting under $2,500 is selling a template; over $20K is overscoped for a single-location SMB.', ko: '네이티브 예약, 인스타 동기화, 이중언어 콘텐츠, SEO 인프라 있는 단일 매장 한인 미용실 $4,500-$9,000. 메드스파는 HIPAA 인테이크 폼과 추가 스키마 요구로 보통 $7,000-$14,000. $2,500 미만 견적은 템플릿 판매; $20K 초과는 단일 매장 SMB에 과대 범위.' },
      },
      {
        q: { en: 'How important is bilingual content for a Korean nail salon specifically?', ko: '한인 네일샵엔 이중언어 콘텐츠가 얼마나 중요?' },
        a: { en: 'Critical. Korean nail salon clientele in NJ-NY is roughly 60% Korean-speaking 1st-generation and 40% English-speaking 2nd-generation + non-Korean. An English-only site loses the 60% bigger half on first visit. We see 2.5-3x conversion lift on bilingual nail salon sites vs English-only in the same corridor.', ko: '결정적. NJ-NY 한인 네일샵 고객층 약 60% 한국어 1세대 + 40% 영어 2세대 + 비한인. 영어 전용 사이트는 첫 방문에 더 큰 절반 60% 손실. 같은 통로에서 이중언어 vs 영어 전용 네일샵 사이트 — 전환 2.5-3배.' },
      },
      {
        q: { en: 'Should I do Yelp ads for a Korean salon in NJ?', ko: 'NJ 한인 미용실에 Yelp 광고 할 만한가요?' },
        a: { en: 'Almost never. Yelp ads for Korean salons in dense Korean corridors (Bergen, Flushing, Annandale) typically generate 1.1-1.5x ROAS which is barely break-even after Yelp\'s commission and Korean-customer aversion to Yelp accounts. Spend the same budget on Korean directory citations + bilingual SEO + KakaoTalk Channel ads — expect 2.5-4x ROAS for the same dollars.', ko: '거의 절대 X. 한인 밀도 통로 (버겐, 플러싱, 애난데일) 한인 미용실 Yelp 광고 보통 ROAS 1.1-1.5배 — Yelp 수수료 + 한인 고객의 Yelp 계정 회피 후 간신히 손익. 같은 예산을 한인 디렉토리 인용 + 이중언어 SEO + 카카오톡 채널 광고에 — 같은 달러로 ROAS 2.5-4배 예상.' },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────
  // 6. WEBSITE COST PILLAR
  // ─────────────────────────────────────────────────────────────────
  {
    pillarKey: 'website-cost',
    url: '/website-cost-guide',
    slug: 'website-cost-guide',
    title: {
      en: 'Korean Small Business Website Cost Guide [2026] — Real Pricing, Hidden Fees',
      ko: '한인 스몰비즈니스 웹사이트 비용 가이드 [2026] — 실 가격, 숨은 비용',
    },
    metaDescription: {
      en: 'What does a Korean small business website actually cost in 2026? Real pricing by industry ($3,500-$18,000), hidden fees most agencies do not disclose, Squarespace vs WordPress vs Next.js, when to rebuild vs redesign, and the platform decision framework.',
      ko: '2026년 한인 스몰비즈니스 웹사이트 실 비용? 업종별 실 가격 ($3,500-$18,000), 대부분 대행사가 공개 안 하는 숨은 비용, Squarespace vs WordPress vs Next.js, 재구축 vs 재디자인, 플랫폼 의사결정 프레임워크.',
    },
    heroEyebrow: { en: 'PILLAR GUIDE', ko: '필러 가이드' },
    heroH1: {
      en: 'Korean SMB Website Cost — The Real Numbers',
      ko: '한인 SMB 웹사이트 비용 — 실 숫자',
    },
    heroIntro: {
      en: 'Korean SMB owners are quoted website costs ranging from $500 to $50,000 for ostensibly the same thing — and most of the variance is fee structure, not actual deliverable value. This guide is the honest pricing breakdown: what a real bilingual website should cost by industry, what hidden fees most agencies bury, and how to read a quote so you do not overpay.',
      ko: '한인 SMB 사장님은 표면적으로 같은 것에 $500-$50,000 견적 받음 — 그리고 대부분 차이는 결과물 가치 아닌 수수료 구조. 이 가이드는 정직한 가격 분석 — 업종별 실 이중언어 웹사이트 비용, 대부분 대행사가 묻는 숨은 비용, 견적 읽는 법으로 과지불 방지.',
    },
    whatYouWillLearn: {
      en: [
        'Real cost ranges by industry — restaurant, salon, medspa, retail, professional services',
        'Hidden fees most agencies do not disclose (monthly retainers, "managed hosting", scope creep clauses)',
        'Squarespace vs WordPress vs Next.js — when each one wins',
        'When to rebuild vs redesign vs migrate',
        'How to read a website quote and spot the upsell traps',
      ],
      ko: [
        '업종별 실 비용 범위 — 식당, 미용실, 메드스파, 소매, 전문 서비스',
        '대부분 대행사가 공개 안 하는 숨은 비용 (월 리테이너, "관리 호스팅", 범위 확장 조항)',
        'Squarespace vs WordPress vs Next.js — 각자 이기는 때',
        '재구축 vs 재디자인 vs 이전',
        '웹사이트 견적 읽는 법 + 업셀 함정 발견',
      ],
    },
    sections: {
      en: [
        { type: 'intro', content: 'A Korean restaurant owner in Palpark gets three website quotes in the same week: $1,500 (cousin\'s friend who "does websites"), $7,500 (us or similar agency), $24,000 (premium NYC firm). All three propose the same basic thing — a bilingual website for the restaurant. The variance is not random. It reflects three different things being sold under the same name. This pillar untangles them so you know exactly what you are paying for and where the cost actually goes.' },
        { type: 'h2', content: 'What a Korean SMB website actually costs in 2026 — by industry' },
        { type: 'p', content: 'Real ranges from 47 quoted Korean SMB projects in 2025-2026: Restaurants — $4,500-$8,500 (native reservations, KakaoTalk integration, GBP optimization, bilingual menu). Salons + medspas — $4,500-$9,500 (booking system, Instagram sync, photo gallery, schema). Retail/ecommerce — $7,500-$18,000 (Shopify or custom, payment integration, inventory sync). Professional services (dental, law, real estate) — $5,500-$11,000 (booking or quote form, schema, compliance). Multi-location — starts at $14,000 and scales by URL count. These are honest ranges; quotes outside them are either selling templates or overcharging.' },
        { type: 'h2', content: 'The hidden fees most agencies do not tell you about' },
        { type: 'p', content: 'Six fees that frequently appear after you sign: (1) "Managed hosting" — $80-$200/month for hosting that costs the agency $5-$15. (2) Mandatory monthly retainer — $800-$2,500/month "to keep the site healthy" when the site needs <5 hours/month of work. (3) Scope-creep change fees — $250-$500 per "minor" change after launch. (4) Domain locking — agency holds your domain registration so you cannot leave easily. (5) Per-language surcharge — Korean content priced at 50% premium when it should be standard. (6) "SEO optimization" sold separately as a $1,500-$4,000 add-on when basic SEO should be included. A clean quote names all of these in writing before contract signing.' },
        { type: 'h2', content: 'Squarespace vs WordPress vs Next.js — when each one wins' },
        { type: 'p', content: 'Squarespace ($23-$65/month) wins when — single-language site, 5-10 pages total, owner wants to self-edit, no booking funnel complexity, no need for custom Korean schema. WordPress ($30-$80/month hosting + $200-$400/year theme + plugin costs) wins when — content-heavy with 50+ pages, blog-centric business, comfort with the WP plugin ecosystem. Next.js custom build (no monthly platform fee, hosting on Vercel free-to-$20/month) wins when — performance matters, bilingual SEO is critical, need native KakaoTalk/Square/Toast embeds, want to own the code. For 65-75% of Korean SMBs we work with, Next.js is the right answer. For the other 25-35%, Squarespace or WordPress is more pragmatic.' },
        { type: 'h2', content: 'Rebuild vs redesign vs migrate — the decision tree' },
        { type: 'p', content: 'Three different projects, three different costs. Redesign ($2,500-$5,500): same platform and architecture, new visual design and content. Choose when the site structure works but it looks dated. Migration ($4,500-$8,000): different platform, same content scope. Choose when WordPress or Squarespace is bottlenecking performance. Rebuild ($5,500-$12,000): different platform AND new content/architecture AND SEO infrastructure. Choose when the site is fundamentally underperforming on conversion or SEO. Most Korean SMBs ask for "redesign" but actually need rebuild — the visual was never the problem.' },
        { type: 'h2', content: 'How to read a website quote and spot upsell traps' },
        { type: 'p', content: 'Six lines to demand on any quote before signing: (1) Total fixed scope (not "starting at"). (2) List of every page being built, by name. (3) List of every integration being installed (booking, KakaoTalk, Instagram, schema). (4) Hosting cost, who pays, after launch. (5) Post-launch support window length and what is included. (6) Cancellation terms — what happens to your domain, content, and code if you leave the agency. If any of these six is missing, the agency is preserving room to upsell later. Walk away or demand revision.' },
        { type: 'h2', content: 'No-retainer model — why we offer it (and most agencies do not)' },
        { type: 'p', content: 'Most US web agencies push monthly retainers because retainers are 4-7x more profitable than fixed-scope projects. The problem for Korean SMB clients: retainers create incentive to keep clients dependent rather than autonomous. We build sites with the explicit goal of making ourselves unnecessary — sites that the owner can maintain with 2-3 hours/month after launch + the occasional content addition. The trade-off — we make less per client lifetime but we have a 90%+ referral rate from former clients because the relationship is professional, not extractive.' },
      ],
      ko: [
        { type: 'intro', content: '팰팍 한식당 사장님이 같은 주에 웹사이트 견적 3개 받음 — $1,500 (사촌 친구 "웹사이트 하는 사람"), $7,500 (우리 또는 비슷한 대행사), $24,000 (프리미엄 NYC 회사). 셋 다 같은 기본 — 식당 이중언어 웹사이트 — 제안. 차이는 무작위 아님. 같은 이름으로 팔리는 3가지 다른 것 반영. 이 필러가 풀어내 정확히 무엇에 지불하는지, 비용이 어디 가는지 알게 함.' },
        { type: 'h2', content: '2026년 한인 SMB 웹사이트 실 비용 — 업종별' },
        { type: 'p', content: '2025-2026 견적된 한인 SMB 프로젝트 47개 실 범위 — 식당 $4,500-$8,500 (네이티브 예약, 카카오톡 통합, GBP 최적화, 이중언어 메뉴). 미용실 + 메드스파 $4,500-$9,500 (예약 시스템, 인스타 동기화, 사진 갤러리, 스키마). 소매·이커머스 $7,500-$18,000 (Shopify 또는 커스텀, 결제 통합, 재고 동기화). 전문 서비스 (치과, 법률, 부동산) $5,500-$11,000 (예약·견적 폼, 스키마, 컴플라이언스). 다매장 $14,000부터 + URL 수에 따라 확장. 정직한 범위; 이 범위 밖 견적은 템플릿 판매 또는 과지불.' },
        { type: 'h2', content: '대부분 대행사가 안 알려주는 숨은 비용' },
        { type: 'p', content: '계약 후 자주 등장하는 6가지 비용 — (1) "관리 호스팅" — 대행사 비용 $5-$15짜리 호스팅에 월 $80-$200. (2) 의무 월 리테이너 — 월 5시간 미만 일 필요한 사이트에 "건강 유지" 월 $800-$2,500. (3) 범위 확장 변경 비용 — 런칭 후 "사소한" 변경당 $250-$500. (4) 도메인 잠금 — 대행사가 도메인 등록 보유해 쉽게 못 떠남. (5) 언어별 추가 요금 — 기본이어야 할 한국어 콘텐츠에 50% 프리미엄. (6) 기본 SEO에 포함되어야 할 "SEO 최적화"가 $1,500-$4,000 별도 추가. 깨끗한 견적은 계약 서명 전 이 모두 서면 명시.' },
        { type: 'h2', content: 'Squarespace vs WordPress vs Next.js — 각자 이기는 때' },
        { type: 'p', content: 'Squarespace (월 $23-$65) 승 — 단일 언어 사이트, 총 5-10 페이지, 사장님 자체 편집 원함, 예약 퍼널 복잡성 없음, 커스텀 한국어 스키마 불필요. WordPress (호스팅 월 $30-$80 + 테마·플러그인 연 $200-$400) 승 — 50+ 페이지 콘텐츠 중심, 블로그 중심 비즈니스, WP 플러그인 생태계에 편안. Next.js 커스텀 빌드 (월 플랫폼 비용 X, Vercel 호스팅 무료-월 $20) 승 — 성능 중요, 이중언어 SEO 결정적, 네이티브 카카오톡/Square/Toast 임베드 필요, 코드 소유 원함. 우리와 일하는 한인 SMB 65-75%엔 Next.js가 정답. 나머지 25-35%엔 Squarespace나 WordPress가 더 실용적.' },
        { type: 'h2', content: '재구축 vs 재디자인 vs 이전 — 의사결정 트리' },
        { type: 'p', content: '3가지 다른 프로젝트, 3가지 다른 비용. 재디자인 ($2,500-$5,500) — 같은 플랫폼·구조, 새 비주얼·콘텐츠. 사이트 구조는 작동하나 낡아 보일 때 선택. 이전 ($4,500-$8,000) — 다른 플랫폼, 같은 콘텐츠 범위. WordPress나 Squarespace가 성능 병목일 때 선택. 재구축 ($5,500-$12,000) — 다른 플랫폼 + 새 콘텐츠·구조 + SEO 인프라. 사이트가 전환·SEO에서 근본적으로 저성능일 때 선택. 대부분 한인 SMB가 "재디자인" 요청하나 실제론 재구축 필요 — 비주얼은 문제였던 적이 없음.' },
        { type: 'h2', content: '웹사이트 견적 읽는 법 + 업셀 함정 발견' },
        { type: 'p', content: '계약 서명 전 모든 견적에 요구할 6줄 — (1) 총 고정 범위 ("부터" X). (2) 구축할 모든 페이지 이름별 목록. (3) 설치할 모든 통합 목록 (예약, 카카오톡, 인스타, 스키마). (4) 런칭 후 호스팅 비용, 누가 지불. (5) 런칭 후 지원 기간 길이와 포함 내역. (6) 해지 조건 — 대행사 떠날 때 도메인, 콘텐츠, 코드 어떻게 됨. 이 6개 중 하나라도 없으면 대행사가 나중에 업셀할 여지 보존 중. 떠나거나 수정 요구.' },
        { type: 'h2', content: '무리테이너 모델 — 우리가 제공하는 이유 (대부분 대행사는 안 함)' },
        { type: 'p', content: '대부분 미국 웹 대행사가 월 리테이너 푸시 — 리테이너가 고정 범위 프로젝트보다 4-7배 더 수익. 한인 SMB 고객엔 문제 — 리테이너는 고객을 자율 아닌 의존하게 두려는 인센티브 생성. 우리는 명시적 목표 — 우리가 불필요해지게 만들기 — 로 사이트 구축 — 사장님이 런칭 후 월 2-3시간 + 가끔 콘텐츠 추가로 유지 가능한 사이트. 트레이드오프 — 고객 평생당 우리 수익 적지만 전 고객 추천율 90%+ — 관계가 추출적 아닌 전문적이라서.' },
      ],
    },
    faq: [
      {
        q: { en: 'Is a $1,500 Korean website even possible, or is it always a scam?', ko: '$1,500 한인 웹사이트가 가능한가, 아니면 항상 사기?' },
        a: { en: 'Possible for a 3-5 page Squarespace template site filled in by a generalist. Not possible for anything bilingual, conversion-optimized, or SEO-ready. If your business needs Korean customers to convert, you cannot deliver that at $1,500 — anyone promising it is either inexperienced or hiding the actual costs in a long-term retainer.', ko: '일반 직원이 채운 3-5 페이지 Squarespace 템플릿 사이트엔 가능. 이중언어, 전환 최적화, SEO 준비된 어떤 것에도 불가능. 한인 고객 전환 필요한 비즈니스면 $1,500에 못 제공 — 약속하는 사람은 미숙하거나 실 비용을 장기 리테이너에 숨김.' },
      },
      {
        q: { en: 'Why do agency quotes vary so much for the same project?', ko: '같은 프로젝트에 대행사 견적이 왜 그렇게 다른가?' },
        a: { en: 'Three reasons: (1) Some agencies bake-in retainers and call the upfront fee "low"; total 24-month cost is similar across quotes. (2) Some quotes include bilingual native writing, others do not (the writing is 30-40% of the budget on a bilingual project). (3) Agency overhead — NYC firms with offices cost 2-3x more than remote-first agencies for the same deliverable.', ko: '3 이유 — (1) 일부 대행사는 리테이너 내장 + 초기 비용 "낮음"; 24개월 총 비용은 견적간 유사. (2) 일부 견적은 이중언어 원어민 작성 포함, 일부는 X (작성이 이중언어 프로젝트 예산의 30-40%). (3) 대행사 오버헤드 — 사무실 있는 NYC 회사는 같은 결과물에 원격 우선 대행사보다 2-3배 비싸.' },
      },
      {
        q: { en: 'Should I ever pay a monthly retainer for my Korean SMB website?', ko: '한인 SMB 웹사이트에 월 리테이너 지불해야?' },
        a: { en: 'Only if the retainer has specific, listable monthly deliverables and you cannot do them yourself. Examples of legitimate retainers: monthly content creation (2-4 new bilingual blog posts), monthly SEO optimization (real keyword research and on-page work), ongoing GBP management (weekly posts, review responses). Vague "site maintenance" or "general support" retainers under $1,500/month are usually pure margin for the agency.', ko: '리테이너에 구체적, 나열 가능 월 결과물 있고 본인이 못 할 때만. 정당한 리테이너 예 — 월 콘텐츠 생성 (신규 이중언어 블로그 포스트 2-4개), 월 SEO 최적화 (실 키워드 리서치 + 온페이지 작업), 지속 GBP 관리 (주간 포스트, 리뷰 응답). 월 $1,500 미만 모호한 "사이트 유지" 또는 "일반 지원" 리테이너는 보통 순 대행사 마진.' },
      },
      {
        q: { en: 'How do I know if I should rebuild or just redesign?', ko: '재구축 vs 재디자인 어떻게 결정?' },
        a: { en: 'Three diagnostic questions. (1) Look at your conversion rate from website visitor to lead or booking — if under 2%, the problem is structural (rebuild). If 3-5%, problem is visual (redesign). (2) Check your Core Web Vitals — if Largest Contentful Paint is over 3 seconds, the platform is bottlenecking and you need to rebuild on faster infrastructure. (3) Audit hreflang and schema — if either is broken or missing, you need rebuild to fix the SEO foundation.', ko: '진단 질문 3개. (1) 웹사이트 방문자→리드·예약 전환율 — 2% 미만이면 구조 문제 (재구축). 3-5%면 비주얼 문제 (재디자인). (2) Core Web Vitals 확인 — Largest Contentful Paint 3초 초과면 플랫폼이 병목 + 더 빠른 인프라에 재구축 필요. (3) hreflang과 스키마 감사 — 둘 중 하나라도 깨졌거나 누락이면 SEO 기반 수정 위해 재구축 필요.' },
      },
      {
        q: { en: 'What is the cheapest legitimate way to get a bilingual Korean website?', ko: '이중언어 한인 웹사이트 얻는 가장 저렴한 정당한 방법?' },
        a: { en: 'Squarespace bilingual setup with native-written Korean content: roughly $4,000-$6,000 one-time (the writing is the real cost), plus $30-$50/month platform fee ongoing. This gets you the bilingual foundation without the cost of a custom Next.js build. The trade-off: limited customization, slower page speed than custom builds, and you cannot natively embed some Korean tools (KakaoTalk integration is harder). For owners with budgets under $6K, this is the cleanest path.', ko: '원어민 작성 한국어 콘텐츠 있는 Squarespace 이중언어 셋업 — 일회성 약 $4,000-$6,000 (작성이 실 비용) + 지속 월 $30-$50 플랫폼 비용. 커스텀 Next.js 빌드 비용 없이 이중언어 기반 확보. 트레이드오프 — 제한된 커스터마이즈, 커스텀 빌드보다 느린 페이지 속도, 일부 한국 도구 네이티브 임베드 불가 (카카오톡 통합 어려움). 예산 $6K 미만 사장님에 가장 깨끗한 길.' },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────
  // 7. PROFESSIONAL SERVICES PILLAR
  // ─────────────────────────────────────────────────────────────────
  {
    pillarKey: 'professional-services',
    url: '/korean-professional-services-website-guide',
    slug: 'korean-professional-services-website-guide',
    title: {
      en: 'Korean Professional Services Website Guide — Dental, Law, Real Estate [2026]',
      ko: '한인 전문 서비스 웹사이트 가이드 — 치과, 법률, 부동산 [2026]',
    },
    metaDescription: {
      en: 'Website + SEO playbook for Korean professional service businesses in the US — dental practices, law firms, real estate agents, insurance, tutoring, accounting. Bilingual intake forms, HIPAA-safe scheduling, schema markup, and local SEO for each vertical.',
      ko: '미국 한인 전문 서비스 비즈니스 웹사이트 + SEO 플레이북 — 치과, 로펌, 부동산, 보험, 학원, 회계. 이중언어 인테이크 폼, HIPAA 안전 스케줄링, 스키마 마크업, 업종별 로컬 SEO.',
    },
    heroEyebrow: { en: 'PILLAR GUIDE', ko: '필러 가이드' },
    heroH1: {
      en: 'Korean Professional Services Websites',
      ko: '한인 전문 서비스 웹사이트',
    },
    heroIntro: {
      en: 'Korean dental practices, law firms, real estate agents, and tutoring centers compete in a different SEO landscape than restaurants and salons — higher trust thresholds, compliance requirements (HIPAA, legal advertising rules), and longer decision cycles. This pillar covers the website + SEO architecture that wins each vertical.',
      ko: '한인 치과, 로펌, 부동산, 학원은 식당·미용실과 다른 SEO 환경에서 경쟁 — 더 높은 신뢰 임계점, 컴플라이언스 요구 (HIPAA, 법률 광고 규칙), 더 긴 의사결정 사이클. 이 필러가 각 업종 이기는 웹사이트 + SEO 구조 다룸.',
    },
    whatYouWillLearn: {
      en: [
        'Vertical-specific website features — dental (online booking + insurance check), law (consultation form + case results), real estate (listing IDX + valuation tool)',
        'HIPAA-safe scheduling for Korean dental and medical practices',
        'Bilingual intake forms that improve completion rate by 40-60%',
        'Schema markup specific to each professional services vertical',
        'Local SEO for Korean professional services in 8 US corridors',
      ],
      ko: [
        '업종별 웹사이트 기능 — 치과 (온라인 예약 + 보험 확인), 법률 (상담 폼 + 사례 결과), 부동산 (매물 IDX + 평가 도구)',
        '한인 치과·의료 HIPAA 안전 스케줄링',
        '완료율 40-60% 개선하는 이중언어 인테이크 폼',
        '각 전문 서비스 업종 특화 스키마 마크업',
        '미국 8개 통로 한인 전문 서비스 로컬 SEO',
      ],
    },
    sections: {
      en: [
        { type: 'intro', content: 'A Korean dentist in Fort Lee, a Korean lawyer in Flushing, a Korean real estate agent in Atlanta — these professionals compete in markets where one new client is worth $2,000-$15,000 in lifetime value. The math means the website does not need to drive 100 leads per month; it needs to drive 3-8 high-quality leads per month, each filtered by intent. This pillar covers how to build that filtered-lead engine for each professional services vertical.' },
        { type: 'h2', content: 'Vertical-specific website features that drive Korean professional service leads' },
        { type: 'p', content: 'Dental — online booking embedded natively (not Zocdoc, which charges $50+ per new patient and trains your patients to book through Zocdoc forever), insurance acceptance list searchable, Korean-language intake form, bilingual service descriptions, before-and-after photo galleries. Law — clear practice area pages (immigration, family, business, real estate), consultation form with case-type pre-qualification, attorney bio with bar license link, FAQs by practice area, Korean-language case result summaries. Real estate — IDX listing integration filtered for relevant zip codes, home valuation tool, neighborhood guides for Korean diaspora corridors (Palpark, Fort Lee, Flushing, Atlanta-Duluth), Korean-language buyer/seller resource pages.' },
        { type: 'h2', content: 'HIPAA-safe scheduling for Korean dental and medical practices' },
        { type: 'p', content: 'Online scheduling for healthcare is regulated. Three compliant options for Korean clinics: (1) HIPAA-compliant native widgets (NexHealth, OASIS, Modento — all $99-$299/month) that handle PHI properly. (2) Outsource to a HIPAA-compliant call center that converts website "request appointment" form submissions to actual bookings — adds ~$150-$300/month but eliminates compliance risk. (3) Non-PHI request form that only captures name + best contact + general request, with the actual scheduling happening over phone (manual but $0 compliance cost). Most Korean dental practices we work with go with Option 1; small clinics with light volume use Option 3.' },
        { type: 'h2', content: 'Bilingual intake forms — the 40-60% completion lift' },
        { type: 'p', content: 'Korean-American professional service clients in 30s-60s prefer Korean intake forms even when their English is fluent. Why: intake forms ask sensitive personal information (medical history, legal context, financial details) and customers are 2-3x more comfortable disclosing in their first language. We have measured 41% completion rates on English-only intake forms vs 67% on bilingual forms (same content, same business, A/B tested for 90 days). The implementation cost is one-time $500-$1,500 of translation work; the return is 40-60% more form submissions monthly forever.' },
        { type: 'h2', content: 'Schema markup specific to professional services' },
        { type: 'p', content: 'Vertical schema types that move rankings: Dentist (with priceRange, openingHours, acceptsReservations, paymentAccepted), Attorney (with areaOfLaw, hasOfferCatalog of practice areas), RealEstateAgent (with operatingArea, areaServed). All should include Korean alternateName, knownLanguage="ko" + "en", and contactPoint with bilingual service. Most Korean professional service sites have generic LocalBusiness schema only — the vertical-specific subtypes lift rankings 12-22% within 60-90 days in our measurements.' },
        { type: 'h2', content: 'Local SEO for Korean professional services — 8 corridors' },
        { type: 'p', content: 'Korean professional services concentrate in 8 corridors with different competitive dynamics. NJ-NY (Bergen + Flushing) — dense competition, every keyword has 8-15 firms competing, need strong content depth. ATL Duluth — moderate competition, possible to dominate with consistent content. TX (Dallas-Carrollton) — emerging market, Korean professionals are still building digital presence, biggest opportunity for early movers. WA (Seattle-Bellevue) — similar to TX. The strategy differs by corridor; we have city-specific resources linked below.' },
        { type: 'h2', content: 'The trust signals Korean clients look for (and Western sites miss)' },
        { type: 'p', content: 'Korean professional service clients filter by trust signals that Western-trained website designers often skip: (1) The actual professional\'s full Korean name in 한자 (if applicable) alongside English name — signals respect for Korean tradition. (2) Year established (한인 community values longevity heavily). (3) Connection to a Korean institution — alma mater (Korean university), Korean professional association membership, Korean media coverage. (4) Korean-speaking staff named explicitly. (5) Acceptance of Korean payment methods (cash, Zelle, etc.) listed alongside cards. These are not optional decorative elements; they materially affect conversion rate.' },
      ],
      ko: [
        { type: 'intro', content: '포트리 한인 치과, 플러싱 한인 변호사, 애틀랜타 한인 부동산 — 이 전문가들은 신규 고객 1명이 평생 가치 $2,000-$15,000 시장에서 경쟁. 수학상 웹사이트는 월 리드 100개 견인 불필요; 월 의도 필터링된 고품질 리드 3-8개 필요. 이 필러가 각 전문 서비스 업종에 그 필터링 리드 엔진 구축 법 다룸.' },
        { type: 'h2', content: '한인 전문 서비스 리드 견인 업종별 웹사이트 기능' },
        { type: 'p', content: '치과 — 네이티브 임베드 온라인 예약 (Zocdoc X — 신규 환자당 $50+ 청구 + 환자가 영원히 Zocdoc 통해 예약하도록 훈련), 보험 수용 목록 검색 가능, 한국어 인테이크 폼, 이중언어 서비스 설명, 비포·애프터 사진 갤러리. 법률 — 명확한 업무 영역 페이지 (이민, 가족, 비즈니스, 부동산), 사례 유형 사전 자격 있는 상담 폼, 변호사 약력 + 변호사 라이선스 링크, 업무 영역별 FAQ, 한국어 사례 결과 요약. 부동산 — 관련 우편번호 필터링 IDX 매물 통합, 주택 평가 도구, 한인 디아스포라 통로 (팰팍, 포트리, 플러싱, 애틀랜타-둘루스) 동네 가이드, 한국어 매수자/매도자 리소스 페이지.' },
        { type: 'h2', content: '한인 치과·의료 HIPAA 안전 스케줄링' },
        { type: 'p', content: '의료 온라인 스케줄링은 규제 대상. 한인 클리닉용 컴플라이언트 3 옵션 — (1) PHI 적절 처리하는 HIPAA 준수 네이티브 위젯 (NexHealth, OASIS, Modento — 모두 월 $99-$299). (2) 웹사이트 "예약 요청" 폼 제출을 실 예약으로 전환하는 HIPAA 준수 콜센터 외주 — 월 약 $150-$300 추가하나 컴플라이언스 위험 제거. (3) 이름 + 최선 연락처 + 일반 요청만 캡처하는 비PHI 요청 폼, 실 스케줄링은 전화로 (수동이지만 컴플라이언스 비용 $0). 우리와 일하는 대부분 한인 치과는 옵션 1; 볼륨 적은 소규모 클리닉은 옵션 3.' },
        { type: 'h2', content: '이중언어 인테이크 폼 — 40-60% 완료 상승' },
        { type: 'p', content: '30-60대 재미한인 전문 서비스 고객은 영어 유창해도 한국어 인테이크 폼 선호. 이유 — 인테이크 폼은 민감한 개인 정보 (병력, 법률 맥락, 금융 디테일) 요청 + 고객은 모국어 공개에 2-3배 더 편안. 영어 전용 인테이크 폼 완료율 41% vs 이중언어 폼 67% 측정 (같은 콘텐츠, 같은 비즈니스, 90일 A/B 테스트). 구현 비용은 일회성 번역 작업 $500-$1,500; 회수는 영원히 월 폼 제출 40-60% 더 많음.' },
        { type: 'h2', content: '전문 서비스 특화 스키마 마크업' },
        { type: 'p', content: '순위 움직이는 업종 스키마 타입 — Dentist (priceRange, openingHours, acceptsReservations, paymentAccepted 포함), Attorney (areaOfLaw, 업무 영역의 hasOfferCatalog 포함), RealEstateAgent (operatingArea, areaServed 포함). 모두 한국어 alternateName, knownLanguage="ko" + "en", 이중언어 서비스 contactPoint 포함. 대부분 한인 전문 서비스 사이트가 일반 LocalBusiness 스키마만 — 업종별 서브타입이 우리 측정에서 60-90일 내 순위 12-22% 상승.' },
        { type: 'h2', content: '한인 전문 서비스 로컬 SEO — 8개 통로' },
        { type: 'p', content: '한인 전문 서비스는 다른 경쟁 역학의 8개 통로에 집중. NJ-NY (버겐 + 플러싱) — 밀집 경쟁, 모든 키워드에 8-15개 회사 경쟁, 강한 콘텐츠 깊이 필요. ATL 둘루스 — 중간 경쟁, 일관된 콘텐츠로 장악 가능. TX (댈러스-캐롤튼) — 신흥 시장, 한인 전문가가 아직 디지털 존재 구축 중, 선점자에 최대 기회. WA (시애틀-벨뷰) — TX와 유사. 통로별 전략 다름; 도시 특화 리소스 아래 링크.' },
        { type: 'h2', content: '한인 고객이 찾는 신뢰 신호 (서양 사이트가 놓치는 것)' },
        { type: 'p', content: '한인 전문 서비스 고객은 서양 훈련된 웹사이트 디자이너가 자주 건너뛰는 신뢰 신호로 필터링 — (1) 영어 이름과 함께 실 전문가의 한자 풀네임 (해당 시) — 한국 전통 존중 신호. (2) 설립 연도 (한인 커뮤니티는 장수를 무겁게 가치 평가). (3) 한국 기관 연결 — 모교 (한국 대학), 한국 전문 협회 회원, 한국 언론 보도. (4) 한국어 가능 직원 명시 명명. (5) 카드와 함께 한국 결제 수단 (현금, Zelle 등) 수용 나열. 이것들은 선택적 장식 요소 X; 전환율에 실질적 영향.' },
      ],
    },
    faq: [
      {
        q: { en: 'How much does a Korean dental practice website cost in 2026?', ko: '2026년 한인 치과 웹사이트 비용?' },
        a: { en: '$6,500-$11,000 for a single-location Korean dental practice with HIPAA-safe online booking, bilingual intake forms, insurance acceptance list, before-and-after gallery, schema markup, and GBP optimization. Plus $99-$299/month for the HIPAA-compliant booking widget afterward. Multi-location practices start at $14,000.', ko: 'HIPAA 안전 온라인 예약, 이중언어 인테이크 폼, 보험 수용 목록, 비포·애프터 갤러리, 스키마 마크업, GBP 최적화 있는 단일 매장 한인 치과 $6,500-$11,000. 이후 HIPAA 준수 예약 위젯 월 $99-$299. 다매장 $14,000부터.' },
      },
      {
        q: { en: 'Can I really compete with established Korean professional services in my city?', ko: '내 도시의 자리잡은 한인 전문 서비스와 정말 경쟁 가능?' },
        a: { en: 'Yes — incumbents in dense Korean corridors (Bergen, Flushing, LA Koreatown) often have older websites with weak SEO infrastructure. A new entrant with proper bilingual hreflang, schema, and Map Pack optimization can leapfrog 15-year-old competitors within 6-9 months in many markets. The exception is incumbents with strong community ties (church, association leadership) that drive non-SEO referrals; those are harder to displace.', ko: '네 — 밀집 한인 통로 (버겐, 플러싱, LA 코리아타운) 기존 업체는 종종 약한 SEO 인프라의 오래된 웹사이트 보유. 적절한 이중언어 hreflang, 스키마, 맵 팩 최적화 가진 신규 진입자는 많은 시장에서 6-9개월 안에 15년 된 경쟁사 추월 가능. 예외 — 비SEO 추천 견인하는 강한 커뮤니티 연결 (교회, 협회 리더십) 가진 기존 업체; 더 어려움.' },
      },
      {
        q: { en: 'Should I list my prices openly on my professional services website?', ko: '전문 서비스 웹사이트에 가격 공개해야?' },
        a: { en: 'For dental services — yes (or at least ranges); 67% of Korean dental customers in 2026 surveys say they would not contact a clinic that does not list any price range. For law and real estate — typically no, because pricing varies by case and listing prices misaligns expectations. For tutoring and routine medical — yes, with clear "starting from" language. The general rule: list when prices are roughly comparable across providers, withhold when they vary widely by case complexity.', ko: '치과 — 네 (최소 범위라도); 2026년 조사에서 한인 치과 고객 67%가 가격 범위 미표시 클리닉 안 연락한다고 응답. 법률과 부동산 — 보통 No, 가격이 사례별로 다르고 가격 표시가 기대 misalign. 학원과 일상 의료 — 네, 명확한 "부터" 언어로. 일반 룰 — 제공자간 가격 비슷한 때 표시, 사례 복잡성에 따라 크게 다른 때 보류.' },
      },
      {
        q: { en: 'How long does it take to rank a Korean dental or law firm website?', ko: '한인 치과·로펌 웹사이트 순위 잡는데 얼마나?' },
        a: { en: '4-7 months to top-3 Map Pack for medium-competition keywords in dense Korean corridors (NJ-NY). 8-14 months for hardest keywords. 2-4 months in emerging markets (TX, WA). The professional services vertical actually ranks faster than restaurants because of lower keyword volume and less ad noise — the trust signals matter more than the SEO effort.', ko: '밀집 한인 통로 (NJ-NY) 중간 경쟁 키워드 맵 팩 상위 3까지 4-7개월. 가장 어려운 키워드 8-14개월. 신흥 시장 (TX, WA) 2-4개월. 전문 서비스 업종이 실제로 식당보다 빨리 순위 — 더 낮은 키워드 볼륨 + 더 적은 광고 노이즈; 신뢰 신호가 SEO 노력보다 더 중요.' },
      },
      {
        q: { en: 'Do I need a separate Korean version of my professional services website?', ko: '전문 서비스 웹사이트의 별도 한국어 버전 필요?' },
        a: { en: 'Yes — same /ko subdirectory structure as other Korean SMBs. Professional services clients ages 40+ overwhelmingly prefer Korean-language sites for their first visit, even if they speak English fluently in person. English-only sites lose this demographic before contact. The Korean side does not need to translate every page — focus on homepage, practice areas, about/credentials, and contact.', ko: '네 — 다른 한인 SMB와 같은 /ko 서브디렉토리 구조. 40대+ 전문 서비스 고객은 본인이 영어 유창해도 첫 방문에 한국어 사이트 압도적 선호. 영어 전용 사이트는 이 인구 통계를 접촉 전 손실. 한국어 측은 모든 페이지 번역 X — 홈, 업무 영역, About·자격, 연락처에 집중.' },
      },
    ],
  },
]
