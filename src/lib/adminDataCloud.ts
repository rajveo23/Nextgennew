// Cloud-based data management for admin panel
// This replaces localStorage with API calls to MongoDB

export interface BlogPost {
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
  // Additional properties for display
  date?: string
  readTime?: string
  featured?: boolean
}

export interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ImageFile {
  id: number
  name: string
  url: string
  size: number
  uploadDate: string
  category: string
  alt: string
  dimensions: string
}

export interface ContactSubmission {
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

export interface Client {
  id: number
  serialNumber: number
  issuerClientCompanyName: string
  typeOfSecurity: string
  isinOfTheCompany: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface NewsletterSubscription {
  id: number
  email: string
  timestamp: string
  status: 'active' | 'unsubscribed'
  source: string
}

// Cloud-based data management functions
export class AdminDataManagerCloud {
  
  // Blog management
  static async getBlogs(): Promise<BlogPost[]> {
    try {
      const response = await fetch('/api/blogs')
      if (!response.ok) throw new Error('Failed to fetch blogs')
      return await response.json()
    } catch (error) {
      console.error('Error fetching blogs:', error)
      return []
    }
  }

  static async saveBlog(blog: Omit<BlogPost, 'id'> | BlogPost): Promise<BlogPost | null> {
    try {
      const method = 'id' in blog ? 'PUT' : 'POST'
      const response = await fetch('/api/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog)
      })
      
      if (!response.ok) throw new Error('Failed to save blog')
      return await response.json()
    } catch (error) {
      console.error('Error saving blog:', error)
      return null
    }
  }

  static async deleteBlog(id: number): Promise<boolean> {
    try {
      const response = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' })
      return response.ok
    } catch (error) {
      console.error('Error deleting blog:', error)
      return false
    }
  }

  // FAQ management
  static async getFAQs(): Promise<FAQ[]> {
    try {
      const response = await fetch('/api/faqs')
      if (!response.ok) throw new Error('Failed to fetch FAQs')
      return await response.json()
    } catch (error) {
      console.error('Error fetching FAQs:', error)
      return []
    }
  }

  static async saveFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'> | FAQ): Promise<FAQ | null> {
    try {
      const method = 'id' in faq ? 'PUT' : 'POST'
      const response = await fetch('/api/faqs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faq)
      })
      
      if (!response.ok) throw new Error('Failed to save FAQ')
      return await response.json()
    } catch (error) {
      console.error('Error saving FAQ:', error)
      return null
    }
  }

  static async deleteFAQ(id: number): Promise<boolean> {
    try {
      const response = await fetch(`/api/faqs?id=${id}`, { method: 'DELETE' })
      return response.ok
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      return false
    }
  }

  // Image management
  static async getImages(): Promise<ImageFile[]> {
    try {
      const response = await fetch('/api/upload')
      if (!response.ok) throw new Error('Failed to fetch images')
      return await response.json()
    } catch (error) {
      console.error('Error fetching images:', error)
      return []
    }
  }

  static async uploadImage(file: File, category: string = 'general', alt: string = ''): Promise<ImageFile | null> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', category)
      formData.append('alt', alt)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Failed to upload image')
      const result = await response.json()
      return result.image
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  static async deleteImage(id: number, cloudinaryId?: string): Promise<boolean> {
    try {
      const url = cloudinaryId 
        ? `/api/upload?id=${id}&cloudinaryId=${cloudinaryId}`
        : `/api/upload?id=${id}`
      const response = await fetch(url, { method: 'DELETE' })
      return response.ok
    } catch (error) {
      console.error('Error deleting image:', error)
      return false
    }
  }

  // Contact submissions management
  static async getContactSubmissions(): Promise<ContactSubmission[]> {
    try {
      const response = await fetch('/api/contacts')
      if (!response.ok) throw new Error('Failed to fetch contacts')
      return await response.json()
    } catch (error) {
      console.error('Error fetching contacts:', error)
      return []
    }
  }

  static async saveContactSubmission(submission: Omit<ContactSubmission, 'id'> | ContactSubmission): Promise<ContactSubmission | null> {
    try {
      const method = 'id' in submission ? 'PUT' : 'POST'
      const response = await fetch('/api/contacts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      })
      
      if (!response.ok) throw new Error('Failed to save contact')
      return await response.json()
    } catch (error) {
      console.error('Error saving contact:', error)
      return null
    }
  }

  static async deleteContactSubmission(id: number): Promise<boolean> {
    try {
      const response = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' })
      return response.ok
    } catch (error) {
      console.error('Error deleting contact:', error)
      return false
    }
  }

  // Client management
  static async getClients(): Promise<Client[]> {
    try {
      const response = await fetch('/api/clients')
      if (!response.ok) throw new Error('Failed to fetch clients')
      return await response.json()
    } catch (error) {
      console.error('Error fetching clients:', error)
      return []
    }
  }

  static async saveClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> | Client): Promise<Client | null> {
    try {
      const method = 'id' in client ? 'PUT' : 'POST'
      const response = await fetch('/api/clients', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
      })
      
      if (!response.ok) throw new Error('Failed to save client')
      return await response.json()
    } catch (error) {
      console.error('Error saving client:', error)
      return null
    }
  }

  static async deleteClient(id: number): Promise<boolean> {
    try {
      const response = await fetch(`/api/clients?id=${id}`, { method: 'DELETE' })
      return response.ok
    } catch (error) {
      console.error('Error deleting client:', error)
      return false
    }
  }

  // Initialize database with default data
  static async initializeData(): Promise<boolean> {
    try {
      const response = await fetch('/api/init', { method: 'POST' })
      return response.ok
    } catch (error) {
      console.error('Error initializing data:', error)
      return false
    }
  }

  // Utility function to check if cloud storage is available
  static async isCloudStorageAvailable(): Promise<boolean> {
    try {
      const response = await fetch('/api/blogs')
      return response.ok
    } catch (error) {
      return false
    }
  }
}
