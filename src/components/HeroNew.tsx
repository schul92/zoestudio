import LumosHero, { type LumosCopy } from '@/components/home/LumosHero'

const copy = {
  en: {
    eyebrow: 'Korean-American Studio · Shopify Expert',
    h1Lead: 'Bilingual websites,',
    h1Accent: 'built to convert.',
    sub: 'Premium Shopify stores for Korean-American brands — bilingual by default, fast by design, built to convert.',
    cta1: 'Start your project',
    cta2: 'See TJ Flowers case study',
    logosLabel: 'Trusted by founders shipping bilingual',
    scroll: 'Scroll',
    sceneLabel: 'A laptop opens and lights up with client websites built by Zoe Lumos, then a phone slides in.',
    captions: [
      // Order and timing follow CAPTION_RANGES in components/home/lumosStory.ts.
      { label: 'TJ Flowers · NYC', value: '$10,000+', body: 'Revenue within 3 months of the Shopify rebuild.' },
      { label: 'EndoPia · Medical device', value: 'FDA 510(k)-cleared', body: 'U.S. launch site built for surgeons and investors.' },
      { label: 'TJ Flowers · Search', value: '5× visibility', body: 'Search visibility in 6 weeks.' },
      { label: 'Every build', value: '<1.5s load', body: 'Fast on the phone your customers actually use.' },
    ],
  },
  ko: {
    eyebrow: '한인 비즈니스 스튜디오 · Shopify 전문',
    h1Lead: '한인 비즈니스 웹사이트,',
    h1Accent: '매출로 이어집니다.',
    sub: '한·영 이중언어 기본, 빠른 속도, Shopify·커스텀 빌드 — 진짜 매출로 이어집니다.',
    cta1: '프로젝트 시작하기',
    cta2: 'TJ Flowers 성공 사례 보기',
    logosLabel: '한국어·영어로 함께 런칭한 브랜드',
    scroll: '스크롤',
    sceneLabel: '노트북이 열리며 Zoe Lumos가 만든 고객 웹사이트가 켜지고, 이어서 휴대폰이 들어옵니다.',
    captions: [
      { label: 'TJ Flowers · NYC', value: '$10,000+', body: 'Shopify 리빌드 후 3개월 안에 매출.' },
      { label: 'EndoPia · 의료기기', value: 'FDA 510(k) 인증', body: '외과의사와 투자자를 위한 미국 런칭 사이트.' },
      { label: 'TJ Flowers · 검색', value: '검색 노출 5배', body: '6주 만에.' },
      { label: '모든 빌드', value: '1.5초 미만 로딩', body: '고객이 실제로 쓰는 휴대폰에서도 빠르게.' },
    ],
  },
} as const

const CLIENT_LOGOS: { name: string; url: string }[] = [
  { name: 'EndoPia', url: 'https://endopiaglobal.com/' },
  { name: 'TJ Flowers', url: 'https://tjflowersandevents.com/' },
  { name: "Vito's Pizza", url: 'https://www.vitospizzaandristorante.com/' },
  { name: 'Salt & Polish', url: 'https://saltpolish.com/' },
  { name: 'CareK9', url: 'https://carek9.com/' },
  { name: 'Kona Coffee', url: 'https://konacoffeedonut.com/' },
  { name: 'Mochinut', url: 'https://www.mochinutnynj.com/' },
  { name: 'Miguk Story', url: 'https://migukstory.com/' },
]

export default function HeroNew({ locale = 'en' }: { locale?: string }) {
  const ko = locale === 'ko'
  const t = ko ? copy.ko : copy.en
  const prefix = ko ? '/ko' : ''
  const hero: LumosCopy = {
    eyebrow: t.eyebrow,
    h1Lead: t.h1Lead,
    h1Accent: t.h1Accent,
    sub: t.sub,
    cta1: t.cta1,
    cta2: t.cta2,
    scroll: t.scroll,
    sceneLabel: t.sceneLabel,
    captions: t.captions.map((c) => ({ ...c })),
  }

  return (
    <>
      <LumosHero t={hero} prefix={prefix} />
      <section className="bg-ivory pt-14 md:pt-20" aria-label={t.logosLabel}>
        <div className="container-edge pb-6 border-b border-hairline">
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
    </>
  )
}
