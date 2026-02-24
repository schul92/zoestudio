export const seoConfig = {
  en: {
    title: 'ZOE LUMOS - Fort Lee NJ Web Design & SEO | Korean Business Digital Marketing Agency',
    description: 'Fort Lee, NJ web design & SEO agency serving Korean-American businesses in Bergen County, NYC metro. Expert website development, Google Ads, local SEO. Bilingual English & Korean. Free consultation.',
    keywords: 'Fort Lee web design, Fort Lee NJ web designer, Bergen County web design, Korean business marketing NYC, NJ Korean SEO, Korean American digital marketing, Fort Lee website development, Palisades Park web design, small business SEO New Jersey, Korean web agency NJ, SEO services, Google Ads management, Shopify development, e-commerce website design, local SEO expert, website design and development, digital marketing agency, SEO consultant, web design services, small business SEO, ecommerce SEO',
    openGraph: {
      title: 'ZOE LUMOS - Fort Lee NJ Web Design & SEO for Korean Businesses',
      description: 'Fort Lee, NJ web design & SEO agency. Korean-American business specialists in Bergen County & NYC metro. Free consultation.',
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
    }
  },
  ko: {
    title: '뉴저지 웹사이트 제작 | 뉴욕 웹사이트 | 뉴저지 사이트 제작 전문 - ZOE LUMOS',
    description: '뉴저지 웹사이트 제작, 뉴욕 웹사이트 제작 전문 업체. 뉴저지 사이트 제작, NJ 홈페이지 제작, NY 홈페이지 제작. 포트리, 팰팍, 에디슨, 플러싱 한인 비즈니스 웹사이트. 구글 광고, 옐프 광고, SEO 전문. 100% 한국어 상담.',
    keywords: '뉴저지 웹사이트, 뉴저지 웹사이트 제작, 뉴저지 사이트 제작, 뉴저지 홈페이지, 뉴저지 홈페이지 제작, NJ 웹사이트, NJ 웹사이트 제작, NJ 사이트 제작, NJ 홈페이지 제작, 뉴욕 웹사이트, 뉴욕 웹사이트 제작, NY 웹사이트, NY 홈페이지 제작, 포트리 웹사이트, 포트리 웹디자인, 포트리 홈페이지 제작, 팰팍 웹사이트, 에디슨 웹사이트, 플러싱 웹사이트, 맨하탄 웹사이트, 한인 웹사이트, 한인 웹사이트 제작, 한인 홈페이지 제작, 한인 마케팅 에이전시, 한인 디지털 마케팅, 쇼피파이, Shopify, 쇼핑몰 제작, 이커머스 웹사이트, 뉴저지 쇼핑몰 제작, 구글광고, Google Ads, 옐프광고, 뉴저지 SEO, 뉴욕 SEO, 검색엔진최적화, 미주 한인 비즈니스, 디지털 마케팅, 웹디자인, 웹개발, 반응형 웹사이트, 지역 SEO, 구글 마이비즈니스, 버겐카운티 웹사이트, 포트리 한인 비즈니스, 팰리세이즈파크 웹사이트',
    openGraph: {
      title: '뉴저지 웹사이트 제작 | 뉴욕 웹사이트 | ZOE LUMOS',
      description: '뉴저지 웹사이트 제작, 뉴욕 웹사이트 제작 전문. 뉴저지 사이트 제작, NJ 홈페이지 제작, NY 홈페이지 제작. 포트리, 팰팍, 플러싱 한인 비즈니스. 100% 한국어 상담.',
      siteName: 'ZOE LUMOS 조이루모스',
      locale: 'ko_KR',
    }
  }
}

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZOE LUMOS",
    "alternateName": ["ZOE STUDIO LLC", "조이루모스", "뉴저지 웹사이트 제작", "뉴욕 웹사이트 제작"],
    "url": "https://zoelumos.com",
    "logo": "https://zoelumos.com/favicon.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-201-555-0123",
      "email": "zoestudiollc@gmail.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Korean"],
      "areaServed": ["US"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    },
    "sameAs": [
      "https://facebook.com/zoelumos",
      "https://instagram.com/zoelumos",
      "https://linkedin.com/company/zoelumos"
    ]
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ZOE LUMOS",
    "alternateName": ["ZOE STUDIO LLC", "조이루모스", "뉴저지 웹사이트 전문", "뉴욕 웹사이트 전문"],
    "description": "뉴저지 웹사이트 제작, 뉴욕 웹사이트 제작 전문 업체. NJ 홈페이지 제작, NY 홈페이지 제작. 포트리, 팰팍, 플러싱 한인 비즈니스 웹사이트.",
    "image": "https://zoelumos.com/favicon.svg",
    "email": "zoestudiollc@gmail.com",
    "url": "https://zoelumos.com",
    "telephone": "+1-201-555-0123",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "NJ",
      "addressLocality": "Fort Lee",
      "postalCode": "07024"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.8509,
      "longitude": -73.9712
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Fort Lee",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      },
      {
        "@type": "City",
        "name": "Palisades Park",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      },
      {
        "@type": "City",
        "name": "Flushing",
        "containedInPlace": { "@type": "City", "name": "Queens, New York" }
      },
      {
        "@type": "City",
        "name": "Manhattan",
        "containedInPlace": { "@type": "State", "name": "New York" }
      },
      {
        "@type": "City",
        "name": "Ridgewood",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      },
      {
        "@type": "City",
        "name": "Englewood",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      },
      {
        "@type": "City",
        "name": "Bayside",
        "containedInPlace": { "@type": "City", "name": "Queens, New York" }
      },
      {
        "@type": "City",
        "name": "Brooklyn",
        "containedInPlace": { "@type": "State", "name": "New York" }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Bergen County",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      }
    ],
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