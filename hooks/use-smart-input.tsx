'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'stickgpt-recent-queries'
const MAX_RECENT = 10

export function useSmartInput() {
  const [recentQueries, setRecentQueries] = useState<string[]>([])

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentQueries(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load recent queries:', error)
    }
  }, [])

  const addQuery = (query: string) => {
    if (!query || query.trim().length < 3) return

    setRecentQueries(prev => {
      // Remove duplicates and add to front
      const filtered = prev.filter(q => q !== query)
      const updated = [query, ...filtered].slice(0, MAX_RECENT)
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Failed to save recent queries:', error)
      }
      
      return updated
    })
  }

  const clearRecentQueries = () => {
    setRecentQueries([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear recent queries:', error)
    }
  }

  // Popular/suggested queries
  const suggestions = [
    'What is DeepSeek R1?',
    'Explain quantum computing',
    'Latest AI developments',
    'Compare React vs Vue',
    'How does blockchain work?',
    'Best practices for TypeScript',
    'What is machine learning?',
    'Explain neural networks',
    'Latest tech trends 2025',
    'How to optimize web performance?'
  ]

  return {
    recentQueries,
    addQuery,
    clearRecentQueries,
    suggestions
  }
}
