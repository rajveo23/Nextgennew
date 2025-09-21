'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'
import { AdminDataManager, BlogPost } from '@/lib/adminData'
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  UserIcon,
  ArrowRightIcon,
  TagIcon
} from '@heroicons/react/24/outline'

const blogPosts = [
  {
    id: 1,
    title: 'Understanding ISIN Creation Process: A Complete Guide for Companies',
    excerpt: 'Learn about the step-by-step process of ISIN creation, required documents, timelines, and how NextGen Registry can help streamline your ISIN application.',
    content: 'ISIN (International Securities Identification Number) is a crucial requirement for any company looking to list their securities or enable demat trading...',
    author: 'NextGen Team',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'ISIN Services',
    tags: ['ISIN', 'Listing', 'Compliance'],
    featured: true,
    image: '/api/placeholder/600/400'
  },
  {
    id: 2,
    title: 'New SEBI Regulations 2024: Impact on RTA Services',
    excerpt: 'Explore the latest SEBI regulations and their implications for Registrar and Transfer Agent services, including compliance requirements and operational changes.',
    content: 'The Securities and Exchange Board of India (SEBI) has introduced several new regulations in 2024 that significantly impact RTA operations...',
    author: 'Compliance Team',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Regulations',
    tags: ['SEBI', 'Compliance', 'Regulations'],
    featured: false,
    image: '/api/placeholder/600/400'
  },
  {
    id: 3,
    title: 'Digital Transformation in Share Registry Management',
    excerpt: 'Discover how digital technologies are revolutionizing share registry management and improving efficiency in RTA services.',
    content: 'The digital transformation wave has significantly impacted the financial services sector, and RTA services are no exception...',
    author: 'Technology Team',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Technology',
    tags: ['Digital', 'Technology', 'Innovation'],
    featured: false,
    image: '/api/placeholder/600/400'
  },
  {
    id: 4,
    title: 'Corporate Actions Made Simple: A Guide for Investors',
    excerpt: 'Understanding corporate actions like dividends, bonus issues, and rights offerings, and how they affect your investments.',
    content: 'Corporate actions are events initiated by companies that affect their shareholders and the value of their securities...',
    author: 'Investment Team',
    date: '2023-12-28',
    readTime: '5 min read',
    category: 'Corporate Actions',
    tags: ['Dividends', 'Bonus', 'Rights Issue'],
    featured: false,
    image: '/api/placeholder/600/400'
  },
  {
    id: 5,
    title: 'E-Voting in AGMs: Benefits and Best Practices',
    excerpt: 'Learn about electronic voting in Annual General Meetings, its advantages, and how companies can implement it effectively.',
    content: 'Electronic voting has become an essential part of modern corporate governance, especially in the post-pandemic era...',
    author: 'Governance Team',
    date: '2023-12-20',
    readTime: '6 min read',
    category: 'E-Voting',
    tags: ['E-Voting', 'AGM', 'Governance'],
    featured: false,
    image: '/api/placeholder/600/400'
  },
  {
    id: 6,
    title: 'Demat Account Management: Best Practices for Companies',
    excerpt: 'Essential guidelines for companies on managing demat accounts, maintaining records, and ensuring compliance with depository requirements.',
    content: 'Dematerialization has revolutionized the way securities are held and traded in India. For companies, managing demat accounts...',
    author: 'Operations Team',
    date: '2023-12-15',
    readTime: '9 min read',
    category: 'Demat Services',
    tags: ['Demat', 'NSDL', 'CDSL'],
    featured: false,
    image: '/api/placeholder/600/400'
  }
]

const categories = [
  'All Posts',
  'ISIN Services',
  'Regulations',
  'Technology',
  'Corporate Actions',
  'E-Voting',
  'Demat Services'
]

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load blogs from admin data
    AdminDataManager.initializeData()
    const adminBlogs = AdminDataManager.getBlogs()
    
    // Convert admin blog format to display format and filter published posts
    const publishedBlogs = adminBlogs
      .filter(blog => blog.status === 'published')
      .map(blog => ({
        ...blog,
        date: blog.publishDate,
        readTime: '5 min read', // Default read time
        featured: false // We'll make the first one featured
      }))
    
    // Make the first blog featured if exists
    if (publishedBlogs.length > 0) {
      publishedBlogs[0].featured = true
    }
    
    setBlogPosts(publishedBlogs)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NextGen <span className="text-secondary-300">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Stay updated with the latest insights, regulations, and trends in RTA services and capital markets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured <span className="text-gradient">Article</span>
              </h2>
            </motion.div>

            <motion.div
              className="card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  {featuredPost.image ? (
                    <div className="h-64 md:h-full overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-64 md:h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                      <div className="text-white text-6xl font-bold">NG</div>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">Featured</span>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-primary-600 transition-colors duration-200 cursor-pointer">
                      {featuredPost.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                        {new Date(featuredPost.date || featuredPost.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {featuredPost.readTime || '5 min read'}
                      </div>
                    </div>
                    
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      Read More
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className="px-6 py-2 bg-white text-gray-700 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest <span className="text-gradient">Articles</span>
            </h2>
            <p className="text-xl text-gray-600">
              Expert insights and updates from the world of RTA services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="card overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {post.image ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:from-primary-600 group-hover:to-secondary-600 transition-all duration-300">
                    <div className="text-white text-4xl font-bold">NG</div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {post.readTime || '5 min read'}
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors duration-200 cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <UserIcon className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-3 h-3 mr-1" />
                      {new Date(post.date || post.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="flex items-center text-xs text-gray-500">
                          <TagIcon className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with NextGen Insights
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter and get the latest updates on RTA services, regulations, and industry trends delivered to your inbox.
            </p>
            
            <NewsletterForm />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
