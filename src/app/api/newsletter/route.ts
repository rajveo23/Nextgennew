import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    try {
      // Add to newsletter database using Supabase
      await DatabaseService.subscribeToNewsletter(email, source || 'website')

      return NextResponse.json(
        { 
          message: 'Successfully subscribed to newsletter!',
          success: true 
        },
        { status: 200 }
      )
    } catch (error: any) {
      // Handle duplicate email error
      if (error.message?.includes('duplicate') || error.code === '23505') {
        return NextResponse.json(
          { 
            message: 'You are already subscribed to our newsletter!',
            success: true 
          },
          { status: 200 }
        )
      }
      throw error
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Newsletter API endpoint is working' },
    { status: 200 }
  )
}
