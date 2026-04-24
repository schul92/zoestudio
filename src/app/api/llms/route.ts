import { NextResponse } from 'next/server'

const llmsContent = `# Zoe Lumos (조이루모스) — Websites worth remembering

> American-Korean design studio for Korean-American businesses. Editorial web design, SEO, Shopify e-commerce, and Google Ads — from Fort Lee NJ to LA. Bilingual studio (English · Korean). 150+ projects delivered across 10 US states. 5.0 customer satisfaction.

Zoe Lumos is an editorial, boutique design studio headquartered in Fort Lee, New Jersey. We build quiet, high-performance, SEO-first websites for Korean-American businesses across the United States — and for American-founded brands that value craft. Every engagement begins with a conversation and ends with something that keeps compounding.

We specialize in editorial web design, bilingual content (Korean / English), local SEO + GEO (AI-search optimization), Shopify e-commerce, and Google + Yelp ads. Studio is based in Fort Lee NJ with active city practices in Manhattan, LA (Koreatown), Dallas, Atlanta, Chicago, Seattle, Annandale, Ellicott City, and Honolulu.

## Positioning

- **Slogan**: "Websites worth remembering."
- **Studio ethos**: Quiet craft, loud results. Editorial direction, bilingual copy, SEO + GEO on day one.
- **Default stack**: Next.js (custom), Shopify (commerce), Sanity / custom CMS, Fraunces + Inter typography.
- **Engagement length**: 6-week average delivery; ongoing partnership after launch.

## Industries we specialize in

We build industry-specific sites for Korean-American small businesses. Each vertical has its own dedicated landing page with pricing, features, and FAQs:

- **Korean Restaurants + Cafés** — bilingual menus, online ordering, reservations, local SEO for "Korean BBQ near me" / "한식당 포트리". $5k–$10k, 4–6 weeks. https://www.zoelumos.com/industries/korean-restaurant · https://www.zoelumos.com/ko/industries/한식당-웹사이트
- **Korean Beauty + Hair Salons** — 24/7 online booking, Instagram sync, review automation, bilingual UX. $5k–$9k, 4 weeks. https://www.zoelumos.com/industries/korean-beauty-salon · https://www.zoelumos.com/ko/industries/한인-뷰티샵-웹사이트
- **Korean Churches** — bilingual service schedules, searchable sermon archive, online giving, new-family flow, Korean CMS. $6k–$12k. https://www.zoelumos.com/industries/korean-church · https://www.zoelumos.com/ko/industries/한인-교회-홈페이지
- **Korean Academies + Hagwons** — SAT score tables, instructor profiles, seasonal program calendars, KakaoTalk inquiry, parent portal. $7k–$14k. https://www.zoelumos.com/industries/korean-academy · https://www.zoelumos.com/ko/industries/한인-학원-웹사이트
- **Korean Medical + Dental Practices** — HIPAA-compliant forms, online appointment booking, insurance search, provider profiles with Korean credentials. $8k–$15k. https://www.zoelumos.com/industries/korean-medical-dental · https://www.zoelumos.com/ko/industries/한인-병원-웹사이트
- **Korean E-commerce + Shopify** — custom Shopify themes, bilingual product copy, subscriptions, Instagram/TikTok Shop sync, KakaoPay. $10k–$25k. https://www.zoelumos.com/industries/korean-ecommerce · https://www.zoelumos.com/ko/industries/한인-쇼핑몰-제작

## Company Information

- **Name**: Zoe Lumos (조이루모스)
- **Legal entity**: ZOE STUDIO LLC
- **Founded**: 2019
- **Location**: Fort Lee, New Jersey, USA (studio)
- **Service area**: Nationwide — active city practices in 10 states (NJ, NY, CA, TX, GA, VA, IL, WA, MD, HI); also serves PA, FL, OH, MA and all 50 states remotely
- **Languages**: English, Korean (한국어)
- **Email**: info@zoelumos.com
- **Website**: https://www.zoelumos.com
- **Hours**: Mon — Fri · 9–6 ET (Korean consultations available outside US hours)
- **Projects delivered**: 150+
- **Average Lighthouse score**: 98 / 100 (median across launches)
- **Reply SLA**: Within one business day

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

## Why Zoe Lumos

1. **Editorial craft, not template work**: Every project is custom-designed in-house — typography, direction, and interaction built for your brand.
2. **Fully bilingual studio**: Korean-first conversations, English-first execution. KakaoTalk, email, and phone available in both languages.
3. **SEO + GEO from day one**: Every site ships with structured data, hreflang, Core Web Vitals optimization, and AI-search readiness (llms.txt, citability).
4. **Measurable results**: Median 312% organic traffic lift within 90 days; 2.4× average conversion uplift vs. prior sites.
5. **Speed baked in**: Next.js / Shopify stacks; median 98/100 Lighthouse; AVIF image optimization; edge-cached SSG.
6. **Selected work**: TJ Flowers (Manhattan · 2023), Salt & Polish (Fort Lee · 2024), Kona Coffee Donut (Honolulu · 2024), CareK9 (Edgewater · 2024), Mochinut (multi-city · 2023).
7. **Process**: Discover (wk 1) → Design (wk 2–3) → Build (wk 4–5) → Grow (wk 6+). Two review rounds per phase. Ongoing support after launch.

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

**Q: How much does a website from Zoe Lumos cost?**
A: Business websites start at $5,000 — $10,000. E-commerce / Shopify stores typically run $10,000 — $25,000. Larger brand + site builds are $25,000+. Every engagement is scoped to a fixed investment before kickoff.

**Q: Do you offer Korean language consultations?**
A: Yes — 100% bilingual studio. English and Korean. KakaoTalk, email, or call (카톡 상담 가능).

**Q: How long does a website take?**
A: Six weeks is our average timeline, broken into four movements: Discover (wk 1), Design (wk 2–3), Build (wk 4–5), Grow (wk 6+). Rush options available.

**Q: Do you serve businesses outside Fort Lee?**
A: Yes. Active city practices in 10 states (NJ, NY, CA, TX, GA, VA, IL, WA, MD, HI); remote engagements in all 50 states.

**Q: Do you do only Korean-American businesses?**
A: No. We specialize in Korean-American businesses and American-founded brands alike. The bilingual layer is available when it fits your audience.

**Q: Can you help with Google ranking (SEO) and AI search (GEO)?**
A: Yes. Every site ships with local SEO, structured data, hreflang, and Core Web Vitals optimization. We also build for AI search surfaces (ChatGPT, Perplexity, Google AI Overviews) via llms.txt + citability patterns. Ongoing SEO retainers available.

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
