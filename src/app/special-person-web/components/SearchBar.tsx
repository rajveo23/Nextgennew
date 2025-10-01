'use client'

import { useState, FormEvent } from 'react'

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    
    // Announce search to screen readers
    const statusEl = document.getElementById('statusMessage')
    if (statusEl) {
      statusEl.textContent = `Searching for ${searchQuery}`
    }
    
    // Simulate search (replace with actual search implementation)
    setTimeout(() => {
      setIsSearching(false)
      if (statusEl) {
        statusEl.textContent = `Search completed for ${searchQuery}`
      }
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSearch} role="search" aria-label="Site search">
        <div className="flex gap-2">
          <label htmlFor="search-input" className="sr-only">
            Search the website
          </label>
          <input
            id="search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for services, forms, or information..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 text-gray-900"
            aria-describedby="search-help"
          />
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed min-h-[44px] min-w-[100px]"
            aria-busy={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        <p id="search-help" className="text-sm text-gray-600 mt-2">
          Search for ISIN services, RTA forms, e-voting, or any information on our website
        </p>
      </form>
    </div>
  )
}
