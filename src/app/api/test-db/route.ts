import { NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'
import { isSupabaseConfigured } from '../../../lib/supabase'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Check Supabase configuration
    const isConfigured = isSupabaseConfigured()
    console.log('Supabase configured:', isConfigured)
    
    if (!isConfigured) {
      return NextResponse.json({
        success: false,
        error: 'Supabase is not configured',
        details: 'Please check your environment variables'
      }, { status: 500 })
    }

    // Test storage initialization
    console.log('Testing storage initialization...')
    const initResult = await DatabaseService.initializeData()
    console.log('Storage initialization result:', initResult)
    
    // Test database connection by trying to fetch form categories
    console.log('Testing form categories fetch...')
    const categories = await DatabaseService.getAllFormCategories()
    console.log('Categories fetched:', categories.length)
    
    // Test forms fetch
    console.log('Testing forms fetch...')
    const forms = await DatabaseService.getAllForms()
    console.log('Forms fetched:', forms.length)
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      supabaseConfigured: isConfigured,
      storageInitialized: initResult,
      categoriesCount: categories.length,
      formsCount: forms.length,
      categories: categories.slice(0, 3), // Only show first 3 for brevity
      forms: forms.slice(0, 3) // Only show first 3 for brevity
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        supabaseConfigured: isSupabaseConfigured()
      },
      { status: 500 }
    )
  }
}
