'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import ScrollAnimation from '@/components/ui/ScrollAnimation'

export default function Services({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  
  const services = [
    {
      title: t.services.seo.title,
      description: t.services.seo.description,
      features: t.services.seo.features,
      benefit: t.services.seo.benefit,
      icon: (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Modern Minimalist SEO Icon */}
          
          {/* Central Search Circle */}
          <motion.circle
            cx="50" cy="45" r="25"
            stroke="black" strokeWidth="2" fill="white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Magnifying Glass Handle */}
          <line x1="67" y1="57" x2="75" y2="65" stroke="black" strokeWidth="3" strokeLinecap="round"/>
          
          {/* Growth Arrow Inside */}
          <motion.path
            d="M35 45 L45 35 L55 40 L65 30"
            stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="40"
            strokeDashoffset="40"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
          
          {/* Data Points */}
          <motion.circle cx="35" cy="45" r="2" fill="#4CAF50"
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.circle cx="45" cy="35" r="2" fill="#4CAF50"
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.4, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.circle cx="55" cy="40" r="2" fill="#4CAF50"
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.6, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.circle cx="65" cy="30" r="2" fill="#4CAF50"
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
          />
          
          {/* Ranking Badge */}
          <motion.g
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <rect x="35" y="70" width="30" height="12" rx="6" fill="#FFD700"/>
            <text x="50" y="78" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">#1</text>
          </motion.g>
          
          {/* Percentage Indicator */}
          <motion.text
            x="50" y="92" fontSize="10" fill="#4CAF50" fontWeight="bold" textAnchor="middle"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +185%
          </motion.text>
        </svg>
      )
    },
    {
      title: t.services.googleAds.title,
      description: t.services.googleAds.description,
      features: t.services.googleAds.features,
      benefit: t.services.googleAds.benefit,
      icon: (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Clean Digital Ads Icon */}
          
          {/* Ad Cards Animation */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* First Ad Card */}
            <rect x="20" y="25" width="25" height="18" rx="2" fill="white" stroke="black" strokeWidth="2"/>
            <rect x="22" y="27" width="8" height="5" rx="1" fill="#4285F4"/>
            <text x="26" y="31" fontSize="3.5" fill="white" fontWeight="bold" textAnchor="middle">AD</text>
            <rect x="22" y="34" width="21" height="2" fill="#E0E0E0"/>
            <rect x="22" y="37" width="16" height="2" fill="#E0E0E0"/>
          </motion.g>
          
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            {/* Second Ad Card */}
            <rect x="35" y="35" width="25" height="18" rx="2" fill="white" stroke="black" strokeWidth="2"/>
            <rect x="37" y="37" width="8" height="5" rx="1" fill="#D32F2F"/>
            <text x="41" y="41" fontSize="3.5" fill="white" fontWeight="bold" textAnchor="middle">AD</text>
            <rect x="37" y="44" width="21" height="2" fill="#E0E0E0"/>
            <rect x="37" y="47" width="16" height="2" fill="#E0E0E0"/>
          </motion.g>
          
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            {/* Third Ad Card */}
            <rect x="50" y="45" width="25" height="18" rx="2" fill="white" stroke="black" strokeWidth="2"/>
            <rect x="52" y="47" width="8" height="5" rx="1" fill="#34A853"/>
            <text x="56" y="51" fontSize="3.5" fill="white" fontWeight="bold" textAnchor="middle">AD</text>
            <rect x="52" y="54" width="21" height="2" fill="#E0E0E0"/>
            <rect x="52" y="57" width="16" height="2" fill="#E0E0E0"/>
          </motion.g>
          
          {/* Click Indicators */}
          <motion.circle
            cx="30" cy="50" r="2"
            fill="black"
            animate={{ 
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="30" cy="50" r="5"
            fill="none"
            stroke="black"
            strokeWidth="1"
            animate={{ 
              scale: [0, 1.5],
              opacity: [1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <motion.circle
            cx="65" cy="55" r="2"
            fill="black"
            animate={{ 
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.circle
            cx="65" cy="55" r="5"
            fill="none"
            stroke="black"
            strokeWidth="1"
            animate={{ 
              scale: [0, 1.5],
              opacity: [1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          
          {/* Target Symbol */}
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 75px" }}
          >
            <circle cx="50" cy="75" r="8" fill="none" stroke="black" strokeWidth="1.5"/>
            <circle cx="50" cy="75" r="5" fill="none" stroke="black" strokeWidth="1"/>
            <circle cx="50" cy="75" r="2" fill="black"/>
          </motion.g>
        </svg>
      )
    },
    {
      title: t.services.webDesign.title,
      description: t.services.webDesign.description,
      features: t.services.webDesign.features,
      benefit: t.services.webDesign.benefit,
      icon: (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Simple Website Design Icon */}
          
          {/* Main Screen */}
          <rect x="25" y="25" width="50" height="35" rx="2" stroke="black" strokeWidth="2" fill="white"/>
          <rect x="25" y="25" width="50" height="7" fill="#F5F5F5"/>
          <circle cx="29" cy="28.5" r="1" fill="#FF5252"/>
          <circle cx="33" cy="28.5" r="1" fill="#FFEB3B"/>
          <circle cx="37" cy="28.5" r="1" fill="#4CAF50"/>
          
          {/* Simple animated content */}
          <motion.rect
            x="32" y="37" width="36" height="3" rx="1" fill="#4285F4"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.rect
            x="32" y="43" width="28" height="3" rx="1" fill="#34A853"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.rect
            x="32" y="49" width="32" height="3" rx="1" fill="#FBBC04"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          
          {/* Simple responsive devices */}
          <rect x="30" y="68" width="15" height="12" rx="1" stroke="black" strokeWidth="1.5" fill="white"/>
          <rect x="55" y="70" width="10" height="13" rx="1" stroke="black" strokeWidth="1.5" fill="white"/>
          
          {/* Simple animation dot */}
          <motion.circle
            cx="50" cy="75" r="2"
            fill="#4285F4"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      )
    }
  ]

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, black 35px, black 70px)`,
        }}/>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              {t.services.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative bg-white border-2 border-black rounded-2xl p-8 h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden group">
                {/* Icon */}
                <div className="w-32 h-32 mb-6 mx-auto">
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-center text-black">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 mb-6 text-center">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.slice(0, 3).map((feature: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * idx }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="text-black">
                          <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Benefit */}
                <div className="border-t-2 border-gray-200 pt-6">
                  <p className="text-center font-semibold text-lg text-black">
                    ✨ {service.benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <ScrollAnimation delay={0.5}>
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black text-white rounded-3xl p-12 text-center shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {locale === 'ko' ? '지금 시작하세요!' : 'Start Growing Today!'}
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {locale === 'ko' 
                  ? '무료 상담을 통해 귀하의 비즈니스에 맞는 최적의 솔루션을 찾아보세요'
                  : 'Get a free consultation and discover the perfect solution for your business'
                }
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-white text-black px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-[5px_5px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  {locale === 'ko' ? '무료 상담 예약하기' : 'Book Free Consultation'}
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  )
}