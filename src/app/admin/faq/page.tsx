'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { AdminDataManager, FAQ } from '../../../lib/adminData'

const categories = ['All', 'ISIN Services', 'RTA Services', 'Demat Services', 'Corporate Actions', 'General']

export default function FAQManagement() {
  const [faqs, setFAQs] = useState<FAQ[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    // Initialize data and load FAQs
    const loadFAQs = async () => {
      await AdminDataManager.initializeData()
      const faqsData = await AdminDataManager.getFAQs()
      setFAQs(faqsData)
    }
    loadFAQs()
  }, [])

  const filteredFAQs = faqs.filter((faq: FAQ) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  }).sort((a, b) => a.order - b.order)

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      await AdminDataManager.deleteFAQ(id)
      const faqsData = await AdminDataManager.getFAQs()
      setFAQs(faqsData)
    }
  }

  const handleToggleActive = async (id: number) => {
    const faq = faqs.find(f => f.id === id)
    if (faq) {
      const updatedFAQ = { ...faq, isActive: !faq.isActive }
      await AdminDataManager.saveFAQ(updatedFAQ)
      const faqsData = await AdminDataManager.getFAQs()
      setFAQs(faqsData)
    }
  }

  const handleSave = async (faqData: Partial<FAQ>) => {
    if (editingFAQ) {
      // Update existing FAQ
      const updatedFAQ = { ...editingFAQ, ...faqData }
      await AdminDataManager.saveFAQ(updatedFAQ)
      setEditingFAQ(null)
    } else {
      // Add new FAQ
      const newFAQData = {
        question: faqData.question || '',
        answer: faqData.answer || '',
        category: faqData.category || 'General',
        order: faqs.length + 1,
        isActive: true
      }
      await AdminDataManager.saveFAQ(newFAQData)
      setShowAddForm(false)
    }
    const faqsData = await AdminDataManager.getFAQs()
    setFAQs(faqsData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage frequently asked questions and answers
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Add FAQ
          </button>
        </div>
      </div>

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
              placeholder="Search FAQs..."
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

      {/* Add/Edit Form */}
      {(showAddForm || editingFAQ) && (
        <FAQForm
          faq={editingFAQ}
          onSave={handleSave}
          onCancel={() => {
            setShowAddForm(false)
            setEditingFAQ(null)
          }}
        />
      )}

      {/* FAQ List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`border rounded-lg p-4 ${faq.isActive ? 'border-gray-200' : 'border-gray-100 bg-gray-50'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <div className="flex-1">
                        <h3 className={`text-lg font-medium ${faq.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {faq.question}
                        </h3>
                        <div className="flex items-center mt-1 space-x-4">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {faq.category}
                          </span>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            faq.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {faq.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      {expandedFAQ === faq.id ? (
                        <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="text-gray-700">{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(faq.id)}
                      className={`inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ${
                        faq.isActive 
                          ? 'bg-red-50 text-red-700 ring-red-200 hover:bg-red-100'
                          : 'bg-green-50 text-green-700 ring-green-200 hover:bg-green-100'
                      }`}
                    >
                      {faq.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingFAQ(faq)}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(faq.id)}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <MagnifyingGlassIcon className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No FAQs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FAQForm({ 
  faq, 
  onSave, 
  onCancel 
}: { 
  faq: FAQ | null
  onSave: (data: Partial<FAQ>) => void
  onCancel: () => void
}) {
  const [question, setQuestion] = useState(faq?.question || '')
  const [answer, setAnswer] = useState(faq?.answer || '')
  const [category, setCategory] = useState(faq?.category || 'General')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim() && answer.trim()) {
      onSave({ question, answer, category })
      setQuestion('')
      setAnswer('')
      setCategory('General')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-lg p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {faq ? 'Edit FAQ' : 'Add New FAQ'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="Enter the question..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Answer
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="Enter the answer..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          >
            {categories.slice(1).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            {faq ? 'Update' : 'Add'} FAQ
          </button>
        </div>
      </form>
    </motion.div>
  )
}
