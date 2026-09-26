import Link from 'next/link'
import Image from 'next/image'

const copy = {
  en: {
    eyebrow: 'Korean-American Studio · Shopify Expert',
    h1Lead: 'Bilingual websites,',
    h1Accent: 'built to convert.',
    sub: 'Premium Shopify stores for Korean-American brands — bilingual by default, fast by design, built to convert.',
    cta1: 'Start your project',
    cta2: 'See TJ Flowers case study',
    proofBadge: {
      metric: '$3,114',
      label: 'revenue in 4 weeks',
      sub: 'TJ Flowers · Shopify rebuild',
    },
    logosLabel: 'Trusted by founders shipping bilingual',
  },
  ko: {
    eyebrow: '한인 비즈니스 스튜디오 · Shopify 전문',
    h1Lead: '한인 비즈니스 웹사이트,',
    h1Accent: '매출로 이어집니다.',
    sub: '한·영 이중언어 기본, 빠른 속도, Shopify·커스텀 빌드 — 진짜 매출로 이어집니다.',
    cta1: '프로젝트 시작하기',
    cta2: 'TJ Flowers 성공 사례 보기',
    proofBadge: {
      metric: '$3,114',
      label: '4주 만에 실매출',
      sub: 'TJ Flowers · Shopify 리뉴얼',
    },
    logosLabel: '한국어·영어로 함께 런칭한 브랜드',
  },
} as const

const CLIENT_LOGOS: { name: string; url: string }[] = [
  { name: 'TJ Flowers', url: 'https://tjflowersandevents.com/' },
  { name: 'Salt & Polish', url: 'https://saltpolish.com/' },
  { name: 'Miguk Story', url: 'https://migukstory.com/' },
  { name: 'Kona Coffee', url: 'https://konacoffeedonut.com/' },
  { name: 'CareK9', url: 'https://carek9.com/' },
  { name: 'Mochinut', url: 'https://www.mochinutnynj.com/' },
  { name: "Vito's Pizza", url: 'https://www.vitospizzaandristorante.com/' },
]

export default function HeroNew({ locale = 'en' }: { locale?: string }) {
  const ko = locale === 'ko'
  const t = ko ? copy.ko : copy.en
  const prefix = ko ? '/ko' : ''

  return (
    <section className="relative bg-ivory pt-28 md:pt-36" aria-labelledby="hero-title">
      <div className="container-edge flex flex-col items-center text-center">
        <p className="text-[14px] md:text-[15px] font-medium text-ash">{t.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-4 font-bold text-ink text-[clamp(2.6rem,8.2vw,6.75rem)] leading-[0.98] tracking-[-0.055em] max-w-[14ch] text-balance"
        >
          <span className="block">{t.h1Lead}</span>
          <span className="block kn-gradient pb-[0.06em]">{t.h1Accent}</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-[17px] md:text-[21px] leading-[1.45] text-graphite">{t.sub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link href={`${prefix}/#contact`} className="btn-ink">
            {t.cta1}
          </Link>
          <Link href={`${prefix}/blog/tj-flowers-shopify-revamp-case-study`} className="btn-ghost">
            {t.cta2} <span aria-hidden>›</span>
          </Link>
        </div>
      </div>

      <div className="kn-stage container-edge mt-14 md:mt-20 flex justify-center">
        <div className="kn-fan w-full max-w-[960px] aspect-[16/9.4]">
          <div className="kn-side kn-side-l" aria-hidden>
            <Image
              src="/portfolio/salt-polish.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 0px, 720px"
              className="object-cover object-top rounded-[16px] border border-black/5 shadow-[0_50px_90px_-40px_rgba(0,0,0,.45)]"
            />
          </div>
          <div className="kn-side kn-side-r" aria-hidden>
            <Image
              src="/portfolio/migukstory.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 0px, 720px"
              className="object-cover object-top rounded-[16px] border border-black/5 shadow-[0_50px_90px_-40px_rgba(0,0,0,.45)]"
            />
          </div>
          <a
            href="https://www.tjflowersandevents.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 block"
            aria-label="TJ Flowers — live Shopify store"
          >
            <Image
              src="/hero/tj-flowers-mockup.jpeg"
              alt="TJ Flowers — Manhattan luxury florist Shopify build by Zoe Lumos"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 960px"
              className="object-cover object-top rounded-[16px] border border-black/5 shadow-[0_60px_110px_-50px_rgba(0,0,0,.5)]"
            />
          </a>
        </div>
      </div>

      <div className="container-edge mt-12 md:mt-16 flex justify-center">
        <div className="flex items-baseline gap-4 text-left">
          <span className="text-[44px] md:text-[64px] font-bold tracking-[-0.05em] leading-none text-ink tabular-nums">
            {t.proofBadge.metric}
          </span>
          <span className="flex flex-col">
            <span className="text-[16px] md:text-[18px] font-semibold text-ink">{t.proofBadge.label}</span>
            <span className="text-[13px] md:text-[14px] text-ash">{t.proofBadge.sub}</span>
          </span>
        </div>
      </div>

      <div className="container-edge mt-14 md:mt-20 pb-6 border-b border-hairline">
        <p className="text-center text-[13px] text-ash">{t.logosLabel}</p>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name}>
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] md:text-[19px] font-semibold tracking-[-0.02em] text-mute hover:text-ink transition-colors"
              >
                {logo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
