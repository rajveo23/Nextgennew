import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

export async function GET() {
  try {
    const categories = await DatabaseService.getFormCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching form categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch form categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, icon_name, color_gradient, order_index } = body

    if (!title || !description || !icon_name || !color_gradient) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const category = await DatabaseService.createFormCategory({
      title,
      description,
      icon_name,
      color_gradient,
      order_index: order_index || 0,
      is_active: true
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating form category:', error)
    return NextResponse.json(
      { error: 'Failed to create form category' },
      { status: 500 }
    )
  }
}
