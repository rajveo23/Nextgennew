// Cloud-only data management for admin panel
// This version removes all localStorage fallbacks and uses only MongoDB + Cloudinary

import { AdminDataManagerCloud } from './adminDataCloud'

// Re-export types from adminDataCloud
export type {
  BlogPost,
  FAQ,
  ImageFile,
  ContactSubmission,
  Client,
  NewsletterSubscription
} from './adminDataCloud'

// Cloud-only data management functions
export class AdminDataManager {
  // Blog management - Cloud only
  static async getBlogs(): Promise<import('./adminDataCloud').BlogPost[]> {
    try {
      return await AdminDataManagerCloud.getBlogs()
    } catch (error) {
      console.error('Failed to fetch blogs from cloud:', error)
      throw new Error('Unable to fetch blogs. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async saveBlog(blog: Omit<import('./adminDataCloud').BlogPost, 'id'> | import('./adminDataCloud').BlogPost): Promise<import('./adminDataCloud').BlogPost | null> {
    try {
      return await AdminDataManagerCloud.saveBlog(blog)
    } catch (error) {
      console.error('Failed to save blog to cloud:', error)
      throw new Error('Unable to save blog. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async deleteBlog(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerCloud.deleteBlog(id)
    } catch (error) {
      console.error('Failed to delete blog from cloud:', error)
      throw new Error('Unable to delete blog. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  // FAQ management - Cloud only
  static async getFAQs(): Promise<import('./adminDataCloud').FAQ[]> {
    try {
      return await AdminDataManagerCloud.getFAQs()
    } catch (error) {
      console.error('Failed to fetch FAQs from cloud:', error)
      throw new Error('Unable to fetch FAQs. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async saveFAQ(faq: Omit<import('./adminDataCloud').FAQ, 'id' | 'createdAt' | 'updatedAt'> | import('./adminDataCloud').FAQ): Promise<import('./adminDataCloud').FAQ | null> {
    try {
      return await AdminDataManagerCloud.saveFAQ(faq)
    } catch (error) {
      console.error('Failed to save FAQ to cloud:', error)
      throw new Error('Unable to save FAQ. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async deleteFAQ(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerCloud.deleteFAQ(id)
    } catch (error) {
      console.error('Failed to delete FAQ from cloud:', error)
      throw new Error('Unable to delete FAQ. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  // Image management - Cloud only
  static async getImages(): Promise<import('./adminDataCloud').ImageFile[]> {
    try {
      return await AdminDataManagerCloud.getImages()
    } catch (error) {
      console.error('Failed to fetch images from cloud:', error)
      throw new Error('Unable to fetch images. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async uploadImage(file: File, category: string = 'general', alt: string = ''): Promise<import('./adminDataCloud').ImageFile | null> {
    try {
      return await AdminDataManagerCloud.uploadImage(file, category, alt)
    } catch (error) {
      console.error('Failed to upload image to cloud:', error)
      throw new Error('Unable to upload image. Please check your internet connection and ensure Cloudinary is configured.')
    }
  }

  static async deleteImage(id: number, cloudinaryId?: string): Promise<boolean> {
    try {
      return await AdminDataManagerCloud.deleteImage(id, cloudinaryId)
    } catch (error) {
      console.error('Failed to delete image from cloud:', error)
      throw new Error('Unable to delete image. Please check your internet connection and ensure Cloudinary is configured.')
    }
  }

  // Contact submissions management - Cloud only
  static async getContactSubmissions(): Promise<import('./adminDataCloud').ContactSubmission[]> {
    try {
      return await AdminDataManagerCloud.getContactSubmissions()
    } catch (error) {
      console.error('Failed to fetch contact submissions from cloud:', error)
      throw new Error('Unable to fetch contact submissions. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async saveContactSubmission(submission: Omit<import('./adminDataCloud').ContactSubmission, 'id'> | import('./adminDataCloud').ContactSubmission): Promise<import('./adminDataCloud').ContactSubmission | null> {
    try {
      return await AdminDataManagerCloud.saveContactSubmission(submission)
    } catch (error) {
      console.error('Failed to save contact submission to cloud:', error)
      throw new Error('Unable to save contact submission. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async deleteContactSubmission(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerCloud.deleteContactSubmission(id)
    } catch (error) {
      console.error('Failed to delete contact submission from cloud:', error)
      throw new Error('Unable to delete contact submission. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  // Client management - Cloud only
  static async getClients(): Promise<import('./adminDataCloud').Client[]> {
    try {
      return await AdminDataManagerCloud.getClients()
    } catch (error) {
      console.error('Failed to fetch clients from cloud:', error)
      throw new Error('Unable to fetch clients. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async saveClient(client: Omit<import('./adminDataCloud').Client, 'id' | 'createdAt' | 'updatedAt'> | import('./adminDataCloud').Client): Promise<import('./adminDataCloud').Client | null> {
    try {
      return await AdminDataManagerCloud.saveClient(client)
    } catch (error) {
      console.error('Failed to save client to cloud:', error)
      throw new Error('Unable to save client. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  static async deleteClient(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerCloud.deleteClient(id)
    } catch (error) {
      console.error('Failed to delete client from cloud:', error)
      throw new Error('Unable to delete client. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  // Initialize data - Cloud only
  static async initializeData(): Promise<void> {
    try {
      const result = await AdminDataManagerCloud.initializeData()
      if (!result) {
        throw new Error('Database initialization failed')
      }
    } catch (error) {
      console.error('Failed to initialize cloud data:', error)
      throw new Error('Unable to initialize data. Please check your internet connection and ensure MongoDB is configured.')
    }
  }

  // Newsletter subscriptions - Not implemented in cloud version yet
  // These methods are placeholders for future implementation
  static async getNewsletterSubscriptions(): Promise<import('./adminDataCloud').NewsletterSubscription[]> {
    console.warn('Newsletter subscriptions not implemented in cloud version yet')
    return []
  }

  static async saveNewsletterSubscription(subscription: Omit<import('./adminDataCloud').NewsletterSubscription, 'id'> | import('./adminDataCloud').NewsletterSubscription): Promise<import('./adminDataCloud').NewsletterSubscription | null> {
    console.warn('Newsletter subscription saving not implemented in cloud version yet')
    return null
  }

  static async deleteNewsletterSubscription(id: number): Promise<boolean> {
    console.warn('Newsletter subscription deletion not implemented in cloud version yet')
    return false
  }
}
