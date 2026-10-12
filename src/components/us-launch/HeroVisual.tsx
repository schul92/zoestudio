import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { Accessibility, Check, Clock, Languages, Lock, Search } from 'lucide-react'

type L = 'en' | 'ko'
const delay = (ms: number) => ({ ['--ul-d' as string]: `${ms}ms` }) as CSSProperties

/** Hero composition: a real US-launch site in a browser frame, with the four things a Korean HQ
 *  asks about first arriving one by one around it (CSS keyframes on load; static under reduced motion). */
export default function HeroVisual({ locale }: { locale: L }) {
  const ko = locale === 'ko'
  const cards: { icon: ReactNode; title: string; sub: string; detail: ReactNode; pos: string; ms: number }[] = [
    {
      icon: <Clock className="h-4 w-4" aria-hidden />,
      title: ko ? '한국 시간 화상 미팅' : 'Meetings on Korea time',
      sub: ko ? '서울 10:00 · 뉴저지 전날 21:00' : 'Seoul 10:00 · New Jersey 21:00',
      detail: null,
      pos: 'md:-left-8 md:-top-7 lg:-left-10',
      ms: 450,
    },
    {
      icon: <Search className="h-4 w-4" aria-hidden />,
      title: ko ? 'Google 검색 준비' : 'Ready for Google',
      sub: ko ? '미국 검색 기준으로 설정' : 'Set up for US search',
      detail: <Checks items={ko ? ['구조화 데이터', '사이트맵', '한·영 hreflang'] : ['Structured data', 'Sitemap', 'KO–EN hreflang']} />,
      pos: 'md:-right-8 md:top-[26%] lg:-right-6',
      ms: 650,
    },
    {
      icon: <Languages className="h-4 w-4" aria-hidden />,
      title: ko ? '한국어 관리자 화면' : 'Korean admin panel',
      sub: ko ? '본사에서 직접 수정' : 'Edited by your HQ',
      detail: (
        <ul className="mt-3 space-y-1.5">
          {(ko
            ? [['메뉴 수정', '게시됨'], ['매장 추가', '초안'], ['소식 게시', '예약']]
            : [['Edit menu', 'Live'], ['Add store', 'Draft'], ['Post news', 'Scheduled']]
          ).map(([row, state]) => (
            <li key={row} className="flex items-center justify-between gap-3 text-[12px] text-graphite">
              <span>{row}</span>
              <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[11px] text-ash">{state}</span>
            </li>
          ))}
        </ul>
      ),
      pos: 'md:-left-10 md:bottom-[10%] lg:-left-12',
      ms: 850,
    },
    {
      icon: <Accessibility className="h-4 w-4" aria-hidden />,
      title: ko ? '웹 접근성 검수' : 'Accessibility review',
      sub: ko ? 'WCAG 기준 점검' : 'Checked against WCAG',
      detail: <Checks items={ko ? ['키보드 이동', '대체 텍스트', '명도 대비'] : ['Keyboard', 'Alt text', 'Contrast']} />,
      pos: 'md:-right-6 md:-bottom-9 lg:-right-4',
      ms: 1050,
    },
  ]

  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
      <div className="ul-rise ul-frame relative overflow-hidden rounded-[14px] md:rounded-[18px] bg-[#1C1C1E]">
        <div className="flex h-9 md:h-10 items-center gap-2 border-b border-white/10 px-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="mx-auto inline-flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 text-[11px] md:text-[12px] text-ash">
            <Lock className="h-3 w-3" aria-hidden />
            endopiaglobal.com
          </span>
          <span className="w-[42px]" aria-hidden />
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src="/portfolio/endopia.jpg"
            alt={ko ? 'EndoPia 미국 공식 사이트 화면' : 'EndoPia US website'}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, (min-width: 768px) 620px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-3 md:mt-0">
        {cards.map((c) => (
          <li
            key={c.title}
            style={delay(c.ms)}
            className={`ul-pop ul-card rounded-2xl p-3.5 md:p-4 md:absolute md:w-[228px] ${c.pos}`}
          >
            <div className="flex items-start gap-3">
              <span className="ul-chip grid h-8 w-8 shrink-0 place-items-center rounded-full">{c.icon}</span>
              <div className="min-w-0">
                <p className="text-[13px] md:text-[14px] font-semibold leading-snug text-ink">{c.title}</p>
                <p className="mt-0.5 text-[11.5px] md:text-[12px] leading-snug text-ash">{c.sub}</p>
              </div>
            </div>
            {c.detail && <div className="hidden md:block">{c.detail}</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((it) => (
        <li key={it} className="flex items-center gap-2 text-[12px] text-graphite">
          <Check className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden />
          {it}
        </li>
      ))}
    </ul>
  )
}
