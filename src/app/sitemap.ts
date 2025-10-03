import { MetadataRoute } from 'next'
import { seoConfig } from '../lib/seo'
import { DatabaseService } from '../lib/database'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoConfig.siteUrl

  // Static pages with optimized priorities
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - Highest priority
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Main service/info pages - High priority
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rta-forms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/clients`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Blog index - Medium-high priority
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Support pages - Medium priority
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Accessibility page
    {
      url: `${baseUrl}/special-person-web`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Fetch and add blog posts dynamically
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const blogs = await DatabaseService.getAllBlogPosts()
    blogPages = blogs
      .filter(blog => blog.published && blog.slug) // Only published blogs with slugs
      .map(blog => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at || blog.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error)
    // Continue with static pages even if blog fetch fails
  }

  return [...staticPages, ...blogPages]
}
