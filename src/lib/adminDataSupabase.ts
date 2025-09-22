// Supabase-based data management for admin panel
// This replaces MongoDB with Supabase

import { DatabaseService } from './database'
import { StorageService } from './storage'
import { Client, BlogPost, FAQ, ContactSubmission, NewsletterSubscription } from './supabase'

// Legacy interface mappings for backward compatibility
export interface LegacyBlogPost {
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

export interface LegacyFAQ {
  id: number
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LegacyImageFile {
  id: number
  name: string
  url: string
  size: number
  uploadDate: string
  category: string
  alt: string
  dimensions: string
}

export interface LegacyContactSubmission {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  timestamp: string
  status: 'new' | 'read' | 'responded'
  source: string
  newsletter?: boolean
}

export interface LegacyClient {
  id: number
  serialNumber: number
  issuerClientCompanyName: string
  typeOfSecurity: string
  isinOfTheCompany: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface LegacyNewsletterSubscription {
  id: number
  email: string
  timestamp: string
  status: 'active' | 'unsubscribed'
  source: string
}

// Helper functions to convert between legacy and new formats
function convertBlogPostToLegacy(post: BlogPost): LegacyBlogPost {
  return {
    id: parseInt(post.id.replace(/-/g, '').substring(0, 8), 16), // Convert UUID to number
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    status: post.status,
    author: post.author,
    publishDate: post.publish_date || post.created_at,
    category: post.category || 'General',
    views: post.views,
    image: post.featured_image_url,
    tags: post.tags,
    date: post.created_at,
    readTime: `${Math.ceil(post.content.length / 200)} min read`,
    featured: post.published
  }
}

function convertLegacyBlogPost(legacy: Omit<LegacyBlogPost, 'id'> | LegacyBlogPost): Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> {
  return {
    title: legacy.title,
    slug: legacy.slug,
    content: legacy.content,
    excerpt: legacy.excerpt,
    featured_image_url: legacy.image,
    author: legacy.author,
    published: legacy.status === 'published',
    status: legacy.status,
    publish_date: legacy.publishDate,
    category: legacy.category,
    views: legacy.views,
    tags: legacy.tags
  }
}

function convertClientToLegacy(client: Client): LegacyClient {
  return {
    id: parseInt(client.id.replace(/-/g, '').substring(0, 8), 16),
    serialNumber: client.serial_number,
    issuerClientCompanyName: client.issuer_client_company_name,
    typeOfSecurity: client.type_of_security,
    isinOfTheCompany: client.isin_of_the_company,
    createdAt: client.created_at,
    updatedAt: client.updated_at,
    isActive: client.is_active
  }
}

function convertLegacyClient(legacy: Omit<LegacyClient, 'id' | 'createdAt' | 'updatedAt'> | LegacyClient): Omit<Client, 'id' | 'created_at' | 'updated_at'> {
  return {
    serial_number: legacy.serialNumber,
    issuer_client_company_name: legacy.issuerClientCompanyName,
    type_of_security: legacy.typeOfSecurity,
    isin_of_the_company: legacy.isinOfTheCompany,
    is_active: legacy.isActive
  }
}

function convertFAQToLegacy(faq: FAQ): LegacyFAQ {
  return {
    id: parseInt(faq.id.replace(/-/g, '').substring(0, 8), 16),
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    order: faq.order_index,
    isActive: faq.is_active,
    createdAt: faq.created_at,
    updatedAt: faq.updated_at
  }
}

function convertLegacyFAQ(legacy: Omit<LegacyFAQ, 'id' | 'createdAt' | 'updatedAt'> | LegacyFAQ): Omit<FAQ, 'id' | 'created_at' | 'updated_at'> {
  return {
    question: legacy.question,
    answer: legacy.answer,
    category: legacy.category,
    order_index: legacy.order,
    is_active: legacy.isActive
  }
}

function convertContactToLegacy(contact: ContactSubmission): LegacyContactSubmission {
  return {
    id: parseInt(contact.id.replace(/-/g, '').substring(0, 8), 16),
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    company: contact.company,
    service: contact.service,
    message: contact.message,
    timestamp: contact.created_at,
    status: contact.status,
    source: contact.source,
    newsletter: contact.newsletter
  }
}

function convertNewsletterToLegacy(subscription: NewsletterSubscription): LegacyNewsletterSubscription {
  return {
    id: parseInt(subscription.id.replace(/-/g, '').substring(0, 8), 16),
    email: subscription.email,
    timestamp: subscription.subscribed_at,
    status: subscription.is_active ? 'active' : 'unsubscribed',
    source: subscription.source
  }
}

// Supabase-based data management functions (with legacy compatibility)
export class AdminDataManagerSupabase {
  
  // Blog management
  static async getBlogs(): Promise<LegacyBlogPost[]> {
    try {
      const posts = await DatabaseService.getAllBlogPosts()
      return posts.map(convertBlogPostToLegacy)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      return []
    }
  }

  static async saveBlog(blog: Omit<LegacyBlogPost, 'id'> | LegacyBlogPost): Promise<LegacyBlogPost | null> {
    try {
      const supabaseBlog = convertLegacyBlogPost(blog)
      
      if ('id' in blog) {
        // Find the actual UUID for this blog post
        const existingPosts = await DatabaseService.getAllBlogPosts()
        const existingPost = existingPosts.find(p => 
          parseInt(p.id.replace(/-/g, '').substring(0, 8), 16) === blog.id
        )
        
        if (existingPost) {
          const updated = await DatabaseService.updateBlogPost(existingPost.id, supabaseBlog)
          return convertBlogPostToLegacy(updated)
        }
      }
      
      const created = await DatabaseService.createBlogPost(supabaseBlog)
      return convertBlogPostToLegacy(created)
    } catch (error) {
      console.error('Error saving blog:', error)
      return null
    }
  }

  static async deleteBlog(id: number): Promise<boolean> {
    try {
      // Find the actual UUID for this blog post
      const posts = await DatabaseService.getAllBlogPosts()
      const post = posts.find(p => 
        parseInt(p.id.replace(/-/g, '').substring(0, 8), 16) === id
      )
      
      if (post) {
        await DatabaseService.deleteBlogPost(post.id)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting blog:', error)
      return false
    }
  }

  // FAQ management
  static async getFAQs(): Promise<LegacyFAQ[]> {
    try {
      const faqs = await DatabaseService.getAllFAQs()
      return faqs.map(convertFAQToLegacy)
    } catch (error) {
      console.error('Error fetching FAQs:', error)
      return []
    }
  }

  static async saveFAQ(faq: Omit<LegacyFAQ, 'id' | 'createdAt' | 'updatedAt'> | LegacyFAQ): Promise<LegacyFAQ | null> {
    try {
      const supabaseFAQ = convertLegacyFAQ(faq)
      
      if ('id' in faq) {
        // Find the actual UUID for this FAQ
        const existingFAQs = await DatabaseService.getAllFAQs()
        const existingFAQ = existingFAQs.find(f => 
          parseInt(f.id.replace(/-/g, '').substring(0, 8), 16) === faq.id
        )
        
        if (existingFAQ) {
          const updated = await DatabaseService.updateFAQ(existingFAQ.id, supabaseFAQ)
          return convertFAQToLegacy(updated)
        }
      }
      
      const created = await DatabaseService.createFAQ(supabaseFAQ)
      return convertFAQToLegacy(created)
    } catch (error) {
      console.error('Error saving FAQ:', error)
      return null
    }
  }

  static async deleteFAQ(id: number): Promise<boolean> {
    try {
      const faqs = await DatabaseService.getAllFAQs()
      const faq = faqs.find(f => 
        parseInt(f.id.replace(/-/g, '').substring(0, 8), 16) === id
      )
      
      if (faq) {
        await DatabaseService.deleteFAQ(faq.id)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      return false
    }
  }

  // Image management
  static async getImages(): Promise<LegacyImageFile[]> {
    try {
      const files = await StorageService.getImages()
      return files.map(file => ({
        id: parseInt(file.id.replace(/-/g, '').substring(0, 8), 16),
        name: file.filename,
        url: StorageService.getPublicUrl('company-assets', file.file_path),
        size: file.file_size || 0,
        uploadDate: file.created_at,
        category: 'general',
        alt: file.filename,
        dimensions: '0x0' // We don't store dimensions in Supabase by default
      }))
    } catch (error) {
      console.error('Error fetching images:', error)
      return []
    }
  }

  static async uploadImage(file: File, category: string = 'general', alt: string = ''): Promise<LegacyImageFile | null> {
    try {
      const result = await StorageService.uploadCompanyAsset(file)
      return {
        id: Date.now(), // Temporary ID
        name: file.name,
        url: result.url,
        size: file.size,
        uploadDate: new Date().toISOString(),
        category,
        alt: alt || file.name,
        dimensions: '0x0'
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  static async deleteImage(id: number, path?: string): Promise<boolean> {
    try {
      if (path) {
        return await StorageService.deleteImage(path)
      }
      
      // If no path provided, try to find by ID (this is less reliable)
      const files = await StorageService.getImages()
      const file = files.find(f => 
        parseInt(f.id.replace(/-/g, '').substring(0, 8), 16) === id
      )
      
      if (file) {
        return await StorageService.deleteImage(file.file_path)
      }
      return false
    } catch (error) {
      console.error('Error deleting image:', error)
      return false
    }
  }

  // Contact submissions management
  static async getContactSubmissions(): Promise<LegacyContactSubmission[]> {
    try {
      const submissions = await DatabaseService.getContactSubmissions()
      return submissions.map(convertContactToLegacy)
    } catch (error) {
      console.error('Error fetching contact submissions:', error)
      return []
    }
  }

  static async saveContactSubmission(submission: Omit<LegacyContactSubmission, 'id'> | LegacyContactSubmission): Promise<LegacyContactSubmission | null> {
    try {
      if ('id' in submission) {
        // Update existing submission
        const submissions = await DatabaseService.getContactSubmissions()
        const existing = submissions.find(s => 
          parseInt(s.id.replace(/-/g, '').substring(0, 8), 16) === submission.id
        )
        
        if (existing) {
          const updated = await DatabaseService.updateContactSubmission(existing.id, {
            status: submission.status
          })
          return convertContactToLegacy(updated)
        }
      } else {
        // Create new submission
        await DatabaseService.createContactSubmission({
          name: submission.name,
          email: submission.email,
          phone: submission.phone,
          company: submission.company,
          service: submission.service,
          message: submission.message,
          source: submission.source,
          newsletter: submission.newsletter
        })
        
        return {
          ...submission,
          id: Date.now(),
          timestamp: new Date().toISOString(),
          status: 'new'
        }
      }
      return null
    } catch (error) {
      console.error('Error saving contact submission:', error)
      return null
    }
  }

  static async deleteContactSubmission(id: number): Promise<boolean> {
    try {
      const submissions = await DatabaseService.getContactSubmissions()
      const submission = submissions.find(s => 
        parseInt(s.id.replace(/-/g, '').substring(0, 8), 16) === id
      )
      
      if (submission) {
        await DatabaseService.deleteContactSubmission(submission.id)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting contact submission:', error)
      return false
    }
  }

  // Client management
  static async getClients(): Promise<LegacyClient[]> {
    try {
      const clients = await DatabaseService.getClients()
      return clients.map(convertClientToLegacy)
    } catch (error) {
      console.error('Error fetching clients:', error)
      return []
    }
  }

  static async saveClient(client: Omit<LegacyClient, 'id' | 'createdAt' | 'updatedAt'> | LegacyClient): Promise<LegacyClient | null> {
    try {
      const supabaseClient = convertLegacyClient(client)
      
      if ('id' in client) {
        // Find the actual UUID for this client
        const existingClients = await DatabaseService.getClients()
        const existingClient = existingClients.find(c => 
          parseInt(c.id.replace(/-/g, '').substring(0, 8), 16) === client.id
        )
        
        if (existingClient) {
          const updated = await DatabaseService.updateClient(existingClient.id, supabaseClient)
          return convertClientToLegacy(updated)
        }
      }
      
      const created = await DatabaseService.createClient(supabaseClient)
      return convertClientToLegacy(created)
    } catch (error) {
      console.error('Error saving client:', error)
      return null
    }
  }

  static async deleteClient(id: number): Promise<boolean> {
    try {
      const clients = await DatabaseService.getClients()
      const client = clients.find(c => 
        parseInt(c.id.replace(/-/g, '').substring(0, 8), 16) === id
      )
      
      if (client) {
        await DatabaseService.deleteClient(client.id)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting client:', error)
      return false
    }
  }

  // Newsletter subscriptions
  static async getNewsletterSubscriptions(): Promise<LegacyNewsletterSubscription[]> {
    try {
      const subscriptions = await DatabaseService.getNewsletterSubscriptions()
      return subscriptions.map(convertNewsletterToLegacy)
    } catch (error) {
      console.error('Error fetching newsletter subscriptions:', error)
      return []
    }
  }

  static async saveNewsletterSubscription(subscription: Omit<LegacyNewsletterSubscription, 'id'> | LegacyNewsletterSubscription): Promise<LegacyNewsletterSubscription | null> {
    try {
      if ('id' in subscription) {
        // Update existing subscription
        const subscriptions = await DatabaseService.getNewsletterSubscriptions()
        const existing = subscriptions.find(s => 
          parseInt(s.id.replace(/-/g, '').substring(0, 8), 16) === subscription.id
        )
        
        if (existing) {
          const updated = await DatabaseService.updateNewsletterSubscription(existing.id, {
            is_active: subscription.status === 'active'
          })
          return convertNewsletterToLegacy(updated)
        }
      } else {
        // Create new subscription
        await DatabaseService.subscribeToNewsletter(subscription.email, subscription.source)
        return {
          ...subscription,
          id: Date.now(),
          timestamp: new Date().toISOString(),
          status: 'active'
        }
      }
      return null
    } catch (error) {
      console.error('Error saving newsletter subscription:', error)
      return null
    }
  }

  static async deleteNewsletterSubscription(id: number): Promise<boolean> {
    try {
      const subscriptions = await DatabaseService.getNewsletterSubscriptions()
      const subscription = subscriptions.find(s => 
        parseInt(s.id.replace(/-/g, '').substring(0, 8), 16) === id
      )
      
      if (subscription) {
        await DatabaseService.updateNewsletterSubscription(subscription.id, { is_active: false })
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting newsletter subscription:', error)
      return false
    }
  }

  // Initialize data
  static async initializeData(): Promise<boolean> {
    try {
      return await DatabaseService.initializeData()
    } catch (error) {
      console.error('Error initializing data:', error)
      return false
    }
  }
}
