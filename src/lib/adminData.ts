// Supabase-based data management for admin panel
// This version uses Supabase with proper error handling

// Import with try-catch to handle missing dependencies
let AdminDataManagerSupabase: any = null
try {
  AdminDataManagerSupabase = require('./adminDataSupabase').AdminDataManagerSupabase
} catch (error) {
  console.warn('Supabase dependencies not available, using fallback')
}

// Re-export types with fallback
export type {
  LegacyBlogPost as BlogPost,
  LegacyFAQ as FAQ,
  LegacyImageFile as ImageFile,
  LegacyContactSubmission as ContactSubmission,
  LegacyClient as Client,
  LegacyNewsletterSubscription as NewsletterSubscription
} from './adminDataSupabase'

// Supabase-based data management functions with fallback
export class AdminDataManager {
  // Blog management
  static async getBlogs() {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.getBlogs()
      }
      return []
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      return []
    }
  }

  static async saveBlog(blog: any) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.saveBlog(blog)
      }
      return null
    } catch (error) {
      console.error('Failed to save blog:', error)
      return null
    }
  }

  static async deleteBlog(id: number) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.deleteBlog(id)
      }
      return false
    } catch (error) {
      console.error('Failed to delete blog:', error)
      return false
    }
  }

  // FAQ management
  static async getFAQs() {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.getFAQs()
      }
      return []
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
      return []
    }
  }

  static async saveFAQ(faq: any) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.saveFAQ(faq)
      }
      return null
    } catch (error) {
      console.error('Failed to save FAQ:', error)
      return null
    }
  }

  static async deleteFAQ(id: number) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.deleteFAQ(id)
      }
      return false
    } catch (error) {
      console.error('Failed to delete FAQ:', error)
      return false
    }
  }

  // Image management
  static async getImages() {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.getImages()
      }
      return []
    } catch (error) {
      console.error('Failed to fetch images:', error)
      return []
    }
  }

  static async uploadImage(file: File, category: string = 'general', alt: string = '') {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.uploadImage(file, category, alt)
      }
      return null
    } catch (error) {
      console.error('Failed to upload image:', error)
      return null
    }
  }

  static async deleteImage(id: number, path?: string) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.deleteImage(id, path)
      }
      return false
    } catch (error) {
      console.error('Failed to delete image:', error)
      return false
    }
  }

  // Contact submissions management
  static async getContactSubmissions() {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.getContactSubmissions()
      }
      return []
    } catch (error) {
      console.error('Failed to fetch contact submissions:', error)
      return []
    }
  }

  static async saveContactSubmission(submission: any) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.saveContactSubmission(submission)
      }
      return null
    } catch (error) {
      console.error('Failed to save contact submission:', error)
      return null
    }
  }

  static async deleteContactSubmission(id: number) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.deleteContactSubmission(id)
      }
      return false
    } catch (error) {
      console.error('Failed to delete contact submission:', error)
      return false
    }
  }

  // Client management
  static async getClients() {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.getClients()
      }
      return []
    } catch (error) {
      console.error('Failed to fetch clients:', error)
      return []
    }
  }

  static async saveClient(client: any) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.saveClient(client)
      }
      return null
    } catch (error) {
      console.error('Failed to save client:', error)
      return null
    }
  }

  static async deleteClient(id: number) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.deleteClient(id)
      }
      return false
    } catch (error) {
      console.error('Failed to delete client:', error)
      return false
    }
  }

  // Initialize data
  static async initializeData() {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.initializeData()
      }
      return true
    } catch (error) {
      console.error('Failed to initialize data:', error)
      return false
    }
  }

  // Newsletter subscriptions
  static async getNewsletterSubscriptions() {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.getNewsletterSubscriptions()
      }
      return []
    } catch (error) {
      console.error('Failed to fetch newsletter subscriptions:', error)
      return []
    }
  }

  static async saveNewsletterSubscription(subscription: any) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.saveNewsletterSubscription(subscription)
      }
      return null
    } catch (error) {
      console.error('Failed to save newsletter subscription:', error)
      return null
    }
  }

  static async deleteNewsletterSubscription(id: number) {
    try {
      if (AdminDataManagerSupabase) {
        return await AdminDataManagerSupabase.deleteNewsletterSubscription(id)
      }
      return false
    } catch (error) {
      console.error('Failed to delete newsletter subscription:', error)
      return false
    }
  }
}
