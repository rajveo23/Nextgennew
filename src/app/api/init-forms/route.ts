import { NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

export async function POST() {
  try {
    // Initialize database and storage
    const initialized = await DatabaseService.initializeData()
    
    if (!initialized) {
      return NextResponse.json(
        { error: 'Failed to initialize database and storage' },
        { status: 500 }
      )
    }

    // Try to create some sample categories if none exist
    try {
      const existingCategories = await DatabaseService.getAllFormCategories()
      
      if (existingCategories.length === 0) {
        console.log('Creating sample form categories...')
        
        const sampleCategories = [
          {
            title: 'ISIN Creation Forms',
            description: 'Forms required for ISIN creation and listing processes',
            icon_name: 'DocumentTextIcon',
            color_gradient: 'from-blue-500 to-blue-700',
            order_index: 1,
            is_important_document: false,
            is_active: true
          },
          {
            title: 'Shareholder Services',
            description: 'Forms for shareholder registration and services',
            icon_name: 'UserGroupIcon',
            color_gradient: 'from-green-500 to-green-700',
            order_index: 2,
            is_important_document: false,
            is_active: true
          }
        ]

        for (const category of sampleCategories) {
          await DatabaseService.createFormCategory(category)
        }
      }
    } catch (error) {
      console.warn('Could not create sample categories:', error)
    }

    return NextResponse.json({
      success: true,
      message: 'Forms system initialized successfully'
    })

  } catch (error) {
    console.error('Error initializing forms system:', error)
    return NextResponse.json(
      { error: 'Failed to initialize forms system' },
      { status: 500 }
    )
  }
}
