import type { ReactNode } from 'react'
import { Building2, ScanBarcode, Truck, Warehouse } from 'lucide-react'
import { seq, type L, type T } from './Blocks'

// Column centers of a three-column grid, in percent: shipper · 3PL (WMS) · carrier.
const LANE = [100 / 6, 50, 500 / 6]

type Msg = { kind: 'msg'; from: number; to: number; code: string; label: T; sub: string }
type Note = { kind: 'note'; at: number; label: T }

const parties: { icon: ReactNode; name: T; sub: T }[] = [
  { icon: <Building2 className="h-5 w-5" aria-hidden />, name: { en: 'Shipper · retailer', ko: '화주 · 리테일러' }, sub: { en: 'ERP · store', ko: 'ERP · 쇼핑몰' } },
  { icon: <Warehouse className="h-5 w-5" aria-hidden />, name: { en: '3PL warehouse', ko: '3PL 창고' }, sub: { en: 'WMS', ko: 'WMS' } },
  { icon: <Truck className="h-5 w-5" aria-hidden />, name: { en: 'Carrier', ko: '운송사' }, sub: { en: 'Parcel · LTL', ko: '택배 · LTL' } },
]

const flow: (Msg | Note)[] = [
  { kind: 'msg', from: 0, to: 1, code: '943', label: { en: 'Inbound advice', ko: '입고 예정' }, sub: 'Stock Transfer Shipment Advice' },
  { kind: 'msg', from: 1, to: 0, code: '944', label: { en: 'Receipt confirmed', ko: '입고 확정' }, sub: 'Stock Transfer Receipt Advice' },
  { kind: 'msg', from: 0, to: 1, code: '940', label: { en: 'Shipping order', ko: '출고 지시' }, sub: 'Warehouse Shipping Order' },
  { kind: 'note', at: 1, label: { en: 'Pick and pack', ko: '피킹 · 패킹' } },
  { kind: 'msg', from: 1, to: 2, code: 'API', label: { en: 'Labels', ko: '운송장 발행' }, sub: 'UPS · FedEx · USPS' },
  { kind: 'msg', from: 2, to: 1, code: 'API', label: { en: 'Tracking', ko: '배송 추적' }, sub: 'Tracking API · EDI 214' },
  { kind: 'msg', from: 1, to: 0, code: '945', label: { en: 'Ship confirm', ko: '출고 확정' }, sub: 'Warehouse Shipping Advice' },
  { kind: 'msg', from: 1, to: 0, code: '846', label: { en: 'Inventory', ko: '재고 현황' }, sub: 'Inventory Inquiry/Advice' },
]

const START = 420
const STEP = 260

/** Sequence diagram of a 3PL's document flow. Lifelines draw down, then each message's arrow draws from
 *  sender to receiver in order, as one scene when the figure scrolls into view. */
export default function EdiSequence({ locale }: { locale: L }) {
  const ko = locale === 'ko'
  return (
    <figure data-reveal className="ul-panel rounded-[28px] px-4 py-8 sm:px-6 md:px-10 md:py-12">
      <div className="grid grid-cols-3">
        {parties.map((p, i) => (
          <div key={p.name.en} style={seq(i * 90)} className="ent-in flex flex-col items-center text-center">
            <span className="ul-chip grid h-11 w-11 place-items-center rounded-2xl">{p.icon}</span>
            <p className="mt-2.5 px-1 text-[12.5px] font-semibold leading-tight text-ink md:text-[15px]">{p.name[locale]}</p>
            <p className="mt-1 hidden text-[12px] text-ash md:block">{p.sub[locale]}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-5 md:mt-7">
        {LANE.map((x, i) => (
          <span key={x} style={{ left: `${x}%`, ...seq(150 + i * 80) }} className="ent-draw-y absolute bottom-0 top-0 w-px bg-white/15" aria-hidden />
        ))}
        <ol className="relative">
          {flow.map((row, i) => {
            const t = START + i * STEP
            if (row.kind === 'note') {
              return (
                <li key={row.label.en} className="relative h-11 md:h-12">
                  <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${LANE[row.at]}%` }}>
                    <span style={seq(t)} className="ent-in inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#1C1C1E] px-3 py-1 text-[11.5px] text-graphite shadow-[0_0_0_1px_rgba(255,255,255,.1)] md:text-[12.5px]">
                      <ScanBarcode className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden />
                      {row.label[locale]}
                    </span>
                  </span>
                </li>
              )
            }
            const a = Math.min(row.from, row.to)
            const b = Math.max(row.from, row.to)
            const right = row.to > row.from
            return (
              <li key={`${row.code}-${row.label.en}`} className="relative h-[58px] md:h-[72px]">
                <div className="absolute inset-y-0" style={{ left: `${LANE[a]}%`, width: `${LANE[b] - LANE[a]}%` }}>
                  <p style={seq(t)} className="ent-in absolute inset-x-0 top-1 flex items-center justify-center gap-1.5 whitespace-nowrap text-[12px] text-ink md:text-[14px]">
                    <span className="rounded-md bg-[color-mix(in_srgb,var(--gold)_16%,transparent)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--gold)] tabular-nums md:text-[12px]">
                      {row.code}
                    </span>
                    {row.label[locale]}
                  </p>
                  <div className="absolute inset-x-[2px] top-[33px] h-[2px] md:top-[38px]" aria-hidden>
                    <span data-dir={right ? 'right' : 'left'} style={seq(t + 80)} className="ent-draw-x absolute inset-0 rounded-full bg-[var(--gold)]" />
                    <span
                      style={seq(t + 640)}
                      className={`ent-fade absolute top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent ${
                        right ? '-right-[2px] border-l-[8px] border-l-[var(--gold)]' : '-left-[2px] border-r-[8px] border-r-[var(--gold)]'
                      }`}
                    />
                  </div>
                  <p style={seq(t + 320)} className="ent-fade absolute inset-x-0 top-[46px] hidden whitespace-nowrap text-center text-[11.5px] text-ash md:block">
                    {row.sub}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <figcaption className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-[1.6] text-ash md:mt-8">
        {ko
          ? 'EDI 문서를 받으면 997(수신 확인)로 응답합니다. 거래처마다 사양서(Implementation Guide)가 달라 파트너별로 매핑하고 테스트합니다.'
          : 'Every EDI document is answered with a 997 functional acknowledgment. Each trading partner has its own implementation guide, so mappings are built and tested per partner.'}
      </figcaption>
    </figure>
  )
}
