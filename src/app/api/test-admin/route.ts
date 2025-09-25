import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    console.log('Testing admin functionality...')
    
    // Test 1: Check if form_categories table exists and has data
    const { data: categories, error: categoriesError } = await supabase
      .from('form_categories')
      .select('*')
      .limit(10)

    if (categoriesError) {
      return NextResponse.json({ 
        error: 'Categories table error', 
        details: categoriesError.message,
        step: 'categories_fetch'
      }, { status: 500 })
    }

    // Test 2: Check if forms table exists and has data
    const { data: forms, error: formsError } = await supabase
      .from('forms')
      .select('*')
      .limit(10)

    if (formsError) {
      return NextResponse.json({ 
        error: 'Forms table error', 
        details: formsError.message,
        step: 'forms_fetch'
      }, { status: 500 })
    }

    // Test 3: Check important documents
    const { data: importantDocs, error: importantError } = await supabase
      .from('form_categories')
      .select('*, forms(*)')
      .eq('is_important_document', true)

    return NextResponse.json({
      success: true,
      data: {
        categories: {
          count: categories?.length || 0,
          sample: categories?.[0] || null
        },
        forms: {
          count: forms?.length || 0,
          sample: forms?.[0] || null
        },
        importantDocs: {
          count: importantDocs?.length || 0,
          data: importantDocs || []
        }
      },
      environment: {
        supabaseUrl: supabaseUrl ? 'configured' : 'missing',
        supabaseKey: supabaseKey ? 'configured' : 'missing'
      }
    })

  } catch (error) {
    console.error('Admin test error:', error)
    return NextResponse.json({ 
      error: 'Test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
