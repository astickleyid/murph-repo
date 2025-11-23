'use client'

import { useEffect, useState } from 'react'

import { getBookmarks, type Bookmark } from '@/lib/bookmarks'

import { BookmarksList } from '@/components/bookmarks-list'

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBookmarks() {
      try {
        // For now, use a simple user ID (you can enhance this later with real auth)
        const userId = 'local-user'
        const data = await getBookmarks(userId)
        setBookmarks(data)
      } catch (error) {
        console.error('Error loading bookmarks:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBookmarks()
  }, [])

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bookmarked Messages</h1>
        <p className="text-muted-foreground">
          Your saved messages from conversations
        </p>
      </div>
      {loading ? (
        <div className="text-center text-muted-foreground py-8">
          Loading bookmarks...
        </div>
      ) : (
        <BookmarksList bookmarks={bookmarks} userId="local-user" />
      )}
    </div>
  )
}
