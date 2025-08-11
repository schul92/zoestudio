'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AboutClient({ t, locale }: { t: any, locale: string }) {
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

  return (
    <>
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">{t.meaning.title}</h2>
          
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">{t.philosophy.title}</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.philosophy.items.map((item: any, index: number) => (
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            {t.mission.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {t.mission.stats.map((stat: any, index: number) => (
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">{t.services.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {t.services.items.map((item: any, index: number) => (
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
            <a
              href={`${prefix}/#contact`}
              className="inline-block bg-black text-white px-10 py-5 text-lg font-bold rounded-full hover:scale-110 transition-transform shadow-2xl"
            >
              {t.cta.button}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}