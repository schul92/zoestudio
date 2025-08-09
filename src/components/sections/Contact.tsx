'use client'

import { useTranslation } from '@/hooks/useTranslation'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
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

  return (
    <section id="contact" className="py-20 bg-white text-black border-t-4 border-black">
      <div className="container mx-auto px-6">
        <ScrollAnimation>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">{t.contact.title}</h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 text-center max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-2xl font-bold mb-6">
                  {locale === 'ko' ? '무료 상담 신청' : 'Request Free Consultation'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
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
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
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
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
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
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {locale === 'ko' ? '메시지 *' : 'Message *'}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                      {isSubmitting 
                        ? (locale === 'ko' ? '전송 중...' : 'Sending...') 
                        : (locale === 'ko' ? '상담 신청하기' : 'Send Message')
                      }
                    </span>
                  </motion.button>
                  
                  {submitStatus === 'success' && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 text-center font-medium"
                    >
                      {locale === 'ko' ? '메시지가 성공적으로 전송되었습니다!' : 'Message sent successfully!'}
                    </motion.p>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-center font-medium"
                    >
                      {locale === 'ko' ? '오류가 발생했습니다. 다시 시도해주세요.' : 'An error occurred. Please try again.'}
                    </motion.p>
                  )}
                </form>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">
                    {locale === 'ko' ? '연락처 정보' : 'Contact Information'}
                  </h3>
                  
                  <div className="space-y-6">
                    <a 
                      href="mailto:zoestudiollc@gmail.com" 
                      className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-lg">Email</p>
                        <p className="text-gray-700">zoestudiollc@gmail.com</p>
                      </div>
                    </a>
                    
                    <a 
                      href="tel:+12015551234" 
                      className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-lg">Phone</p>
                        <p className="text-gray-700">+1 (201) 555-1234</p>
                      </div>
                    </a>
                    
                    <div className="group flex items-start space-x-4 p-4 rounded-lg">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-lg">Location</p>
                        <p className="text-gray-700">New Jersey, USA</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black text-white p-6 rounded-2xl">
                  <h4 className="text-xl font-bold mb-3">
                    {locale === 'ko' ? '업무 시간' : 'Business Hours'}
                  </h4>
                  <div className="space-y-2">
                    <p>{locale === 'ko' ? '월-금: 오전 9시 - 오후 6시 (EST)' : 'Mon-Fri: 9:00 AM - 6:00 PM EST'}</p>
                    <p>{locale === 'ko' ? '토-일: 휴무' : 'Sat-Sun: Closed'}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}