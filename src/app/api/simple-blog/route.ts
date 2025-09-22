import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        error: 'Supabase not configured. Please check your environment variables.' 
      }, { status: 500 })
    }

    const body = await request.json()
    console.log('Received blog data:', body)
    
    // Simple blog creation without complex conversions
    const blogData = {
      title: body.title || 'Test Blog',
      slug: body.slug || 'test-blog-' + Date.now(),
      content: body.content || 'Test content',
      excerpt: body.excerpt || 'Test excerpt',
      featured_image_url: body.image || null,
      author: body.author || 'NextGen Registry',
      published: body.status === 'published',
      status: body.status || 'draft',
      publish_date: body.publishDate || new Date().toISOString().split('T')[0],
      category: body.category || 'General',
      views: 0,
      tags: body.tags || []
    }

    console.log('Inserting blog data:', blogData)

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert(blogData)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ 
        error: 'Database error',
        details: error.message,
        code: error.code
      }, { status: 500 })
    }

    console.log('Blog created successfully:', data)
    return NextResponse.json(data, { status: 201 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      error: 'Failed to create blog',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
