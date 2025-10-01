'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Accessibility } from 'lucide-react'

export default function FloatingAccessibilityButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href="/special-person-web"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Go to Accessible Portal"
    >
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
          Accessible Portal
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
      
      {/* Button */}
      <div className="relative">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
        
        {/* Main button */}
        <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
          <Accessibility className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}
