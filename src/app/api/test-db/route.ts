import { NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

export async function GET() {
  try {
    // Test database connection by trying to fetch form categories
    const categories = await DatabaseService.getAllFormCategories()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      categoriesCount: categories.length,
      categories: categories
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
