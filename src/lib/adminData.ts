// Supabase-based data management for admin panel
// This version uses Supabase instead of MongoDB + Cloudinary

import { AdminDataManagerSupabase } from './adminDataSupabase'

// Re-export types from adminDataSupabase
export type {
  LegacyBlogPost as BlogPost,
  LegacyFAQ as FAQ,
  LegacyImageFile as ImageFile,
  LegacyContactSubmission as ContactSubmission,
  LegacyClient as Client,
  LegacyNewsletterSubscription as NewsletterSubscription
} from './adminDataSupabase'

// Supabase-based data management functions
export class AdminDataManager {
  // Blog management - Supabase
  static async getBlogs(): Promise<import('./adminDataSupabase').LegacyBlogPost[]> {
    try {
      return await AdminDataManagerSupabase.getBlogs()
    } catch (error) {
      console.error('Failed to fetch blogs from Supabase:', error)
      throw new Error('Unable to fetch blogs. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async saveBlog(blog: Omit<import('./adminDataSupabase').LegacyBlogPost, 'id'> | import('./adminDataSupabase').LegacyBlogPost): Promise<import('./adminDataSupabase').LegacyBlogPost | null> {
    try {
      return await AdminDataManagerSupabase.saveBlog(blog)
    } catch (error) {
      console.error('Failed to save blog to Supabase:', error)
      throw new Error('Unable to save blog. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async deleteBlog(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerSupabase.deleteBlog(id)
    } catch (error) {
      console.error('Failed to delete blog from Supabase:', error)
      throw new Error('Unable to delete blog. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  // FAQ management - Supabase
  static async getFAQs(): Promise<import('./adminDataSupabase').LegacyFAQ[]> {
    try {
      return await AdminDataManagerSupabase.getFAQs()
    } catch (error) {
      console.error('Failed to fetch FAQs from Supabase:', error)
      throw new Error('Unable to fetch FAQs. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async saveFAQ(faq: Omit<import('./adminDataSupabase').LegacyFAQ, 'id' | 'createdAt' | 'updatedAt'> | import('./adminDataSupabase').LegacyFAQ): Promise<import('./adminDataSupabase').LegacyFAQ | null> {
    try {
      return await AdminDataManagerSupabase.saveFAQ(faq)
    } catch (error) {
      console.error('Failed to save FAQ to Supabase:', error)
      throw new Error('Unable to save FAQ. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async deleteFAQ(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerSupabase.deleteFAQ(id)
    } catch (error) {
      console.error('Failed to delete FAQ from Supabase:', error)
      throw new Error('Unable to delete FAQ. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  // Image management - Supabase Storage
  static async getImages(): Promise<import('./adminDataSupabase').LegacyImageFile[]> {
    try {
      return await AdminDataManagerSupabase.getImages()
    } catch (error) {
      console.error('Failed to fetch images from Supabase:', error)
      throw new Error('Unable to fetch images. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async uploadImage(file: File, category: string = 'general', alt: string = ''): Promise<import('./adminDataSupabase').LegacyImageFile | null> {
    try {
      return await AdminDataManagerSupabase.uploadImage(file, category, alt)
    } catch (error) {
      console.error('Failed to upload image to Supabase:', error)
      throw new Error('Unable to upload image. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async deleteImage(id: number, path?: string): Promise<boolean> {
    try {
      return await AdminDataManagerSupabase.deleteImage(id, path)
    } catch (error) {
      console.error('Failed to delete image from Supabase:', error)
      throw new Error('Unable to delete image. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  // Contact submissions management - Supabase
  static async getContactSubmissions(): Promise<import('./adminDataSupabase').LegacyContactSubmission[]> {
    try {
      return await AdminDataManagerSupabase.getContactSubmissions()
    } catch (error) {
      console.error('Failed to fetch contact submissions from Supabase:', error)
      throw new Error('Unable to fetch contact submissions. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async saveContactSubmission(submission: Omit<import('./adminDataSupabase').LegacyContactSubmission, 'id'> | import('./adminDataSupabase').LegacyContactSubmission): Promise<import('./adminDataSupabase').LegacyContactSubmission | null> {
    try {
      return await AdminDataManagerSupabase.saveContactSubmission(submission)
    } catch (error) {
      console.error('Failed to save contact submission to Supabase:', error)
      throw new Error('Unable to save contact submission. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async deleteContactSubmission(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerSupabase.deleteContactSubmission(id)
    } catch (error) {
      console.error('Failed to delete contact submission from Supabase:', error)
      throw new Error('Unable to delete contact submission. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  // Client management - Supabase
  static async getClients(): Promise<import('./adminDataSupabase').LegacyClient[]> {
    try {
      return await AdminDataManagerSupabase.getClients()
    } catch (error) {
      console.error('Failed to fetch clients from Supabase:', error)
      throw new Error('Unable to fetch clients. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async saveClient(client: Omit<import('./adminDataSupabase').LegacyClient, 'id' | 'createdAt' | 'updatedAt'> | import('./adminDataSupabase').LegacyClient): Promise<import('./adminDataSupabase').LegacyClient | null> {
    try {
      return await AdminDataManagerSupabase.saveClient(client)
    } catch (error) {
      console.error('Failed to save client to Supabase:', error)
      throw new Error('Unable to save client. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  static async deleteClient(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerSupabase.deleteClient(id)
    } catch (error) {
      console.error('Failed to delete client from Supabase:', error)
      throw new Error('Unable to delete client. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  // Initialize data - Supabase
  static async initializeData(): Promise<void> {
    try {
      const result = await AdminDataManagerSupabase.initializeData()
      if (!result) {
        throw new Error('Database initialization failed')
      }
    } catch (error) {
      console.error('Failed to initialize Supabase data:', error)
      throw new Error('Unable to initialize data. Please check your internet connection and ensure Supabase is configured.')
    }
  }

  // Newsletter subscriptions - Supabase implementation
  static async getNewsletterSubscriptions(): Promise<import('./adminDataSupabase').LegacyNewsletterSubscription[]> {
    try {
      return await AdminDataManagerSupabase.getNewsletterSubscriptions()
    } catch (error) {
      console.error('Failed to fetch newsletter subscriptions from Supabase:', error)
      return []
    }
  }

  static async saveNewsletterSubscription(subscription: Omit<import('./adminDataSupabase').LegacyNewsletterSubscription, 'id'> | import('./adminDataSupabase').LegacyNewsletterSubscription): Promise<import('./adminDataSupabase').LegacyNewsletterSubscription | null> {
    try {
      return await AdminDataManagerSupabase.saveNewsletterSubscription(subscription)
    } catch (error) {
      console.error('Failed to save newsletter subscription to Supabase:', error)
      return null
    }
  }

  static async deleteNewsletterSubscription(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerSupabase.deleteNewsletterSubscription(id)
    } catch (error) {
      console.error('Failed to delete newsletter subscription from Supabase:', error)
      return false
    }
  }
}
