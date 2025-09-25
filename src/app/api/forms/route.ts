import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category_id')

    let forms
    if (categoryId) {
      forms = await DatabaseService.getFormsByCategory(categoryId)
    } else {
      forms = await DatabaseService.getForms()
    }

    return NextResponse.json(forms)
  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch forms' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/forms - Starting form creation')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { category_id, name, file_type, file_size, file_url, file_path, order_index } = body

    if (!category_id || !name || !file_type || !file_size) {
      console.log('Missing required fields:', { category_id, name, file_type, file_size })
      return NextResponse.json(
        { error: 'Missing required fields: category_id, name, file_type, file_size are required' },
        { status: 400 }
      )
    }

    console.log('Creating form with data:', {
      category_id,
      name,
      file_type,
      file_size,
      file_url,
      file_path,
      order_index: order_index || 0,
      is_active: true
    })

    const form = await DatabaseService.createForm({
      category_id,
      name,
      file_type,
      file_size,
      file_url,
      file_path,
      order_index: order_index || 0,
      is_active: true
    })

    console.log('Form created successfully:', form)
    return NextResponse.json(form, { status: 201 })
  } catch (error) {
    console.error('Error creating form:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
