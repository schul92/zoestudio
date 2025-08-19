'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useServices } from '@/context/ServiceContext'
import Contact from './Contact'

export default function ContactWrapper({ locale = 'en' }: { locale?: string }) {
  const searchParams = useSearchParams()
  const { addService, clearServices } = useServices()

  useEffect(() => {
    const service = searchParams.get('service')
    if (service) {
      // Clear existing services and add the one from URL
      clearServices()
      
      // Parse the service parameter
      if (service.includes('Enterprise')) {
        addService({
          id: 'enterprise-ecommerce',
          title: service, // Will be "Enterprise - Ecommerce Website & Shopify Store"
          description: locale === 'ko' 
            ? '대규모 조직을 위한 맞춤 이커머스 솔루션'
            : 'Custom e-commerce solution for large organizations',
          price: 'Custom'
        })
      } else {
        // Handle regular tier selections if needed
        const tierMap: Record<string, any> = {
          'Hobby': {
            id: 'hobby',
            title: 'Hobby Plan',
            description: locale === 'ko' 
              ? '개인 프로젝트 및 소규모 웹사이트'
              : 'Personal projects and small websites',
            price: '$1k'
          },
          'Plus': {
            id: 'plus',
            title: 'Plus Plan',
            description: locale === 'ko'
              ? '성장하는 비즈니스를 위한 전문 사이트'
              : 'Professional sites for growing businesses',
            price: '$2k-3k'
          },
          'Pro': {
            id: 'pro',
            title: 'Pro Plan with Shopify',
            description: locale === 'ko'
              ? 'Shopify 통합을 갖춘 완전한 이커머스 솔루션'
              : 'Full e-commerce solution with Shopify integration',
            price: '$3k-6k'
          }
        }

        if (tierMap[service]) {
          addService(tierMap[service])
        }
      }
    }
  }, [searchParams, addService, clearServices, locale])

  return <Contact locale={locale} />
}