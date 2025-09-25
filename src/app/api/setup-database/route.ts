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
    const createCategoriesSQL = `
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
    const createFormsSQL = `
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

    // Execute table creation using raw SQL
    try {
      // Try using the SQL editor approach
      const { error: categoriesError } = await supabaseAdmin
        .from('form_categories')
        .select('id')
        .limit(1)

      if (categoriesError && categoriesError.message.includes('does not exist')) {
        console.log('Tables do not exist, they need to be created manually in Supabase SQL Editor')
        return NextResponse.json({
          success: false,
          error: 'Database tables do not exist',
          instructions: [
            '1. Go to your Supabase project dashboard',
            '2. Navigate to SQL Editor',
            '3. Run the SQL script provided in database-setup.sql',
            '4. Or copy and paste the following SQL:',
            createCategoriesSQL,
            createFormsSQL,
            '5. Then insert sample data:',
            `INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index) VALUES
             ('ISIN Creation Forms', 'Forms required for ISIN creation and listing processes', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 1),
             ('Shareholder Services', 'Forms for shareholder registration and services', 'UserGroupIcon', 'from-green-500 to-green-700', 2);`
          ]
        }, { status: 400 })
      }

      // If we get here, tables exist, let's check if they have data
      const { data: categories } = await supabaseAdmin
        .from('form_categories')
        .select('*')

      const { data: forms } = await supabaseAdmin
        .from('forms')
        .select('*')

      return NextResponse.json({
        success: true,
        message: 'Database is set up correctly',
        categoriesCount: categories?.length || 0,
        formsCount: forms?.length || 0,
        categories: categories?.slice(0, 3) || []
      })

    } catch (sqlError) {
      console.error('SQL execution error:', sqlError)
      return NextResponse.json({
        success: false,
        error: 'Failed to execute SQL',
        details: sqlError instanceof Error ? sqlError.message : 'Unknown error'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error setting up database:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to setup database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
