import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

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

    // Here you would typically:
    // 1. Check if email already exists in newsletter list
    // 2. Add to newsletter database
    // 3. Send welcome email
    // 4. Integrate with email marketing service (Mailchimp, SendGrid, etc.)
    
    // For now, we'll just log the subscription and return success
    console.log('Newsletter subscription:', {
      email,
      timestamp: new Date().toISOString(),
      source: 'website'
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800))

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter!',
        success: true 
      },
      { status: 200 }
    )

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
