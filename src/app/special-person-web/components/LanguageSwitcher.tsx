'use client'

import { Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en'
    setLanguage(newLang)
    
    // Update document language attribute
    document.documentElement.lang = newLang
    
    // Announce language change to screen readers
    const statusEl = document.getElementById('statusMessage')
    if (statusEl) {
      statusEl.textContent = newLang === 'en' 
        ? 'Language changed to English' 
        : 'भाषा हिंदी में बदल गई'
    }
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white min-h-[44px] text-white font-medium"
      aria-label={language === 'en' ? t('switchToHindi') : t('switchToEnglish')}
      title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <Languages className="w-5 h-5" aria-hidden="true" />
      <span className="text-sm">
        {language === 'en' ? 'हिंदी' : 'English'}
      </span>
    </button>
  )
}
