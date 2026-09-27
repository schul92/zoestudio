import Link from 'next/link'

export default function Footer({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  // Baked at build time (static page) — a Jan 1 viewer on a Dec build would
  // hydration-mismatch, so the node below carries suppressHydrationWarning.
  const year = new Date().getFullYear()

  const cols = [
    {
      title: isKo ? '스튜디오' : 'Studio',
      links: [
        [isKo ? '소개' : 'About', `${prefix}/about`],
        [isKo ? '포트폴리오' : 'Work', `${prefix}/portfolio`],
        [isKo ? '블로그' : 'Journal', `${prefix}/blog`],
        [isKo ? '가격' : 'Pricing', `${prefix}/pricing`],
        [isKo ? '무료 도구' : 'Free tools', `${prefix}/tools`],
      ] as [string, string][],
    },
    {
      title: isKo ? '서비스' : 'Services',
      links: [
        [isKo ? '웹사이트 제작' : 'Website design', isKo ? '/ko/웹사이트-제작' : '/웹사이트-제작'],
        [isKo ? '구글 광고대행' : 'Google Ads', isKo ? '/ko/광고대행' : '/광고대행'],
        [isKo ? 'SEO · 검색 최적화' : 'SEO', isKo ? '/ko/englewood-nj-seo' : '/englewood-nj-seo'],
        [isKo ? '카카오톡 마케팅' : 'KakaoTalk marketing', isKo ? '/ko/services/kakaotalk-marketing-usa' : '/services/kakaotalk-marketing-usa'],
        [isKo ? '쇼핑몰 제작' : 'E-commerce build', isKo ? '/ko/쇼핑몰-제작' : '/services/shopify-cost-audit'],
      ] as [string, string][],
    },
    {
      title: isKo ? '업종별 전문성' : 'Industries',
      links: [
        [isKo ? '한식당' : 'Korean restaurants', isKo ? '/ko/industries/한식당-웹사이트' : '/industries/korean-restaurant'],
        [isKo ? '뷰티샵 · 헤어' : 'Beauty + salon', isKo ? '/ko/industries/한인-뷰티샵-웹사이트' : '/industries/korean-beauty-salon'],
        [isKo ? '교회' : 'Korean church', isKo ? '/ko/industries/한인-교회-홈페이지' : '/industries/korean-church'],
        [isKo ? '학원' : 'Academy · hagwon', isKo ? '/ko/industries/한인-학원-웹사이트' : '/industries/korean-academy'],
        [isKo ? '의료 · 치과' : 'Medical + dental', isKo ? '/ko/industries/한인-병원-웹사이트' : '/industries/korean-medical-dental'],
        [isKo ? '쇼핑몰 · Shopify' : 'E-commerce', isKo ? '/ko/industries/한인-쇼핑몰-제작' : '/industries/korean-ecommerce'],
      ] as [string, string][],
    },
    {
      title: isKo ? '지역' : 'Cities',
      links: [
        [isKo ? '뉴저지' : 'New Jersey', isKo ? '/ko/뉴저지-웹사이트' : '/nj-website'],
        [isKo ? '뉴욕' : 'New York', isKo ? '/ko/뉴욕-웹사이트' : '/ny-website'],
        [isKo ? 'LA · 캘리포니아' : 'LA · California', isKo ? '/ko/캘리포니아-웹사이트' : '/ca-website'],
        [isKo ? '애틀랜타' : 'Atlanta', isKo ? '/ko/조지아-웹사이트' : '/ga-website'],
        [isKo ? '50개 주 전체 →' : 'All 50 states →', isKo ? '/ko/states' : '/states'],
      ] as [string, string][],
    },
  ]

  const contact: [string, string, boolean][] = [
    ['info@zoelumos.com', 'mailto:info@zoelumos.com', false],
    [isKo ? '카카오톡 상담' : 'KakaoTalk', 'http://pf.kakao.com/_xhxdxmlX/chat', true],
    ['Instagram', 'https://instagram.com/zoelumos', true],
  ]

  return (
    <footer className="zl-foot">
      <div className="container-edge pt-24 md:pt-32 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-10 gap-y-14">
          <div>
            <p className="zl-foot-label mb-4">{isKo ? '연락' : 'Contact'}</p>
            <ul>
              {contact.map(([label, href, ext]) => (
                <li key={label}>
                  <a href={href} className="zl-foot-link" {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {label}{ext ? ' ↗' : ''}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="zl-foot-label mb-4">{c.title}</p>
              <ul>
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="zl-foot-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link href={`${prefix}/`} className="block mt-24 md:mt-32" aria-label="Zoe Lumos">
          <div className="zl-wordmark">Zoe Lumos</div>
        </Link>
        <p className="mt-4 text-[15px] text-ash">
          {isKo ? '한인 · 미국인 디자인 스튜디오 · 뉴저지 포트리' : 'An American-Korean design studio · Fort Lee, New Jersey'}
        </p>

        <div className="mt-14 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-6 text-[14px] text-ash">
            <Link href={`${prefix}/privacy`} className="hover:text-ink transition-colors">
              {isKo ? '개인정보처리방침' : 'Privacy'}
            </Link>
            <Link href={`${prefix}/terms`} className="hover:text-ink transition-colors">
              {isKo ? '이용약관' : 'Terms'}
            </Link>
          </div>
          <p className="text-[13px] text-ash" suppressHydrationWarning>
            © {year} Zoe Lumos Studio, LLC
          </p>
          <Link href={isKo ? '/' : '/ko'} className="zl-pill" hrefLang={isKo ? 'en' : 'ko'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
            </svg>
            {isKo ? '한국어' : 'English'} <span className="text-ash">{isKo ? '→ English' : '→ 한국어'}</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
