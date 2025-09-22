import { NextRequest, NextResponse } from 'next/server'
import { StorageService } from '../../../../lib/storage'

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    
    if (!path) {
      return NextResponse.json(
        { error: 'No file path provided' },
        { status: 400 }
      )
    }

    try {
      // Delete the image from Supabase Storage
      const success = await StorageService.deleteImage(path)
      
      if (success) {
        return NextResponse.json({
          success: true,
          message: 'Image deleted successfully'
        })
      } else {
        return NextResponse.json(
          { error: 'Failed to delete image from storage' },
          { status: 400 }
        )
      }
    } catch (error) {
      console.error('Supabase storage delete error:', error)
      return NextResponse.json(
        { error: 'Image not found or already deleted' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
