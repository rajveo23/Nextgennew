'use client'

import { motion } from 'framer-motion'
import { 
  DocumentTextIcon, 
  ArrowDownTrayIcon, 
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BanknotesIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline'

const formCategories = [
  {
    icon: DocumentTextIcon,
    title: 'ISIN Creation Forms',
    description: 'Forms required for ISIN creation and listing processes',
    color: 'from-blue-500 to-blue-700',
    forms: [
      { name: 'ISIN Application Form', type: 'PDF', size: '245 KB' },
      { name: 'Company Details Form', type: 'PDF', size: '180 KB' },
      { name: 'Auditor Certificate Format', type: 'PDF', size: '120 KB' },
      { name: 'Board Resolution Format', type: 'DOC', size: '95 KB' }
    ]
  },
  {
    icon: UserGroupIcon,
    title: 'Shareholder Services',
    description: 'Forms for shareholder registration and services',
    color: 'from-green-500 to-green-700',
    forms: [
      { name: 'Shareholder Registration Form', type: 'PDF', size: '320 KB' },
      { name: 'Address Change Request', type: 'PDF', size: '150 KB' },
      { name: 'Nomination Form', type: 'PDF', size: '200 KB' },
      { name: 'Transmission Form', type: 'PDF', size: '180 KB' }
    ]
  },
  {
    icon: BanknotesIcon,
    title: 'Corporate Actions',
    description: 'Forms related to dividends, bonus, and other corporate actions',
    color: 'from-purple-500 to-purple-700',
    forms: [
      { name: 'Dividend Claim Form', type: 'PDF', size: '165 KB' },
      { name: 'Bonus Issue Form', type: 'PDF', size: '140 KB' },
      { name: 'Rights Issue Form', type: 'PDF', size: '190 KB' },
      { name: 'Corporate Action Notice', type: 'PDF', size: '110 KB' }
    ]
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Compliance Forms',
    description: 'Regulatory compliance and reporting forms',
    color: 'from-orange-500 to-orange-700',
    forms: [
      { name: 'Annual Return Form', type: 'PDF', size: '280 KB' },
      { name: 'Compliance Certificate', type: 'PDF', size: '130 KB' },
      { name: 'SEBI Reporting Form', type: 'PDF', size: '220 KB' },
      { name: 'Depository Interface Form', type: 'PDF', size: '175 KB' }
    ]
  }
]

const documents = [
  {
    category: 'Investor Charter',
    items: [
      { name: 'RTA Investor Charter', description: 'Rights and responsibilities of investors', type: 'PDF' },
      { name: 'Grievance Redressal Policy', description: 'Process for handling investor grievances', type: 'PDF' }
    ]
  },
  {
    category: 'Regulatory Documents',
    items: [
      { name: 'SEBI Registration Certificate', description: 'Our SEBI registration certificate', type: 'PDF' },
      { name: 'Service Level Agreement', description: 'Standard SLA for RTA services', type: 'PDF' }
    ]
  },
  {
    category: 'Process Guides',
    items: [
      { name: 'ISIN Creation Process Guide', description: 'Step-by-step guide for ISIN creation', type: 'PDF' },
      { name: 'Demat Process Guide', description: 'Guide for dematerialization process', type: 'PDF' }
    ]
  }
]

const instructions = [
  {
    step: '1',
    title: 'Select Required Forms',
    description: 'Choose the forms you need from the categories below based on your requirements.'
  },
  {
    step: '2',
    title: 'Download & Fill',
    description: 'Download the forms and fill them completely with accurate information.'
  },
  {
    step: '3',
    title: 'Submit Documents',
    description: 'Submit the completed forms along with required supporting documents.'
  },
  {
    step: '4',
    title: 'Processing',
    description: 'Our team will process your request and provide updates on the status.'
  }
]

export default function RTAFormsPage() {
  const handleDownload = async (formName: string) => {
    try {
      // Create proper filename
      const fileName = formName.replace(/\s+/g, '_').toLowerCase() + '.pdf'
      const formPath = `/forms/${fileName}`
      
      // Check if file exists by trying to fetch it
      const response = await fetch(formPath, { method: 'HEAD' })
      
      if (response.ok) {
        // File exists, proceed with download
        const link = document.createElement('a')
        link.href = formPath
        link.download = fileName
        link.target = '_blank'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Show success message
        alert(`Downloading ${formName} form...`)
      } else {
        // File doesn't exist, use fallback
        console.warn(`Form not found: ${formPath}`)
        
        // Create a sample PDF content for demo
        const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${formName} Form) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000369 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
466
%%EOF`
        
        // Create blob and download
        const blob = new Blob([pdfContent], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Clean up
        URL.revokeObjectURL(url)
        
        alert(`Downloading ${formName} form... (Demo version - Please upload actual forms to /public/forms/ directory)`)
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Sorry, the form download is temporarily unavailable. Please contact us directly for the form.')
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              RTA <span className="text-secondary-300">Forms</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Download all necessary forms and documents for RTA services and compliance requirements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to <span className="text-gradient">Use Forms</span>
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to download and submit RTA forms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructions.map((instruction, index) => (
              <motion.div
                key={instruction.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {instruction.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {instruction.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {instruction.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Form <span className="text-gradient">Categories</span>
            </h2>
            <p className="text-xl text-gray-600">
              Organized forms by service category for easy access
            </p>
          </motion.div>

          <div className="space-y-12">
            {formCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.forms.map((form, formIndex) => (
                    <motion.div
                      key={form.name}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all duration-200 group"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: formIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <DocumentTextIcon className="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" />
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {form.type}
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                        {form.name}
                      </h4>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{form.size}</span>
                        <button
                          onClick={() => handleDownload(form.name)}
                          className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Documents */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Important <span className="text-gradient">Documents</span>
            </h2>
            <p className="text-xl text-gray-600">
              Essential documents and guides for investors and companies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documents.map((docCategory, index) => (
              <motion.div
                key={docCategory.category}
                className="card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {docCategory.category}
                </h3>
                
                <div className="space-y-4">
                  {docCategory.items.map((item, itemIndex) => (
                    <div key={item.name} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <button
                          onClick={() => handleDownload(item.name)}
                          className="ml-3 text-primary-600 hover:text-primary-700 transition-colors duration-200"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Submission Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <CloudArrowUpIcon className="w-16 h-16 mx-auto mb-6 text-primary-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Submit Your <span className="text-gradient">Documents</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              After downloading and filling the forms, submit them through the following methods
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📧 Email Submission</h3>
              <p className="text-gray-600 mb-4">
                Send your completed forms and documents to:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900">info@nextgenregistry.com</p>
                <p className="text-sm text-blue-700 mt-2">
                  Subject: [Service Type] - [Company Name] - Document Submission
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📍 Physical Submission</h3>
              <p className="text-gray-600 mb-4">
                Visit our office or send documents by post:
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold text-green-900">NextGen Registry Office</p>
                <p className="text-sm text-green-700 mt-2">
                  [Office Address]<br />
                  Business Hours: 9:00 AM - 6:00 PM<br />
                  Monday to Friday
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200"
          >
            <h4 className="font-semibold text-blue-900 mb-3">📋 Submission Guidelines:</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Ensure all forms are completely filled and signed</li>
              <li>• Include all required supporting documents</li>
              <li>• File names should be descriptive (e.g., "ISIN_Application_CompanyName.pdf")</li>
              <li>• For email submissions, compress large files into ZIP format</li>
              <li>• Keep copies of all submitted documents for your records</li>
              <li>• You will receive an acknowledgment within 24 hours of submission</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ShieldCheckIcon className="w-16 h-16 mx-auto mb-6 text-secondary-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help with Forms?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Our expert team is here to assist you with form completion and submission processes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
              <motion.button 
                className="btn-outline text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
