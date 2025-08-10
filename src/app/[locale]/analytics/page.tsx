'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Analytics {
  period: string
  stats: {
    totalEvents: number
    serviceClicks: Record<string, number>
    pageViews: Record<string, number>
    formSubmissions: number
    dailyEvents: Record<string, number>
  }
  recentEvents: any[]
}

export default function AnalyticsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(7)

  useEffect(() => {
    fetchAnalytics()
  }, [days])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/track?days=${days}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const serviceColors = {
    'SEO': 'bg-blue-500',
    'Google Ads': 'bg-green-500',
    'Web Design': 'bg-purple-500',
    'LLC Formation': 'bg-orange-500',
  }

  return (
    <>
      <Header locale={locale} />
      
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Analytics Dashboard</h1>
            <p className="text-gray-600">Track user behavior and service interests</p>
          </div>

          {/* Time Range Selector */}
          <div className="mb-8 flex gap-2">
            {[7, 30, 90].map(d => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  days === d 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                }`}
              >
                Last {d} days
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
            </div>
          ) : analytics ? (
            <div className="grid gap-8">
              {/* Overview Cards */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Total Events</h3>
                  <p className="text-3xl font-bold">{analytics.stats.totalEvents}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Form Submissions</h3>
                  <p className="text-3xl font-bold">{analytics.stats.formSubmissions}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Service Clicks</h3>
                  <p className="text-3xl font-bold">
                    {Object.values(analytics.stats.serviceClicks).reduce((a, b) => a + b, 0)}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Page Views</h3>
                  <p className="text-3xl font-bold">
                    {Object.values(analytics.stats.pageViews).reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              </div>

              {/* Service Interest Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Service Interest</h3>
                <div className="space-y-4">
                  {Object.entries(analytics.stats.serviceClicks).map(([service, count]) => {
                    const total = Object.values(analytics.stats.serviceClicks).reduce((a, b) => a + b, 0)
                    const percentage = total > 0 ? (count / total) * 100 : 0
                    
                    return (
                      <div key={service}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{service}</span>
                          <span className="text-sm text-gray-500">{count} clicks ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-8">
                          <div 
                            className={`${serviceColors[service as keyof typeof serviceColors] || 'bg-gray-500'} h-8 rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          >
                            {percentage > 10 && `${percentage.toFixed(0)}%`}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {Object.keys(analytics.stats.serviceClicks).length === 0 && (
                    <p className="text-gray-500">No service clicks tracked yet</p>
                  )}
                </div>
              </div>

              {/* Daily Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Daily Activity</h3>
                <div className="grid grid-cols-7 gap-2">
                  {Object.entries(analytics.stats.dailyEvents).slice(-7).map(([date, count]) => {
                    const maxCount = Math.max(...Object.values(analytics.stats.dailyEvents))
                    const height = maxCount > 0 ? (count / maxCount) * 100 : 0
                    
                    return (
                      <div key={date} className="flex flex-col items-center">
                        <div className="w-full bg-gray-100 rounded-lg h-32 flex items-end">
                          <div 
                            className="w-full bg-black rounded-lg transition-all duration-500"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-2">
                          {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                        </span>
                        <span className="text-xs font-medium">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recent Events */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Recent Events</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Time</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.recentEvents.slice(0, 10).map((event, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-2 text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.type === 'service_click' ? 'bg-blue-100 text-blue-700' :
                              event.type === 'form_submit' ? 'bg-green-100 text-green-700' :
                              event.type === 'page_view' ? 'bg-gray-100 text-gray-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {event.type.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-2 text-gray-600">
                            {event.service || event.page || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No analytics data available</p>
            </div>
          )}
        </div>
      </div>

      <Footer locale={locale} />
    </>
  )
}