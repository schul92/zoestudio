'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PriceRevealProps {
  price: string
  suffix?: string
  locale?: string
}

export default function PriceReveal({ price, suffix, locale = 'en' }: PriceRevealProps) {
  const [revealed, setRevealed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isKo = locale === 'ko'

  useEffect(() => { setMounted(true) }, [])

  // Server render + pre-hydration: plain price, no blur interaction
  if (!mounted) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white" style={{ filter: 'blur(8px)', userSelect: 'none' }}>
          {price}
        </span>
        {suffix && <span className="text-sm text-gray-400" style={{ filter: 'blur(6px)' }}>{suffix}</span>}
      </div>
    )
  }

  return (
    <div className="relative inline-block">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.button
            key="hidden"
            onClick={() => setRevealed(true)}
            className="group flex flex-col items-start gap-1 cursor-pointer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Blurred price */}
            <div className="relative">
              <span
                className="text-3xl font-bold text-white select-none"
                style={{ filter: 'blur(8px)', userSelect: 'none' }}
                aria-hidden="true"
              >
                {price}
              </span>
              {suffix && (
                <span
                  className="ml-2 text-sm text-gray-400 select-none"
                  style={{ filter: 'blur(6px)' }}
                  aria-hidden="true"
                >
                  {suffix}
                </span>
              )}
              {/* Frosted overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-gray-300 whitespace-nowrap"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B12492]" />
                  {isKo ? '가격 보기' : 'See pricing'}
                </motion.span>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="revealed"
            initial={{ filter: 'blur(8px)', opacity: 0, scale: 0.95 }}
            animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-baseline gap-2"
          >
            <span className="text-3xl font-bold text-white">{price}</span>
            {suffix && <span className="text-sm text-gray-400">{suffix}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
