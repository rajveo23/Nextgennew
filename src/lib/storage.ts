import { supabase, supabaseAdmin, isSupabaseConfigured, FileUpload } from './supabase'

export class StorageService {
  // Upload file to Supabase Storage
  static async uploadFile(
    bucket: string,
    file: File,
    path?: string
  ): Promise<{ url: string; path: string }> {
    const fileName = path || `${Date.now()}-${file.name}`
    
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // If Supabase is not configured, return a placeholder URL
    if (!isSupabaseConfigured()) {
      return {
        url: 'https://via.placeholder.com/150',
        path: fileName
      }
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(fileName)

    // Record file upload in database
    await supabaseAdmin
      .from('file_uploads')
      .insert({
        filename: file.name,
        file_path: fileName,
        file_size: file.size,
        mime_type: file.type
      })

    return {
      url: publicUrl,
      path: fileName
    }
  }

  // Delete file from Supabase Storage
  static async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([path])

    if (error) throw error

    // Remove from database
    await supabaseAdmin
      .from('file_uploads')
      .delete()
      .eq('file_path', path)
  }

  // Get public URL for file
  static getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  }

  // List files in bucket
  static async listFiles(bucket: string, folder?: string): Promise<FileUpload[]> {
    const { data, error } = await supabaseAdmin
      .from('file_uploads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Upload blog image
  static async uploadBlogImage(file: File): Promise<{ url: string; path: string }> {
    return this.uploadFile('blog-images', file, `blog/${Date.now()}-${file.name}`)
  }

  // Upload company asset
  static async uploadCompanyAsset(file: File): Promise<{ url: string; path: string }> {
    return this.uploadFile('company-assets', file, `assets/${Date.now()}-${file.name}`)
  }

  // Upload client document (private)
  static async uploadClientDocument(file: File): Promise<{ url: string; path: string }> {
    return this.uploadFile('client-documents', file, `documents/${Date.now()}-${file.name}`)
  }

  // Get all images for admin panel
  static async getImages(): Promise<FileUpload[]> {
    return this.listFiles('company-assets')
  }

  // Delete image by path
  static async deleteImage(path: string): Promise<boolean> {
    try {
      // Determine bucket from path
      let bucket = 'company-assets'
      if (path.includes('blog/')) bucket = 'blog-images'
      if (path.includes('documents/')) bucket = 'client-documents'

      await this.deleteFile(bucket, path)
      return true
    } catch (error) {
      console.error('Error deleting image:', error)
      return false
    }
  }
}
