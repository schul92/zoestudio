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
  submissionData?: {
    email: string
    name: string
    services: string[]
    business?: string
  }
}

export default function Modal({ isOpen, onClose, type, title, message, locale = 'en', submissionData }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

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

                {/* Show submission details for success */}
                {type === 'success' && submissionData && (
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        {locale === 'ko' ? '제출된 정보:' : 'Submitted Information:'}
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500 text-sm">📧</span>
                          <div>
                            <p className="text-xs text-gray-500">
                              {locale === 'ko' ? '이메일' : 'Email'}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {submissionData.email}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500 text-sm">👤</span>
                          <div>
                            <p className="text-xs text-gray-500">
                              {locale === 'ko' ? '이름' : 'Name'}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {submissionData.name}
                            </p>
                          </div>
                        </div>
                        
                        {submissionData.business && (
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 text-sm">🏢</span>
                            <div>
                              <p className="text-xs text-gray-500">
                                {locale === 'ko' ? '회사' : 'Business'}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {submissionData.business}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {submissionData.services.length > 0 && (
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 text-sm">📋</span>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                {locale === 'ko' ? '선택한 서비스' : 'Selected Services'}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {submissionData.services.map((service, index) => (
                                  <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-800">
                        💡 {locale === 'ko' 
                          ? '이메일 주소가 맞는지 확인해주세요. 잘못된 경우 다시 문의해주시기 바랍니다.' 
                          : 'Please verify your email address is correct. If incorrect, please submit again.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {type === 'success' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
                  >
                    {locale === 'ko' ? '확인했습니다 ✓' : 'Confirmed & Close ✓'}
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