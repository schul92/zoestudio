import { redirect } from 'next/navigation'

export default function KoreanAliasPalisadesParkPage({
  params,
}: {
  params: { locale: string }
}) {
  redirect(`/${params.locale}/palisades-park-web-design`)
}
