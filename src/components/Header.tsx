'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { PhoneIcon } from '@heroicons/react/24/solid'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Our Clients', href: '/clients' },
  { name: 'RTA Forms', href: '/rta-forms' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/98 backdrop-blur-md shadow-xl border-b border-gray-200' : 'bg-white/90 backdrop-blur-sm shadow-md'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/assets/images/new-logo.png"
                  alt="NextGen Share Registry Pvt Ltd"
                  width={200}
                  height={65}
                  className="h-16 w-auto transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-800 hover:text-primary-600 px-3 py-2 text-sm font-semibold transition-all duration-200 relative group rounded-lg hover:bg-primary-50 whitespace-nowrap"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Contact Info and Client Login */}
          <div className="hidden xl:flex items-center space-x-3">
            <div className="text-xs text-gray-600 leading-tight space-y-0.5">
              <div>📧 Info@nextgenregistry.com</div>
              <div>📞 +91-8178653316</div>
              <div className="flex items-center">
                <PhoneIcon className="w-3 h-3 mr-1" />
                <span>011-45060667</span>
              </div>
            </div>
            <a
              href="https://login.nextgenregistry.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 border border-primary-600 whitespace-nowrap"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
              Client Login
            </a>
          </div>

          {/* Client Login Only for Large screens */}
          <div className="hidden lg:flex xl:hidden items-center">
            <a
              href="https://login.nextgenregistry.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 border border-primary-600 whitespace-nowrap"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
              Client Login
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary-600 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2 text-sm text-gray-600 border-t border-gray-200 mt-4">
              <div className="mb-1">📧 Info@nextgenregistry.com</div>
              <div className="mb-1">📞 +91-8178653316</div>
              <div className="mb-3 flex items-center">
                <PhoneIcon className="w-3.5 h-3.5 mr-1" />
                <span>011-45060667</span>
              </div>
              <a
                href="https://login.nextgenregistry.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                Client Login
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
