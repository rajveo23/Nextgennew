import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DatabaseService } from '../../../lib/database'
import BlogPostClient from './BlogPostClient'

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
}

interface PageProps {
  params: { slug: string }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const blogs = await DatabaseService.getAllBlogPosts()
    const publishedBlogs = blogs.filter(blog => blog.status === 'published')
    
    return publishedBlogs.map((blog) => ({
      slug: blog.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const blogs = await DatabaseService.getAllBlogPosts()
    const blog = blogs.find(b => b.slug === params.slug && b.status === 'published')
    
    if (!blog) {
      return {
        title: 'Blog Post Not Found | NextGen Registry',
        description: 'The requested blog post could not be found.'
      }
    }

    return {
      title: `${blog.title} | NextGen Registry Blog`,
      description: blog.excerpt || blog.content.substring(0, 160) + '...',
      keywords: blog.tags.join(', '),
      authors: [{ name: blog.author }],
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.content.substring(0, 160) + '...',
        type: 'article',
        publishedTime: blog.publish_date || blog.created_at,
        authors: [blog.author],
        tags: blog.tags,
        images: blog.featured_image_url ? [{
          url: blog.featured_image_url,
          width: 1200,
          height: 630,
          alt: blog.title
        }] : []
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt || blog.content.substring(0, 160) + '...',
        images: blog.featured_image_url ? [blog.featured_image_url] : []
      },
      alternates: {
        canonical: `/blog/${blog.slug}`
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog | NextGen Registry',
      description: 'NextGen Registry Blog'
    }
  }
}

// Server component for static generation
export default async function BlogPostPage({ params }: PageProps) {
  try {
    const blogs = await DatabaseService.getAllBlogPosts()
    const blog = blogs.find(b => b.slug === params.slug && b.status === 'published')
    
    if (!blog) {
      notFound()
    }

    // Convert to legacy format for compatibility
    const legacyBlog: BlogPost = {
      id: parseInt(blog.id.replace(/-/g, '').substring(0, 8), 16),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      content: blog.content,
      status: blog.status as 'published' | 'draft' | 'scheduled',
      author: blog.author,
      publishDate: blog.publish_date || blog.created_at.split('T')[0],
      category: blog.category || 'General',
      views: blog.views,
      image: blog.featured_image_url || undefined,
      tags: blog.tags || []
    }

    // Return the client component with the blog data
    return <BlogPostClient blog={legacyBlog} />
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}

// Force static generation
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour
