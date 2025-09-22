import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message, newsletter } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Save contact submission to Supabase
    await DatabaseService.createContactSubmission({
      name,
      email,
      phone,
      company,
      service,
      message,
      newsletter,
      source: 'website'
    })

    // If newsletter subscription is requested, add to newsletter
    if (newsletter) {
      try {
        await DatabaseService.subscribeToNewsletter(email, 'contact-form')
      } catch (error) {
        // Don't fail the contact submission if newsletter subscription fails
        console.error('Newsletter subscription failed:', error)
      }
    }

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  )
}
