/**
 * City market data for industry × city crossover pages.
 * Each city has Korean community context; crossover page combines
 * this with the matching industry from industriesData.
 */

export type CityMarket = {
  slug: { en: string; ko: string }
  name: { en: string; ko: string }
  fullName: { en: string; ko: string }
  state: { en: string; ko: string }
  stateCode: string
  region: { en: string; ko: string }
  neighborhoods: { en: string[]; ko: string[] }
  context: { en: string; ko: string }
  koreanPopulation: string
  mainCorridors: { en: string; ko: string }
  lat: number
  lon: number
}

export const cityMarkets: CityMarket[] = [
  {
    slug: { en: 'fort-lee-nj', ko: '포트리' },
    name: { en: 'Fort Lee', ko: '포트리' },
    fullName: { en: 'Fort Lee, NJ', ko: '포트리, 뉴저지' },
    state: { en: 'New Jersey', ko: '뉴저지' },
    stateCode: 'NJ',
    region: { en: 'Bergen County', ko: '버겐 카운티' },
    neighborhoods: {
      en: ['Palisades Park', 'Leonia', 'Edgewater', 'Ridgefield'],
      ko: ['팰팍', '리오니아', '에지워터', '리지필드'],
    },
    context: {
      en: 'Fort Lee is the densest Korean-American business market on the East Coast. Korean residents make up close to 40% of the town, and Korean-owned restaurants, salons, dental practices, and hagwons line Main Street and Center Avenue. Visibility here is hyper-local — your next customer lives three blocks away.',
      ko: '포트리는 동부 해안에서 가장 밀도 높은 한인 비즈니스 시장입니다. 한인 주민이 전체 인구의 약 40%를 차지하며, Main Street와 Center Avenue를 따라 한식당 · 뷰티샵 · 치과 · 학원이 줄지어 있습니다. 이 지역의 검색 노출은 극도로 지역적 — 다음 고객은 세 블록 밖에 삽니다.',
    },
    koreanPopulation: '40%',
    mainCorridors: {
      en: 'Main Street · Center Avenue · Palisade Avenue',
      ko: '메인 스트리트 · 센터 에비뉴 · 팰리세이드 에비뉴',
    },
    lat: 40.85,
    lon: -73.98,
  },
  {
    slug: { en: 'flushing-ny', ko: '플러싱' },
    name: { en: 'Flushing', ko: '플러싱' },
    fullName: { en: 'Flushing, Queens, NY', ko: '플러싱, 퀸즈, 뉴욕' },
    state: { en: 'New York', ko: '뉴욕' },
    stateCode: 'NY',
    region: { en: 'Queens', ko: '퀸즈' },
    neighborhoods: {
      en: ['Bayside', 'Douglaston', 'Little Neck', 'Auburndale'],
      ko: ['베이사이드', '더글라스톤', '리틀넥', '오번데일'],
    },
    context: {
      en: "Flushing is the largest Koreatown in New York and one of the most competitive Korean-American food, health, and retail markets in the US. Murray Hill and Northern Boulevard are dense with Korean BBQ, specialty dental, SAT hagwons, and K-beauty stores. Ranking here means beating 20+ established local Korean businesses for every keyword.",
      ko: '플러싱은 뉴욕 최대의 코리아타운이자 미국에서 가장 경쟁이 치열한 한인 음식 · 의료 · 리테일 시장 중 하나입니다. Murray Hill과 Northern Boulevard를 따라 한식 BBQ, 전문 치과, SAT 학원, K-뷰티 매장이 밀집합니다. 여기서 상위 노출되려면 모든 키워드에서 20개 이상의 기존 한인 비즈니스를 이겨야 합니다.',
    },
    koreanPopulation: '35%',
    mainCorridors: {
      en: 'Northern Boulevard · Murray Hill · Main Street',
      ko: '노던 블러바드 · 머레이 힐 · 메인 스트리트',
    },
    lat: 40.76,
    lon: -73.83,
  },
  {
    slug: { en: 'palisades-park-nj', ko: '팰팍' },
    name: { en: 'Palisades Park', ko: '팰팍' },
    fullName: { en: 'Palisades Park, NJ', ko: '팰리세이드 파크, 뉴저지' },
    state: { en: 'New Jersey', ko: '뉴저지' },
    stateCode: 'NJ',
    region: { en: 'Bergen County', ko: '버겐 카운티' },
    neighborhoods: {
      en: ['Fort Lee', 'Leonia', 'Ridgefield'],
      ko: ['포트리', '리오니아', '리지필드'],
    },
    context: {
      en: "Palisades Park has the highest percentage of Korean-American residents of any US town — over 50% identify as Korean. Every storefront on Broad Avenue and Grand Avenue is a Korean-owned business. This is a mom-and-pop market where reputation and word-of-mouth dominate, and a website is your first impression before the neighbors start talking.",
      ko: '팰팍은 미국 전체에서 한인 인구 비율이 가장 높은 마을 — 50% 이상이 한국계입니다. Broad Avenue와 Grand Avenue의 모든 매장은 한인 소유입니다. 이 시장은 평판과 입소문이 지배하는 동네 사업 시장이며, 웹사이트는 이웃들이 이야기를 시작하기 전 당신의 첫인상입니다.',
    },
    koreanPopulation: '50%+',
    mainCorridors: {
      en: 'Broad Avenue · Grand Avenue · Edsall Boulevard',
      ko: '브로드 애비뉴 · 그랜드 애비뉴 · 엣솔 블러바드',
    },
    lat: 40.85,
    lon: -73.99,
  },
  {
    slug: { en: 'la-koreatown', ko: 'LA-코리아타운' },
    name: { en: 'LA Koreatown', ko: 'LA 코리아타운' },
    fullName: { en: 'Koreatown, Los Angeles, CA', ko: 'LA 코리아타운, 캘리포니아' },
    state: { en: 'California', ko: '캘리포니아' },
    stateCode: 'CA',
    region: { en: 'Los Angeles County', ko: '로스앤젤레스 카운티' },
    neighborhoods: {
      en: ['Wilshire Center', 'Mid-Wilshire', 'Little Armenia', 'Western'],
      ko: ['윌셔 센터', '미드윌셔', '웨스턴'],
    },
    context: {
      en: "LA Koreatown is the largest Korean community in the United States — a 24-hour city within a city. Wilshire Boulevard, Olympic Boulevard, and Vermont Avenue are dense with Korean BBQ, K-beauty flagships, karaoke bars, hagwons, and medical clinics. The market is huge, the competition is fierce, and the websites that win are the ones that load fast on a phone at 2am.",
      ko: 'LA 코리아타운은 미국 최대의 한인 커뮤니티 — 도시 안의 24시간 도시입니다. Wilshire Boulevard, Olympic Boulevard, Vermont Avenue를 따라 한식 BBQ, K-뷰티 플래그십, 노래방, 학원, 의원이 밀집합니다. 시장은 거대하고 경쟁은 치열하며, 이기는 웹사이트는 새벽 2시에 휴대폰에서 빠르게 뜨는 사이트입니다.',
    },
    koreanPopulation: '~120,000',
    mainCorridors: {
      en: 'Wilshire Blvd · Olympic Blvd · Vermont Avenue',
      ko: '윌셔 불러바드 · 올림픽 불러바드 · 버몬트 에비뉴',
    },
    lat: 34.05,
    lon: -118.3,
  },
  {
    slug: { en: 'atlanta-duluth-ga', ko: '애틀랜타-둘루스' },
    name: { en: 'Atlanta + Duluth', ko: '애틀랜타 · 둘루스' },
    fullName: { en: 'Atlanta + Duluth, GA', ko: '애틀랜타 · 둘루스, 조지아' },
    state: { en: 'Georgia', ko: '조지아' },
    stateCode: 'GA',
    region: { en: 'Gwinnett County', ko: '그위넷 카운티' },
    neighborhoods: {
      en: ['Suwanee', 'Johns Creek', 'Norcross', 'Lawrenceville'],
      ko: ['수와니', '존스크릭', '노크로스', '로렌스빌'],
    },
    context: {
      en: 'Atlanta metro is the fastest-growing Korean-American community in the Southeast. Duluth has become the de facto Korean business hub — Pleasant Hill Road and Buford Highway are the center. This is a younger, more suburban market than Fort Lee or Flushing, which means bigger parking lots, larger storefronts, and customers who research on Google Maps before they drive.',
      ko: '애틀랜타 광역권은 동남부에서 가장 빠르게 성장하는 한인 커뮤니티입니다. 둘루스가 사실상의 한인 비즈니스 허브가 되었고 — Pleasant Hill Road와 Buford Highway가 중심입니다. 포트리나 플러싱보다 젊고 더 교외적인 시장이라 — 주차장이 넓고, 매장이 크고, 고객은 운전 전에 구글 지도에서 조사합니다.',
    },
    koreanPopulation: '80,000+',
    mainCorridors: {
      en: 'Pleasant Hill Rd · Buford Highway · Satellite Blvd',
      ko: '플레전트 힐 로드 · 뷰포드 하이웨이 · 새틀라이트 블러바드',
    },
    lat: 34.0,
    lon: -84.14,
  },
]

export function cityBySlug(slug: string, locale: 'en' | 'ko'): CityMarket | undefined {
  return cityMarkets.find((c) => c.slug[locale] === slug)
}
