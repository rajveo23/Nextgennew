import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Check if Cloudinary is configured
const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
)

if (!isCloudinaryConfigured) {
  console.warn('Cloudinary not configured - Blog image deletion will fail')
} else {
  // Configure Cloudinary only if credentials are available
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isCloudinaryConfigured) {
      return NextResponse.json(
        { error: 'Image deletion service not configured. Please set up Cloudinary environment variables.' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')
    
    if (!publicId) {
      return NextResponse.json(
        { error: 'No publicId provided' },
        { status: 400 }
      )
    }

    try {
      // Delete the image from Cloudinary
      const result = await cloudinary.uploader.destroy(publicId)
      
      if (result.result === 'ok') {
        return NextResponse.json({
          success: true,
          message: 'Image deleted successfully'
        })
      } else {
        return NextResponse.json(
          { error: 'Failed to delete image from cloud storage' },
          { status: 400 }
        )
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error)
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
