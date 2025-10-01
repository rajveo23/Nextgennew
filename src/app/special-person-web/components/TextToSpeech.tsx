'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function TextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const { language, t, getFullPageContent } = useLanguage()

  useEffect(() => {
    // Check if speech synthesis is supported
    setIsSupported('speechSynthesis' in window)
  }, [])

  // Stop speaking when language changes
  useEffect(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [language])

  const toggleSpeech = () => {
    if (!isSupported) {
      alert('Text-to-speech is not supported in your browser.')
      return
    }

    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      // Start speaking - read full page content
      const text = getFullPageContent()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN'
      utterance.rate = 0.9
      utterance.pitch = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <button
      onClick={toggleSpeech}
      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label={isSpeaking ? t('stopReading') : t('readAloud')}
      aria-pressed={isSpeaking}
      title={isSpeaking ? t('stopReading') : t('readAloud')}
    >
      {isSpeaking ? (
        <VolumeX className="w-6 h-6 text-white" aria-hidden="true" />
      ) : (
        <Volume2 className="w-6 h-6 text-white" aria-hidden="true" />
      )}
    </button>
  )
}
