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
    title: 'ZOE LUMOS - 뉴욕 뉴저지 웹사이트 제작 | 구글광고 옐프광고 | SEO 전문',
    description: '뉴욕 NY 뉴저지 NJ 웹사이트 제작, 구글 광고 (Google Ads), 옐프 광고 (Yelp Ads), SEO 검색엔진 최적화 전문. 포트리, 팰팍, 플러싱 한인 비즈니스 마케팅. 홈페이지 제작부터 온라인 광고까지 원스톱 서비스. 100% 한국어 상담.',
    keywords: '뉴욕 웹사이트, NY 웹사이트, 뉴저지 웹사이트, NJ 웹사이트, 뉴욕 홈페이지 제작, 뉴저지 홈페이지 제작, NY NJ 웹사이트, 구글광고, Google Ads, 구글애드, 옐프광고, Yelp Ads, 옐프 광고, 뉴욕 구글광고, 뉴저지 구글광고, NY 구글광고, NJ 구글광고, SEO, 검색엔진최적화, 뉴욕 SEO, 뉴저지 SEO, 포트리 웹사이트, Fort Lee 웹사이트, 팰팍 웹사이트, Palisades Park 웹사이트, 플러싱 웹사이트, Flushing 웹사이트, 한인 웹사이트 제작, 한인 홈페이지, 한인 구글광고, 한인 옐프광고, 한인 마케팅, Korean website, Korean Google Ads, Korean Yelp Ads, 미국 웹사이트 제작, 미국 홈페이지 제작, 온라인 마케팅, 디지털 마케팅',
    openGraph: {
      title: 'ZOE LUMOS - NY/NJ 웹사이트 제작 | 구글·옐프 광고 전문',
      description: '뉴욕 뉴저지 웹사이트 제작, 구글광고, 옐프광고, SEO 전문. 포트리, 팰팍, 플러싱 한인 비즈니스 마케팅. 홈페이지부터 온라인 광고까지. 100% 한국어 상담.',
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
    "alternateName": "ZOE STUDIO LLC",
    "url": "https://zoelumos.com",
    "logo": "https://zoelumos.com/favicon.svg",
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
    "@type": "ProfessionalService",
    "name": "ZOE LUMOS",
    "alternateName": "ZOE STUDIO LLC",
    "image": "https://zoelumos.com/favicon.svg",
    "email": "zoestudiollc@gmail.com",
    "url": "https://zoelumos.com",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "NJ",
      "addressLocality": "New Jersey"
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