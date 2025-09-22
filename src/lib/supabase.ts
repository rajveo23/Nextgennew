import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NTE5MjgwMCwiZXhwIjoxOTYwNzY4ODAwfQ.placeholder'

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
         !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
         !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
}

// Only create clients if properly configured and in browser environment
let supabase: any = null
let supabaseAdmin: any = null

// Only initialize Supabase on the client side or when properly configured
if (typeof window !== 'undefined' || isSupabaseConfigured()) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  } catch (error) {
    console.warn('Supabase client creation failed:', error)
  }
}

export { supabase, supabaseAdmin, isSupabaseConfigured }

// Database types
export interface Client {
  id: string
  serial_number: number
  issuer_client_company_name: string
  type_of_security: string
  isin_of_the_company: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image_url?: string
  featured_image_path?: string
  author: string
  published: boolean
  status: 'published' | 'draft' | 'scheduled'
  publish_date?: string
  category?: string
  views: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  status: 'new' | 'read' | 'responded'
  source: string
  newsletter?: boolean
  created_at: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
  source: string
}

export interface FileUpload {
  id: string
  filename: string
  file_path: string
  file_size?: number
  mime_type?: string
  uploaded_by?: string
  created_at: string
}
