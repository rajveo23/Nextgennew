import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

// Disable caching for real-time data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const logos = await DatabaseService.getClientLogos()
    return NextResponse.json(logos)
  } catch (error) {
    console.error('Error fetching client logos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client logos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_name, company_subtitle, logo_url, logo_path, website_url, order_index } = body

    if (!company_name) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }

    const logo = await DatabaseService.createClientLogo({
      company_name,
      company_subtitle: company_subtitle || '',
      logo_url: logo_url || '',
      logo_path: logo_path || '',
      website_url: website_url || '',
      order_index: order_index || 0,
      is_active: true
    })

    return NextResponse.json(logo)
  } catch (error) {
    console.error('Error creating client logo:', error)
    return NextResponse.json(
      { error: 'Failed to create client logo' },
      { status: 500 }
    )
  }
}
