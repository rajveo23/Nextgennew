import { supabase, supabaseAdmin, isSupabaseConfigured, Client, BlogPost, FAQ, ContactSubmission, NewsletterSubscription } from './supabase'

// Temporarily use supabase (anon key) instead of supabaseAdmin (service role) for all operations
const db = supabase

export class DatabaseService {
  
  // Check if Supabase is configured before operations
  private static checkConfiguration() {
    if (!isSupabaseConfigured()) {
      console.error('Supabase Configuration Check Failed:')
      console.error('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing')
      console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing')
      console.error('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing')
      throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY environment variables.')
    }
  }
  // Client operations
  static async getClients(): Promise<Client[]> {
    this.checkConfiguration()
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('is_active', true)
      .order('serial_number')

    if (error) throw error
    return data || []
  }

  static async createClient(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('clients')
      .insert(client)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('clients')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteClient(id: string): Promise<void> {
    this.checkConfiguration()
    const { error } = await db
      .from('clients')
      .update({ is_active: false })
      .eq('id', id)

    if (error) throw error
  }

  // Blog operations
  static async getBlogPosts(): Promise<BlogPost[]> {
    this.checkConfiguration()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async getAllBlogPosts(): Promise<BlogPost[]> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async getBlogPost(slug: string): Promise<BlogPost | null> {
    this.checkConfiguration()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) return null
    return data
  }

  static async getBlogPostById(id: string): Promise<BlogPost | null> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data
  }

  static async createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('blog_posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteBlogPost(id: string): Promise<void> {
    this.checkConfiguration()
    const { error } = await db
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // FAQ operations
  static async getFAQs(): Promise<FAQ[]> {
    this.checkConfiguration()
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async getAllFAQs(): Promise<FAQ[]> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('faqs')
      .select('*')
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async createFAQ(faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): Promise<FAQ> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('faqs')
      .insert(faq)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateFAQ(id: string, updates: Partial<FAQ>): Promise<FAQ> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('faqs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteFAQ(id: string): Promise<void> {
    this.checkConfiguration()
    const { error } = await db
      .from('faqs')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Contact operations
  static async createContactSubmission(submission: {
    name: string
    email: string
    phone?: string
    company?: string
    service?: string
    message: string
    source?: string
    newsletter?: boolean
  }): Promise<void> {
    this.checkConfiguration()
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        ...submission,
        status: 'new',
        source: submission.source || 'website'
      })

    if (error) throw error
  }

  static async getContactSubmissions(): Promise<ContactSubmission[]> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async updateContactSubmission(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const { data, error } = await db
      .from('contact_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteContactSubmission(id: string): Promise<void> {
    const { error } = await db
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Newsletter operations
  static async subscribeToNewsletter(email: string, source: string = 'website'): Promise<void> {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert({ 
        email, 
        source,
        is_active: true 
      })

    if (error) throw error
  }

  static async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    const { data, error } = await db
      .from('newsletter_subscriptions')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async updateNewsletterSubscription(id: string, updates: Partial<NewsletterSubscription>): Promise<NewsletterSubscription> {
    const { data, error } = await db
      .from('newsletter_subscriptions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async unsubscribeFromNewsletter(email: string): Promise<void> {
    const { error } = await db
      .from('newsletter_subscriptions')
      .update({ is_active: false })
      .eq('email', email)

    if (error) throw error
  }

  // Initialize data (for migration purposes)
  static async initializeData(): Promise<boolean> {
    try {
      // This can be used to seed initial data if needed
      console.log('Database initialized successfully')
      return true
    } catch (error) {
      console.error('Error initializing database:', error)
      return false
    }
  }
}
