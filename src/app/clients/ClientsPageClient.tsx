'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    BuildingOfficeIcon,
    ChartBarIcon,
    GlobeAltIcon,
    UserGroupIcon,
    TrophyIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface Client {
    id: number
    serialNumber: number
    issuerClientCompanyName: string
    typeOfSecurity: string
    isinOfTheCompany: string
    isActive: boolean
}

interface ClientLogo {
    id: string
    company_name: string
    company_subtitle?: string
    logo_url?: string
    logo_path?: string
    website_url?: string
    order_index: number
    is_active: boolean
}

interface ClientsPageClientProps {
    clients: Client[]
    clientLogos: ClientLogo[]
}

const clientCategories = [
    {
        icon: BuildingOfficeIcon,
        title: 'Bond and Debentures',
        description: '100+ Bonds & Debentures ISIN creation and allied process from start to end, including to be listed/listed debentures',
        count: '100+',
        color: 'from-blue-500 to-blue-700'
    },
    {
        icon: ChartBarIcon,
        title: 'Companies',
        description: 'Supporting private companies in their journey from incorporation to public listing with expert RTA guidance.',
        count: '1500+',
        color: 'from-green-500 to-green-700'
    },
    {
        icon: GlobeAltIcon,
        title: 'AIFs',
        description: 'Providing specialized services for Alternative Investment Funds including unit holder management and regulatory compliance.',
        count: '10+',
        color: 'from-purple-500 to-purple-700'
    },
    {
        icon: UserGroupIcon,
        title: 'NBFCs',
        description: 'Comprehensive RTA services for Non-Banking Financial Companies including debenture management and investor relations.',
        count: '20+',
        color: 'from-orange-500 to-orange-700'
    }
]

const industries = [
    'Banking & Financial Services',
    'Information Technology',
    'Pharmaceuticals',
    'Manufacturing',
    'Real Estate',
    'Textiles',
    'Automotive',
    'Energy & Power',
    'Telecommunications',
    'Consumer Goods',
    'Infrastructure',
    'Healthcare'
]

const achievements = [
    {
        icon: TrophyIcon,
        title: 'Industry Recognition',
        description: 'Recognized as one of the fastest-growing RTA service providers in India'
    },
    {
        icon: ShieldCheckIcon,
        title: 'Zero Compliance Issues',
        description: 'Maintained 100% compliance record with SEBI regulations across all client engagements'
    },
    {
        icon: ChartBarIcon,
        title: 'Client Retention',
        description: '98% client retention rate demonstrating our commitment to service excellence'
    }
]

export default function ClientsPageClient({ clients, clientLogos }: ClientsPageClientProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Pagination calculations
    const totalPages = Math.ceil(clients.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentClients = clients.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Scroll to table top
        document.getElementById('client-table')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section role="banner" aria-labelledby="clients-heading" className="py-20 gradient-bg text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 id="clients-heading" className="text-4xl md:text-6xl font-bold mb-6">
                            Our <span style={{ color: '#008550' }}>Clients</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                            Trusted by 1500+ companies across India for reliable and efficient RTA services
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Client Categories */}
            <section aria-labelledby="categories-heading" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 id="categories-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Client <span className="text-gradient">Categories</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            We serve diverse sectors with specialized RTA solutions
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {clientCategories.map((category, index) => (
                            <motion.div
                                key={category.title}
                                className="relative overflow-hidden rounded-xl group focus:outline-2 focus:outline-offset-2 focus:outline-primary-600"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                tabIndex={0}
                                role="article"
                                aria-label={`${category.title}: ${category.count} clients`}
                            >
                                <div className={`bg-gradient-to-br ${category.color} p-8 text-white h-full`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <category.icon className="w-12 h-12" aria-hidden="true" />
                                        <div className="text-3xl font-bold">{category.count}</div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                                    <p className="text-white/90 text-sm leading-relaxed">{category.description}</p>

                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Some of Our Esteemed Clients */}
            <section aria-labelledby="esteemed-clients-heading" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 id="esteemed-clients-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Some Of Our <span className="text-gradient">Esteemed Clients</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Trusted partnerships with leading companies across industries
                        </p>
                    </motion.div>

                    {/* Client Logos Grid */}
                    {clientLogos.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {clientLogos.map((logo, index) => (
                                <motion.div
                                    key={logo.id}
                                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center min-h-[96px] cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-primary-600"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => {
                                        if (logo.website_url) {
                                            window.open(logo.website_url, '_blank', 'noopener,noreferrer')
                                        }
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`${logo.company_name}${logo.website_url ? ' - Visit website' : ''}`}
                                    onKeyDown={(e) => {
                                        if ((e.key === 'Enter' || e.key === ' ') && logo.website_url) {
                                            e.preventDefault()
                                            window.open(logo.website_url, '_blank', 'noopener,noreferrer')
                                        }
                                    }}
                                >
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
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No client logos available</p>
                            <p className="text-sm text-gray-400 mt-2">Add client logos through the admin panel</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Client Table */}
            <section id="client-table" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our <span className="text-gradient">Client Portfolio</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Companies we serve with comprehensive RTA solutions
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-primary-600 to-secondary-600">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            S.NO
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Issuer Client Company Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Type of Security
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            ISIN of the Company
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentClients.map((client, index) => (
                                        <motion.tr
                                            key={client.id}
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                        >
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
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {clients.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No clients found</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 min-h-[44px]"
                                        aria-label="Previous page"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 min-h-[44px]"
                                        aria-label="Next page"
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="sr-only">Previous</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>

                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                                // Don't show the last page number, but show all others with ellipsis logic
                                                if (page === totalPages) {
                                                    return null // Hide the last page number
                                                }

                                                if (
                                                    page === 1 ||
                                                    (page >= currentPage - 2 && page <= currentPage + 2)
                                                ) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => handlePageChange(page)}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                                                                ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    )
                                                } else if (
                                                    page === currentPage - 3 ||
                                                    (page === currentPage + 3 && page < totalPages - 1)
                                                ) {
                                                    return (
                                                        <span
                                                            key={page}
                                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                                        >
                                                            ...
                                                        </span>
                                                    )
                                                }
                                                return null
                                            })}

                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="sr-only">Next</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Industries Served */}
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
                            Industries <span className="text-gradient">We Serve</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Comprehensive RTA services across multiple industry verticals
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {industries.map((industry, index) => (
                            <motion.div
                                key={industry}
                                className="card p-4 text-center group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-gray-700 font-medium group-hover:text-primary-600 transition-colors duration-200">
                                    {industry}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements */}
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
                            Our <span className="text-gradient">Achievements</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Recognition and milestones that reflect our commitment to excellence
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.title}
                                className="card p-8 text-center group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <achievement.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {achievement.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {achievement.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 gradient-bg text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Join Our Growing Family of Satisfied Clients
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Experience the NextGen difference with our comprehensive RTA services
                        </p>
                        <motion.a
                            href="https://api.whatsapp.com/send/?phone=8178653316&text=Hi%2C+I+am+interested+in+RTA+Services&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-lg px-8 py-4 inline-block rounded-lg font-semibold transition-all duration-300 transform shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: '#12823B' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f6b2f'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#12823B'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Become Our Client
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
