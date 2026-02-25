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
      title: 'Terms of Service - ZOE LUMOS | Digital Marketing Agency',
      description: 'Terms of Service for ZOE LUMOS. Read our terms and conditions for using our digital marketing, SEO, and web design services.',
    },
    ko: {
      title: '이용약관 - ZOE LUMOS | 디지털 마케팅 에이전시',
      description: 'ZOE LUMOS 이용약관. 디지털 마케팅, SEO, 웹 디자인 서비스 이용에 관한 약관을 확인하세요.',
    }
  }

  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/terms` : `${baseUrl}/ko/terms`,
      languages: {
        'x-default': `${baseUrl}/terms`,
        'en': `${baseUrl}/terms`,
        'ko': `${baseUrl}/ko/terms`,
      },
    },
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: locale === 'en' ? `${baseUrl}/terms` : `${baseUrl}/ko/terms`,
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
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: December 2024',
    intro: 'These Terms of Service ("Terms") govern your use of the ZOE LUMOS website (zoelumos.com) and services provided by ZOE STUDIO LLC. By accessing or using our services, you agree to be bound by these Terms.',
    sections: [
      {
        title: '1. Services',
        content: `ZOE LUMOS provides digital marketing services including but not limited to:

- Search Engine Optimization (SEO)
- Google Ads Management
- Yelp Advertising
- Website Design and Development
- E-commerce & Shopify Development
- LLC Formation Assistance

The specific scope of services will be outlined in individual service agreements or proposals provided to clients.`
      },
      {
        title: '2. Client Responsibilities',
        content: `As a client, you agree to:

- Provide accurate and complete information necessary for service delivery
- Respond to requests for approval or information in a timely manner
- Maintain confidentiality of account credentials
- Ensure you have rights to any content you provide for use in our services
- Comply with all applicable laws and regulations
- Pay for services according to agreed terms`
      },
      {
        title: '3. Payment Terms',
        content: `- Payment terms are specified in individual service agreements
- Most services require upfront payment or monthly subscription
- Late payments may result in service suspension
- Refunds are handled on a case-by-case basis as outlined in service agreements
- Pricing is subject to change with notice for ongoing services`
      },
      {
        title: '4. Intellectual Property',
        content: `**Our Property**: All content, designs, code, and materials created by ZOE LUMOS remain our intellectual property until full payment is received.

**Client Property**: Upon full payment, clients receive ownership of custom designs and content created specifically for their project, unless otherwise specified.

**Third-Party Assets**: Some services may include third-party templates, plugins, or assets that are licensed, not owned.`
      },
      {
        title: '5. Website Hosting & Maintenance',
        content: `For website services:

- We recommend but do not require clients to use our hosting services
- Website maintenance and updates may be offered as separate services
- Clients are responsible for domain registration renewal
- We are not responsible for third-party service outages`
      },
      {
        title: '6. Advertising Services',
        content: `For Google Ads and Yelp advertising services:

- Ad spend budgets are separate from management fees
- Results cannot be guaranteed as they depend on many factors
- We follow platform guidelines and best practices
- Account access will be transferred to client upon request
- Platform policy changes may affect campaign performance`
      },
      {
        title: '7. SEO Services',
        content: `For SEO services:

- Rankings depend on many factors beyond our control
- We follow white-hat SEO practices only
- Results typically take 3-6 months to materialize
- We provide regular reporting on progress
- Algorithm changes may affect rankings`
      },
      {
        title: '8. Limitation of Liability',
        content: `To the maximum extent permitted by law:

- Our liability is limited to the amount paid for services
- We are not liable for indirect, incidental, or consequential damages
- We are not responsible for third-party service failures
- We do not guarantee specific business results
- Force majeure events excuse our performance obligations`
      },
      {
        title: '9. Termination',
        content: `Either party may terminate services:

- With written notice as specified in the service agreement
- Immediately if the other party materially breaches these Terms
- Upon completion of the agreed scope of work

Upon termination, client shall pay for all services rendered.`
      },
      {
        title: '10. Confidentiality',
        content: `Both parties agree to:

- Keep confidential information private
- Use confidential information only for service delivery
- Not disclose confidential information to third parties without consent
- Return or destroy confidential information upon request`
      },
      {
        title: '11. Dispute Resolution',
        content: `Any disputes arising from these Terms shall be:

- First attempted to be resolved through good-faith negotiation
- Subject to mediation if negotiation fails
- Governed by the laws of the State of New Jersey
- Subject to the exclusive jurisdiction of New Jersey courts`
      },
      {
        title: '12. Changes to Terms',
        content: `We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Continued use of our services after changes constitutes acceptance of the new Terms.`
      },
      {
        title: '13. Contact Information',
        content: `For questions about these Terms, please contact us:

**ZOE STUDIO LLC**
Email: info@zoelumos.com
Website: https://zoelumos.com`
      }
    ]
  },
  ko: {
    title: '이용약관',
    lastUpdated: '최종 업데이트: 2024년 12월',
    intro: '본 이용약관("약관")은 ZOE STUDIO LLC가 제공하는 ZOE LUMOS 웹사이트(zoelumos.com) 및 서비스 이용을 규정합니다. 서비스에 접속하거나 이용함으로써 본 약관에 동의하게 됩니다.',
    sections: [
      {
        title: '1. 서비스',
        content: `ZOE LUMOS는 다음을 포함한 디지털 마케팅 서비스를 제공합니다:

- 검색엔진 최적화 (SEO)
- 구글 광고 관리
- 옐프 광고
- 웹사이트 디자인 및 개발
- 이커머스 & 쇼피파이 개발
- LLC 설립 지원

구체적인 서비스 범위는 고객에게 제공되는 개별 서비스 계약 또는 제안서에 명시됩니다.`
      },
      {
        title: '2. 고객 책임',
        content: `고객으로서 다음에 동의합니다:

- 서비스 제공에 필요한 정확하고 완전한 정보 제공
- 승인 또는 정보 요청에 적시에 응답
- 계정 자격 증명의 기밀 유지
- 서비스에 사용하기 위해 제공하는 콘텐츠에 대한 권리 보유
- 모든 관련 법률 및 규정 준수
- 합의된 조건에 따른 서비스 비용 지불`
      },
      {
        title: '3. 결제 조건',
        content: `- 결제 조건은 개별 서비스 계약에 명시됩니다
- 대부분의 서비스는 선불 또는 월간 구독이 필요합니다
- 연체 시 서비스가 중단될 수 있습니다
- 환불은 서비스 계약에 명시된 대로 개별 사례별로 처리됩니다
- 진행 중인 서비스의 경우 사전 통지와 함께 가격이 변경될 수 있습니다`
      },
      {
        title: '4. 지적 재산권',
        content: `**당사 재산권**: ZOE LUMOS가 제작한 모든 콘텐츠, 디자인, 코드 및 자료는 전액 결제가 완료될 때까지 당사의 지적 재산으로 유지됩니다.

**고객 재산권**: 전액 결제 후, 고객은 프로젝트를 위해 특별히 제작된 맞춤 디자인 및 콘텐츠의 소유권을 받습니다 (별도 명시된 경우 제외).

**제3자 자산**: 일부 서비스에는 소유가 아닌 라이선스가 부여된 제3자 템플릿, 플러그인 또는 자산이 포함될 수 있습니다.`
      },
      {
        title: '5. 웹사이트 호스팅 및 유지보수',
        content: `웹사이트 서비스의 경우:

- 당사 호스팅 서비스 사용을 권장하지만 필수는 아닙니다
- 웹사이트 유지보수 및 업데이트는 별도 서비스로 제공될 수 있습니다
- 도메인 등록 갱신은 고객 책임입니다
- 제3자 서비스 중단에 대해서는 책임지지 않습니다`
      },
      {
        title: '6. 광고 서비스',
        content: `구글 광고 및 옐프 광고 서비스의 경우:

- 광고비 예산은 관리 수수료와 별도입니다
- 결과는 많은 요인에 따라 달라지므로 보장할 수 없습니다
- 플랫폼 가이드라인과 모범 사례를 따릅니다
- 요청 시 계정 접근권을 고객에게 이전합니다
- 플랫폼 정책 변경은 캠페인 성과에 영향을 미칠 수 있습니다`
      },
      {
        title: '7. SEO 서비스',
        content: `SEO 서비스의 경우:

- 순위는 당사 통제를 벗어난 많은 요인에 따라 달라집니다
- 화이트햇 SEO 방식만 사용합니다
- 결과는 일반적으로 3-6개월 후에 나타납니다
- 진행 상황에 대한 정기 보고서를 제공합니다
- 알고리즘 변경은 순위에 영향을 미칠 수 있습니다`
      },
      {
        title: '8. 책임 제한',
        content: `법이 허용하는 최대 범위 내에서:

- 당사 책임은 서비스에 대해 지불한 금액으로 제한됩니다
- 간접적, 부수적 또는 결과적 손해에 대해서는 책임지지 않습니다
- 제3자 서비스 장애에 대해서는 책임지지 않습니다
- 특정 비즈니스 결과를 보장하지 않습니다
- 불가항력 사건은 이행 의무를 면제합니다`
      },
      {
        title: '9. 해지',
        content: `양 당사자는 다음과 같이 서비스를 해지할 수 있습니다:

- 서비스 계약에 명시된 대로 서면 통지
- 상대방이 본 약관을 중대하게 위반할 경우 즉시
- 합의된 작업 범위 완료 시

해지 시, 고객은 제공된 모든 서비스에 대해 비용을 지불해야 합니다.`
      },
      {
        title: '10. 기밀 유지',
        content: `양 당사자는 다음에 동의합니다:

- 기밀 정보를 비공개로 유지
- 기밀 정보를 서비스 제공 목적으로만 사용
- 동의 없이 제3자에게 기밀 정보를 공개하지 않음
- 요청 시 기밀 정보를 반환하거나 파기`
      },
      {
        title: '11. 분쟁 해결',
        content: `본 약관으로 인해 발생하는 모든 분쟁은:

- 먼저 성실한 협상을 통해 해결 시도
- 협상이 실패할 경우 중재
- 뉴저지주 법률의 적용
- 뉴저지 법원의 전속 관할권`
      },
      {
        title: '12. 약관 변경',
        content: `당사는 언제든지 본 약관을 수정할 권리를 보유합니다. 변경 사항은 웹사이트에 게시된 후 효력이 발생합니다. 변경 후 서비스를 계속 이용하면 새 약관에 동의하는 것으로 간주됩니다.`
      },
      {
        title: '13. 연락처',
        content: `본 약관에 대한 문의사항이 있으시면 연락해 주세요:

**ZOE STUDIO LLC**
이메일: info@zoelumos.com
웹사이트: https://zoelumos.com`
      }
    ]
  }
}

export default function TermsPage({ params }: { params: { locale: string } }) {
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
