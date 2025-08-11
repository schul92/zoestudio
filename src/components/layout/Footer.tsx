import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

export default function Footer({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : '' // English uses root, Korean uses /ko
  
  return (
    <footer className="w-full relative bg-gradient-to-b from-gray-50 to-white">
      {/* Modern border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent"></div>
      
      <div className="w-full px-8 lg:px-12 xl:px-20 pt-32 pb-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="group">
            <div className="relative mb-6">
              <h3 className="font-bold text-xl text-gray-900 tracking-wide">ZOE LUMOS</h3>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-black group-hover:w-24 transition-all duration-300"></div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === 'ko' 
                ? '소규모 비즈니스가 온라인에서 성공할 수 있도록 돕는 디지털 마케팅 에이전시'
                : 'Digital marketing agency helping small businesses succeed online'
              }
            </p>
          </div>
          
          {/* Services */}
          <div className="group">
            <div className="relative mb-6">
              <h3 className="font-bold text-lg text-gray-900 uppercase tracking-wider text-sm">
                {locale === 'ko' ? '서비스' : 'Services'}
              </h3>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gray-400 group-hover:w-16 group-hover:bg-black transition-all duration-300"></div>
            </div>
            <ul className="space-y-3">
              <li>
                <Link href={`${prefix}#services`} className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200 text-sm">
                  {locale === 'ko' ? 'SEO 서비스' : 'SEO Services'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}#services`} className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200 text-sm">
                  {locale === 'ko' ? '구글 & 옐프 광고 관리' : 'Google & Yelp Ads Management'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}#services`} className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200 text-sm">
                  {locale === 'ko' ? '웹사이트 디자인 & 개발' : 'Website Design & Development'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}#services`} className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200 text-sm">
                  {locale === 'ko' ? 'LLC 설립 서비스' : 'LLC Formation Services'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="group">
            <div className="relative mb-6">
              <h3 className="font-bold text-lg text-gray-900 uppercase tracking-wider text-sm">
                {locale === 'ko' ? '연락처' : 'Contact'}
              </h3>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gray-400 group-hover:w-16 group-hover:bg-black transition-all duration-300"></div>
            </div>
            <div className="space-y-3">
              <a 
                href="mailto:zoestudiollc@gmail.com" 
                className="flex items-center group/link text-gray-600 hover:text-black transition-colors duration-200"
              >
                <span className="mr-3 text-lg group-hover/link:scale-110 transition-transform duration-200">✉️</span>
                <span className="text-sm border-b border-transparent hover:border-black transition-all duration-200">
                  zoestudiollc@gmail.com
                </span>
              </a>
            </div>
          </div>
          
          {/* Service Areas - SEO Optimized */}
          <div className="group">
            <div className="relative mb-6">
              <h3 className="font-bold text-lg text-gray-900 uppercase tracking-wider text-sm">
                {locale === 'ko' ? '서비스 지역' : 'Service Areas'}
              </h3>
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gray-400 group-hover:w-16 group-hover:bg-black transition-all duration-300"></div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {locale === 'ko' 
                  ? '전국 대도시 및 중소도시 | 온라인 비즈니스 | 로컬 비즈니스 | 이커머스'
                  : 'Nationwide Service | Major Metropolitan Areas | Local Business | E-commerce | Remote Consultation Available'
                }
              </p>
              <div className="pt-2 space-y-1">
                {(locale === 'ko' 
                  ? ['SEO 서비스', '구글 광고', '웹사이트 제작', '디지털 마케팅']
                  : ['Professional SEO Services', 'Google Ads Management', 'Web Design', 'Digital Marketing Solutions']
                ).map((tag, index) => (
                  <span key={index} className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 mr-2 mb-1 hover:bg-gray-200 transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section with modern divider */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative bg-gradient-to-b from-gray-50 to-white">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>
          
          <div className="pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                © 2025 ZOE STUDIO LLC. {t.footer.rights}
              </p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <Link 
                  href={`${prefix}/privacy`} 
                  className="text-gray-600 hover:text-black text-sm relative group"
                >
                  <span>{t.footer.privacy}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link 
                  href={`${prefix}/terms`} 
                  className="text-gray-600 hover:text-black text-sm relative group"
                >
                  <span>{t.footer.terms}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-200"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}