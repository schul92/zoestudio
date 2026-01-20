import { NextResponse } from 'next/server'

const llmsContent = `# ZOE LUMOS (조이루모스)

> Korean-American digital marketing agency specializing in website design, SEO, and Google Ads for businesses in New Jersey and New York. 100% Korean language support available.

ZOE LUMOS is a web design and digital marketing agency headquartered in Fort Lee, New Jersey. Founded to serve the Korean-American business community in the NY/NJ metropolitan area, we provide professional website design, SEO optimization, Google Ads management, and Shopify e-commerce solutions. All consultations available in Korean (한국어 상담 가능).

## Company Information

- **Name**: ZOE LUMOS (조이루모스)
- **Location**: Fort Lee, New Jersey, USA
- **Service Area**: New Jersey (Fort Lee, Palisades Park, Edison, Cherry Hill) and New York (Flushing, Manhattan)
- **Languages**: English, Korean (한국어)
- **Email**: hello@zoelumos.com
- **Website**: https://www.zoelumos.com

## Services

### Website Design ($1,000 - $6,000)
Professional business websites optimized for both Korean and American customers. Includes responsive design, SEO basics, and bilingual support.

- Basic Business Website: $1,000 - $2,500 (1-2 weeks)
- E-commerce / Shopify Store: $3,000 - $6,000 (2-4 weeks)
- Custom Web Applications: Contact for quote

### SEO Services ($500/month+)
Google search ranking optimization for local businesses. Specializing in Korean-English bilingual SEO for the NY/NJ market.

- Local SEO for NJ/NY businesses
- Korean keyword optimization (뉴저지 웹사이트, 뉴욕 홈페이지)
- Google My Business optimization
- Monthly performance reports

### Google Ads Management ($300/month+)
PPC advertising management targeting Korean-American customers in the tri-state area.

- Campaign setup and optimization
- Korean and English ad copy
- Local targeting (Fort Lee, Palisades Park, Flushing)
- ROI tracking and reporting

### Yelp Advertising
Yelp Ads management for local service businesses including restaurants, salons, and medical practices.

## Service Areas

### New Jersey
- Fort Lee (포트리) - NJ Koreatown hub
- Palisades Park (팰팍) - Korean community center
- Ridgefield - Growing Korean business area
- Edgewater - Emerging business district
- Edison - Central NJ Korean hub
- Cherry Hill - South NJ Korean community

### New York
- Flushing (플러싱) - Largest NYC Koreatown
- Manhattan Koreatown (32nd Street)
- Bayside - Korean residential area

## Industries Served

- Restaurants & Cafes (Korean BBQ, cafes, bakeries)
- Beauty & Hair Salons
- Medical & Dental Practices
- Law Firms & CPA Offices
- Real Estate Agencies
- Retail & E-commerce

## Why Choose ZOE LUMOS

1. **100% Korean Language Support**: All consultations in Korean (한국어 상담)
2. **Local NJ/NY Expertise**: Understanding of Korean-American business market
3. **Bilingual Websites**: Korean and English website development
4. **Google Page 1 Guarantee**: SEO optimization for local search
5. **In-Person Meetings**: Fort Lee office, on-site visits throughout NJ/NY

## Pricing Summary

| Service | Starting Price | Timeline |
|---------|---------------|----------|
| Business Website | $1,000 | 1-2 weeks |
| E-commerce Store | $3,000 | 2-4 weeks |
| SEO Services | $500/month | Ongoing |
| Google Ads | $300/month | Ongoing |

## Key Pages

- [Homepage](https://www.zoelumos.com): Main landing page
- [Korean Homepage](https://www.zoelumos.com/ko): 한국어 메인 페이지
- [NJ Website Services](https://www.zoelumos.com/nj-website): New Jersey web design
- [NY Website Services](https://www.zoelumos.com/ny-website): New York web design
- [뉴저지 웹사이트](https://www.zoelumos.com/ko/뉴저지-웹사이트): NJ services in Korean
- [뉴욕 웹사이트](https://www.zoelumos.com/ko/뉴욕-웹사이트): NY services in Korean
- [Pricing](https://www.zoelumos.com/pricing): Service pricing details
- [Portfolio](https://www.zoelumos.com/portfolio): Work samples
- [About](https://www.zoelumos.com/about): Company information

## FAQs

**Q: How much does a website cost in New Jersey?**
A: Business websites start at $1,000. E-commerce/Shopify stores start at $3,000. All prices include responsive design and basic SEO.

**Q: Do you offer Korean language consultations?**
A: Yes, 100% Korean language support is available. We also offer KakaoTalk consultations (카톡 상담 가능).

**Q: How long does website development take?**
A: Basic websites take 1-2 weeks. E-commerce stores take 2-4 weeks. Rush delivery available.

**Q: Do you serve businesses outside Fort Lee?**
A: Yes, we serve all of New Jersey and New York, including Edison, Cherry Hill, Flushing, and Manhattan.

**Q: Can you help with Google ranking (SEO)?**
A: Yes, all websites include basic SEO. We also offer monthly SEO services starting at $500/month with Google Page 1 ranking focus.

## Contact

- **Email**: hello@zoelumos.com
- **Website**: https://www.zoelumos.com
- **Korean Site**: https://www.zoelumos.com/ko

---
Last Updated: January 2026
`

export async function GET() {
  return new NextResponse(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
