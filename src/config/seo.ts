export const seoConfig = {
  en: {
    title: 'ZOE LUMOS - Korean Business Web Design & SEO | Fort Lee NJ, NYC & Nationwide',
    description: 'Bilingual web design & SEO agency trusted by Korean-American small businesses. Custom websites, Google Ads, local SEO in Fort Lee, Englewood, North Bergen, Palisades Park & nationwide. Free consultation — call today.',
    keywords: 'Korean web design, Korean American website, Korean business website, Korean SEO agency, NJ web design, NY web design, Fort Lee web design, Bergen County web design, Korean business marketing, Shopify development, e-commerce website design, local SEO expert, digital marketing agency, SEO services, Google Ads management, small business SEO NJ, small business SEO agency Englewood NJ, SEO experts North Bergen NJ, Korean web agency, bilingual website design, korean business marketing nyc, 한인 마케팅 에이전시, Palisades Park marketing, Ridgefield web design, Edgewater web design, low cost SEO New Jersey, small business SEO agency North Bergen NJ, Cliffside Park web design, AI website design NJ, Korean restaurant website, Korean business Google Ads, affordable web design Bergen County, Leonia web design',
    openGraph: {
      title: 'ZOE LUMOS - Bilingual Web Design & SEO for Korean Businesses',
      description: 'Trusted by Korean-American small businesses in Fort Lee, Englewood, North Bergen & nationwide. Custom websites, local SEO, Google Ads. Free consultation.',
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
    }
  },
  ko: {
    title: '미국 한인 웹사이트 제작 | 뉴저지 뉴욕 캘리포니아 텍사스 전국 | ZOE LUMOS',
    description: '미국 전역 한인 웹사이트 제작 전문. 뉴저지, 뉴욕, 캘리포니아, 텍사스, 조지아, 버지니아 등 미국 전 지역. 한인 비즈니스 홈페이지, 쇼핑몰 제작, 구글 광고, SEO 전문. 100% 한국어 상담.',
    keywords: '미국 한인 웹사이트, 한인 웹사이트 제작, 한인 홈페이지 제작, 뉴저지 웹사이트, 뉴저지 웹사이트 제작, 뉴욕 웹사이트, 뉴욕 웹사이트 제작, 캘리포니아 웹사이트 제작, LA 한인 웹사이트, 텍사스 웹사이트 제작, 달라스 한인 웹사이트, 조지아 웹사이트 제작, 애틀랜타 한인 웹사이트, 버지니아 웹사이트 제작, 일리노이 웹사이트, 시카고 한인 웹사이트, 워싱턴 웹사이트, 시애틀 한인 웹사이트, 하와이 웹사이트, 플로리다 웹사이트, NJ 웹사이트, NY 웹사이트, 포트리 웹사이트, 팰팍 웹사이트, 팰팍 웹사이트 제작, 플러싱 웹사이트, 한인 쇼핑몰 제작, 쇼피파이, 구글광고, 옐프광고, 한인 SEO, 검색엔진최적화, 미주 한인 비즈니스, 디지털 마케팅, 웹디자인, 한인 마케팅 에이전시 뉴저지, 리지필드 웹사이트, 에지워터 웹사이트, 클리프사이드파크 웹사이트, AI 웹사이트 제작, 한인 식당 홈페이지, 한인 구글광고 대행, 버겐카운티 웹사이트 제작',
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
    "@id": "https://www.zoelumos.com/#organization",
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
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "info@zoelumos.com",
        "contactType": "customer service",
        "availableLanguage": ["English", "Korean"],
        "areaServed": "US"
      },
      {
        "@type": "ContactPoint",
        "url": "https://pf.kakao.com/_xhxdxmlX/chat",
        "contactType": "customer service",
        "availableLanguage": ["Korean"],
        "areaServed": "US"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/zoelumos",
      "https://www.instagram.com/zoelumos",
      "https://www.linkedin.com/company/zoelumos",
      "https://pf.kakao.com/_xhxdxmlX"
    ]
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://www.zoelumos.com/#localbusiness",
    "name": "ZOE LUMOS",
    "alternateName": ["ZOE STUDIO LLC", "조이루모스"],
    "description": "Bilingual Korean-English digital marketing agency in Fort Lee, NJ. Web design, SEO, Google Ads, and Shopify e-commerce for Korean-American businesses nationwide.",
    "image": "https://www.zoelumos.com/og-image.png",
    "email": "info@zoelumos.com",
    "url": "https://www.zoelumos.com",
    "parentOrganization": { "@id": "https://www.zoelumos.com/#organization" },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2200 Center Ave",
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
        "containedInPlace": { "@type": "City", "name": "New York" }
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
        "containedInPlace": { "@type": "City", "name": "New York" }
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
        "@type": "City",
        "name": "Leonia",
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
    "knowsLanguage": ["en-US", "ko-KR"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 5,
      "reviewCount": 6,
      "bestRating": 5,
      "worstRating": 1
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
          "text": "ZOE LUMOS offers website design packages for small businesses in NJ starting at $1,000 for basic sites, $2,000-$3,500 for standard business websites, and $3,000-$6,000 for Shopify e-commerce stores. All packages include SEO optimization, mobile-responsive design, and bilingual (English/Korean) support. We serve Fort Lee, Palisades Park, Englewood, and North Bergen."
        }
      },
      {
        "@type": "Question",
        "name": "한인 비즈니스 웹사이트 제작 비용은 얼마인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ZOE LUMOS의 한인 비즈니스 웹사이트 제작 비용은 기본 사이트 $1,000부터, 비즈니스 웹사이트 $2,000-$3,500, 쇼피파이 쇼핑몰 $3,000-$6,000입니다. 모든 패키지에 SEO 최적화, 모바일 반응형 디자인, 한영 이중언어 지원이 포함됩니다. 포트리, 팰팍, 에디슨 등 NJ 전 지역과 맨하탄, 플러싱 등 NY 지역을 서비스합니다."
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
          "text": "We serve Korean-American businesses throughout NJ (Fort Lee, Palisades Park, Englewood, North Bergen, Edison, Ridgewood, Cliffside Park) and NY (Manhattan, Flushing, Bayside, Brooklyn). We also serve clients nationwide in CA, TX, GA, VA, IL, and more. We offer both in-person consultations and remote services."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a bilingual Korean-English website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard bilingual website takes 2-4 weeks from start to launch. E-commerce sites with product listings take 4-6 weeks. ZOE LUMOS handles all Korean and English content, SEO setup, and domain configuration included in the timeline."
        }
      },
      {
        "@type": "Question",
        "name": "이중언어 한영 웹사이트 제작 기간은 얼마나 걸리나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "일반 이중언어 웹사이트는 착수 후 2-4주, 쇼핑몰 사이트는 4-6주 정도 소요됩니다. ZOE LUMOS는 한국어·영어 콘텐츠 작성, SEO 설정, 도메인 구성을 모두 포함하여 진행합니다."
        }
      },
      {
        "@type": "Question",
        "name": "What is GEO and how is it different from SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GEO (Generative Engine Optimization) optimizes your content for AI-powered search like Google AI Overviews, ChatGPT, and Perplexity. While traditional SEO focuses on ranking in Google's organic results, GEO ensures your business appears when customers use AI assistants. ZOE LUMOS includes both SEO and GEO in our optimization services."
        }
      },
      {
        "@type": "Question",
        "name": "GEO란 무엇이며 SEO와 어떻게 다른가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GEO(생성형 엔진 최적화)는 Google AI Overviews, ChatGPT, Perplexity 등 AI 기반 검색에 콘텐츠를 최적화합니다. 기존 SEO가 구글 검색 순위에 집중한다면, GEO는 고객이 AI 어시스턴트를 사용할 때 비즈니스가 노출되도록 합니다. ZOE LUMOS는 SEO와 GEO를 모두 포함하여 서비스합니다."
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
        "@id": "https://www.zoelumos.com/#organization"
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
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Web Design and Development",
      "provider": {
        "@id": "https://www.zoelumos.com/#organization"
      },
      "url": "https://www.zoelumos.com/portfolio",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Design Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Website Design",
              "description": "Custom bilingual website design for Korean-American businesses starting at $1,000"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Shopify E-Commerce Development",
              "description": "Full Shopify store setup with bilingual product pages, payment processing, and SEO"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Website Revamp & Migration",
              "description": "Modernize and migrate existing websites with zero downtime"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Google Ads Management",
      "provider": {
        "@id": "https://www.zoelumos.com/#organization"
      },
      "url": "https://www.zoelumos.com/pricing",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "description": "Bilingual Google Ads campaigns for Korean-American businesses. Keyword research, ad copywriting in English and Korean, bid management, and conversion tracking."
    }
  ]
}