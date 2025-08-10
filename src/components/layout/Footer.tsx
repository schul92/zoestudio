import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

export default function Footer({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : '/en'
  
  return (
    <footer className="w-full border-t-4 border-black bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">ZOE STUDIO LLC</h3>
            <p className="text-gray-600 text-sm mb-4">
              {locale === 'ko' 
                ? '소규모 비즈니스가 온라인에서 성공할 수 있도록 돕는 디지털 마케팅 에이전시'
                : 'Digital marketing agency helping small businesses succeed online'
              }
            </p>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {locale === 'ko' ? '서비스' : 'Services'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${prefix}#services`} className="text-gray-600 hover:text-black transition-colors text-sm">
                  {locale === 'ko' ? 'SEO 서비스' : 'SEO Services'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}#services`} className="text-gray-600 hover:text-black transition-colors text-sm">
                  {locale === 'ko' ? '구글 & 옐프 광고 관리' : 'Google & Yelp Ads Management'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}#services`} className="text-gray-600 hover:text-black transition-colors text-sm">
                  {locale === 'ko' ? '웹사이트 디자인 & 개발' : 'Website Design & Development'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}#services`} className="text-gray-600 hover:text-black transition-colors text-sm">
                  {locale === 'ko' ? 'LLC 설립 서비스' : 'LLC Formation Services'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {locale === 'ko' ? '연락처' : 'Contact'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="tel:+12345678900" className="hover:text-black transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
            </ul>
          </div>
          
          {/* Service Areas - SEO Optimized */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {locale === 'ko' ? '서비스 지역' : 'Service Areas'}
            </h3>
            <p className="text-sm text-gray-600">
              {locale === 'ko' 
                ? '전국 대도시 및 중소도시 | 온라인 비즈니스 | 로컬 비즈니스 | 이커머스'
                : 'Nationwide Service | Major Metropolitan Areas | Local Business | E-commerce | Remote Consultation Available'
              }
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {locale === 'ko'
                ? 'SEO 서비스 | 구글 광고 | 웹사이트 제작 | 디지털 마케팅'
                : 'Professional SEO Services | Google Ads Management | Web Design | Digital Marketing Solutions'
              }
            </p>
          </div>
        </div>
        
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} ZOE STUDIO LLC. {t.footer.rights}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href={`${prefix}/privacy`} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                {t.footer.privacy}
              </Link>
              <Link href={`${prefix}/terms`} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}