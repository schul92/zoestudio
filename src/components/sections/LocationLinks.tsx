'use client'

import { useState } from 'react'
import Link from 'next/link'
import InView from '@/components/ui/motion/InView'
import USMap, { cities } from './USMap'

export default function LocationLinks({
  locale = 'en',
  sectionNumber = '05',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const isKo = locale === 'ko'
  const [active, setActive] = useState<string | null>(null)

  const locations = [
    {
      id: 'nj',
      name: isKo ? '뉴저지' : 'New Jersey',
      cities: isKo ? '포트리 · 팰팍 · 에디슨' : 'Fort Lee · Palisades Park · Edison',
      href: isKo ? '/ko/뉴저지-웹사이트' : '/nj-website',
    },
    {
      id: 'ny',
      name: isKo ? '뉴욕' : 'New York',
      cities: isKo ? '맨하탄 · 플러싱 · 브루클린' : 'Manhattan · Flushing · Brooklyn',
      href: isKo ? '/ko/뉴욕-웹사이트' : '/ny-website',
    },
    {
      id: 'ca',
      name: isKo ? '캘리포니아' : 'California',
      cities: isKo ? 'LA · 오렌지 카운티 · 샌프란시스코' : 'LA · Orange County · SF',
      href: isKo ? '/ko/캘리포니아-웹사이트' : '/ca-website',
    },
    {
      id: 'tx',
      name: isKo ? '텍사스' : 'Texas',
      cities: isKo ? '달라스 · 휴스턴 · 오스틴' : 'Dallas · Houston · Austin',
      href: isKo ? '/ko/텍사스-웹사이트' : '/tx-website',
    },
    {
      id: 'ga',
      name: isKo ? '조지아' : 'Georgia',
      cities: isKo ? '애틀랜타 · 둘루스 · 수와니' : 'Atlanta · Duluth · Suwanee',
      href: isKo ? '/ko/조지아-웹사이트' : '/ga-website',
    },
    {
      id: 'va',
      name: isKo ? '버지니아' : 'Virginia',
      cities: isKo ? '애난데일 · 센터빌 · 페어팩스' : 'Annandale · Centreville · Fairfax',
      href: isKo ? '/ko/버지니아-웹사이트' : '/va-website',
    },
    {
      id: 'il',
      name: isKo ? '일리노이' : 'Illinois',
      cities: isKo ? '시카고 · 나일스 · 글렌뷰' : 'Chicago · Niles · Glenview',
      href: isKo ? '/ko/일리노이-웹사이트' : '/il-website',
    },
    {
      id: 'wa',
      name: isKo ? '워싱턴' : 'Washington',
      cities: isKo ? '시애틀 · 벨뷰 · 린우드' : 'Seattle · Bellevue · Lynnwood',
      href: isKo ? '/ko/워싱턴-웹사이트' : '/wa-website',
    },
    {
      id: 'md',
      name: isKo ? '메릴랜드' : 'Maryland',
      cities: isKo ? '엘리콧시티 · 게이더스버그 · 록빌' : 'Ellicott City · Gaithersburg · Rockville',
      href: isKo ? '/ko/메릴랜드-웹사이트' : '/md-website',
    },
    {
      id: 'hi',
      name: isKo ? '하와이' : 'Hawaii',
      cities: isKo ? '호놀룰루 · 카일루아' : 'Honolulu · Kailua',
      href: isKo ? '/ko/하와이-웹사이트' : '/hi-website',
    },
  ]

  const cityRoll = [
    'Fort Lee', 'Palisades Park', 'Flushing', 'Manhattan', 'Brooklyn',
    'Koreatown LA', 'Orange County', 'San Francisco', 'Dallas', 'Houston',
    'Atlanta', 'Duluth', 'Chicago', 'Seattle', 'Annandale', 'Ellicott City', 'Honolulu',
  ]

  return (
    <section className="relative bg-bone section-pad hair-bottom">
      <div className="container-edge">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16 md:mb-20">
          <div className="md:col-span-5">
            <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§ {sectionNumber}</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{isKo ? '서비스 지역' : 'Presence'}</span>
            </InView>
            <h2 className="font-display text-display-lg text-ink tracking-luxury">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">
                  {isKo ? '비즈니스가' : 'Wherever your'}
                </span>
              </InView>
              <InView as="span" className="mask-row" delay={150}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {isKo ? '있는 곳이라면.' : 'business lives.'}
                </span>
              </InView>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <InView as="p" className="reveal text-body-lg text-graphite leading-[1.7] max-w-xl">
              <span>
                {isKo
                  ? '포트리에서 시작해 뉴욕, LA, 애틀랜타, 시카고까지. 한인 · 미국인 비즈니스 모두를 위한 로컬 SEO와 (필요하다면) 이중언어 콘텐츠를 제공합니다.'
                  : 'From Fort Lee to Atlanta, Chicago to LA — local SEO, brand systems, and bilingual content when it fits. Korean-American businesses and American-founded brands alike.'}
              </span>
            </InView>
          </div>
        </div>

        {/* Map + list */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-7 md:sticky md:top-28">
            <InView className="reveal">
              <div className="relative">
                <div className="absolute -top-4 left-0 overline text-ash">
                  {isKo ? '10개 주 · 150+ 프로젝트' : '10 states · 150+ projects'}
                </div>
                <USMap
                  activeId={active}
                  onHover={setActive}
                  className="w-full h-auto text-ink"
                />
              </div>
            </InView>
          </div>

          <ul className="md:col-span-5">
            {locations.map((loc, i) => {
              const isActive = active === loc.id
              return (
                <InView
                  key={loc.href}
                  as="li"
                  className="reveal border-b border-hairline first:border-t"
                  delay={i * 40}
                >
                  <Link
                    href={loc.href}
                    data-cursor="view"
                    onMouseEnter={() => setActive(loc.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(loc.id)}
                    onBlur={() => setActive(null)}
                    className={`group flex items-baseline justify-between gap-6 py-5 md:py-6 transition-all duration-500 ${
                      isActive ? 'pl-4' : ''
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`section-num text-sm transition-colors duration-500 ${
                          isActive ? 'text-gold' : ''
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <div className={`font-display text-[clamp(1.4rem,2.2vw,1.9rem)] tracking-luxury leading-tight fraunces-soft transition-all duration-500 ${
                          isActive ? 'italic text-gold font-light' : 'text-ink'
                        }`}>
                          {loc.name}
                        </div>
                        <p className="mt-1 text-[12px] text-ash">{loc.cities}</p>
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className={`transition-all duration-500 ${
                        isActive ? 'text-gold translate-x-0' : 'text-ash -translate-x-2'
                      }`}
                    >
                      ↗
                    </span>
                  </Link>
                </InView>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Reverse marquee */}
      <div className="mt-24 md:mt-32 hair-y py-6 marq-wrap" data-dir="reverse" data-cursor="drag">
        <div className="overflow-hidden">
          <div className="marq font-display text-ash/80">
            {[...cityRoll, ...cityRoll, ...cityRoll].map((c, i) => (
              <span key={i} className="flex items-center gap-10 text-[clamp(1.1rem,2vw,1.6rem)]">
                <span className="italic font-light fraunces-soft">{c}</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-edge">
        <p className="mt-14 text-[13px] text-ash max-w-3xl leading-[1.7]">
          {isKo
            ? 'ZOE LUMOS는 미국 전역 한인 비즈니스의 웹사이트 제작과 디지털 마케팅을 전담합니다. 뉴저지, 뉴욕, 캘리포니아, 텍사스, 조지아, 버지니아 외 하와이, 펜실베이니아, 플로리다까지 50개 주 서비스.'
            : 'Zoe Lumos serves Korean-American businesses across all 50 states — with bilingual teams, local SEO expertise, and ten dedicated city practices.'}
        </p>
      </div>
    </section>
  )
}
