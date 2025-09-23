import { NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

export async function GET() {
  try {
    const categoriesWithForms = await DatabaseService.getFormCategoriesWithForms()
    return NextResponse.json(categoriesWithForms)
  } catch (error) {
    console.error('Error fetching form categories with forms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch form categories with forms' },
      { status: 500 }
    )
  }
}
