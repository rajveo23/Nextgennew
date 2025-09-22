import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    // Create client with ANON key (same as image upload)
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const body = await request.json()
    
    // Try to insert using anon key
    const blogData = {
      title: body.title || 'Anon Test Blog',
      slug: 'anon-test-' + Date.now(),
      content: body.content || 'Testing with anon key',
      excerpt: 'Anon test excerpt',
      author: 'NextGen Registry',
      published: false,
      status: 'draft',
      category: 'Test',
      views: 0,
      tags: ['test', 'anon']
    }

    console.log('Testing with ANON key:', supabaseAnonKey.substring(0, 20) + '...')

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(blogData)
      .select()
      .single()

    if (error) {
      console.error('Anon key error:', error)
      return NextResponse.json({
        error: 'Anon key test failed',
        details: error.message,
        code: error.code
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Anon key test passed!',
      data: data
    })

  } catch (error) {
    console.error('Anon test error:', error)
    return NextResponse.json({
      error: 'Anon test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
