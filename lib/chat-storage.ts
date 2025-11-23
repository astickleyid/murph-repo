/**
 * localStorage-based chat history storage
 * No Redis or database needed!
 */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
}

export interface Chat {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

const CHATS_KEY = 'stickgpt_chats'
const CURRENT_CHAT_KEY = 'stickgpt_current_chat'

// Helper to get chats from localStorage
function getStoredChats(): Chat[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(CHATS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading chats from localStorage:', error)
    return []
  }
}

// Helper to save chats to localStorage
function setStoredChats(chats: Chat[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats))
  } catch (error) {
    console.error('Error saving chats to localStorage:', error)
  }
}

/**
 * Get all chats
 */
export function getAllChats(): Chat[] {
  return getStoredChats().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
}

/**
 * Get a specific chat by ID
 */
export function getChat(chatId: string): Chat | null {
  const chats = getStoredChats()
  return chats.find(c => c.id === chatId) || null
}

/**
 * Create a new chat
 */
export function createChat(id: string, title: string = 'New Chat'): Chat {
  const chats = getStoredChats()
  const now = new Date().toISOString()
  
  const newChat: Chat = {
    id,
    title,
    messages: [],
    createdAt: now,
    updatedAt: now
  }
  
  chats.push(newChat)
  setStoredChats(chats)
  
  return newChat
}

/**
 * Update chat (messages, title, etc.)
 */
export function updateChat(chatId: string, updates: Partial<Chat>): boolean {
  try {
    const chats = getStoredChats()
    const index = chats.findIndex(c => c.id === chatId)
    
    if (index === -1) {
      console.warn('Chat not found:', chatId)
      return false
    }
    
    chats[index] = {
      ...chats[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    setStoredChats(chats)
    return true
  } catch (error) {
    console.error('Error updating chat:', error)
    return false
  }
}

/**
 * Add message to chat
 */
export function addMessageToChat(
  chatId: string,
  message: Omit<ChatMessage, 'id' | 'createdAt'>
): boolean {
  try {
    const chats = getStoredChats()
    const index = chats.findIndex(c => c.id === chatId)
    
    if (index === -1) {
      // Create chat if it doesn't exist
      createChat(chatId)
      return addMessageToChat(chatId, message)
    }
    
    const newMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    
    chats[index].messages.push(newMessage)
    chats[index].updatedAt = new Date().toISOString()
    
    // Auto-generate title from first user message if still "New Chat"
    if (chats[index].title === 'New Chat' && message.role === 'user') {
      const title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
      chats[index].title = title
    }
    
    setStoredChats(chats)
    return true
  } catch (error) {
    console.error('Error adding message to chat:', error)
    return false
  }
}

/**
 * Delete a chat
 */
export function deleteChat(chatId: string): boolean {
  try {
    const chats = getStoredChats()
    const filtered = chats.filter(c => c.id !== chatId)
    setStoredChats(filtered)
    return true
  } catch (error) {
    console.error('Error deleting chat:', error)
    return false
  }
}

/**
 * Get current/active chat ID
 */
export function getCurrentChatId(): string | null {
  if (typeof window === 'undefined') return null
  
  try {
    return localStorage.getItem(CURRENT_CHAT_KEY)
  } catch (error) {
    return null
  }
}

/**
 * Set current/active chat ID
 */
export function setCurrentChatId(chatId: string | null): void {
  if (typeof window === 'undefined') return
  
  try {
    if (chatId) {
      localStorage.setItem(CURRENT_CHAT_KEY, chatId)
    } else {
      localStorage.removeItem(CURRENT_CHAT_KEY)
    }
  } catch (error) {
    console.error('Error setting current chat ID:', error)
  }
}

/**
 * Clear all chats (for testing/reset)
 */
export function clearAllChats(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(CHATS_KEY)
    localStorage.removeItem(CURRENT_CHAT_KEY)
  } catch (error) {
    console.error('Error clearing chats:', error)
  }
}
