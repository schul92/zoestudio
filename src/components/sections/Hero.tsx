'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import WorkflowModal from './WorkflowModal'

export default function Hero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false)
  
  return (
    <section className="container mx-auto px-6 py-20 min-h-[85vh] flex items-center relative">
      <div className="text-center mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-black rounded-full opacity-5"
        />
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tight"
        >
          {t.hero.title}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block text-gray-500"
          >
            {t.hero.subtitle}
          </motion.span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-light"
        >
          {t.hero.description}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-10 py-5 rounded-xl text-lg font-bold shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            {t.hero.cta.start}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWorkflowOpen(true)}
            className="border-2 border-black px-10 py-5 rounded-xl text-lg font-bold transition-all text-black bg-white"
          >
            {t.hero.cta.view}
          </motion.button>
        </motion.div>
        
        {/* Animated decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 right-0 w-20 h-20 border-2 border-black rounded-full opacity-10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-32 h-32 border-2 border-black rounded-full opacity-10"
        />
      </div>
      
      {/* Workflow Modal */}
      <WorkflowModal 
        isOpen={isWorkflowOpen} 
        onClose={() => setIsWorkflowOpen(false)}
        locale={locale}
      />
    </section>
  )
}