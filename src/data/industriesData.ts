/**
 * Korean SMB vertical landing pages.
 * Each industry has English + Korean content keyed by slug.
 * Slugs are dual-keyed so Korean URLs can use hangul for native SEO.
 */

export type IndustryStat = { num: string; suf: string; label: { en: string; ko: string } }
export type IndustryProblem = { title: { en: string; ko: string }; body: { en: string; ko: string }; icon: IconId }
export type IndustryFeature = { title: { en: string; ko: string }; body: { en: string; ko: string } }
export type IndustryFAQ = { q: { en: string; ko: string }; a: { en: string; ko: string } }

export type IconId =
  | 'clock'
  | 'phone'
  | 'calendar'
  | 'search'
  | 'translate'
  | 'review'
  | 'cart'
  | 'location'
  | 'palette'
  | 'chat'
  | 'chart'
  | 'lock'
  | 'heart'
  | 'shield'
  | 'mobile'

export type Industry = {
  slug: { en: string; ko: string } // URL segment per locale
  name: { en: string; ko: string }
  eyebrow: { en: string; ko: string }
  headline: { en: [string, string]; ko: [string, string] }
  intro: { en: string; ko: string }
  image: string // hero image path
  accent: string // brand accent for hero halo
  stats: IndustryStat[]
  problems: IndustryProblem[]
  features: IndustryFeature[]
  caseStudy: {
    project: string
    quote: { en: string; ko: string }
    author: string
    role: { en: string; ko: string }
    image: string
  }
  faqs: IndustryFAQ[]
  cta: { en: string; ko: string }
  seo: {
    title: { en: string; ko: string }
    description: { en: string; ko: string }
  }
}

export const industries: Industry[] = [
  /* ─── Korean Restaurant ────────────────────────────────────────── */
  {
    slug: { en: 'korean-restaurant', ko: '한식당-웹사이트' },
    name: { en: 'Korean Restaurants', ko: '한식당' },
    eyebrow: { en: 'For Korean restaurants + cafés', ko: '한식당 · 카페를 위한' },
    headline: {
      en: ['Websites for Korean restaurants', 'that fill the room.'],
      ko: ['자리가 차는', '한식당 웹사이트.'],
    },
    intro: {
      en: 'Fort Lee, Flushing, LA Koreatown, Duluth — the Korean restaurant market is fierce and the website is the new shop window. We build menus, online ordering, reservations, and bilingual copy that makes Korean-American diners pick you over the place next door.',
      ko: '포트리 · 플러싱 · LA 코리아타운 · 둘루스 — 한식당 시장은 치열하고, 웹사이트는 이제 새로운 쇼윈도입니다. 한국어 · 영어 이중언어 메뉴, 온라인 주문, 예약, 카피. 옆집이 아닌 우리 매장을 고르게 만드는 웹사이트를 만듭니다.',
    },
    image: '/portfolio/kona-coffee.jpg',
    accent: '#E8D5A3',
    stats: [
      { num: '73', suf: '%', label: { en: 'of Korean restaurants in NJ have outdated sites', ko: '뉴저지 한식당 중 구식 사이트 비율' } },
      { num: '2.1', suf: '×', label: { en: 'average bookings lift after launch', ko: '런칭 후 평균 예약 증가' } },
      { num: '48', suf: 'h', label: { en: 'average launch window', ko: '평균 런칭 기간 (주)' } },
    ],
    problems: [
      {
        icon: 'phone',
        title: { en: 'Phone rings, reservations lost', ko: '전화는 울리지만 예약은 놓칩니다' },
        body: {
          en: 'Peak hours = missed calls = lost tables. Online reservations convert the missed calls into booked seats.',
          ko: '피크 시간대의 부재중 전화 = 놓친 테이블. 온라인 예약이 부재중 전화를 실제 좌석으로 바꿉니다.',
        },
      },
      {
        icon: 'translate',
        title: { en: 'English-only menus lose regulars', ko: '영문 전용 메뉴는 단골을 놓칩니다' },
        body: {
          en: 'Older Korean diners skip menus they can\'t read. Bilingual menus with photos invite everyone back.',
          ko: '한국어를 선호하는 손님은 영문 전용 메뉴를 건너뜁니다. 사진 포함 이중언어 메뉴가 모두를 다시 모시게 합니다.',
        },
      },
      {
        icon: 'search',
        title: { en: 'Invisible on Google Maps', ko: '구글 지도에서 보이지 않음' },
        body: {
          en: 'Local SEO for "Korean BBQ near me" and "한식당 포트리" drives 60%+ of new walk-ins. Most sites don\'t rank.',
          ko: '"Korean BBQ near me", "한식당 포트리" 같은 로컬 검색이 신규 방문 60% 이상을 만듭니다. 대부분 사이트는 잡히지 않습니다.',
        },
      },
      {
        icon: 'mobile',
        title: { en: 'Phone-size menus that hurt to read', ko: '모바일에서 읽기 힘든 메뉴' },
        body: {
          en: '80% of diners look at the menu on their phone. If the PDF menu pinches-and-zooms, they leave.',
          ko: '80%의 손님이 휴대폰으로 메뉴를 봅니다. PDF 메뉴를 확대/축소해야 한다면, 떠납니다.',
        },
      },
    ],
    features: [
      { title: { en: 'Bilingual digital menu with photos', ko: '사진 포함 이중언어 디지털 메뉴' }, body: { en: 'Instant menu edits in Korean or English. Update today\'s specials from your phone during lunch.', ko: '한국어 · 영어로 즉시 메뉴 수정. 점심 시간에 휴대폰으로 오늘의 특선까지 변경.' } },
      { title: { en: 'Online reservations + table management', ko: '온라인 예약 · 테이블 관리' }, body: { en: 'Accept bookings 24/7. SMS + KakaoTalk confirmations. Party size, seating preference, special requests — all captured.', ko: '24/7 예약 접수. SMS · 카카오톡 확인 메시지. 인원수, 좌석 선호, 특별 요청까지 모두 기록.' } },
      { title: { en: 'Online ordering + delivery', ko: '온라인 주문 · 배달' }, body: { en: 'Accept pickup + delivery with Stripe. No third-party commission. Integrates with Toast, Square, or your POS.', ko: 'Stripe로 픽업 · 배달 주문 접수. 서드파티 수수료 없음. Toast · Square · 기존 POS와 연동.' } },
      { title: { en: 'Google Maps + Naver optimization', ko: '구글 지도 · 네이버 최적화' }, body: { en: 'Structured data for menus + dishes, local SEO for every Korean-dense neighborhood, Naver Place sync for Korean tourists.', ko: '메뉴 · 요리 구조화 데이터, 한인 밀집 지역별 로컬 SEO, 한국 관광객을 위한 네이버 플레이스 동기화.' } },
      { title: { en: 'Yelp + Google review integration', ko: 'Yelp · 구글 리뷰 연동' }, body: { en: 'Auto-pull 5-star reviews onto your homepage. Request-review flow after every online order.', ko: '5점 리뷰를 홈페이지에 자동 노출. 모든 온라인 주문 후 리뷰 요청 플로우 실행.' } },
      { title: { en: 'KakaoTalk + SMS marketing', ko: '카카오톡 · SMS 마케팅' }, body: { en: 'Broadcast to your regulars in Korean or English. Birthday discounts, closure days, new menu drops.', ko: '단골에게 한국어 · 영어 브로드캐스트. 생일 할인, 휴무일 공지, 신메뉴 공개.' } },
    ],
    caseStudy: {
      project: 'Kona Coffee Donut',
      quote: {
        en: "Bookings doubled in two months. We stopped worrying about the website and got back to running the café.",
        ko: '2개월 만에 예약이 두 배. 이제 웹사이트 걱정 없이 카페에만 집중합니다.',
      },
      author: 'Min Lee',
      role: { en: 'Co-founder, Honolulu café', ko: '공동대표, 호놀룰루 카페' },
      image: '/portfolio/kona-coffee.jpg',
    },
    faqs: [
      {
        q: { en: 'How much does a Korean restaurant website cost?', ko: '한식당 웹사이트 제작 비용은 얼마인가요?' },
        a: {
          en: 'Most Korean restaurant sites we build land between $5,000 and $10,000 including bilingual menus, reservations, and Google Maps optimization. Full online ordering + delivery adds $2,000 — $4,000.',
          ko: '이중언어 메뉴, 예약, 구글 지도 최적화 포함 일반적으로 $5,000 — $10,000 선입니다. 온라인 주문 · 배달 추가 시 $2,000 — $4,000 추가.',
        },
      },
      {
        q: { en: 'Can you translate our existing Korean menu?', ko: '기존 한국어 메뉴를 번역해 주실 수 있나요?' },
        a: {
          en: 'Yes — our team writes both English and Korean copy natively. We don\'t machine-translate. Every dish name is reviewed for cultural context and American diner expectations.',
          ko: '네 — 저희 팀이 한국어 · 영어 모두 원어민 수준으로 작성합니다. 기계 번역 사용 안 함. 모든 메뉴명은 문화적 맥락과 미국 손님의 기대치를 고려해 검토됩니다.',
        },
      },
      {
        q: { en: 'Do you integrate with Toast or Square POS?', ko: 'Toast 또는 Square POS와 연동되나요?' },
        a: {
          en: 'Yes. Online orders flow directly into Toast, Square, Clover, or your preferred POS so your kitchen workflow stays exactly the same.',
          ko: '네. 온라인 주문이 Toast · Square · Clover · 기존 POS로 바로 들어가 주방 워크플로우는 그대로 유지됩니다.',
        },
      },
      {
        q: { en: 'How long does it take to launch?', ko: '런칭까지 얼마나 걸리나요?' },
        a: {
          en: 'Four to six weeks from kickoff for the full build including bilingual copy, menu photography direction, Google Business setup, and online ordering configuration.',
          ko: '이중언어 카피, 메뉴 사진 디렉션, 구글 비즈니스 셋업, 온라인 주문 설정 포함 약 4 — 6주 소요.',
        },
      },
    ],
    cta: {
      en: 'Ready to fill your restaurant every night?',
      ko: '매일 저녁 자리를 채울 준비가 되셨나요?',
    },
    seo: {
      title: {
        en: 'Korean Restaurant Website Design — Bilingual Menus, Online Ordering, Local SEO | Zoe Lumos',
        ko: '한식당 웹사이트 제작 — 이중언어 메뉴 · 온라인 주문 · 로컬 SEO | ZOE LUMOS',
      },
      description: {
        en: 'Bilingual websites, online ordering, and reservations for Korean restaurants across Fort Lee, Flushing, LA Koreatown, and the US. $5k — $10k · 4–6 week launch.',
        ko: '포트리 · 플러싱 · LA 코리아타운 등 미국 한식당을 위한 이중언어 웹사이트, 온라인 주문, 예약 시스템. $5,000 — $10,000 · 4–6주 런칭.',
      },
    },
  },

  /* ─── Korean Beauty Salon ──────────────────────────────────────── */
  {
    slug: { en: 'korean-beauty-salon', ko: '한인-뷰티샵-웹사이트' },
    name: { en: 'Korean Beauty + Hair Salons', ko: '한인 뷰티샵 · 헤어샵' },
    eyebrow: { en: 'For Korean nail, hair + beauty studios', ko: '한인 네일 · 헤어 · 뷰티 스튜디오를 위한' },
    headline: {
      en: ['Websites for Korean beauty studios', 'that book themselves.'],
      ko: ['스스로 예약이 차는', '한인 뷰티샵 웹사이트.'],
    },
    intro: {
      en: 'Korean nail art, hair salons, med-spas, and brow studios are winning the American beauty market — because the craft is better. We build booking-first websites that turn Instagram scrollers into scheduled clients and Yelp searchers into regulars.',
      ko: '한인 네일 아트, 헤어샵, 메드스파, 눈썹 스튜디오가 미국 뷰티 시장을 이기고 있습니다 — 기술이 더 좋기 때문입니다. 인스타그램 스크롤러를 예약 고객으로, Yelp 검색자를 단골로 바꾸는 예약 우선 웹사이트를 만듭니다.',
    },
    image: '/portfolio/salt-polish.jpg',
    accent: '#F0DCC4',
    stats: [
      { num: '60', suf: '%', label: { en: 'of first bookings happen after 8pm', ko: '첫 예약의 60%가 오후 8시 이후 발생' } },
      { num: '3.4', suf: '×', label: { en: 'review volume vs. phone-only shops', ko: '전화만 받는 매장 대비 리뷰 수' } },
      { num: '72', suf: 'h', label: { en: 'average advance booking lead', ko: '평균 예약 선행 시간' } },
    ],
    problems: [
      {
        icon: 'clock',
        title: { en: "You close, the phone doesn't", ko: '매장은 닫혀도, 예약 문의는 안 멈춰요' },
        body: { en: 'Two-thirds of beauty bookings happen outside business hours. Without online booking, those clients go to the next salon.', ko: '뷰티 예약의 2/3가 영업시간 외에 발생합니다. 온라인 예약이 없다면, 그 손님은 다른 샵으로 갑니다.' },
      },
      {
        icon: 'palette',
        title: { en: 'Instagram lookbooks ≠ conversion', ko: '인스타 룩북 ≠ 실제 예약' },
        body: { en: 'A beautiful Instagram gets attention. A website with the same aesthetic, real prices, and a "book now" button captures it.', ko: '아름다운 인스타는 주목받지만, 같은 감성에 실제 가격 · 예약 버튼이 있는 웹사이트가 실제 예약으로 이어집니다.' },
      },
      {
        icon: 'review',
        title: { en: 'Yelp + Google reviews dying in silence', ko: 'Yelp · 구글 리뷰가 조용히 죽어가요' },
        body: { en: 'Happy clients don\'t remember to review. The site triggers a review ask at the right moment — after a good experience, not during.', ko: '만족한 고객은 리뷰를 남기는 걸 잊습니다. 웹사이트가 적절한 순간 — 좋은 경험 직후 — 리뷰 요청을 자동으로 트리거합니다.' },
      },
      {
        icon: 'translate',
        title: { en: 'Korean-only clients need Korean-first UX', ko: '한국어 선호 고객에겐 한국어 우선 UX가 필요합니다' },
        body: { en: 'Many Korean-American clients prefer a Korean-language booking flow. Bilingual sites speak to 40% more of the local Korean market.', ko: '많은 한인 고객이 한국어 예약 플로우를 선호합니다. 이중언어 사이트는 현지 한인 시장의 40% 더 많은 고객과 소통합니다.' },
      },
    ],
    features: [
      { title: { en: '24/7 online booking', ko: '24/7 온라인 예약' }, body: { en: 'Square Appointments, Vagaro, or custom. Service duration, add-ons, and staff preference — all captured at booking.', ko: 'Square Appointments · Vagaro · 맞춤 시스템. 서비스 시간, 추가 옵션, 선호 스태프까지 예약 시 모두 기록.' } },
      { title: { en: 'Service × price grid', ko: '서비스 · 가격 그리드' }, body: { en: 'Crystal-clear pricing. Clients stop calling to ask what a fill costs.', ko: '명확한 가격표. 필 비용을 묻는 전화가 사라집니다.' } },
      { title: { en: 'Instagram gallery sync', ko: '인스타그램 갤러리 동기화' }, body: { en: 'Your IG grid auto-syncs to a curated homepage gallery. No manual uploads.', ko: '인스타 그리드가 홈페이지 갤러리로 자동 동기화. 수동 업로드 불필요.' } },
      { title: { en: 'Automated review requests', ko: '자동 리뷰 요청' }, body: { en: 'Send Google + Yelp review requests by SMS or email at the optimal post-service moment.', ko: '서비스 완료 후 최적의 순간에 SMS · 이메일로 구글 · Yelp 리뷰 요청 자동 발송.' } },
      { title: { en: 'Staff profiles + personal booking links', ko: '스태프 프로필 · 개인 예약 링크' }, body: { en: 'Each stylist gets a shareable link for their regulars. Rebooking in one tap.', ko: '각 스타일리스트마다 단골용 공유 링크. 원탭 재예약.' } },
      { title: { en: 'Gift cards + packages', ko: '기프트카드 · 패키지' }, body: { en: 'Sell multi-visit packages and gift cards directly. Most salons see 15% revenue lift from packages alone.', ko: '다회권 · 기프트카드 직접 판매. 대부분 매장이 패키지만으로 15% 매출 상승.' } },
    ],
    caseStudy: {
      project: 'Salt & Polish',
      quote: {
        en: 'They understood what our business actually looks like on the ground — not just what the brief said. The site feels like us, and it ranks.',
        ko: '브리프가 아니라 실제 우리 매장을 이해해 주셨어요. 사이트가 우리답고, 구글에서도 잘 잡힙니다.',
      },
      author: 'Sarah K.',
      role: { en: 'Owner, Fort Lee spa', ko: '대표, 포트리 스파' },
      image: '/portfolio/salt-polish.jpg',
    },
    faqs: [
      {
        q: { en: 'How much does a salon website cost?', ko: '뷰티샵 웹사이트 제작 비용은 얼마인가요?' },
        a: { en: 'Most beauty studios land between $5,000 and $9,000 including booking system, Instagram integration, and local SEO. Review-automation flows add ~$1,000.', ko: '예약 시스템 · 인스타 연동 · 로컬 SEO 포함 $5,000 — $9,000. 리뷰 자동화 플로우 추가 시 $1,000 상당.' },
      },
      {
        q: { en: 'Which booking system do you recommend?', ko: '어떤 예약 시스템을 추천하시나요?' },
        a: { en: 'Square Appointments is our default for small teams; Vagaro for salons with 5+ staff; custom Next.js booking when you need full control. We decide together during discovery.', ko: '5인 미만은 Square Appointments가 기본, 5인 이상은 Vagaro, 완전한 커스터마이징이 필요하면 맞춤 Next.js. 디스커버리 단계에서 함께 결정.' },
      },
      {
        q: { en: 'Can you sync our Instagram feed automatically?', ko: '인스타그램 피드가 자동 동기화되나요?' },
        a: { en: 'Yes. Your latest 12 — 24 Instagram posts auto-populate a homepage gallery section, refreshed daily. No manual re-uploading.', ko: '네. 최근 12 — 24개 인스타 포스트가 홈페이지 갤러리에 자동 반영, 매일 갱신. 수동 업로드 불필요.' },
      },
      {
        q: { en: 'Do you work with nail, hair, and brow studios equally?', ko: '네일 · 헤어 · 눈썹 모두 경험 있으신가요?' },
        a: { en: 'Yes — we have launched sites for Korean nail studios in Fort Lee, hair salons in Palisades Park, and brow/lash studios in Manhattan. Each vertical has its own booking nuances we handle.', ko: '네 — 포트리 네일 스튜디오, 팰팍 헤어샵, 맨하탄 눈썹/속눈썹 스튜디오 사이트 런칭 경험 보유. 각 업종별 예약 뉴앙스를 모두 다룹니다.' },
      },
    ],
    cta: { en: 'Ready for a booking calendar that fills itself?', ko: '스스로 채워지는 예약 캘린더를 준비하셨나요?' },
    seo: {
      title: {
        en: 'Korean Beauty Salon Website Design — Online Booking, Instagram Sync, Reviews | Zoe Lumos',
        ko: '한인 뷰티샵 · 헤어샵 웹사이트 제작 — 온라인 예약 · 인스타 연동 · 리뷰 자동화 | ZOE LUMOS',
      },
      description: {
        en: 'Online booking websites for Korean nail, hair, and beauty studios. Instagram sync, review automation, bilingual UX. $5k — $9k · 4 week launch.',
        ko: '한인 네일 · 헤어 · 뷰티 스튜디오를 위한 온라인 예약 웹사이트. 인스타 연동, 리뷰 자동화, 이중언어 UX. $5,000 — $9,000 · 4주 런칭.',
      },
    },
  },

  /* ─── Korean Church ───────────────────────────────────────────── */
  {
    slug: { en: 'korean-church', ko: '한인-교회-홈페이지' },
    name: { en: 'Korean Churches', ko: '한인 교회' },
    eyebrow: { en: 'For Korean-American congregations', ko: '한인 교회 · 성도를 위한' },
    headline: {
      en: ['Church websites for the', 'next generation.'],
      ko: ['다음 세대를 위한', '교회 홈페이지.'],
    },
    intro: {
      en: 'Korean churches face a bilingual audience — first-generation elders and English-service youth — on one website. We design church sites that honor Korean ministry tradition while speaking to 2nd- and 3rd-gen Korean-Americans in the voice they live in.',
      ko: '한인 교회는 한 웹사이트 안에서 1세대 어르신과 영어 예배 청년 양쪽 모두와 소통해야 합니다. 한인 목회의 전통을 존중하면서도 2세 · 3세 한인 청년들의 언어로 말하는 교회 사이트를 만듭니다.',
    },
    image: '/blog/korean-church-website-guide.png',
    accent: '#DCCAA8',
    stats: [
      { num: '68', suf: '%', label: { en: 'of new visitors check the website first', ko: '신규 방문자의 68%가 먼저 사이트 확인' } },
      { num: '40', suf: '%', label: { en: 'of Gen-Z attend via English service', ko: 'Gen-Z의 40%는 영어 예배 참석' } },
      { num: '24', suf: '/7', label: { en: 'sermon archive access', ko: '설교 아카이브 상시 접근' } },
    ],
    problems: [
      { icon: 'translate', title: { en: 'One church, two languages', ko: '한 교회, 두 언어' }, body: { en: 'Korean-service worship schedules, English-service youth groups, family events that span both. One site has to serve all three.', ko: '한국어 예배 일정, 영어 예배 청년부, 모두가 모이는 가족 행사. 하나의 사이트가 세 가지 모두를 담아야 합니다.' } },
      { icon: 'calendar', title: { en: 'Event calendars that actually update', ko: '실제로 업데이트되는 행사 캘린더' }, body: { en: 'Weekly sermons, small groups, retreats, fellowship meals. A calendar staff can update from their phone in Korean or English.', ko: '주일 설교, 소그룹, 수양회, 친교 식사. 스태프가 휴대폰에서 한국어 · 영어로 업데이트하는 캘린더.' } },
      { icon: 'heart', title: { en: 'New-comers scared to walk in', ko: '첫 방문이 두려운 새가족' }, body: { en: 'A good website tells a new family what to expect: where to park, what to wear, where kids go. Removes the first-visit friction.', ko: '좋은 웹사이트는 새가족에게 무엇을 기대할지 알려줍니다: 주차 위치, 복장, 어린이부 위치. 첫 방문의 부담을 없앱니다.' } },
      { icon: 'mobile', title: { en: 'Sermon archives locked in a YouTube playlist', ko: '유튜브 재생목록에 갇힌 설교 아카이브' }, body: { en: 'A searchable, category-tagged sermon library keeps visitors engaged all week — and gets indexed by Google for seekers.', ko: '검색 가능하고 카테고리 태그된 설교 라이브러리가 성도를 한 주 내내 연결합니다 — 구글에 인덱싱되어 영적 검색자에게도 닿습니다.' } },
    ],
    features: [
      { title: { en: 'Bilingual service schedule', ko: '이중언어 예배 일정' }, body: { en: 'Korean 1부 / 2부 / English Service / Youth Service laid out clearly in both languages.', ko: '1부 · 2부 · English Service · 청년부 예배를 두 언어로 명확하게 안내.' } },
      { title: { en: 'Sermon archive with search', ko: '검색 가능한 설교 아카이브' }, body: { en: 'Videos or audio, tagged by series, book of the Bible, and speaker. Searchable in Korean and English.', ko: '비디오 · 오디오, 시리즈 · 성경 · 설교자별 태그. 한국어 · 영어 모두 검색 가능.' } },
      { title: { en: 'Online giving with envelopes', ko: '온라인 헌금 · 봉투' }, body: { en: 'Tithing, missions, building fund, general — all with the same envelope categories your elders recognize.', ko: '십일조, 선교헌금, 건축헌금, 감사헌금 — 어르신들이 아시는 헌금 항목 그대로 온라인 지원.' } },
      { title: { en: 'New-family welcome flow', ko: '새가족 환영 플로우' }, body: { en: 'First-visit info, parking, kids\' ministry, a simple "we\'ll look for you" form.', ko: '첫 방문 안내, 주차, 어린이부, "우리가 먼저 찾아뵙겠습니다" 간단 양식.' } },
      { title: { en: 'Prayer request + counseling form', ko: '기도 제목 · 상담 신청' }, body: { en: 'Private submission routed directly to pastors, never stored publicly.', ko: '공개되지 않고 목회자에게 직접 전달되는 비공개 양식.' } },
      { title: { en: 'Events + small group directory', ko: '행사 · 소그룹 디렉토리' }, body: { en: 'Members find groups by age, day, location. Leaders update their group from their phone.', ko: '성도가 연령 · 요일 · 위치별로 소그룹 탐색. 리더는 휴대폰에서 본인 그룹 업데이트.' } },
    ],
    caseStudy: {
      project: 'Regional Korean Church',
      quote: { en: 'Our new family registrations doubled in the first quarter after launch. The elders can read it, the kids can share it.', ko: '런칭 후 첫 분기에 새가족 등록이 두 배가 되었습니다. 어르신은 읽을 수 있고, 청년들은 공유할 수 있습니다.' },
      author: '담임목사',
      role: { en: 'Senior Pastor, NJ church', ko: '담임목사, NJ 교회' },
      image: '/blog/korean-church-website-guide.png',
    },
    faqs: [
      { q: { en: 'How much does a church website cost?', ko: '교회 홈페이지 제작 비용은 얼마인가요?' }, a: { en: 'Most Korean church builds fall between $6,000 and $12,000 including bilingual copy, sermon archive setup, online giving, and new-family flow.', ko: '이중언어 카피 · 설교 아카이브 · 온라인 헌금 · 새가족 플로우 포함 $6,000 — $12,000 선.' } },
      { q: { en: 'Do you handle 501(c)(3) tax-deductible giving receipts?', ko: '501(c)(3) 세금 공제 헌금 영수증도 처리되나요?' }, a: { en: 'Yes. We configure Stripe or Tithely so members receive automatic year-end giving statements.', ko: '네. Stripe · Tithely 설정으로 성도들에게 연말 헌금 증명서 자동 발송.' } },
      { q: { en: 'Can our elders update it?', ko: '어르신들도 직접 수정하실 수 있나요?' }, a: { en: 'Yes — we build in a Korean-language CMS interface so Korean-speaking staff update bulletins, sermons, and events without IT help.', ko: '네 — 한국어 CMS 인터페이스로 한국어 사용 스태프가 IT 도움 없이 주보 · 설교 · 행사 업데이트.' } },
      { q: { en: 'Can we embed our YouTube live service?', ko: '유튜브 라이브 예배를 임베드할 수 있나요?' }, a: { en: 'Yes. The homepage auto-switches to live mode when your YouTube stream goes live, then reverts to the archive after.', ko: '네. 유튜브 스트림이 시작되면 홈페이지가 자동으로 라이브 모드로 전환, 종료 후 자동 아카이브 복귀.' } },
    ],
    cta: { en: 'Ready for a website your whole congregation uses?', ko: '온 성도가 사용하는 홈페이지를 준비하셨나요?' },
    seo: {
      title: {
        en: 'Korean Church Website Design — Bilingual, Sermon Archive, Online Giving | Zoe Lumos',
        ko: '한인 교회 홈페이지 제작 — 이중언어 · 설교 아카이브 · 온라인 헌금 | ZOE LUMOS',
      },
      description: {
        en: 'Websites for Korean-American churches. Bilingual service schedules, searchable sermon archive, online giving, new-family flow. $6k — $12k.',
        ko: '한인 교회를 위한 홈페이지 제작. 이중언어 예배 안내, 검색 가능한 설교 아카이브, 온라인 헌금, 새가족 플로우. $6,000 — $12,000.',
      },
    },
  },

  /* ─── Korean Academy / Hagwon ─────────────────────────────────── */
  {
    slug: { en: 'korean-academy', ko: '한인-학원-웹사이트' },
    name: { en: 'Korean Academies + Hagwons', ko: '한인 학원 · 학습센터' },
    eyebrow: { en: 'For SAT, tutoring + K-12 hagwons', ko: 'SAT · 튜터링 · K-12 학원을 위한' },
    headline: {
      en: ['Websites that get', 'parents to enroll.'],
      ko: ['학부모가', '등록하게 만드는 웹사이트.'],
    },
    intro: {
      en: 'Korean parents research academies meticulously — tutor credentials, past SAT scores, Ivy League placements, schedule flexibility. The website is where the decision gets made. We build academy sites that answer every question a parent has before the phone call.',
      ko: '한인 학부모는 학원을 꼼꼼히 조사합니다 — 강사 이력, 과거 SAT 점수, 아이비리그 입학 실적, 스케줄 유연성. 결정은 웹사이트에서 일어납니다. 전화 걸기 전 학부모가 궁금한 모든 것에 답하는 학원 사이트를 만듭니다.',
    },
    image: '/blog/korean-tutoring-sat-prep-website.png',
    accent: '#E4D8C4',
    stats: [
      { num: '89', suf: '%', label: { en: 'of Korean parents research online first', ko: '한인 학부모의 89%가 온라인 선조사' } },
      { num: '5.1', suf: '×', label: { en: 'tour requests after launch', ko: '런칭 후 상담 요청 배수' } },
      { num: '11', suf: 'mo', label: { en: 'peak enrollment planning window', ko: '피크 등록 시즌 계획 기간' } },
    ],
    problems: [
      { icon: 'search', title: { en: 'Invisible in "SAT tutor near me"', ko: '"SAT 튜터 근처" 검색에 안 잡힘' }, body: { en: 'Korean parents search in English AND Korean. Most academy sites only rank for one.', ko: '한인 학부모는 영어와 한국어 두 언어로 검색합니다. 대부분 학원 사이트는 한 언어로만 잡힙니다.' } },
      { icon: 'chart', title: { en: 'No proof = no trust', ko: '증거 없음 = 신뢰 없음' }, body: { en: 'Past SAT score charts, college acceptance lists, student testimonials. Parents need hard data to commit.', ko: '과거 SAT 성적 차트, 합격 대학 리스트, 학생 후기. 학부모는 구체적인 데이터로 결정합니다.' } },
      { icon: 'calendar', title: { en: 'Schedule confusion kills enrollment', ko: '스케줄 혼란이 등록을 막습니다' }, body: { en: 'Summer intensives, school-year sessions, mock tests — each has its own calendar. A site has to make it easy.', ko: '여름 특강 · 학기 수업 · 모의고사 — 각각 다른 일정. 사이트가 쉽게 정리해야 합니다.' } },
      { icon: 'chat', title: { en: 'Parents want to text, not fill forms', ko: '학부모는 양식 작성보다 문자로 연락합니다' }, body: { en: 'A one-tap SMS or KakaoTalk link beats a contact form. Korean parents close the form, pick up the phone.', ko: '원탭 SMS · 카카오톡 링크가 양식보다 낫습니다. 한인 학부모는 양식을 닫고 전화를 듭니다.' } },
    ],
    features: [
      { title: { en: 'SAT/ACT score + college placement tables', ko: 'SAT · ACT 점수 · 대학 합격 표' }, body: { en: 'Year-by-year charts, anonymized student cases, Ivy/Top-30 acceptance counts. Built as structured data Google can surface.', ko: '연도별 차트, 익명 학생 케이스, 아이비 · Top 30 합격 수. 구글이 노출할 수 있는 구조화 데이터로 구축.' } },
      { title: { en: 'Bilingual instructor profiles', ko: '이중언어 강사 프로필' }, body: { en: 'Each instructor gets a page with credentials, specialties, and personal note — in Korean and English.', ko: '각 강사마다 이력 · 전문 분야 · 인사말이 담긴 페이지. 한국어 · 영어 모두 제공.' } },
      { title: { en: 'Seasonal program calendar', ko: '시즌별 프로그램 캘린더' }, body: { en: 'Summer intensive, fall SAT prep, winter mock tests. Dates, class sizes, open seats in real time.', ko: '여름 특강, 가을 SAT 대비, 겨울 모의고사. 날짜 · 정원 · 잔여석 실시간 반영.' } },
      { title: { en: 'KakaoTalk + SMS inquiry buttons', ko: '카카오톡 · SMS 문의 버튼' }, body: { en: 'Sticky button always present: "카카오톡으로 문의" / "Text us". Parents prefer text over forms 3:1.', ko: '"카카오톡으로 문의" / "Text us" 상시 버튼. 학부모는 양식보다 문자를 3:1로 선호.' } },
      { title: { en: 'Parent portal for grades + attendance', ko: '학부모 포털 · 성적 · 출결' }, body: { en: 'Secure login for parents to view their child\'s progress, attendance, and mock test scores.', ko: '자녀의 학습 진도, 출결, 모의고사 점수를 확인하는 학부모 전용 보안 로그인.' } },
      { title: { en: 'Free assessment + trial class booking', ko: '무료 레벨 테스트 · 체험 수업 예약' }, body: { en: 'Zero-friction trial flow converts 2 — 3× more than "call to schedule" buttons.', ko: '마찰 없는 체험 플로우가 "전화 예약" 버튼 대비 2 — 3배 더 많이 전환.' } },
    ],
    caseStudy: {
      project: 'SAT prep hagwon (Bergen County)',
      quote: { en: 'Summer intensive enrollment filled two weeks earlier than last year. Parents told us they found us on Google before they even called.', ko: '여름 특강 등록이 작년보다 2주 일찍 마감되었습니다. 학부모님들이 전화 전에 구글에서 저희를 찾으셨다고 하셨어요.', },
      author: '원장',
      role: { en: 'Director, Bergen County academy', ko: '원장, 버겐카운티 학원' },
      image: '/blog/korean-tutoring-sat-prep-website.png',
    },
    faqs: [
      { q: { en: 'How much does an academy website cost?', ko: '학원 웹사이트 제작 비용은 얼마인가요?' }, a: { en: '$7,000 — $14,000 depending on program calendar complexity and whether you need a parent portal. Most SAT-prep hagwons land around $9,000.', ko: '프로그램 캘린더 복잡도와 학부모 포털 유무에 따라 $7,000 — $14,000. 대부분 SAT 학원은 $9,000 선.' } },
      { q: { en: 'Can we show real score improvements without breaking FERPA?', ko: 'FERPA를 지키면서 실제 점수 향상을 보여줄 수 있나요?' }, a: { en: 'Yes. We show anonymized before/after score ranges ("Our top 10 students averaged +230 on SAT") which is fully compliant and more convincing to parents.', ko: '네. 익명화된 전후 점수 범위 표시 ("저희 상위 10명 학생 평균 SAT +230점") — FERPA 준수 + 학부모 설득력 향상.' } },
      { q: { en: 'Do you integrate with KakaoTalk?', ko: '카카오톡과 연동되나요?' }, a: { en: 'Yes. Sticky KakaoTalk channel button on mobile, auto-opens KakaoTalk with a pre-filled inquiry. Critical for Korean parents.', ko: '네. 모바일에 카카오톡 채널 상시 버튼, 미리 작성된 문의 내용으로 카카오톡 자동 실행. 한인 학부모에게 필수.' } },
      { q: { en: 'Can parents see their child\'s progress?', ko: '학부모가 자녀 진도를 확인할 수 있나요?' }, a: { en: 'Yes — optional secure parent portal with attendance, class homework, mock test scores, and teacher notes. Accessible by parent email login.', ko: '네 — 출결 · 숙제 · 모의고사 점수 · 강사 코멘트가 있는 선택적 보안 포털. 학부모 이메일 로그인으로 접근.' } },
    ],
    cta: { en: 'Ready for a website that pre-sells parents?', ko: '학부모에게 미리 어필하는 웹사이트를 준비하셨나요?' },
    seo: {
      title: {
        en: 'Korean Academy + Hagwon Website Design — SAT, K-12, Parent Portal | Zoe Lumos',
        ko: '한인 학원 · 학습센터 웹사이트 제작 — SAT · K-12 · 학부모 포털 | ZOE LUMOS',
      },
      description: {
        en: 'Websites for Korean-American academies, SAT prep, and K-12 tutoring. Bilingual instructor profiles, KakaoTalk inquiry, parent portal. $7k — $14k.',
        ko: '한인 학원 · SAT · K-12 튜터링을 위한 웹사이트. 이중언어 강사 프로필, 카카오톡 문의, 학부모 포털. $7,000 — $14,000.',
      },
    },
  },

  /* ─── Korean Medical / Dental ─────────────────────────────────── */
  {
    slug: { en: 'korean-medical-dental', ko: '한인-병원-웹사이트' },
    name: { en: 'Korean Medical + Dental Practices', ko: '한인 의료 · 치과' },
    eyebrow: { en: 'For Korean-speaking doctors + dentists', ko: '한국어 진료 의원 · 치과를 위한' },
    headline: {
      en: ['Practices Korean-American', 'families trust.'],
      ko: ['한인 가족이', '신뢰하는 의원.'],
    },
    intro: {
      en: 'Korean-speaking primary care, dental, pediatric, and dermatology practices are the first call for Korean-American families in NJ, NY, and LA. We build HIPAA-conscious, bilingual websites that reassure, book appointments, and rank for "Korean dentist near me" and "한인 내과".',
      ko: 'NJ · NY · LA의 한인 가족이 가장 먼저 찾는 한국어 진료 내과 · 치과 · 소아과 · 피부과. HIPAA를 고려한 이중언어 웹사이트로 환자를 안심시키고, 예약을 받고, "Korean dentist near me" · "한인 내과" 검색에서 상위 노출됩니다.',
    },
    image: '/blog/korean-dental-practice-website-guide.png',
    accent: '#D4CAAF',
    stats: [
      { num: '81', suf: '%', label: { en: 'of Korean patients pick providers by language', ko: '한인 환자 81%가 언어로 의료진 선택' } },
      { num: '35', suf: '%', label: { en: 'lower no-show with online booking', ko: '온라인 예약 시 노쇼 감소율' } },
      { num: '100', suf: '%', label: { en: 'HIPAA-compliant infrastructure', ko: 'HIPAA 준수 인프라' } },
    ],
    problems: [
      { icon: 'lock', title: { en: 'HIPAA compliance is non-negotiable', ko: 'HIPAA 준수는 필수입니다' }, body: { en: 'Forms, scheduling, and patient communication all have to live on HIPAA-compliant infrastructure. Most website templates don\'t.', ko: '양식 · 스케줄 · 환자 커뮤니케이션 모두 HIPAA 준수 인프라 위에 있어야 합니다. 대부분 템플릿은 그렇지 않습니다.' } },
      { icon: 'translate', title: { en: 'Patients pick based on language first', ko: '환자는 언어를 먼저 봅니다' }, body: { en: 'First-gen Korean patients filter providers by "한국어 진료 가능" before anything else. The site has to announce it clearly.', ko: '1세대 한인 환자는 "한국어 진료 가능" 여부로 먼저 필터링합니다. 사이트가 명확히 알려야 합니다.' } },
      { icon: 'calendar', title: { en: 'Booking systems stuck in 2010', ko: '2010년에 멈춘 예약 시스템' }, body: { en: 'Patients expect to book online, see openings this week, and get a reminder. Phone-only scheduling loses younger patients.', ko: '환자들은 온라인 예약, 이번 주 빈 시간 확인, 리마인더 발송을 기대합니다. 전화 전용은 젊은 환자를 놓칩니다.' } },
      { icon: 'shield', title: { en: 'Insurance confusion scares patients off', ko: '보험 관련 혼란이 환자를 돌립니다' }, body: { en: 'Clear insurance lists (Horizon BCBS, Aetna, MetLife PPO, etc.) in both Korean and English removes the #1 pre-visit question.', ko: '명확한 보험 리스트 (Horizon BCBS · Aetna · MetLife PPO 등)를 한국어 · 영어로 제공하면 방문 전 1순위 질문이 사라집니다.' } },
    ],
    features: [
      { title: { en: 'HIPAA-compliant intake forms', ko: 'HIPAA 준수 접수 양식' }, body: { en: 'New patient paperwork, medical history, and insurance info all secured and routed to your practice management system.', ko: '신규 환자 서류, 병력, 보험 정보 모두 보안 처리 후 원내 관리 시스템으로 전송.' } },
      { title: { en: 'Online appointment booking', ko: '온라인 진료 예약' }, body: { en: 'Integrates with Dentrix, Eaglesoft, athenahealth, or simple Google Calendar. Patients see real open slots.', ko: 'Dentrix · Eaglesoft · athenahealth · 구글 캘린더와 연동. 환자가 실제 빈 시간을 확인.' } },
      { title: { en: 'Provider profiles with Korean credentials', ko: '한국 경력 포함 의료진 프로필' }, body: { en: 'Yonsei, Seoul National, KAIST — display your providers\' Korean education credentials alongside US licensing.', ko: '연세대 · 서울대 · KAIST 등 의료진의 한국 교육 경력과 미국 면허를 함께 표시.' } },
      { title: { en: 'Insurance accepted list (searchable)', ko: '수용 보험 리스트 (검색 가능)' }, body: { en: 'Patients type their plan, see "yes we accept" instantly. Major Korean-preferred plans prioritized.', ko: '환자가 보험명 입력 시 "수용 가능" 즉시 확인. 한인 선호 보험 우선 표시.' } },
      { title: { en: 'Services × conditions explainers', ko: '진료 서비스 · 질환 안내' }, body: { en: 'Bilingual pages for each service (dental implants, skin care, pediatric wellness) — each ranks in Korean search.', ko: '각 서비스별 이중언어 페이지 (임플란트 · 피부 관리 · 소아 건강) — 한국어 검색에서 각각 상위 노출.' } },
      { title: { en: 'Review aggregation + Google profile sync', ko: '리뷰 통합 · 구글 프로필 동기화' }, body: { en: 'Zocdoc, Google, Healthgrades reviews pulled into your homepage. Review request flow after every visit.', ko: 'Zocdoc · 구글 · Healthgrades 리뷰를 홈페이지 통합 표시. 방문 후 리뷰 요청 플로우 자동 실행.' } },
    ],
    caseStudy: {
      project: 'Korean dental practice (Fort Lee)',
      quote: { en: 'New patient calls tripled. Half of them tell us they found us because our insurance list was the only one they could actually read.', ko: '신규 환자 전화가 3배가 되었습니다. 절반은 "읽을 수 있는 유일한 보험 리스트여서 찾아왔다"고 하셨어요.', },
      author: 'Dr. Park',
      role: { en: 'Dentist, Fort Lee practice', ko: '치과 원장, 포트리' },
      image: '/blog/korean-dental-practice-website-guide.png',
    },
    faqs: [
      { q: { en: 'Is the website HIPAA compliant?', ko: '웹사이트가 HIPAA를 준수하나요?' }, a: { en: 'Yes. All forms and patient data flow through HIPAA-compliant infrastructure (typically Jotform HIPAA, SimplePractice, or custom encrypted submission with BAA). We sign a Business Associate Agreement.', ko: '네. 모든 양식과 환자 데이터는 HIPAA 준수 인프라(Jotform HIPAA · SimplePractice · 또는 BAA 체결한 맞춤 암호화 시스템)를 통해 처리. BAA(비즈니스 어소시에이트 계약) 체결.' } },
      { q: { en: 'How much does a medical or dental website cost?', ko: '의료 · 치과 웹사이트 비용은 얼마인가요?' }, a: { en: '$8,000 — $15,000 depending on integrations. Standard build includes online booking, HIPAA forms, insurance list, and provider profiles. More for multi-location practices.', ko: '연동 범위에 따라 $8,000 — $15,000. 온라인 예약 · HIPAA 양식 · 보험 리스트 · 의료진 프로필 포함. 다지점일 경우 추가.' } },
      { q: { en: 'Can you integrate with my practice management software?', ko: '기존 진료 관리 소프트웨어와 연동되나요?' }, a: { en: 'Yes — common integrations include Dentrix, Eaglesoft, Open Dental, athenahealth, DrChrono, and Kareo. Appointment requests flow into your existing schedule.', ko: '네 — Dentrix · Eaglesoft · Open Dental · athenahealth · DrChrono · Kareo 등 연동 가능. 예약 요청이 기존 스케줄로 바로 반영.' } },
      { q: { en: 'Can you help us rank for "Korean dentist near me"?', ko: '"Korean dentist near me" 검색에서 상위 노출 가능한가요?' }, a: { en: 'Yes. Local SEO for bilingual search ("Korean dentist Fort Lee" + "포트리 한인 치과") is a core deliverable. We optimize Google Business Profile, structured data, and localized service pages.', ko: '네. 이중언어 로컬 SEO ("Korean dentist Fort Lee" + "포트리 한인 치과")가 핵심 서비스. 구글 비즈니스 프로필, 구조화 데이터, 지역화된 서비스 페이지 최적화 포함.' } },
    ],
    cta: { en: 'Ready to be the practice every Korean family recommends?', ko: '모든 한인 가족이 추천하는 의원이 되실 준비되셨나요?' },
    seo: {
      title: {
        en: 'Korean Medical + Dental Website Design — HIPAA, Bilingual, Online Booking | Zoe Lumos',
        ko: '한인 의료 · 치과 웹사이트 제작 — HIPAA · 이중언어 · 온라인 예약 | ZOE LUMOS',
      },
      description: {
        en: 'HIPAA-compliant websites for Korean-speaking doctors, dentists, pediatricians, and dermatologists. Bilingual, insurance-ready, online booking. $8k — $15k.',
        ko: '한국어 진료 내과 · 치과 · 소아과 · 피부과를 위한 HIPAA 준수 웹사이트. 이중언어, 보험 리스트, 온라인 예약. $8,000 — $15,000.',
      },
    },
  },

  /* ─── Korean E-commerce / Shopify ─────────────────────────────── */
  {
    slug: { en: 'korean-ecommerce', ko: '한인-쇼핑몰-제작' },
    name: { en: 'Korean E-commerce + Shopify', ko: '한인 쇼핑몰 · Shopify' },
    eyebrow: { en: 'For Korean product brands + K-beauty', ko: '한인 제품 브랜드 · K-뷰티를 위한' },
    headline: {
      en: ['Shopify stores for Korean', 'brands that ship.'],
      ko: ['실제로 배송하는', '한인 브랜드 Shopify.'],
    },
    intro: {
      en: 'Korean brands — skincare, snacks, fashion, home goods — are winning American shelves because the product is genuinely better. We build Shopify stores that match the product quality: editorial, fast, bilingual, and built to convert the K-beauty, K-food, and K-lifestyle audiences that already love what you make.',
      ko: '한인 브랜드 — 스킨케어 · 스낵 · 패션 · 생활용품 — 이 미국 매대에서 이기고 있습니다. 제품이 정말 좋기 때문입니다. 제품 품질에 어울리는 Shopify 스토어를 만듭니다: 에디토리얼, 빠름, 이중언어, K-뷰티 · K-푸드 · K-라이프스타일 고객을 전환시키는 구조.',
    },
    image: '/portfolio/mochinut.jpg',
    accent: '#F4E4D4',
    stats: [
      { num: '2.6', suf: '×', label: { en: 'conversion vs. generic Shopify themes', ko: '일반 Shopify 테마 대비 전환율' } },
      { num: '98', suf: '/100', label: { en: 'median Lighthouse score', ko: 'Lighthouse 점수 중앙값' } },
      { num: '42', suf: '%', label: { en: 'mobile checkout completion lift', ko: '모바일 체크아웃 완료율 상승' } },
    ],
    problems: [
      { icon: 'cart', title: { en: 'Abandoned carts at checkout', ko: '체크아웃에서 버려진 장바구니' }, body: { en: 'Slow load, too many fields, confusing shipping. Shopify has the fix — most themes don\'t use it.', ko: '느린 로딩, 과도한 입력 필드, 복잡한 배송. Shopify는 해결책을 갖고 있지만 대부분 테마가 쓰지 않습니다.' } },
      { icon: 'translate', title: { en: 'English-only stores missing the K-audience', ko: '영문 전용 스토어가 K-오디언스를 놓칩니다' }, body: { en: 'Your Korean-American customers share in Korean. Bilingual product descriptions turn shares into purchases.', ko: '한인 고객은 한국어로 공유합니다. 이중언어 상품 설명이 공유를 구매로 바꿉니다.' } },
      { icon: 'search', title: { en: 'Invisible in K-beauty + K-food search', ko: 'K-뷰티 · K-푸드 검색에서 안 보임' }, body: { en: '"Korean skincare for sensitive skin", "한국 스낵 온라인" — long-tail Korean product searches are where demand lives.', ko: '"Korean skincare for sensitive skin" · "한국 스낵 온라인" — 한국어 제품 롱테일 검색에 수요가 있습니다.' } },
      { icon: 'palette', title: { en: 'Template themes that embarrass the product', ko: '제품을 부끄럽게 만드는 템플릿' }, body: { en: 'If your packaging is beautiful and your site isn\'t, customers assume the product is wrong.', ko: '포장은 예쁜데 사이트가 아니라면, 고객은 제품이 잘못되었다고 생각합니다.' } },
    ],
    features: [
      { title: { en: 'Custom Shopify theme (not templates)', ko: '맞춤 Shopify 테마 (템플릿 아님)' }, body: { en: 'Built ground-up in Liquid + Tailwind to match your brand. Fast, editorial, mobile-first.', ko: 'Liquid + Tailwind로 처음부터 구축. 빠르고, 에디토리얼하고, 모바일 우선.' } },
      { title: { en: 'Bilingual product descriptions', ko: '이중언어 상품 설명' }, body: { en: 'Every product ships with professionally written English + Korean copy. SEO-optimized in both languages.', ko: '모든 상품에 전문적으로 작성된 한국어 · 영어 카피. 양 언어 모두 SEO 최적화.' } },
      { title: { en: 'Subscription + bundles', ko: '구독 · 번들' }, body: { en: 'Recharge or Shopify-native subscriptions. Bundle builders for skincare routines, K-snack boxes, etc.', ko: 'Recharge · Shopify 기본 구독. 스킨케어 루틴 · K-스낵 박스 등 번들 빌더.' } },
      { title: { en: 'KakaoPay + international shipping', ko: 'KakaoPay · 국제 배송' }, body: { en: 'Accept KakaoPay for Korean customers. DHL + USPS international shipping with accurate duties + calculations.', ko: '한인 고객을 위한 KakaoPay 결제. 정확한 관세 계산과 함께 DHL · USPS 국제 배송.' } },
      { title: { en: 'Instagram Shop + TikTok Shop sync', ko: 'Instagram Shop · TikTok Shop 동기화' }, body: { en: 'Products auto-sync to IG and TikTok for in-app checkout. Huge for K-beauty discovery.', ko: '상품이 IG · TikTok으로 자동 동기화되어 인앱 체크아웃. K-뷰티 디스커버리에 결정적.' } },
      { title: { en: 'Reviews with photo upload', ko: '사진 업로드 가능한 리뷰' }, body: { en: 'Judge.me or Loox with Korean + English review flows. Photo + video reviews boost conversion 40%+.', ko: 'Judge.me · Loox를 한국어 · 영어 리뷰 플로우로 설정. 사진 · 영상 리뷰가 전환율 40%+ 상승시킵니다.' } },
    ],
    caseStudy: {
      project: 'Mochinut',
      quote: { en: 'The rebrand took us from a local hit to multi-city franchise without losing the handmade feel. The Shopify store holds the whole thing together.', ko: '리브랜드가 저희를 로컬 히트에서 다점포 프랜차이즈로 확장시켰습니다 — 수작업의 감각은 그대로. Shopify 스토어가 모든 걸 하나로 묶어줍니다.', },
      author: 'Mochinut Team',
      role: { en: 'Franchise HQ, multi-city', ko: '프랜차이즈 본사, 다도시' },
      image: '/portfolio/mochinut.jpg',
    },
    faqs: [
      { q: { en: 'How much does a custom Shopify store cost?', ko: '맞춤 Shopify 스토어 비용은 얼마인가요?' }, a: { en: '$10,000 — $25,000 for a custom-themed store with bilingual copy, subscriptions, and IG/TikTok sync. Plus ~$80 — $300/month for Shopify + apps.', ko: '이중언어 카피 · 구독 · IG/TikTok 동기화 포함 맞춤 테마 스토어 $10,000 — $25,000. Shopify + 앱 월 $80 — $300 별도.' } },
      { q: { en: 'Can you migrate from WordPress/WooCommerce?', ko: 'WordPress/WooCommerce에서 이전할 수 있나요?' }, a: { en: 'Yes. Products, customers, orders, reviews, and SEO URLs all migrate cleanly with 301 redirects so your Google rankings transfer.', ko: '네. 상품 · 고객 · 주문 · 리뷰 · SEO URL 모두 301 리다이렉트와 함께 깨끗이 이전 — 구글 랭킹 유지.' } },
      { q: { en: 'Do you handle Korean + US shipping calculations?', ko: '한국 · 미국 배송 계산도 가능한가요?' }, a: { en: 'Yes. US shipping via Shopify rates or ShipStation. Korea shipping via DHL Express or CJ Logistics with accurate duties. KakaoPay and domestic Korean cards supported.', ko: '네. 미국 배송은 Shopify 요율 · ShipStation. 한국 배송은 DHL Express · CJ대한통운, 정확한 관세 계산. KakaoPay · 한국 국내 카드 지원.' } },
      { q: { en: 'Can we sell on Coupang or 11번가 too?', ko: '쿠팡 · 11번가에서도 판매할 수 있나요?' }, a: { en: 'Yes — we handle the multi-channel sync so your US Shopify is the source of truth and Korean marketplaces stay in stock.', ko: '네 — 멀티채널 동기화로 미국 Shopify를 소스로, 한국 마켓플레이스 재고 자동 연동.' } },
    ],
    cta: { en: 'Ready to ship your Korean brand to the world?', ko: '한인 브랜드를 전 세계로 보내실 준비가 되셨나요?' },
    seo: {
      title: {
        en: 'Korean E-commerce + Shopify Design — K-Beauty, K-Food, Bilingual Stores | Zoe Lumos',
        ko: '한인 쇼핑몰 · Shopify 제작 — K-뷰티 · K-푸드 · 이중언어 스토어 | ZOE LUMOS',
      },
      description: {
        en: 'Custom Shopify stores for Korean brands — K-beauty, K-food, fashion, home. Bilingual, subscriptions, Instagram/TikTok Shop sync, KakaoPay. $10k — $25k.',
        ko: 'K-뷰티 · K-푸드 · 패션 · 홈 — 한인 브랜드를 위한 맞춤 Shopify 스토어. 이중언어, 구독, Instagram/TikTok Shop 동기화, KakaoPay. $10,000 — $25,000.',
      },
    },
  },
]

export function industryBySlug(slug: string, locale: 'en' | 'ko'): Industry | undefined {
  return industries.find((i) => i.slug[locale] === slug)
}
