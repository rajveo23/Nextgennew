import { NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase'

export async function POST() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        error: 'Supabase not configured',
        details: 'Please check your environment variables'
      }, { status: 500 })
    }

    // Simple test data
    const testBlog = {
      title: 'Test Blog Post',
      slug: 'test-blog-post-' + Date.now(),
      content: 'This is a test blog post to verify Supabase integration.',
      excerpt: 'Test excerpt',
      author: 'NextGen Registry',
      published: true,
      status: 'published',
      category: 'Test',
      views: 0,
      tags: ['test']
    }

    const testFAQ = {
      question: 'What is a test FAQ?',
      answer: 'This is a test FAQ to verify database functionality.',
      category: 'Test',
      order_index: 1,
      is_active: true
    }

    const testClient = {
      serial_number: 9999,
      issuer_client_company_name: 'TEST COMPANY PRIVATE LIMITED',
      type_of_security: 'EQUITY',
      isin_of_the_company: 'INE999T01999',
      is_active: true
    }

    // Insert test data
    const { data: blogData, error: blogError } = await supabaseAdmin
      .from('blog_posts')
      .insert(testBlog)
      .select()
      .single()

    const { data: faqData, error: faqError } = await supabaseAdmin
      .from('faqs')
      .insert(testFAQ)
      .select()
      .single()

    const { data: clientData, error: clientError } = await supabaseAdmin
      .from('clients')
      .insert(testClient)
      .select()
      .single()

    return NextResponse.json({
      success: true,
      message: 'Test data inserted successfully',
      results: {
        blog: blogError ? `Error: ${blogError.message}` : 'Success',
        faq: faqError ? `Error: ${faqError.message}` : 'Success',
        client: clientError ? `Error: ${clientError.message}` : 'Success'
      },
      data: {
        blog: blogData,
        faq: faqData,
        client: clientData
      }
    })

  } catch (error) {
    console.error('Init error:', error)
    return NextResponse.json({ 
      error: 'Failed to initialize',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
