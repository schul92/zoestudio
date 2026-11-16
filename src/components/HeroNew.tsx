import LumosHero, { type LumosCopy } from '@/components/home/LumosHero'
import LumosFirstFrame from '@/components/home/LumosFirstFrame'
import { FRAMES_DESKTOP, FRAMES_MOBILE } from '@/components/home/lumosFrames'

const SEQ_DESKTOP = { dir: FRAMES_DESKTOP.dir, count: FRAMES_DESKTOP.count, maxDpr: 2 }
const SEQ_MOBILE = { dir: FRAMES_MOBILE.dir, count: FRAMES_MOBILE.count, maxDpr: 2 }

const copy = {
  en: {
    eyebrow: 'Bilingual EN/KR studio · US & Korea',
    h1Lead: 'Websites for doctors',
    h1Accent: '& B2B companies.',
    sub: 'Practice websites that turn searches into booked patients. B2B sites, portals and system integrations that win and keep accounts. One bilingual team.',
    cta1: 'Start your project',
    cta2: 'Medical & dental websites',
    cta2Href: '/industries/korean-medical-dental',
    logosLabel: 'Medical, B2B and brand clients we’ve launched',
    scroll: 'Scroll',
    sceneLabel: 'A laptop opens and lights up with client websites built by Zoe Lumos, then a phone slides in.',
    captions: [
      // Order and timing follow CAPTION_RANGES in components/home/lumosStory.ts.
      { label: 'TJ Flowers · NYC', value: '$10,000+', body: 'Revenue within 3 months of the Shopify rebuild.' },
      { label: 'Seoul Choice Dental · Seoul', value: '4 languages · 132 pages', body: 'Dental clinic site launched November 2026, set up for Naver and Google.' },
      { label: 'TJ Flowers · Search', value: '5× visibility', body: 'Search visibility in 6 weeks.' },
      { label: 'Every build', value: '<1.5s load', body: 'Fast on the phone your customers actually use.' },
    ],
  },
  ko: {
    eyebrow: '한·영 이중언어 웹 스튜디오 · 미국 · 한국',
    h1Lead: '의사·병원·B2B',
    h1Accent: '웹사이트 전문.',
    sub: '검색이 진료 예약으로 이어지는 병원 홈페이지. 거래처를 얻고 지키는 B2B 사이트·포털·시스템 연동. 한·영 이중언어로 한 팀이 만듭니다.',
    cta1: '프로젝트 시작하기',
    cta2: '병원·치과 홈페이지 보기',
    cta2Href: '/ko/industries/병원-홈페이지-제작',
    logosLabel: '함께 런칭한 의료 · B2B · 브랜드 고객사',
    scroll: '스크롤',
    sceneLabel: '노트북이 열리며 Zoe Lumos가 만든 고객 웹사이트가 켜지고, 이어서 휴대폰이 들어옵니다.',
    captions: [
      { label: 'TJ Flowers · NYC', value: '$10,000+', body: 'Shopify 리빌드 후 3개월 안에 매출.' },
      { label: '서울초이스치과의원 · 서울', value: '4개 국어 · 132페이지', body: '2026년 11월 오픈한 치과 홈페이지. 네이버·구글 검색 등록까지.' },
      { label: 'TJ Flowers · 검색', value: '검색 노출 5배', body: '6주 만에.' },
      { label: '모든 빌드', value: '1.5초 미만 로딩', body: '고객이 실제로 쓰는 휴대폰에서도 빠르게.' },
    ],
  },
} as const

const CLIENT_LOGOS: { name: string; url: string }[] = [
  { name: 'Seoul Choice Dental', url: 'https://www.seoulchoicedent.com/' },
  { name: 'TopSkin Clinic', url: 'https://www.topskinclinicmedspa.com/' },
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
    cta2Href: t.cta2Href,
    scroll: t.scroll,
    sceneLabel: t.sceneLabel,
    captions: t.captions.map((c) => ({ ...c })),
  }

  return (
    <>
      <LumosHero t={hero} prefix={prefix} desktop={SEQ_DESKTOP} mobile={SEQ_MOBILE} firstFrame={<LumosFirstFrame />} />
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
