import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { DatabaseService } from '../../../lib/database'

// GET /api/blogs - Get all blogs
export async function GET() {
  try {
    const blogs = await DatabaseService.getAllBlogPosts()
    
    // Convert Supabase format to legacy format for compatibility
    const formattedBlogs = blogs.map(blog => ({
      id: parseInt(blog.id.replace(/-/g, '').substring(0, 8), 16),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      content: blog.content,
      status: blog.status,
      author: blog.author,
      publishDate: blog.publish_date || blog.created_at.split('T')[0],
      category: blog.category || 'General',
      views: blog.views,
      image: blog.featured_image_url,
      tags: blog.tags,
      date: blog.created_at,
      readTime: `${Math.ceil(blog.content.length / 200)} min read`,
      featured: blog.published
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
    
    // Convert legacy format to Supabase format
    const blogData = {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      featured_image_url: body.image,
      author: body.author,
      published: body.status === 'published',
      status: body.status,
      publish_date: body.publishDate,
      category: body.category,
      views: body.views || 0,
      tags: body.tags || []
    }
    
    const newBlog = await DatabaseService.createBlogPost(blogData)
    
    // Convert back to legacy format
    const legacyBlog = {
      id: parseInt(newBlog.id.replace(/-/g, '').substring(0, 8), 16),
      title: newBlog.title,
      slug: newBlog.slug,
      excerpt: newBlog.excerpt || '',
      content: newBlog.content,
      status: newBlog.status,
      author: newBlog.author,
      publishDate: newBlog.publish_date || newBlog.created_at.split('T')[0],
      category: newBlog.category || 'General',
      views: newBlog.views,
      image: newBlog.featured_image_url,
      tags: newBlog.tags,
      date: newBlog.created_at,
      readTime: `${Math.ceil(newBlog.content.length / 200)} min read`,
      featured: newBlog.published
    }
    
    // Revalidate blog pages to include new post
    try {
      revalidatePath('/blog')
      revalidatePath('/blog/[slug]', 'page')
      revalidatePath('/', 'layout') // Revalidate sitemap
    } catch (revalidateError) {
      console.warn('Revalidation failed:', revalidateError)
    }
    
    return NextResponse.json(legacyBlog, { status: 201 })
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
    
    // Find the actual UUID for this blog
    const blogs = await DatabaseService.getAllBlogPosts()
    const existingBlog = blogs.find(b => 
      parseInt(b.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
    )
    
    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    
    // Convert legacy format to Supabase format
    const supabaseUpdateData = {
      title: updateData.title,
      slug: updateData.slug,
      content: updateData.content,
      excerpt: updateData.excerpt,
      featured_image_url: updateData.image,
      author: updateData.author,
      published: updateData.status === 'published',
      status: updateData.status,
      publish_date: updateData.publishDate,
      category: updateData.category,
      views: updateData.views,
      tags: updateData.tags || []
    }
    
    const updatedBlog = await DatabaseService.updateBlogPost(existingBlog.id, supabaseUpdateData)
    
    // Convert back to legacy format
    const legacyBlog = {
      id: parseInt(updatedBlog.id.replace(/-/g, '').substring(0, 8), 16),
      title: updatedBlog.title,
      slug: updatedBlog.slug,
      excerpt: updatedBlog.excerpt || '',
      content: updatedBlog.content,
      status: updatedBlog.status,
      author: updatedBlog.author,
      publishDate: updatedBlog.publish_date || updatedBlog.created_at.split('T')[0],
      category: updatedBlog.category || 'General',
      views: updatedBlog.views,
      image: updatedBlog.featured_image_url,
      tags: updatedBlog.tags,
      date: updatedBlog.created_at,
      readTime: `${Math.ceil(updatedBlog.content.length / 200)} min read`,
      featured: updatedBlog.published
    }
    
    // Revalidate blog pages to reflect updates
    try {
      revalidatePath('/blog')
      revalidatePath(`/blog/${updatedBlog.slug}`)
      revalidatePath('/blog/[slug]', 'page')
    } catch (revalidateError) {
      console.warn('Revalidation failed:', revalidateError)
    }
    
    return NextResponse.json(legacyBlog)
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
    
    // Find the actual UUID for this blog
    const blogs = await DatabaseService.getAllBlogPosts()
    const existingBlog = blogs.find(b => 
      parseInt(b.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
    )
    
    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    
    await DatabaseService.deleteBlogPost(existingBlog.id)
    
    // Revalidate blog pages to remove deleted post
    try {
      revalidatePath('/blog')
      revalidatePath(`/blog/${existingBlog.slug}`)
      revalidatePath('/blog/[slug]', 'page')
    } catch (revalidateError) {
      console.warn('Revalidation failed:', revalidateError)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
