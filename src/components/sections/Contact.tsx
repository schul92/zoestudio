'use client'

import { useTranslation } from '@/hooks/useTranslation'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useServices } from '@/context/ServiceContext'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

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
        setFormData({
          name: '',
          email: '',
          phone: '',
          business: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
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
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white border-t-4 border-black">
      <div className="container mx-auto px-6">
        <ScrollAnimation>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-black mb-4">{t.contact.title}</h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
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
                            className="text-gray-500 hover:text-red-500 transition-colors"
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
                        <label className="block text-sm font-medium mb-2">
                          {locale === 'ko' ? '이름 *' : 'Name *'}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {locale === 'ko' ? '전화번호' : 'Phone'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'ko' ? '이메일 *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'ko' ? '비즈니스 이름' : 'Business Name'}
                      </label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'ko' ? '추가 메시지' : 'Additional Message'}
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={locale === 'ko' 
                          ? '귀하의 비즈니스에 대해 더 알려주세요...' 
                          : 'Tell us more about your business needs...'
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors resize-none"
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border-2 border-green-300 rounded-lg"
                      >
                        <p className="text-green-700 font-medium text-center">
                          {locale === 'ko' 
                            ? '✅ 상담 신청이 접수되었습니다! 곧 연락드리겠습니다.' 
                            : '✅ Request received! We\'ll contact you soon.'
                          }
                        </p>
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
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-gray-200">
                    <h4 className="text-2xl font-bold mb-6 text-black">
                      {locale === 'ko' ? '다음 단계' : 'What Happens Next?'}
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-semibold">
                            {locale === 'ko' ? '24시간 내 연락' : 'Contact Within 24 Hours'}
                          </p>
                          <p className="text-sm text-gray-600">
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
                          <p className="font-semibold">
                            {locale === 'ko' ? '무료 상담' : 'Free Consultation'}
                          </p>
                          <p className="text-sm text-gray-600">
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
                          <p className="font-semibold">
                            {locale === 'ko' ? '맞춤 제안' : 'Custom Proposal'}
                          </p>
                          <p className="text-sm text-gray-600">
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
                  <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
                    <h4 className="text-xl font-bold mb-4">
                      {locale === 'ko' ? '연락처' : 'Get in Touch'}
                    </h4>
                    <div className="space-y-3">
                      <a href="mailto:zoestudiollc@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                        <span className="text-xl">✉️</span>
                        <span className="text-sm">zoestudiollc@gmail.com</span>
                      </a>
                      <div className="flex items-center gap-3 text-gray-700">
                        <span className="text-xl">📍</span>
                        <span className="text-sm">New Jersey, USA</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <span className="text-xl">⏰</span>
                        <span className="text-sm">
                          {locale === 'ko' ? '월-금 9AM-6PM EST' : 'Mon-Fri 9AM-6PM EST'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}