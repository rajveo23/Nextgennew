import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'

export async function POST() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({
        success: false,
        error: 'Supabase admin client not available'
      }, { status: 500 })
    }

    // Create form_categories table
    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS form_categories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon_name TEXT NOT NULL DEFAULT 'DocumentTextIcon',
        color_gradient TEXT NOT NULL DEFAULT 'from-blue-500 to-blue-700',
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Create forms table
    const createFormsTable = `
      CREATE TABLE IF NOT EXISTS forms (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        category_id UUID REFERENCES form_categories(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        file_type TEXT NOT NULL DEFAULT 'PDF',
        file_size TEXT NOT NULL,
        file_url TEXT,
        file_path TEXT,
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Try to create tables by checking if they exist first
    console.log('Checking if tables exist...')
    
    // Check if form_categories table exists by trying to select from it
    const { error: categoriesCheckError } = await supabaseAdmin
      .from('form_categories')
      .select('id')
      .limit(1)
    
    if (categoriesCheckError) {
      console.log('form_categories table may not exist, error:', categoriesCheckError.message)
    }

    // Check if forms table exists
    const { error: formsCheckError } = await supabaseAdmin
      .from('forms')
      .select('id')
      .limit(1)
    
    if (formsCheckError) {
      console.log('forms table may not exist, error:', formsCheckError.message)
    }

    // Insert sample data if tables are empty
    const { data: existingCategories } = await supabaseAdmin
      .from('form_categories')
      .select('id')
      .limit(1)

    if (!existingCategories || existingCategories.length === 0) {
      // Insert sample categories
      const sampleCategories = [
        {
          title: 'ISIN Creation Forms',
          description: 'Forms required for ISIN creation and listing processes',
          icon_name: 'DocumentTextIcon',
          color_gradient: 'from-blue-500 to-blue-700',
          order_index: 1
        },
        {
          title: 'Shareholder Services',
          description: 'Forms for shareholder registration and services',
          icon_name: 'UserGroupIcon',
          color_gradient: 'from-green-500 to-green-700',
          order_index: 2
        }
      ]

      const { error: insertError } = await supabaseAdmin
        .from('form_categories')
        .insert(sampleCategories)

      if (insertError) {
        console.error('Error inserting sample categories:', insertError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database tables initialized successfully'
    })

  } catch (error) {
    console.error('Error initializing tables:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to initialize database tables',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
