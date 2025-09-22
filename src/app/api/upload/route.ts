import { NextRequest, NextResponse } from 'next/server'
import { StorageService } from '@/lib/storage'

// POST /api/upload - Upload image to Supabase Storage
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string || 'company-assets'
    const category = formData.get('category') as string || 'general'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }, { status: 400 })
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size too large. Maximum 5MB allowed.' }, { status: 400 })
    }
    
    // Upload to Supabase Storage
    const uploadResult = await StorageService.uploadFile(bucket, file, `${category}/${Date.now()}-${file.name}`)
    
    // Return legacy format for compatibility
    const imageData = {
      id: Date.now(), // Temporary ID for legacy compatibility
      name: file.name,
      url: uploadResult.url,
      size: file.size,
      uploadDate: new Date().toISOString(),
      category,
      alt: file.name,
      dimensions: '0x0', // We don't automatically detect dimensions in Supabase
      path: uploadResult.path
    }
    
    return NextResponse.json({
      success: true,
      image: imageData,
      path: uploadResult.path
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}

// GET /api/upload - Get all images
export async function GET() {
  try {
    const files = await StorageService.getImages()
    
    // Convert to legacy format for compatibility
    const formattedImages = files.map(file => ({
      id: parseInt(file.id.replace(/-/g, '').substring(0, 8), 16),
      name: file.filename,
      url: StorageService.getPublicUrl('company-assets', file.file_path),
      size: file.file_size || 0,
      uploadDate: file.created_at,
      category: 'general',
      alt: file.filename,
      dimensions: '0x0',
      path: file.file_path
    }))
    
    return NextResponse.json(formattedImages)
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}

// DELETE /api/upload - Delete image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const path = searchParams.get('path')
    
    if (!id && !path) {
      return NextResponse.json({ error: 'Image ID or path is required' }, { status: 400 })
    }
    
    let success = false
    
    if (path) {
      // Delete by path (preferred method)
      success = await StorageService.deleteImage(path)
    } else if (id) {
      // Delete by ID (fallback method)
      const files = await StorageService.getImages()
      const file = files.find(f => 
        parseInt(f.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
      )
      
      if (file) {
        success = await StorageService.deleteImage(file.file_path)
      }
    }
    
    if (!success) {
      return NextResponse.json({ error: 'Image not found or failed to delete' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}
