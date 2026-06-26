'use client'

import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const INK = '#a1a1aa' // zinc-400
const GRID = 'rgba(255,255,255,0.06)'

const base = (overrides: any = {}) => ({
  chart: { toolbar: { show: false }, zoom: { enabled: false }, fontFamily: 'inherit', background: 'transparent', ...(overrides.chart || {}) },
  theme: { mode: 'dark' as const },
  grid: { borderColor: GRID, strokeDashArray: 3, padding: { left: 8, right: 8 } },
  tooltip: { theme: 'dark' as const },
  dataLabels: { enabled: false },
  legend: { labels: { colors: INK }, fontSize: '12px' },
  xaxis: { labels: { style: { colors: INK, fontSize: '11px' } }, axisBorder: { color: GRID }, axisTicks: { color: GRID } },
  yaxis: { labels: { style: { colors: INK, fontSize: '11px' } } },
  ...overrides,
})

export function AreaChart({ series, categories, colors = ['#FF6B4A', '#74C7C7'], height = 280, yFormatter }: {
  series: { name: string; data: number[] }[]
  categories: string[]
  colors?: string[]
  height?: number
  yFormatter?: (v: number) => string
}) {
  const options = base({
    colors,
    stroke: { curve: 'smooth', width: 2.5 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 95] } },
    xaxis: { categories, labels: { style: { colors: INK, fontSize: '11px' }, rotate: 0, hideOverlappingLabels: true }, tickAmount: 8, axisBorder: { color: GRID }, axisTicks: { color: GRID } },
    yaxis: yFormatter ? { labels: { style: { colors: INK }, formatter: yFormatter } } : { labels: { style: { colors: INK } } },
  })
  return <ReactApexChart type="area" options={options} series={series} height={height} />
}

export function BarChart({ series, categories, colors = ['#FF6B4A'], height = 280, horizontal = false }: {
  series: { name: string; data: number[] }[]
  categories: string[]
  colors?: string[]
  height?: number
  horizontal?: boolean
}) {
  const options = base({
    colors,
    plotOptions: { bar: { horizontal, borderRadius: 4, columnWidth: '55%' } },
    xaxis: { categories, labels: { style: { colors: INK, fontSize: '11px' } } },
  })
  return <ReactApexChart type="bar" options={options} series={series} height={height} />
}

export function DonutChart({ labels, series, colors = ['#FF6B4A', '#74C7C7', '#FFD45B', '#A78BFA', '#34D399', '#60A5FA'], height = 280 }: {
  labels: string[]
  series: number[]
  colors?: string[]
  height?: number
}) {
  const options = base({
    labels,
    colors,
    legend: { position: 'bottom', labels: { colors: INK } },
    plotOptions: { pie: { donut: { size: '68%' } } },
    stroke: { width: 0 },
  })
  return <ReactApexChart type="donut" options={options} series={series} height={height} />
}
