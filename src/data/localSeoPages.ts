// Local + industry landing pages for Bergen County / New Jersey Korean-American search intent.
// One entry renders two URLs: /{slug} (English) and /ko/{koSlug} (Korean), paired by hreflang.
// Facts only: real prices, real case studies, no invented reviews, no phone number.

export type L = { en: string; ko: string }

export type LocalSeoEntry = {
  key: string
  slug: string
  koSlug: string
  kind: 'town' | 'guide'
  title: L
  description: L
  eyebrow: L
  h1: L
  lede: L
  answers: { q: L; a: L }[]
  context: { heading: L; paras: L[] }
  builds: { heading: L; items: { t: L; d: L }[] }
  faqs: { q: L; a: L }[]
  areaServed: string[]
  geo?: { lat: number; lng: number; zip: string; city: string }
  related: string[]
}

const BERGEN_CORE = ['Fort Lee', 'Palisades Park', 'Leonia', 'Englewood Cliffs', 'Englewood', 'Ridgefield', 'Cliffside Park', 'Edgewater', 'Tenafly', 'Closter', 'Hackensack', 'Bergen County']

export const localSeoPages: LocalSeoEntry[] = [
  {
    key: 'englewood-cliffs',
    slug: 'englewood-cliffs-web-design',
    koSlug: '잉글우드클립스-홈페이지-제작',
    kind: 'town',
    title: {
      en: 'Englewood Cliffs Web Design · Korean & English | ZOE LUMOS',
      ko: '잉글우드클립스 홈페이지 제작 · 웹사이트 제작 | 조이루모스',
    },
    description: {
      en: 'Englewood Cliffs, NJ web design — bilingual Korean-English sites, Shopify and local SEO. Builds from $500, care from $49/mo. Fort Lee studio, 5 min away.',
      ko: '잉글우드클립스 홈페이지·웹사이트 제작. 한·영 이중언어, Shopify 쇼핑몰, 구글 SEO. 제작 $500부터, 관리 월 $49부터. 바로 옆 포트리 스튜디오, 100% 한국어 상담.',
    },
    eyebrow: { en: 'Englewood Cliffs, NJ 07632', ko: '잉글우드클립스, NJ 07632' },
    h1: { en: 'Englewood Cliffs web design, built in Korean and English.', ko: '잉글우드클립스 홈페이지 제작, 한국어와 영어로.' },
    lede: {
      en: 'Corporate offices, trading companies, law and CPA firms, and the restaurants along Sylvan Avenue all get judged by their website first. We build fast, bilingual sites that read naturally in both languages and rank for the searches your clients actually type.',
      ko: '실번 애비뉴의 기업 사무실, 무역회사, 로펌·회계법인, 그리고 직원들이 찾는 식당까지 — 고객은 먼저 웹사이트로 판단합니다. 한국어와 영어 모두 자연스럽게 읽히고, 고객이 실제로 검색하는 단어로 노출되는 빠른 이중언어 사이트를 만듭니다.',
    },
    answers: [
      { q: { en: 'Who builds websites for Englewood Cliffs businesses?', ko: '잉글우드클립스 홈페이지는 어디서 만드나요?' }, a: { en: 'ZOE LUMOS is a Korean-American web design studio in Fort Lee, about five minutes from Sylvan Avenue. We build bilingual Korean-English websites, Shopify stores and local SEO for Englewood Cliffs businesses.', ko: '조이루모스(ZOE LUMOS)는 실번 애비뉴에서 5분 거리인 포트리의 한인 웹디자인 스튜디오입니다. 잉글우드클립스 비즈니스를 위한 한·영 이중언어 홈페이지, Shopify 쇼핑몰, 구글 로컬 SEO를 제작합니다.' } },
      { q: { en: 'How much does it cost?', ko: '비용은 얼마인가요?' }, a: { en: 'Builds are $500–$800 (basic), $1,100–$1,500 (standard) or $1,800–$2,400 (store). Monthly care plans are $49, $89, $199 or $499. Prices are published on our pricing page — no quote wall.', ko: '제작비는 기본 $500–$800, 일반 $1,100–$1,500, 쇼핑몰 $1,800–$2,400입니다. 월 관리 플랜은 $49, $89, $199, $499. 모든 가격은 가격 페이지에 공개되어 있습니다.' } },
      { q: { en: 'How long does it take?', ko: '제작 기간은?' }, a: { en: 'A standard business site takes 2–3 weeks; a Shopify store 4–6 weeks; a redesign of an existing site 3–5 weeks.', ko: '일반 비즈니스 홈페이지 2–3주, Shopify 쇼핑몰 4–6주, 기존 사이트 리뉴얼 3–5주입니다.' } },
      { q: { en: 'Can the site be fully bilingual?', ko: '한국어·영어 모두 가능한가요?' }, a: { en: 'Yes. Every page exists in both languages with its own URL, hreflang tags and separate SEO, so English searches and Korean searches each find the right version.', ko: '네. 모든 페이지가 언어별 별도 URL과 hreflang 태그, 별도 SEO를 갖춰 영어 검색과 한국어 검색에서 각각 맞는 버전이 노출됩니다.' } },
    ],
    context: {
      heading: { en: 'Why Englewood Cliffs is different', ko: '잉글우드클립스 비즈니스의 특징' },
      paras: [
        { en: 'Englewood Cliffs sits on top of the Palisades, with Sylvan Avenue (Route 9W) running through it as a corporate corridor. It is home to LG Electronics\' North American headquarters and the U.S. offices of many Korean-owned companies, and the Korean American National Coordinating Council is based here too. That mix means a lot of B2B buyers: partners in Korea, procurement teams in the U.S., and job candidates — all checking your site before they reply to an email.', ko: '잉글우드클립스는 팰리세이즈 절벽 위에 자리하고, 9W 도로인 실번 애비뉴가 기업 거리로 이어집니다. LG전자 북미 본사와 여러 한국 기업의 미국 법인이 모여 있고, 미주한인협의회(KANCC) 본부도 이곳에 있습니다. 그래서 B2B 고객이 많습니다 — 한국 본사 파트너, 미국 구매 담당자, 채용 지원자까지 이메일에 답하기 전에 먼저 웹사이트를 확인합니다.' },
        { en: 'For those visitors, a site has to look established, load instantly on a phone, and say the same thing in both languages — not a machine-translated copy. For the restaurants and cafés along Sylvan and Palisade Avenue, the job is different: show up in Google Maps at 11:50 a.m. with today\'s hours, a menu that loads, and a one-tap way to order.', ko: '이런 방문자에게는 탄탄해 보이고, 휴대폰에서 즉시 열리고, 두 언어로 같은 내용을 말하는 사이트가 필요합니다 — 기계 번역이 아니라요. 실번·팰리세이드 애비뉴의 식당과 카페는 목표가 다릅니다: 점심 직전 구글 지도에 영업시간, 빠르게 열리는 메뉴, 한 번에 주문하는 버튼이 보여야 합니다.' },
      ],
    },
    builds: {
      heading: { en: 'What we build for Englewood Cliffs', ko: '잉글우드클립스 비즈니스를 위한 제작' },
      items: [
        { t: { en: 'Bilingual corporate sites', ko: '한·영 기업 홈페이지' }, d: { en: 'Company, leadership, capabilities and careers pages written for both Korean HQ partners and U.S. clients.', ko: '한국 본사 파트너와 미국 고객 모두를 위한 회사 소개, 경영진, 사업 영역, 채용 페이지.' } },
        { t: { en: 'Professional services', ko: '전문직 사이트 (로펌·회계·보험)' }, d: { en: 'Practice-area pages, attorney/CPA bios, intake forms and Korean-language FAQ that turn searches into consultations.', ko: '업무 분야, 전문가 소개, 상담 신청 폼, 한국어 FAQ로 검색을 상담 문의로 연결합니다.' } },
        { t: { en: 'Restaurant & café sites', ko: '식당·카페 홈페이지' }, d: { en: 'Photo menus in both languages, direct online ordering, catering inquiries and an optimized Google Business Profile.', ko: '한·영 사진 메뉴, 직접 온라인 주문, 케이터링 문의, 최적화된 구글 비즈니스 프로필.' } },
        { t: { en: 'Local SEO & Google Business Profile', ko: '로컬 SEO · 구글 비즈니스 프로필' }, d: { en: 'Category, service area, photos and review replies set up so you appear in the map pack for Englewood Cliffs searches.', ko: '카테고리, 서비스 지역, 사진, 리뷰 답변까지 설정해 잉글우드클립스 지도 검색에 노출되게 합니다.' } },
      ],
    },
    faqs: [
      { q: { en: 'Do you meet in person in Englewood Cliffs?', ko: '잉글우드클립스에서 직접 만날 수 있나요?' }, a: { en: 'Yes. Our studio is in Fort Lee, minutes from Sylvan Avenue, and we meet clients on site when it helps. Most of the project runs over KakaoTalk, email and video calls.', ko: '네. 스튜디오가 실번 애비뉴에서 몇 분 거리인 포트리에 있어 필요하면 직접 방문합니다. 대부분의 진행은 카카오톡, 이메일, 화상 미팅으로 합니다.' } },
      { q: { en: 'We already have a WordPress site. Can you redesign it without losing Google rankings?', ko: '이미 워드프레스 사이트가 있는데 순위를 잃지 않고 리뉴얼할 수 있나요?' }, a: { en: 'Yes. We map every old URL to its new page with 301 redirects, keep the content that ranks, and move titles and structured data across before launch.', ko: '네. 기존 URL을 모두 새 페이지로 301 리다이렉트하고, 순위가 있는 콘텐츠는 유지하며, 제목과 구조화 데이터를 오픈 전에 옮깁니다.' } },
      { q: { en: 'Who owns the domain and the website?', ko: '도메인과 웹사이트 소유권은 누구에게 있나요?' }, a: { en: 'You do. The domain is registered in your name and you get the code and admin access. If you leave, the site leaves with you.', ko: '고객님입니다. 도메인은 고객 명의로 등록하고, 코드와 관리자 권한을 드립니다. 다른 업체로 옮겨도 사이트는 그대로 가져가십니다.' } },
      { q: { en: 'Can you write the Korean and English copy?', ko: '한국어·영어 문구도 써 주나요?' }, a: { en: 'Yes. Copy is written natively in each language by bilingual writers, not translated word for word, and reviewed with you before launch.', ko: '네. 이중언어 작가가 각 언어로 직접 작성하며, 단어 단위 번역이 아닙니다. 오픈 전 함께 검토합니다.' } },
      { q: { en: 'What does the monthly plan include?', ko: '월 관리 플랜에는 무엇이 포함되나요?' }, a: { en: 'Basic ($49) covers hosting, SSL, uptime and security updates. Care ($89) adds small edits. Grow ($199) adds content edits, a GA4 report, SEO monitoring and Google Business Profile management. Scale ($499) adds content and local SEO work every month.', ko: 'Basic($49)은 호스팅, SSL, 가동 모니터링, 보안 업데이트. Care($89)는 소규모 수정 추가. Grow($199)는 콘텐츠 수정, GA4 리포트, SEO 모니터링, 구글 비즈니스 프로필 관리 추가. Scale($499)은 매달 콘텐츠와 로컬 SEO 작업까지 포함합니다.' } },
    ],
    areaServed: ['Englewood Cliffs', 'Englewood', 'Fort Lee', 'Tenafly', 'Leonia', 'Bergen County'],
    geo: { lat: 40.8857, lng: -73.9526, zip: '07632', city: 'Englewood Cliffs' },
    related: ['bergen-county', 'palisades-park', 'leonia', 'pos-vs-studio'],
  },
  {
    key: 'palisades-park',
    slug: 'palisades-park-web-design',
    koSlug: '팰팍-홈페이지-제작',
    kind: 'town',
    title: {
      en: 'Palisades Park Web Design for Korean Businesses | ZOE LUMOS',
      ko: '팰팍 홈페이지 제작 · 팰리세이즈파크 웹사이트 제작 | 조이루모스',
    },
    description: {
      en: 'Palisades Park, NJ websites for Broad Ave businesses — bilingual menus, booking, Google Maps SEO, KakaoTalk. Builds from $500, care from $49/mo.',
      ko: '팰팍(팰리세이즈파크) 브로드 애비뉴 한인 업소 홈페이지 제작. 한·영 메뉴, 예약, 구글 지도 SEO, 카카오톡 연동. 제작 $500부터, 관리 월 $49부터.',
    },
    eyebrow: { en: 'Palisades Park, NJ 07650 · Broad Avenue', ko: '팰리세이즈파크, NJ 07650 · 브로드 애비뉴' },
    h1: { en: 'Palisades Park websites that get found on Broad Avenue — and on Google.', ko: '팰팍 홈페이지 제작 — 브로드 애비뉴에서, 그리고 구글에서 찾히게.' },
    lede: {
      en: 'Broad Avenue is one of the densest Korean-American business districts in the country. Customers decide between two restaurants, two salons or two insurance agents on their phone, standing on the sidewalk. We build the site that wins that moment.',
      ko: '브로드 애비뉴는 미국에서 가장 밀집된 한인 상권 중 하나입니다. 손님은 길 위에서 휴대폰으로 식당 두 곳, 미용실 두 곳, 보험 에이전트 두 명 중 하나를 고릅니다. 그 순간에 선택받는 홈페이지를 만듭니다.',
    },
    answers: [
      { q: { en: 'Who makes websites for Palisades Park businesses?', ko: '팰팍 홈페이지 제작은 어디서 하나요?' }, a: { en: 'ZOE LUMOS, a Korean-American studio in neighboring Fort Lee. We build bilingual sites, online ordering and booking, and Google Maps SEO for Broad Avenue and Grand Avenue businesses.', ko: '바로 옆 포트리의 한인 스튜디오 조이루모스(ZOE LUMOS)입니다. 브로드·그랜드 애비뉴 업소를 위한 이중언어 홈페이지, 온라인 주문·예약, 구글 지도 SEO를 제작합니다.' } },
      { q: { en: 'What does a Palisades Park website cost?', ko: '팰팍 홈페이지 제작 비용은?' }, a: { en: '$500–$800 for a basic site, $1,100–$1,500 standard, $1,800–$2,400 with online store. Care plans run $49–$499 a month. All prices are published.', ko: '기본 $500–$800, 일반 $1,100–$1,500, 온라인 쇼핑몰 포함 $1,800–$2,400. 월 관리 $49–$499. 모든 가격 공개.' } },
      { q: { en: 'Do you handle Google Maps and reviews?', ko: '구글 지도와 리뷰도 관리하나요?' }, a: { en: 'Yes. Google Business Profile setup and management is included in the Grow plan ($199/mo): categories, photos, hours, posts and review replies in both languages.', ko: '네. Grow 플랜(월 $199)에 구글 비즈니스 프로필 설정·관리가 포함됩니다: 카테고리, 사진, 영업시간, 게시물, 한·영 리뷰 답변.' } },
      { q: { en: 'Can customers message us on KakaoTalk from the site?', ko: '사이트에서 카카오톡으로 바로 문의할 수 있나요?' }, a: { en: 'Yes. We add a KakaoTalk Channel button and link your channel so Korean-speaking customers reach you the way they already message everyone else.', ko: '네. 카카오톡 채널 버튼을 연결해 한국어 고객이 평소처럼 바로 메시지를 보낼 수 있게 합니다.' } },
    ],
    context: {
      heading: { en: 'Selling on Broad Avenue', ko: '브로드 애비뉴 상권의 특징' },
      paras: [
        { en: 'Palisades Park\'s Koreatown runs along Broad Avenue: restaurants, bakeries and cafés, karaoke, beauty and nail salons, real estate and insurance offices, travel agencies, clinics and churches, most with Korean signage. Competition is block by block, and parking is hard — so customers pick a place before they arrive.', ko: '팰리세이즈파크 코리아타운은 브로드 애비뉴를 따라 이어집니다. 식당, 베이커리·카페, 노래방, 미용실·네일, 부동산·보험 사무실, 여행사, 병원, 교회가 한글 간판으로 늘어서 있습니다. 경쟁은 블록 단위이고 주차가 어려워, 손님은 도착하기 전에 갈 곳을 정합니다.' },
        { en: 'That decision happens in two languages. Korean-speaking customers check KakaoTalk and Korean reviews; second-generation and non-Korean customers search Google Maps in English. A site that only works in one language loses half the street.', ko: '그 결정은 두 언어로 이루어집니다. 한국어 고객은 카카오톡과 한국어 리뷰를 보고, 2세와 비한인 고객은 영어로 구글 지도를 검색합니다. 한 언어만 되는 사이트는 거리의 절반을 놓칩니다.' },
      ],
    },
    builds: {
      heading: { en: 'What we build for Palisades Park', ko: '팰팍 업소를 위한 제작' },
      items: [
        { t: { en: 'Bilingual photo menus', ko: '한·영 사진 메뉴' }, d: { en: 'Menus that load fast on a phone, with prices, photos and Korean and English names side by side.', ko: '휴대폰에서 빠르게 열리는 메뉴. 가격, 사진, 한글·영문 이름을 함께 표시합니다.' } },
        { t: { en: 'Booking & ordering', ko: '예약 · 주문' }, d: { en: 'Direct online ordering for restaurants and online booking for salons and clinics (Square, Vagaro and similar).', ko: '식당은 직접 온라인 주문, 미용실·병원은 온라인 예약(Square, Vagaro 등) 연동.' } },
        { t: { en: 'Google Maps visibility', ko: '구글 지도 노출' }, d: { en: 'Google Business Profile, local schema and service-area pages so you appear for “near me” searches around Broad Avenue.', ko: '구글 비즈니스 프로필, 로컬 스키마, 지역 페이지로 브로드 애비뉴 주변 "near me" 검색에 노출.' } },
        { t: { en: 'KakaoTalk & Instagram', ko: '카카오톡 · 인스타그램' }, d: { en: 'KakaoTalk Channel button, Instagram feed and review highlights tied into the site.', ko: '카카오톡 채널 버튼, 인스타그램 피드, 리뷰 하이라이트를 사이트에 연결.' } },
      ],
    },
    faqs: [
      { q: { en: 'My business already has a website from another company. Can you take it over?', ko: '다른 업체가 만든 사이트가 있는데 넘겨받을 수 있나요?' }, a: { en: 'Yes. We take over hosting and maintenance, or rebuild it if it is slow or locked to a template. Domains stay in your name.', ko: '네. 호스팅과 관리를 넘겨받거나, 느리거나 템플릿에 묶여 있으면 새로 만듭니다. 도메인은 고객 명의로 유지됩니다.' } },
      { q: { en: 'Is a website worth it if I already have Instagram?', ko: '인스타그램이 있는데 홈페이지가 꼭 필요할까요?' }, a: { en: 'Instagram is rented space; Google does not rank Instagram posts for “Korean BBQ Palisades Park”. A site you own is what shows up in search and Maps and takes orders without commission.', ko: '인스타그램은 빌린 공간입니다. "팰팍 고깃집" 같은 검색에 구글은 인스타 게시물을 노출하지 않습니다. 검색·지도에 노출되고 수수료 없이 주문받는 것은 직접 소유한 홈페이지입니다.' } },
      { q: { en: 'Can you make the site work for both first- and second-generation customers?', ko: '1세대·2세대 고객 모두에게 맞출 수 있나요?' }, a: { en: 'Yes. Korean copy is written for Korean readers and English copy for American readers, with a language switch on every page.', ko: '네. 한국어는 한국어 독자에게, 영어는 미국 독자에게 맞게 작성하고 모든 페이지에 언어 전환이 있습니다.' } },
      { q: { en: 'How fast will my site load?', ko: '사이트 속도는 어느 정도인가요?' }, a: { en: 'We target under 1.5 seconds on mobile. Our own homepage scores in the 90s on Google Lighthouse for mobile.', ko: '모바일 1.5초 이내를 목표로 합니다. 저희 홈페이지도 구글 Lighthouse 모바일 90점대입니다.' } },
      { q: { en: 'Do you work with Korean-language customers only?', ko: '한국어로만 상담하나요?' }, a: { en: 'We work in both Korean and English — whichever you prefer — over KakaoTalk, email or video calls.', ko: '한국어와 영어 중 편한 언어로, 카카오톡·이메일·화상 미팅으로 진행합니다.' } },
    ],
    areaServed: ['Palisades Park', 'Ridgefield', 'Leonia', 'Fort Lee', 'Fairview', 'Cliffside Park', 'Bergen County'],
    geo: { lat: 40.8481, lng: -73.9976, zip: '07650', city: 'Palisades Park' },
    related: ['bergen-county', 'leonia', 'englewood-cliffs', 'pos-vs-studio'],
  },
  {
    key: 'leonia',
    slug: 'leonia-web-design',
    koSlug: '레오니아-홈페이지-제작',
    kind: 'town',
    title: {
      en: 'Leonia NJ Web Design · Bilingual Korean Sites | ZOE LUMOS',
      ko: '레오니아 홈페이지 제작 · Leonia 웹사이트 제작 | 조이루모스',
    },
    description: {
      en: 'Leonia, NJ web design for academies, clinics, churches and family businesses — bilingual sites, booking, local SEO. From $500, care from $49/mo.',
      ko: '레오니아 홈페이지 제작. 학원, 병원, 교회, 가족 비즈니스를 위한 한·영 이중언어 홈페이지, 예약, 구글 SEO. 제작 $500부터, 관리 월 $49부터.',
    },
    eyebrow: { en: 'Leonia, NJ 07605', ko: '레오니아, NJ 07605' },
    h1: { en: 'Leonia web design for businesses that grow by word of mouth.', ko: '레오니아 홈페이지 제작 — 입소문을 예약으로.' },
    lede: {
      en: 'In a small borough, most new customers arrive through a friend\'s recommendation — and then look you up. We build the site that turns that one search into a booking, a class sign-up or a first visit.',
      ko: '작은 동네에서는 대부분의 새 고객이 지인 추천으로 옵니다 — 그리고 검색해 봅니다. 그 한 번의 검색을 예약, 수강 신청, 첫 방문으로 바꾸는 홈페이지를 만듭니다.',
    },
    answers: [
      { q: { en: 'Who builds websites in Leonia, NJ?', ko: '레오니아 홈페이지는 어디서 만드나요?' }, a: { en: 'ZOE LUMOS, a Korean-American web studio in Fort Lee next door. We build bilingual sites with booking and local SEO for Leonia businesses.', ko: '바로 옆 포트리의 한인 웹 스튜디오 조이루모스(ZOE LUMOS)입니다. 레오니아 비즈니스를 위한 이중언어 홈페이지, 예약, 로컬 SEO를 제작합니다.' } },
      { q: { en: 'How much?', ko: '비용은?' }, a: { en: 'Builds from $500 (basic $500–$800, standard $1,100–$1,500, store $1,800–$2,400); care plans $49–$499 a month.', ko: '제작 $500부터(기본 $500–$800, 일반 $1,100–$1,500, 쇼핑몰 $1,800–$2,400). 월 관리 $49–$499.' } },
      { q: { en: 'How long?', ko: '기간은?' }, a: { en: '2–3 weeks for a standard site, 4–6 weeks for an online store.', ko: '일반 사이트 2–3주, 쇼핑몰 4–6주.' } },
      { q: { en: 'Can parents and students book or register online?', ko: '학부모·학생이 온라인으로 신청할 수 있나요?' }, a: { en: 'Yes. We build class schedules, registration and inquiry forms, or connect your existing booking tool.', ko: '네. 수업 시간표, 수강 신청·문의 폼을 만들거나 기존 예약 도구를 연결합니다.' } },
    ],
    context: {
      heading: { en: 'Leonia\'s business mix', ko: '레오니아 비즈니스의 특징' },
      paras: [
        { en: 'Leonia is a small borough wedged between Fort Lee, Palisades Park and Englewood, with business blocks along Grand Avenue and Broad Avenue and Overpeck County Park on its western edge. It has a large Korean-American family community, and many of its businesses serve families: tutoring academies, music and art studios, clinics, churches and home services.', ko: '레오니아는 포트리, 팰리세이즈파크, 잉글우드 사이의 작은 타운으로, 그랜드 애비뉴와 브로드 애비뉴를 따라 상가가 있고 서쪽으로 오버펙 카운티 파크가 접해 있습니다. 한인 가족 인구가 많고, 학원, 음악·미술 스튜디오, 병원, 교회, 홈서비스 등 가족을 대상으로 하는 비즈니스가 많습니다.' },
        { en: 'These businesses rarely win on foot traffic. They win on trust: a parent hears a name at church or at school pickup, searches it that night, and decides in a minute whether it looks credible. The website is that minute.', ko: '이런 비즈니스는 지나가는 손님이 아니라 신뢰로 성장합니다. 학부모가 교회나 학교 픽업에서 이름을 듣고, 그날 밤 검색해서, 1분 안에 믿을 만한지 판단합니다. 그 1분이 홈페이지입니다.' },
      ],
    },
    builds: {
      heading: { en: 'What we build for Leonia', ko: '레오니아 비즈니스를 위한 제작' },
      items: [
        { t: { en: 'Academy & studio sites', ko: '학원 · 스튜디오 홈페이지' }, d: { en: 'Programs, teachers, schedules, results and a registration form — in Korean for parents and English for students.', ko: '프로그램, 강사, 시간표, 성과, 수강 신청 — 학부모용 한국어, 학생용 영어.' } },
        { t: { en: 'Clinic & practice sites', ko: '병원 · 클리닉 홈페이지' }, d: { en: 'Services, insurance, hours, directions and appointment requests in both languages.', ko: '진료 과목, 보험, 진료 시간, 오시는 길, 예약 요청을 두 언어로.' } },
        { t: { en: 'Home-service sites', ko: '홈서비스 홈페이지' }, d: { en: 'Service areas across Bergen County, quote requests and before/after galleries.', ko: '버겐카운티 서비스 지역, 견적 요청, 시공 전후 갤러리.' } },
        { t: { en: 'Local SEO', ko: '로컬 SEO' }, d: { en: 'Google Business Profile and town pages so you show up for Leonia, Fort Lee and Englewood searches.', ko: '구글 비즈니스 프로필과 지역 페이지로 레오니아·포트리·잉글우드 검색에 노출.' } },
      ],
    },
    faqs: [
      { q: { en: 'We are a small academy. Is a $500 site enough?', ko: '작은 학원인데 $500 사이트로 충분할까요?' }, a: { en: 'For many academies, yes: a basic site with programs, schedule and an inquiry form. If you need online registration with payments, the standard tier fits.', ko: '많은 학원은 충분합니다: 프로그램, 시간표, 문의 폼이 있는 기본 사이트. 결제가 포함된 온라인 등록이 필요하면 일반 플랜이 맞습니다.' } },
      { q: { en: 'Can we update the schedule ourselves?', ko: '시간표를 직접 수정할 수 있나요?' }, a: { en: 'Yes, or we do it for you on the Care plan ($89/mo) and above.', ko: '네, 또는 Care 플랜(월 $89) 이상에서 저희가 수정해 드립니다.' } },
      { q: { en: 'Do you build sites for churches?', ko: '교회 홈페이지도 만드나요?' }, a: { en: 'Yes — worship times, livestream, sermon archive, ministries and new-family forms in Korean and English. See our Korean church website page under Industries.', ko: '네 — 예배 시간, 라이브 방송, 설교 아카이브, 부서 소개, 새가족 등록을 한국어·영어로. 업종 메뉴의 한인 교회 홈페이지 페이지를 참고하세요.' } },
      { q: { en: 'Who owns the site?', ko: '사이트 소유권은?' }, a: { en: 'You do — domain in your name, code and admin access included.', ko: '고객님입니다 — 도메인은 고객 명의, 코드와 관리자 권한 포함.' } },
    ],
    areaServed: ['Leonia', 'Fort Lee', 'Palisades Park', 'Englewood', 'Englewood Cliffs', 'Ridgefield', 'Bergen County'],
    geo: { lat: 40.8618, lng: -73.9882, zip: '07605', city: 'Leonia' },
    related: ['palisades-park', 'englewood-cliffs', 'bergen-county', 'pos-vs-studio'],
  },
  {
    key: 'bergen-county',
    slug: 'bergen-county-web-design',
    koSlug: '버겐카운티-홈페이지-제작',
    kind: 'town',
    title: {
      en: 'Bergen County Web Design for Korean Businesses | ZOE LUMOS',
      ko: '버겐카운티 홈페이지 제작 · 뉴저지 한인 웹사이트 제작 | 조이루모스',
    },
    description: {
      en: 'Bergen County, NJ web design for Korean-American businesses in Fort Lee, Palisades Park, Leonia, Englewood Cliffs and more. From $500, care $49/mo.',
      ko: '버겐카운티 한인 비즈니스 홈페이지 제작 — 포트리, 팰팍, 레오니아, 잉글우드클립스, 테너플라이 등. 한·영 이중언어, Shopify, 구글 로컬 SEO. 가격 공개.',
    },
    eyebrow: { en: 'Bergen County, New Jersey', ko: '뉴저지 버겐카운티' },
    h1: { en: 'Bergen County web design, for the largest Korean-American community in New Jersey.', ko: '버겐카운티 홈페이지 제작 — 뉴저지 최대 한인 커뮤니티를 위해.' },
    lede: {
      en: 'From Fort Lee to Tenafly, Bergen County\'s Korean-American businesses serve customers in two languages. We build the websites, stores and local search presence that let them win in both.',
      ko: '포트리부터 테너플라이까지, 버겐카운티의 한인 비즈니스는 두 언어로 고객을 만납니다. 두 언어 모두에서 이기는 홈페이지, 쇼핑몰, 로컬 검색을 만듭니다.',
    },
    answers: [
      { q: { en: 'Who is a Korean-speaking web designer in Bergen County?', ko: '버겐카운티에 한국어로 상담하는 웹디자이너가 있나요?' }, a: { en: 'ZOE LUMOS is a Korean-American web design studio based in Fort Lee, Bergen County. We work in Korean and English and serve the whole county.', ko: '조이루모스(ZOE LUMOS)는 버겐카운티 포트리에 있는 한인 웹디자인 스튜디오입니다. 한국어와 영어로 상담하며 카운티 전역을 서비스합니다.' } },
      { q: { en: 'Which towns do you serve?', ko: '어느 지역까지 서비스하나요?' }, a: { en: 'Fort Lee, Palisades Park, Leonia, Englewood Cliffs, Englewood, Ridgefield, Cliffside Park, Edgewater, Fairview, Tenafly, Closter, Hackensack and the rest of Bergen County — plus clients across the U.S. remotely.', ko: '포트리, 팰팍, 레오니아, 잉글우드클립스, 잉글우드, 리지필드, 클리프사이드파크, 에지워터, 페어뷰, 테너플라이, 클로스터, 해켄색 등 버겐카운티 전역 — 그리고 미국 전역을 원격으로.' } },
      { q: { en: 'What does it cost?', ko: '비용은?' }, a: { en: 'Builds $500–$2,400 depending on scope; care plans $49–$499 a month. Every price is published.', ko: '제작 $500–$2,400(범위에 따라), 월 관리 $49–$499. 모든 가격 공개.' } },
      { q: { en: 'What results have you delivered?', ko: '실제 성과가 있나요?' }, a: { en: 'TJ Flowers passed $10,000 in revenue within three months of its Shopify rebuild, with 5× search visibility in six weeks.', ko: 'TJ Flowers는 Shopify 리빌드 후 3개월 안에 매출 $10,000를 넘겼고, 6주 만에 검색 노출이 5배가 되었습니다.' } },
    ],
    context: {
      heading: { en: 'One county, many markets', ko: '하나의 카운티, 여러 상권' },
      paras: [
        { en: 'Bergen County holds New Jersey\'s largest Korean-American community, concentrated in a tight ring of towns along the Hudson and the Palisades: Fort Lee and Edgewater by the George Washington Bridge, Palisades Park\'s Broad Avenue Koreatown, Leonia, Ridgefield and Cliffside Park, Englewood Cliffs\' Sylvan Avenue offices, and family towns to the north like Tenafly and Closter.', ko: '버겐카운티에는 뉴저지 최대의 한인 커뮤니티가 있으며, 허드슨강과 팰리세이즈를 따라 촘촘하게 모여 있습니다: 조지워싱턴 브리지 옆 포트리와 에지워터, 팰팍 브로드 애비뉴 코리아타운, 레오니아, 리지필드, 클리프사이드파크, 잉글우드클립스 실번 애비뉴 사무실, 그리고 북쪽의 테너플라이·클로스터 같은 주거 타운까지.' },
        { en: 'Each town searches differently. Restaurants in Palisades Park live and die by Google Maps; professional firms in Englewood Cliffs need credibility with Korean HQ partners; academies in Leonia and Tenafly win through parents\' word of mouth. We build for the specific market, not a generic template.', ko: '타운마다 검색 방식이 다릅니다. 팰팍 식당은 구글 지도가 생명이고, 잉글우드클립스 전문 회사는 한국 본사 파트너에게 신뢰를 줘야 하며, 레오니아·테너플라이 학원은 학부모 입소문으로 성장합니다. 일반 템플릿이 아니라 각 상권에 맞게 만듭니다.' },
      ],
    },
    builds: {
      heading: { en: 'Pick your town', ko: '지역별 페이지' },
      items: [
        { t: { en: 'Fort Lee', ko: '포트리' }, d: { en: 'Our home base — restaurants, real estate, professional services near the GWB.', ko: '저희 스튜디오가 있는 곳 — GWB 인근 식당, 부동산, 전문직.' } },
        { t: { en: 'Palisades Park', ko: '팰리세이즈파크' }, d: { en: 'Broad Avenue Koreatown — menus, booking, Google Maps.', ko: '브로드 애비뉴 코리아타운 — 메뉴, 예약, 구글 지도.' } },
        { t: { en: 'Englewood Cliffs', ko: '잉글우드클립스' }, d: { en: 'Sylvan Avenue corporate corridor — bilingual corporate sites.', ko: '실번 애비뉴 기업 거리 — 한·영 기업 홈페이지.' } },
        { t: { en: 'Leonia', ko: '레오니아' }, d: { en: 'Academies, clinics, churches and family businesses.', ko: '학원, 병원, 교회, 가족 비즈니스.' } },
        { t: { en: 'Ridgefield · Cliffside Park · Edgewater', ko: '리지필드 · 클리프사이드파크 · 에지워터' }, d: { en: 'Neighborhood businesses along Route 5, Anderson Avenue and River Road.', ko: '5번 도로, 앤더슨 애비뉴, 리버 로드의 동네 상권.' } },
        { t: { en: 'Hackensack · Englewood · Tenafly', ko: '해켄색 · 잉글우드 · 테너플라이' }, d: { en: 'County seat services, downtown Englewood retail, and northern family towns.', ko: '카운티 중심 해켄색, 잉글우드 다운타운, 북부 주거 타운.' } },
      ],
    },
    faqs: [
      { q: { en: 'Do you only work with Korean-owned businesses?', ko: '한인 업소만 작업하나요?' }, a: { en: 'No. Most of our clients serve Korean-speaking customers, but we build for any business in Bergen County — in English, Korean or both.', ko: '아니요. 대부분 한인 고객을 대상으로 하는 비즈니스지만, 버겐카운티 어떤 비즈니스든 영어·한국어 또는 둘 다로 제작합니다.' } },
      { q: { en: 'Do you also run Google Ads?', ko: '구글 광고도 하나요?' }, a: { en: 'Yes, as an add-on from +$150/month, with conversion tracking set up so you see real inquiries, not just clicks.', ko: '네, 월 +$150부터 추가 가능하며 클릭이 아닌 실제 문의를 볼 수 있도록 전환 추적을 설정합니다.' } },
      { q: { en: 'Can you help with Naver as well as Google?', ko: '구글 말고 네이버도 가능한가요?' }, a: { en: 'We optimize Korean pages so they can be indexed by Naver as well, though for local customers in New Jersey, Google and Google Maps matter most.', ko: '한국어 페이지가 네이버에도 색인될 수 있도록 최적화합니다. 다만 뉴저지 현지 고객에게는 구글과 구글 지도가 가장 중요합니다.' } },
      { q: { en: 'How do we start?', ko: '어떻게 시작하나요?' }, a: { en: 'Request a free audit of your current site or message us on KakaoTalk. We reply with a plan and a published-price quote.', ko: '현재 사이트 무료 진단을 신청하거나 카카오톡으로 메시지를 보내주세요. 계획과 공개 가격 기준 견적으로 답변드립니다.' } },
    ],
    areaServed: BERGEN_CORE,
    geo: { lat: 40.9263, lng: -74.0770, zip: '07601', city: 'Hackensack' },
    related: ['palisades-park', 'englewood-cliffs', 'leonia', 'pos-vs-studio'],
  },
  {
    key: 'pos-vs-studio',
    slug: 'pos-company-website-vs-web-studio',
    koSlug: '포스-업체-홈페이지-vs-전문-제작',
    kind: 'guide',
    title: {
      en: 'POS Company Website vs. Web Studio: What to Ask | ZOE LUMOS',
      ko: '포스(POS) 업체 홈페이지 vs 전문 제작 업체 — 계약 전 확인할 것 | 조이루모스',
    },
    description: {
      en: 'Your card processor offers a website too. An honest comparison of POS-bundled sites and independent studios: ownership, SEO, speed and switching costs.',
      ko: '카드 결제·포스 업체가 홈페이지도 만들어 준다면? 포스 패키지 홈페이지와 전문 제작 업체를 소유권, SEO, 속도, 이중언어, 해지 비용 기준으로 솔직하게 비교합니다.',
    },
    eyebrow: { en: 'Buyer\'s guide', ko: '계약 전 가이드' },
    h1: { en: 'Website from your POS company, or from a web studio?', ko: '홈페이지, 포스 업체에 맡길까 전문 업체에 맡길까?' },
    lede: {
      en: 'Many card-processing and POS companies now offer a website as part of the package. That can be convenient. It can also leave your domain, your Google rankings and your site tied to a payment contract. Here is how to tell the difference before you sign.',
      ko: '요즘 많은 카드 결제·포스 업체가 패키지에 홈페이지를 포함합니다. 편리할 수 있습니다. 하지만 도메인, 구글 순위, 사이트가 결제 계약에 묶일 수도 있습니다. 계약 전에 구분하는 방법을 정리했습니다.',
    },
    answers: [
      { q: { en: 'Is a POS-bundled website a bad idea?', ko: '포스 업체 홈페이지는 피해야 하나요?' }, a: { en: 'Not necessarily. It can work if you own the domain and content, can export the site, and the site is fast and indexable. Problems start when the site, domain or ordering page cannot leave with you if you change processors.', ko: '꼭 그렇지 않습니다. 도메인과 콘텐츠를 고객이 소유하고, 사이트를 가져갈 수 있고, 빠르고 검색 색인이 된다면 괜찮습니다. 문제는 결제 업체를 바꿀 때 사이트, 도메인, 주문 페이지를 가져갈 수 없을 때 생깁니다.' } },
      { q: { en: 'What should I ask before signing?', ko: '계약 전 무엇을 물어봐야 하나요?' }, a: { en: 'Whose name is the domain registered in? Can I export the site? Is the website billed separately from processing? What happens to the site if I cancel the processing contract? Can I see pages they built that rank on Google?', ko: '도메인은 누구 명의로 등록되나요? 사이트를 내보낼 수 있나요? 홈페이지 비용이 결제 수수료와 별도인가요? 결제 계약을 해지하면 사이트는 어떻게 되나요? 구글에 노출되는 실제 제작 사례를 볼 수 있나요?' } },
      { q: { en: 'What does an independent studio cost?', ko: '전문 제작 업체 비용은?' }, a: { en: 'At ZOE LUMOS, builds are $500–$2,400 and care plans $49–$499 a month, published openly and independent of how you process payments.', ko: '조이루모스는 제작 $500–$2,400, 월 관리 $49–$499로 공개되어 있으며, 어떤 결제 업체를 쓰든 상관없습니다.' } },
      { q: { en: 'Can I keep my POS and still use an independent website?', ko: '포스는 그대로 쓰고 홈페이지만 따로 할 수 있나요?' }, a: { en: 'Yes. Most POS systems have an online-ordering page or API; the website links to it or integrates it, so you keep the POS you like.', ko: '네. 대부분의 포스에는 온라인 주문 페이지나 API가 있어 홈페이지에서 연결하거나 연동합니다. 쓰던 포스를 그대로 유지하시면 됩니다.' } },
    ],
    context: {
      heading: { en: 'The trade-off, honestly', ko: '솔직한 비교' },
      paras: [
        { en: 'A bundled website is attractive because it is one vendor and one bill, and online ordering usually works on day one. For a business that only needs a menu and hours, that may be enough.', ko: '패키지 홈페이지의 장점은 업체 하나, 청구서 하나, 그리고 첫날부터 온라인 주문이 된다는 점입니다. 메뉴와 영업시간만 필요한 업소라면 충분할 수도 있습니다.' },
        { en: 'The risks are about control. If the domain is registered to the vendor, or the site lives on their platform with no export, changing processors can mean losing your website and the Google rankings it earned. Template sites can also be slow and rarely ship fully bilingual pages with separate Korean and English SEO.', ko: '위험은 통제권에 있습니다. 도메인이 업체 명의이거나 내보내기가 안 되는 플랫폼에 사이트가 있다면, 결제 업체를 바꿀 때 홈페이지와 그동안 쌓은 구글 순위를 잃을 수 있습니다. 템플릿 사이트는 느린 경우가 많고, 한국어·영어 SEO를 따로 갖춘 완전한 이중언어 페이지를 제공하는 경우는 드뭅니다.' },
        { en: 'An independent studio separates the two decisions: you choose a processor on fees and service, and a website on design, speed and search results — and either can change without the other.', ko: '전문 제작 업체를 쓰면 두 결정을 분리할 수 있습니다: 결제 업체는 수수료와 서비스로, 홈페이지는 디자인·속도·검색 성과로 고르고, 어느 하나를 바꿔도 다른 하나는 그대로입니다.' },
      ],
    },
    builds: {
      heading: { en: 'Side by side', ko: '항목별 비교' },
      items: [
        { t: { en: 'Domain ownership', ko: '도메인 소유' }, d: { en: 'Bundle: check the contract — sometimes the vendor\'s. Independent studio (ZOE LUMOS): always registered in your name.', ko: '패키지: 계약서 확인 필요 — 업체 명의인 경우도 있음. 전문 업체(조이루모스): 항상 고객 명의.' } },
        { t: { en: 'If you switch', ko: '업체를 바꿀 때' }, d: { en: 'Bundle: the site may go with the processing contract. Studio: the site is yours regardless of how you take payments.', ko: '패키지: 결제 계약과 함께 사이트가 사라질 수 있음. 전문 업체: 결제 방식과 관계없이 사이트는 고객 소유.' } },
        { t: { en: 'Search performance', ko: '검색 성과' }, d: { en: 'Bundle: varies; ask for live examples. Studio: we publish results — TJ Flowers, 5× search visibility in six weeks.', ko: '패키지: 업체마다 다름, 실제 사례 확인 필요. 전문 업체: 성과 공개 — TJ Flowers 6주 만에 검색 노출 5배.' } },
        { t: { en: 'Bilingual pages', ko: '이중언어 페이지' }, d: { en: 'Bundle: often one language or a translated copy. Studio: separate Korean and English pages, each with its own SEO.', ko: '패키지: 한 언어이거나 번역본인 경우가 많음. 전문 업체: 한국어·영어 별도 페이지, 각각 SEO.' } },
        { t: { en: 'Pricing', ko: '가격' }, d: { en: 'Bundle: often folded into processing — ask for the website line item. Studio: $500–$2,400 build, $49–$499/mo, published.', ko: '패키지: 결제 수수료에 포함되는 경우가 많음 — 홈페이지 항목을 따로 확인. 전문 업체: 제작 $500–$2,400, 월 $49–$499 공개.' } },
      ],
    },
    faqs: [
      { q: { en: 'My POS company already built my site. Can you take it over?', ko: '포스 업체가 이미 홈페이지를 만들어 줬는데 넘겨받을 수 있나요?' }, a: { en: 'If you control the domain, yes — we rebuild on your own hosting and redirect old URLs. If the vendor controls the domain, we help you request the transfer first.', ko: '도메인을 고객이 관리한다면 가능합니다 — 고객 호스팅에 새로 만들고 기존 URL을 리다이렉트합니다. 업체가 도메인을 관리한다면 먼저 이전 요청을 도와드립니다.' } },
      { q: { en: 'Do you sell card processing or POS?', ko: '조이루모스도 카드 결제나 포스를 판매하나요?' }, a: { en: 'No. We only build and run websites, so our advice on payments is not tied to a commission.', ko: '아니요. 저희는 홈페이지 제작·관리만 하므로 결제 관련 조언이 수수료와 연결되지 않습니다.' } },
      { q: { en: 'Will an independent site work with Toast, Clover or Square?', ko: 'Toast, Clover, Square와도 연동되나요?' }, a: { en: 'Yes. These platforms offer online-ordering pages or integrations; we link or embed them so orders go straight to your POS.', ko: '네. 이런 플랫폼은 온라인 주문 페이지나 연동 기능을 제공하며, 주문이 바로 포스로 들어가도록 연결하거나 삽입합니다.' } },
    ],
    areaServed: ['Fort Lee', 'Palisades Park', 'Englewood Cliffs', 'Leonia', 'Bergen County', 'New Jersey'],
    related: ['englewood-cliffs', 'palisades-park', 'leonia', 'bergen-county'],
  },
]

export const localSeoByKey = Object.fromEntries(localSeoPages.map((p) => [p.key, p])) as Record<string, LocalSeoEntry>
export const localSeoBySlug = (slug: string) => localSeoPages.find((p) => p.slug === slug)
