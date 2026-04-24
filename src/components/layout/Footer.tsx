import Link from 'next/link'
import Magnetic from '@/components/ui/motion/Magnetic'

export default function Footer({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const year = new Date().getFullYear()

  const cols = [
    {
      title: isKo ? '스튜디오' : 'Studio',
      links: [
        [isKo ? '소개' : 'About', `${prefix}/about`],
        [isKo ? '포트폴리오' : 'Work', `${prefix}/portfolio`],
        [isKo ? '블로그' : 'Journal', `${prefix}/blog`],
        [isKo ? '가격' : 'Pricing', `${prefix}/pricing`],
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
      ] as [string, string][],
    },
  ]

  return (
    <footer className="bg-ivory hair-top">
      <div className="container-edge pt-24 pb-14">
        {/* Big wordmark */}
        <div className="flex items-end justify-between gap-8 flex-wrap pb-20 border-b border-hairline">
          <Link href={`${prefix}/`} data-cursor="hide" className="group block">
            <div className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-luxury text-ink fraunces-soft">
              Zoe<span className="italic font-light text-gold">&nbsp;Lumos</span>
            </div>
            <div className="overline text-ash mt-4">
              {isKo ? '한인 · 미국인 디자인 스튜디오' : 'An American-Korean design studio'}
            </div>
          </Link>

          <Magnetic strength={14}>
            <Link
              href={`${prefix}/#contact`}
              data-cursor={isKo ? '시작' : 'Begin'}
              className="btn-ink shrink-0"
            >
              {isKo ? '프로젝트 의뢰' : 'Start a project'}
              <span className="arrow">→</span>
            </Link>
          </Magnetic>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 py-16">
          <div className="md:col-span-4">
            <p className="overline text-ash mb-5">{isKo ? '연락' : 'Contact'}</p>
            <a
              href="mailto:info@zoelumos.com"
              className="font-display text-2xl md:text-3xl text-ink italic font-light hover:text-gold transition-colors"
            >
              info@zoelumos.com
            </a>
            <p className="mt-6 text-[13px] text-ash leading-[1.7]">
              {isKo
                ? '뉴저지 포트리 · 월 — 금 9–6 ET\n한국어 상담 상시'
                : 'Fort Lee, New Jersey\nMon — Fri · 9 — 6 ET · KR 대응'}
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2 md:col-start-auto">
              <p className="overline text-ash mb-5">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[14px] text-graphite hover:text-ink transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <p className="overline text-ash mb-5">{isKo ? '팔로우' : 'Follow'}</p>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a
                  href="https://instagram.com/zoelumos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-graphite hover:text-ink transition-colors"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href="http://pf.kakao.com/_xhxdxmlX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-graphite hover:text-ink transition-colors"
                >
                  KakaoTalk ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="pt-10 border-t border-hairline flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[12px] text-ash">
            © {year} Zoe Lumos Studio, LLC · {isKo ? '모든 권리 보유' : 'All rights reserved'}
          </p>
          <div className="flex items-center gap-6 text-[12px] text-ash">
            <Link href={`${prefix}/privacy`} className="hover:text-ink transition-colors">
              {isKo ? '개인정보처리방침' : 'Privacy'}
            </Link>
            <Link href={`${prefix}/terms`} className="hover:text-ink transition-colors">
              {isKo ? '이용약관' : 'Terms'}
            </Link>
            <span className="gold-dot" />
            <span>{isKo ? '뉴저지에서 제작' : 'Crafted in New Jersey'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
