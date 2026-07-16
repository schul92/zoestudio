import Link from 'next/link'

/**
 * True-facts guarantee strip — every claim here is already policy, published
 * elsewhere on the site (process page, llms.txt, service pages). Never add a
 * claim that is not already true.
 *
 * variant="full"    → 2×2 grid with descriptions (pricing page)
 * variant="compact" → single-row strip near CTAs (service pages)
 */

const GUARANTEES = [
  {
    icon: '✏️',
    title: { en: '2 revision rounds per phase', ko: '단계별 수정 2회 보장' },
    desc: {
      en: 'Design and build each include two review rounds — written into every project.',
      ko: '디자인·개발 각 단계마다 수정 2회가 기본으로 포함됩니다.',
    },
  },
  {
    icon: '🔑',
    title: { en: 'You own 100% of domain & code', ko: '도메인·코드 100% 고객 소유' },
    desc: {
      en: 'Domain, hosting, and code are registered in your name. Move anywhere, anytime.',
      ko: '도메인·호스팅·코드 모두 고객 명의입니다. 언제든 다른 곳으로 이전할 수 있습니다.',
    },
  },
  {
    icon: '⏱️',
    title: { en: 'Reply within 1 business day', ko: '영업일 24시간 내 응답' },
    desc: {
      en: 'Every email and KakaoTalk message answered within one business day.',
      ko: '이메일·카카오톡 문의 모두 영업일 기준 24시간 내에 답변드립니다.',
    },
  },
  {
    icon: '🚪',
    title: { en: 'Cancel monthly plans anytime', ko: '월 플랜 언제든 해지' },
    desc: {
      en: 'No lock-in on monthly care plans — service runs through the month you paid for, nothing billed after.',
      ko: '월 관리 플랜은 언제든 해지 가능합니다. 결제한 달까지 서비스가 유지되며 추가 청구는 없습니다.',
    },
  },
]

export default function GuaranteeStrip({
  locale = 'en',
  variant = 'compact',
  dark = false,
}: {
  locale?: string
  variant?: 'full' | 'compact'
  dark?: boolean
}) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  if (variant === 'full') {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GUARANTEES.map((g) => (
            <div
              key={g.icon}
              className={`rounded-2xl p-6 border ${
                dark ? 'bg-[#0e0e0e] border-white/[0.07]' : 'bg-white border-black/[0.08]'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl" aria-hidden>{g.icon}</span>
                <div>
                  <h3 className={`text-[15px] font-bold mb-1.5 ${dark ? 'text-white' : 'text-[#151414]'}`}>
                    {g.title[isKo ? 'ko' : 'en']}
                  </h3>
                  <p className={`text-[13px] leading-relaxed ${dark ? 'text-gray-500' : 'text-[#3a3836]'}`}>
                    {g.desc[isKo ? 'ko' : 'en']}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // compact — one row strip near CTAs
  return (
    <aside
      aria-label={isKo ? '약속' : 'Our guarantees'}
      className={`rounded-2xl border px-6 py-5 ${
        dark ? 'bg-[#0e0e0e] border-white/[0.07]' : 'bg-[#f7f2e9] border-black/[0.08]'
      }`}
    >
      <p className={`text-[11px] uppercase tracking-[0.22em] mb-3 ${dark ? 'text-gray-500' : 'text-[#8a8378]'}`}>
        {isKo ? '저희가 지키는 약속' : 'What we guarantee'}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2.5 m-0 p-0 list-none">
        {GUARANTEES.map((g) => (
          <li key={g.icon} className="flex items-center gap-2.5">
            <span aria-hidden className="text-base leading-none">{g.icon}</span>
            <span className={`text-[13px] font-medium leading-snug ${dark ? 'text-gray-300' : 'text-[#151414]'}`}>
              {g.title[isKo ? 'ko' : 'en']}
            </span>
          </li>
        ))}
      </ul>
      <p className={`mt-3 mb-0 text-[12px] ${dark ? 'text-gray-600' : 'text-[#8a8378]'}`}>
        {isKo ? (
          <>자세한 내용은 <Link href={`${prefix}/pricing`} className="underline underline-offset-2 hover:text-[#151414]">가격 페이지</Link>에서 확인하세요.</>
        ) : (
          <>Details on the <Link href={`${prefix}/pricing`} className="underline underline-offset-2 hover:text-[#151414]">pricing page</Link>.</>
        )}
      </p>
    </aside>
  )
}
