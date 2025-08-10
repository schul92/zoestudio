'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const prefix = locale === 'ko' ? '/ko' : ''
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const content = {
    en: {
      hero: {
        subtitle: 'ZOE (Life) + LUMOS (Light)',
        title: 'Bringing Life & Light',
        tagline: 'to Your Digital Presence',
        description: 'Just as light brings life to darkness, we illuminate your path to digital success.',
      },
      meaning: {
        title: 'The Meaning Behind Our Name',
        zoe: {
          word: 'ZOE',
          origin: 'Greek: ζωή',
          meaning: 'Life',
          description: 'We breathe life into your business, creating vibrant digital experiences that grow and thrive.',
        },
        lumos: {
          word: 'LUMOS',
          origin: 'Latin: Light',
          meaning: 'Illumination',
          description: 'We cast light on opportunities, making your business visible in the vast digital darkness.',
        },
      },
      philosophy: {
        title: 'Our Philosophy',
        items: [
          {
            icon: '🌱',
            title: 'Growth is Life',
            description: 'Every business deserves to grow. We plant seeds of success through strategic SEO and marketing.',
          },
          {
            icon: '💡',
            title: 'Visibility is Light',
            description: 'In the darkness of the internet, we make you shine bright where customers can find you.',
          },
          {
            icon: '✨',
            title: 'Innovation Sparks',
            description: 'We combine life-giving creativity with illuminating strategy for magical results.',
          },
        ],
      },
      mission: {
        title: 'Illuminating Success Stories',
        stats: [
          { number: '∞', label: 'Possibilities', description: 'We see infinite potential' },
          { number: '24/7', label: 'Always On', description: 'Your light never dims' },
          { number: '1st', label: 'Page Rankings', description: 'Where you deserve to be' },
          { number: '100%', label: 'Dedication', description: 'To your growth' },
        ],
      },
      services: {
        title: 'How We Bring Light',
        items: [
          { title: 'SEO', description: 'Illuminate your presence on Google' },
          { title: 'Google Ads', description: 'Spotlight on your business' },
          { title: 'Web Design', description: 'Radiant digital experiences' },
          { title: 'LLC Formation', description: 'Birth of your business journey' },
        ],
      },
      cta: {
        title: 'Ready to Shine?',
        subtitle: 'Let us bring life and light to your business',
        button: 'Illuminate My Business',
      },
    },
    ko: {
      hero: {
        subtitle: 'ZOE (생명) + LUMOS (빛)',
        title: '생명과 빛을 가져다주는',
        tagline: '당신의 디지털 존재에',
        description: '빛이 어둠에 생명을 가져다주듯, 우리는 당신의 디지털 성공으로 가는 길을 밝혀드립니다.',
      },
      meaning: {
        title: '우리 이름의 의미',
        zoe: {
          word: 'ZOE',
          origin: '그리스어: ζωή',
          meaning: '생명',
          description: '우리는 당신의 비즈니스에 생명을 불어넣어, 성장하고 번창하는 생동감 있는 디지털 경험을 창조합니다.',
        },
        lumos: {
          word: 'LUMOS',
          origin: '라틴어: 빛',
          meaning: '조명',
          description: '우리는 기회를 비추어, 광대한 디지털 어둠 속에서 당신의 비즈니스를 보이게 만듭니다.',
        },
      },
      philosophy: {
        title: '우리의 철학',
        items: [
          {
            icon: '🌱',
            title: '성장이 곧 생명',
            description: '모든 비즈니스는 성장할 자격이 있습니다. 전략적 SEO와 마케팅을 통해 성공의 씨앗을 심습니다.',
          },
          {
            icon: '💡',
            title: '가시성이 곧 빛',
            description: '인터넷의 어둠 속에서, 고객이 당신을 찾을 수 있는 곳에서 밝게 빛나게 합니다.',
          },
          {
            icon: '✨',
            title: '혁신의 불꽃',
            description: '생명을 주는 창의성과 빛나는 전략을 결합하여 마법같은 결과를 만듭니다.',
          },
        ],
      },
      mission: {
        title: '성공 스토리를 밝히다',
        stats: [
          { number: '∞', label: '가능성', description: '무한한 잠재력을 봅니다' },
          { number: '24/7', label: '항상 켜짐', description: '당신의 빛은 꺼지지 않습니다' },
          { number: '1st', label: '페이지 순위', description: '당신이 있어야 할 곳' },
          { number: '100%', label: '헌신', description: '당신의 성장을 위해' },
        ],
      },
      services: {
        title: '우리가 빛을 가져다주는 방법',
        items: [
          { title: 'SEO', description: '구글에서 당신의 존재를 밝힙니다' },
          { title: '구글 광고', description: '당신의 비즈니스에 스포트라이트' },
          { title: '웹 디자인', description: '빛나는 디지털 경험' },
          { title: 'LLC 설립', description: '비즈니스 여정의 탄생' },
        ],
      },
      cta: {
        title: '빛날 준비가 되셨나요?',
        subtitle: '당신의 비즈니스에 생명과 빛을 가져다드립니다',
        button: '내 비즈니스 밝히기',
      },
    },
  }

  const t = content[locale]

  return (
    <>
      <Header locale={locale} />
      
      {/* Hero Section - Fixed padding-top for header */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative pt-32">
        {/* Animated Light Rays */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-[2px] h-[200vh] bg-gradient-to-t from-transparent via-yellow-400/20 to-transparent"
              style={{
                transformOrigin: 'center',
              }}
              animate={{
                rotate: [0 + i * 60, 360 + i * 60],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Floating Light Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Glowing Logo */}
            <motion.div
              className="w-32 h-32 mx-auto mb-8 relative"
              animate={{
                filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full w-full h-full flex items-center justify-center">
                <span className="text-4xl font-bold text-black">ZL</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-yellow-400 text-xl mb-4"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              className="text-3xl md:text-4xl text-gray-300 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {t.hero.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Name Meaning Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">{t.meaning.title}</h2>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* ZOE */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-3xl border-2 border-green-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-transparent rounded-full -mr-32 -mt-32" />
                <h3 className="text-6xl font-bold text-green-600 mb-2">{t.meaning.zoe.word}</h3>
                <p className="text-sm text-gray-500 mb-2">{t.meaning.zoe.origin}</p>
                <p className="text-2xl font-semibold text-gray-800 mb-4">{t.meaning.zoe.meaning}</p>
                <p className="text-gray-600">{t.meaning.zoe.description}</p>
              </div>
            </motion.div>

            {/* LUMOS */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-10 rounded-3xl border-2 border-yellow-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full -mr-32 -mt-32" />
                <h3 className="text-6xl font-bold text-yellow-600 mb-2">{t.meaning.lumos.word}</h3>
                <p className="text-sm text-gray-500 mb-2">{t.meaning.lumos.origin}</p>
                <p className="text-2xl font-semibold text-gray-800 mb-4">{t.meaning.lumos.meaning}</p>
                <p className="text-gray-600">{t.meaning.lumos.description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">{t.philosophy.title}</h2>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.philosophy.items.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Stats */}
      <section className="py-32 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              {t.mission.title}
            </h2>
          </ScrollAnimation>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {t.mission.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - How We Bring Light */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">{t.services.title}</h2>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {t.services.items.map((item, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-[2px] rounded-2xl">
                  <div className="bg-white rounded-2xl p-8 h-full hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 transition-all">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-yellow-400 to-orange-500 text-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                left: `${10 + i * 30}%`,
                top: `${-50 + i * 20}%`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              }}
              animate={{
                y: [0, 30, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
          >
            {t.cta.title}
          </motion.h2>
          <motion.p
            className="text-xl mb-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.cta.subtitle}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={`${prefix}/#contact`}
              className="inline-block bg-black text-white px-10 py-5 text-lg font-bold rounded-full hover:scale-110 transition-transform shadow-2xl"
            >
              {t.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  )
}