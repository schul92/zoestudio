import { redirect } from 'next/navigation'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export default function CliffsideParkKoreanRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/cliffside-park-web-design`)
}
