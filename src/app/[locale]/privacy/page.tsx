import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' }
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  const metadata = {
    en: {
      title: 'Privacy Policy - ZOE LUMOS | Digital Marketing Agency',
      description: 'Privacy Policy for ZOE LUMOS. Learn how we collect, use, and protect your personal information when you use our digital marketing services.',
    },
    ko: {
      title: '개인정보 처리방침 - ZOE LUMOS | 디지털 마케팅 에이전시',
      description: 'ZOE LUMOS 개인정보 처리방침. 디지털 마케팅 서비스 이용 시 개인정보 수집, 이용, 보호에 대해 안내드립니다.',
    }
  }

  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/privacy` : `${baseUrl}/ko/privacy`,
      languages: {
        'x-default': `${baseUrl}/privacy`,
        'en': `${baseUrl}/privacy`,
        'ko': `${baseUrl}/ko/privacy`,
      },
    },
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: locale === 'en' ? `${baseUrl}/privacy` : `${baseUrl}/ko/privacy`,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const content = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: December 2024',
    intro: 'ZOE STUDIO LLC ("ZOE LUMOS", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website zoelumos.com or use our services.',
    sections: [
      {
        title: '1. Information We Collect',
        content: `We may collect information about you in a variety of ways:

**Personal Data**: When you contact us or request our services, we may collect personally identifiable information such as your name, email address, phone number, and business information.

**Usage Data**: We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, access times, and the pages you have viewed.

**Cookies and Tracking**: We use cookies and similar tracking technologies to track activity on our website and hold certain information to improve your experience.`
      },
      {
        title: '2. How We Use Your Information',
        content: `We use the information we collect to:

- Provide, operate, and maintain our services
- Improve, personalize, and expand our services
- Understand and analyze how you use our website
- Develop new products, services, features, and functionality
- Communicate with you about our services, updates, and marketing
- Send you emails and respond to inquiries
- Find and prevent fraud`
      },
      {
        title: '3. Disclosure of Your Information',
        content: `We may share your information in the following situations:

**Service Providers**: We may share your information with third-party vendors, service providers, and contractors who perform services for us.

**Business Transfers**: We may share or transfer your information in connection with a merger, acquisition, or sale of assets.

**Legal Requirements**: We may disclose your information where required by law or to protect our rights.`
      },
      {
        title: '4. Third-Party Services',
        content: `Our website may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. This includes:

- Google Analytics for website analytics
- Google Ads for advertising
- Social media platforms
- Payment processors`
      },
      {
        title: '5. Data Security',
        content: `We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`
      },
      {
        title: '6. Your Rights',
        content: `Depending on your location, you may have certain rights regarding your personal information, including:

- The right to access your personal data
- The right to request correction of inaccurate data
- The right to request deletion of your data
- The right to opt-out of marketing communications

To exercise these rights, please contact us at info@zoelumos.com.`
      },
      {
        title: '7. Children\'s Privacy',
        content: `Our services are not directed to individuals under 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us.`
      },
      {
        title: '8. Changes to This Policy',
        content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`
      },
      {
        title: '9. Contact Us',
        content: `If you have questions about this Privacy Policy, please contact us:

**ZOE STUDIO LLC**
Email: info@zoelumos.com
Website: https://zoelumos.com`
      }
    ]
  },
  ko: {
    title: '개인정보 처리방침',
    lastUpdated: '최종 업데이트: 2024년 12월',
    intro: 'ZOE STUDIO LLC ("ZOE LUMOS", "당사")는 고객님의 개인정보 보호를 위해 최선을 다하고 있습니다. 본 개인정보 처리방침은 zoelumos.com 웹사이트 방문 또는 서비스 이용 시 수집, 이용, 보호되는 정보에 대해 설명합니다.',
    sections: [
      {
        title: '1. 수집하는 정보',
        content: `다음과 같은 방법으로 정보를 수집할 수 있습니다:

**개인정보**: 문의 또는 서비스 요청 시 성명, 이메일 주소, 전화번호, 사업체 정보 등의 개인 식별 정보를 수집할 수 있습니다.

**이용 데이터**: 웹사이트 방문 시 IP 주소, 브라우저 유형, 운영 체제, 접속 시간, 방문 페이지 등의 정보가 자동으로 수집됩니다.

**쿠키 및 추적 기술**: 웹사이트 활동을 추적하고 사용자 경험을 개선하기 위해 쿠키 및 유사한 추적 기술을 사용합니다.`
      },
      {
        title: '2. 정보 이용 목적',
        content: `수집된 정보는 다음 목적으로 이용됩니다:

- 서비스 제공, 운영 및 유지
- 서비스 개선, 개인화 및 확장
- 웹사이트 이용 방식 이해 및 분석
- 새로운 제품, 서비스, 기능 개발
- 서비스, 업데이트, 마케팅에 관한 소통
- 이메일 발송 및 문의 응답
- 사기 방지 및 탐지`
      },
      {
        title: '3. 정보 공개',
        content: `다음 상황에서 정보를 공유할 수 있습니다:

**서비스 제공업체**: 당사를 위해 서비스를 수행하는 제3자 벤더, 서비스 제공업체, 계약업체와 정보를 공유할 수 있습니다.

**사업 양도**: 합병, 인수 또는 자산 매각과 관련하여 정보를 공유하거나 이전할 수 있습니다.

**법적 요구사항**: 법률에서 요구하거나 당사의 권리를 보호하기 위해 정보를 공개할 수 있습니다.`
      },
      {
        title: '4. 제3자 서비스',
        content: `당사 웹사이트에는 제3자 웹사이트 및 서비스 링크가 포함될 수 있습니다. 제3자의 개인정보 보호 관행에 대해서는 책임을 지지 않습니다. 여기에는 다음이 포함됩니다:

- 웹사이트 분석을 위한 Google Analytics
- 광고를 위한 Google Ads
- 소셜 미디어 플랫폼
- 결제 처리업체`
      },
      {
        title: '5. 데이터 보안',
        content: `개인정보 보호를 위해 관리적, 기술적, 물리적 보안 조치를 사용합니다. 그러나 인터넷을 통한 전송 방법은 100% 안전하지 않으며, 절대적인 보안을 보장할 수 없습니다.`
      },
      {
        title: '6. 고객의 권리',
        content: `거주 지역에 따라 개인정보에 관한 다음 권리를 가질 수 있습니다:

- 개인정보 접근 권리
- 부정확한 정보의 정정 요청 권리
- 정보 삭제 요청 권리
- 마케팅 수신 거부 권리

이러한 권리를 행사하려면 info@zoelumos.com으로 연락해 주세요.`
      },
      {
        title: '7. 아동 개인정보',
        content: `당사 서비스는 18세 미만을 대상으로 하지 않습니다. 18세 미만 아동의 개인정보를 고의로 수집하지 않습니다. 아동이 개인정보를 제공한 사실을 알게 되면 연락해 주세요.`
      },
      {
        title: '8. 정책 변경',
        content: `본 개인정보 처리방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이 페이지에 새 정책을 게시하고 "최종 업데이트" 날짜를 수정하여 알려드립니다.`
      },
      {
        title: '9. 문의하기',
        content: `개인정보 처리방침에 대한 문의사항이 있으시면 연락해 주세요:

**ZOE STUDIO LLC**
이메일: info@zoelumos.com
웹사이트: https://zoelumos.com`
      }
    ]
  }
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = content[locale]
  const prefix = locale === 'ko' ? '/ko' : ''

  return (
    <>
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <Link href={prefix || '/'} className="text-gray-500 hover:text-black transition-colors">
              {locale === 'ko' ? '홈' : 'Home'}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{t.title}</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-gray-500 mb-8">{t.lastUpdated}</p>

            <p className="text-gray-700 leading-relaxed mb-8">{t.intro}</p>

            {t.sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content.split('**').map((part, i) =>
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
