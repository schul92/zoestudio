/**
 * Pillar / cluster map for Zoe Lumos blog.
 *
 * Each pillar groups related blog posts so we can:
 *   1. Build internal linking ("see also" / breadcrumb / hub pages)
 *   2. Designate one post as the temporary "pillar" until a dedicated
 *      pillar page (`pillarUrl`) is published.
 *
 * Every blog post slug from `src/data/blogContent.ts` appears EXACTLY once
 * in `POST_TO_PILLAR`. If a post fits multiple pillars, the strongest fit wins.
 */

export const PILLARS = {
  'bilingual-seo': {
    label: { en: 'Bilingual SEO for Korean-American Businesses', ko: '한인 비즈니스 이중언어 SEO' },
    pillarUrl: '/bilingual-seo-guide',
    pillarSlug: 'bilingual-seo-technical-guide-hreflang', // longest, most technical, central topic
    posts: [
      'bilingual-seo-technical-guide-hreflang',
      'bilingual-seo-new-york-korean-business',
      'naver-vs-google-korean-business-usa',
      'naver-seo-from-usa-korean-business',
      'website-translation-vs-localization-korean-business',
      'local-seo-korean-business-2026',
      'local-seo-guide-korean-business-2026',
      'affordable-seo-new-jersey-korean-business',
      'case-study-korean-nail-salon-seo-10x',
      'tj-flowers-shopify-revamp-case-study',
      'case-study-salt-and-polish-fort-lee-spa-rebuild-2026',
      'website-no-traffic-not-showing-google-2026',
      'florist-online-ordering-korean-flower-shop-2026',
    ],
  },
  'restaurant-marketing': {
    label: { en: 'Korean Restaurant Digital Playbook', ko: '한인 레스토랑 디지털 플레이북' },
    pillarUrl: '/korean-restaurant-marketing-guide',
    pillarSlug: 'korean-restaurant-website-essentials',
    posts: [
      'korean-restaurant-website-essentials',
      'korean-restaurant-own-app-vs-doordash',
      'toast-vs-square-korean-restaurant',
      'chatgpt-search-korean-restaurant-visibility',
      'korean-restaurant-online-ordering-platforms-2026',
      'yelp-ads-vs-google-ads-korean-restaurant',
      'yelp-optimization-korean-restaurant-no-ads-2026',
      'korean-cafe-coffee-shop-website-guide',
      'korean-grocery-mart-online-presence-guide',
      'korean-bakery-cafe-website-essentials-2026',
      'korean-food-truck-catering-website-guide-2026',
      'doordash-vs-ubereats-vs-own-app-korean-restaurant',
      'korean-restaurant-marketing-annandale-va',
      'case-study-korean-restaurant-palisades-park-bookings-3x-2026',
      'toast-clover-pos-analytics-goldmine-2026',
      'website-drives-revenue-pizza-catering-case-study-2026',
      'korean-restaurant-chicago-online-ordering-pos-reviews-2026',
    ],
  },
  'beauty-wellness': {
    label: { en: 'Korean Beauty & Wellness Sites', ko: '한인 뷰티 & 웰니스 웹사이트' },
    pillarUrl: '/korean-beauty-wellness-website-guide',
    pillarSlug: 'korean-medspa-aesthetic-clinic-website',
    posts: [
      'korean-medspa-aesthetic-clinic-website',
      'korean-nail-salon-website-guide',
      'korean-hair-salon-website-guide',
      'korean-salon-spa-local-seo-new-jersey-2026',
    ],
  },
  'website-cost': {
    label: { en: 'Website Cost & Decision Framework', ko: '웹사이트 비용 & 의사결정 가이드' },
    pillarUrl: '/website-cost-guide',
    pillarSlug: 'nj-ny-website-cost-2026',
    posts: [
      'nj-ny-website-cost-2026',
      'website-cost-hidden-fees-usa',
      'do-i-need-a-website-korean-business',
      'website-redesign-vs-rebuild-korean-business',
      'squarespace-wordpress-shopify-korean-business',
      'squarespace-vs-wix-vs-nextjs-korean-business',
      'wordpress-to-nextjs-korean-business-migration',
      'shopify-korean-ecommerce',
      'pwa-vs-native-app-korean-smb',
      'app-store-submission-korean-business-guide',
      'korean-business-website-guide-2026',
      'why-anthropic-chose-aws',
      'shopify-korean-product-sellers-why-start-2026',
      'b2b-company-website-korean-business-credibility-2026',
      'aws-cloud-consulting-korean-business-dallas-2026',
      'korean-app-development-hire-guide-2026',
      'b2b-wholesale-rfq-lead-generation-seattle-korean-business-2026',
    ],
  },
  'kakaotalk-marketing': {
    label: { en: 'KakaoTalk + Korean Channel Marketing', ko: '카카오톡 & 한인 채널 마케팅' },
    pillarUrl: '/kakaotalk-marketing-guide',
    pillarSlug: 'kakaotalk-channel-us-korean-business',
    posts: [
      'kakaotalk-channel-us-korean-business',
      'kakaotalk-account-without-korean-phone-2026',
      'kakaotalk-channel-vs-instagram-korean-business',
      'kakaotalk-channel-automation-korean-restaurants',
      'kakaotalk-advertising-agency-usa-guide-2026',
      'instagram-vs-website-korean-business',
      'google-business-profile-korean-business-optimization',
      'google-business-profile-multi-location-korean-franchise-2026',
      'google-ads-korean-business',
      'google-ads-vs-meta-ads-korean-business-2026',
    ],
  },
  'professional-services': {
    label: { en: 'Korean Professional Services (Medical / Legal / RE)', ko: '한인 전문 서비스 (의료/법률/부동산)' },
    pillarUrl: '/korean-professional-services-website-guide',
    pillarSlug: 'korean-dental-practice-website-guide',
    posts: [
      'korean-dental-practice-website-guide',
      'korean-medical-clinic-online-booking-system-guide',
      'korean-law-firm-website-guide',
      'korean-real-estate-agent-website',
      'korean-insurance-financial-services-website',
      'korean-tutoring-sat-prep-website',
      'korean-church-website-guide',
      'starting-korean-business-america-2026',
    ],
  },
  'ai-services': {
    label: { en: 'AI for Korean Small Businesses', ko: '한인 스몰비즈니스 AI 활용' },
    pillarUrl: '/ai-consulting-korean-business',
    pillarSlug: 'ai-consulting-korean-small-business-decision-guide-2026',
    posts: [
      'ai-consulting-korean-small-business-decision-guide-2026',
      'chatgpt-for-korean-restaurant-owners-2026',
      'ai-bilingual-customer-service-korean-business-2026',
      'ai-photography-korean-small-business-2026',
      'ai-google-review-response-korean-business-2026',
      'google-ai-overviews-korean-business-citation-2026',
      'ai-search-korean-business-owner-survival-guide-2026',
      'ai-tools-korean-small-business-catch-up-2026',
    ],
  },
  'switching-vendor': {
    label: { en: 'Switching Your Web Agency — Red Flags & Owner Rights', ko: '웹업체 갈아타기 — 위험신호 & 사장님 권리' },
    pillarUrl: '/switching-web-agency-guide',
    pillarSlug: 'do-you-own-your-website-domain-hostage-2026', // strongest trust/ownership post
    posts: [
      'do-you-own-your-website-domain-hostage-2026',
      'web-designer-ghosted-take-back-website-2026',
      'website-maintenance-fee-what-it-covers-2026',
      'google-ads-agency-wasting-budget-signs-2026',
      'small-business-marketing-dashboard-flying-blind-2026',
      'outdated-slow-website-losing-customers-2026',
      'korean-business-web-vendor-red-flags-2026',
      'why-start-website-right-first-time-lock-in-2026',
      'buy-domain-in-your-own-name-korean-business-2026',
    ],
  },
} as const

export type PillarKey = keyof typeof PILLARS

/** Reverse lookup: post slug → pillar key. Every slug appears exactly once. */
export const POST_TO_PILLAR: Record<string, PillarKey> = {
  // bilingual-seo
  'bilingual-seo-technical-guide-hreflang': 'bilingual-seo',
  'bilingual-seo-new-york-korean-business': 'bilingual-seo',
  'naver-vs-google-korean-business-usa': 'bilingual-seo',
  'naver-seo-from-usa-korean-business': 'bilingual-seo',
  'website-translation-vs-localization-korean-business': 'bilingual-seo',
  'local-seo-korean-business-2026': 'bilingual-seo',
  'local-seo-guide-korean-business-2026': 'bilingual-seo',
  'affordable-seo-new-jersey-korean-business': 'bilingual-seo',
  'case-study-korean-nail-salon-seo-10x': 'bilingual-seo',
  'tj-flowers-shopify-revamp-case-study': 'bilingual-seo',

  // restaurant-marketing
  'korean-restaurant-website-essentials': 'restaurant-marketing',
  'korean-restaurant-own-app-vs-doordash': 'restaurant-marketing',
  'korean-restaurant-online-ordering-platforms-2026': 'restaurant-marketing',
  'yelp-ads-vs-google-ads-korean-restaurant': 'restaurant-marketing',
  'korean-cafe-coffee-shop-website-guide': 'restaurant-marketing',
  'korean-grocery-mart-online-presence-guide': 'restaurant-marketing',

  // beauty-wellness
  'korean-medspa-aesthetic-clinic-website': 'beauty-wellness',
  'korean-nail-salon-website-guide': 'beauty-wellness',
  'korean-hair-salon-website-guide': 'beauty-wellness',

  // website-cost
  'nj-ny-website-cost-2026': 'website-cost',
  'website-cost-hidden-fees-usa': 'website-cost',
  'do-i-need-a-website-korean-business': 'website-cost',
  'website-redesign-vs-rebuild-korean-business': 'website-cost',
  'squarespace-wordpress-shopify-korean-business': 'website-cost',
  'wordpress-to-nextjs-korean-business-migration': 'website-cost',
  'shopify-korean-ecommerce': 'website-cost',
  'pwa-vs-native-app-korean-smb': 'website-cost',
  'app-store-submission-korean-business-guide': 'website-cost',
  'korean-business-website-guide-2026': 'website-cost',
  'why-anthropic-chose-aws': 'website-cost',

  // kakaotalk-marketing
  'kakaotalk-channel-us-korean-business': 'kakaotalk-marketing',
  'kakaotalk-account-without-korean-phone-2026': 'kakaotalk-marketing',
  'instagram-vs-website-korean-business': 'kakaotalk-marketing',
  'google-business-profile-korean-business-optimization': 'kakaotalk-marketing',
  'google-ads-korean-business': 'kakaotalk-marketing',
  'google-ads-vs-meta-ads-korean-business-2026': 'kakaotalk-marketing',

  // professional-services
  'korean-dental-practice-website-guide': 'professional-services',
  'korean-medical-clinic-online-booking-system-guide': 'professional-services',
  'korean-law-firm-website-guide': 'professional-services',
  'korean-real-estate-agent-website': 'professional-services',
  'korean-insurance-financial-services-website': 'professional-services',
  'korean-tutoring-sat-prep-website': 'professional-services',
  'korean-church-website-guide': 'professional-services',

  // 2026-05-10 batch
  'kakaotalk-channel-vs-instagram-korean-business': 'kakaotalk-marketing',
  'toast-vs-square-korean-restaurant': 'restaurant-marketing',
  'chatgpt-search-korean-restaurant-visibility': 'restaurant-marketing',
  'squarespace-vs-wix-vs-nextjs-korean-business': 'website-cost',
  'starting-korean-business-america-2026': 'professional-services',

  // 2026-05-11 batch (recent additions before this one)
  'kakaotalk-channel-automation-korean-restaurants': 'kakaotalk-marketing',
  'doordash-vs-ubereats-vs-own-app-korean-restaurant': 'restaurant-marketing',
  'korean-restaurant-marketing-annandale-va': 'restaurant-marketing',
  // ai-search-korean-business-owner-survival-guide-2026 moved to ai-services below

  // 2026-05-12 — 10000X impressions push (6 new bilingual posts)
  'kakaotalk-advertising-agency-usa-guide-2026': 'kakaotalk-marketing',
  'korean-salon-spa-local-seo-new-jersey-2026': 'beauty-wellness',
  'google-business-profile-multi-location-korean-franchise-2026': 'kakaotalk-marketing',
  'yelp-optimization-korean-restaurant-no-ads-2026': 'restaurant-marketing',
  'korean-bakery-cafe-website-essentials-2026': 'restaurant-marketing',
  'korean-food-truck-catering-website-guide-2026': 'restaurant-marketing',

  // 2026-05-13 — AI services cluster (5 new posts + 2 pre-existing moved here)
  'ai-consulting-korean-small-business-decision-guide-2026': 'ai-services',
  'chatgpt-for-korean-restaurant-owners-2026': 'ai-services',
  'ai-bilingual-customer-service-korean-business-2026': 'ai-services',
  'ai-photography-korean-small-business-2026': 'ai-services',
  'ai-google-review-response-korean-business-2026': 'ai-services',
  // moved from bilingual-seo (stronger fit in ai-services)
  'google-ai-overviews-korean-business-citation-2026': 'ai-services',
  'ai-search-korean-business-owner-survival-guide-2026': 'ai-services',

  // 2026-05-13 — 2 new case studies (analytics showed 3.7x engagement on case studies)
  'case-study-salt-and-polish-fort-lee-spa-rebuild-2026': 'bilingual-seo',
  'case-study-korean-restaurant-palisades-park-bookings-3x-2026': 'restaurant-marketing',

  // backfill — previously unmapped existing posts (restored internal linking)
  'korean-bbq-restaurant-website-marketing-2026': 'restaurant-marketing',
  'tiktok-shop-korean-smb-us-2026': 'kakaotalk-marketing',
  'korean-immigration-law-firm-website-seo-2026': 'professional-services',

  // 2026-06-13 — GSC-gap batch (Atlanta metro, Korean SEO, KakaoTalk ROI, Bergen County)
  'korean-business-marketing-atlanta-johns-creek-suwanee-2026': 'bilingual-seo',
  'korean-seo-guide-american-businesses-2026': 'bilingual-seo',
  'kakaotalk-advertising-cost-roi-korean-business-2026': 'kakaotalk-marketing',
  'korean-business-local-seo-englewood-bergen-county-nj-2026': 'bilingual-seo',
  'korean-american-business-by-state-2026': 'bilingual-seo',
  'korean-web-design-california-2026': 'bilingual-seo',
  'korean-web-design-new-york-2026': 'bilingual-seo',
  'korean-web-design-new-jersey-2026': 'bilingual-seo',

  // 2026-06-27 — "why owners fire their web agency" pain batch (10 posts)
  'do-you-own-your-website-domain-hostage-2026': 'switching-vendor',
  'web-designer-ghosted-take-back-website-2026': 'switching-vendor',
  'website-maintenance-fee-what-it-covers-2026': 'switching-vendor',
  'google-ads-agency-wasting-budget-signs-2026': 'switching-vendor',
  'small-business-marketing-dashboard-flying-blind-2026': 'switching-vendor',
  'outdated-slow-website-losing-customers-2026': 'switching-vendor',
  'korean-business-web-vendor-red-flags-2026': 'switching-vendor',
  'website-no-traffic-not-showing-google-2026': 'bilingual-seo',
  'toast-clover-pos-analytics-goldmine-2026': 'restaurant-marketing',
  'ai-tools-korean-small-business-catch-up-2026': 'ai-services',

  // 2026-07-15 — "새로 시작하는 한인 사장님" market-entry batch (5 posts)
  'shopify-korean-product-sellers-why-start-2026': 'website-cost',
  'b2b-company-website-korean-business-credibility-2026': 'website-cost',
  'why-start-website-right-first-time-lock-in-2026': 'switching-vendor',
  'buy-domain-in-your-own-name-korean-business-2026': 'switching-vendor',
  'florist-online-ordering-korean-flower-shop-2026': 'bilingual-seo',

  // 2026-07-15 — flagship case study (Vito's Pizza, Alpharetta GA)
  'website-drives-revenue-pizza-catering-case-study-2026': 'restaurant-marketing',

  // 2026-07-18 — AWS cloud infrastructure consulting (Dallas–Fort Worth, TX)
  'aws-cloud-consulting-korean-business-dallas-2026': 'website-cost',

  // 2026-07-16/17 backfill — Chicago F&B ordering/POS/reviews + app development hiring guide
  'korean-restaurant-chicago-online-ordering-pos-reviews-2026': 'restaurant-marketing',
  'korean-app-development-hire-guide-2026': 'website-cost',

  // 2026-07-22 — B2B RFQ lead generation (Seattle / Pacific Northwest)
  'b2b-wholesale-rfq-lead-generation-seattle-korean-business-2026': 'website-cost',
}
