'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X, Loader2 } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error' | 'loading'
  title?: string
  message?: string
  locale?: string
}

export default function Modal({ isOpen, onClose, type, title, message, locale = 'en' }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Auto close success modals after 3 seconds
      if (type === 'success') {
        const timer = setTimeout(() => {
          onClose()
        }, 3000)
        return () => clearTimeout(timer)
      }
    } else {
      setIsVisible(false)
    }
  }, [isOpen, onClose, type])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
        )
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />
      case 'loading':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-16 h-16 text-indigo-600" />
          </motion.div>
        )
    }
  }

  const getDefaultContent = () => {
    switch (type) {
      case 'success':
        return {
          title: locale === 'ko' ? '성공적으로 전송되었습니다!' : 'Successfully Sent!',
          message: locale === 'ko' 
            ? '메시지를 받았습니다. 곧 연락드리겠습니다.' 
            : 'We received your message and will get back to you soon.'
        }
      case 'error':
        return {
          title: locale === 'ko' ? '오류가 발생했습니다' : 'Something went wrong',
          message: locale === 'ko'
            ? '다시 시도해 주시거나 직접 이메일을 보내주세요.'
            : 'Please try again or email us directly.'
        }
      case 'loading':
        return {
          title: locale === 'ko' ? '전송 중...' : 'Sending...',
          message: locale === 'ko' ? '잠시만 기다려주세요' : 'Please wait a moment'
        }
    }
  }

  const content = getDefaultContent()
  const displayTitle = title || content.title
  const displayMessage = message || content.message

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={type !== 'loading' ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 pointer-events-auto">
              {/* Close button - only show if not loading */}
              {type !== 'loading' && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}

              {/* Content */}
              <div className="text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  {getIcon()}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {displayTitle}
                </h3>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                  {displayMessage}
                </p>

                {/* Action Buttons */}
                {type === 'success' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    {locale === 'ko' ? '확인' : 'Got it!'}
                  </motion.button>
                )}

                {type === 'error' && (
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      {locale === 'ko' ? '닫기' : 'Close'}
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:zoestudiollc@gmail.com"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      {locale === 'ko' ? '이메일 보내기' : 'Send Email'}
                    </motion.a>
                  </div>
                )}

                {/* Progress bar for loading */}
                {type === 'loading' && (
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '90%' }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}