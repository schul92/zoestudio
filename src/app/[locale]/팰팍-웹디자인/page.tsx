import { redirect } from 'next/navigation'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' }
  ]
}

export default function PalParkRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/palisades-park-web-design`)
}
