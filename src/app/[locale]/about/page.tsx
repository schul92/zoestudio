import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import AnimatedLogo from '@/components/AnimatedLogo'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const locale = params.locale as 'en' | 'ko'
  
  const metadata = {
    en: {
      title: 'About ZOE STUDIO LLC - Digital Marketing Experts | SEO & Web Design Agency',
      description: 'Learn about ZOE STUDIO LLC, a leading digital marketing agency specializing in SEO, Google Ads, and web design. Helping businesses grow online since establishment with proven results and dedicated expertise.',
    },
    ko: {
      title: 'ZOE STUDIO LLC 소개 - 디지털 마케팅 전문가 | SEO & 웹 디자인 에이전시',
      description: 'SEO, 구글 광고, 웹 디자인을 전문으로 하는 선도적인 디지털 마케팅 에이전시 ZOE STUDIO LLC를 소개합니다. 검증된 결과와 전문성으로 비즈니스의 온라인 성장을 돕습니다.',
    },
  }

  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: `https://zoestudio.com/${locale}/about`,
    },
  }
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const prefix = locale === 'ko' ? '/ko' : ''

  const content = {
    en: {
      hero: {
        title: 'About ZOE STUDIO LLC',
        subtitle: 'Your Partner in Digital Growth',
      },
      mission: {
        title: 'Our Mission',
        description: 'We empower small and medium-sized businesses to thrive in the digital landscape through innovative SEO strategies, targeted advertising, and compelling web design.',
      },
      whyUs: {
        title: 'Why Choose ZOE STUDIO',
        points: [
          {
            title: 'Proven Results',
            description: 'Our data-driven approach has helped hundreds of businesses increase their online visibility and revenue.',
          },
          {
            title: 'Personalized Strategy',
            description: 'We understand that every business is unique. Our solutions are tailored to your specific goals and industry.',
          },
          {
            title: 'Transparent Communication',
            description: 'Regular reporting and open communication ensure you\'re always informed about your campaign\'s progress.',
          },
          {
            title: 'Full-Service Solutions',
            description: 'From SEO to web design to LLC formation, we\'re your one-stop shop for all digital needs.',
          },
        ],
      },
      expertise: {
        title: 'Our Expertise',
        areas: [
          'Search Engine Optimization (SEO)',
          'Google Ads & PPC Management',
          'Yelp Advertising',
          'Website Design & Development',
          'E-commerce Solutions',
          'Local Business Marketing',
          'Content Marketing',
          'LLC Formation Services',
        ],
      },
      approach: {
        title: 'Our Approach',
        steps: [
          {
            number: '01',
            title: 'Discovery',
            description: 'We learn about your business, goals, and target audience.',
          },
          {
            number: '02',
            title: 'Strategy',
            description: 'We develop a customized digital marketing strategy.',
          },
          {
            number: '03',
            title: 'Implementation',
            description: 'We execute the strategy with precision and attention to detail.',
          },
          {
            number: '04',
            title: 'Optimization',
            description: 'We continuously monitor and optimize for better results.',
          },
        ],
      },
      cta: {
        title: 'Ready to Grow Your Business?',
        description: 'Let\'s discuss how we can help you achieve your digital marketing goals.',
        button: 'Get Free Consultation',
      },
    },
    ko: {
      hero: {
        title: 'ZOE STUDIO LLC 소개',
        subtitle: '디지털 성장의 파트너',
      },
      mission: {
        title: '우리의 미션',
        description: '혁신적인 SEO 전략, 타겟 광고, 매력적인 웹 디자인을 통해 중소기업이 디지털 환경에서 성공할 수 있도록 지원합니다.',
      },
      whyUs: {
        title: 'ZOE STUDIO를 선택하는 이유',
        points: [
          {
            title: '검증된 결과',
            description: '데이터 기반 접근법으로 수백 개의 비즈니스가 온라인 가시성과 수익을 증가시켰습니다.',
          },
          {
            title: '맞춤형 전략',
            description: '모든 비즈니스는 독특합니다. 우리의 솔루션은 귀하의 특정 목표와 산업에 맞춰져 있습니다.',
          },
          {
            title: '투명한 소통',
            description: '정기적인 보고와 열린 소통으로 캠페인 진행 상황을 항상 파악할 수 있습니다.',
          },
          {
            title: '풀 서비스 솔루션',
            description: 'SEO부터 웹 디자인, LLC 설립까지 모든 디지털 요구사항을 한 곳에서 해결합니다.',
          },
        ],
      },
      expertise: {
        title: '우리의 전문 분야',
        areas: [
          '검색엔진최적화 (SEO)',
          '구글 광고 & PPC 관리',
          '옐프 광고',
          '웹사이트 디자인 & 개발',
          '이커머스 솔루션',
          '로컬 비즈니스 마케팅',
          '콘텐츠 마케팅',
          'LLC 설립 서비스',
        ],
      },
      approach: {
        title: '우리의 접근 방식',
        steps: [
          {
            number: '01',
            title: '발견',
            description: '귀하의 비즈니스, 목표, 타겟 고객을 파악합니다.',
          },
          {
            number: '02',
            title: '전략',
            description: '맞춤형 디지털 마케팅 전략을 개발합니다.',
          },
          {
            number: '03',
            title: '실행',
            description: '정밀하고 세심하게 전략을 실행합니다.',
          },
          {
            number: '04',
            title: '최적화',
            description: '지속적으로 모니터링하고 더 나은 결과를 위해 최적화합니다.',
          },
        ],
      },
      cta: {
        title: '비즈니스 성장을 준비하셨나요?',
        description: '디지털 마케팅 목표 달성을 어떻게 도울 수 있는지 논의해 봅시다.',
        button: '무료 상담 받기',
      },
    },
  }

  const t = content[locale]

  return (
    <>
      <Header locale={locale} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <AnimatedLogo width={80} height={80} animate={true} />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                {t.hero.title}
              </h1>
              <p className="text-xl text-gray-600">
                {t.hero.subtitle}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.mission.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.mission.description}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.whyUs.title}</h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {t.whyUs.points.map((point, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-4">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.expertise.title}</h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {t.expertise.areas.map((area, index) => (
              <ScrollAnimation key={index} delay={index * 0.05}>
                <div className="bg-black text-white p-4 rounded-lg text-center hover:bg-gray-800 transition-colors">
                  {area}
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.approach.title}</h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {t.approach.steps.map((step, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-300 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.cta.title}</h2>
              <p className="text-xl mb-8 text-gray-300">{t.cta.description}</p>
              <Link
                href={`${prefix}/#contact`}
                className="inline-block bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                {t.cta.button}
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  )
}