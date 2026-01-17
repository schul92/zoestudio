'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useServices } from '@/context/ServiceContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

interface PricingClientProps {
  locale: 'en' | 'ko'
}

export default function PricingClient({ locale }: PricingClientProps) {
  const router = useRouter()
  const { selectedServices, addService, removeService, clearServices } = useServices()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null)
  const [showContinue, setShowContinue] = useState(false)
  const [subscriptionPending, setSubscriptionPending] = useState<{
    id: string
    name: string
    price: string
  } | null>(null)

  useEffect(() => {
    // Handle tier selection clicks
    const handleTierClick = (e: Event) => {
      const button = e.currentTarget as HTMLButtonElement
      const tierId = button.getAttribute('data-tier')
      
      if (tierId) {
        // Clear previous selections
        clearServices()
        setSelectedSubscription(null)
        setShowContinue(false)
        
        // If there was a pending subscription, apply it now
        if (subscriptionPending) {
          const subscriptionService = {
            id: `subscription-${subscriptionPending.id}`,
            title: `${subscriptionPending.name} Care Plan`,
            description: subscriptionPending.price,
            price: subscriptionPending.price
          }
          
          setTimeout(() => {
            addService(subscriptionService)
            setSelectedSubscription(subscriptionPending.id)
            setSubscriptionPending(null)
            
            // Update button states
            document.querySelectorAll('.subscription-button').forEach(btn => {
              btn.classList.remove('selected-subscription')
              if (btn.getAttribute('data-subscription') === subscriptionPending.id) {
                btn.classList.add('selected-subscription')
              }
            })
            
            // Show continue section and scroll to it
            setShowContinue(true)
            setTimeout(() => {
              const continueSection = document.getElementById('pricing-continue')
              if (continueSection) {
                continueSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'center'
                })
                // Add visual emphasis
                continueSection.classList.add('animate-pulse-once')
                continueSection.style.boxShadow = '0 0 40px rgba(34, 197, 94, 0.3)'
                setTimeout(() => {
                  continueSection.style.boxShadow = ''
                }, 2000)
              }
            }, 400)
          }, 500)
        }
        
        // Get tier info from button
        const tierCard = button.closest('[data-tier]')
        const tierName = tierCard?.querySelector('h3')?.textContent || ''
        
        // Add tier as service
        const tierService = {
          id: `tier-${tierId}`,
          title: `${tierName}`,
          description: locale === 'en' ? 'Website Development' : '웹사이트 개발',
          price: tierId === 'enterprise' ? 'Custom' : tierName
        }
        
        addService(tierService)
        setSelectedTier(tierId)
        
        // Update button state
        document.querySelectorAll('[data-tier] button').forEach(btn => {
          btn.classList.remove('selected-tier')
        })
        button.classList.add('selected-tier')
        
        if (tierId === 'enterprise') {
          // For enterprise, go directly to contact
          setTimeout(() => {
            window.location.href = `${locale === 'ko' ? '/ko' : '/'}#contact`
          }, 500)
        } else {
          // Scroll to subscription section
          setTimeout(() => {
            const subscriptionSection = document.getElementById('subscription-section')
            if (subscriptionSection) {
              subscriptionSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              })
              
              // Highlight the subscription section
              subscriptionSection.classList.add('highlight-section')
              setTimeout(() => {
                subscriptionSection.classList.remove('highlight-section')
              }, 2000)
            }
          }, 300)
        }
      }
    }

    // Handle subscription selection clicks
    const handleSubscriptionClick = (e: Event) => {
      const button = e.currentTarget as HTMLButtonElement
      const subscriptionId = button.getAttribute('data-subscription')
      const subscriptionName = button.getAttribute('data-subscription-name')
      const subscriptionPrice = button.getAttribute('data-subscription-price')
      
      if (subscriptionId && subscriptionName) {
        // If no tier selected, save subscription choice and guide to tier selection
        if (!selectedTier) {
          // Save the pending subscription
          setSubscriptionPending({
            id: subscriptionId,
            name: subscriptionName,
            price: subscriptionPrice || ''
          })
          
          // Mark this button as pending
          button.classList.add('pending-subscription')
          
          // Highlight the pricing section
          const pricingGrid = document.getElementById('pricing-grid')
          if (pricingGrid) {
            pricingGrid.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            })
            pricingGrid.classList.add('highlight-section')
            setTimeout(() => {
              pricingGrid.classList.remove('highlight-section')
            }, 2000)
          }
          
          // Show helpful message with step indicator
          const alertDiv = document.createElement('div')
          alertDiv.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-indigo-100 border-2 border-indigo-400 text-indigo-800 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 max-w-lg'
          alertDiv.innerHTML = `
            <span class="text-2xl">👆</span>
            <div>
              <p class="font-bold">${locale === 'en' ? `Great choice! You selected ${subscriptionName}.` : `좋은 선택입니다! ${subscriptionName}을 선택하셨습니다.`}</p>
              <p class="text-sm mt-1">${locale === 'en' ? 'Now please select a website tier above (Step 1)' : '이제 위에서 웹사이트 티어를 선택해주세요 (1단계)'}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-xs px-2 py-1 bg-indigo-200 rounded-full">Step 1: Choose Tier ↑</span>
                <span class="text-xs px-2 py-1 bg-green-200 rounded-full">✓ Step 2: ${subscriptionName}</span>
              </div>
            </div>
          `
          document.body.appendChild(alertDiv)
          
          setTimeout(() => {
            alertDiv.remove()
          }, 6000)
          
          return
        }
        
        // Remove previous subscription if any
        const prevSubscription = selectedServices.find(s => s.id.startsWith('subscription-'))
        if (prevSubscription) {
          removeService(prevSubscription.id)
        }
        
        // Add new subscription
        const subscriptionService = {
          id: `subscription-${subscriptionId}`,
          title: `${subscriptionName} Care Plan`,
          description: `${subscriptionPrice}`,
          price: subscriptionPrice || ''
        }
        
        addService(subscriptionService)
        setSelectedSubscription(subscriptionId)
        
        // Update button states
        document.querySelectorAll('.subscription-button').forEach(btn => {
          btn.classList.remove('selected-subscription')
          btn.classList.remove('pending-subscription')
        })
        button.classList.add('selected-subscription')
        
        // Show continue section and scroll to it immediately
        setShowContinue(true)
        setTimeout(() => {
          const continueSection = document.getElementById('pricing-continue')
          if (continueSection) {
            continueSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            })
            // Add a pulse animation to draw attention
            continueSection.classList.add('animate-pulse-once')
            
            // Add a glow effect temporarily
            continueSection.style.boxShadow = '0 0 40px rgba(99, 102, 241, 0.3)'
            setTimeout(() => {
              continueSection.style.boxShadow = ''
            }, 2000)
          }
        }, 100)
      }
    }

    // Attach event listeners
    const tierButtons = document.querySelectorAll('[data-tier] button')
    const subscriptionButtons = document.querySelectorAll('.subscription-button')
    
    tierButtons.forEach(button => {
      button.addEventListener('click', handleTierClick)
    })
    
    subscriptionButtons.forEach(button => {
      button.addEventListener('click', handleSubscriptionClick)
    })

    // Cleanup
    return () => {
      tierButtons.forEach(button => {
        button.removeEventListener('click', handleTierClick)
      })
      subscriptionButtons.forEach(button => {
        button.removeEventListener('click', handleSubscriptionClick)
      })
    }
  }, [selectedTier, clearServices, addService, removeService, selectedServices, router, locale, subscriptionPending])

  const handleContinue = () => {
    if (typeof window === 'undefined') return
    
    // Store selected items in sessionStorage for contact form
    sessionStorage.setItem('selectedPricing', JSON.stringify(selectedServices))
    sessionStorage.setItem('pricingComplete', 'true')
    
    // Navigate to contact form
    window.location.href = `${locale === 'ko' ? '/ko' : '/'}#contact`
  }

  return (
    <>
      {/* Continue Section */}
      <AnimatePresence>
        {showContinue && (selectedTier || selectedSubscription) && (
          <motion.div
            id="pricing-continue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto mt-12 p-8 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-8 h-8 text-green-400" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {selectedTier && selectedSubscription 
                  ? (locale === 'en' ? '🎉 Excellent! Both Steps Complete' : '🎉 훌륭합니다! 모든 단계 완료')
                  : (locale === 'en' ? '👍 Great Start! One More Step' : '👍 좋은 시작! 한 단계 더')
                }
              </h3>
              
              {/* Progress Steps Display */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  selectedTier ? 'bg-green-500/20' : 'bg-white/5'
                }`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    selectedTier ? 'bg-green-500 text-white' : 'bg-white/20 text-gray-400'
                  }`}>
                    {selectedTier ? '✓' : '1'}
                  </span>
                  <span className={`text-sm font-medium ${
                    selectedTier ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {locale === 'en' ? 'Step 1: Tier' : '1단계: 티어'}
                  </span>
                </div>
                <div className="text-gray-500">→</div>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  selectedSubscription ? 'bg-green-500/20' : 'bg-white/5'
                }`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    selectedSubscription ? 'bg-green-500 text-white' : 'bg-white/20 text-gray-400'
                  }`}>
                    {selectedSubscription ? '✓' : '2'}
                  </span>
                  <span className={`text-sm font-medium ${
                    selectedSubscription ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {locale === 'en' ? 'Step 2: Care Plan' : '2단계: 케어 플랜'}
                  </span>
                </div>
              </div>
              
              <div className="mb-6 bg-white/5 p-4 rounded-lg">
                <p className="text-gray-300 font-medium mb-2">
                  {locale === 'en' ? 'Your Package:' : '패키지:'}
                </p>
                <div className="space-y-2">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between bg-[#111111] px-3 py-2 rounded-lg border border-white/10"
                    >
                      <span className="text-sm font-medium text-white">
                        {service.id.startsWith('tier-') ? '🏢 ' : '🛡️ '}
                        {service.title}
                      </span>
                      {service.price && (
                        <span className="text-sm text-gray-400">
                          {service.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {!selectedTier || !selectedSubscription ? (
                <>
                  <p className="text-amber-400 mb-6 font-medium">
                    {!selectedTier && !selectedSubscription
                      ? (locale === 'en'
                        ? "Please complete both steps above to continue"
                        : "계속하려면 위의 두 단계를 모두 완료해주세요")
                      : !selectedTier
                      ? (locale === 'en'
                        ? "👆 Please select a website tier above (Step 1)"
                        : "👆 위에서 웹사이트 티어를 선택해주세요 (1단계)")
                      : (locale === 'en'
                        ? "👆 Please select a care plan above (Step 2)"
                        : "👆 위에서 케어 플랜을 선택해주세요 (2단계)")
                    }
                  </p>
                  <button
                    onClick={() => {
                      const targetId = !selectedTier ? 'pricing-grid' : 'subscription-section'
                      const targetSection = document.getElementById(targetId)
                      if (targetSection) {
                        targetSection.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        })
                        targetSection.classList.add('highlight-section')
                        setTimeout(() => {
                          targetSection.classList.remove('highlight-section')
                        }, 2000)
                      }
                    }}
                    className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl font-medium hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                  >
                    {!selectedTier
                      ? (locale === 'en' ? 'Select Website Tier ↑' : '웹사이트 티어 선택 ↑')
                      : (locale === 'en' ? 'Select Care Plan ↑' : '케어 플랜 선택 ↑')
                    }
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-400 mb-6">
                    {locale === 'en' 
                      ? "Final step! Fill out the contact form and we'll prepare your custom proposal within 24 hours."
                      : "마지막 단계! 연락처 양식을 작성하시면 24시간 내에 맞춤 제안서를 준비해드리겠습니다."}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContinue}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                  >
                    {locale === 'en' ? 'Continue to Contact Form' : '연락처 양식으로 계속'}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add custom styles */}
      <style jsx global>{`
        .selected-tier {
          background-color: #10b981 !important;
          color: white !important;
          position: relative;
        }
        .selected-tier::after {
          content: '✓ Selected';
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
        }
        .selected-subscription {
          background-color: #10b981 !important;
          color: white !important;
          position: relative;
        }
        .selected-subscription::after {
          content: '✓ Selected';
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
        }
        .pending-subscription {
          background-color: #fbbf24 !important;
          color: #78350f !important;
          position: relative;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .pending-subscription::after {
          content: '⏳ Pending (Select Tier First)';
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 11px;
          white-space: nowrap;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .8;
          }
        }
        .highlight-section {
          animation: pulse-border 2s ease-in-out;
        }
        @keyframes pulse-border {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(99, 102, 241, 0.3);
          }
        }
        .animate-pulse-once {
          animation: pulse-border 1s ease-out;
        }
        
      `}</style>
    </>
  )
}