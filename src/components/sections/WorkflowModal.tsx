'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

interface WorkflowModalProps {
  isOpen: boolean
  onClose: () => void
  locale?: string
}

export default function WorkflowModal({ isOpen, onClose, locale = 'en' }: WorkflowModalProps) {
  const { t } = useTranslation(locale)
  const [activeStep, setActiveStep] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  const steps = [
    {
      number: '01',
      title: locale === 'ko' ? '상담' : 'Consult',
      description: locale === 'ko' ? '무료 비즈니스 분석' : 'Free business analysis',
      icon: '💡',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02', 
      title: locale === 'ko' ? '전략' : 'Strategy',
      description: locale === 'ko' ? '맞춤형 계획 수립' : 'Custom plan creation',
      icon: '🎯',
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '03',
      title: locale === 'ko' ? '실행' : 'Execute',
      description: locale === 'ko' ? 'SEO & 광고 시작' : 'Launch SEO & Ads',
      icon: '🚀',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      number: '04',
      title: locale === 'ko' ? '성장' : 'Grow',
      description: locale === 'ko' ? '지속적 최적화' : 'Continuous optimization',
      icon: '📈',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  useEffect(() => {
    if (isOpen && !hasInteracted) {
      const timer = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length)
      }, 2000)
      return () => clearInterval(timer)
    }
  }, [isOpen, hasInteracted, steps.length])

  useEffect(() => {
    if (!isOpen) {
      setHasInteracted(false)
      setActiveStep(0)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-8 max-w-4xl w-full mx-4 border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur text-white/60 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all"
            >
              ✕
            </motion.button>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-white mb-2"
              >
                {locale === 'ko' ? '성공까지 4단계' : '4 Steps to Success'}
              </motion.h2>
              <p className="text-gray-400 text-sm">
                {locale === 'ko' ? '클릭하여 각 단계 확인' : 'Click to explore each step'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-0 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              
              {/* Step Dots */}
              <div className="relative flex justify-between">
                {steps.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setActiveStep(index)
                      setHasInteracted(true)
                    }}
                    className="relative w-3 h-3 -mt-1"
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className={`w-full h-full rounded-full ${
                        index <= activeStep ? 'bg-white' : 'bg-gray-600'
                      }`}
                      animate={{
                        scale: index === activeStep ? [1, 1.5, 1] : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Steps Content */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  onClick={() => {
                    setActiveStep(index)
                    setHasInteracted(true)
                  }}
                  className="relative cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: index === activeStep ? 1.05 : 1
                  }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`
                    relative overflow-hidden rounded-xl p-4 h-full
                    ${index === activeStep 
                      ? 'bg-gradient-to-br ' + step.color + ' text-white' 
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                    }
                    transition-all duration-300
                  `}>
                    {/* Background Effect */}
                    {index === activeStep && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <span className={`text-xs font-bold ${
                          index === activeStep ? 'text-white/80' : 'text-gray-600'
                        }`}>
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                      <p className={`text-xs ${
                        index === activeStep ? 'text-white/90' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Step Details */}
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/30 rounded-xl p-6 mb-6 border border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className={`
                  w-12 h-12 rounded-lg bg-gradient-to-br ${steps[activeStep].color} 
                  flex items-center justify-center text-2xl flex-shrink-0
                `}>
                  {steps[activeStep].icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              {locale === 'ko' ? '시작하기 →' : 'Get Started →'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}