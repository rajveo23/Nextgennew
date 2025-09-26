'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
interface BlogPost {
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
}
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  TagIcon,
  XMarkIcon,
  PhotoIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline'

const categories = ['Regulatory Updates', 'ISIN Services', 'Compliance', 'Technology', 'Corporate Actions', 'Demat Services', 'E-Voting']
const statuses = ['published', 'draft', 'scheduled']

interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  status: 'published' | 'draft' | 'scheduled'
  image?: string
  imageFilename?: string
  tags: string[]
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: categories[0],
    status: 'draft',
    image: '',
    tags: []
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    // Load blogs from API
    const loadBlogs = async () => {
      try {
        const response = await fetch('/api/blogs')
        if (response.ok) {
          const blogsData = await response.json()
          setBlogs(blogsData)
        }
      } catch (error) {
        console.error('Error loading blogs:', error)
      }
    }
    loadBlogs()
  }, [])

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || blog.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blogs?id=${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          const blogsResponse = await fetch('/api/blogs')
          if (blogsResponse.ok) {
            const blogsData = await blogsResponse.json()
            setBlogs(blogsData)
          }
        }
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingBlog) {
        // Update existing blog
        const updatedBlog = {
          id: editingBlog.id,
          ...formData,
          slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          views: editingBlog.views || 0
        }
        
        const response = await fetch('/api/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBlog)
        })
        
        if (!response.ok) throw new Error('Failed to update blog')
        setEditingBlog(null)
      } else {
        // Create new blog
        const newBlog = {
          ...formData,
          slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          author: 'Admin',
          publishDate: new Date().toISOString().split('T')[0],
          views: 0
        }
        
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBlog)
        })
        
        if (!response.ok) throw new Error('Failed to create blog')
        setShowAddForm(false)
      }
      
      // Reset form and reload blogs
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: categories[0],
        status: 'draft',
        image: '',
        tags: []
      })
      
      // Reload blogs from API
      const blogsResponse = await fetch('/api/blogs')
      if (blogsResponse.ok) {
        const blogsData = await blogsResponse.json()
        setBlogs(blogsData)
      }
    } catch (error) {
      console.error('Error saving blog:', error)
      alert('Failed to save blog. Please try again.')
    }
  }

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      status: blog.status,
      image: blog.image || '',
      tags: blog.tags
    })
    setImagePreview(blog.image || '')
    setShowAddForm(true)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingBlog(null)
    setImagePreview('')
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: categories[0],
      status: 'draft',
      image: '',
      tags: []
    })
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    setUploadingImage(true)

    try {
      // Upload to server
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload/blog-image', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        // Set the uploaded image URL
        setImagePreview(result.url)
        setFormData(prev => ({ ...prev, image: result.url }))
        
        // Store filename for potential deletion
        setFormData(prev => ({ ...prev, imageFilename: result.filename }))
      } else {
        alert(result.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image')
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImage = async () => {
    // If there's a filename, delete the file from server
    if (formData.imageFilename) {
      try {
        await fetch(`/api/delete/blog-image?filename=${formData.imageFilename}`, {
          method: 'DELETE',
        })
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    }
    
    setImagePreview('')
    setFormData(prev => ({ ...prev, image: '', imageFilename: '' }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const allCategories = ['All', ...categories]
  const allStatuses = ['All', ...statuses]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create, edit, and manage your blog posts
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            New Blog Post
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
          >
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
          >
            <option value="All">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {blog.title}
                      </h3>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(blog.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <TagIcon className="h-4 w-4 mr-1" />
                        {blog.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(blog)}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog.id)}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <MagnifyingGlassIcon className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No blogs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Blog Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="auto-generated-from-title"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'published' | 'draft' | 'scheduled'})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                
                {/* Image Preview */}
                {(imagePreview || formData.image) && (
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview || formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                {/* Upload Options */}
                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploadingImage ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mr-2"></div>
                            <span className="text-sm text-gray-500">Uploading...</span>
                          </div>
                        ) : (
                          <>
                            <CloudArrowUpIcon className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>

                  {/* URL Input Alternative */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or enter image URL</span>
                    </div>
                  </div>
                  
                  <input
                    type="url"
                    value={formData.image && formData.image.startsWith('data:') ? '' : (formData.image || '')}
                    onChange={(e) => {
                      setFormData({...formData, image: e.target.value})
                      setImagePreview('')
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Brief description of the blog post"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </button>
                </div>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  {/* Formatting toolbar */}
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement
                        const start = textarea.selectionStart
                        const end = textarea.selectionEnd
                        const selectedText = textarea.value.substring(start, end)
                        const newText = textarea.value.substring(0, start) + `**${selectedText}**` + textarea.value.substring(end)
                        setFormData({...formData, content: newText})
                      }}
                      className="px-2 py-1 text-xs font-bold bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement
                        const start = textarea.selectionStart
                        const end = textarea.selectionEnd
                        const selectedText = textarea.value.substring(start, end)
                        const newText = textarea.value.substring(0, start) + `*${selectedText}*` + textarea.value.substring(end)
                        setFormData({...formData, content: newText})
                      }}
                      className="px-2 py-1 text-xs italic bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement
                        const start = textarea.selectionStart
                        const newText = textarea.value.substring(0, start) + '\n## ' + textarea.value.substring(start)
                        setFormData({...formData, content: newText})
                      }}
                      className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Heading"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement
                        const start = textarea.selectionStart
                        const newText = textarea.value.substring(0, start) + '\n- ' + textarea.value.substring(start)
                        setFormData({...formData, content: newText})
                      }}
                      className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="List"
                    >
                      List
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const textarea = document.getElementById('content') as HTMLTextAreaElement
                        const start = textarea.selectionStart
                        const end = textarea.selectionEnd
                        const selectedText = textarea.value.substring(start, end)
                        const newText = textarea.value.substring(0, start) + `[${selectedText}](url)` + textarea.value.substring(end)
                        setFormData({...formData, content: newText})
                      }}
                      className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Link"
                    >
                      Link
                    </button>
                  </div>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                    rows={15}
                    className="w-full px-3 py-2 border-0 focus:ring-0 resize-none"
                    placeholder="Write your blog content here... You can use Markdown formatting:

**Bold text**
*Italic text*
## Headings
- List items
[Link text](https://example.com)

Start writing your content..."
                  />
                </div>
                
                {/* Preview */}
                {showPreview && (
                  <div className="mt-4 border border-gray-300 rounded-md">
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                      <h4 className="text-sm font-medium text-gray-700">Preview</h4>
                    </div>
                    <div className="p-4 prose prose-sm max-w-none">
                      {formData.content ? (
                        <div 
                          className="space-y-4"
                          dangerouslySetInnerHTML={{ 
                            __html: formData.content
                              // Handle headings first
                              .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-900 mt-4 mb-2">$1</h3>')
                              .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h2>')
                              .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h1>')
                              // Handle bold and italic
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')
                              // Handle lists
                              .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-gray-700">$1</li>')
                              // Handle links
                              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-800 underline">$1</a>')
                              // Handle line breaks
                              .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed">')
                              .replace(/\n/g, '<br>')
                              // Wrap in paragraph tags
                              .replace(/^(.*)/, '<p class="text-gray-700 leading-relaxed">$1</p>')
                          }} 
                        />
                      ) : (
                        <p className="text-gray-500 italic">Start typing to see preview...</p>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-500">
                  <p>💡 Tips: Use the toolbar buttons above or type Markdown directly:</p>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <span>**text** for bold</span>
                    <span>*text* for italic</span>
                    <span>## for headings</span>
                    <span>- for lists</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-2">
                  {/* Tag display */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              const newTags = formData.tags.filter((_, i) => i !== index)
                              setFormData({...formData, tags: newTags})
                            }}
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-primary-600 hover:bg-primary-200 hover:text-primary-800"
                          >
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Tag input */}
                  <input
                    type="text"
                    id="tags"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        const newTag = input.value.trim()
                        if (newTag && !formData.tags.includes(newTag)) {
                          setFormData({...formData, tags: [...formData.tags, newTag]})
                          input.value = ''
                        }
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Type a tag and press Enter, or separate multiple tags with commas"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Separate tags with commas or press Enter</span>
                    <span>{formData.tags.length} tags</span>
                  </div>
                  
                  {/* Suggested tags */}
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-gray-500">Suggested:</span>
                    {['ISIN', 'RTA', 'Compliance', 'SEBI', 'Corporate Actions', 'Demat', 'E-Voting'].map(suggestedTag => (
                      !formData.tags.includes(suggestedTag) && (
                        <button
                          key={suggestedTag}
                          type="button"
                          onClick={() => {
                            if (!formData.tags.includes(suggestedTag)) {
                              setFormData({...formData, tags: [...formData.tags, suggestedTag]})
                            }
                          }}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          + {suggestedTag}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                >
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
