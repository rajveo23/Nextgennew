import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Disable caching for real-time data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Get all categories with their forms (both regular and important documents)
    const { data: categories, error: categoriesError } = await supabase
      .from('form_categories')
      .select(`
        id,
        title,
        description,
        icon_name,
        color_gradient,
        order_index,
        is_important_document,
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
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (categoriesError) {
      console.error('Error fetching regular form categories:', categoriesError)
      return NextResponse.json({ error: 'Failed to fetch form categories' }, { status: 500 })
    }

    // Sort forms within each category by order_index
    const sortedCategories = categories?.map(category => ({
      ...category,
      forms: category.forms?.sort((a: any, b: any) => a.order_index - b.order_index) || []
    })) || []

    return NextResponse.json(sortedCategories)
  } catch (error) {
    console.error('Error fetching form categories with forms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch form categories with forms' },
      { status: 500 }
    )
  }
}
