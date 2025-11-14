import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { path, tag } = await request.json()
    
    // Revalidate specific paths
    if (path) {
      revalidatePath(path)
    }
    
    // Revalidate by tag
    if (tag) {
      revalidateTag(tag)
    }
    
    // Always revalidate blog pages
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path: path || 'blog pages',
      tag: tag || 'none'
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ 
      revalidated: false, 
      error: 'Failed to revalidate' 
    }, { status: 500 })
  }
}
