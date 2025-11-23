export interface Bookmark {
  id: string
  user_id: string
  chat_id: string
  message_id: string
  content: string
  created_at: string
}

const BOOKMARKS_KEY = 'stickgpt_bookmarks'

// Helper to get bookmarks from localStorage
function getStoredBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading bookmarks from localStorage:', error)
    return []
  }
}

// Helper to save bookmarks to localStorage
function setStoredBookmarks(bookmarks: Bookmark[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  } catch (error) {
    console.error('Error saving bookmarks to localStorage:', error)
  }
}

// Get user's bookmarks
export async function getBookmarks(userId: string): Promise<Bookmark[]> {
  try {
    const bookmarks = getStoredBookmarks()
    return bookmarks
      .filter(b => b.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return []
  }
}

// Add a bookmark
export async function addBookmark(
  userId: string,
  chatId: string,
  messageId: string,
  content: string
): Promise<boolean> {
  try {
    const bookmarks = getStoredBookmarks()
    
    // Check if already bookmarked
    const exists = bookmarks.some(
      b => b.user_id === userId && b.message_id === messageId
    )
    
    if (exists) {
      return true // Already bookmarked
    }

    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      user_id: userId,
      chat_id: chatId,
      message_id: messageId,
      content,
      created_at: new Date().toISOString()
    }

    bookmarks.push(newBookmark)
    setStoredBookmarks(bookmarks)
    return true
  } catch (error) {
    console.error('Error adding bookmark:', error)
    return false
  }
}

// Remove a bookmark
export async function removeBookmark(
  userId: string,
  messageId: string
): Promise<boolean> {
  try {
    const bookmarks = getStoredBookmarks()
    const filtered = bookmarks.filter(
      b => !(b.user_id === userId && b.message_id === messageId)
    )
    setStoredBookmarks(filtered)
    return true
  } catch (error) {
    console.error('Error removing bookmark:', error)
    return false
  }
}

// Check if message is bookmarked
export async function isBookmarked(
  userId: string,
  messageId: string
): Promise<boolean> {
  try {
    const bookmarks = getStoredBookmarks()
    return bookmarks.some(
      b => b.user_id === userId && b.message_id === messageId
    )
  } catch (error) {
    console.error('Error checking bookmark:', error)
    return false
  }
}
