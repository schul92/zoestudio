import { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { SITE_URL } from '@/lib/siteUrl'

// ─────────────────────────────────────────────────────────────────────────────
// /kakao-checklist — free lead-magnet resource: the complete checklist for
// setting up a KakaoTalk account + business Channel from the US without a
// Korean phone number. Distilled from the two blog guides:
//   /blog/kakaotalk-account-without-korean-phone-2026
//   /blog/kakaotalk-channel-us-korean-business
// Indexable on purpose — it can rank on its own.
// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: 'en' | 'ko' = params.locale === 'ko' ? 'ko' : 'en'
  const baseUrl = SITE_URL
  const prefix = locale === 'ko' ? '/ko' : ''
  const url = `${baseUrl}${prefix}/kakao-checklist`

  const meta = {
    en: {
      title: 'KakaoTalk US Setup Checklist — Account + Business Channel (No Korean Phone) | ZOE LUMOS',
      description:
        'Free printable checklist: create a KakaoTalk account and business Channel from the US with only a US phone number. Every step, document, and setting — account, verification, Channel Manager, website integration.',
    },
    ko: {
      title: '카카오톡 미국 셋업 체크리스트 — 계정 + 비즈니스 채널 (한국 번호 없이) | ZOE LUMOS',
      description:
        '무료 체크리스트: 한국 번호 없이 미국 전화번호만으로 카카오톡 계정과 비즈니스 채널을 만드는 전 과정. 준비물, 계정 인증, 채널 관리자, 웹사이트 연동까지 단계별 정리.',
    },
  }[locale]

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${baseUrl}/kakao-checklist`,
        en: `${baseUrl}/kakao-checklist`,
        ko: `${baseUrl}/ko/kakao-checklist`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'article',
    },
    robots: { index: true, follow: true },
  }
}

type ChecklistSection = {
  title: { en: string; ko: string }
  intro?: { en: string; ko: string }
  items: Array<{ en: string; ko: string }>
}

const SECTIONS: ChecklistSection[] = [
  {
    title: { en: '0. Before you start — what you need', ko: '0. 시작 전 준비물' },
    items: [
      {
        en: 'A real US mobile number that receives SMS (physical SIM or eSIM — Google Voice / TextNow / VoIP numbers are often rejected)',
        ko: 'SMS를 받을 수 있는 실제 미국 휴대폰 번호 (실물 SIM 또는 eSIM — Google Voice·TextNow 등 인터넷 번호는 거부되는 경우 많음)',
      },
      {
        en: 'An email address you control (used as backup verification and account recovery)',
        ko: '본인이 관리하는 이메일 주소 (보조 인증·계정 복구용)',
      },
      {
        en: 'KakaoTalk app installed from the App Store or Google Play',
        ko: '앱스토어 또는 구글플레이에서 카카오톡 앱 설치',
      },
      {
        en: 'For a business Channel: US business registration docs — LLC certificate (or sole-proprietor trade name), EIN letter, business address proof',
        ko: '비즈니스 채널용: 미국 사업자 서류 — LLC 설립 증명서(또는 개인사업자 상호), EIN 안내문, 사업장 주소 증빙',
      },
      {
        en: 'For a business Channel: a square logo/profile image and a short Korean + English greeting text',
        ko: '비즈니스 채널용: 정사각형 로고/프로필 이미지, 짧은 한·영 환영 인사말 문구',
      },
    ],
  },
  {
    title: { en: '1. Create (or re-verify) your personal account', ko: '1. 개인 계정 만들기 (또는 재인증)' },
    intro: {
      en: 'A personal Kakao account is the foundation — the Channel is created on top of it.',
      ko: '개인 카카오 계정이 기본입니다 — 채널은 그 위에 만들어집니다.',
    },
    items: [
      { en: 'Open KakaoTalk → tap New Account / Sign Up, and allow notification + SMS permissions', ko: '카카오톡 실행 → 새 계정/가입하기 선택, 알림·문자 권한 허용' },
      { en: 'Change the country selector from Korea (+82) to United States (+1) — the #1 missed step', ko: '국가 코드를 한국(+82)에서 미국(+1)으로 변경 — 가장 많이 놓치는 단계' },
      { en: 'Enter your 10-digit US number with no spaces, dashes, or leading zero (e.g. 2135550147)', ko: '공백·하이픈·앞자리 0 없이 미국 번호 10자리 입력 (예: 2135550147)' },
      { en: 'Enter the 4–6 digit SMS code before it expires (wait the full 60s before tapping resend)', ko: '문자로 온 4–6자리 인증번호를 만료 전에 입력 (재전송은 60초 꽉 채운 뒤 한 번만)' },
      { en: 'Set password, display name, and profile photo', ko: '비밀번호·표시 이름·프로필 사진 설정' },
      { en: 'Register an email (or KakaoMail) as backup verification — your lifeline if you change numbers', ko: '이메일(또는 카카오메일)을 보조 인증으로 등록 — 번호가 바뀌어도 계정을 지키는 안전장치' },
      { en: 'Already have a Korean account? Do NOT sign up again — back up chats first, then Settings → Account → Change Phone Number and re-verify with +1', ko: '한국 계정이 이미 있다면 새로 가입 금지 — 대화 백업 먼저, 그 다음 설정 → 계정 → 전화번호 변경에서 +1 번호로 재인증' },
    ],
  },
  {
    title: { en: '2. If SMS verification fails', ko: '2. SMS 인증이 안 될 때' },
    items: [
      { en: 'Confirm +1 country code and no leading zero', ko: '+1 국가 코드와 앞자리 0 제거 재확인' },
      { en: 'Check carrier spam / blocked-message filters and whitelist short codes', ko: '통신사 스팸·수신 차단 필터 확인, 단축번호 발신 허용' },
      { en: 'Switch from VoIP/landline to a real cellular number', ko: 'VoIP·유선 번호 대신 실제 휴대폰 번호로 시도' },
      { en: '"Too many attempts"? Wait 30–60 minutes instead of hammering resend', ko: '"시도 횟수 초과"가 뜨면 재전송 연타 대신 30–60분 대기' },
      { en: 'Still stuck: use the email / KakaoMail verification path — it needs no SMS at all', ko: '그래도 안 되면 SMS가 전혀 필요 없는 이메일/카카오메일 인증으로 전환' },
      { en: '"Number already in use"? It is linked to your old account — re-verify that account instead of creating a new one', ko: '"이미 사용 중인 번호"라면 예전 계정에 연결된 것 — 새 계정 대신 기존 계정을 재인증' },
    ],
  },
  {
    title: { en: '3. Create your business Channel (~20 min)', ko: '3. 비즈니스 채널 만들기 (~20분)' },
    intro: {
      en: 'Free to create and operate. You only pay for paid broadcasts or ads.',
      ko: '생성·운영은 무료입니다. 비용은 유료 단체 메시지나 광고를 쓸 때만 발생합니다.',
    },
    items: [
      { en: 'On a desktop browser, go to center-pf.kakao.com and log in with the same Kakao account', ko: '데스크탑 브라우저에서 center-pf.kakao.com 접속, 같은 카카오 계정으로 로그인' },
      { en: 'Click 채널 만들기 (Create Channel) and choose the business profile type that matches your operation', ko: '채널 만들기 클릭, 운영 형태에 맞는 비즈니스 프로필 유형 선택' },
      { en: 'Enter your business name (Korean and/or English) and upload the profile image', ko: '비즈니스 이름(한글·영문) 입력, 프로필 이미지 업로드' },
      { en: 'Submit US business verification: LLC certificate / trade name, EIN letter, address proof (processes in 1–3 business days)', ko: '미국 사업자 인증 제출: LLC 증명서/상호, EIN 안내문, 주소 증빙 (영업일 1–3일 내 처리)' },
      { en: 'Set a Korean + English welcome greeting (shown to every new follower)', ko: '한·영 환영 인사말 설정 (새 친구 추가 시 자동 표시)' },
      { en: 'Configure business hours and an off-hours auto-reply', ko: '영업시간과 영업시간 외 자동 응답 설정' },
      { en: 'Generate your Channel URL and search ID (pf.kakao.com/_xxxxx) for sharing', ko: '공유용 채널 URL·검색 ID (pf.kakao.com/_xxxxx) 생성' },
    ],
  },
  {
    title: { en: '4. Connect the Channel to your website & operations', ko: '4. 웹사이트 연동 & 운영 체크' },
    items: [
      { en: 'Add a floating "Chat on KakaoTalk" button on every page (Kakao JS SDK, or a simple link to pf.kakao.com/_xxxxx/chat)', ko: '모든 페이지에 "카카오톡 상담" 플로팅 버튼 추가 (카카오 JS SDK 또는 pf.kakao.com/_xxxxx/chat 링크)' },
      { en: 'List the Channel on your contact page alongside email and address', ko: '연락처 페이지에 이메일·주소와 함께 채널 표기' },
      { en: 'Add the Kakao icon to your site footer next to Instagram/Facebook', ko: '사이트 푸터에 인스타그램·페이스북 옆 카카오 아이콘 추가' },
      { en: 'Prepare quick-reply templates for your 10 most common questions (hours, menu, parking, booking…)', ko: '자주 묻는 질문 10개에 대한 빠른 답장 템플릿 준비 (영업시간, 메뉴, 주차, 예약 등)' },
      { en: 'Assign who answers Channel chats during business hours (target: under 5-minute replies)', ko: '영업시간 중 채널 응답 담당자 지정 (목표: 5분 내 답장)' },
      { en: 'Broadcast cadence: 1–2 per week maximum — spam is the fastest way to lose followers', ko: '단체 메시지는 주 1–2회 이내 — 스팸은 친구를 잃는 가장 빠른 길' },
      { en: 'After each sale or visit, send a thank-you message with a direct Google-review link', ko: '거래·방문 후 감사 메시지와 구글 리뷰 직링크 발송 루틴 만들기' },
    ],
  },
]

export default function KakaoChecklistPage({ params }: { params: { locale: string } }) {
  const locale: 'en' | 'ko' = params.locale === 'ko' ? 'ko' : 'en'
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const baseUrl = SITE_URL

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: `${baseUrl}${prefix || ''}` },
      { '@type': 'ListItem', position: 2, name: isKo ? '카카오톡 셋업 체크리스트' : 'KakaoTalk Setup Checklist', item: `${baseUrl}${prefix}/kakao-checklist` },
    ],
  }

  const t = {
    eyebrow: isKo ? '무료 체크리스트' : 'Free checklist',
    title: isKo
      ? '카카오톡 미국 셋업 체크리스트'
      : 'The KakaoTalk US Setup Checklist',
    subtitle: isKo
      ? '한국 번호 없이, 미국 전화번호만으로 카카오톡 계정과 비즈니스 채널을 만드는 전 과정. 인쇄해서 하나씩 체크하며 따라 하세요.'
      : 'Everything needed to create a KakaoTalk account and business Channel from the US — no Korean phone number. Print it and check items off as you go.',
    directAnswer: isKo
      ? '2026년 현재 카카오톡 계정과 비즈니스 채널은 한국 번호 없이 미국 번호(+1)만으로 만들 수 있습니다. 개인 계정은 SMS 인증 약 10분, 비즈니스 채널은 center-pf.kakao.com에서 미국 사업자 서류(LLC·EIN)로 약 20분이면 완료됩니다. 아래 체크리스트가 준비물부터 웹사이트 연동까지 전 과정을 다룹니다.'
      : 'As of 2026, you can create both a KakaoTalk account and a business Channel using only a US (+1) phone number — no Korean number required. The personal account takes about 10 minutes via SMS verification; the business Channel takes about 20 minutes at center-pf.kakao.com using your US business documents (LLC, EIN). The checklist below covers the whole process, from prerequisites to website integration.',
    sourcesTitle: isKo ? '자세한 설명이 필요하면' : 'Need the full walkthrough?',
    sourceAccount: isKo
      ? '전화번호 없이 카카오톡 계정 만들기 (풀 가이드)'
      : 'KakaoTalk account without a Korean phone (full guide)',
    sourceChannel: isKo
      ? '미국에서 카카오톡 채널 20분 만에 만들기 (풀 가이드)'
      : 'Open a US KakaoTalk Channel in 20 minutes (full guide)',
    ctaTitle: isKo ? '연동까지 맡기고 싶으세요?' : 'Want the integration done for you?',
    ctaBody: isKo
      ? 'ZOE LUMOS는 미국 한인 비즈니스 웹사이트에 카카오톡 채널 버튼, 자동 응답, 예약 흐름까지 연동해 드립니다. 이메일 또는 카카오톡으로 무료 상담 — 한국어·영어 모두 가능합니다.'
      : 'ZOE LUMOS wires KakaoTalk Channels into Korean-American business websites — chat button, auto-replies, and booking flows included. Free consultation by email or KakaoTalk, in Korean or English.',
    ctaBtn: isKo ? '무료 상담 받기' : 'Get a free consultation',
    ctaKakao: isKo ? '카카오톡으로 문의' : 'Chat on KakaoTalk',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen bg-ivory text-ink">
        {/* Header band */}
        <section className="hair-bottom pt-40 md:pt-48 pb-14 md:pb-16">
          <div className="container-edge">
            <div className="max-w-3xl">
              <p className="overline text-gold mb-6">{t.eyebrow}</p>
              <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.02] tracking-luxury text-ink mb-6">
                {t.title}
              </h1>
              <p className="text-body-lg text-graphite leading-[1.7]">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Direct answer (GEO) */}
        <section className="py-12 md:py-16">
          <div className="container-edge">
            <div className="mx-auto max-w-[760px]">
              <p className="font-display italic font-light text-[clamp(1.2rem,1.8vw,1.45rem)] leading-[1.6] text-ink pl-6 border-l-2 border-gold mb-12">
                {t.directAnswer}
              </p>

              {/* Checklist sections */}
              <div className="space-y-12">
                {SECTIONS.map((section, si) => (
                  <div key={si}>
                    <h2 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.2] tracking-luxury text-ink mb-3">
                      {section.title[locale]}
                    </h2>
                    {section.intro && (
                      <p className="text-[15px] text-graphite leading-[1.7] mb-4">{section.intro[locale]}</p>
                    )}
                    <ul className="space-y-3 m-0 p-0 list-none">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-4 px-5 py-4 bg-bone rounded-[2px] hair-y">
                          <span
                            aria-hidden
                            className="mt-[3px] h-[18px] w-[18px] shrink-0 border border-ink/30 rounded-[2px] bg-ivory"
                          />
                          <span className="text-[15px] text-graphite leading-[1.7]">{item[locale]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Source guides */}
              <aside className="my-14 px-7 py-6 bg-bone rounded-[2px] hair-y">
                <p className="overline text-gold mb-4">{t.sourcesTitle}</p>
                <ul className="space-y-3 m-0 p-0 list-none">
                  <li>
                    <Link
                      href={`${prefix}/blog/kakaotalk-account-without-korean-phone-2026`}
                      className="text-[15px] text-ink underline decoration-gold/60 decoration-1 underline-offset-4 hover:text-gold transition-colors"
                    >
                      {t.sourceAccount} →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${prefix}/blog/kakaotalk-channel-us-korean-business`}
                      className="text-[15px] text-ink underline decoration-gold/60 decoration-1 underline-offset-4 hover:text-gold transition-colors"
                    >
                      {t.sourceChannel} →
                    </Link>
                  </li>
                </ul>
              </aside>

              {/* CTA */}
              <aside className="my-4 py-10 border-t border-b border-hairline text-center">
                <h2 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] tracking-luxury text-ink mb-3">
                  {t.ctaTitle}
                </h2>
                <p className="text-[15px] text-graphite leading-[1.7] mb-8 max-w-xl mx-auto">{t.ctaBody}</p>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                  <Link href={`${prefix}/contact`} className="btn-ink">
                    {t.ctaBtn}
                    <span className="arrow">→</span>
                  </Link>
                  <a
                    href="http://pf.kakao.com/_xhxdxmlX/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] text-ink border-b border-ink/30 hover:border-ink pb-1 transition-colors"
                  >
                    {t.ctaKakao}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
