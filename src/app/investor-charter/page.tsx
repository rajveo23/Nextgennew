'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    HandThumbUpIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

// Tab definitions
const tabs = [
    { id: 'vision', name: 'VISION', color: 'bg-amber-400', hoverColor: 'hover:bg-amber-500' },
    { id: 'mission', name: 'MISSION', color: '', hoverColor: '', customColor: '#39a7db' },
    { id: 'services', name: 'SERVICES PROVIDED', color: '', hoverColor: '', customColor: '#789ac4' },
    { id: 'rights', name: 'RIGHTS OF INVESTOR', color: 'bg-emerald-400', hoverColor: 'hover:bg-emerald-500' },
    { id: 'dos-donts', name: "DO'S AND DON'TS FOR INVESTOR", color: '', hoverColor: '', customColor: '#df8a43' },
    { id: 'grievance', name: 'GRIEVANCE / COMPLAINTS REDRESSAL – ESCALATION MECHANISM', color: 'bg-rose-300', hoverColor: 'hover:bg-rose-400' },
]

// Content for each section
const content = {
    vision: {
        title: 'VISION',
        body: (
            <p className="text-gray-700 text-lg leading-relaxed">
                To be a trusted, transparent and prompt service provider to the investors, conforming to the highest standards of compliance, confidentiality and professionalism in conduct, to meet the obligation towards investors in Indian capital markets.
            </p>
        )
    },
    mission: {
        title: 'MISSION',
        body: (
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg leading-relaxed">
                <li>To maintain high standard of integrity in the conduct of business by fulfilling obligations in a prompt, ethical, transparent and professional manner.</li>
                <li>To comply with all regulatory requirements in a time bound manner.</li>
                <li>To facilitate prompt service to investors by and through streamlining the process and harnessing technology.</li>
                <li>To facilitate easy approach, communication and interface with investors so as to resolve their queries / grievances.</li>
                <li>To ensure confidentiality of information shared by investors unless required legally or with consent.</li>
            </ul>
        )
    },
    services: {
        title: 'SERVICES PROVIDED',
        body: (
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg leading-relaxed">
                <li>Providing allotment details and clarifications.</li>
                <li>Processing investor service requests with complete discrepancy reporting.</li>
                <li>Corporate actions: ESOPs, dividend, stock split, bonus, merger/demerger.</li>
                <li>Communicating buyback, exit offers, takeovers.</li>
                <li>Executing IEPF transfers and suspense account transfers.</li>
            </ul>
        )
    },
    rights: {
        title: 'RIGHTS OF INVESTOR',
        body: (
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg leading-relaxed">
                <li>Receive benefits and information declared by the company.</li>
                <li>Fair and equitable treatment.</li>
                <li>Participation in AGM/EGM and e-voting.</li>
                <li>Approach RTA/Depository/Company/Exchange/SEBI for grievance resolution.</li>
                <li>Access statutory disclosures.</li>
                <li>Transfer/sell securities with minimal documentation.</li>
                <li>Accessibility support for differently-abled investors.</li>
                <li>Access educational material and escalation matrix.</li>
                <li>Not be bound by clauses violating regulations.</li>
                <li>Receive timely updates.</li>
            </ul>
        )
    },
    'dos-donts': {
        title: "DO'S AND DON'TS FOR INVESTOR",
        body: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-emerald-600 mb-4 flex items-center">
                        <HandThumbUpIcon className="w-6 h-6 mr-2" />
                        DO's:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg leading-relaxed">
                        <li>Encash dividend/interest regularly.</li>
                        <li>Follow up promptly for missing certificates or payments.</li>
                        <li>Ensure PAN and nomination are updated.</li>
                        <li>Keep address, mobile, email updated.</li>
                        <li>Maintain correct bank details for ECS credits.</li>
                        <li>Report loss of securities promptly.</li>
                        <li>Keep copies of all documents.</li>
                        <li>Monitor corporate announcements.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
                        <ExclamationTriangleIcon className="w-6 h-6 mr-2" />
                        DON'Ts:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg leading-relaxed">
                        <li>Do not keep folios without PAN.</li>
                        <li>Do not keep folios without nomination.</li>
                        <li>Do not deal with unauthorized persons.</li>
                        <li>Do not share sensitive details with unknown persons.</li>
                    </ul>
                </div>
            </div>
        )
    },
    grievance: {
        title: 'GRIEVANCE / COMPLAINTS REDRESSAL – ESCALATION MECHANISM',
        body: (
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg leading-relaxed">
                <li>File complaints through company/RTA email; resolution within 21 days.</li>
                <li>File via SEBI SCORES 2.0 for two-level review.</li>
                <li>File via ODR platform for conciliation/arbitration.</li>
                <li>If unsatisfied, escalate via SCORES or SMART-ODR.</li>
                <li>Conciliation resolution target: 21 days.</li>
                <li>Arbitration conclusion target: 30 days + possible 30-day extension.</li>
            </ul>
        )
    }
}

export default function InvestorCharterPage() {
    const [activeTab, setActiveTab] = useState('vision')

    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section className="py-12 gradient-bg text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Investor <span style={{ color: '#008550' }}>Charter</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                            Our commitment to transparency, integrity, and investor protection
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tab Navigation - No horizontal scroll */}
            <section className="bg-gray-800 py-4 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-2">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-sm font-semibold rounded-md transition-all duration-300 ${tab.customColor
                                        ? 'text-white'
                                        : activeTab === tab.id
                                            ? `${tab.color} text-gray-900 shadow-lg transform scale-105`
                                            : `${tab.color} ${tab.hoverColor} text-gray-900 opacity-80 hover:opacity-100`
                                    }`}
                                style={tab.customColor ? {
                                    backgroundColor: tab.customColor,
                                    opacity: activeTab === tab.id ? 1 : 0.8,
                                    transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: activeTab === tab.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                                } : {}}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tab.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section - Theme gradient background */}
            <section className="bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-50 py-16 min-h-[400px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-4 border-primary-600 pb-4 inline-block">
                                {content[activeTab as keyof typeof content].title}
                            </h2>
                            <div className="mt-6">
                                {content[activeTab as keyof typeof content].body}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Need Assistance?
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Our investor relations team is here to help you with any queries or concerns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="mailto:info@nextgenregistry.com"
                                className="btn-primary inline-flex items-center"
                            >
                                📧 Email Us
                            </a>
                            <a
                                href="tel:+918178653316"
                                className="btn-outline inline-flex items-center"
                            >
                                📞 Call Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
