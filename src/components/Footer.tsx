'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const footerLinks = {
  services: [
    'ISIN Creation',
    'Demat Services', 
    'Corporate Actions',
    'E-Voting',
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Clients', href: '/clients' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ],
  resources: [
    { name: 'RTA Forms', href: '/rta-forms' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Investor Charter', href: '/investor-charter' },
    { name: 'Grievances', href: '/grievances' },
  ],
  regulatory: [
    { name: 'SEBI', href: 'https://www.sebi.gov.in/' },
    { name: 'NSE', href: 'https://www.nseindia.com/' },
    { name: 'BSE', href: 'https://www.bseindia.com/' },
    { name: 'NSDL', href: 'https://www.nsdl.co.in/' },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src="/assets/images/nextgen-logo.svg"
                  alt="NextGen Registry"
                  width={120}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
                <span className="ml-3 text-xl font-bold">NextGen Registry</span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                SEBI Registered Registrar & Share Transfer Agent with 27+ years of capital market experience. 
                Providing transparent, reliable, and efficient RTA services across India.
              </p>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div><strong>CIN:</strong> U66190DL2024PTC431604</div>
                <div><strong>SEBI Regn. No.:</strong> INR000004422</div>
                <div><strong>NSDL ID:</strong> IN201177</div>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((service) => (
                  <li key={service} className="text-gray-300">
                    • {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Contact Info */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                301, 3RD FLOOR, PRATAP CHAMBERS,<br />
                GURUDWARA ROAD, KAROL BAGH,<br />
                New Delhi, 110005
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-gray-300 text-sm">
                📞 +91-8178653316 / 011-45060667<br />
                📧 Info@nextgenregistry.com
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Grievances</h4>
              <p className="text-gray-300 text-sm">
                📧 nextgen.rta.investor@gmail.com<br />
                🌐 <Link href="https://scores.sebi.gov.in/" className="hover:text-white">SEBI SCORES</Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Regulatory Links */}
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h4 className="font-semibold mb-4 text-center">Regulatory Partners</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.regulatory.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-1 border border-gray-700 rounded-full hover:border-gray-500"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NextGen Share Registry Pvt Ltd. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
