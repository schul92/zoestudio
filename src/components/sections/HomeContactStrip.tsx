import Link from 'next/link'

// The first way to reach us on the home page: right after the hero story, so a phone visitor doesn't have to
// scroll ~26 screens to the full form. Server-rendered, no JS. The reply promise is the one already made in the
// contact section copy.
const KAKAO_CHAT = 'https://pf.kakao.com/_xhxdxmlX/chat'

const copy = {
  en: {
    line: 'Have a project in mind? We reply within one business day, in English or Korean.',
    kakao: 'KakaoTalk',
    quote: 'Get a free quote',
  },
  ko: {
    line: '프로젝트가 있으신가요? 영업일 기준 1일 이내에 한국어 또는 영어로 회신드립니다.',
    kakao: '카카오톡 상담',
    quote: '무료 견적 받기',
  },
}

export default function HomeContactStrip({ locale }: { locale: string }) {
  const isKo = locale === 'ko'
  const t = copy[isKo ? 'ko' : 'en']
  return (
    <section aria-label={isKo ? '빠른 문의' : 'Quick contact'} className="relative border-y border-hairline">
      <div className="container-edge py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <p className="m-0 text-[17px] md:text-[19px] leading-[1.45] tracking-[-0.01em] text-ink max-w-[46ch] [text-wrap:balance] break-keep">
          {t.line}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={KAKAO_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            data-kakao-loc="home_strip"
            className="zl-press inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full text-[15px] font-semibold"
            style={{ background: '#FEE500', color: '#191600', touchAction: 'manipulation' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.463-.2.723-.722 2.62-.828 3.026-.13.502.184.496.387.36.16-.106 2.544-1.726 3.576-2.428.766.112 1.56.17 2.357.17 5.523 0 10-3.463 10-7.591S17.523 3 12 3Z"
                fill="currentColor"
              />
            </svg>
            {t.kakao}
          </a>
          <Link
            href={isKo ? '/ko/contact' : '/contact'}
            className="zl-press inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full text-[15px] font-semibold"
            style={{ background: '#F5F5F7', color: '#0B0B0D', touchAction: 'manipulation' }}
          >
            {t.quote} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
