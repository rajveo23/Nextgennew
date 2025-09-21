'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PhotoIcon,
  TrashIcon,
  EyeIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'
import FileUpload from '@/components/FileUpload'

interface ImageFile {
  id: number
  name: string
  url: string
  size: number
  uploadDate: string
  category: string
  alt: string
  dimensions: string
}

const mockImages: ImageFile[] = [
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
  },
  {
    id: 3,
    name: 'office-building.jpg',
    url: '/api/placeholder/800/600',
    size: 320000,
    uploadDate: '2024-01-10',
    category: 'Office',
    alt: 'NextGen Registry Office Building',
    dimensions: '1600x1200'
  },
  {
    id: 4,
    name: 'services-icon.svg',
    url: '/api/placeholder/200/200',
    size: 15000,
    uploadDate: '2024-01-08',
    category: 'Icons',
    alt: 'Services Icon',
    dimensions: '200x200'
  }
]

const categories = ['All', 'Banners', 'Team', 'Office', 'Icons', 'Blog Images', 'Logos']

export default function ImageManagement() {
  const [images, setImages] = useState<ImageFile[]>(mockImages)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showUpload, setShowUpload] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.alt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleFileUpload = (files: File[]) => {
    const newImages: ImageFile[] = files.map((file, index) => ({
      id: Math.max(...images.map(img => img.id)) + index + 1,
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      uploadDate: new Date().toISOString().split('T')[0],
      category: 'Uncategorized',
      alt: file.name.replace(/\.[^/.]+$/, ''),
      dimensions: '0x0' // Would be determined after upload
    }))
    
    setImages([...images, ...newImages])
    setShowUpload(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(img => img.id !== id))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Upload, organize, and manage your website images
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <PhotoIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FolderIcon className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <CloudArrowUpIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Upload Images
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Upload New Images</h3>
            <button
              onClick={() => setShowUpload(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <FileUpload
            onFileUpload={handleFileUpload}
            acceptedTypes={['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']}
            maxFiles={20}
            maxSize={10}
          />
        </motion.div>
      )}

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Search */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search images..."
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
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Images Grid/List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="p-2 bg-white rounded-full text-gray-700 hover:text-primary-600"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => copyImageUrl(image.url)}
                        className="p-2 bg-white rounded-full text-gray-700 hover:text-primary-600"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-2 bg-white rounded-full text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <p className="text-white text-xs truncate">{image.name}</p>
                    <p className="text-gray-300 text-xs">{formatFileSize(image.size)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{image.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{image.dimensions}</span>
                        <span>{formatFileSize(image.size)}</span>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="p-2 text-gray-400 hover:text-primary-600"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => copyImageUrl(image.url)}
                      className="p-2 text-gray-400 hover:text-primary-600"
                    >
                      <DocumentDuplicateIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No images found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or upload some images.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="max-w-4xl max-h-full p-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-medium">{selectedImage.name}</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-96 mx-auto"
                />
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Dimensions:</span> {selectedImage.dimensions}
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> {formatFileSize(selectedImage.size)}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {selectedImage.category}
                  </div>
                  <div>
                    <span className="font-medium">Upload Date:</span> {new Date(selectedImage.uploadDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
