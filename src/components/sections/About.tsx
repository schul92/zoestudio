'use client'

import { useTranslation } from '@/hooks/useTranslation'
import ScrollAnimation from '@/components/ui/ScrollAnimation'

export default function About({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  
  const features = [
    {
      icon: "✅",
      title: t.about.features.design.title,
      description: t.about.features.design.description
    },
    {
      icon: "📈",
      title: t.about.features.development.title,
      description: t.about.features.development.description
    },
    {
      icon: "💰",
      title: t.about.features.performance.title,
      description: t.about.features.performance.description
    },
    {
      icon: "💬",
      title: t.about.features.mobile.title,
      description: t.about.features.mobile.description
    }
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.about.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollAnimation key={index} delay={index * 0.1}>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}