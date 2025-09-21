import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { BlogPost } from '@/lib/adminData'

// GET /api/blogs - Get all blogs
export async function GET() {
  try {
    const db = await getDatabase()
    const blogs = await db.collection<BlogPost>('blogs').find({}).sort({ publishDate: -1 }).toArray()
    
    // Convert MongoDB _id to id for consistency
    const formattedBlogs = blogs.map(blog => ({
      ...blog,
      id: blog.id || Math.floor(Math.random() * 1000000),
      _id: undefined
    }))
    
    return NextResponse.json(formattedBlogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

// POST /api/blogs - Create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()
    
    // Generate new ID
    const lastBlog = await db.collection('blogs').findOne({}, { sort: { id: -1 } })
    const newId = (lastBlog?.id || 0) + 1
    
    const newBlog: BlogPost = {
      ...body,
      id: newId,
      views: 0,
      publishDate: body.publishDate || new Date().toISOString().split('T')[0]
    }
    
    await db.collection('blogs').insertOne(newBlog)
    
    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}

// PUT /api/blogs - Update existing blog
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const db = await getDatabase()
    
    const result = await db.collection('blogs').updateOne(
      { id: parseInt(id) },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    
    const updatedBlog = await db.collection('blogs').findOne({ id: parseInt(id) })
    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

// DELETE /api/blogs - Delete blog
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 })
    }
    
    const db = await getDatabase()
    const result = await db.collection('blogs').deleteOne({ id: parseInt(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
