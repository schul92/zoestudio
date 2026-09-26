'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X, Send, Mail, Sparkles } from 'lucide-react'

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
          <div
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        )
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />
      case 'loading':
        return (
          <div className="relative">
            {/* Envelope container */}
            <div
              className="relative"
            >
              <Mail className="w-16 h-16 text-indigo-600" />
            </div>
            
            {/* Flying paper plane */}
            <div
              className="absolute -top-2 -right-2"
            >
              <Send className="w-6 h-6 text-indigo-500" />
            </div>
            
            {/* Sparkles around */}
            <div
              className="absolute -top-1 -left-1"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            
            <div
              className="absolute -bottom-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            
            <div
              className="absolute top-1/2 -left-3"
            >
              <Sparkles className="w-3 h-3 text-purple-400" />
            </div>
          </div>
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
          title: locale === 'ko' ? '메시지 전송 중...' : 'Sending Your Message...',
          message: locale === 'ko' ? '귀하의 요청을 안전하게 전송하고 있습니다' : 'Your request is being securely transmitted'
        }
    }
  }

  const content = getDefaultContent()
  const displayTitle = title || content.title
  const displayMessage = message || content.message

  return (
    <>
      {isVisible && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={type !== 'loading' ? onClose : undefined}
          />

          {/* Modal */}
          <div
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
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
                  >
                    {locale === 'ko' ? '확인했습니다 ✓' : 'Confirmed & Close ✓'}
                  </button>
                )}

                {type === 'error' && (
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      {locale === 'ko' ? '닫기' : 'Close'}
                    </button>
                    <a
                      href="mailto:info@zoelumos.com"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      {locale === 'ko' ? '이메일 보내기' : 'Send Email'}
                    </a>
                  </div>
                )}

                {/* Progress bar and dots for loading */}
                {type === 'loading' && (
                  <div className="space-y-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%]"
                      />
                    </div>
                    
                    {/* Animated dots */}
                    <div className="flex justify-center gap-1">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className="w-2 h-2 bg-indigo-600 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}