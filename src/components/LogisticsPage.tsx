import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Archive,
  Bell,
  ChartColumn,
  ClipboardList,
  CodeXml,
  FileCode2,
  Globe,
  Keyboard,
  Languages,
  MonitorSmartphone,
  PenTool,
  Rocket,
  Search,
  Ship,
  Truck,
  Users,
  Warehouse,
  Workflow,
} from 'lucide-react'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import ProcessTimeline, { type Step } from '@/components/us-launch/ProcessTimeline'
import PortalHero from '@/components/enterprise/PortalHero'
import EdiSequence from '@/components/enterprise/EdiSequence'
import {
  Breadcrumbs,
  CtaPanel,
  FaqList,
  IconChip,
  KAKAO,
  LandingSchema,
  SectionHead,
  type FaqItem,
  type L,
  type T,
} from '@/components/enterprise/Blocks'
import { SITE_URL } from '@/lib/siteUrl'
import { AWS_PATHS, LOGISTICS_PATHS } from '@/data/enterprise'

export { LOGISTICS_PATHS }

/**
 * Industry landing for logistics companies (3PLs, warehouses, forwarders, carriers): B2B websites, shipper
 * portals, WMS and X12 EDI integration, dashboards, on AWS. KO on a Korean slug, EN on an English slug.
 *
 * No logistics clients are named and no results are claimed; the portal and event cards are a labelled
 * sample. Third-party systems are listed as integration examples only. No prices, no phone.
 */

const ic = 'h-5 w-5'

export const LOGISTICS_META = {
  title: {
    en: 'Logistics & 3PL Websites, Shipper Portals and EDI Integration | ZOE LUMOS',
    ko: '물류·3PL 홈페이지 제작 | 화주 포털·WMS·EDI 연동 | ZOE LUMOS',
  },
  description: {
    en: 'Websites, shipper portals, WMS and X12 EDI integrations (940, 945, 943, 944) and dashboards for 3PLs, warehouses and forwarders, built on AWS from Fort Lee, NJ.',
    ko: '3PL·창고·포워딩 회사를 위한 홈페이지, 화주용 고객 포털, WMS·X12 EDI(940·945·943·944) 연동과 대시보드를 AWS 위에 구축합니다. 뉴저지 현지 팀이 한국어로 진행합니다.',
  },
}

const hero = {
  eyebrow: { en: 'For logistics & 3PL companies', ko: '물류 · 3PL 기업' },
  h1: {
    en: 'Websites, shipper portals and EDI integration for logistics companies',
    ko: '물류 회사의 홈페이지부터 화주 포털, EDI 연동까지',
  },
  intro: {
    en: 'Shippers request quotes, check inventory and orders themselves, and exchange documents with your systems over EDI and APIs. Our bilingual team in Fort Lee, New Jersey designs the websites and operating systems of 3PLs, warehouses, forwarders and carriers, and builds them on AWS.',
    ko: '화주가 견적을 요청하고, 재고와 출고 현황을 직접 확인하고, 거래처 시스템과 주문을 EDI·API로 주고받는 일까지. 뉴저지 포트리의 이중언어 팀이 3PL·창고·포워딩·운송 회사의 웹사이트와 업무 시스템을 설계하고 AWS 위에 구축합니다.',
  },
}

const facts: { icon: ReactNode; text: T }[] = [
  { icon: <Warehouse className="h-4 w-4" aria-hidden />, text: { en: 'WMS and OMS API integrations', ko: 'WMS · OMS API 연동' } },
  { icon: <FileCode2 className="h-4 w-4" aria-hidden />, text: { en: 'X12 EDI 940 · 945 · 943 · 944', ko: 'X12 EDI 940 · 945 · 943 · 944' } },
  { icon: <Users className="h-4 w-4" aria-hidden />, text: { en: 'A portal for every shipper', ko: '화주별 고객 포털' } },
  { icon: <Languages className="h-4 w-4" aria-hidden />, text: { en: 'Run in Korean and English', ko: '한국어 · 영어 진행' } },
]

const audiences: { icon: ReactNode; title: T; body: T }[] = [
  {
    icon: <Warehouse className={ic} aria-hidden />,
    title: { en: '3PL and fulfillment warehouses', ko: '3PL · 풀필먼트 창고' },
    body: {
      en: 'Shipper portals, inventory and order integrations, and billing data for ambient and cold storage.',
      ko: '상온·냉장·냉동 창고의 화주 포털, 재고·입출고 연동, 화주별 청구 데이터를 만듭니다.',
    },
  },
  {
    icon: <Ship className={ic} aria-hidden />,
    title: { en: 'Forwarders and customs brokers', ko: '포워딩 · 관세사' },
    body: {
      en: 'B2B websites with quote requests, shipment lookup and secure document upload.',
      ko: '견적 요청, 화물 조회, 서류 업로드를 갖춘 B2B 웹사이트를 만듭니다.',
    },
  },
  {
    icon: <Truck className={ic} aria-hidden />,
    title: { en: 'Trucking and last mile', ko: '트럭킹 · 라스트마일' },
    body: {
      en: 'Tracking pages and carrier data feeds that keep customers informed without a phone call.',
      ko: '전화 없이도 고객이 배송 상태를 확인하는 추적 페이지와 운송 데이터 연동을 만듭니다.',
    },
  },
  {
    icon: <Globe className={ic} aria-hidden />,
    title: { en: 'Korean brands with US logistics', ko: '미국 물류를 쓰는 한국 브랜드' },
    body: {
      en: 'Inventory and shipment data between a Korean HQ and its US 3PL, on a dashboard in Korean.',
      ko: '한국 본사와 미국 3PL 사이의 재고·출고 데이터를 한국어 대시보드로 연결합니다.',
    },
  },
]

const modules: { icon: ReactNode; title: T; body: T }[] = [
  {
    icon: <MonitorSmartphone className={ic} aria-hidden />,
    title: { en: 'B2B website and quote requests', ko: 'B2B 홈페이지 · 견적 요청' },
    body: {
      en: 'Locations, square footage, temperature zones and services, with quote requests routed straight to sales.',
      ko: '창고 위치, 면적, 온도대, 서비스를 정리하고 견적 요청(RFQ)이 영업 담당자에게 바로 가도록 만듭니다.',
    },
  },
  {
    icon: <Users className={ic} aria-hidden />,
    title: { en: 'Shipper portal', ko: '화주용 고객 포털' },
    body: {
      en: 'Order entry, inventory, inbound and outbound status, and BOL, POD and invoice downloads, with access per shipper.',
      ko: '주문 접수, 재고 조회, 입출고 현황, BOL·POD·인보이스 다운로드를 화주별 권한으로 제공합니다.',
    },
  },
  {
    icon: <Warehouse className={ic} aria-hidden />,
    title: { en: 'WMS and OMS integration', ko: 'WMS · OMS 연동' },
    body: {
      en: 'Orders and inventory synced through the API of the WMS you already run, such as Extensiv 3PL Warehouse Manager.',
      ko: 'Extensiv 3PL Warehouse Manager 등 이미 쓰고 계신 WMS의 API로 주문과 재고를 동기화합니다.',
    },
  },
  {
    icon: <FileCode2 className={ic} aria-hidden />,
    title: { en: 'EDI integration', ko: 'EDI 연동' },
    body: {
      en: 'X12 940, 945, 943, 944, 846, 856, 810 and 997 mapped per partner over SFTP or AS2, with error alerts and resends.',
      ko: 'X12 940·945·943·944·846·856·810·997을 거래처별로 매핑하고 SFTP·AS2로 연결하며, 오류 알림과 재전송까지 갖춥니다.',
    },
  },
  {
    icon: <Truck className={ic} aria-hidden />,
    title: { en: 'Carriers and marketplaces', ko: '운송사 · 쇼핑몰 연동' },
    body: {
      en: 'UPS, FedEx and USPS APIs for rates, labels and tracking; Shopify and Amazon orders flowing into the WMS.',
      ko: 'UPS·FedEx·USPS API로 요율·운송장·배송 추적을 처리하고, Shopify·Amazon 주문을 WMS로 넘깁니다.',
    },
  },
  {
    icon: <ChartColumn className={ic} aria-hidden />,
    title: { en: 'Dashboards and billing data', ko: '운영 대시보드 · 청구 데이터' },
    body: {
      en: 'Daily inbound and outbound, on-time shipping, inventory accuracy and per-shipper storage and handling charges in one view.',
      ko: '일별 입출고, 정시 출고율, 재고 정확도, 화주별 보관·작업 청구 데이터를 한 화면에 모읍니다.',
    },
  },
]

const reasons: { icon: ReactNode; title: T; body: T }[] = [
  {
    icon: <Users className={ic} aria-hidden />,
    title: { en: 'Shippers want to check for themselves', ko: '화주는 직접 확인하고 싶어 합니다' },
    body: {
      en: 'When shippers can see inventory and order status at any hour, fewer status calls and emails reach your team.',
      ko: '재고와 출고 현황을 언제든 직접 볼 수 있으면, 상태를 묻는 전화와 이메일이 줄어듭니다.',
    },
  },
  {
    icon: <FileCode2 className={ic} aria-hidden />,
    title: { en: 'Retailers require EDI compliance', ko: '리테일러는 EDI 준수를 요구합니다' },
    body: {
      en: 'Large retailers publish EDI, ASN and labeling requirements and issue chargebacks when shipments miss them.',
      ko: '대형 리테일러는 EDI·ASN·라벨 기준을 정해 두고, 기준을 어기면 차지백(벌금)을 부과합니다.',
    },
  },
  {
    icon: <Keyboard className={ic} aria-hidden />,
    title: { en: 'Retyping orders creates errors', ko: '주문을 다시 입력하면 실수가 생깁니다' },
    body: {
      en: 'Copying emailed or spreadsheet orders into the WMS by hand invites typos, missed lines and late shipments.',
      ko: '이메일·엑셀로 받은 주문을 손으로 WMS에 옮기면 오타와 누락이 생기고 출고가 늦어집니다.',
    },
  },
  {
    icon: <Search className={ic} aria-hidden />,
    title: { en: 'New business starts with a search', ko: '새 화주는 검색으로 찾아옵니다' },
    body: {
      en: 'Prospective shippers often check locations, capacity, temperature zones and supported integrations on your website before they call.',
      ko: '새 화주는 연락하기 전에 웹사이트에서 창고 위치, 면적, 온도대, 연동 가능한 시스템을 먼저 확인하는 경우가 많습니다.',
    },
  },
]

const integrations: { group: T; items: string[] }[] = [
  { group: { en: 'WMS · OMS', ko: 'WMS · OMS' }, items: ['Extensiv 3PL Warehouse Manager', 'Extensiv Integration Manager', 'ShipStation'] },
  { group: { en: 'Marketplaces', ko: '쇼핑몰' }, items: ['Shopify', 'Amazon SP-API', 'WooCommerce'] },
  { group: { en: 'Carriers', ko: '운송사' }, items: ['UPS', 'FedEx', 'USPS', 'DHL Express'] },
  { group: { en: 'Accounting', ko: '회계' }, items: ['QuickBooks Online', 'Xero'] },
  { group: { en: 'EDI transport', ko: 'EDI 연결' }, items: ['SFTP', 'AS2', 'VAN'] },
]

const awsPieces: { icon: ReactNode; title: string; text: T }[] = [
  { icon: <Workflow className={ic} aria-hidden />, title: 'AWS Transfer Family', text: { en: 'SFTP and AS2 endpoints for partners’ files', ko: '거래처 파일을 주고받는 SFTP · AS2 연결' } },
  { icon: <FileCode2 className={ic} aria-hidden />, title: 'AWS B2B Data Interchange', text: { en: 'X12 documents converted to JSON, or a custom parser', ko: 'X12 문서를 JSON으로 변환 (또는 맞춤 변환기)' } },
  { icon: <Bell className={ic} aria-hidden />, title: 'EventBridge · SQS · CloudWatch', text: { en: 'Retries, dead-letter queues and alarms when a 945 fails', ko: '재시도, DLQ 보존, 945 전송 실패 시 즉시 경보' } },
  { icon: <Archive className={ic} aria-hidden />, title: 'Amazon S3', text: { en: 'Every original EDI file archived for audits and disputes', ko: '모든 EDI 원본 파일을 보관해 감사·분쟁 때 추적' } },
]

const steps: Step[] = [
  {
    icon: <ClipboardList className={ic} aria-hidden />,
    when: { en: 'Week 1', ko: '1주차' },
    title: { en: 'Assessment', ko: '현황 진단' },
    body: {
      en: 'Your WMS and OMS, each partner’s EDI implementation guide, order volumes and the way work moves today.',
      ko: '사용 중인 WMS·OMS, 거래처별 EDI 사양서, 주문량과 현재 업무 흐름을 확인합니다.',
    },
  },
  {
    icon: <PenTool className={ic} aria-hidden />,
    when: { en: 'Weeks 2–3', ko: '2~3주차' },
    title: { en: 'Design and mapping', ko: '설계 · 매핑' },
    body: {
      en: 'Data mappings, portal screens in Figma, and the AWS architecture with a monthly cost estimate.',
      ko: '데이터 매핑표, Figma 포털 시안, AWS 아키텍처와 월 예상 비용을 확정합니다.',
    },
  },
  {
    icon: <CodeXml className={ic} aria-hidden />,
    when: { en: 'Weeks 4–7', ko: '4~7주차' },
    title: { en: 'Build and partner testing', ko: '구축 · 거래처 테스트' },
    body: {
      en: 'We build the integrations and portal, then exchange test documents with each partner until they pass.',
      ko: '연동과 포털을 만들고, 거래처 테스트 환경과 EDI 문서를 주고받으며 통과할 때까지 검증합니다.',
    },
  },
  {
    icon: <Rocket className={ic} aria-hidden />,
    when: { en: 'Week 8', ko: '8주차' },
    title: { en: 'Cutover and training', ko: '전환 · 교육' },
    body: {
      en: 'Go-live on a written cutover plan, team training and monitoring from day one.',
      ko: '전환 계획에 따라 운영을 시작하고, 담당자 교육과 모니터링을 진행합니다.',
    },
  },
]

export const LOGISTICS_FAQ: FaqItem[] = [
  {
    q: { en: 'Do we have to replace our WMS?', ko: '지금 쓰는 WMS를 바꿔야 하나요?' },
    a: {
      en: 'No. We connect to the API and EDI features of the WMS you already run, such as Extensiv 3PL Warehouse Manager. Nothing assumes a replacement.',
      ko: '아니요. Extensiv 3PL Warehouse Manager 같은 기존 WMS의 API·EDI 기능에 연결합니다. 교체를 전제로 하지 않습니다.',
    },
  },
  {
    q: { en: 'Every trading partner has different EDI specs. Can you handle that?', ko: '거래처마다 EDI 사양이 다른데 대응할 수 있나요?' },
    a: {
      en: 'Yes. We map each partner from its implementation guide, exchange test documents in the partner’s test environment, and only then switch to production.',
      ko: '네. 거래처별 사양서(Implementation Guide)를 기준으로 매핑하고, 거래처 테스트 환경에서 문서를 주고받아 검증한 뒤 운영으로 전환합니다.',
    },
  },
  {
    q: { en: 'Do we need a VAN?', ko: 'VAN을 꼭 써야 하나요?' },
    a: {
      en: 'It depends on your partners. We can connect directly over SFTP or AS2, or keep the VAN you already use.',
      ko: '거래처 요구에 따라 다릅니다. SFTP·AS2로 직접 연결할 수도 있고, 이미 쓰고 계신 VAN을 그대로 쓸 수도 있습니다.',
    },
  },
  {
    q: { en: 'Can each shipper see only its own data?', ko: '화주별로 볼 수 있는 데이터를 나눌 수 있나요?' },
    a: {
      en: 'Yes. The portal separates data by shipper, and within each shipper you can set permissions per user.',
      ko: '네. 고객 포털은 화주별로 데이터를 분리하고, 화주 안에서도 사용자별 권한을 나눌 수 있습니다.',
    },
  },
  {
    q: { en: 'Can we start with just the website?', ko: '홈페이지만 먼저 만들 수 있나요?' },
    a: {
      en: 'Yes. You can open the B2B website and quote form first, then add the portal and integrations in phases.',
      ko: '네. B2B 홈페이지와 견적 요청 폼을 먼저 열고, 포털과 연동은 단계적으로 추가할 수 있습니다.',
    },
  },
  {
    q: { en: 'Can our Korean HQ or Korean shippers use it in Korean?', ko: '한국 본사나 한국 화주도 한국어로 쓸 수 있나요?' },
    a: {
      en: 'Yes. Portals and dashboards can be built in Korean and English.',
      ko: '네. 포털과 대시보드를 한국어·영어로 만들 수 있습니다.',
    },
  },
  {
    q: { en: 'How will we know if a document fails?', ko: '전송이 실패하면 어떻게 아나요?' },
    a: {
      en: 'A CloudWatch alarm notifies your team, and the failed document is kept so it can be resent once the cause is fixed. Monitoring can also be covered by a monthly care plan.',
      ko: 'CloudWatch 경보가 담당자에게 알리고, 실패한 문서는 보존해 원인을 고친 뒤 다시 보냅니다. 월 운영 플랜으로 모니터링을 맡기실 수도 있습니다.',
    },
  },
  {
    q: { en: 'How long does it take, and what does it cost?', ko: '기간과 비용은 어떻게 되나요?' },
    a: {
      en: 'It depends on the number of systems and trading partners and the portal features you need. After the first call you receive an itemized quote and schedule in writing. AWS bills its usage to you directly.',
      ko: '연동할 시스템과 거래처 수, 포털 기능에 따라 달라집니다. 첫 미팅 후 항목별 견적과 일정을 서면으로 드리며, AWS 사용료는 AWS가 고객사에 직접 청구합니다.',
    },
  },
]

export default function LogisticsPage({ locale }: { locale: L }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  return (
    <>
      <LandingSchema
        locale={locale}
        paths={LOGISTICS_PATHS}
        siteUrl={SITE_URL}
        name={{ en: 'Websites, shipper portals and EDI integration for logistics companies', ko: '물류·3PL 기업 홈페이지 · 화주 포털 · EDI 연동' }}
        serviceType={{ en: 'Logistics website, customer portal and system integration development', ko: '물류 기업 웹사이트, 고객 포털, 시스템 연동 개발' }}
        description={LOGISTICS_META.description}
        audience="Third-party logistics providers, warehouses, freight forwarders, customs brokers and carriers"
        offers={modules.map((m) => m.title)}
        faq={LOGISTICS_FAQ}
        crumb={hero.eyebrow}
      />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        {/* Hero */}
        <section className="container-edge pt-28 md:pt-40 pb-14 md:pb-24">
          <Breadcrumbs locale={locale} current={hero.eyebrow[locale]} />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-6">
              <p className="mb-5 text-[14px] font-semibold text-[var(--gold)]">{hero.eyebrow[locale]}</p>
              <h1 className="font-display text-[clamp(2.1rem,7.4vw,3.6rem)] lg:text-[clamp(2.5rem,3.8vw,3.75rem)] leading-[1.08] tracking-luxury text-ink text-balance">
                {hero.h1[locale]}
              </h1>
              <p className="mt-7 max-w-xl text-[16px] md:text-[18px] leading-[1.7] text-graphite">{hero.intro[locale]}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={`${prefix}/contact`} className="btn-ink">
                  {isKo ? '물류 시스템 상담' : 'Talk to us about your operation'}
                  <span className="arrow">→</span>
                </Link>
                <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  {isKo ? '카카오톡 상담' : 'Chat on KakaoTalk'}
                </a>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {facts.map((f) => (
                  <li key={f.text.en} className="flex items-center gap-3 text-[14.5px] text-graphite">
                    <IconChip size="sm">{f.icon}</IconChip>
                    {f.text[locale]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <PortalHero locale={locale} />
            </div>
          </div>
        </section>

        {/* Document flow */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow="EDI · API"
            title={isKo ? '주문부터 출고 확정까지, 문서가 알아서 오갑니다' : 'From order to ship confirm, the documents move on their own'}
            intro={
              isKo
                ? '화주와 리테일러가 보내는 EDI를 WMS로 받아 처리하고, 결과를 다시 EDI로 돌려보냅니다. 운송사와는 API로 운송장을 발행하고 배송을 추적합니다.'
                : 'EDI from shippers and retailers lands in your WMS, and the results go back as EDI. Carriers are handled over their APIs for labels and tracking.'
            }
          />
          <EdiSequence locale={locale} />
        </section>

        {/* Who it's for */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead eyebrow={isKo ? '대상' : 'Who it is for'} title={isKo ? '이런 물류 회사와 함께합니다' : 'Built for the companies that move goods'} />
          <ul data-reveal-group className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {audiences.map((a) => (
              <li key={a.title.en} className="ul-panel rounded-[24px] p-6">
                <IconChip>{a.icon}</IconChip>
                <h3 className="mt-6 text-[18px] md:text-[19px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">{a.title[locale]}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-graphite">{a.body[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* What we build */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? '만드는 것' : 'What we build'}
            title={isKo ? '영업부터 출고, 청구까지 이어지는 시스템' : 'From the first quote to the last invoice'}
          />
          <ul data-reveal-group className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {modules.map((m, i) => (
              <li key={m.title.en} className="ul-panel rounded-[24px] p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <IconChip>{m.icon}</IconChip>
                  <span className="text-[13px] font-semibold text-ash tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-[19px] md:text-[21px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">{m.title[locale]}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-graphite">{m.body[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Why */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead eyebrow={isKo ? '왜 지금인가' : 'Why it matters'} title={isKo ? '전화와 엑셀로 버티기 어려운 이유' : 'Why phones and spreadsheets stop scaling'} />
          <ul data-reveal-group className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {reasons.map((r, i) => (
              <li key={r.title.en} className="ul-panel rounded-[24px] p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <IconChip>{r.icon}</IconChip>
                  <span className="text-[13px] font-semibold text-ash tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-[19px] md:text-[21px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">{r.title[locale]}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-graphite">{r.body[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Integrations */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? '연동 대상' : 'Integrations'}
            title={isKo ? '이미 쓰고 있는 시스템에 연결합니다' : 'We connect to the systems you already use'}
          />
          <div data-reveal-group className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 md:gap-4">
            {integrations.map((g) => (
              <div key={g.group.en} className="ul-panel rounded-[20px] p-5">
                <p className="text-[12px] font-semibold text-[var(--gold)]">{g.group[locale]}</p>
                <ul className="mt-3 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="text-[14.5px] leading-snug text-ink">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-ash">
            {isKo
              ? '연동 대상의 예시입니다. 목록에 없어도 문서화된 API, EDI 사양, 파일 형식이 있으면 연결을 검토합니다. 각 상표는 해당 소유자의 것입니다.'
              : 'Examples only. If a system has a documented API, EDI spec or file format, we can review connecting it. Trademarks belong to their owners.'}
          </p>
        </section>

        {/* AWS foundation */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead
                eyebrow={isKo ? 'AWS 인프라' : 'On AWS'}
                title={isKo ? 'AWS 위에, 고객사 소유로' : 'Built on AWS, owned by you'}
                intro={
                  isKo
                    ? '연동은 고객사 명의의 AWS 계정에 만듭니다. 문서 하나가 실패해도 보존되고, 담당자가 바로 알 수 있게 설계합니다.'
                    : 'Integrations run in an AWS account your company owns, designed so that a failed document is kept and the right person hears about it right away.'
                }
              />
              <Link href={isKo ? AWS_PATHS.ko : AWS_PATHS.en} className="btn-ghost -mt-4 inline-block md:-mt-6">
                {isKo ? 'AWS · API 연동 · 대시보드 자세히 보기 →' : 'More on AWS, APIs and dashboards →'}
              </Link>
            </div>
            <ul data-reveal-group className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7 md:gap-4">
              {awsPieces.map((p) => (
                <li key={p.title} className="ul-panel rounded-[20px] p-5">
                  <IconChip>{p.icon}</IconChip>
                  <p className="mt-5 text-[15px] font-semibold text-ink">{p.title}</p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-graphite">{p.text[locale]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? '진행 방식' : 'Process'}
            title={isKo ? '진단부터 전환까지, 네 단계' : 'From assessment to cutover, in four steps'}
            intro={
              isKo
                ? '거래처 테스트 일정에 따라 기간이 달라집니다. 홈페이지만 먼저 열고 포털과 연동을 단계적으로 붙일 수도 있습니다.'
                : 'Partner testing schedules drive the timeline. You can also open the website first and add the portal and integrations in phases.'
            }
          />
          <ProcessTimeline steps={steps} locale={locale} />
        </section>

        {/* FAQ */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead title={isKo ? '자주 묻는 질문' : 'Frequently asked questions'} />
          <FaqList items={LOGISTICS_FAQ} locale={locale} />
        </section>

        {/* CTA */}
        <section className="container-edge pb-24 md:pb-32">
          <CtaPanel
            locale={locale}
            line={{
              en: 'Tell us which WMS you run and what your trading partners require. We will outline the integration scope and schedule, in Korean or English.',
              ko: '사용 중인 WMS와 거래처의 EDI 요구사항을 알려주시면, 연동 범위와 일정을 한국어로 정리해 드립니다.',
            }}
          />
          <p className="mt-8 text-center text-[12px] text-ash">
            {isKo
              ? 'Amazon Web Services, AWS 및 관련 서비스명은 Amazon.com, Inc. 또는 그 계열사의 상표입니다.'
              : 'Amazon Web Services, AWS and related service names are trademarks of Amazon.com, Inc. or its affiliates.'}
          </p>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
