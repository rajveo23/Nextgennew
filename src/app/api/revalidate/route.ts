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

    // Always revalidate key static pages
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')
    revalidatePath('/faq')
    revalidatePath('/rta-forms')
    revalidatePath('/clients')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path: path || 'all static pages',
      tag: tag || 'none',
      pages: ['/blog', '/faq', '/rta-forms', '/clients']
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({
      revalidated: false,
      error: 'Failed to revalidate'
    }, { status: 500 })
  }
}
