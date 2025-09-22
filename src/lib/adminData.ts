// Fallback localStorage-based data management for admin panel
// This version works without external dependencies

// Type definitions
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
  imageFilename?: string
  tags: string[]
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

// LocalStorage-based data management functions
export class AdminDataManager {
  // Blog management - LocalStorage
  static async getBlogs(): Promise<BlogPost[]> {
    try {
      if (typeof window === 'undefined') return []
      const blogs = localStorage.getItem('nextgen_blogs')
      return blogs ? JSON.parse(blogs) : []
    } catch (error) {
      console.error('Failed to fetch blogs from localStorage:', error)
      return []
    }
  }

  static async saveBlog(blog: Omit<BlogPost, 'id'> | BlogPost): Promise<BlogPost | null> {
    try {
      if (typeof window === 'undefined') return null
      const blogs = await this.getBlogs()
      
      if ('id' in blog) {
        // Update existing blog
        const index = blogs.findIndex(b => b.id === blog.id)
        if (index !== -1) {
          blogs[index] = { ...blog }
        }
      } else {
        // Create new blog
        const newBlog: BlogPost = {
          ...blog,
          id: Date.now(),
          date: new Date().toISOString(),
          readTime: `${Math.ceil(blog.content.length / 200)} min read`,
          featured: blog.status === 'published'
        }
        blogs.push(newBlog)
      }
      
      localStorage.setItem('nextgen_blogs', JSON.stringify(blogs))
      return 'id' in blog ? blog : blogs[blogs.length - 1]
    } catch (error) {
      console.error('Failed to save blog to localStorage:', error)
      return null
    }
  }

  static async deleteBlog(id: number): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false
      const blogs = await this.getBlogs()
      const filteredBlogs = blogs.filter(b => b.id !== id)
      localStorage.setItem('nextgen_blogs', JSON.stringify(filteredBlogs))
      return true
    } catch (error) {
      console.error('Failed to delete blog from localStorage:', error)
      return false
    }
  }

  // FAQ management - LocalStorage
  static async getFAQs(): Promise<FAQ[]> {
    try {
      if (typeof window === 'undefined') return []
      const faqs = localStorage.getItem('nextgen_faqs')
      return faqs ? JSON.parse(faqs) : []
    } catch (error) {
      console.error('Failed to fetch FAQs from localStorage:', error)
      return []
    }
  }

  static async saveFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'> | FAQ): Promise<FAQ | null> {
    try {
      if (typeof window === 'undefined') return null
      const faqs = await this.getFAQs()
      const now = new Date().toISOString()
      
      if ('id' in faq) {
        // Update existing FAQ
        const index = faqs.findIndex(f => f.id === faq.id)
        if (index !== -1) {
          faqs[index] = { ...faq, updatedAt: now }
        }
      } else {
        // Create new FAQ
        const newFAQ: FAQ = {
          ...faq,
          id: Date.now(),
          createdAt: now,
          updatedAt: now
        }
        faqs.push(newFAQ)
      }
      
      localStorage.setItem('nextgen_faqs', JSON.stringify(faqs))
      return 'id' in faq ? faq : faqs[faqs.length - 1]
    } catch (error) {
      console.error('Failed to save FAQ to localStorage:', error)
      return null
    }
  }

  static async deleteFAQ(id: number): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false
      const faqs = await this.getFAQs()
      const filteredFAQs = faqs.filter(f => f.id !== id)
      localStorage.setItem('nextgen_faqs', JSON.stringify(filteredFAQs))
      return true
    } catch (error) {
      console.error('Failed to delete FAQ from localStorage:', error)
      return false
    }
  }

  // Image management - LocalStorage
  static async getImages(): Promise<ImageFile[]> {
    try {
      if (typeof window === 'undefined') return []
      const images = localStorage.getItem('nextgen_images')
      return images ? JSON.parse(images) : []
    } catch (error) {
      console.error('Failed to fetch images from localStorage:', error)
      return []
    }
  }

  static async uploadImage(file: File, category: string = 'general', alt: string = ''): Promise<ImageFile | null> {
    try {
      if (typeof window === 'undefined') return null
      
      // Convert file to base64 for localStorage
      const reader = new FileReader()
      return new Promise((resolve) => {
        reader.onload = async () => {
          const images = await this.getImages()
          const newImage: ImageFile = {
            id: Date.now(),
            name: file.name,
            url: reader.result as string,
            size: file.size,
            uploadDate: new Date().toISOString(),
            category,
            alt: alt || file.name,
            dimensions: '0x0'
          }
          images.push(newImage)
          localStorage.setItem('nextgen_images', JSON.stringify(images))
          resolve(newImage)
        }
        reader.readAsDataURL(file)
      })
    } catch (error) {
      console.error('Failed to upload image to localStorage:', error)
      return null
    }
  }

  static async deleteImage(id: number, path?: string): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false
      const images = await this.getImages()
      const filteredImages = images.filter(i => i.id !== id)
      localStorage.setItem('nextgen_images', JSON.stringify(filteredImages))
      return true
    } catch (error) {
      console.error('Failed to delete image from localStorage:', error)
      return false
    }
  }

  // Contact submissions management - LocalStorage
  static async getContactSubmissions(): Promise<ContactSubmission[]> {
    try {
      if (typeof window === 'undefined') return []
      const submissions = localStorage.getItem('nextgen_contacts')
      return submissions ? JSON.parse(submissions) : []
    } catch (error) {
      console.error('Failed to fetch contact submissions from localStorage:', error)
      return []
    }
  }

  static async saveContactSubmission(submission: Omit<ContactSubmission, 'id'> | ContactSubmission): Promise<ContactSubmission | null> {
    try {
      if (typeof window === 'undefined') return null
      const submissions = await this.getContactSubmissions()
      
      if ('id' in submission) {
        // Update existing submission
        const index = submissions.findIndex(s => s.id === submission.id)
        if (index !== -1) {
          submissions[index] = { ...submission }
        }
      } else {
        // Create new submission
        const newSubmission: ContactSubmission = {
          ...submission,
          id: Date.now(),
          timestamp: new Date().toISOString(),
          status: 'new'
        }
        submissions.push(newSubmission)
      }
      
      localStorage.setItem('nextgen_contacts', JSON.stringify(submissions))
      return 'id' in submission ? submission : submissions[submissions.length - 1]
    } catch (error) {
      console.error('Failed to save contact submission to localStorage:', error)
      return null
    }
  }

  static async deleteContactSubmission(id: number): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false
      const submissions = await this.getContactSubmissions()
      const filteredSubmissions = submissions.filter(s => s.id !== id)
      localStorage.setItem('nextgen_contacts', JSON.stringify(filteredSubmissions))
      return true
    } catch (error) {
      console.error('Failed to delete contact submission from localStorage:', error)
      return false
    }
  }

  // Client management - LocalStorage
  static async getClients(): Promise<Client[]> {
    try {
      if (typeof window === 'undefined') return []
      const clients = localStorage.getItem('nextgen_clients')
      return clients ? JSON.parse(clients) : []
    } catch (error) {
      console.error('Failed to fetch clients from localStorage:', error)
      return []
    }
  }

  static async saveClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> | Client): Promise<Client | null> {
    try {
      if (typeof window === 'undefined') return null
      const clients = await this.getClients()
      const now = new Date().toISOString()
      
      if ('id' in client) {
        // Update existing client
        const index = clients.findIndex(c => c.id === client.id)
        if (index !== -1) {
          clients[index] = { ...client, updatedAt: now }
        }
      } else {
        // Create new client
        const newClient: Client = {
          ...client,
          id: Date.now(),
          createdAt: now,
          updatedAt: now
        }
        clients.push(newClient)
      }
      
      localStorage.setItem('nextgen_clients', JSON.stringify(clients))
      return 'id' in client ? client : clients[clients.length - 1]
    } catch (error) {
      console.error('Failed to save client to localStorage:', error)
      return null
    }
  }

  static async deleteClient(id: number): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false
      const clients = await this.getClients()
      const filteredClients = clients.filter(c => c.id !== id)
      localStorage.setItem('nextgen_clients', JSON.stringify(filteredClients))
      return true
    } catch (error) {
      console.error('Failed to delete client from localStorage:', error)
      return false
    }
  }

  // Initialize data - LocalStorage
  static async initializeData(): Promise<void> {
    try {
      // Initialize with sample data if empty
      if (typeof window === 'undefined') return
      
      const blogs = await this.getBlogs()
      const faqs = await this.getFAQs()
      
      if (blogs.length === 0) {
        // Add sample blog
        await this.saveBlog({
          title: 'Welcome to NextGen Registry',
          slug: 'welcome-to-nextgen-registry',
          excerpt: 'Learn about our comprehensive RTA services and how we can help your company.',
          content: 'NextGen Registry is your trusted partner for all RTA services including ISIN creation, demat services, corporate actions, and e-voting solutions.',
          status: 'published',
          author: 'Admin',
          publishDate: new Date().toISOString().split('T')[0],
          category: 'General',
          views: 0,
          tags: ['welcome', 'services']
        })
      }
      
      if (faqs.length === 0) {
        // Add sample FAQ
        await this.saveFAQ({
          question: 'What services does NextGen Registry provide?',
          answer: 'We provide comprehensive RTA services including ISIN creation, demat services, corporate actions management, and e-voting solutions.',
          category: 'General',
          order: 1,
          isActive: true
        })
      }
    } catch (error) {
      console.error('Failed to initialize localStorage data:', error)
    }
  }

  // Newsletter subscriptions - LocalStorage implementation
  static async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    try {
      if (typeof window === 'undefined') return []
      const subscriptions = localStorage.getItem('nextgen_newsletter')
      return subscriptions ? JSON.parse(subscriptions) : []
    } catch (error) {
      console.error('Failed to fetch newsletter subscriptions from localStorage:', error)
      return []
    }
  }

  static async saveNewsletterSubscription(subscription: Omit<NewsletterSubscription, 'id'> | NewsletterSubscription): Promise<NewsletterSubscription | null> {
    try {
      if (typeof window === 'undefined') return null
      const subscriptions = await this.getNewsletterSubscriptions()
      
      if ('id' in subscription) {
        // Update existing subscription
        const index = subscriptions.findIndex(s => s.id === subscription.id)
        if (index !== -1) {
          subscriptions[index] = { ...subscription }
        }
      } else {
        // Create new subscription
        const newSubscription: NewsletterSubscription = {
          ...subscription,
          id: Date.now(),
          timestamp: new Date().toISOString(),
          status: 'active'
        }
        subscriptions.push(newSubscription)
      }
      
      localStorage.setItem('nextgen_newsletter', JSON.stringify(subscriptions))
      return 'id' in subscription ? subscription : subscriptions[subscriptions.length - 1]
    } catch (error) {
      console.error('Failed to save newsletter subscription to localStorage:', error)
      return null
    }
  }

  static async deleteNewsletterSubscription(id: number): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false
      const subscriptions = await this.getNewsletterSubscriptions()
      const filteredSubscriptions = subscriptions.filter(s => s.id !== id)
      localStorage.setItem('nextgen_newsletter', JSON.stringify(filteredSubscriptions))
      return true
    } catch (error) {
      console.error('Failed to delete newsletter subscription from localStorage:', error)
      return false
    }
  }
}
