export const seoConfig = {
  en: {
    title: 'ZOE LUMOS | Korean-American Web Design & SEO Agency | Fort Lee NJ & Nationwide',
    description: 'Bilingual Korean-English web design & SEO agency for Korean-American small businesses. Affordable websites, Google Ads, local SEO in Fort Lee, Palisades Park, Englewood, Flushing & nationwide. 한국어 상담 가능. Free consultation today.',
    keywords: 'Korean web design agency, Korean American website design, Korean business website NJ, Korean SEO agency New Jersey, Fort Lee web design, Palisades Park web design, Bergen County web design, Korean business marketing NJ, bilingual website design, Korean restaurant website, Korean spa website, Korean business Google Ads, local SEO Fort Lee NJ, Englewood NJ web design, North Bergen web design, Flushing NY web design, Korean American digital marketing, 한인 웹사이트 제작 뉴저지, 한인 마케팅 에이전시 NJ, small business SEO New Jersey, affordable web design NJ, how to get more Korean customers online, Korean business SEO expert, web design for Korean restaurants, Korean hair salon website, Shopify Korean store, e-commerce Korean business',
    openGraph: {
      title: 'ZOE LUMOS | Korean-American Web Design & SEO | Fort Lee NJ',
      description: 'Bilingual web design & SEO for Korean-American businesses in Fort Lee, Palisades Park, Flushing & nationwide. Custom websites, local SEO, Google Ads. 한국어 상담 가능.',
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
    }
  },
  ko: {
    title: '미국 한인 웹사이트 제작 | 뉴저지 뉴욕 캘리포니아 텍사스 전국 | ZOE LUMOS',
    description: '미국 전역 한인 웹사이트 제작 전문. 뉴저지, 뉴욕, 캘리포니아, 텍사스, 조지아, 버지니아 등 미국 전 지역. 한인 비즈니스 홈페이지, 쇼핑몰 제작, 구글 광고, SEO 전문. 100% 한국어 상담.',
    keywords: '미국 한인 웹사이트, 한인 웹사이트 제작, 한인 홈페이지 제작, 뉴저지 웹사이트, 뉴저지 웹사이트 제작, 뉴욕 웹사이트, 뉴욕 웹사이트 제작, 캘리포니아 웹사이트 제작, LA 한인 웹사이트, 텍사스 웹사이트 제작, 달라스 한인 웹사이트, 조지아 웹사이트 제작, 애틀랜타 한인 웹사이트, 버지니아 웹사이트 제작, 일리노이 웹사이트, 시카고 한인 웹사이트, 워싱턴 웹사이트, 시애틀 한인 웹사이트, 하와이 웹사이트, 플로리다 웹사이트, NJ 웹사이트, NY 웹사이트, 포트리 웹사이트, 팰팍 웹사이트, 팰팍 웹사이트 제작, 플러싱 웹사이트, 한인 쇼핑몰 제작, 쇼피파이, 구글광고, 옐프광고, 한인 SEO, 검색엔진최적화, 미주 한인 비즈니스, 디지털 마케팅, 웹디자인, 한인 마케팅 에이전시 뉴저지, 리지필드 웹사이트, 에지워터 웹사이트',
    openGraph: {
      title: '미국 한인 웹사이트 제작 | 전국 한인 비즈니스 전문 | ZOE LUMOS',
      description: '미국 전역 한인 웹사이트 제작. NJ, NY, CA, TX, GA, VA 등 전 지역. 쇼핑몰, SEO, 구글광고. 100% 한국어 상담.',
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
    "legalName": "ZOE STUDIO LLC",
    "alternateName": ["조이루모스", "Zoe Studio"],
    "url": "https://www.zoelumos.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.zoelumos.com/og-image.png",
      "width": 512,
      "height": 512
    },
    "email": "info@zoelumos.com",
    "description": "Bilingual Korean-English digital marketing agency serving Korean-American small businesses nationwide. Services include web design, SEO, Google Ads, and e-commerce.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@zoelumos.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Korean"],
      "areaServed": "US"
    },
    "sameAs": [
      "https://www.facebook.com/zoelumos",
      "https://www.instagram.com/zoelumos",
      "https://www.linkedin.com/company/zoelumos"
    ]
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "ZOE LUMOS",
    "alternateName": ["ZOE STUDIO LLC", "조이루모스"],
    "description": "Bilingual Korean-English digital marketing agency in Fort Lee, NJ. Web design, SEO, Google Ads, and Shopify e-commerce for Korean-American businesses nationwide.",
    "image": "https://www.zoelumos.com/og-image.png",
    "email": "info@zoelumos.com",
    "url": "https://www.zoelumos.com",
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
        "containedInPlace": { "@type": "AdministrativeArea", "name": "Queens" }
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
        "containedInPlace": { "@type": "AdministrativeArea", "name": "Queens" }
      },
      {
        "@type": "City",
        "name": "Brooklyn",
        "containedInPlace": { "@type": "State", "name": "New York" }
      },
      {
        "@type": "City",
        "name": "North Bergen",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      },
      {
        "@type": "City",
        "name": "Edison",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      },
      {
        "@type": "City",
        "name": "Cliffside Park",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      },
      {
        "@type": "AdministrativeArea",
        "name": "Bergen County",
        "containedInPlace": { "@type": "State", "name": "New Jersey" }
      }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "knowsLanguage": ["en-US", "ko-KR"]
  },
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does website design cost for a small business in New Jersey?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ZOE LUMOS offers affordable website design packages for small businesses in NJ starting from competitive rates. We provide custom solutions for Korean-American businesses in Fort Lee, Palisades Park, Englewood, and North Bergen. Contact us for a free consultation and quote."
        }
      },
      {
        "@type": "Question",
        "name": "한인 비즈니스 웹사이트 제작 비용은 얼마인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ZOE LUMOS는 뉴저지, 뉴욕 지역 한인 비즈니스를 위한 맞춤형 웹사이트 제작 서비스를 제공합니다. 포트리, 팰팍, 에디슨 등 NJ 전 지역과 맨하탄, 플러싱 등 NY 지역을 서비스합니다. 무료 상담을 통해 정확한 견적을 받아보세요."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer SEO services for Korean businesses in Bergen County?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! ZOE LUMOS specializes in bilingual SEO (English & Korean) for Korean-American businesses across Bergen County, including Fort Lee, Palisades Park, Englewood, Ridgewood, and North Bergen. We optimize for both English and Korean search queries to maximize your visibility."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve in New Jersey and New York?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve Korean-American businesses throughout NJ (Fort Lee, Palisades Park, Englewood, North Bergen, Edison, Ridgewood, Cliffside Park) and NY (Manhattan, Flushing, Bayside, Brooklyn). We offer both in-person consultations and remote services."
        }
      }
    ]
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