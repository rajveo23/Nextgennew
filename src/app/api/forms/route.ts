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
    const body = await request.json()
    const { category_id, name, file_type, file_size, file_url, file_path, order_index } = body

    if (!category_id || !name || !file_type || !file_size) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

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

    return NextResponse.json(form, { status: 201 })
  } catch (error) {
    console.error('Error creating form:', error)
    return NextResponse.json(
      { error: 'Failed to create form' },
      { status: 500 }
    )
  }
}
