'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { useServices } from '@/context/ServiceContext'
import { motion } from 'framer-motion'
import { trackButtonClick } from '@/utils/analytics'

interface PricingCTAProps {
  tierId: string
  tierName: string
  locale: 'en' | 'ko'
  isEnterprise?: boolean
  popular?: boolean
}

export default function PricingCTA({ tierId, tierName, locale, isEnterprise = false, popular = false }: PricingCTAProps) {
  const router = useRouter()
  const { addService, clearServices } = useServices()
  const [isSelected, setIsSelected] = useState(false)
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<string>('')
  const [showContinue, setShowContinue] = useState(false)

  const handleTierSelection = () => {
    // Track button click
    trackButtonClick(`Select ${tierName} Plan`, 'pricing-page')

    // Clear any existing selections first
    clearServices()
    
    // Add the selected tier as a service
    const tierService = {
      id: `tier-${tierId}`,
      title: `${tierName} ${locale === 'en' ? 'Plan' : '플랜'}`,
      description: isEnterprise 
        ? (locale === 'en' ? 'Custom enterprise solution' : '맞춤 엔터프라이즈 솔루션')
        : `${tierName} website package`,
      price: isEnterprise ? 'Custom' : tierName
    }
    
    addService(tierService)
    setIsSelected(true)
    
    if (isEnterprise) {
      // For Enterprise, go directly to contact
      setTimeout(() => {
        window.location.href = `${locale === 'ko' ? '/ko' : '/'}#contact`
      }, 500)
    } else {
      // For other tiers, show subscription selection
      setShowSubscriptionPrompt(true)
      
      // Scroll to subscription section
      setTimeout(() => {
        const subscriptionSection = document.getElementById('subscription-section')
        if (subscriptionSection) {
          subscriptionSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
  }

  const handleSubscriptionSelection = (subscriptionType: string, subscriptionName: string) => {
    // Add subscription as a service
    const subscriptionService = {
      id: `subscription-${subscriptionType}`,
      title: `${subscriptionName} ${locale === 'en' ? 'Subscription' : '구독'}`,
      description: locale === 'en' ? 'Monthly care plan' : '월간 관리 플랜',
      price: subscriptionType
    }
    
    addService(subscriptionService)
    setSelectedSubscription(subscriptionName)
    setShowContinue(true)
  }

  const handleContinue = () => {
    window.location.href = `${locale === 'ko' ? '/ko' : '/'}#contact`
  }

  return (
    <>
      <button
        onClick={handleTierSelection}
        className={`block w-full py-3 px-6 rounded-lg font-semibold transition-all text-center ${
          isSelected
            ? 'bg-green-600 text-white'
            : popular
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : isEnterprise
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
        }`}
        data-tier={tierId}
      >
        {isSelected 
          ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              {locale === 'en' ? 'Selected' : '선택됨'}
            </span>
          )
          : isEnterprise 
          ? (locale === 'en' ? 'Contact Sales' : '영업팀 문의')
          : (locale === 'en' ? 'Select Plan' : '플랜 선택')}
      </button>

      {/* Notification for tier selection */}
      {isSelected && !isEnterprise && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-sm text-green-800 font-medium text-center">
            ✓ {tierName} {locale === 'en' ? 'plan selected!' : '플랜이 선택되었습니다!'}
          </p>
          <p className="text-xs text-green-700 text-center mt-1">
            {locale === 'en' 
              ? 'Please select a subscription plan below' 
              : '아래에서 구독 플랜을 선택해주세요'}
          </p>
        </motion.div>
      )}

      {/* Global subscription selection handler */}
      {showSubscriptionPrompt && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Add event listeners to subscription buttons
              setTimeout(() => {
                const subscriptionButtons = document.querySelectorAll('#subscription-section button');
                subscriptionButtons.forEach(button => {
                  button.addEventListener('click', function() {
                    // Trigger subscription selection
                    window.dispatchEvent(new CustomEvent('subscription-selected', {
                      detail: { 
                        tier: '${tierId}',
                        tierName: '${tierName}'
                      }
                    }));
                  });
                });
              }, 500);
            `
          }}
        />
      )}
    </>
  )
}