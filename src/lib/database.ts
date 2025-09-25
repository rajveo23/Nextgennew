import { supabase, supabaseAdmin, isSupabaseConfigured, Client, BlogPost, FAQ, ContactSubmission, NewsletterSubscription } from './supabase'

// Supabase Storage bucket name for forms
const FORMS_BUCKET = 'forms'

// Form management types
export interface FormCategory {
  id: string
  title: string
  description: string
  icon_name: string
  color_gradient: string
  order_index: number
  is_important_document: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Form {
  id: string
  category_id: string
  name: string
  file_type: string
  file_size: string
  file_url?: string
  file_path?: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ClientLogo {
  id: string
  company_name: string
  company_subtitle?: string
  logo_url?: string
  logo_path?: string
  website_url?: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Use supabaseAdmin for server-side operations, supabase for client-side
const db = supabaseAdmin || supabase

export class DatabaseService {
  
  // Check if Supabase is configured before operations
  private static checkConfiguration() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Please check environment variables.')
    }
    if (!db) {
      throw new Error('Database client is not available')
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

  // Form Category operations
  static async getFormCategories(): Promise<FormCategory[]> {
    this.checkConfiguration()
    const { data, error } = await supabase
      .from('form_categories')
      .select('*')
      .eq('is_active', true)
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async getAllFormCategories(): Promise<FormCategory[]> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('form_categories')
      .select('*')
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async createFormCategory(category: Omit<FormCategory, 'id' | 'created_at' | 'updated_at'>): Promise<FormCategory> {
    this.checkConfiguration()
    
    
    const { data, error } = await db
      .from('form_categories')
      .insert(category)
      .select()
      .single()

    if (error) {
      console.error('Database error creating form category:', error)
      throw new Error(`Failed to create form category: ${error.message}`)
    }
    
    return data
  }

  static async updateFormCategory(id: string, updates: Partial<FormCategory>): Promise<FormCategory> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('form_categories')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteFormCategory(id: string): Promise<void> {
    this.checkConfiguration()
    
    // First get all forms in this category and delete them
    const { data: forms, error: formsError } = await db
      .from('forms')
      .select('id, file_path')
      .eq('category_id', id)
      .eq('is_active', true)

    if (formsError) throw formsError

    // Delete all forms in this category
    if (forms && forms.length > 0) {
      for (const form of forms) {
        try {
          await this.deleteForm(form.id)
        } catch (error) {
          console.warn(`Failed to delete form ${form.id}:`, error)
        }
      }
    }

    // Soft delete the category
    const { error } = await db
      .from('form_categories')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
    
  }

  // Form operations
  static async getForms(): Promise<Form[]> {
    this.checkConfiguration()
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('is_active', true)
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async getFormsByCategory(categoryId: string): Promise<Form[]> {
    this.checkConfiguration()
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async getAllForms(): Promise<Form[]> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('forms')
      .select('*')
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async createForm(form: Omit<Form, 'id' | 'created_at' | 'updated_at'>): Promise<Form> {
    this.checkConfiguration()
    
    
    const { data, error } = await db
      .from('forms')
      .insert(form)
      .select()
      .single()

    if (error) {
      console.error('Database error creating form:', error)
      throw new Error(`Failed to create form: ${error.message}`)
    }
    
    return data
  }

  static async updateForm(id: string, updates: Partial<Form>): Promise<Form> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('forms')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteForm(id: string): Promise<void> {
    this.checkConfiguration()
    
    // First get the form to check if it has a file to delete
    const { data: form, error: fetchError } = await db
      .from('forms')
      .select('file_path')
      .eq('id', id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "not found"
      throw fetchError
    }

    // Delete the file from storage if it exists
    if (form?.file_path) {
      try {
        await this.deleteFormFile(form.file_path)
      } catch (fileError) {
        console.warn('Could not delete file from storage:', fileError)
        // Continue with database deletion even if file deletion fails
      }
    }

    // Soft delete the form (set is_active to false)
    const { error } = await db
      .from('forms')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
    
  }

  // Get form categories with their forms
  static async getFormCategoriesWithForms(): Promise<(FormCategory & { forms: Form[] })[]> {
    this.checkConfiguration()
    const { data: categories, error: categoriesError } = await supabase
      .from('form_categories')
      .select('*')
      .eq('is_active', true)
      .order('order_index')

    if (categoriesError) throw categoriesError

    const categoriesWithForms = await Promise.all(
      (categories || []).map(async (category: FormCategory) => {
        const { data: forms, error: formsError } = await supabase
          .from('forms')
          .select('*')
          .eq('category_id', category.id)
          .eq('is_active', true)
          .order('order_index')

        if (formsError) throw formsError

        return {
          ...category,
          forms: forms || []
        }
      })
    )

    return categoriesWithForms
  }

  // Client Logo operations
  static async getClientLogos(): Promise<ClientLogo[]> {
    this.checkConfiguration()
    const { data, error } = await supabase
      .from('client_logos')
      .select('*')
      .eq('is_active', true)
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async getAllClientLogos(): Promise<ClientLogo[]> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('client_logos')
      .select('*')
      .order('order_index')

    if (error) throw error
    return data || []
  }

  static async createClientLogo(logo: Omit<ClientLogo, 'id' | 'created_at' | 'updated_at'>): Promise<ClientLogo> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('client_logos')
      .insert({
        ...logo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateClientLogo(id: string, updates: Partial<Omit<ClientLogo, 'id' | 'created_at'>>): Promise<ClientLogo> {
    this.checkConfiguration()
    const { data, error } = await db
      .from('client_logos')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteClientLogo(id: string): Promise<void> {
    this.checkConfiguration()
    
    // First get the logo to check if it has a file to delete
    const { data: logo } = await db
      .from('client_logos')
      .select('logo_path')
      .eq('id', id)
      .single()

    // Delete the logo record
    const { error } = await db
      .from('client_logos')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Delete the logo file if it exists
    if (logo?.logo_path) {
      await this.deleteFormFile(logo.logo_path)
    }
  }

  // File upload to Supabase Storage
  static async uploadFormFile(file: File, fileName: string): Promise<{ url: string; path: string } | null> {
    this.checkConfiguration()
    try {
      // Use supabaseAdmin for file uploads to avoid RLS issues
      const { data, error } = await supabaseAdmin.storage
        .from(FORMS_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Upload error:', error)
        // If bucket doesn't exist, try to create it
        if (error.message?.includes('Bucket not found')) {
          await this.initializeData()
          // Retry upload
          const { data: retryData, error: retryError } = await supabaseAdmin.storage
            .from(FORMS_BUCKET)
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            })
          
          if (retryError) {
            console.error('Retry upload error:', retryError)
            return null
          }
          
          // Get public URL for retry
          const { data: retryUrlData } = supabaseAdmin.storage
            .from(FORMS_BUCKET)
            .getPublicUrl(fileName)

          return {
            url: retryUrlData.publicUrl,
            path: retryData.path
          }
        }
        return null
      }

      // Get public URL
      const { data: urlData } = supabaseAdmin.storage
        .from(FORMS_BUCKET)
        .getPublicUrl(fileName)

      return {
        url: urlData.publicUrl,
        path: data.path
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      return null
    }
  }

  // Delete file from Supabase Storage
  static async deleteFormFile(filePath: string): Promise<boolean> {
    this.checkConfiguration()
    try {
      // Use supabaseAdmin for file deletion to avoid RLS issues
      const { error } = await supabaseAdmin.storage
        .from(FORMS_BUCKET)
        .remove([filePath])

      if (error) {
        console.error('Delete file error:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting file:', error)
      return false
    }
  }

  // Initialize data and create storage bucket if needed
  static async initializeData(): Promise<boolean> {
    try {
      if (!supabaseAdmin) {
        console.warn('Supabase admin client not available')
        return false
      }

      // Check if forms bucket exists, create if not
      const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets()
      
      if (bucketsError) {
        console.error('Error listing buckets:', bucketsError)
        return false
      }

      const formsBucket = buckets?.find((bucket: any) => bucket.name === FORMS_BUCKET)
      
      if (!formsBucket) {
        const { error: createError } = await supabaseAdmin.storage.createBucket(FORMS_BUCKET, {
          public: true,
          allowedMimeTypes: [
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/zip',
            'application/x-zip-compressed'
          ]
        })
        
        if (createError) {
          console.error('Error creating bucket:', createError)
          return false
        }
        
      } else {
      }

      return true
    } catch (error) {
      console.error('Error initializing database:', error)
      return false
    }
  }
}
