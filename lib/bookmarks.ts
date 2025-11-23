import { createClient } from '@/lib/supabase/client'

export interface Bookmark {
  id: string
  user_id: string
  chat_id: string
  message_id: string
  content: string
  created_at: string
}

// Get user's bookmarks
export async function getBookmarks(userId: string): Promise<Bookmark[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bookmarks:', error)
    return []
  }

  return data || []
}

// Add a bookmark
export async function addBookmark(
  userId: string,
  chatId: string,
  messageId: string,
  content: string
): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase
    .from('bookmarks')
    .insert({
      user_id: userId,
      chat_id: chatId,
      message_id: messageId,
      content
    })

  if (error) {
    console.error('Error adding bookmark:', error)
    return false
  }

  return true
}

// Remove a bookmark
export async function removeBookmark(
  userId: string,
  messageId: string
): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('message_id', messageId)

  if (error) {
    console.error('Error removing bookmark:', error)
    return false
  }

  return true
}

// Check if message is bookmarked
export async function isBookmarked(
  userId: string,
  messageId: string
): Promise<boolean> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('message_id', messageId)
    .single()

  if (error) {
    return false
  }

  return !!data
}
