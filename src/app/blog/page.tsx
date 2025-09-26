'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import NewsletterForm from '../../components/NewsletterForm'
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  UserIcon,
  ArrowRightIcon,
  TagIcon
} from '@heroicons/react/24/outline'

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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs')
        if (response.ok) {
          const data = await response.json()
          // Filter only published blogs
          const publishedBlogs = data.filter((blog: BlogPost) => blog.status === 'published')
          setBlogs(publishedBlogs)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const categories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category)))]
  
  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section - Same as RTA Forms */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              RTA <span className="text-secondary-300">Insights</span> & Updates
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Stay informed with the latest insights, regulatory updates, and industry trends in RTA services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter - Same style as RTA Forms */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No blog posts found for the selected category.</p>
            </div>
          ) : (
            filteredBlogs.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {post.image && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="h-4 w-4" />
                      {new Date(post.publishDate || post.date || '').toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {post.readTime || '5 min read'}
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 cursor-pointer transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    
                    {post.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {post.category}
                      </span>
                    )}
                  </div>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                        >
                          <TagIcon className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Read More
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
