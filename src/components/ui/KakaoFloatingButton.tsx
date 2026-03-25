'use client'

import { useState, useEffect } from 'react'
import { useServices } from '@/context/ServiceContext'

const KAKAO_CHAT_URL = 'http://pf.kakao.com/_xhxdxmlX/chat'

export default function KakaoFloatingButton() {
  const [visible, setVisible] = useState(false)
  const { selectedServices } = useServices()
  const hasFloatingCart = selectedServices.length > 0

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Hide on mobile when cart bar is open to avoid overlap
  if (hasFloatingCart) {
    return null
  }

  return (
    <a
      href={KAKAO_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on KakaoTalk"
      className={`fixed right-4 sm:right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-[#FEE500] px-4 py-3 text-[#3C1E1E] shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl active:scale-95 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ touchAction: 'manipulation' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.463-.2.723-.722 2.62-.828 3.026-.13.502.184.496.387.36.16-.106 2.544-1.726 3.576-2.428.766.112 1.56.17 2.357.17 5.523 0 10-3.463 10-7.591S17.523 3 12 3Z"
          fill="#3C1E1E"
        />
      </svg>
      <span className="text-sm font-bold hidden sm:inline">카카오톡 상담</span>
    </a>
  )
}
