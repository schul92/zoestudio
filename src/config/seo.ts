export const seoConfig = {
  en: {
    title: 'ZOE LUMOS - Korean Business Web Design & SEO Agency | NJ NY CA TX GA VA Nationwide',
    description: 'Web design & SEO agency for Korean-American businesses nationwide. Serving NJ, NY, CA, TX, GA, VA, IL, WA, and all 50 states. Website development, Google Ads, Shopify, local SEO. Bilingual English & Korean. Free consultation.',
    keywords: 'Korean web design, Korean American website, Korean business website, Korean SEO agency, NJ web design, NY web design, California Korean website, Texas Korean website, Georgia Korean website, Virginia Korean website, Fort Lee web design, Palisades Park web design, Bergen County web design, Korean business marketing, Shopify development, e-commerce website design, local SEO expert, digital marketing agency, SEO services, Google Ads management, small business SEO, small business SEO agency NJ, Korean web agency, bilingual website design, Englewood NJ SEO, North Bergen web design',
    openGraph: {
      title: 'ZOE LUMOS - Korean Business Web Design & SEO Agency Nationwide',
      description: 'Web design & SEO for Korean-American businesses in NJ, NY, CA, TX, GA, VA and all 50 states. Bilingual experts. Free consultation.',
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
    }
  },
  ko: {
    title: '미국 한인 웹사이트 제작 | 뉴저지 뉴욕 캘리포니아 텍사스 전국 | ZOE LUMOS',
    description: '미국 전역 한인 웹사이트 제작 전문. 뉴저지, 뉴욕, 캘리포니아, 텍사스, 조지아, 버지니아 등 미국 전 지역. 한인 비즈니스 홈페이지, 쇼핑몰 제작, 구글 광고, SEO 전문. 100% 한국어 상담.',
    keywords: '미국 한인 웹사이트, 한인 웹사이트 제작, 한인 홈페이지 제작, 뉴저지 웹사이트, 뉴저지 웹사이트 제작, 뉴욕 웹사이트, 뉴욕 웹사이트 제작, 캘리포니아 웹사이트 제작, LA 한인 웹사이트, 텍사스 웹사이트 제작, 달라스 한인 웹사이트, 조지아 웹사이트 제작, 애틀랜타 한인 웹사이트, 버지니아 웹사이트 제작, 일리노이 웹사이트, 시카고 한인 웹사이트, 워싱턴 웹사이트, 시애틀 한인 웹사이트, 하와이 웹사이트, 플로리다 웹사이트, NJ 웹사이트, NY 웹사이트, 포트리 웹사이트, 팰팍 웹사이트, 팰리세이즈파크 웹사이트, 플러싱 웹사이트, 한인 쇼핑몰 제작, 쇼피파이, 구글광고, 옐프광고, 한인 SEO, 한인 마케팅 에이전시, 뉴저지 검색엔진최적화, 검색엔진최적화, 미주 한인 비즈니스, 디지털 마케팅, 웹디자인, 한인 구글광고 뉴저지',
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
    "alternateName": ["ZOE STUDIO LLC", "조이루모스", "뉴저지 웹사이트 제작", "뉴욕 웹사이트 제작"],
    "url": "https://www.zoelumos.com",
    "logo": "https://www.zoelumos.com/favicon.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@zoelumos.com",
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
    "image": "https://www.zoelumos.com/favicon.svg",
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
    "openingHours": "Mo-Fr 09:00-18:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "89"
    }
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