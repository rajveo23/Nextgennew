import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    // Get credentials directly from environment
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        details: {
          url: supabaseUrl ? 'Set' : 'Missing',
          serviceKey: supabaseServiceKey ? 'Set' : 'Missing'
        }
      }, { status: 500 })
    }

    // Create direct Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const body = await request.json()
    
    // Simple blog creation
    const blogData = {
      title: body.title || 'Direct Test Blog',
      slug: 'direct-test-' + Date.now(),
      content: body.content || 'This is a direct test blog post.',
      excerpt: 'Direct test excerpt',
      author: 'NextGen Registry',
      published: true,
      status: 'published',
      category: 'Test',
      views: 0,
      tags: ['test', 'direct']
    }

    console.log('Attempting to insert blog:', blogData)

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(blogData)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({
        error: 'Database insertion failed',
        details: error.message,
        code: error.code,
        hint: error.hint
      }, { status: 500 })
    }

    console.log('Blog created successfully:', data)
    return NextResponse.json({
      success: true,
      message: 'Blog created successfully via direct connection',
      data: data
    })

  } catch (error) {
    console.error('Direct test error:', error)
    return NextResponse.json({
      error: 'Direct test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
