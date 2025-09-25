import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../../lib/database'

// Disable caching for real-time data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const logos = await DatabaseService.getAllClientLogos()
    return NextResponse.json(logos)
  } catch (error) {
    console.error('Error fetching all client logos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client logos' },
      { status: 500 }
    )
  }
}
