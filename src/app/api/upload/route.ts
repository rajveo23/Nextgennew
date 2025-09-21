import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getDatabase } from '@/lib/mongodb'
import { ImageFile } from '@/lib/adminData'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// POST /api/upload - Upload image to Cloudinary and save metadata to database
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'general'
    const alt = formData.get('alt') as string || ''
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    
    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`
    
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: 'nextgen-registry',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { format: 'auto' }
      ]
    })
    
    // Save metadata to database
    const db = await getDatabase()
    const lastImage = await db.collection('images').findOne({}, { sort: { id: -1 } })
    const newId = (lastImage?.id || 0) + 1
    
    const imageData: ImageFile = {
      id: newId,
      name: file.name,
      url: uploadResult.secure_url,
      size: file.size,
      uploadDate: new Date().toISOString(),
      category,
      alt,
      dimensions: `${uploadResult.width}x${uploadResult.height}`
    }
    
    await db.collection('images').insertOne(imageData)
    
    return NextResponse.json({
      success: true,
      image: imageData,
      cloudinaryId: uploadResult.public_id
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}

// GET /api/upload - Get all images
export async function GET() {
  try {
    const db = await getDatabase()
    const images = await db.collection<ImageFile>('images').find({}).sort({ uploadDate: -1 }).toArray()
    
    // Convert MongoDB _id to id for consistency
    const formattedImages = images.map(image => ({
      ...image,
      id: image.id || Math.floor(Math.random() * 1000000),
      _id: undefined
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
    const cloudinaryId = searchParams.get('cloudinaryId')
    
    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }
    
    // Delete from Cloudinary if cloudinaryId is provided
    if (cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(cloudinaryId)
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError)
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }
    
    // Delete from database
    const db = await getDatabase()
    const result = await db.collection('images').deleteOne({ id: parseInt(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}
