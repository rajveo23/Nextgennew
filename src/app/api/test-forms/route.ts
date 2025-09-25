import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Test form_categories table
    const { data: categories, error: categoriesError } = await supabase
      .from('form_categories')
      .select('*')
      .limit(5)

    if (categoriesError) {
      console.error('Categories error:', categoriesError)
      return NextResponse.json({ 
        error: 'Categories fetch failed', 
        details: categoriesError.message 
      }, { status: 500 })
    }

    // Test forms table
    const { data: forms, error: formsError } = await supabase
      .from('forms')
      .select('*')
      .limit(5)

    if (formsError) {
      console.error('Forms error:', formsError)
      return NextResponse.json({ 
        error: 'Forms fetch failed', 
        details: formsError.message 
      }, { status: 500 })
    }

    // Test important documents
    const { data: importantDocs, error: importantError } = await supabase
      .from('form_categories')
      .select('*, forms(*)')
      .eq('is_important_document', true)
      .eq('is_active', true)

    return NextResponse.json({
      success: true,
      data: {
        categories: categories?.length || 0,
        forms: forms?.length || 0,
        importantDocs: importantDocs?.length || 0,
        sampleCategory: categories?.[0] || null,
        sampleForm: forms?.[0] || null,
        importantDocsData: importantDocs || []
      }
    })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({ 
      error: 'Test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
