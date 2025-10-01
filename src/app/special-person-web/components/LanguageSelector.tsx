'use client'

import { useState } from 'react'

export default function LanguageSelector() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en')

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang)
    // Update document language attribute
    document.documentElement.lang = lang
    
    // Announce language change to screen readers
    const statusEl = document.getElementById('statusMessage')
    if (statusEl) {
      statusEl.textContent = lang === 'en' 
        ? 'Language changed to English' 
        : 'भाषा हिंदी में बदल गई'
    }
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language selection">
      <span className="text-sm text-gray-700 font-medium">Language:</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 ${
          language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('hi')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 ${
          language === 'hi'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-pressed={language === 'hi'}
        aria-label="हिंदी में बदलें"
      >
        हिंदी
      </button>
    </div>
  )
}
