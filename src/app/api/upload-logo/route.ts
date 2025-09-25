import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

const LOGOS_BUCKET = 'logos'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type - accept all common image formats
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload an image file (JPEG, PNG, GIF, WebP, SVG, BMP)' 
      }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File size too large. Maximum size is 5MB' 
      }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `logo_${timestamp}_${randomString}.${fileExtension}`


    // Check if logos bucket exists, create if not
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets()
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError)
      return NextResponse.json({ error: 'Storage error' }, { status: 500 })
    }

    const logosBucket = buckets?.find((bucket: any) => bucket.name === LOGOS_BUCKET)
    
    if (!logosBucket) {
      const { error: createError } = await supabaseAdmin.storage.createBucket(LOGOS_BUCKET, {
        public: true,
        allowedMimeTypes: allowedTypes,
        fileSizeLimit: maxSize
      })
      
      if (createError) {
        console.error('Error creating logos bucket:', createError)
        return NextResponse.json({ error: 'Failed to create storage bucket' }, { status: 500 })
      }
      
    }

    // Upload file to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(LOGOS_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json({ 
        error: 'Failed to upload file', 
        details: error.message 
      }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(LOGOS_BUCKET)
      .getPublicUrl(fileName)


    return NextResponse.json({
      success: true,
      fileName: fileName,
      filePath: data.path,
      fileUrl: urlData.publicUrl,
      fileType: file.type,
      fileSize: file.size,
      originalName: file.name
    })

  } catch (error) {
    console.error('Logo upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
