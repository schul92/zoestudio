import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Activity,
  CalendarCheck,
  ClipboardList,
  Cloud,
  CodeXml,
  CreditCard,
  FileCode2,
  FileSpreadsheet,
  Gauge,
  GitBranch,
  KeyRound,
  Languages,
  LayoutDashboard,
  Leaf,
  Lock,
  PenTool,
  Plug,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Unplug,
  UserX,
  Users,
  Wallet,
} from 'lucide-react'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import ProcessTimeline, { type Step } from '@/components/us-launch/ProcessTimeline'
import IntegrationMap from '@/components/enterprise/IntegrationMap'
import DashboardMock from '@/components/enterprise/DashboardMock'
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

export { AWS_PATHS }

/**
 * Enterprise capability landing: system integration on AWS (in an account the client owns) and the dashboards
 * built on top. KO on a Korean slug, EN on an English slug, hreflang-paired.
 *
 * No partner tiers, certifications or client results are claimed. The proof section lists only systems we run
 * in production ourselves (verifiable in this codebase) and the public Vito's case study. Dashboard figures are
 * a labelled sample. No prices, no phone.
 */

const ic = 'h-5 w-5'

export const AWS_META = {
  title: {
    en: 'AWS Cloud, API Integration & Business Dashboards | ZOE LUMOS',
    ko: 'AWS 클라우드 구축 · API 연동 · 대시보드 개발 | ZOE LUMOS',
  },
  description: {
    en: 'We connect commerce, warehouse, accounting and partner systems on AWS, in an account you own, and build dashboards for HQ and US teams. Run in Korean from NJ.',
    ko: '쇼핑몰·창고·회계·거래처 시스템을 고객사 명의의 AWS 계정에서 API로 연결하고, 한국 본사와 미국 현장이 함께 보는 대시보드를 만듭니다. 뉴저지 현지 팀이 한국어로 진행합니다.',
  },
}

const hero = {
  eyebrow: { en: 'AWS · API integration · Dashboards', ko: 'AWS · API 연동 · 대시보드' },
  h1: {
    en: 'Your systems, connected on AWS. Every number on one screen.',
    ko: 'AWS 위에서 시스템을 연결하고, 모든 숫자를 한 화면에 모읍니다',
  },
  intro: {
    en: 'Orders, inventory, payments, accounting and ad data scattered across separate tools? We design and build the integrations in an AWS account your company owns, then the dashboards that let your HQ and your US team work from the same numbers.',
    ko: '주문, 재고, 결제, 회계, 광고 데이터가 서로 다른 시스템에 흩어져 있나요? 고객사 명의의 AWS 계정에 API 연동을 설계·구축하고, 한국 본사와 미국 현장이 같은 숫자를 보는 대시보드를 만듭니다.',
  },
}

const facts: { icon: ReactNode; text: T }[] = [
  { icon: <KeyRound className="h-4 w-4" aria-hidden />, text: { en: 'AWS account in your company’s name', ko: '고객사 명의 AWS 계정' } },
  { icon: <ShieldCheck className="h-4 w-4" aria-hidden />, text: { en: 'Designed to the AWS Well-Architected pillars', ko: 'AWS Well-Architected 6대 원칙 기준 설계' } },
  { icon: <GitBranch className="h-4 w-4" aria-hidden />, text: { en: 'Infrastructure as code (CDK · Terraform)', ko: '인프라를 코드로 관리 (CDK · Terraform)' } },
  { icon: <Languages className="h-4 w-4" aria-hidden />, text: { en: 'Run in Korean, dashboards in Korean', ko: '한국어 진행 · 한국어 대시보드' } },
]

const pains: { icon: ReactNode; text: T }[] = [
  { icon: <FileSpreadsheet className={ic} aria-hidden />, text: { en: 'Someone copies data between systems into spreadsheets every day', ko: '매일 누군가 시스템 사이의 데이터를 엑셀로 옮겨 붙입니다' } },
  { icon: <Languages className={ic} aria-hidden />, text: { en: 'Your Korean HQ and your US entity report different numbers', ko: '한국 본사와 미국 법인이 보는 숫자가 서로 다릅니다' } },
  { icon: <Unplug className={ic} aria-hidden />, text: { en: 'Store, warehouse and accounting systems do not talk to each other', ko: '쇼핑몰, 창고, 회계 시스템이 서로 연결되어 있지 않습니다' } },
  { icon: <Plug className={ic} aria-hidden />, text: { en: 'A retailer or partner is asking for an API or EDI connection', ko: '거래처가 API나 EDI 연동을 요구합니다' } },
  { icon: <Wallet className={ic} aria-hidden />, text: { en: 'No one can say what the cloud bill is for, or who owns the account', ko: '클라우드 비용이 왜 나오는지, 계정이 누구 명의인지 모릅니다' } },
  { icon: <UserX className={ic} aria-hidden />, text: { en: 'The one developer who knew the system has left', ko: '시스템을 아는 개발자가 떠나고 아무도 모릅니다' } },
]

const pillars: { icon: ReactNode; title: T; body: T; points: T[] }[] = [
  {
    icon: <Plug className={ic} aria-hidden />,
    title: { en: 'API integration', ko: 'API 연동' },
    body: {
      en: 'We connect the systems you already run instead of replacing them, and keep data moving between them on its own.',
      ko: '이미 쓰고 있는 시스템을 바꾸지 않고 연결해, 데이터가 사람 손을 거치지 않고 오가게 만듭니다.',
    },
    points: [
      { en: 'REST and GraphQL APIs, webhooks, scheduled syncs', ko: 'REST·GraphQL API, 웹훅, 정기 동기화' },
      { en: 'Shopify, Amazon SP-API, Stripe, Square, QuickBooks Online', ko: 'Shopify, Amazon SP-API, Stripe, Square, QuickBooks Online' },
      { en: 'X12 EDI and SFTP or AS2 file exchange with partners', ko: '거래처와 X12 EDI, SFTP·AS2 파일 교환' },
      { en: 'Retries, error queues and alerts so failures are caught', ko: '재시도, 오류 대기열, 알림으로 실패를 놓치지 않음' },
    ],
  },
  {
    icon: <Cloud className={ic} aria-hidden />,
    title: { en: 'Cloud on AWS', ko: 'AWS 클라우드' },
    body: {
      en: 'Serverless-first architecture in your own AWS account, so you pay for what runs and nothing sits idle.',
      ko: '고객사 AWS 계정에 서버리스 중심으로 구성해, 쓰는 만큼만 비용이 나오고 놀고 있는 서버가 없습니다.',
    },
    points: [
      { en: 'API Gateway, Lambda, EventBridge, SQS, Step Functions', ko: 'API Gateway, Lambda, EventBridge, SQS, Step Functions' },
      { en: 'Aurora PostgreSQL, DynamoDB and S3 for data', ko: '데이터는 Aurora PostgreSQL, DynamoDB, S3' },
      { en: 'Least-privilege IAM, Secrets Manager, KMS encryption', ko: '최소 권한 IAM, Secrets Manager, KMS 암호화' },
      { en: 'Separate dev, staging and production environments', ko: '개발·검증·운영 환경 분리' },
    ],
  },
  {
    icon: <LayoutDashboard className={ic} aria-hidden />,
    title: { en: 'Dashboards', ko: '대시보드' },
    body: {
      en: 'The numbers each team needs, defined with you, on one screen that refreshes itself.',
      ko: '팀마다 꼭 봐야 할 숫자를 함께 정하고, 저절로 갱신되는 한 화면에 모읍니다.',
    },
    points: [
      { en: 'Views by role: HQ, US entity, warehouse, customers', ko: '역할별 화면: 본사, 미국 법인, 창고, 고객' },
      { en: 'Korean and English, with one-click switching', ko: '한국어·영어 화면 전환' },
      { en: 'Daily and weekly reports sent by email', ko: '매일·매주 자동 리포트 메일' },
      { en: 'Sign-in with Google or Microsoft, CSV and Excel export', ko: 'Google·Microsoft 계정 로그인, CSV·엑셀 내보내기' },
    ],
  },
]

const principles: { icon: ReactNode; title: T; body: T }[] = [
  {
    icon: <Activity className={ic} aria-hidden />,
    title: { en: 'Operational excellence', ko: '운영 우수성' },
    body: { en: 'Infrastructure as code, automated deploys and written runbooks.', ko: '인프라를 코드로 관리하고, 자동 배포와 장애 대응 절차를 문서로 남깁니다.' },
  },
  {
    icon: <Lock className={ic} aria-hidden />,
    title: { en: 'Security', ko: '보안' },
    body: { en: 'Least-privilege IAM, keys in Secrets Manager, KMS encryption and CloudTrail audit logs.', ko: '최소 권한 IAM, Secrets Manager 키 보관, KMS 암호화, CloudTrail 감사 로그.' },
  },
  {
    icon: <RefreshCw className={ic} aria-hidden />,
    title: { en: 'Reliability', ko: '안정성' },
    body: { en: 'Retries and dead-letter queues keep failed messages, plus backups and Multi-AZ databases.', ko: '실패한 메시지는 재시도·DLQ로 보존하고, 백업과 다중 가용 영역(Multi-AZ)으로 구성합니다.' },
  },
  {
    icon: <Gauge className={ic} aria-hidden />,
    title: { en: 'Performance efficiency', ko: '성능 효율성' },
    body: { en: 'Serverless pieces scale with your volume; caching only where it pays off.', ko: '서버리스 구성이 주문량에 맞춰 늘고 줄며, 필요한 곳에만 캐시를 둡니다.' },
  },
  {
    icon: <Wallet className={ic} aria-hidden />,
    title: { en: 'Cost optimization', ko: '비용 최적화' },
    body: { en: 'Pay-per-use services, cost tags per system and AWS Budgets alerts.', ko: '사용한 만큼 내는 서비스, 시스템별 비용 태그, AWS Budgets 예산 알림.' },
  },
  {
    icon: <Leaf className={ic} aria-hidden />,
    title: { en: 'Sustainability', ko: '지속 가능성' },
    body: { en: 'Right-sized managed services and Arm-based Graviton runtimes first.', ko: '필요한 만큼만 쓰는 관리형 서비스와 Arm 기반 Graviton 실행 환경을 우선합니다.' },
  },
]

const ownership: T[] = [
  { en: 'The AWS account and its billing are in your company’s name; AWS bills you directly, with no markup from us.', ko: 'AWS 계정과 결제는 고객사 명의이고, 사용료는 AWS가 고객사에 직접 청구합니다. 중간 마진은 없습니다.' },
  { en: 'We work through access you grant in IAM Identity Center, and that access is removed at handover.', ko: '저희는 IAM Identity Center로 위임받은 권한으로 작업하고, 이관할 때 권한을 회수합니다.' },
  { en: 'Code lives in your GitHub repository, with the infrastructure as CDK or Terraform code beside it.', ko: '코드는 고객사 GitHub 저장소에, 인프라는 CDK·Terraform 코드로 함께 남습니다.' },
  { en: 'You receive the architecture diagram, runbooks and a monthly cost estimate.', ko: '아키텍처 다이어그램, 운영 문서(런북), 월 예상 비용을 문서로 드립니다.' },
]

const dashFeatures: { icon: ReactNode; text: T }[] = [
  { icon: <Users className="h-4 w-4" aria-hidden />, text: { en: 'A view per role, each with its own permissions', ko: '역할마다 다른 화면과 권한' } },
  { icon: <Languages className="h-4 w-4" aria-hidden />, text: { en: 'Korean for HQ, English for the US team', ko: '본사는 한국어, 미국 팀은 영어' } },
  { icon: <RefreshCw className="h-4 w-4" aria-hidden />, text: { en: 'Refreshed from the source systems, not retyped', ko: '원본 시스템에서 자동 갱신, 수기 입력 없음' } },
  { icon: <FileSpreadsheet className="h-4 w-4" aria-hidden />, text: { en: 'Scheduled reports and Excel export', ko: '정기 리포트 발송과 엑셀 내보내기' } },
]

const builtAndRun: { icon: ReactNode; tag: T; title: T; body: T; href?: { en: string; ko: string } }[] = [
  {
    icon: <LayoutDashboard className={ic} aria-hidden />,
    tag: { en: 'Google APIs · internal', ko: 'Google API · 내부 운영' },
    title: { en: 'Operations dashboard', ko: '운영 대시보드' },
    body: {
      en: 'Our own dashboard pulls GA4 and Search Console data through their APIs into one screen, behind Google sign-in limited to an email allowlist.',
      ko: 'GA4와 Search Console 데이터를 API로 가져와 한 화면에 보여 주는 내부 대시보드입니다. Google 로그인과 허용 이메일 목록으로 접근을 제한합니다.',
    },
  },
  {
    icon: <CreditCard className={ic} aria-hidden />,
    tag: { en: 'Stripe API · webhooks', ko: 'Stripe API · 웹훅' },
    title: { en: 'Subscription billing', ko: '구독 결제 시스템' },
    body: {
      en: 'Monthly client billing on the Stripe API: payment pages, signature-verified webhooks that email receipts and failure notices, and a scheduled job that reminds clients who have not paid.',
      ko: 'Stripe API로 고객사 월 구독을 청구합니다. 결제 페이지, 서명을 검증한 웹훅이 보내는 결제 확인·실패 알림, 미결제 고객에게 안내 메일을 보내는 정기 작업까지 자동입니다.',
    },
  },
  {
    icon: <CalendarCheck className={ic} aria-hidden />,
    tag: { en: 'Square API · prototype', ko: 'Square API · 프로토타입' },
    title: { en: 'Live booking', ko: '실시간 예약 연동' },
    body: {
      en: 'A booking flow on the Square Bookings API that reads services and open times live and creates the appointment in the seller’s Square account.',
      ko: 'Square 예약 API로 서비스와 예약 가능 시간을 실시간 조회하고, 매장의 Square 계정에 예약을 바로 생성하는 예약 화면입니다.',
    },
  },
  {
    icon: <Activity className={ic} aria-hidden />,
    tag: { en: 'Client · restaurant', ko: '고객 사례 · 레스토랑' },
    title: { en: 'Owner dashboard for Vito’s Pizza', ko: 'Vito’s Pizza 사장님 대시보드' },
    body: {
      en: 'A private website dashboard the owner of Vito’s Pizza in Alpharetta, GA checks each morning: visits, orders, calls and where they came from.',
      ko: '조지아 알파레타 Vito’s Pizza 사장님이 매일 아침 방문·주문·전화와 유입 경로를 확인하는 전용 웹사이트 대시보드입니다.',
    },
    href: {
      en: '/blog/website-drives-revenue-pizza-catering-case-study-2026',
      ko: '/ko/blog/website-drives-revenue-pizza-catering-case-study-2026',
    },
  },
]

const steps: Step[] = [
  {
    icon: <ClipboardList className={ic} aria-hidden />,
    when: { en: 'Week 1', ko: '1주차' },
    title: { en: 'Discovery and data map', ko: '진단 · 데이터 맵' },
    body: {
      en: 'We list the systems you run, how data moves between them, the numbers you need and who needs access.',
      ko: '지금 쓰는 시스템, 데이터가 오가는 길, 꼭 봐야 할 지표, 접근 권한을 정리합니다.',
    },
  },
  {
    icon: <PenTool className={ic} aria-hidden />,
    when: { en: 'Week 2', ko: '2주차' },
    title: { en: 'Architecture and cost', ko: '설계 · 비용 산정' },
    body: {
      en: 'You receive the architecture diagram, the security design and an estimated monthly AWS cost, in writing.',
      ko: '아키텍처 다이어그램, 보안 설계, 월 AWS 예상 비용을 서면으로 드립니다.',
    },
  },
  {
    icon: <CodeXml className={ic} aria-hidden />,
    when: { en: 'Weeks 3–6', ko: '3~6주차' },
    title: { en: 'Build and test', ko: '구축 · 연동 테스트' },
    body: {
      en: 'We build the integrations and dashboards and verify them against your partners’ test environments.',
      ko: '연동과 대시보드를 만들고, 거래처 테스트 환경에서 실제 데이터 흐름을 검증합니다.',
    },
  },
  {
    icon: <Rocket className={ic} aria-hidden />,
    when: { en: 'Weeks 7–8', ko: '7~8주차' },
    title: { en: 'Launch and handover', ko: '전환 · 교육 · 이관' },
    body: {
      en: 'Go-live, team training, and handover of code, runbooks and access.',
      ko: '운영 전환, 담당자 교육, 코드·운영 문서·권한 이관까지 마칩니다.',
    },
  },
]

export const AWS_FAQ: FaqItem[] = [
  {
    q: { en: 'Whose name is the AWS account in?', ko: 'AWS 계정은 누구 명의로 만드나요?' },
    a: {
      en: 'Yours. The account, its billing, the code repository and the data all belong to your company. We work through access you grant and remove it at handover.',
      ko: '고객사 명의입니다. AWS 계정과 결제, 코드 저장소, 데이터 모두 고객사 소유이고, 저희는 위임받은 권한으로 작업한 뒤 이관할 때 권한을 회수합니다.',
    },
  },
  {
    q: { en: 'How much will AWS cost each month?', ko: 'AWS 비용은 매달 얼마나 나오나요?' },
    a: {
      en: 'It depends on data volume and traffic. At the design stage we estimate the monthly cost with the AWS Pricing Calculator and set AWS Budgets alerts so there are no surprises. AWS bills you directly.',
      ko: '데이터 양과 사용량에 따라 다릅니다. 설계 단계에서 AWS Pricing Calculator로 월 예상 비용을 산출해 드리고, AWS Budgets 알림을 걸어 예상보다 많이 나오면 바로 알 수 있게 합니다. 사용료는 AWS가 고객사에 직접 청구합니다.',
    },
  },
  {
    q: { en: 'Do we have to replace the systems we use now?', ko: '지금 쓰는 시스템을 바꿔야 하나요?' },
    a: {
      en: 'No. We connect what you already run through its API, EDI or file exports. Replacing a system is only worth discussing when it cannot be connected at all.',
      ko: '아니요. 이미 쓰고 계신 시스템을 API, EDI, 파일 내보내기로 연결합니다. 교체는 연결 자체가 불가능한 경우에만 따로 검토합니다.',
    },
  },
  {
    q: { en: 'How do you handle security?', ko: '보안은 어떻게 관리하나요?' },
    a: {
      en: 'Least-privilege IAM roles, API keys in AWS Secrets Manager, encryption with AWS KMS, CloudTrail audit logs and MFA on every account. Compliance audits and certifications such as SOC 2 are not included.',
      ko: '최소 권한 IAM 역할, AWS Secrets Manager 키 보관, AWS KMS 암호화, CloudTrail 감사 로그, 모든 계정의 MFA를 기본으로 합니다. 다만 SOC 2 같은 보안 인증 심사 대행은 포함하지 않습니다.',
    },
  },
  {
    q: { en: 'Can our HQ in Korea see the dashboard in Korean?', ko: '한국 본사도 한국어로 대시보드를 볼 수 있나요?' },
    a: {
      en: 'Yes. Dashboards can switch between Korean and English, and each role sees only what it is permitted to see.',
      ko: '네. 대시보드를 한국어·영어로 전환할 수 있고, 역할별로 볼 수 있는 화면과 데이터를 나눕니다.',
    },
  },
  {
    q: { en: 'Which AWS region will our data be in?', ko: '데이터는 어느 리전에 두나요?' },
    a: {
      en: 'US operations usually run in US East (N. Virginia or Ohio). If your HQ needs data kept in Korea, the Asia Pacific (Seoul) region is an option.',
      ko: '미국 사업 데이터는 보통 미국 동부(버지니아·오하이오) 리전에 둡니다. 본사 요구로 한국에 보관해야 하는 데이터는 아시아 태평양(서울) 리전을 쓸 수 있습니다.',
    },
  },
  {
    q: { en: 'What happens when something breaks?', ko: '연동에 문제가 생기면 어떻게 아나요?' },
    a: {
      en: 'CloudWatch alarms notify the right person, and failed messages are kept in a queue so they can be resent once the cause is fixed. Monitoring can also be covered by a monthly care plan.',
      ko: 'CloudWatch 경보가 담당자에게 알리고, 실패한 메시지는 대기열에 보존해 원인을 고친 뒤 다시 보냅니다. 월 운영 플랜으로 모니터링을 맡기실 수도 있습니다.',
    },
  },
  {
    q: { en: 'How long does it take, and how is it priced?', ko: '기간과 비용은 어떻게 되나요?' },
    a: {
      en: 'A typical first phase takes about six to eight weeks. Price depends on the number of systems and partners to connect and the dashboards you need; you receive an itemized quote after the first call.',
      ko: '첫 단계는 보통 6~8주가 걸립니다. 비용은 연결할 시스템·거래처 수와 필요한 대시보드에 따라 정해지며, 첫 미팅 후 항목별 견적을 서면으로 드립니다.',
    },
  },
]

export default function AwsIntegrationPage({ locale }: { locale: L }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  return (
    <>
      <LandingSchema
        locale={locale}
        paths={AWS_PATHS}
        siteUrl={SITE_URL}
        name={{ en: 'AWS cloud, API integration and business dashboards', ko: 'AWS 클라우드 구축 · API 연동 · 대시보드 개발' }}
        serviceType={{ en: 'Cloud architecture, system integration and dashboard development', ko: '클라우드 아키텍처, 시스템 연동, 대시보드 개발' }}
        description={AWS_META.description}
        audience="Companies, including Korean companies with US operations, that need their business systems connected and reported on"
        offers={[
          { en: 'AWS cloud architecture in the client’s own account', ko: '고객사 계정 기반 AWS 클라우드 설계·구축' },
          { en: 'API and EDI integration', ko: 'API · EDI 연동 개발' },
          { en: 'Role-based business dashboards', ko: '역할별 경영·운영 대시보드' },
        ]}
        faq={AWS_FAQ}
        crumb={hero.eyebrow}
      />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        {/* Hero — copy, then the integration map at full width */}
        <section className="container-edge pt-28 md:pt-40 pb-14 md:pb-20">
          <Breadcrumbs locale={locale} current={hero.eyebrow[locale]} />
          <div className="max-w-4xl">
            <p className="mb-5 text-[14px] font-semibold text-[var(--gold)]">{hero.eyebrow[locale]}</p>
            <h1 className="font-display text-[clamp(2.1rem,7.4vw,3.6rem)] lg:text-[clamp(2.75rem,4.4vw,4.25rem)] leading-[1.08] tracking-luxury text-ink text-balance">
              {hero.h1[locale]}
            </h1>
            <p className="mt-7 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-graphite">{hero.intro[locale]}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={`${prefix}/contact`} className="btn-ink">
                {isKo ? '연동 상담 요청' : 'Map your integration'}
                <span className="arrow">→</span>
              </Link>
              <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="btn-outline">
                {isKo ? '카카오톡 상담' : 'Chat on KakaoTalk'}
              </a>
            </div>
          </div>
          <div className="mt-12 md:mt-16">
            <IntegrationMap locale={locale} />
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <li key={f.text.en} className="flex items-center gap-3 text-[14.5px] text-graphite">
                <IconChip size="sm">{f.icon}</IconChip>
                {f.text[locale]}
              </li>
            ))}
          </ul>
        </section>

        {/* Sound familiar? */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead eyebrow={isKo ? '이런 상황이라면' : 'Sound familiar?'} title={isKo ? '데이터는 있는데, 연결이 안 되어 있습니다' : 'The data exists. It just is not connected.'} />
          <ul data-reveal-group className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {pains.map((p) => (
              <li key={p.text.en} className="ul-panel flex items-center gap-4 rounded-[20px] p-4 md:p-5">
                <IconChip>{p.icon}</IconChip>
                <span className="text-[15px] leading-[1.55] text-ink">{p.text[locale]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What we build */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? '만드는 것' : 'What we build'}
            title={isKo ? '연동, 클라우드, 대시보드를 한 팀이' : 'Integration, cloud and dashboards, from one team'}
            intro={
              isKo
                ? '세 가지를 따로 맡기면 책임이 나뉩니다. 데이터가 들어오는 곳부터 화면에 보이는 곳까지 한 팀이 설계하고 운영합니다.'
                : 'Split across vendors, nobody owns the whole path. We design and run it from the first data source to the last screen.'
            }
          />
          <ul data-reveal-group className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {pillars.map((p) => (
              <li key={p.title.en} className="ul-panel flex flex-col rounded-[24px] p-6 md:p-7">
                <IconChip>{p.icon}</IconChip>
                <h3 className="mt-6 text-[21px] md:text-[23px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink">{p.title[locale]}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-graphite">{p.body[locale]}</p>
                <ul className="mt-5 space-y-2.5 border-t border-hairline pt-5">
                  {p.points.map((pt) => (
                    <li key={pt.en} className="flex gap-2.5 text-[14px] leading-[1.55] text-ink">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden />
                      {pt[locale]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* AWS principles + ownership */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? 'AWS 설계 원칙' : 'How we build on AWS'}
            title={isKo ? 'AWS Well-Architected의 6가지 원칙으로 설계합니다' : 'Designed against the six AWS Well-Architected pillars'}
            intro={
              isKo
                ? 'AWS가 공개한 설계 기준인 Well-Architected Framework의 여섯 원칙을 체크리스트로 삼아 아키텍처를 결정합니다.'
                : 'We use the six pillars of the AWS Well-Architected Framework, the design guidance AWS publishes, as the checklist for every architecture decision.'
            }
          />
          <ul data-reveal-group className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {principles.map((p, i) => (
              <li key={p.title.en} className="ul-panel rounded-[22px] p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <IconChip>{p.icon}</IconChip>
                  <span className="text-[13px] font-semibold text-ash tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 text-[18px] md:text-[19px] font-semibold tracking-[-0.015em] text-ink">
                  {p.title[locale]}
                  {isKo && <span className="ml-2 text-[13px] font-medium text-ash">{p.title.en}</span>}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-graphite">{p.body[locale]}</p>
              </li>
            ))}
          </ul>

          <div data-reveal className="ul-panel mt-4 grid grid-cols-1 gap-6 rounded-[24px] p-6 md:mt-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-10 md:p-9">
            <div>
              <IconChip>
                <KeyRound className={ic} aria-hidden />
              </IconChip>
              <h3 className="mt-5 text-[21px] md:text-[24px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink text-balance">
                {isKo ? '계정도, 코드도, 데이터도 고객사 것입니다' : 'The account, the code and the data stay yours'}
              </h3>
            </div>
            <ul className="space-y-3.5 md:pt-1">
              {ownership.map((o) => (
                <li key={o.en} className="flex gap-3 text-[15px] leading-[1.65] text-graphite">
                  <ShieldCheck className="mt-[3px] h-[18px] w-[18px] shrink-0 text-[var(--gold)]" aria-hidden />
                  {o[locale]}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Dashboards */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow={isKo ? '대시보드' : 'Dashboards'}
                title={isKo ? '본사와 현장이 같은 숫자를 봅니다' : 'HQ and the field, looking at the same numbers'}
                intro={
                  isKo
                    ? '보고서를 기다리지 않고, 필요한 사람이 필요한 숫자를 바로 확인합니다. 지표는 첫 주에 함께 정합니다.'
                    : 'No waiting for the weekly report: each person sees the numbers they need, when they need them. We define the metrics with you in week one.'
                }
              />
              <ul className="-mt-4 space-y-3.5 md:-mt-6">
                {dashFeatures.map((f) => (
                  <li key={f.text.en} className="flex items-center gap-3 text-[15px] text-graphite">
                    <IconChip size="sm">{f.icon}</IconChip>
                    {f.text[locale]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <DashboardMock locale={locale} />
            </div>
          </div>
        </section>

        {/* Built and run */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? '직접 만든 시스템' : 'Built by us'}
            title={isKo ? '직접 만들어 온 연동과 대시보드' : 'Integrations and dashboards we have built'}
            intro={
              isKo
                ? '저희 회사 운영과 고객사 서비스를 위해 직접 만든 시스템입니다.'
                : 'Systems we built for our own operations and for clients.'
            }
          />
          <ul data-reveal-group className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {builtAndRun.map((b) => (
              <li key={b.title.en} className="ul-panel flex flex-col rounded-[24px] p-6 md:p-7">
                <div className="flex items-center justify-between gap-3">
                  <IconChip>{b.icon}</IconChip>
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11.5px] text-ash">{b.tag[locale]}</span>
                </div>
                <h3 className="mt-5 text-[19px] md:text-[21px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">{b.title[locale]}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-graphite">{b.body[locale]}</p>
                {b.href && (
                  <Link href={b.href[locale]} className="mt-auto pt-5 text-[14.5px] font-semibold text-[var(--gold)] hover:underline">
                    {isKo ? '사례 읽기 →' : 'Read the case study →'}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? '진행 방식' : 'Process'}
            title={isKo ? '진단부터 이관까지, 네 단계' : 'From discovery to handover, in four steps'}
            intro={
              isKo
                ? '일정은 연결할 시스템과 거래처 수, 테스트 환경 준비 상황에 따라 달라집니다. 미팅은 한국 시간에 맞출 수 있습니다.'
                : 'Timing depends on how many systems and partners are involved and how quickly test environments are ready. Meetings can run on Korea time.'
            }
          />
          <ProcessTimeline steps={steps} locale={locale} />
        </section>

        {/* Logistics cross-link */}
        <section className="container-edge pb-4">
          <Link
            href={isKo ? LOGISTICS_PATHS.ko : LOGISTICS_PATHS.en}
            data-reveal
            className="group ul-panel flex flex-col gap-4 rounded-[24px] p-6 transition-transform duration-300 md:flex-row md:items-center md:justify-between md:p-8 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <IconChip>
                <FileCode2 className={ic} aria-hidden />
              </IconChip>
              <div>
                <p className="text-[13px] font-semibold text-[var(--gold)]">{isKo ? '물류 · 3PL 기업이라면' : 'Run a logistics or 3PL business?'}</p>
                <p className="mt-1 text-[17px] md:text-[19px] font-semibold tracking-[-0.015em] text-ink">
                  {isKo ? '화주 포털, WMS · EDI(940 · 945) 연동은 물류 페이지에서' : 'Shipper portals and WMS · EDI (940 · 945) integration'}
                </p>
              </div>
            </div>
            <span className="text-[15px] font-semibold text-link group-hover:underline whitespace-nowrap">
              {isKo ? '물류 솔루션 보기' : 'See logistics'} <span aria-hidden>›</span>
            </span>
          </Link>
        </section>

        {/* FAQ */}
        <section className="container-edge border-t border-hairline mt-16 md:mt-24 py-20 md:py-28">
          <SectionHead title={isKo ? '자주 묻는 질문' : 'Frequently asked questions'} />
          <FaqList items={AWS_FAQ} locale={locale} />
        </section>

        {/* CTA */}
        <section className="container-edge pb-24 md:pb-32">
          <CtaPanel
            locale={locale}
            line={{
              en: 'Tell us which systems you run and which numbers you need. We will map the integration and estimate the AWS cost, in Korean or English.',
              ko: '지금 쓰는 시스템과 보고 싶은 숫자를 알려주시면, 연동 구조와 예상 AWS 비용을 한국어로 정리해 드립니다.',
            }}
          />
          <p className="mt-8 text-center text-[12px] text-ash">
            {isKo
              ? 'Amazon Web Services, AWS 및 관련 서비스명은 Amazon.com, Inc. 또는 그 계열사의 상표입니다. 그 밖의 상표는 각 소유자의 것입니다.'
              : 'Amazon Web Services, AWS and related service names are trademarks of Amazon.com, Inc. or its affiliates. Other trademarks belong to their owners.'}
          </p>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
