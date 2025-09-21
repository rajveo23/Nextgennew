// Simple data management for admin panel
// In production, this would be replaced with a proper database

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

// Initial data
const initialBlogs: BlogPost[] = [
  {
    id: 1,
    title: 'MCA Rule 9A: A Breakdown for Private Companies',
    slug: 'mca-rule-9a-breakdown-for-private-companies',
    excerpt: 'Prior to the enforcement of Rule 9A by the Ministry of Corporate Affairs (MCA), dematerialization of shares was merely an optional process for private companies.',
    content: 'Prior to the enforcement of Rule 9A by the Ministry of Corporate Affairs (MCA), dematerialization of shares was merely an optional process for private companies. It was only a mandatory requirement for listed companies and select large companies. However, with the introduction of Rule 9A, the landscape has changed significantly.',
    status: 'published',
    author: 'Admin',
    publishDate: '2024-01-15',
    category: 'Regulatory Updates',
    views: 1250,
    image: '/api/placeholder/800/400',
    tags: ['MCA', 'Rule 9A', 'Dematerialization', 'Private Companies']
  },
  {
    id: 2,
    title: 'Get Expert Tips & Updates On How To Get ISIN For Private Company',
    slug: 'get-expert-tips-updates-on-how-to-get-isin-for-private-company',
    excerpt: 'NextGen Registry provides the best insight on how to get an ISIN for a Private Company. The NextGen Registry blog offers expert tips and keeps you updated.',
    content: 'Getting an ISIN for a private company is a crucial step in the dematerialization process. This comprehensive guide will walk you through the entire process, requirements, and best practices.',
    status: 'published',
    author: 'Admin',
    publishDate: '2024-01-10',
    category: 'ISIN Services',
    views: 890,
    image: '/api/placeholder/800/400',
    tags: ['ISIN', 'Private Company', 'Dematerialization']
  }
]

const initialFAQs: FAQ[] = [
  {
    id: 1,
    question: 'What is ISIN and why do I need it?',
    answer: 'ISIN (International Securities Identification Number) is a unique 12-character alphanumeric code that identifies a security. It is required for all securities that are traded or held in dematerialized form.',
    category: 'ISIN Services',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 2,
    question: 'How long does the ISIN creation process take?',
    answer: 'The ISIN creation process typically takes 7-10 working days from the date of submission of complete documents, subject to regulatory approvals.',
    category: 'ISIN Services',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

const initialImages: ImageFile[] = [
  {
    id: 1,
    name: 'hero-banner-1.jpg',
    url: '/api/placeholder/800/400',
    size: 245000,
    uploadDate: '2024-01-15',
    category: 'Banners',
    alt: 'NextGen Registry Hero Banner',
    dimensions: '1920x1080'
  },
  {
    id: 2,
    name: 'team-photo.jpg',
    url: '/api/placeholder/600/400',
    size: 180000,
    uploadDate: '2024-01-12',
    category: 'Team',
    alt: 'NextGen Registry Team Photo',
    dimensions: '1200x800'
  }
]

const initialClients: Client[] = [
  {
    id: 1,
    serialNumber: 1563,
    issuerClientCompanyName: 'TIME TODAY MEDIA NETWORK PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE263B04014',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 2,
    serialNumber: 1562,
    issuerClientCompanyName: 'SHRIJI POWER & AUTOMATION PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5ARVY01014',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 3,
    serialNumber: 1561,
    issuerClientCompanyName: 'TEEYRA EDUTECH PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5NKMJ012',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 4,
    serialNumber: 1560,
    issuerClientCompanyName: 'FELIX HEALTHCARE PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5LL901011',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 5,
    serialNumber: 1559,
    issuerClientCompanyName: 'MYLO HEALTHCARE PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5KCZ01016',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 6,
    serialNumber: 1558,
    issuerClientCompanyName: 'KILPI TECHNOLOGY AND SERVICES PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE1KGA01014',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 7,
    serialNumber: 1557,
    issuerClientCompanyName: 'Parasrampuria Synthetics Ltd. PARASRAMPURIA',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE597AD1017',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 8,
    serialNumber: 1556,
    issuerClientCompanyName: 'EASY HOME SOLUTIONS PRIVATE LIMITED EO',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE526UL01014',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 9,
    serialNumber: 1555,
    issuerClientCompanyName: 'FLIPSCORE INDIA PRIVATE LIMITED EO',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5FO501013',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 10,
    serialNumber: 1554,
    issuerClientCompanyName: 'AVR GOA PROMOTERS PRIVATE LIMITED EO',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5FFR01018',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  }
]

import { AdminDataManagerCloud } from './adminDataCloud'

// Hybrid data management functions - uses cloud storage with localStorage fallback
export class AdminDataManager {
  // Blog management - Cloud only
  static async getBlogs(): Promise<BlogPost[]> {
    try {
      return await AdminDataManagerCloud.getBlogs()
    } catch (error) {
      console.error('Failed to fetch blogs from cloud:', error)
      throw new Error('Unable to fetch blogs. Please check your internet connection.')
    }
  }

  static async saveBlog(blog: Omit<BlogPost, 'id'> | BlogPost): Promise<BlogPost | null> {
    try {
      return await AdminDataManagerCloud.saveBlog(blog)
    } catch (error) {
      console.error('Failed to save blog to cloud:', error)
      throw new Error('Unable to save blog. Please check your internet connection.')
    }
  }

  static async deleteBlog(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerCloud.deleteBlog(id)
    } catch (error) {
      console.error('Failed to delete blog from cloud:', error)
      throw new Error('Unable to delete blog. Please check your internet connection.')
    }
  }

  // FAQ management - Cloud only
  static async getFAQs(): Promise<FAQ[]> {
    try {
      return await AdminDataManagerCloud.getFAQs()
    } catch (error) {
      console.error('Failed to fetch FAQs from cloud:', error)
      throw new Error('Unable to fetch FAQs. Please check your internet connection.')
    }
  }

  static async saveFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'> | FAQ): Promise<FAQ | null> {
    try {
      return await AdminDataManagerCloud.saveFAQ(faq)
    } catch (error) {
      console.error('Failed to save FAQ to cloud:', error)
      throw new Error('Unable to save FAQ. Please check your internet connection.')
    }
  }

  static async deleteFAQ(id: number): Promise<boolean> {
    try {
      return await AdminDataManagerCloud.deleteFAQ(id)
    } catch (error) {
      console.error('Failed to delete FAQ from cloud:', error)
      throw new Error('Unable to delete FAQ. Please check your internet connection.')
    }
  }

  // Image management
  static async getImages(): Promise<ImageFile[]> {
    if (await this.checkCloudStorage()) {
      return await AdminDataManagerCloud.getImages()
    }
    
    // Fallback to localStorage
    if (typeof window === 'undefined') return initialImages
    const stored = localStorage.getItem(this.STORAGE_KEYS.IMAGES)
    return stored ? JSON.parse(stored) : initialImages
  }

  static async saveImage(image: Omit<ImageFile, 'id'> | ImageFile): Promise<ImageFile | null> {
    if (await this.checkCloudStorage()) {
      // For cloud storage, use the upload API instead
      return null // This method is not used for cloud storage
    }
    
    // Fallback to localStorage
    const images = await this.getImages()
    
    if ('id' in image) {
      // Update existing image
      const index = images.findIndex(i => i.id === image.id)
      if (index !== -1) {
        images[index] = image
      }
      this.saveImages(images)
      return image
    } else {
      // Create new image
      const newImage: ImageFile = {
        ...image,
        id: Math.max(...images.map(i => i.id), 0) + 1
      }
      images.push(newImage)
      this.saveImages(images)
      return newImage
    }
  }

  static async deleteImage(id: number): Promise<boolean> {
    if (await this.checkCloudStorage()) {
      return await AdminDataManagerCloud.deleteImage(id)
    }
    
    // Fallback to localStorage
    const images = await this.getImages()
    const filteredImages = images.filter(i => i.id !== id)
    this.saveImages(filteredImages)
    return true
  }

  private static saveImages(images: ImageFile[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEYS.IMAGES, JSON.stringify(images))
    }
  }

  // Contact submissions management
  static async getContactSubmissions(): Promise<ContactSubmission[]> {
    if (await this.checkCloudStorage()) {
      return await AdminDataManagerCloud.getContactSubmissions()
    }
    
    // Fallback to localStorage
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.CONTACTS)
    return stored ? JSON.parse(stored) : []
  }

  static async saveContactSubmission(submission: Omit<ContactSubmission, 'id'> | ContactSubmission): Promise<ContactSubmission | null> {
    if (await this.checkCloudStorage()) {
      return await AdminDataManagerCloud.saveContactSubmission(submission)
    }
    
    // Fallback to localStorage
    const submissions = await this.getContactSubmissions()
    
    if ('id' in submission) {
      // Update existing submission
      const index = submissions.findIndex(s => s.id === submission.id)
      if (index !== -1) {
        submissions[index] = submission
      }
      this.saveContactSubmissions(submissions)
      return submission
    } else {
      // Create new submission
      const newSubmission: ContactSubmission = {
        ...submission,
        id: Math.max(...submissions.map(s => s.id), 0) + 1
      }
      submissions.push(newSubmission)
      this.saveContactSubmissions(submissions)
      return newSubmission
    }
  }

  static async deleteContactSubmission(id: number): Promise<boolean> {
    if (await this.checkCloudStorage()) {
      return await AdminDataManagerCloud.deleteContactSubmission(id)
    }
    
    // Fallback to localStorage
    const submissions = await this.getContactSubmissions()
    const filteredSubmissions = submissions.filter(s => s.id !== id)
    this.saveContactSubmissions(filteredSubmissions)
    return true
  }

  private static saveContactSubmissions(submissions: ContactSubmission[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEYS.CONTACTS, JSON.stringify(submissions))
    }
  }

  // Client management
  static async getClients(): Promise<Client[]> {
    if (await this.checkCloudStorage()) {
      return await AdminDataManagerCloud.getClients()
    }
    
    // Fallback to localStorage
    if (typeof window === 'undefined') return initialClients
    const stored = localStorage.getItem(this.STORAGE_KEYS.CLIENTS)
    return stored ? JSON.parse(stored) : initialClients
  }

  static async saveClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> | Client): Promise<Client | null> {
    if (await this.checkCloudStorage()) {
      return await AdminDataManagerCloud.saveClient(client)
    }
    
    // Fallback to localStorage
    const clients = await this.getClients()
    const now = new Date().toISOString()
    
    if ('id' in client) {
      // Update existing client
      const index = clients.findIndex(c => c.id === client.id)
      if (index !== -1) {
        clients[index] = { ...client, updatedAt: now }
      }
      this.saveClients(clients)
      return clients[index]
    } else {
      // Create new client
      const newClient: Client = {
        ...client,
        id: Math.max(...clients.map(c => c.id), 0) + 1,
        createdAt: now,
        updatedAt: now
      }
      clients.push(newClient)
      this.saveClients(clients)
      return newClient
    }
  }

  static async deleteClient(id: number): Promise<boolean> {
    if (await this.checkCloudStorage()) {
      return await AdminDataManagerCloud.deleteClient(id)
    }
    
    // Fallback to localStorage
    const clients = await this.getClients()
    const filteredClients = clients.filter(c => c.id !== id)
    this.saveClients(filteredClients)
    return true
  }

  private static saveClients(clients: Client[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEYS.CLIENTS, JSON.stringify(clients))
    }
  }

  // Newsletter management
  static getNewsletterSubscriptions(): NewsletterSubscription[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.NEWSLETTERS)
    return stored ? JSON.parse(stored) : []
  }

  static saveNewsletterSubscription(subscription: Omit<NewsletterSubscription, 'id'> | NewsletterSubscription): NewsletterSubscription {
    const subscriptions = this.getNewsletterSubscriptions()
    
    if ('id' in subscription) {
      // Update existing subscription
      const index = subscriptions.findIndex(s => s.id === subscription.id)
      if (index !== -1) {
        subscriptions[index] = subscription
      }
      this.saveNewsletterSubscriptions(subscriptions)
      return subscription
    } else {
      // Check if email already exists
      const existingSubscription = subscriptions.find(s => s.email === subscription.email)
      if (existingSubscription) {
        return existingSubscription
      }
      
      // Create new subscription
      const newSubscription: NewsletterSubscription = {
        ...subscription,
        id: Math.max(...subscriptions.map(s => s.id), 0) + 1
      }
      subscriptions.push(newSubscription)
      this.saveNewsletterSubscriptions(subscriptions)
      return newSubscription
    }
  }

  static deleteNewsletterSubscription(id: number): boolean {
    const subscriptions = this.getNewsletterSubscriptions()
    const filteredSubscriptions = subscriptions.filter(s => s.id !== id)
    this.saveNewsletterSubscriptions(filteredSubscriptions)
    return true
  }

  private static saveNewsletterSubscriptions(subscriptions: NewsletterSubscription[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEYS.NEWSLETTERS, JSON.stringify(subscriptions))
    }
  }

  // Initialize data if not exists
  static async initializeData(): Promise<void> {
    if (await this.checkCloudStorage()) {
      await AdminDataManagerCloud.initializeData()
      return
    }
    
    // Fallback to localStorage initialization
    if (typeof window === 'undefined') return
    
    if (!localStorage.getItem(this.STORAGE_KEYS.BLOGS)) {
      this.saveBlogs(initialBlogs)
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.FAQS)) {
      this.saveFAQs(initialFAQs)
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.IMAGES)) {
      this.saveImages(initialImages)
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.CONTACTS)) {
      this.saveContactSubmissions([])
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.CLIENTS)) {
      this.saveClients(initialClients)
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.NEWSLETTERS)) {
      this.saveNewsletterSubscriptions([])
    }
  }
}
