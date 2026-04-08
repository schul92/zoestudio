import { redirect } from 'next/navigation'

// Korean SEO slug - redirects to the canonical fort-lee-seo page
export default function FortLeeSEOKorean({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/fort-lee-seo`)
}
