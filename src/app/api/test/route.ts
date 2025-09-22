import { NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  try {
    // Check configuration
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        error: 'Supabase not configured',
        configured: false 
      }, { status: 500 })
    }

    // Test database connection
    const { data: blogs, error: blogError } = await supabaseAdmin
      .from('blog_posts')
      .select('count')
      .limit(1)

    const { data: faqs, error: faqError } = await supabaseAdmin
      .from('faqs')
      .select('count')
      .limit(1)

    const { data: clients, error: clientError } = await supabaseAdmin
      .from('clients')
      .select('count')
      .limit(1)

    return NextResponse.json({
      configured: true,
      tables: {
        blog_posts: blogError ? `Error: ${blogError.message}` : 'OK',
        faqs: faqError ? `Error: ${faqError.message}` : 'OK',
        clients: clientError ? `Error: ${clientError.message}` : 'OK'
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({ 
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
