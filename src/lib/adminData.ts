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

// Data management functions
export class AdminDataManager {
  private static STORAGE_KEYS = {
    BLOGS: 'admin_blogs',
    FAQS: 'admin_faqs',
    IMAGES: 'admin_images',
    CONTACTS: 'admin_contacts',
    CLIENTS: 'admin_clients',
    NEWSLETTERS: 'admin_newsletters'
  }

  // Blog management
  static getBlogs(): BlogPost[] {
    if (typeof window === 'undefined') return initialBlogs
    const stored = localStorage.getItem(this.STORAGE_KEYS.BLOGS)
    return stored ? JSON.parse(stored) : initialBlogs
  }

  static saveBlog(blog: Omit<BlogPost, 'id'> | BlogPost): BlogPost {
    const blogs = this.getBlogs()
    
    if ('id' in blog) {
      // Update existing blog
      const index = blogs.findIndex(b => b.id === blog.id)
      if (index !== -1) {
        blogs[index] = blog
      }
      this.saveBlogs(blogs)
      return blog
    } else {
      // Create new blog
      const newBlog: BlogPost = {
        ...blog,
        id: Math.max(...blogs.map(b => b.id), 0) + 1,
        views: 0
      }
      blogs.push(newBlog)
      this.saveBlogs(blogs)
      return newBlog
    }
  }

  static deleteBlog(id: number): boolean {
    const blogs = this.getBlogs()
    const filteredBlogs = blogs.filter(b => b.id !== id)
    this.saveBlogs(filteredBlogs)
    return true
  }

  private static saveBlogs(blogs: BlogPost[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEYS.BLOGS, JSON.stringify(blogs))
    }
  }

  // FAQ management
  static getFAQs(): FAQ[] {
    if (typeof window === 'undefined') return initialFAQs
    const stored = localStorage.getItem(this.STORAGE_KEYS.FAQS)
    return stored ? JSON.parse(stored) : initialFAQs
  }

  static saveFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'> | FAQ): FAQ {
    const faqs = this.getFAQs()
    const now = new Date().toISOString()
    
    if ('id' in faq) {
      // Update existing FAQ
      const index = faqs.findIndex(f => f.id === faq.id)
      if (index !== -1) {
        faqs[index] = { ...faq, updatedAt: now }
      }
      this.saveFAQs(faqs)
      return faqs[index]
    } else {
      // Create new FAQ
      const newFAQ: FAQ = {
        ...faq,
        id: Math.max(...faqs.map(f => f.id), 0) + 1,
        createdAt: now,
        updatedAt: now
      }
      faqs.push(newFAQ)
      this.saveFAQs(faqs)
      return newFAQ
    }
  }

  static deleteFAQ(id: number): boolean {
    const faqs = this.getFAQs()
    const filteredFAQs = faqs.filter(f => f.id !== id)
    this.saveFAQs(filteredFAQs)
    return true
  }

  private static saveFAQs(faqs: FAQ[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEYS.FAQS, JSON.stringify(faqs))
    }
  }

  // Image management
  static getImages(): ImageFile[] {
    if (typeof window === 'undefined') return initialImages
    const stored = localStorage.getItem(this.STORAGE_KEYS.IMAGES)
    return stored ? JSON.parse(stored) : initialImages
  }

  static saveImage(image: Omit<ImageFile, 'id'> | ImageFile): ImageFile {
    const images = this.getImages()
    
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

  static deleteImage(id: number): boolean {
    const images = this.getImages()
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
  static getContactSubmissions(): ContactSubmission[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.STORAGE_KEYS.CONTACTS)
    return stored ? JSON.parse(stored) : []
  }

  static saveContactSubmission(submission: Omit<ContactSubmission, 'id'> | ContactSubmission): ContactSubmission {
    const submissions = this.getContactSubmissions()
    
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

  static deleteContactSubmission(id: number): boolean {
    const submissions = this.getContactSubmissions()
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
  static getClients(): Client[] {
    if (typeof window === 'undefined') return initialClients
    const stored = localStorage.getItem(this.STORAGE_KEYS.CLIENTS)
    return stored ? JSON.parse(stored) : initialClients
  }

  static saveClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> | Client): Client {
    const clients = this.getClients()
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

  static deleteClient(id: number): boolean {
    const clients = this.getClients()
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
  static initializeData(): void {
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
