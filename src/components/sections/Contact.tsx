'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useServices } from '@/context/ServiceContext'
import { trackFormSuccess, trackFormError, trackGAEvent, GA_EVENTS, trackEmailClick, trackButtonClick } from '@/utils/analytics'
import Modal from '@/components/ui/Modal'

export default function Contact({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const { selectedServices, removeService, addService, clearServices } = useServices()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'success' | 'error' | 'loading' }>({ isOpen: false, type: 'loading' })
  const [submissionSummary, setSubmissionSummary] = useState<{ email: string; name: string; services: string[]; business?: string } | null>(null)
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [cameFromPricing, setCameFromPricing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const formStartTime = useRef<number>(0)
  
  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Check if user came from pricing page - only runs on client
  useEffect(() => {
    if (!isMounted) return
    
    const pricingComplete = sessionStorage.getItem('pricingComplete')
    const savedPricing = sessionStorage.getItem('selectedPricing')
    
    if (pricingComplete === 'true' && savedPricing) {
      try {
        const pricingServices = JSON.parse(savedPricing)
        clearServices()
        pricingServices.forEach((service: any) => {
          addService(service)
        })
        setCameFromPricing(true)
        
        // Clear the session storage
        sessionStorage.removeItem('pricingComplete')
        sessionStorage.removeItem('selectedPricing')
        
        // Show welcome message
        const welcomeDiv = document.createElement('div')
        welcomeDiv.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 border-2 border-green-400 text-green-800 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3'
        welcomeDiv.innerHTML = `
          <span class="text-2xl">✅</span>
          <div>
            <p class="font-bold">${locale === 'en' ? 'Great! Your pricing selections have been added.' : '좋습니다! 가격 선택이 추가되었습니다.'}</p>
            <p class="text-sm mt-1">${locale === 'en' ? 'Please fill out the form below to get your custom proposal.' : '맞춤 제안서를 받으려면 아래 양식을 작성해주세요.'}</p>
          </div>
        `
        document.body.appendChild(welcomeDiv)
        
        setTimeout(() => {
          welcomeDiv.remove()
        }, 5000)
      } catch (error) {
        console.error('Error loading pricing selections:', error)
      }
    }
  }, [isMounted, clearServices, addService, locale])
  
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
    setModalState({ isOpen: true, type: 'loading' })

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
          services: selectedServices.map(s => {
            // Format service with price if available
            if (s.price && s.price !== s.title) {
              return `${s.title} (${s.price})`
            }
            return s.title
          }).join(' | '),
          to: 'info@zoelumos.com'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmittedEmail(formData.email)
        
        // Store submission summary for modal
        setSubmissionSummary({
          email: formData.email,
          name: formData.name,
          services: selectedServices.map(s => {
            if (s.price && s.price !== s.title) {
              return `${s.title} (${s.price})`
            }
            return s.title
          }),
          business: formData.business || undefined
        })
        
        setModalState({ isOpen: true, type: 'success' })
        
        // Track successful submission with ALL details
        trackFormSuccess({
          services: selectedServices.map(s => s.title),
          hasPhone: !!formData.phone,
          hasBusinessName: !!formData.business,
          messageLength: formData.message.length,
          timeToSubmit: timeToSubmit
        })
      } else {
        setSubmitStatus('error')
        setModalState({ isOpen: true, type: 'error' })
        // Track submission error with details
        trackFormError('server_error', `Status: ${response.status}`)
      }
    } catch (error) {
      setSubmitStatus('error')
      setModalState({ isOpen: true, type: 'error' })
      // Track network error
      trackFormError('network_error', error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleModalClose = () => {
    setModalState({ isOpen: false, type: 'loading' })
    
    // If success, reset form and clear services
    if (submitStatus === 'success') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: ''
      })
      clearServices()
      formStartTime.current = 0
      setSubmitStatus('idle')
      setSubmissionSummary(null)
      
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    if (typeof window === 'undefined') return
    
    const currentPath = window.location.pathname
    
    // Check if we're on the pricing page
    if (currentPath.includes('/pricing')) {
      // Navigate back to pricing page
      window.location.href = `${locale === 'ko' ? '/ko' : ''}/pricing#pricing-grid`
    } 
    // Check if we're on NY or NJ website pages
    else if (currentPath.includes('/ny-website') || currentPath.includes('/nj-website')) {
      // Navigate to main page services section
      window.location.href = `${locale === 'ko' ? '/ko' : '/'}#services`
    } 
    else {
      // Try to scroll to services section on current page
      const servicesSection = document.getElementById('services')
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // If no services section, navigate to main page
        window.location.href = `${locale === 'ko' ? '/ko' : '/'}#services`
      }
    }
  }

  return (
    <>
      {/* Modal for success/error/loading states */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        type={modalState.type}
        locale={locale}
        submissionData={submissionSummary || undefined}
      />
      
      <section id="contact" className="pt-20 pb-20 md:pt-24 md:pb-20 bg-[#0a0a0a] border-t border-white/10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header - Improved mobile visibility */}
          <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 px-4 text-white">{t.contact.title}</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto px-4">
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
                <div className="bg-[#1a1a1a] rounded-3xl p-12 border-2 border-white/10 shadow-xl">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-6"
                  >
                    🎯
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {locale === 'ko'
                      ? '먼저 관심있는 서비스를 선택해주세요'
                      : 'First, Select Services You\'re Interested In'
                    }
                  </h3>

                  <p className="text-gray-400 mb-8">
                    {locale === 'ko'
                      ? '귀하의 비즈니스에 맞는 서비스를 선택하시면 맞춤형 상담을 제공해드립니다.'
                      : 'Choose the services that fit your business needs, and we\'ll provide a customized consultation.'
                    }
                  </p>

                  <div className="flex flex-col gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        trackButtonClick('Select Services', 'contact-section')
                        scrollToServices()
                      }}
                      className="bg-amber-400 text-black px-8 py-4 rounded-xl font-bold text-lg border-2 border-amber-400 hover:bg-amber-300 transition-all duration-300"
                    >
                      {locale === 'ko' ? '서비스 선택하러 가기 ↑' : 'Select Services ↑'}
                    </motion.button>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-white/20"></div>
                      <span className="text-gray-500 text-sm">{locale === 'ko' ? '또는' : 'or'}</span>
                      <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    <motion.a
                      href={`${locale === 'ko' ? '/ko' : ''}/pricing`}
                      onClick={() => trackButtonClick('View Pricing Plans', 'contact-section')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-transparent text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 text-center"
                    >
                      {locale === 'ko' ? '가격 플랜 보기' : 'View Pricing Plans'}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Services Selected - Show Form */
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Form */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#1a1a1a] p-8 rounded-2xl border-2 border-white/20 shadow-[8px_8px_0px_0px_rgba(251,191,36,0.3)]"
                >
                  {/* Selected Services Display */}
                  <motion.div
                    initial={cameFromPricing ? { scale: 0.95, opacity: 0 } : {}}
                    animate={cameFromPricing ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    className={`mb-6 p-4 rounded-lg border-2 ${
                      cameFromPricing
                        ? 'bg-green-900/20 border-green-500/50'
                        : 'bg-white/5 border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-gray-300">
                        {cameFromPricing
                          ? (locale === 'ko' ? '✅ 가격 선택 완료:' : '✅ Pricing Selection Complete:')
                          : (locale === 'ko' ? '선택한 서비스:' : 'Selected Services:')
                        }
                      </h4>
                      {cameFromPricing && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                          {locale === 'ko' ? '확인됨' : 'Confirmed'}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map(service => (
                        <motion.span
                          key={service.id}
                          initial={cameFromPricing ? { scale: 0 } : {}}
                          animate={cameFromPricing ? { scale: 1 } : {}}
                          transition={{ delay: 0.1 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 inline-flex ${
                            service.id.startsWith('tier-')
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : service.id.startsWith('subscription-')
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-white/10 text-gray-300 border border-white/20'
                          }`}
                        >
                          {service.title}
                          {service.price && service.price !== service.title && (
                            <span className="text-xs opacity-75">({service.price})</span>
                          )}
                          <button
                            onClick={() => removeService(service.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            ×
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    {cameFromPricing ? (
                      <p className="mt-3 text-xs text-gray-400">
                        {locale === 'ko'
                          ? '💡 선택하신 내용을 기반으로 맞춤 제안서를 준비하겠습니다'
                          : '💡 We\'ll prepare a custom proposal based on your selections'}
                      </p>
                    ) : (
                      <button
                        onClick={scrollToServices}
                        className="mt-3 text-sm text-amber-400 hover:text-amber-300 font-medium"
                      >
                        {locale === 'ko' ? '서비스 변경 ↑' : 'Change Services ↑'}
                      </button>
                    )}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-6 text-white">
                    {locale === 'ko' ? '무료 상담 신청' : 'Request Free Consultation'}
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="name">
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
                          className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-amber-400 focus:outline-none transition-colors bg-white/5 text-white placeholder-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="phone">
                          {locale === 'ko' ? '전화번호' : 'Phone'}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={locale === 'ko' ? '010-1234-5678' : '(555) 123-4567'}
                          className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-amber-400 focus:outline-none transition-colors bg-white/5 text-white placeholder-gray-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="email">
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
                          className={`w-full px-4 py-3 pr-10 border-2 rounded-lg focus:outline-none transition-all text-white placeholder-gray-500 ${
                            emailError && emailTouched
                              ? 'border-red-500 focus:border-red-600 bg-red-900/20'
                              : formData.email && !emailError && emailTouched
                              ? 'border-green-500 focus:border-green-600 bg-green-900/20'
                              : 'border-white/20 focus:border-amber-400 bg-white/5'
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
                      <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="business">
                        {locale === 'ko' ? '비즈니스 이름' : 'Business Name'}
                      </label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder={locale === 'ko' ? '귀사명' : 'Your Company'}
                        className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-amber-400 focus:outline-none transition-colors bg-white/5 text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="message">
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
                        className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-amber-400 focus:outline-none transition-colors resize-none bg-white/5 text-white placeholder-gray-500"
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-amber-400 text-black py-4 rounded-lg font-bold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl"
                    >
                      <span className="relative z-10">
                        {isSubmitting
                          ? (locale === 'ko' ? '전송 중...' : 'Sending...')
                          : (locale === 'ko' ? '상담 신청하기' : 'Submit Request')
                        }
                      </span>
                    </motion.button>
                  </form>
                </motion.div>
                
                {/* Right: Contact Info & Process */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* What Happens Next */}
                  <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border-2 border-white/10">
                    <h4 className="text-xl sm:text-2xl font-bold mb-6 text-white">
                      {locale === 'ko' ? '다음 단계' : 'What Happens Next?'}
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-amber-400 text-black rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {locale === 'ko' ? '24시간 내 연락' : 'Contact Within 24 Hours'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {locale === 'ko'
                              ? '귀하의 요청을 검토하고 연락드립니다'
                              : 'We\'ll review your request and reach out'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-amber-400 text-black rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {locale === 'ko' ? '무료 상담' : 'Free Consultation'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {locale === 'ko'
                              ? '30분 무료 상담으로 니즈 파악'
                              : '30-minute call to understand your needs'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-amber-400 text-black rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {locale === 'ko' ? '맞춤 제안' : 'Custom Proposal'}
                          </p>
                          <p className="text-sm text-gray-400">
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
                  <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border-2 border-white/10">
                    <h4 className="text-lg sm:text-xl font-bold mb-4 text-white">
                      {locale === 'ko' ? '연락처' : 'Get in Touch'}
                    </h4>
                    <div className="space-y-3">
                      <a
                        href="mailto:info@zoelumos.com"
                        onClick={() => trackEmailClick('info@zoelumos.com')}
                        className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors"
                      >
                        <span className="text-xl">✉️</span>
                        <span className="text-sm font-medium">info@zoelumos.com</span>
                      </a>
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-xl">📍</span>
                        <span className="text-sm font-medium">New Jersey, USA</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
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
    </>
  )
}