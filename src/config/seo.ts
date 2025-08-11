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
    title: 'ZOE LUMOS - 뉴욕 뉴저지 한인 비즈니스 전문 마케팅 | 100% 한국어 상담',
    description: '뉴욕, 뉴저지, 포트리, 팰팍, 플러싱 한인 사업체 전문. 레스토랑, 네일샵, 부동산, 병원 등 모든 한인 비즈니스를 위한 SEO, 구글 광고, 웹사이트 제작. 100% 한국어 상담 가능.',
    keywords: '뉴욕 한인 마케팅, 뉴저지 한인 마케팅, 포트리 한인, Fort Lee Korean business, 팰팍 한인, Palisades Park Korean, 플러싱 한인 비즈니스, Flushing Korean, 맨하탄 한인, 리지우드 한인, 잉글우드 한인, 한국어 SEO, 한인 구글 광고, 한인 웹사이트 제작, NJ 한인 마케팅, NY 한인 마케팅, 한인 디지털 마케팅, 미주 한인 비즈니스, 교민 사업체 마케팅, 한인 레스토랑 마케팅, 한인 네일샵 마케팅, 한인 부동산 마케팅, 한인 병원 마케팅, 한인 법률사무소 마케팅, Korean American business marketing',
    openGraph: {
      title: 'ZOE LUMOS - 뉴욕·뉴저지 한인 비즈니스 성공 파트너',
      description: '포트리, 팰팍, 플러싱 등 한인 밀집 지역 비즈니스 전문. 100% 한국어 상담. SEO, 구글 광고, 웹사이트 제작.',
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
      "addressCountry": "US",
      "addressRegion": "NJ, NY",
      "addressLocality": "Fort Lee, Palisades Park, Flushing, Manhattan"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Fort Lee"
      },
      {
        "@type": "City", 
        "name": "Palisades Park"
      },
      {
        "@type": "City",
        "name": "Flushing"
      },
      {
        "@type": "City",
        "name": "Manhattan"
      },
      {
        "@type": "City",
        "name": "Ridgewood"
      },
      {
        "@type": "City",
        "name": "Englewood"
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