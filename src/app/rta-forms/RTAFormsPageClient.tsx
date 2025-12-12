'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    DocumentTextIcon,
    ArrowDownTrayIcon,
    ClipboardDocumentListIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    BanknotesIcon,
    CloudArrowUpIcon,
    FolderIcon
} from '@heroicons/react/24/outline'

// Icon mapping for form categories
const iconMap = {
    DocumentTextIcon,
    UserGroupIcon,
    BanknotesIcon,
    ClipboardDocumentListIcon,
    FolderIcon
}

interface Form {
    id: string
    name: string
    file_type: string
    file_size: string
    file_url?: string
    file_path?: string
    category_id: string
    order_index: number
}

interface FormCategory {
    id: string
    title: string
    description: string
    icon_name: string
    color_gradient: string
    is_important_document?: boolean
    forms: Form[]
}

interface RTAFormsPageClientProps {
    formCategories: FormCategory[]
    importantDocuments: FormCategory[]
}

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

export default function RTAFormsPageClient({ formCategories, importantDocuments }: RTAFormsPageClientProps) {
    const [refreshing, setRefreshing] = useState(false)

    const handleDownload = async (formName: string, fileUrl?: string) => {
        try {
            // Detect Safari browser
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

            // If we have a file URL from the database, use it directly
            if (fileUrl && fileUrl.trim() !== '') {

                // Test if URL is accessible
                try {
                    const testResponse = await fetch(fileUrl, { method: 'HEAD' })

                    if (testResponse.ok) {
                        if (isSafari) {
                            // Safari-specific download method
                            window.open(fileUrl, '_blank')
                        } else {
                            const link = document.createElement('a')
                            link.href = fileUrl
                            link.download = formName
                            link.target = '_blank'
                            link.rel = 'noopener noreferrer'

                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                        }

                        return
                    }
                } catch (urlError) {
                    console.error('Error testing URL:', urlError)
                }
            }

            // Fallback: try to find file by name
            const fileName = formName.replace(/\s+/g, '_').toLowerCase() + '.pdf'
            const formPath = `/forms/${fileName}`

            // Check if file exists by trying to fetch it
            const response = await fetch(formPath, { method: 'HEAD' })

            if (response.ok) {
                // File exists, proceed with download
                if (isSafari) {
                    window.open(formPath, '_blank')
                } else {
                    const link = document.createElement('a')
                    link.href = formPath
                    link.download = fileName
                    link.target = '_blank'
                    link.rel = 'noopener noreferrer'

                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }

                alert(`Downloading ${formName} form...`)
            } else {
                console.warn(`Form not found: ${formPath}`)
                alert(`📄 ${formName}\n\nForm not available. Please contact us at info@nextgenregistry.com for assistance.`)
            }
        } catch (error) {
            console.error('Download error:', error)
            alert(`📄 ${formName}\n\nDownload failed. Please:\n1. Check if file is uploaded in admin panel\n2. Contact us at info@nextgenregistry.com\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section role="banner" aria-labelledby="rta-forms-heading" className="py-20 gradient-bg text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 id="rta-forms-heading" className="text-4xl md:text-6xl font-bold mb-6">
                            RTA <span style={{ color: '#008550' }}>Forms</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                            Download all necessary forms and documents for RTA services and compliance requirements
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Instructions */}
            <section aria-labelledby="instructions-heading" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 id="instructions-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
                                className="text-center focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 rounded-lg p-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                tabIndex={0}
                                role="article"
                                aria-label={`Step ${instruction.step}: ${instruction.title}`}
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold" aria-hidden="true">
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
            <section aria-labelledby="form-categories-heading" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 id="form-categories-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Form <span className="text-gradient">Categories</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Organized forms by service category for easy access
                        </p>
                    </motion.div>

                    {formCategories.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No form categories available.</p>
                            <p className="text-sm text-gray-400 mt-2">Add forms through the admin panel.</p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {formCategories
                                .filter((category: FormCategory) => !category.is_important_document)
                                .map((category: FormCategory, categoryIndex: number) => {
                                    const IconComponent = iconMap[category.icon_name as keyof typeof iconMap] || DocumentTextIcon

                                    return (
                                        <motion.div
                                            key={category.id}
                                            className="card p-8 focus:outline-2 focus:outline-offset-2 focus:outline-primary-600"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                                            viewport={{ once: true }}
                                            tabIndex={0}
                                            role="article"
                                            aria-labelledby={`category-${category.id}`}
                                        >
                                            <div className="flex items-center mb-6">
                                                <div className={`w-16 h-16 bg-gradient-to-br ${category.color_gradient} rounded-lg flex items-center justify-center mr-4`}>
                                                    <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <h3 id={`category-${category.id}`} className="text-2xl font-bold text-gray-900">{category.title}</h3>
                                                    <p className="text-gray-600">{category.description}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {category.forms.map((form: Form, formIndex: number) => (
                                                    <motion.div
                                                        key={form.id}
                                                        className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all duration-200 group focus:outline-2 focus:outline-offset-2 focus:outline-primary-600"
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.4, delay: formIndex * 0.05 }}
                                                        viewport={{ once: true }}
                                                        tabIndex={0}
                                                        role="article"
                                                        aria-label={`${form.name} - ${form.file_type} - ${form.file_size}`}
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <DocumentTextIcon className="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" aria-hidden="true" />
                                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                                {form.file_type}
                                                            </span>
                                                        </div>

                                                        <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                                                            {form.name}
                                                        </h4>

                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs text-gray-500">{form.file_size}</span>
                                                            <button
                                                                onClick={() => handleDownload(form.name, form.file_url)}
                                                                className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 min-h-[44px] px-2 rounded"
                                                                aria-label={`Download ${form.name}`}
                                                            >
                                                                <ArrowDownTrayIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                                                                Download
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                        </div>
                    )}
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

                    {importantDocuments.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No important documents available.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {importantDocuments.map((docCategory, index) => (
                                <motion.div
                                    key={docCategory.id}
                                    className="card p-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        {docCategory.title}
                                    </h3>

                                    <div className="space-y-4">
                                        {docCategory.forms.map((form) => (
                                            <div key={form.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900 mb-1">{form.name}</h4>
                                                        <p className="text-sm text-gray-600">{form.file_size}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDownload(form.name, form.file_url)}
                                                        className="ml-3 text-primary-600 hover:text-primary-700 transition-colors duration-200"
                                                        aria-label={`Download ${form.name}`}
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
                    )}
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
                                    301, 3RD FLOOR, PRATAP CHAMBERS, GURUDWARA ROAD, KAROL BAGH, New Delhi, 110005<br />
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
                        <ShieldCheckIcon className="w-16 h-16 mx-auto mb-6" style={{ color: '#008550' }} />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Need Help with Forms?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Our expert team is here to assist you with form completion and submission processes
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="mailto:Info@nextgenregistry.com?subject=RTA Forms Support Request"
                                className="text-white text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform shadow-lg hover:shadow-xl text-center"
                                style={{ backgroundColor: '#12823B' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f6b2f'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#12823B'}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Support
                            </motion.a>
                            <motion.a
                                href="https://api.whatsapp.com/send/?phone=8178653316&text=Hi%2C+I+need+help+with+RTA+forms&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Schedule Consultation
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
