import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Simple file-based tracking for now (you can upgrade to a database later)
const DATA_FILE = path.join(process.cwd(), 'analytics-data.json')

interface TrackingEvent {
  timestamp: string
  type: 'service_click' | 'page_view' | 'form_submit' | 'contact_attempt'
  service?: string
  page?: string
  userAgent?: string
  referrer?: string
  ip?: string
}

async function readData(): Promise<TrackingEvent[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeData(events: TrackingEvent[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2))
}

// POST endpoint to track events
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, service, page } = body

    // Get request metadata
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || 'direct'
    
    const event: TrackingEvent = {
      timestamp: new Date().toISOString(),
      type,
      service,
      page,
      userAgent,
      referrer,
    }

    // Read existing data
    const events = await readData()
    
    // Add new event
    events.push(event)
    
    // Keep only last 10000 events (to prevent file from growing too large)
    const trimmedEvents = events.slice(-10000)
    
    // Save data
    await writeData(trimmedEvents)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
  }
}

// GET endpoint to retrieve analytics data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    
    // Read all events
    const events = await readData()
    
    // Filter by date range
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    const filteredEvents = events.filter(event => 
      new Date(event.timestamp) >= cutoffDate
    )
    
    // Calculate statistics
    const stats = {
      totalEvents: filteredEvents.length,
      serviceClicks: {} as Record<string, number>,
      pageViews: {} as Record<string, number>,
      formSubmissions: 0,
      dailyEvents: {} as Record<string, number>,
    }
    
    filteredEvents.forEach(event => {
      // Count service clicks
      if (event.type === 'service_click' && event.service) {
        stats.serviceClicks[event.service] = (stats.serviceClicks[event.service] || 0) + 1
      }
      
      // Count page views
      if (event.type === 'page_view' && event.page) {
        stats.pageViews[event.page] = (stats.pageViews[event.page] || 0) + 1
      }
      
      // Count form submissions
      if (event.type === 'form_submit') {
        stats.formSubmissions++
      }
      
      // Group by day
      const day = event.timestamp.split('T')[0]
      stats.dailyEvents[day] = (stats.dailyEvents[day] || 0) + 1
    })
    
    return NextResponse.json({
      period: `Last ${days} days`,
      stats,
      recentEvents: filteredEvents.slice(-100).reverse(), // Last 100 events
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 })
  }
}