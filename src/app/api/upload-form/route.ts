import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip',
      'application/x-zip-compressed'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, ZIP files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${originalName}`

    // Upload to Supabase Storage
    const uploadResult = await DatabaseService.uploadFormFile(file, fileName)
    
    if (!uploadResult) {
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      )
    }

    // Calculate file size in KB/MB
    const sizeInBytes = file.size
    let fileSize: string
    if (sizeInBytes < 1024 * 1024) {
      fileSize = `${Math.round(sizeInBytes / 1024)} KB`
    } else {
      fileSize = `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
    }

    // Get file extension for type
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
    let fileType = 'PDF'
    switch (fileExtension) {
      case 'doc':
      case 'docx':
        fileType = 'DOC'
        break
      case 'xls':
      case 'xlsx':
        fileType = 'XLS'
        break
      case 'zip':
        fileType = 'ZIP'
        break
      case 'pdf':
      default:
        fileType = 'PDF'
        break
    }

    return NextResponse.json({
      success: true,
      fileName,
      filePath: uploadResult.path,
      fileUrl: uploadResult.url,
      fileSize,
      fileType,
      originalName: file.name
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
