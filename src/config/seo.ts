export const seoConfig = {
  en: {
    title: 'ZOE LUMOS Digital - SEO, Google & Yelp Ads, Website Design for Small Business',
    description: 'Get more customers with professional SEO, Google Ads, Yelp Ads, and website design. We help small businesses grow online. Free consultation. Results in 30 days.',
    keywords: 'SEO services, Google Ads management, Yelp advertising, website design, small business marketing, local SEO, web development, digital marketing agency',
    openGraph: {
      title: 'ZOE LUMOS - Grow Your Business Online',
      description: 'Professional SEO, Google Ads & Website Design for Small Businesses. Get Found on Google. Free Consultation.',
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
    }
  },
  ko: {
    title: 'ZOE LUMOS Digital - 소규모 비즈니스를 위한 SEO, 구글 & 옐프 광고, 웹사이트 제작',
    description: '전문적인 SEO, 구글 광고, 옐프 광고, 웹사이트 디자인으로 더 많은 고객을 확보하세요. 소규모 비즈니스의 온라인 성장을 도와드립니다. 무료 상담. 30일 내 결과.',
    keywords: 'SEO 서비스, 구글 광고 관리, 옐프 광고, 웹사이트 디자인, 소규모 비즈니스 마케팅, 로컬 SEO, 웹 개발, 디지털 마케팅 에이전시',
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
    "name": "ZOE STUDIO LLC",
    "url": "https://zoelumos.com",
    "logo": "https://zoelumos.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-234-567-890",
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
    "name": "ZOE STUDIO LLC",
    "image": "https://zoelumos.com/logo.png",
    "telephone": "+1-234-567-890",
    "email": "hello@zoelumos.com",
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
        "name": "ZOE STUDIO LLC"
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