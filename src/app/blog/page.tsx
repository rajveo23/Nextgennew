import { Metadata } from 'next'
import { DatabaseService } from '../../lib/database'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'RTA Insights & Updates | NextGen Registry Blog',
  description: 'Stay informed with the latest insights, regulatory updates, and industry trends in RTA services. Expert articles on compliance, registration, and business solutions.',
  keywords: 'RTA services, regulatory updates, compliance, business registration, industry insights, NextGen Registry',
  openGraph: {
    title: 'RTA Insights & Updates | NextGen Registry Blog',
    description: 'Stay informed with the latest insights, regulatory updates, and industry trends in RTA services.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTA Insights & Updates | NextGen Registry Blog',
    description: 'Stay informed with the latest insights, regulatory updates, and industry trends in RTA services.',
  },
  alternates: {
    canonical: '/blog'
  }
}

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  status: 'published' | 'draft' | 'scheduled'
  author: string
  publishDate: string
  category: string
  views: number
  image?: string
  tags: string[]
  date?: string
  readTime?: string
  featured?: boolean
}

// Server component for static generation
export default async function BlogPage() {
  try {
    const blogs = await DatabaseService.getAllBlogPosts()
    const publishedBlogs = blogs.filter(blog => blog.status === 'published')
    
    // Convert to legacy format for compatibility
    const legacyBlogs: BlogPost[] = publishedBlogs.map(blog => ({
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

    return <BlogPageClient blogs={legacyBlogs} />
  } catch (error) {
    console.error('Error loading blogs:', error)
    return <BlogPageClient blogs={[]} />
  }
}

// Force static generation
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour
