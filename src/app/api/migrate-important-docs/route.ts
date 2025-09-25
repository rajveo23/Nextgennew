import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function POST() {
  try {
    console.log('Starting migration for important documents...')

    // Add is_important_document column to form_categories table
    const { error: alterError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        ALTER TABLE form_categories 
        ADD COLUMN IF NOT EXISTS is_important_document BOOLEAN DEFAULT false;
      `
    })

    if (alterError) {
      console.error('Error adding column:', alterError)
      // Try alternative approach using direct SQL
      const { error: directError } = await supabaseAdmin
        .from('form_categories')
        .select('is_important_document')
        .limit(1)

      if (directError && directError.message.includes('column "is_important_document" does not exist')) {
        return NextResponse.json({ 
          error: 'Column does not exist. Please run the SQL migration manually.',
          sql: `ALTER TABLE form_categories ADD COLUMN IF NOT EXISTS is_important_document BOOLEAN DEFAULT false;`
        }, { status: 500 })
      }
    }

    // Insert sample important document categories
    const { error: insertError } = await supabaseAdmin
      .from('form_categories')
      .upsert([
        {
          title: 'Investor Charter',
          description: 'Rights and responsibilities of investors',
          icon_name: 'DocumentTextIcon',
          color_gradient: 'from-blue-500 to-blue-700',
          order_index: 100,
          is_important_document: true,
          is_active: true
        },
        {
          title: 'Regulatory Documents',
          description: 'SEBI registration and regulatory compliance documents',
          icon_name: 'DocumentTextIcon',
          color_gradient: 'from-green-500 to-green-700',
          order_index: 101,
          is_important_document: true,
          is_active: true
        },
        {
          title: 'Process Guides',
          description: 'Step-by-step guides for various RTA processes',
          icon_name: 'DocumentTextIcon',
          color_gradient: 'from-purple-500 to-purple-700',
          order_index: 102,
          is_important_document: true,
          is_active: true
        }
      ], {
        onConflict: 'title',
        ignoreDuplicates: false
      })

    if (insertError) {
      console.error('Error inserting categories:', insertError)
    }

    // Get the created categories to insert sample forms
    const { data: categories, error: fetchError } = await supabaseAdmin
      .from('form_categories')
      .select('id, title')
      .eq('is_important_document', true)

    if (fetchError) {
      console.error('Error fetching categories:', fetchError)
    } else if (categories) {
      // Insert sample forms for each category
      const sampleForms = []
      
      for (const category of categories) {
        if (category.title === 'Investor Charter') {
          sampleForms.push(
            {
              category_id: category.id,
              name: 'RTA Investor Charter',
              file_type: 'PDF',
              file_size: '245 KB',
              order_index: 1,
              is_active: true
            },
            {
              category_id: category.id,
              name: 'Grievance Redressal Policy',
              file_type: 'PDF',
              file_size: '180 KB',
              order_index: 2,
              is_active: true
            }
          )
        } else if (category.title === 'Regulatory Documents') {
          sampleForms.push(
            {
              category_id: category.id,
              name: 'SEBI Registration Certificate',
              file_type: 'PDF',
              file_size: '320 KB',
              order_index: 1,
              is_active: true
            },
            {
              category_id: category.id,
              name: 'Service Level Agreement',
              file_type: 'PDF',
              file_size: '275 KB',
              order_index: 2,
              is_active: true
            }
          )
        } else if (category.title === 'Process Guides') {
          sampleForms.push(
            {
              category_id: category.id,
              name: 'ISIN Creation Process Guide',
              file_type: 'PDF',
              file_size: '450 KB',
              order_index: 1,
              is_active: true
            },
            {
              category_id: category.id,
              name: 'Demat Process Guide',
              file_type: 'PDF',
              file_size: '380 KB',
              order_index: 2,
              is_active: true
            }
          )
        }
      }

      if (sampleForms.length > 0) {
        const { error: formsError } = await supabaseAdmin
          .from('forms')
          .upsert(sampleForms, {
            onConflict: 'name,category_id',
            ignoreDuplicates: true
          })

        if (formsError) {
          console.error('Error inserting sample forms:', formsError)
        }
      }
    }

    console.log('Migration completed successfully')
    return NextResponse.json({ 
      success: true, 
      message: 'Important documents migration completed successfully' 
    })

  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ 
      error: 'Migration failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
