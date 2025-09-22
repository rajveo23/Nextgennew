'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  DocumentArrowUpIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline'
import { AdminDataManager, Client } from '@/lib/adminData'

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    serialNumber: '',
    issuerClientCompanyName: '',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: '',
    isActive: true
  })
  const [showCsvModal, setShowCsvModal] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvUploading, setCsvUploading] = useState(false)
  const [csvResult, setCsvResult] = useState<any>(null)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      await AdminDataManager.initializeData()
      const clientData = await AdminDataManager.getClients()
      setClients(clientData)
    } catch (error) {
      console.error('Error loading clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingClient) {
        // Update existing client
        const updatedClient = await AdminDataManager.saveClient({
          ...editingClient,
          ...formData,
          serialNumber: parseInt(formData.serialNumber)
        })
        if (updatedClient) {
          setClients(prev => prev.map((c: Client) => c.id === updatedClient.id ? updatedClient : c))
        }
      } else {
        // Create new client
        const newClient = await AdminDataManager.saveClient({
          ...formData,
          serialNumber: parseInt(formData.serialNumber)
        })
        if (newClient) {
          setClients(prev => [...prev, newClient])
        }
      }
      
      resetForm()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving client:', error)
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      serialNumber: client.serialNumber.toString(),
      issuerClientCompanyName: client.issuerClientCompanyName,
      typeOfSecurity: client.typeOfSecurity,
      isinOfTheCompany: client.isinOfTheCompany,
      isActive: client.isActive
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this client?')) {
      await AdminDataManager.deleteClient(id)
      setClients(prev => prev.filter((c: Client) => c.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      serialNumber: '',
      issuerClientCompanyName: '',
      typeOfSecurity: 'EQUITY',
      isinOfTheCompany: '',
      isActive: true
    })
    setEditingClient(null)
  }

  const handleCsvUpload = async () => {
    if (!csvFile) return

    setCsvUploading(true)
    setCsvResult(null)

    try {
      const formData = new FormData()
      formData.append('csvFile', csvFile)

      const response = await fetch('/api/clients/csv-direct', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      setCsvResult(result)

      if (result.success) {
        // Reload clients to show new data
        await loadClients()
      }
    } catch (error) {
      console.error('CSV upload error:', error)
      setCsvResult({
        success: false,
        error: 'Failed to upload CSV file'
      })
    } finally {
      setCsvUploading(false)
    }
  }

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCsvFile(file)
      setCsvResult(null)
    }
  }

  const filteredClients = clients.filter((client: Client) =>
    client.issuerClientCompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.isinOfTheCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.serialNumber.toString().includes(searchTerm)
  )

  const stats = {
    total: clients.length,
    active: clients.filter((c: Client) => c.isActive).length,
    inactive: clients.filter((c: Client) => !c.isActive).length,
    equity: clients.filter((c: Client) => c.typeOfSecurity === 'EQUITY').length
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Management</h1>
        <p className="text-gray-600">Manage your client portfolio and company listings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive Clients</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.inactive}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Equity Securities</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.equity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowCsvModal(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <DocumentArrowUpIcon className="h-5 w-5" />
            Upload CSV
          </button>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="btn-primary flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Client
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Security Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISIN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No clients found
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {client.serialNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {client.issuerClientCompanyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {client.typeOfSecurity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {client.isinOfTheCompany}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        client.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {client.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serial Number
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.issuerClientCompanyName}
                    onChange={(e) => setFormData({...formData, issuerClientCompanyName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security Type
                  </label>
                  <select
                    value={formData.typeOfSecurity}
                    onChange={(e) => setFormData({...formData, typeOfSecurity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="EQUITY">EQUITY</option>
                    <option value="PREFERENCE">PREFERENCE</option>
                    <option value="DEBENTURE">DEBENTURE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISIN
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.isinOfTheCompany}
                    onChange={(e) => setFormData({...formData, isinOfTheCompany: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      resetForm()
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                  >
                    {editingClient ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CSV Upload Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Upload Clients CSV</h2>
                <button
                  onClick={() => {
                    setShowCsvModal(false)
                    setCsvFile(null)
                    setCsvResult(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>serial_number</strong> - Unique client serial number</li>
                    <li>• <strong>issuer_client_company_name</strong> - Company name</li>
                    <li>• <strong>type_of_security</strong> - EQUITY, PREFERENCE, or DEBENTURE</li>
                    <li>• <strong>isin_of_the_company</strong> - ISIN code</li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-2">
                    Example: 1001,ABC COMPANY LIMITED,EQUITY,INE123A01012
                  </p>
                  <div className="mt-3">
                    <a
                      href="/sample-clients.csv"
                      download="sample-clients.csv"
                      className="text-sm text-primary-600 hover:text-primary-700 underline"
                    >
                      📥 Download Sample CSV Template
                    </a>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select CSV File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="csv-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            {csvFile ? csvFile.name : 'Choose CSV file or drag and drop'}
                          </span>
                          <input
                            id="csv-upload"
                            type="file"
                            accept=".csv"
                            onChange={handleCsvFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="mt-1 text-xs text-gray-500">CSV files only</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Button */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCsvModal(false)
                      setCsvFile(null)
                      setCsvResult(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCsvUpload}
                    disabled={!csvFile || csvUploading}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                      !csvFile || csvUploading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700'
                    }`}
                  >
                    {csvUploading ? 'Uploading...' : 'Upload CSV'}
                  </button>
                </div>

                {/* Results */}
                {csvResult && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    csvResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <h4 className={`font-medium ${
                      csvResult.success ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {csvResult.success ? 'Upload Successful!' : 'Upload Failed'}
                    </h4>
                    
                    {csvResult.results && (
                      <div className={`mt-2 text-sm ${
                        csvResult.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        <p>Total Rows: {csvResult.results.totalRows}</p>
                        <p>Valid Rows: {csvResult.results.validRows}</p>
                        <p>Successfully Added: {csvResult.results.successful}</p>
                        <p>Failed: {csvResult.results.failed}</p>
                      </div>
                    )}

                    {csvResult.results?.errors && csvResult.results.errors.length > 0 && (
                      <div className="mt-3">
                        <details className="text-sm">
                          <summary className="cursor-pointer font-medium">
                            View Errors ({csvResult.results.errors.length})
                          </summary>
                          <ul className="mt-2 space-y-1 text-xs">
                            {csvResult.results.errors.slice(0, 10).map((error: string, index: number) => (
                              <li key={index} className="text-red-700">• {error}</li>
                            ))}
                            {csvResult.results.errors.length > 10 && (
                              <li className="text-red-600">... and {csvResult.results.errors.length - 10} more</li>
                            )}
                          </ul>
                        </details>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
