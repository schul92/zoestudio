export default function HrefLangTags({ locale, pathname }: { locale: string; pathname: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  
  // Clean the pathname to get the route without locale
  const cleanPath = pathname.replace(/^\/(en|ko)/, '').replace(/^\/$/, '')
  
  return (
    <>
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${cleanPath}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${cleanPath}`} />
      <link rel="alternate" hrefLang="ko" href={`${baseUrl}/ko${cleanPath}`} />
      <link rel="canonical" href={`${baseUrl}${locale === 'ko' ? '/ko' : ''}${cleanPath}`} />
    </>
  )
}