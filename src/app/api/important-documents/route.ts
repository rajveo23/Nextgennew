import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // First check if is_important_document column exists
    const { data: testColumn, error: testError } = await supabase
      .from('form_categories')
      .select('is_important_document')
      .limit(1)

    let categories
    let categoriesError

    if (testError && testError.message.includes('column "is_important_document" does not exist')) {
      // Column doesn't exist, fallback to title-based filtering
      console.log('is_important_document column not found, using title-based filtering')
      const { data, error } = await supabase
        .from('form_categories')
        .select(`
          id,
          title,
          description,
          icon_name,
          color_gradient,
          order_index,
          forms (
            id,
            name,
            file_type,
            file_size,
            file_url,
            file_path,
            category_id,
            order_index
          )
        `)
        .or('title.ilike.%important%,title.ilike.%document%,title.ilike.%charter%,title.ilike.%regulatory%,title.ilike.%process%,title.ilike.%compliance%')
        .eq('is_active', true)
        .order('order_index', { ascending: true })
      
      categories = data
      categoriesError = error
    } else {
      // Column exists, use it
      const { data, error } = await supabase
        .from('form_categories')
        .select(`
          id,
          title,
          description,
          icon_name,
          color_gradient,
          order_index,
          forms (
            id,
            name,
            file_type,
            file_size,
            file_url,
            file_path,
            category_id,
            order_index
          )
        `)
        .eq('is_important_document', true)
        .eq('is_active', true)
        .order('order_index', { ascending: true })
      
      categories = data
      categoriesError = error
    }

    if (categoriesError) {
      console.error('Error fetching important documents:', categoriesError)
      return NextResponse.json({ error: 'Failed to fetch important documents' }, { status: 500 })
    }

    // Sort forms within each category by order_index
    const sortedCategories = categories?.map(category => ({
      ...category,
      forms: category.forms?.sort((a: any, b: any) => a.order_index - b.order_index) || []
    })) || []

    return NextResponse.json(sortedCategories)
  } catch (error) {
    console.error('Error in important-documents API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
