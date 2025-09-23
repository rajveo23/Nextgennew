'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { FormCategory, Form } from '../../../lib/database'

// Icon mapping for form categories
const iconMap = {
  DocumentTextIcon,
  UserGroupIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  FolderIcon
}

interface FormCategoryWithForms extends FormCategory {
  forms: Form[]
}

export default function FormManagement() {
  const [categories, setCategories] = useState<FormCategoryWithForms[]>([])
  const [loading, setLoading] = useState(true)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<FormCategory | null>(null)
  const [editingForm, setEditingForm] = useState<Form | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    title: '',
    description: '',
    icon_name: 'DocumentTextIcon',
    color_gradient: 'from-blue-500 to-blue-700',
    order_index: 0
  })

  const [formForm, setFormForm] = useState({
    category_id: '',
    name: '',
    file_type: 'PDF',
    file_size: '',
    file_url: '',
    file_path: '',
    order_index: 0
  })

  const [uploadingFile, setUploadingFile] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<{
    fileName: string
    filePath: string
    fileUrl: string
    fileSize: string
    fileType: string
  } | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...')
      const response = await fetch('/api/form-categories-with-forms')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Categories fetched:', data)
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      alert('Failed to load form categories. Please check if the database is set up correctly.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/form-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      })

      if (response.ok) {
        await fetchCategories()
        setShowCategoryModal(false)
        resetCategoryForm()
      }
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCategory) return

    try {
      const response = await fetch(`/api/form-categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      })

      if (response.ok) {
        await fetchCategories()
        setShowCategoryModal(false)
        setEditingCategory(null)
        resetCategoryForm()
      }
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This will also delete all forms in this category.')) {
      return
    }

    try {
      const response = await fetch(`/api/form-categories/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchCategories()
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploadingFile(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-form', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setUploadedFile(result)
        
        // Auto-fill form fields with uploaded file info
        setFormForm(prev => ({
          ...prev,
          name: prev.name || result.originalName.replace(/\.[^/.]+$/, ''), // Remove extension
          file_type: result.fileType,
          file_size: result.fileSize,
          file_url: `${window.location.origin}${result.fileUrl}`,
          file_path: result.filePath
        }))
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error}`)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file')
    } finally {
      setUploadingFile(false)
    }
  }

  const handleCreateForm = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formForm)
      })

      if (response.ok) {
        await fetchCategories()
        setShowFormModal(false)
        resetFormForm()
        setUploadedFile(null)
      }
    } catch (error) {
      console.error('Error creating form:', error)
    }
  }

  const handleUpdateForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingForm) return

    try {
      console.log('Updating form:', editingForm.id, formForm)
      const response = await fetch(`/api/forms/${editingForm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formForm)
      })

      if (response.ok) {
        console.log('Form updated successfully')
        await fetchCategories()
        setShowFormModal(false)
        setEditingForm(null)
        resetFormForm()
        setUploadedFile(null)
      } else {
        const error = await response.json()
        console.error('Update failed:', error)
        alert(`Update failed: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating form:', error)
      alert('Failed to update form')
    }
  }

  const handleDeleteForm = async (id: string) => {
    if (!confirm('Are you sure you want to delete this form?')) {
      return
    }

    try {
      console.log('Deleting form:', id)
      // Find the form to get file info for deletion
      const formToDelete = categories
        .flatMap(cat => cat.forms)
        .find(form => form.id === id)

      const response = await fetch(`/api/forms/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        console.log('Form deleted successfully')
        // If form had a file, try to delete it
        if (formToDelete?.file_path) {
          try {
            await fetch(`/api/delete-form-file?filePath=${encodeURIComponent(formToDelete.file_path)}`, {
              method: 'DELETE'
            })
            console.log('Associated file deleted')
          } catch (fileError) {
            console.warn('Could not delete associated file:', fileError)
          }
        }
        
        await fetchCategories()
      } else {
        const error = await response.json()
        console.error('Delete failed:', error)
        alert(`Delete failed: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting form:', error)
      alert('Failed to delete form')
    }
  }

  const resetCategoryForm = () => {
    setCategoryForm({
      title: '',
      description: '',
      icon_name: 'DocumentTextIcon',
      color_gradient: 'from-blue-500 to-blue-700',
      order_index: 0
    })
  }

  const resetFormForm = () => {
    setFormForm({
      category_id: '',
      name: '',
      file_type: 'PDF',
      file_size: '',
      file_url: '',
      file_path: '',
      order_index: 0
    })
    setUploadedFile(null)
  }

  const openEditCategory = (category: FormCategory) => {
    setEditingCategory(category)
    setCategoryForm({
      title: category.title,
      description: category.description,
      icon_name: category.icon_name,
      color_gradient: category.color_gradient,
      order_index: category.order_index
    })
    setShowCategoryModal(true)
  }

  const openEditForm = (form: Form) => {
    setEditingForm(form)
    setFormForm({
      category_id: form.category_id,
      name: form.name,
      file_type: form.file_type,
      file_size: form.file_size,
      file_url: form.file_url || '',
      file_path: form.file_path || '',
      order_index: form.order_index
    })
    
    // If form has a file, show it as uploaded
    if (form.file_path) {
      const fileName = form.file_path.split('/').pop() || form.name
      setUploadedFile({
        fileName: fileName,
        filePath: form.file_path,
        fileUrl: form.file_url || form.file_path,
        fileSize: form.file_size,
        fileType: form.file_type
      })
    }
    
    setShowFormModal(true)
  }

  const openAddForm = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setFormForm({ ...formForm, category_id: categoryId })
    setShowFormModal(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Form Management</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage form categories and individual forms for the RTA Forms page
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={async () => {
              try {
                const response = await fetch('/api/test-db')
                const result = await response.json()
                if (result.success) {
                  alert(`Database OK! Found ${result.categoriesCount} categories`)
                } else {
                  alert(`Database Error: ${result.details}`)
                }
              } catch (error) {
                alert('Database connection failed')
              }
            }}
            className="btn-outline text-sm"
          >
            Test DB
          </button>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Category
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon_name as keyof typeof iconMap] || DocumentTextIcon
          
          return (
            <motion.div
              key={category.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color_gradient} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openAddForm(category.id)}
                      className="btn-secondary text-sm flex items-center gap-1"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Add Form
                    </button>
                    <button
                      onClick={() => openEditCategory(category)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Forms */}
              <div className="p-6">
                {category.forms.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No forms in this category</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.forms.map((form) => (
                      <div
                        key={form.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {form.file_type}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                          {form.name}
                        </h4>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{form.file_size}</span>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                openEditForm(form)
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              type="button"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteForm(form.id)
                              }}
                              className="p-1 text-gray-400 hover:text-red-600"
                              type="button"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={categoryForm.title}
                    onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    value={categoryForm.icon_name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="DocumentTextIcon">Document</option>
                    <option value="UserGroupIcon">Users</option>
                    <option value="BanknotesIcon">Money</option>
                    <option value="ClipboardDocumentListIcon">Clipboard</option>
                    <option value="FolderIcon">Folder</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Gradient
                  </label>
                  <select
                    value={categoryForm.color_gradient}
                    onChange={(e) => setCategoryForm({ ...categoryForm, color_gradient: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="from-blue-500 to-blue-700">Blue</option>
                    <option value="from-green-500 to-green-700">Green</option>
                    <option value="from-purple-500 to-purple-700">Purple</option>
                    <option value="from-orange-500 to-orange-700">Orange</option>
                    <option value="from-red-500 to-red-700">Red</option>
                    <option value="from-indigo-500 to-indigo-700">Indigo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={categoryForm.order_index}
                    onChange={(e) => setCategoryForm({ ...categoryForm, order_index: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryModal(false)
                    setEditingCategory(null)
                    resetCategoryForm()
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingForm ? 'Edit Form' : 'Add New Form'}
            </h3>
            <form onSubmit={editingForm ? handleUpdateForm : handleCreateForm}>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formForm.category_id}
                    onChange={(e) => setFormForm({ ...formForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* File Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Form File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    {uploadedFile ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DocumentTextIcon className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-900 truncate">{uploadedFile.fileName}</span>
                          <span className="text-xs text-gray-500">({uploadedFile.fileSize})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUploadedFile(null)}
                          className="text-red-600 hover:text-red-700 flex-shrink-0"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileUpload(file)
                            }
                          }}
                          className="hidden"
                          id="file-upload"
                          disabled={uploadingFile}
                        />
                        <label
                          htmlFor="file-upload"
                          className={`cursor-pointer flex flex-col items-center justify-center py-3 ${
                            uploadingFile ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {uploadingFile ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                          ) : (
                            <>
                              <ArrowUpTrayIcon className="w-6 h-6 text-gray-400 mb-1" />
                              <span className="text-sm text-gray-600 text-center">
                                Click to upload
                              </span>
                              <span className="text-xs text-gray-500 text-center">
                                PDF, DOC, DOCX, XLS, XLSX, ZIP (max 10MB)
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form Name
                  </label>
                  <input
                    type="text"
                    value={formForm.name}
                    onChange={(e) => setFormForm({ ...formForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Type
                  </label>
                  <select
                    value={formForm.file_type}
                    onChange={(e) => setFormForm({ ...formForm, file_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOC">DOC</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLS">XLS</option>
                    <option value="XLSX">XLSX</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Size
                  </label>
                  <input
                    type="text"
                    value={formForm.file_size}
                    onChange={(e) => setFormForm({ ...formForm, file_size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 245 KB"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File URL (optional)
                  </label>
                  <input
                    type="text"
                    value={formForm.file_url}
                    onChange={(e) => setFormForm({ ...formForm, file_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://... or auto-filled from upload"
                    readOnly={!!uploadedFile}
                  />
                  {uploadedFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-filled from uploaded file
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={formForm.order_index}
                    onChange={(e) => setFormForm({ ...formForm, order_index: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowFormModal(false)
                    setEditingForm(null)
                    resetFormForm()
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingForm ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
