import { NextResponse } from 'next/server'

const llmsContent = `# ZOE LUMOS (조이루모스)

> Korean-American digital marketing agency specializing in website design, SEO, and Google Ads for Korean businesses nationwide. Serving NJ, NY, CA, TX, GA, VA, IL, WA, MD, HI, PA, FL. 100% Korean language support available.

ZOE LUMOS is a web design and digital marketing agency headquartered in Fort Lee, New Jersey. Founded to serve the Korean-American business community across the United States, we provide professional website design, SEO optimization, Google Ads management, and Shopify e-commerce solutions. We serve Korean communities in 12+ states including New Jersey, New York, California, Texas, Georgia, Virginia, Illinois, Washington, Maryland, Hawaii, Pennsylvania, and Florida. All consultations available in Korean (한국어 상담 가능).

## Company Information

- **Name**: ZOE LUMOS (조이루모스)
- **Location**: Fort Lee, New Jersey, USA
- **Service Area**: Nationwide - NJ, NY, CA, TX, GA, VA, IL, WA, MD, HI, PA, FL and more
- **Languages**: English, Korean (한국어)
- **Email**: info@zoelumos.com
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
- Korean keyword optimization (뉴저지 웹사이트, 뉴욕 홈페이지, 캘리포니아 웹사이트, etc.)
- Google My Business optimization
- Monthly performance reports

### Google Ads Management ($300/month+)
PPC advertising management targeting Korean-American customers in the tri-state area.

- Campaign setup and optimization
- Korean and English ad copy
- Local targeting (Korean communities nationwide)
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

### California (캘리포니아)
- Los Angeles Koreatown (LA 코리아타운)
- Fullerton / Buena Park (풀러턴 / 부에나파크)
- Irvine (어바인)
- San Francisco Bay Area

### Texas (텍사스)
- Dallas / Carrollton (달라스 / 캐롤턴)
- Houston (휴스턴)
- Austin (오스틴)

### Georgia (조지아)
- Atlanta / Duluth / Suwanee (애틀랜타 / 둘루스 / 수와니)
- Johns Creek (존스크릭)

### Virginia (버지니아)
- Annandale (애난데일) - VA Koreatown
- Centreville (센터빌)
- Fairfax (페어팩스)

### Illinois (일리노이)
- Chicago / Niles / Glenview (시카고 / 나일스 / 글렌뷰)
- Lincolnwood (링컨우드)

### Washington (워싱턴)
- Seattle / Federal Way (시애틀 / 페더럴웨이)
- Tacoma / Lakewood (타코마 / 레이크우드)
- Lynnwood (린우드)

### Maryland (메릴랜드)
- Ellicott City (엘리콧시티)
- Columbia (콜럼비아)
- Rockville (록빌)

### Hawaii (하와이)
- Honolulu (호놀룰루)
- Waikiki (와이키키)

### Pennsylvania (펜실베이니아)
- Philadelphia / Upper Darby (필라델피아 / 어퍼다비)
- Cheltenham (첼튼엄)
- North Wales (노스웨일스)

### Florida (플로리다)
- Atlanta area / Duluth (둘루스) overflow community
- Orlando (올란도)
- Tampa (탬파)
- Miami (마이애미)

## Industries Served

- Restaurants & Cafes (Korean BBQ, cafes, bakeries)
- Beauty & Hair Salons
- Medical & Dental Practices
- Law Firms & CPA Offices
- Real Estate Agencies
- Retail & E-commerce

## Why Choose ZOE LUMOS

1. **100% Korean Language Support**: All consultations in Korean (한국어 상담)
2. **Nationwide Korean Community Expertise**: Understanding of Korean-American business markets across 12+ states
3. **Bilingual Websites**: Korean and English website development
4. **Google Page 1 Guarantee**: SEO optimization for local search
5. **In-Person & Remote**: Fort Lee office with remote services available nationwide

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
- [CA Website Services](https://www.zoelumos.com/ca-website): California web design
- [TX Website Services](https://www.zoelumos.com/tx-website): Texas web design
- [GA Website Services](https://www.zoelumos.com/ga-website): Georgia web design
- [VA Website Services](https://www.zoelumos.com/va-website): Virginia web design
- [IL Website Services](https://www.zoelumos.com/il-website): Illinois web design
- [WA Website Services](https://www.zoelumos.com/wa-website): Washington web design
- [MD Website Services](https://www.zoelumos.com/md-website): Maryland web design
- [HI Website Services](https://www.zoelumos.com/hi-website): Hawaii web design
- [PA Website Services](https://www.zoelumos.com/pa-website): Pennsylvania web design
- [FL Website Services](https://www.zoelumos.com/fl-website): Florida web design
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
A: Yes, we serve Korean businesses nationwide across 12+ states including NJ, NY, CA, TX, GA, VA, IL, WA, MD, HI, PA, and FL.

**Q: Can you help with Google ranking (SEO)?**
A: Yes, all websites include basic SEO. We also offer monthly SEO services starting at $500/month with Google Page 1 ranking focus.

## Contact

- **Email**: info@zoelumos.com
- **Website**: https://www.zoelumos.com
- **Korean Site**: https://www.zoelumos.com/ko

---
Last Updated: March 2026
`

export async function GET() {
  return new NextResponse(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
