import Link from 'next/link'

export default function NotFound({
  params
}: {
  params?: { locale: string }
}) {
  const locale = params?.locale || 'en'
  const isKorean = locale === 'ko'
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center px-6 py-12 max-w-2xl">
        <div className="mb-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            className="mx-auto opacity-50"
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
            <text x="50" y="50" textAnchor="middle" fontSize="24" fill="currentColor">404</text>
          </svg>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isKorean ? '페이지를 찾을 수 없습니다' : 'Page Not Found'}
        </h2>
        <p className="text-gray-600 mb-8">
          {isKorean 
            ? '요청하신 페이지가 존재하지 않거나 이동되었습니다.' 
            : 'The page you are looking for doesn\'t exist or has been moved.'
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {isKorean ? '홈으로 돌아가기' : 'Go to Homepage'}
          </Link>
          <Link
            href={`/${locale}#contact`}
            className="px-6 py-3 bg-white text-black border-2 border-black rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            {isKorean ? '문의하기' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </div>
  )
}