'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import { useServices } from '@/context/ServiceContext'
import { useTracking } from '@/hooks/useTracking'

export default function Services({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const { addService, removeService, isServiceSelected, selectedServices } = useServices()
  const [showTooltip, setShowTooltip] = useState(false)
  const { trackServiceClick } = useTracking()
  
  const services = [
    {
      id: 'seo',
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
      id: 'googleads',
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
      id: 'webdesign',
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
    },
    {
      id: 'llc',
      title: t.services.llc.title,
      description: t.services.llc.description,
      features: t.services.llc.features,
      benefit: t.services.llc.benefit,
      icon: (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* LLC Formation & Business Setup Icon */}
          
          {/* Building/Office */}
          <motion.g
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <rect x="30" y="35" width="40" height="40" rx="2" fill="white" stroke="black" strokeWidth="2"/>
            <rect x="30" y="35" width="40" height="8" fill="#4285F4"/>
            
            {/* Windows */}
            <rect x="36" y="48" width="8" height="8" fill="#E0E0E0"/>
            <rect x="48" y="48" width="8" height="8" fill="#E0E0E0"/>
            <rect x="60" y="48" width="8" height="8" fill="#E0E0E0"/>
            <rect x="36" y="60" width="8" height="8" fill="#E0E0E0"/>
            <rect x="48" y="60" width="8" height="8" fill="#E0E0E0"/>
            <rect x="60" y="60" width="8" height="8" fill="#E0E0E0"/>
            
            {/* Door */}
            <rect x="46" y="65" width="8" height="10" fill="#34A853"/>
          </motion.g>
          
          {/* Document/Certificate */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <rect x="15" y="20" width="25" height="30" rx="1" fill="white" stroke="black" strokeWidth="1.5"/>
            <line x1="18" y1="26" x2="32" y2="26" stroke="#666" strokeWidth="1"/>
            <line x1="18" y1="30" x2="32" y2="30" stroke="#666" strokeWidth="1"/>
            <line x1="18" y1="34" x2="28" y2="34" stroke="#666" strokeWidth="1"/>
            <text x="27.5" y="44" fontSize="6" fill="black" fontWeight="bold" textAnchor="middle">LLC</text>
          </motion.g>
          
          {/* EIN Document */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
          >
            <rect x="60" y="20" width="25" height="30" rx="1" fill="white" stroke="black" strokeWidth="1.5"/>
            <line x1="63" y1="26" x2="77" y2="26" stroke="#666" strokeWidth="1"/>
            <line x1="63" y1="30" x2="77" y2="30" stroke="#666" strokeWidth="1"/>
            <line x1="63" y1="34" x2="73" y2="34" stroke="#666" strokeWidth="1"/>
            <text x="72.5" y="44" fontSize="6" fill="black" fontWeight="bold" textAnchor="middle">EIN</text>
          </motion.g>
          
          {/* Chase Bank Card */}
          <motion.g
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          >
            <rect x="35" y="80" width="30" height="18" rx="2" fill="#0052CC" stroke="black" strokeWidth="1.5"/>
            <rect x="37" y="85" width="12" height="8" rx="1" fill="#FFD700"/>
            <circle cx="55" cy="89" r="5" fill="none" stroke="white" strokeWidth="1"/>
            <circle cx="60" cy="89" r="5" fill="none" stroke="white" strokeWidth="1" opacity="0.7"/>
            <text x="50" y="95" fontSize="4" fill="white" fontWeight="bold" textAnchor="middle">CHASE</text>
          </motion.g>
          
          {/* Success Checkmark */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <circle cx="75" cy="60" r="8" fill="#34A853"/>
            <motion.path
              d="M70 60 L73 63 L80 56"
              stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 2.2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.g>
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
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              {t.services.subtitle}
            </p>
            
            {/* Service Selection Guide - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 bg-gradient-to-r from-blue-50 to-purple-50 px-6 sm:px-8 py-5 rounded-2xl sm:rounded-full border-2 border-blue-200 w-full sm:w-auto max-w-md sm:max-w-none mx-auto"
            >
              {/* Step 1 */}
              <div className="flex items-center gap-3 flex-1 sm:flex-initial">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-all ${
                  selectedServices.length > 0 ? 'bg-green-500 text-white scale-110' : 'bg-gray-300 text-gray-600'
                }`}>
                  {selectedServices.length > 0 ? '✓' : '1'}
                </div>
                <div className="flex-1 sm:flex-initial">
                  <span className={`text-sm font-medium block ${
                    selectedServices.length > 0 ? 'text-green-600' : 'text-gray-700'
                  }`}>
                    {locale === 'ko' ? '서비스 선택' : 'Select Services'}
                  </span>
                </div>
              </div>
              
              <div className="hidden sm:block w-8 h-0.5 bg-gray-300 self-center"></div>
              
              {/* Step 2 */}
              <div className="flex items-center gap-3 flex-1 sm:flex-initial">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-all ${
                  selectedServices.length > 0 ? 'bg-blue-500 text-white animate-pulse scale-110' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <div className="flex-1 sm:flex-initial">
                  <span className="text-sm font-medium text-gray-700 block">
                    {locale === 'ko' ? '정보 입력' : 'Your Info'}
                  </span>
                </div>
              </div>
              
              <div className="hidden sm:block w-8 h-0.5 bg-gray-300 self-center"></div>
              
              {/* Step 3 */}
              <div className="flex items-center gap-3 flex-1 sm:flex-initial">
                <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold flex-shrink-0 transition-all">
                  3
                </div>
                <div className="flex-1 sm:flex-initial">
                  <span className="text-sm font-medium text-gray-700 block">
                    {locale === 'ko' ? '상담 시작!' : 'Get Started!'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
              <div className="relative bg-white border-2 border-black rounded-2xl p-6 h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden group flex flex-col">
                {/* Icon */}
                <div className="w-24 h-24 mb-4 mx-auto">
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-center text-black">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 mb-4 text-center text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features - flex-grow to take available space */}
                <div className="space-y-2 mb-6 flex-grow">
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
                
                {/* Benefit - Always at bottom */}
                <div className="border-t-2 border-gray-200 pt-4 mt-auto">
                  <p className="text-center font-semibold text-base text-black mb-3">
                    ✨ {service.benefit}
                  </p>
                  
                  {/* Select/Deselect Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      trackServiceClick(service.title) // Track the click
                      if (isServiceSelected(service.id)) {
                        removeService(service.id)
                      } else {
                        addService({
                          id: service.id,
                          title: service.title,
                          description: service.description
                        })
                        // Show tooltip on first selection
                        if (selectedServices.length === 0) {
                          setShowTooltip(true)
                          setTimeout(() => setShowTooltip(false), 5000)
                        }
                      }
                    }}
                    className={`relative w-full py-3 px-4 rounded-lg font-bold transition-all overflow-hidden ${
                      isServiceSelected(service.id)
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {isServiceSelected(service.id) && (
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white/20"
                      />
                    )}
                    <span className="relative z-10">
                      {isServiceSelected(service.id) 
                        ? (locale === 'ko' ? '✓ 선택됨' : '✓ Selected')
                        : (locale === 'ko' ? '+ 관심있어요' : '+ I\'m Interested')
                      }
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
      
      {/* Floating Cart with Better Guidance */}
      {selectedServices.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-2xl z-40"
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between max-w-6xl gap-4 px-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl sm:text-2xl flex-shrink-0"
              >
                🎉
              </motion.div>
              <div className="flex-1">
                <p className="font-bold text-base sm:text-lg">
                  {locale === 'ko' 
                    ? `${selectedServices.length}개 서비스 선택됨` 
                    : `${selectedServices.length} ${selectedServices.length === 1 ? 'Service' : 'Services'} Selected`
                  }
                </p>
                <p className="text-xs sm:text-sm opacity-90 hidden sm:block">
                  {locale === 'ko' 
                    ? '준비되셨나요? 무료 상담을 신청하세요!' 
                    : 'Ready to grow? Get your free consultation!'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 relative w-full sm:w-auto justify-end">
              {/* Simple animated pointer */}
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -5, 0]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    y: {
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 0.3,
                      type: "spring"
                    }
                  }}
                  className="absolute -top-10 right-12 text-2xl sm:text-3xl z-50"
                >
                  👇
                </motion.div>
              )}
              
              {/* Clear All Button */}
              <button
                onClick={() => {
                  selectedServices.forEach(s => removeService(s.id))
                }}
                className="px-3 sm:px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors text-xs sm:text-sm"
              >
                {locale === 'ko' ? '초기화' : 'Clear'}
              </button>
              
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    // Get the element position
                    const rect = contactSection.getBoundingClientRect()
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                    // Account for fixed header height - more offset for mobile/tablet
                    const isMobile = window.innerWidth < 768
                    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
                    const offset = isMobile ? 100 : isTablet ? 90 : 80
                    const targetPosition = rect.top + scrollTop - offset
                    
                    // Smooth scroll to position
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    })
                  }
                }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-purple-600 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <span>{locale === 'ko' ? '다음 단계로' : 'Continue'}</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm sm:text-base"
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}