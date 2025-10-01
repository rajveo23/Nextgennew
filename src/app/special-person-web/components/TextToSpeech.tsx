'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function TextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const chunksRef = useRef<string[]>([])
  const currentChunkRef = useRef(0)
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
      chunksRef.current = []
      currentChunkRef.current = 0
    }
  }, [language])

  const speakChunk = (chunkIndex: number, voice: SpeechSynthesisVoice | null) => {
    if (chunkIndex >= chunksRef.current.length) {
      // All chunks spoken
      setIsSpeaking(false)
      chunksRef.current = []
      currentChunkRef.current = 0
      return
    }

    const chunk = chunksRef.current[chunkIndex]
    const utterance = new SpeechSynthesisUtterance(chunk)
    
    utterance.lang = language === 'en' ? 'en-US' : 'hi-IN'
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1
    
    if (voice) {
      utterance.voice = voice
    }
    
    utterance.onend = () => {
      currentChunkRef.current++
      speakChunk(currentChunkRef.current, voice)
    }
    
    utterance.onerror = (event) => {
      console.error('TTS Error:', event.error)
      setIsSpeaking(false)
      chunksRef.current = []
      currentChunkRef.current = 0
    }
    
    window.speechSynthesis.speak(utterance)
  }

  const toggleSpeech = () => {
    if (!isSupported) {
      alert('Text-to-speech is not supported in your browser.')
      return
    }

    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      chunksRef.current = []
      currentChunkRef.current = 0
      return
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    // Get the text to speak
    const text = getFullPageContent()
    
    // Split text into smaller chunks (200 characters each to avoid interruption)
    const chunkSize = 200
    const chunks: string[] = []
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.substring(i, i + chunkSize))
    }
    
    chunksRef.current = chunks
    currentChunkRef.current = 0
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices()
    
    // Find appropriate voice
    let selectedVoice = null
    if (language === 'hi') {
      selectedVoice = voices.find(v => v.lang === 'hi-IN') ||
                     voices.find(v => v.lang.startsWith('hi')) ||
                     voices.find(v => v.name.toLowerCase().includes('hindi'))
    } else {
      selectedVoice = voices.find(v => v.lang === 'en-US') ||
                     voices.find(v => v.lang.startsWith('en'))
    }
    
    setIsSpeaking(true)
    speakChunk(0, selectedVoice || null)
  }

  if (!isSupported) {
    return null
  }

  return (
    <button
      onClick={toggleSpeech}
      className="p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
      aria-label={isSpeaking ? 'Stop Reading' : 'Read Aloud'}
      aria-pressed={isSpeaking}
      title={isSpeaking ? 'Stop reading' : 'Read aloud'}
      type="button"
    >
      <span className="sr-only">{isSpeaking ? 'Stop Reading' : 'Read Aloud'}</span>
      {isSpeaking ? (
        <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
      ) : (
        <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
      )}
    </button>
  )
}
