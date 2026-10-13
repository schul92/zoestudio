import type { CSSProperties, ReactNode } from 'react'
import { CheckCheck, FileCode2, Package, ScanBarcode, Truck } from 'lucide-react'
import type { L, T } from './Blocks'

const delay = (ms: number) => ({ ['--ul-d' as string]: `${ms}ms` }) as CSSProperties

// Sample rows only — the frame is labelled "sample screen".
const rows: { sku: string; name: T; onHand: string; inbound: string; toShip: string }[] = [
  { sku: 'SKU-1042', name: { en: 'Seaweed snack 12-pack', ko: '김 스낵 12팩' }, onHand: '1,240', inbound: '300', toShip: '86' },
  { sku: 'SKU-2210', name: { en: 'Ramyun 4-pack', ko: '라면 4입' }, onHand: '860', inbound: '0', toShip: '120' },
  { sku: 'SKU-3305', name: { en: 'Rice cakes 500 g', ko: '떡볶이 떡 500g' }, onHand: '412', inbound: '96', toShip: '24' },
  { sku: 'SKU-4018', name: { en: 'Gochujang 1 kg', ko: '고추장 1kg' }, onHand: '318', inbound: '0', toShip: '12' },
]

/** Logistics hero: a shipper portal in a window, with one order's trip from EDI 940 to EDI 945 arriving
 *  card by card around it (CSS keyframes on load; static under reduced motion). */
export default function PortalHero({ locale }: { locale: L }) {
  const ko = locale === 'ko'
  const cards: { icon: ReactNode; title: string; sub: string; pos: string; ms: number }[] = [
    {
      icon: <FileCode2 className="h-4 w-4" aria-hidden />,
      title: ko ? 'EDI 940 수신' : 'EDI 940 received',
      sub: ko ? '출고 지시 24건 · 09:02' : '24 shipping orders · 9:02',
      pos: 'md:-left-8 md:-top-8 lg:-left-10',
      ms: 450,
    },
    {
      icon: <ScanBarcode className="h-4 w-4" aria-hidden />,
      title: ko ? '피킹 · 패킹 완료' : 'Picked and packed',
      sub: ko ? 'WMS 주문 24건' : '24 orders in the WMS',
      pos: 'md:-right-8 md:top-[30%] lg:-right-6',
      ms: 650,
    },
    {
      icon: <Truck className="h-4 w-4" aria-hidden />,
      title: ko ? '운송장 발행' : 'Labels created',
      sub: ko ? 'UPS · FedEx API' : 'UPS · FedEx API',
      pos: 'md:-left-10 md:bottom-[12%] lg:-left-12',
      ms: 850,
    },
    {
      icon: <CheckCheck className="h-4 w-4" aria-hidden />,
      title: ko ? 'EDI 945 전송' : 'EDI 945 sent',
      sub: ko ? '출고 확정 · 997 수신 확인' : 'Ship confirm · 997 received',
      pos: 'md:-right-6 md:-bottom-9 lg:-right-4',
      ms: 1050,
    },
  ]

  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
      <div className="ul-rise ul-frame relative overflow-hidden rounded-[14px] bg-[#1C1C1E] md:rounded-[18px]">
        <div className="flex h-10 items-center justify-between gap-3 border-b border-white/10 px-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 text-[12px] font-semibold text-ink">{ko ? '화주 고객 포털' : 'Shipper portal'}</span>
          </div>
          <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-ash">{ko ? '예시 화면' : 'Sample screen'}</span>
        </div>
        <div className="p-3.5 md:p-5">
          <div className="flex gap-1 text-[11.5px] md:text-[12px]" aria-hidden>
            {(ko ? ['재고', '주문', '입고', '청구서'] : ['Inventory', 'Orders', 'Inbound', 'Invoices']).map((t, i) => (
              <span key={t} className={`rounded-full px-2.5 py-1 ${i === 0 ? 'bg-white/[0.12] text-ink' : 'text-ash'}`}>{t}</span>
            ))}
          </div>
          <table className="mt-3.5 w-full text-left text-[12px] md:text-[13px]">
            <thead>
              <tr className="text-[11px] text-ash">
                <th className="py-2 pr-2 font-medium">{ko ? '품목' : 'Item'}</th>
                <th className="py-2 px-2 text-right font-medium">{ko ? '가용 재고' : 'On hand'}</th>
                <th className="hidden py-2 px-2 text-right font-medium sm:table-cell">{ko ? '입고 예정' : 'Inbound'}</th>
                <th className="py-2 pl-2 text-right font-medium">{ko ? '출고 대기' : 'To ship'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {rows.map((r) => (
                <tr key={r.sku}>
                  <td className="py-2.5 pr-2">
                    <span className="flex items-center gap-2.5">
                      <span className="hidden h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-ash sm:grid">
                        <Package className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-ink">{r.name[locale]}</span>
                        <span className="block text-[10.5px] text-ash tabular-nums">{r.sku}</span>
                      </span>
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-ink tabular-nums">{r.onHand}</td>
                  <td className="hidden py-2.5 px-2 text-right text-graphite tabular-nums sm:table-cell">{r.inbound}</td>
                  <td className="py-2.5 pl-2 text-right tabular-nums">
                    <span className="rounded-full bg-[color-mix(in_srgb,var(--gold)_16%,transparent)] px-2 py-0.5 text-[var(--gold)]">{r.toShip}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-3 md:mt-0">
        {cards.map((c) => (
          <li
            key={c.title}
            style={delay(c.ms)}
            className={`ul-pop ul-card rounded-2xl p-3.5 md:absolute md:w-[228px] md:p-4 ${c.pos}`}
          >
            <div className="flex items-start gap-3">
              <span className="ul-chip grid h-8 w-8 shrink-0 place-items-center rounded-full">{c.icon}</span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-snug text-ink md:text-[14px]">{c.title}</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-ash md:text-[12px]">{c.sub}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
