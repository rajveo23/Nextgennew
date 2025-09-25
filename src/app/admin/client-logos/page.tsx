'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  PhotoIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'

interface ClientLogo {
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

export default function ClientLogosAdmin() {
  const [logos, setLogos] = useState<ClientLogo[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLogo, setEditingLogo] = useState<ClientLogo | null>(null)
  const [uploading, setUploading] = useState(false)

  const [logoForm, setLogoForm] = useState({
    company_name: '',
    company_subtitle: '',
    logo_url: '',
    logo_path: '',
    website_url: '',
    order_index: 0,
    is_active: true
  })

  useEffect(() => {
    fetchLogos()
  }, [])

  const fetchLogos = async () => {
    try {
      const response = await fetch('/api/admin/client-logos', {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      })
      const data = await response.json()
      setLogos(data)
    } catch (error) {
      console.error('Error fetching logos:', error)
      alert('Failed to fetch client logos')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return

    // Validate file type - accept all common image formats
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp']
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, WebP, SVG, BMP)')
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('File size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setLogoForm(prev => ({
          ...prev,
          logo_url: result.fileUrl,
          logo_path: result.filePath
        }))
        alert('Logo uploaded successfully!')
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload logo')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingLogo 
        ? `/api/client-logos/${editingLogo.id}`
        : '/api/client-logos'
      
      const method = editingLogo ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logoForm)
      })

      if (response.ok) {
        await fetchLogos()
        setShowModal(false)
        resetForm()
        alert(editingLogo ? 'Logo updated successfully!' : 'Logo created successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to ${editingLogo ? 'update' : 'create'} logo: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error submitting logo:', error)
      alert('Failed to submit logo')
    }
  }

  const handleEdit = (logo: ClientLogo) => {
    setEditingLogo(logo)
    setLogoForm({
      company_name: logo.company_name,
      company_subtitle: logo.company_subtitle || '',
      logo_url: logo.logo_url || '',
      logo_path: logo.logo_path || '',
      website_url: logo.website_url || '',
      order_index: logo.order_index,
      is_active: logo.is_active
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this logo?')) return

    try {
      const response = await fetch(`/api/client-logos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchLogos()
        alert('Logo deleted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to delete logo: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting logo:', error)
      alert('Failed to delete logo')
    }
  }

  const toggleActive = async (logo: ClientLogo) => {
    try {
      const response = await fetch(`/api/client-logos/${logo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...logo,
          is_active: !logo.is_active
        })
      })

      if (response.ok) {
        await fetchLogos()
        alert(`Logo ${!logo.is_active ? 'activated' : 'deactivated'} successfully!`)
      } else {
        const error = await response.json()
        alert(`Failed to toggle logo status: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error toggling logo status:', error)
      alert('Failed to toggle logo status')
    }
  }

  const resetForm = () => {
    setLogoForm({
      company_name: '',
      company_subtitle: '',
      logo_url: '',
      logo_path: '',
      website_url: '',
      order_index: 0,
      is_active: true
    })
    setEditingLogo(null)
  }

  const handleModalClose = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Logo Management</h1>
          <p className="text-gray-600">Manage client logos displayed on the website</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Logo
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.id}
              className={`bg-white rounded-lg shadow-md p-4 border-2 ${
                logo.is_active ? 'border-green-200' : 'border-gray-200 opacity-60'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Order: {logo.order_index}
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => toggleActive(logo)}
                    className={`p-1 rounded ${
                      logo.is_active 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={logo.is_active ? 'Deactivate' : 'Activate'}
                  >
                    {logo.is_active ? (
                      <EyeIcon className="w-4 h-4" />
                    ) : (
                      <EyeSlashIcon className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(logo)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Edit"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(logo.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center h-20 bg-gray-50 rounded mb-3">
                {logo.logo_url ? (
                  <img 
                    src={logo.logo_url} 
                    alt={logo.company_name}
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{logo.company_name}</div>
                    {logo.company_subtitle && (
                      <div className="text-xs text-gray-500">{logo.company_subtitle}</div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900">{logo.company_name}</h3>
                {logo.company_subtitle && (
                  <p className="text-sm text-gray-500">{logo.company_subtitle}</p>
                )}
                {logo.website_url && (
                  <a 
                    href={logo.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingLogo ? 'Edit Logo' : 'Add New Logo'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={logoForm.company_name}
                    onChange={(e) => setLogoForm(prev => ({ ...prev, company_name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Subtitle
                  </label>
                  <input
                    type="text"
                    value={logoForm.company_subtitle}
                    onChange={(e) => setLogoForm(prev => ({ ...prev, company_subtitle: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo Upload
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml,image/bmp"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={uploading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPEG, PNG, GIF, WebP, SVG, BMP (Max 5MB)
                  </p>
                  {uploading && (
                    <p className="text-sm text-blue-600 mt-1">Uploading...</p>
                  )}
                  {logoForm.logo_url && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <img 
                        src={logoForm.logo_url} 
                        alt="Preview" 
                        className="max-h-16 max-w-full object-contain mx-auto"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={logoForm.website_url}
                    onChange={(e) => setLogoForm(prev => ({ ...prev, website_url: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={logoForm.order_index}
                    onChange={(e) => setLogoForm(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={logoForm.is_active}
                    onChange={(e) => setLogoForm(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Active (visible on website)
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    {editingLogo ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
