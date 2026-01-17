'use client'

import { useState, useRef, useEffect } from 'react'
import { trackOutboundLink } from '@/utils/analytics'

const INSTAGRAM_PROFILE = 'https://www.instagram.com/zoelumos/'

const INSTAGRAM_VIDEOS = [
  {
    id: 'reel-1',
    src: '/reel-1.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DNwqeiqYk8s/',
  },
  {
    id: 'reel-2',
    src: '/reel-2.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DOUkdz9Ee9j/',
  },
]

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

interface InstagramHoverProps {
  position?: 'top' | 'bottom'
  showLabel?: boolean
  locale?: string
}

export default function InstagramHover({ position = 'bottom', showLabel = true, locale = 'en' }: InstagramHoverProps) {
  const [isHovering, setIsHovering] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        if (isHovering) {
          video.play().catch(() => {})
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [isHovering])

  const dropdownPosition = position === 'top'
    ? 'top-full mt-2'
    : 'bottom-full mb-2'

  const dropdownAnimation = position === 'top'
    ? (isHovering ? 'translate-y-0' : '-translate-y-2')
    : (isHovering ? 'translate-y-0' : 'translate-y-2')

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <a
        href={INSTAGRAM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundLink(INSTAGRAM_PROFILE, 'Instagram Profile')}
        className="flex items-center group/link text-gray-600 hover:text-black transition-colors duration-200"
      >
        <span className="mr-3 group-hover/link:scale-110 transition-transform duration-200">
          <InstagramIcon className="w-5 h-5" />
        </span>
        {showLabel && (
          <span className="text-sm border-b border-transparent hover:border-black transition-all duration-200">
            @zoelumos
          </span>
        )}
      </a>

      {/* Dropdown with videos */}
      <div
        className={`absolute left-0 ${dropdownPosition} bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 z-50 ${isHovering ? 'opacity-100 visible' : 'opacity-0 invisible'} ${dropdownAnimation}`}
        style={{ width: '280px' }}
      >
        <div className="p-3">
          <div className="flex gap-2">
            {INSTAGRAM_VIDEOS.map((video, index) => (
              <a
                key={video.id}
                href={video.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundLink(video.instagramUrl, `Instagram Reel ${index + 1}`)}
                className="block relative group/video flex-1"
              >
                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-100">
                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    src={video.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/video:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover/video:opacity-100 transition-opacity text-white text-xs font-medium">View</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Export for nav bar use (icon only, dropdown goes down)
export function InstagramNavHover({ locale = 'en', lightMode = false }: { locale?: string; lightMode?: boolean }) {
  const [isHovering, setIsHovering] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        if (isHovering) {
          video.play().catch(() => {})
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [isHovering])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <a
        href={INSTAGRAM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundLink(INSTAGRAM_PROFILE, 'Instagram Nav')}
        className={`relative group py-2 px-3 flex items-center transition-colors duration-300 ${lightMode ? 'text-white hover:text-white/80' : 'text-black hover:text-gray-600'}`}
        aria-label="Instagram @zoelumos"
      >
        <InstagramIcon className="w-5 h-5" />
      </a>

      {/* Dropdown with videos */}
      <div
        className={`absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 z-50 ${isHovering ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        style={{ width: '340px' }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <InstagramIcon className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-900">@zoelumos</span>
          </div>
          <div className="flex gap-2">
            {INSTAGRAM_VIDEOS.map((video, index) => (
              <a
                key={video.id}
                href={video.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundLink(video.instagramUrl, `Instagram Reel Nav ${index + 1}`)}
                className="block relative group/video flex-1"
              >
                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-100">
                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    src={video.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/video:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover/video:opacity-100 transition-opacity text-white text-xs font-medium">View</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundLink(INSTAGRAM_PROFILE, 'Instagram View Profile')}
            className="mt-3 block text-center text-xs text-gray-500 hover:text-pink-500 transition-colors"
          >
            {locale === 'ko' ? '프로필 보기' : 'View Profile'}
          </a>
        </div>
      </div>
    </div>
  )
}

// Simple icon for footer bottom
export function InstagramIconLink() {
  return (
    <a
      href={INSTAGRAM_PROFILE}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackOutboundLink(INSTAGRAM_PROFILE, 'Instagram Footer Icon')}
      className="text-gray-500 hover:text-pink-500 transition-colors duration-200"
      aria-label="Instagram @zoelumos"
    >
      <InstagramIcon className="w-5 h-5" />
    </a>
  )
}

// Mobile menu link
export function InstagramMobileLink({ onClose }: { onClose?: () => void }) {
  const handleClick = () => {
    trackOutboundLink(INSTAGRAM_PROFILE, 'Instagram Mobile Menu')
    onClose?.()
  }

  return (
    <a
      href={INSTAGRAM_PROFILE}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex items-center gap-3 py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors text-lg font-medium"
    >
      <InstagramIcon className="w-5 h-5" />
      <span>Instagram</span>
    </a>
  )
}
