// Korean-American city hub data for landing pages
// Used by KoreanCityPage template to generate SEO-rich pages per region.

export type CityData = {
  slug: string // English URL slug
  koSlug: string // Korean URL slug
  city: { en: string; ko: string; koAlt?: string[] }
  region: { en: string; ko: string }
  koreanPopulation: string
  neighborhoods: Array<{ en: string; ko: string; koreanPct?: string; note?: string }>
  nearbyHubs?: string[] // slugs for internal linking
  coords: { lat: string; lng: string }
  hubDescription: { en: string; ko: string }
  proofPoints: { en: string[]; ko: string[] }
  theme: 'rose' | 'blue' | 'emerald' | 'amber' | 'violet' | 'teal' | 'orange' | 'indigo'
}

export const koreanCities: CityData[] = [
  {
    slug: 'los-angeles-korean-web-design',
    koSlug: '엘에이-웹사이트-제작',
    city: { en: 'Los Angeles', ko: '엘에이', koAlt: ['LA', '로스앤젤레스'] },
    region: { en: 'California', ko: '캘리포니아' },
    koreanPopulation: '326,000+ Korean Americans (largest in US)',
    coords: { lat: '34.0617', lng: '-118.3079' }, // Koreatown
    hubDescription: {
      en: "Home to America's largest Koreatown. LA's K-town generates billions in Korean-American commerce across restaurants, beauty, legal, and real estate.",
      ko: '미국 최대 한인타운이 있는 LA 코리아타운. 식당, 뷰티, 법률, 부동산 등 한인 경제의 중심지.',
    },
    proofPoints: {
      en: ['Largest Korean-American population in US', 'Koreatown + OC K-hub', 'Bilingual since 2015'],
      ko: ['미국 최대 한인 인구', '코리아타운 + OC 한인타운', '2015년부터 이중언어 전문'],
    },
    neighborhoods: [
      { en: 'Koreatown', ko: '코리아타운', koreanPct: '32%', note: 'K-town HQ' },
      { en: 'Los Angeles', ko: 'LA 전역' },
      { en: 'Fullerton', ko: '풀러튼', koreanPct: '15%' },
      { en: 'Garden Grove', ko: '가든그로브', koreanPct: '12%' },
      { en: 'Irvine', ko: '어바인', koreanPct: '11%' },
      { en: 'Cerritos', ko: '세리토스', koreanPct: '14%' },
      { en: 'La Palma', ko: '라팔마', koreanPct: '18%' },
      { en: 'Buena Park', ko: '부에나파크', koreanPct: '10%' },
    ],
    theme: 'amber',
  },
  {
    slug: 'atlanta-korean-web-design',
    koSlug: '애틀랜타-웹사이트-제작',
    city: { en: 'Atlanta', ko: '애틀랜타' },
    region: { en: 'Georgia', ko: '조지아' },
    koreanPopulation: '100,000+ Korean Americans (fastest-growing Southeast hub)',
    coords: { lat: '34.0007', lng: '-84.1497' }, // Duluth
    hubDescription: {
      en: 'Atlanta metro — Duluth, Suwanee, Johns Creek — is the fastest-growing Korean-American community in the Southeast, with major K-dramas in retail and food.',
      ko: '덜루스, 수와니, 존스크릭 중심의 애틀랜타 메트로는 미 남부에서 가장 빠르게 성장하는 한인 커뮤니티.',
    },
    proofPoints: {
      en: ['Southeast US #1 Korean market', 'Gwinnett County K-belt', 'Duluth & Suwanee coverage'],
      ko: ['미 남부 #1 한인 시장', '귀넷 카운티 한인 벨트', '덜루스 & 수와니 전담'],
    },
    neighborhoods: [
      { en: 'Duluth', ko: '덜루스', koreanPct: '22%', note: 'K-hub HQ' },
      { en: 'Suwanee', ko: '수와니', koreanPct: '15%' },
      { en: 'Johns Creek', ko: '존스크릭', koreanPct: '18%' },
      { en: 'Norcross', ko: '노크로스', koreanPct: '10%' },
      { en: 'Lawrenceville', ko: '로렌스빌', koreanPct: '8%' },
      { en: 'Gwinnett County', ko: '귀넷카운티' },
      { en: 'Alpharetta', ko: '알파레타', koreanPct: '7%' },
      { en: 'Atlanta', ko: '애틀랜타 전역' },
    ],
    theme: 'orange',
  },
  {
    slug: 'dallas-korean-web-design',
    koSlug: '달라스-웹사이트-제작',
    city: { en: 'Dallas', ko: '달라스', koAlt: ['댈러스'] },
    region: { en: 'Texas', ko: '텍사스' },
    koreanPopulation: '75,000+ Korean Americans in DFW metroplex',
    coords: { lat: '32.9537', lng: '-96.8903' }, // Carrollton
    hubDescription: {
      en: 'DFW metroplex — Carrollton, Plano, Richardson — is a major Korean-American commerce hub across H Mart corridors and Korean BBQ restaurants.',
      ko: '캐롤튼, 플레이노, 리처드슨 중심의 DFW 메트로플렉스. H마트와 한식당 밀집 지역.',
    },
    proofPoints: {
      en: ['DFW Korean population 75k+', 'Carrollton K-belt', 'Bilingual support'],
      ko: ['DFW 한인 7.5만+', '캐롤튼 한인 지역', '한국어 지원'],
    },
    neighborhoods: [
      { en: 'Carrollton', ko: '캐롤튼', koreanPct: '11%', note: 'K-hub' },
      { en: 'Plano', ko: '플레이노', koreanPct: '6%' },
      { en: 'Richardson', ko: '리처드슨', koreanPct: '5%' },
      { en: 'Frisco', ko: '프리스코', koreanPct: '4%' },
      { en: 'Irving', ko: '어빙' },
      { en: 'Dallas', ko: '달라스 전역' },
      { en: 'Fort Worth', ko: '포트워스' },
      { en: 'Addison', ko: '애디슨' },
    ],
    theme: 'blue',
  },
  {
    slug: 'houston-korean-web-design',
    koSlug: '휴스턴-웹사이트-제작',
    city: { en: 'Houston', ko: '휴스턴' },
    region: { en: 'Texas', ko: '텍사스' },
    koreanPopulation: '45,000+ Korean Americans',
    coords: { lat: '29.7604', lng: '-95.3698' },
    hubDescription: {
      en: 'Houston — Spring Branch & Sugar Land Korean corridor. Major oil, medical, and small business K-community.',
      ko: '스프링브랜치와 슈거랜드 한인 상권. 오일, 의료, 소상공인 한인 커뮤니티 중심지.',
    },
    proofPoints: {
      en: ['Spring Branch Korean corridor', '45k Korean-Americans', 'Medical center coverage'],
      ko: ['스프링브랜치 한인 상권', '한인 4.5만+', '메디컬센터 전담'],
    },
    neighborhoods: [
      { en: 'Spring Branch', ko: '스프링브랜치', koreanPct: '8%', note: 'K-hub' },
      { en: 'Sugar Land', ko: '슈거랜드', koreanPct: '5%' },
      { en: 'Katy', ko: '케이티' },
      { en: 'The Woodlands', ko: '우드랜즈' },
      { en: 'Houston', ko: '휴스턴 전역' },
      { en: 'Pearland', ko: '펄랜드' },
    ],
    theme: 'orange',
  },
  {
    slug: 'chicago-korean-web-design',
    koSlug: '시카고-웹사이트-제작',
    city: { en: 'Chicago', ko: '시카고' },
    region: { en: 'Illinois', ko: '일리노이' },
    koreanPopulation: '62,000+ Korean Americans in Chicagoland',
    coords: { lat: '42.0311', lng: '-87.7678' }, // Niles
    hubDescription: {
      en: 'Chicagoland K-hub centered in Niles, Glenview, Skokie, and Morton Grove. Strong Korean business presence in North Shore suburbs.',
      ko: '나일즈, 글렌뷰, 스코키, 모튼그로브 중심의 시카고랜드 한인 상권. 노스쇼어 한인 비즈니스 밀집.',
    },
    proofPoints: {
      en: ['Chicagoland K-belt', 'North Shore coverage', 'Korean + English native'],
      ko: ['시카고랜드 한인 벨트', '노스쇼어 전담', '한영 네이티브'],
    },
    neighborhoods: [
      { en: 'Niles', ko: '나일즈', koreanPct: '11%', note: 'K-hub' },
      { en: 'Glenview', ko: '글렌뷰', koreanPct: '6%' },
      { en: 'Skokie', ko: '스코키', koreanPct: '5%' },
      { en: 'Morton Grove', ko: '모튼그로브', koreanPct: '7%' },
      { en: 'Schaumburg', ko: '샴버그' },
      { en: 'Chicago', ko: '시카고 전역' },
      { en: 'Arlington Heights', ko: '알링턴하이츠' },
      { en: 'Palatine', ko: '팰러타인' },
    ],
    theme: 'indigo',
  },
  {
    slug: 'boston-korean-web-design',
    koSlug: '보스턴-웹사이트-제작',
    city: { en: 'Boston', ko: '보스턴', koAlt: ['보스톤'] },
    region: { en: 'Massachusetts', ko: '매사추세츠' },
    koreanPopulation: '25,000+ Korean Americans',
    coords: { lat: '42.3601', lng: '-71.0589' },
    hubDescription: {
      en: 'Boston metro — Cambridge, Quincy, Newton, Brookline — home to students, medical professionals, and growing Korean restaurant scene.',
      ko: '케임브리지, 퀸시, 뉴턴, 브루클라인 중심의 보스턴 메트로. 유학생, 의료진, 한식당 증가세.',
    },
    proofPoints: {
      en: ['Boston metro K-community', 'University + medical focus', 'Bilingual EN/KO'],
      ko: ['보스턴 메트로 한인', '유학생 + 의료진 중심', '한영 이중언어'],
    },
    neighborhoods: [
      { en: 'Cambridge', ko: '케임브리지' },
      { en: 'Quincy', ko: '퀸시', koreanPct: '4%' },
      { en: 'Newton', ko: '뉴턴' },
      { en: 'Brookline', ko: '브루클라인' },
      { en: 'Boston', ko: '보스턴 전역' },
      { en: 'Somerville', ko: '서머빌' },
      { en: 'Burlington', ko: '벌링턴' },
      { en: 'Lexington', ko: '렉싱턴' },
    ],
    theme: 'emerald',
  },
  {
    slug: 'seattle-korean-web-design',
    koSlug: '시애틀-웹사이트-제작',
    city: { en: 'Seattle', ko: '시애틀' },
    region: { en: 'Washington', ko: '워싱턴주' },
    koreanPopulation: '75,000+ Korean Americans (Puget Sound region)',
    coords: { lat: '47.6062', lng: '-122.3321' },
    hubDescription: {
      en: 'Puget Sound K-hub across Bellevue, Lynnwood, Federal Way, and Tacoma. Major Korean tech, retail, and church community.',
      ko: '벨뷰, 린우드, 페더럴웨이, 타코마 중심의 퓨젯사운드 한인 커뮤니티. 테크, 리테일, 교회 강세.',
    },
    proofPoints: {
      en: ['Puget Sound K-belt', 'Bellevue tech focus', 'Korean church network'],
      ko: ['퓨젯사운드 한인 벨트', '벨뷰 테크 특화', '한인 교회 네트워크'],
    },
    neighborhoods: [
      { en: 'Bellevue', ko: '벨뷰', koreanPct: '7%', note: 'Tech hub' },
      { en: 'Lynnwood', ko: '린우드', koreanPct: '8%' },
      { en: 'Federal Way', ko: '페더럴웨이', koreanPct: '5%' },
      { en: 'Tacoma', ko: '타코마' },
      { en: 'Seattle', ko: '시애틀 전역' },
      { en: 'Redmond', ko: '레드몬드' },
      { en: 'Kirkland', ko: '커클랜드' },
      { en: 'Bothell', ko: '보텔' },
    ],
    theme: 'teal',
  },
  {
    slug: 'washington-dc-korean-web-design',
    koSlug: '워싱턴DC-웹사이트-제작',
    city: { en: 'Washington DC', ko: '워싱턴DC', koAlt: ['DC', '워싱턴'] },
    region: { en: 'DMV', ko: 'DMV (DC/MD/VA)' },
    koreanPopulation: '110,000+ Korean Americans across DMV',
    coords: { lat: '38.8306', lng: '-77.1969' }, // Annandale
    hubDescription: {
      en: 'DMV region — Annandale, Centreville (VA), Rockville, Ellicott City (MD) — forms one of the densest Korean-American commerce zones on the East Coast.',
      ko: '아난데일, 센터빌(버지니아), 락빌, 엘리콧시티(메릴랜드) 등 미 동부 최대 한인 상권 중 하나.',
    },
    proofPoints: {
      en: ['DMV K-hub', 'Annandale Koreatown', 'VA + MD + DC coverage'],
      ko: ['DMV 한인 중심', '아난데일 한인타운', 'VA + MD + DC 전담'],
    },
    neighborhoods: [
      { en: 'Annandale', ko: '아난데일', koreanPct: '16%', note: 'VA K-town' },
      { en: 'Centreville', ko: '센터빌', koreanPct: '13%' },
      { en: 'Fairfax', ko: '페어팩스', koreanPct: '8%' },
      { en: 'Rockville', ko: '락빌', koreanPct: '10%', note: 'MD K-hub' },
      { en: 'Ellicott City', ko: '엘리콧시티', koreanPct: '9%' },
      { en: 'Arlington', ko: '알링턴' },
      { en: 'McLean', ko: '맥린' },
      { en: 'Germantown', ko: '저먼타운' },
    ],
    theme: 'violet',
  },
  {
    slug: 'flushing-korean-web-design',
    koSlug: '플러싱-웹사이트-제작',
    city: { en: 'Flushing', ko: '플러싱' },
    region: { en: 'New York (Queens)', ko: '뉴욕 (퀸즈)' },
    koreanPopulation: '175,000+ Korean Americans in NYC metro',
    coords: { lat: '40.7675', lng: '-73.8331' },
    hubDescription: {
      en: 'NYC Flushing K-hub — Northern Blvd, Murray Hill, Bayside. High-density Korean-American commerce, professional services, and restaurants.',
      ko: '노던 블러바드, 머레이힐, 베이사이드 중심의 뉴욕 플러싱 한인타운. 한인 상권과 전문직 밀집.',
    },
    proofPoints: {
      en: ['NYC Flushing K-hub', 'Northern Blvd corridor', 'Bilingual native team'],
      ko: ['뉴욕 플러싱 한인 중심', '노던 블러바드 상권', '한영 네이티브 팀'],
    },
    neighborhoods: [
      { en: 'Flushing', ko: '플러싱', koreanPct: '18%', note: 'K-town' },
      { en: 'Murray Hill', ko: '머레이힐', koreanPct: '22%' },
      { en: 'Bayside', ko: '베이사이드', koreanPct: '16%' },
      { en: 'Manhattan K-town', ko: '맨하탄 32번가' },
      { en: 'Great Neck', ko: '그레이트넥' },
      { en: 'Long Island', ko: '롱아일랜드' },
      { en: 'Queens', ko: '퀸즈 전역' },
      { en: 'NYC', ko: '뉴욕시 전역' },
    ],
    theme: 'rose',
  },
]

export const getCityBySlug = (slug: string) => koreanCities.find(c => c.slug === slug || c.koSlug === slug)
