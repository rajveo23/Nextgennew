import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    // Create client with service role (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Test 1: Check if we can read from blog_posts table
    console.log('Testing blog_posts table access...')
    const { data: blogs, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1)

    if (blogError) {
      console.error('Blog table error:', blogError)
      return NextResponse.json({
        error: 'Cannot access blog_posts table',
        details: blogError.message,
        code: blogError.code
      }, { status: 500 })
    }

    // Test 2: Try to insert a simple blog post
    const testBlog = {
      title: 'RLS Test Blog',
      slug: 'rls-test-' + Date.now(),
      content: 'Testing RLS policies',
      author: 'Test',
      published: false,
      status: 'draft',
      views: 0,
      tags: []
    }

    console.log('Testing blog insertion...')
    const { data: newBlog, error: insertError } = await supabase
      .from('blog_posts')
      .insert(testBlog)
      .select()
      .single()

    if (insertError) {
      console.error('Blog insertion error:', insertError)
      return NextResponse.json({
        error: 'Cannot insert into blog_posts table',
        details: insertError.message,
        code: insertError.code,
        hint: insertError.hint
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'RLS test passed!',
      results: {
        existing_blogs: blogs?.length || 0,
        new_blog: newBlog
      }
    })

  } catch (error) {
    console.error('RLS test error:', error)
    return NextResponse.json({
      error: 'RLS test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
