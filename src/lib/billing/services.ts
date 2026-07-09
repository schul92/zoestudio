/**
 * Client-safe billing primitives.
 *
 * Deliberately free of any `stripe` import: this module is pulled into client
 * components (the admin billing dashboard), and the Stripe Node SDK must never
 * reach the browser bundle. Server-only helpers live in ./stripe.ts, which
 * re-exports everything here so callers can keep a single import site.
 */

/** Services a retainer can include. Persisted on the Stripe Price's metadata
 *  as a comma-separated list of these keys — no database required. */
export const SERVICES = {
  hosting: { en: 'Website hosting', ko: '웹사이트 호스팅' },
  maintenance: { en: 'Maintenance & content edits', ko: '유지보수 · 콘텐츠 수정' },
  security: { en: 'Security, backups & monitoring', ko: '보안 · 백업 · 모니터링' },
  analytics: { en: 'GA4 & analytics management', ko: 'GA4 · 애널리틱스 관리' },
  pos: { en: 'POS integration (Toast / Clover)', ko: 'POS 연동 관리 (Toast / Clover)' },
  ads: { en: 'Google Ads management', ko: '구글 광고 운영' },
  seo: { en: 'Local SEO & Google Business Profile', ko: '로컬 SEO · 구글 비즈니스 프로필' },
  kakao: { en: 'KakaoTalk Channel management', ko: '카카오톡 채널 관리' },
  domain: { en: 'Email & domain management', ko: '이메일 · 도메인 관리' },
} as const

export type ServiceKey = keyof typeof SERVICES

export const isServiceKey = (k: string): k is ServiceKey => k in SERVICES

export const parseServices = (csv?: string | null): ServiceKey[] =>
  (csv ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(isServiceKey)

export const fmtUSD = (cents: number): string =>
  `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`

/** One Product covers every client; the amount lives on a per-client Price. */
export const RETAINER_PRODUCT_NAME = 'ZOE LUMOS Monthly Retainer'
