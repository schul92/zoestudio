'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
  params
}: {
  error: Error & { digest?: string }
  reset: () => void
  params?: { locale: string }
}) {
  const locale = params?.locale || 'en'
  const isKorean = locale === 'ko'
  
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111]">
      <div className="text-center px-6 py-12 max-w-2xl">
        <div className="mb-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            className="mx-auto text-red-500"
          >
            <path
              d="M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <text x="50" y="50" textAnchor="middle" fontSize="20" fill="currentColor">500</text>
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          {isKorean ? '오류가 발생했습니다' : 'Something went wrong!'}
        </h2>
        <p className="text-gray-400 mb-8">
          {isKorean
            ? '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            : 'An unexpected error occurred. Please try again later.'
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-amber-400 text-black rounded-lg font-semibold hover:bg-amber-300 transition-colors"
          >
            {isKorean ? '다시 시도' : 'Try Again'}
          </button>
          <Link
            href={`/${locale}`}
            className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            {isKorean ? '홈으로 돌아가기' : 'Go to Homepage'}
          </Link>
        </div>

        <div className="mt-8 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">
            {isKorean
              ? '계속해서 문제가 발생하면 info@zoelumos.com으로 문의해주세요.'
              : 'If the problem persists, please contact us at info@zoelumos.com'
            }
          </p>
        </div>
      </div>
    </div>
  )
}