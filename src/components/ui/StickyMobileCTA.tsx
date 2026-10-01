'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useServices } from '@/context/ServiceContext'
import { trackKakaoClick } from '@/utils/analytics'

const KAKAO_CHAT_URL = 'http://pf.kakao.com/_xhxdxmlX/chat'

/**
 * Mobile-only sticky bottom action bar: KakaoTalk chat and free quote.
 * Evidence: sticky bottom CTAs lift mobile conversions ~+31% (Contentsquare,
 * 58M sessions); KakaoTalk yellow is the instant-recognition channel for our
 * Korean SMB audience. Appears after the hero (600px), hides while the
 * contact section is on screen and when the mobile service-cart bar is open.
 */
export default function StickyMobileCTA({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const [pastHero, setPastHero] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)
  const { selectedServices } = useServices()

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setPastHero(window.scrollY > 600))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Hide over any form or the contact section — on phones those run several screens tall, so a ratio threshold
  // never fired and the bar sat on top of "Send inquiry". Also hide while the keyboard is up.
  const [typing, setTyping] = useState(false)
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('#contact, form'))
    const onScreen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)))
      setContactVisible(onScreen.size > 0)
    })
    targets.forEach((t) => io.observe(t))
    const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches('input, textarea, select, [contenteditable="true"]')
    const onFocusIn = (e: FocusEvent) => { if (isField(e.target)) setTyping(true) }
    const onFocusOut = () => setTyping(false)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      io.disconnect()
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  const track = (label: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'sticky_cta_click', {
        cta: label,
        page_path: window.location.pathname,
      })
    }
  }

  const show = pastHero && !contactVisible && !typing && selectedServices.length === 0

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-[80] transition-transform duration-300 ease-out will-change-transform ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!show}
    >
      <div className="grid grid-cols-2 gap-2 p-2 border-t border-hairline kn-frost">
        <a
          href={KAKAO_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            track('kakao')
            trackKakaoClick('sticky_mobile_cta')
          }}
          tabIndex={show ? 0 : -1}
          className="flex items-center justify-center gap-2 rounded-[14px] bg-[#FEE500] min-h-[48px] py-3.5 text-[15px] font-bold text-[#3C1E1E] active:opacity-90"
          style={{ touchAction: 'manipulation' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.463-.2.723-.722 2.62-.828 3.026-.13.502.184.496.387.36.16-.106 2.544-1.726 3.576-2.428.766.112 1.56.17 2.357.17 5.523 0 10-3.463 10-7.591S17.523 3 12 3Z"
              fill="#3C1E1E"
            />
          </svg>
          {isKo ? '카톡 상담' : 'KakaoTalk'}
        </a>
        <Link
          href={`${prefix}/contact`}
          onClick={() => track('quote')}
          tabIndex={show ? 0 : -1}
          className="flex items-center justify-center gap-1.5 keep-light rounded-[14px] bg-[#F5F5F7] min-h-[48px] py-3.5 text-[15px] font-semibold text-[#0B0B0D] active:opacity-90"
          style={{ touchAction: 'manipulation' }}
        >
          {isKo ? '무료 견적' : 'Free quote'}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}
