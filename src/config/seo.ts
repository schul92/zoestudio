export const seoConfig = {
  en: {
    title: 'ZOE LUMOS - Professional SEO Services, Google Ads & Web Design | Digital Marketing Agency',
    description: 'Boost your online presence with expert SEO services, Google Ads management, and custom website design. ZOE LUMOS helps businesses rank higher, get more traffic, and increase conversions. Free SEO audit. Proven results.',
    keywords: 'SEO services, search engine optimization, Google Ads management, PPC advertising, website design and development, local SEO expert, digital marketing agency, SEO consultant, Google Ads specialist, web design services, online marketing solutions, SEO audit, keyword research, on-page SEO, off-page SEO, technical SEO, content marketing, conversion optimization, small business SEO, ecommerce SEO, mobile SEO, Yelp advertising, social media marketing',
    openGraph: {
      title: 'ZOE LUMOS - Grow Your Business Online',
      description: 'Professional SEO, Google Ads & Website Design for Small Businesses. Get Found on Google. Free Consultation.',
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
    }
  },
  ko: {
    title: 'ZOE LUMOS - 전문 SEO 서비스, 구글 광고 & 웹 디자인 | 디지털 마케팅 에이전시',
    description: '전문 SEO 서비스, 구글 광고 관리, 맞춤형 웹사이트 디자인으로 온라인 비즈니스를 성장시키세요. ZOE LUMOS가 검색 순위 상승, 트래픽 증가, 전환율 향상을 도와드립니다. 무료 SEO 분석. 검증된 결과.',
    keywords: 'SEO 서비스, 검색엔진최적화, 구글 광고 관리, PPC 광고, 웹사이트 디자인 및 개발, 로컬 SEO 전문가, 디지털 마케팅 에이전시, SEO 컨설턴트, 구글 광고 전문가, 웹 디자인 서비스, 온라인 마케팅 솔루션, SEO 분석, 키워드 연구, 온페이지 SEO, 오프페이지 SEO, 기술 SEO, 콘텐츠 마케팅, 전환 최적화, 중소기업 SEO, 이커머스 SEO, 모바일 SEO, 옐프 광고, 소셜 미디어 마케팅',
    openGraph: {
      title: 'ZOE LUMOS - 비즈니스를 온라인에서 성장시키세요',
      description: '소규모 비즈니스를 위한 전문 SEO, 구글 광고 및 웹사이트 디자인. 구글 검색 상단에 노출. 무료 상담.',
      siteName: 'ZOE LUMOS',
      locale: 'ko_KR',
    }
  }
}

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZOE LUMOS",
    "url": "https://zoelumos.com",
    "logo": "https://zoelumos.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "zoestudiollc@gmail.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Korean"]
    },
    "sameAs": [
      "https://facebook.com/zoelumos",
      "https://instagram.com/zoelumos",
      "https://linkedin.com/company/zoelumos"
    ]
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ZOE LUMOS",
    "image": "https://zoelumos.com/logo.png",
    "email": "zoestudiollc@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "89"
    }
  },
  services: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Search Engine Optimization",
      "provider": {
        "@type": "Organization",
        "name": "ZOE LUMOS"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "SEO Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Local SEO",
              "description": "Get found by local customers searching for your business"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-commerce SEO",
              "description": "Increase online sales with targeted SEO strategies"
            }
          }
        ]
      }
    }
  ]
}