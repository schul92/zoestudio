'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useServices } from '@/context/ServiceContext'
import { trackFormSuccess, trackFormError, trackGAEvent, GA_EVENTS } from '@/utils/analytics'

export default function Contact({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const { selectedServices, removeService } = useServices()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const formStartTime = useRef<number>(0)
  
  // Track when user starts interacting with form
  useEffect(() => {
    if (formData.name || formData.email || formData.phone || formData.business || formData.message) {
      if (formStartTime.current === 0) {
        formStartTime.current = Date.now()
        trackGAEvent(GA_EVENTS.FORM_FIELD_INTERACTION, {
          category: 'engagement',
          label: 'form_started'
        })
      }
    }
  }, [formData])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return locale === 'ko' ? '이메일을 입력해주세요' : 'Email is required'
    }
    if (!emailRegex.test(email)) {
      return locale === 'ko' ? '올바른 이메일 형식이 아닙니다' : 'Please enter a valid email'
    }
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Validate email in real-time
    if (name === 'email' && emailTouched) {
      setEmailError(validateEmail(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track form attempt
    trackGAEvent(GA_EVENTS.FORM_SUBMIT_ATTEMPT, {
      category: 'engagement',
      label: 'form_submit_clicked',
      services_count: selectedServices.length
    })
    
    // Validate email before submitting
    const emailValidationError = validateEmail(formData.email)
    if (emailValidationError) {
      setEmailError(emailValidationError)
      setEmailTouched(true)
      // Track validation error
      trackFormError('email_validation_failed', emailValidationError)
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Calculate time spent on form
    const timeToSubmit = formStartTime.current ? Math.round((Date.now() - formStartTime.current) / 1000) : 0

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services: selectedServices.map(s => s.title).join(', '),
          to: 'zoestudiollc@gmail.com'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmittedEmail(formData.email)
        
        // Track successful submission with ALL details
        trackFormSuccess({
          services: selectedServices.map(s => s.title),
          hasPhone: !!formData.phone,
          hasBusinessName: !!formData.business,
          messageLength: formData.message.length,
          timeToSubmit: timeToSubmit
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          business: '',
          message: ''
        })
        formStartTime.current = 0
      } else {
        setSubmitStatus('error')
        // Track submission error with details
        trackFormError('server_error', `Status: ${response.status}`)
      }
    } catch (error) {
      setSubmitStatus('error')
      // Track network error
      trackFormError('network_error', error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="contact" className="pt-20 pb-20 md:pt-24 md:pb-20 bg-gradient-to-br from-gray-50 to-white border-t-4 border-black relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header - Improved mobile visibility */}
          <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 px-4">{t.contact.title}</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 max-w-2xl mx-auto px-4">
                {t.contact.subtitle}
              </p>
            </div>

            {selectedServices.length === 0 ? (
              /* No Services Selected - Guide to Select */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-white rounded-3xl p-12 border-2 border-gray-200 shadow-xl">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-6"
                  >
                    🎯
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-black">
                    {locale === 'ko' 
                      ? '먼저 관심있는 서비스를 선택해주세요' 
                      : 'First, Select Services You\'re Interested In'
                    }
                  </h3>
                  
                  <p className="text-gray-600 mb-8">
                    {locale === 'ko'
                      ? '귀하의 비즈니스에 맞는 서비스를 선택하시면 맞춤형 상담을 제공해드립니다.'
                      : 'Choose the services that fit your business needs, and we\'ll provide a customized consultation.'
                    }
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToServices}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    {locale === 'ko' ? '서비스 선택하러 가기 ↑' : 'Select Services ↑'}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* Services Selected - Show Form */
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Form */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {/* Selected Services Display */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                    <h4 className="font-bold text-sm text-gray-700 mb-2">
                      {locale === 'ko' ? '선택한 서비스:' : 'Selected Services:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map(service => (
                        <span
                          key={service.id}
                          className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-800 border border-gray-300 flex items-center gap-2 inline-flex"
                        >
                          {service.title}
                          <button
                            onClick={() => removeService(service.id)}
                            className="text-gray-600 hover:text-red-500 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={scrollToServices}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {locale === 'ko' ? '서비스 변경 ↑' : 'Change Services ↑'}
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold mb-6">
                    {locale === 'ko' ? '무료 상담 신청' : 'Request Free Consultation'}
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2" htmlFor="name">
                          {locale === 'ko' ? '이름 *' : 'Name *'}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={locale === 'ko' ? '홍길동' : 'John Doe'}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2" htmlFor="phone">
                          {locale === 'ko' ? '전화번호' : 'Phone'}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={locale === 'ko' ? '010-1234-5678' : '(555) 123-4567'}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2" htmlFor="email">
                        {locale === 'ko' ? '이메일 *' : 'Email *'}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => {
                            setEmailTouched(true)
                            setEmailError(validateEmail(formData.email))
                          }}
                          className={`w-full px-4 py-3 pr-10 border-2 rounded-lg focus:outline-none transition-all text-gray-900 placeholder-gray-500 ${
                            emailError && emailTouched
                              ? 'border-red-500 focus:border-red-600 bg-red-50'
                              : formData.email && !emailError && emailTouched
                              ? 'border-green-500 focus:border-green-600 bg-green-50'
                              : 'border-gray-300 focus:border-black bg-white'
                          }`}
                          placeholder={locale === 'ko' ? 'example@email.com' : 'example@email.com'}
                        />
                        {/* Validation Icon */}
                        {emailTouched && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {emailError ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-red-500"
                              >
                                ❌
                              </motion.div>
                            ) : formData.email ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-green-500"
                              >
                                ✅
                              </motion.div>
                            ) : null}
                          </div>
                        )}
                      </div>
                      {/* Error Message */}
                      {emailError && emailTouched && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center"
                        >
                          <span className="mr-1">⚠️</span>
                          {emailError}
                        </motion.p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2" htmlFor="business">
                        {locale === 'ko' ? '비즈니스 이름' : 'Business Name'}
                      </label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder={locale === 'ko' ? '귀사명' : 'Your Company'}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors bg-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2" htmlFor="message">
                        {locale === 'ko' ? '추가 메시지' : 'Additional Message'}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={locale === 'ko' 
                          ? '귀하의 비즈니스에 대해 더 알려주세요...' 
                          : 'Tell us more about your business needs...'
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors resize-none bg-white text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        {isSubmitting 
                          ? (locale === 'ko' ? '전송 중...' : 'Sending...') 
                          : (locale === 'ko' ? '상담 신청하기' : 'Submit Request')
                        }
                      </span>
                    </motion.button>
                    
                    {submitStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl shadow-lg"
                      >
                        <div className="text-center space-y-3">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="text-4xl"
                          >
                            ✅
                          </motion.div>
                          <p className="text-green-800 font-bold text-lg">
                            {locale === 'ko' 
                              ? '상담 신청이 접수되었습니다!' 
                              : 'Request Successfully Submitted!'
                            }
                          </p>
                          <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="text-gray-700 text-sm">
                              {locale === 'ko' 
                                ? '확인 이메일을 다음 주소로 보냈습니다:' 
                                : 'Confirmation email sent to:'
                              }
                            </p>
                            <p className="text-green-700 font-semibold text-base mt-1">
                              📧 {submittedEmail}
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {locale === 'ko' 
                              ? '이메일함을 확인해주세요. 스팸함도 확인하시기 바랍니다.' 
                              : 'Please check your inbox. Don\'t forget to check spam folder too.'
                            }
                          </p>
                          <p className="text-gray-700 font-medium">
                            {locale === 'ko' 
                              ? '24시간 이내에 연락드리겠습니다.' 
                              : 'We\'ll contact you within 24 hours.'
                            }
                          </p>
                        </div>
                      </motion.div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border-2 border-red-300 rounded-lg"
                      >
                        <p className="text-red-700 font-medium text-center">
                          {locale === 'ko' 
                            ? '❌ 오류가 발생했습니다. 다시 시도해주세요.' 
                            : '❌ An error occurred. Please try again.'
                          }
                        </p>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
                
                {/* Right: Contact Info & Process */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* What Happens Next */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-8 rounded-2xl border-2 border-gray-200">
                    <h4 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">
                      {locale === 'ko' ? '다음 단계' : 'What Happens Next?'}
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {locale === 'ko' ? '24시간 내 연락' : 'Contact Within 24 Hours'}
                          </p>
                          <p className="text-sm text-gray-800">
                            {locale === 'ko' 
                              ? '귀하의 요청을 검토하고 연락드립니다' 
                              : 'We\'ll review your request and reach out'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {locale === 'ko' ? '무료 상담' : 'Free Consultation'}
                          </p>
                          <p className="text-sm text-gray-800">
                            {locale === 'ko' 
                              ? '30분 무료 상담으로 니즈 파악' 
                              : '30-minute call to understand your needs'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {locale === 'ko' ? '맞춤 제안' : 'Custom Proposal'}
                          </p>
                          <p className="text-sm text-gray-800">
                            {locale === 'ko' 
                              ? '귀하의 비즈니스를 위한 맞춤 계획' 
                              : 'Tailored plan for your business growth'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-gray-200">
                    <h4 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">
                      {locale === 'ko' ? '연락처' : 'Get in Touch'}
                    </h4>
                    <div className="space-y-3">
                      <a href="mailto:zoestudiollc@gmail.com" className="flex items-center gap-3 text-gray-800 hover:text-black transition-colors">
                        <span className="text-xl">✉️</span>
                        <span className="text-sm font-medium">zoestudiollc@gmail.com</span>
                      </a>
                      <div className="flex items-center gap-3 text-gray-800">
                        <span className="text-xl">📍</span>
                        <span className="text-sm font-medium">New Jersey, USA</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-800">
                        <span className="text-xl">⏰</span>
                        <span className="text-sm font-medium">
                          {locale === 'ko' ? '월-금 9AM-6PM EST' : 'Mon-Fri 9AM-6PM EST'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
      </div>
    </section>
  )
}