'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    ClockIcon,
    ShieldCheckIcon,
    ExclamationTriangleIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline'

const escalationLevels = [
    {
        level: 1,
        title: 'First Escalation',
        responseTime: '15 Days',
        name: 'Ravi Ranjan Kumar',
        position: 'Head of Customer Care',
        email: 'Nextgen.reachus@gmail.com',
        phone: '011-45060667',
        description: 'For initial grievances and general inquiries. Our customer care team will address your concerns promptly.',
        color: 'from-primary-500 to-primary-600',
        bgColor: '',
        borderColor: 'border-primary-200',
        customBgColor: '#4f6fd8'
    },
    {
        level: 2,
        title: 'Second Escalation',
        responseTime: '15 Days',
        name: 'Shivansh Bansal',
        position: 'Compliance Officer',
        email: 'Info@nextgenregistry.com',
        phone: '011-45060667',
        description: 'If your concern is not resolved at Level 1 within the specified time, please escalate to our Compliance Officer.',
        color: 'from-secondary-500 to-secondary-600',
        bgColor: '',
        borderColor: 'border-secondary-200',
        customBgColor: '#028849'
    },
    {
        level: 3,
        title: 'Third Escalation',
        responseTime: '15 Days',
        name: 'Shaivi Bansal',
        position: 'Chief Executive Officer',
        email: 'Shaivi.bansal@nextgenregistry.com',
        phone: '011-45060668',
        description: 'For matters requiring executive attention after Level 2 escalation. Reserved for critical unresolved issues.',
        color: 'from-purple-500 to-purple-600',
        bgColor: '',
        borderColor: 'border-purple-200',
        customBgColor: '#8f5fbf'
    }
]

const grievanceTypes = [
    'Issues related to demat/remat of securities',
    'Non-receipt of dividend/interest/redemption',
    'Non-receipt of annual reports',
    'Transfer/Transmission of securities',
    'Change of address/bank details',
    'Nomination related queries',
    'Duplicate share certificates',
    'ISIN related queries'
]

export default function GrievancesPage() {
    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section aria-labelledby="grievances-heading" className="py-20 gradient-bg text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 id="grievances-heading" className="text-4xl md:text-5xl font-bold mb-4">
                            Grievance <span style={{ color: '#008550' }}>Escalation Matrix</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                            Our commitment to resolving your concerns efficiently and transparently
                        </p>
                        <p className="mt-4 text-white/80 text-sm">
                            (Monday to Friday - Working hours: 9:30 AM to 6:00 PM)
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Escalation Matrix Table */}
            <section aria-labelledby="escalation-heading" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 id="escalation-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            NextGen Registry <span className="text-gradient">Escalation Matrix</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Three-tier grievance redressal system ensuring timely resolution of all investor concerns
                        </p>
                    </motion.div>

                    {/* Escalation Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {escalationLevels.map((level, index) => (
                            <motion.div
                                key={level.level}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`relative overflow-hidden rounded-2xl border-2 ${level.borderColor} bg-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
                            >
                                {/* Header with Level */}
                                <div className="px-6 py-4 text-white" style={level.customBgColor ? { backgroundColor: level.customBgColor } : {}}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium uppercase tracking-wider">Level {level.level}</span>
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="w-5 h-5" />
                                            <span className="font-bold">{level.responseTime}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mt-2">{level.title}</h3>
                                </div>

                                {/* Content */}
                                <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
                                    {/* Person Info */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={level.customBgColor ? { backgroundColor: level.customBgColor } : {}}>
                                            <UserIcon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{level.name}</h4>
                                            <p className="text-gray-600 text-sm">{level.position}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                        {level.description}
                                    </p>

                                    {/* Contact Info */}
                                    <div className="space-y-3">
                                        <a
                                            href={`mailto:${level.email}`}
                                            className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                                                <EnvelopeIcon className="w-4 h-4 text-gray-600 group-hover:text-primary-600" />
                                            </div>
                                            <span className="text-sm font-medium">{level.email}</span>
                                        </a>
                                        <a
                                            href={`tel:${level.phone}`}
                                            className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                                                <PhoneIcon className="w-4 h-4 text-gray-600 group-hover:text-primary-600" />
                                            </div>
                                            <span className="text-sm font-medium">{level.phone}</span>
                                        </a>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href={`mailto:${level.email}?subject=Grievance Escalation - Level ${level.level}`}
                                        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm hover:opacity-90 transition-opacity"
                                        style={level.customBgColor ? { backgroundColor: level.customBgColor } : {}}
                                    >
                                        <span>Escalate to Level {level.level}</span>
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Escalation Flow */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex items-center justify-center gap-4"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-medium border border-primary-300">
                            <span>Level 1</span>
                            <span className="text-xs">(15 Days)</span>
                        </div>
                        <ArrowRightIcon className="w-6 h-6 text-gray-400" />
                        <div className="flex items-center gap-2 px-4 py-2 bg-secondary-100 rounded-full text-secondary-700 font-medium border border-secondary-300">
                            <span>Level 2</span>
                            <span className="text-xs">(15 Days)</span>
                        </div>
                        <ArrowRightIcon className="w-6 h-6 text-gray-400" />
                        <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-medium border border-purple-300">
                            <span>Level 3</span>
                            <span className="text-xs">(15 Days)</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Grievance Types Section */}
            <section className="py-6 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Types of <span className="text-gradient">Grievances</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Common issues that can be addressed through our escalation matrix
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {grievanceTypes.map((type, index) => (
                            <motion.div
                                key={type}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-white p-5 rounded-xl shadow-md border-2 border-primary-200 hover:shadow-lg hover:border-primary-500 transition-all duration-200 min-h-[80px] flex items-center"
                            >
                                <p className="text-gray-800 text-sm font-medium leading-relaxed">• {type}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Important Guidelines */}
            <section className="py-6 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-300 shadow-md">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <ExclamationTriangleIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Important Guidelines</h3>
                                    <p className="text-gray-600">Please ensure you follow these steps for effective grievance resolution</p>
                                </div>
                            </div>

                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#094EBE' }}>1</span>
                                    <span>Start with Level 1 escalation and allow the specified response time before escalating further</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#094EBE' }}>2</span>
                                    <span>Include your Folio Number/DP ID/Client ID in all communications for quick reference</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#094EBE' }}>3</span>
                                    <span>Attach relevant documents and previous correspondence (if any) when escalating</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#094EBE' }}>4</span>
                                    <span>Quote the complaint reference number while escalating to a higher level</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#094EBE' }}>5</span>
                                    <span>Response times are calculated in business hours (9:30 AM to 6:00 PM, Mon-Fri)</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SEBI SCORES Section */}
            <section className="py-6 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-300">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <ShieldCheckIcon className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                SEBI SCORES Platform
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                If your grievance is not resolved through our internal escalation matrix, you may lodge your complaint on SEBI&apos;s SCORES (SEBI Complaint Redress System) portal.
                            </p>
                            <motion.a
                                href="https://scores.sebi.gov.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-colors"
                                style={{ backgroundColor: '#12823B' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f6b2f'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#12823B'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Visit SEBI SCORES</span>
                                <ArrowRightIcon className="w-5 h-5" />
                            </motion.a>
                            <p className="text-sm text-gray-500 mt-4">
                                Smart ODR Portal: <Link href="https://smartodr.in/login" target="_blank" className="text-primary-600 hover:underline">smartodr.in</Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 gradient-bg text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Need Immediate Assistance?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Our team is here to help you with any concerns or queries
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="mailto:Info@nextgenregistry.com"
                                className="text-white text-lg px-8 py-4 inline-block rounded-lg font-semibold transition-all duration-300 transform shadow-lg hover:shadow-xl"
                                style={{ backgroundColor: '#12823B' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f6b2f'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#12823B'}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Email Us Now
                            </motion.a>
                            <motion.a
                                href="tel:011-45060667"
                                className="btn-outline text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <PhoneIcon className="w-5 h-5" />
                                <span>Call Us: 011-45060667</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
