export interface UserMemory {
  id: string
  user_id: string
  memory_type: 'preference' | 'interest' | 'interaction' | 'context'
  key: string
  value: Record<string, any>
  context?: string
  confidence: number
  created_at: string
  updated_at: string
  last_accessed: string
}

export type MemoryType = UserMemory['memory_type']

const STORAGE_KEY = 'stickgpt_user_memory'

// Helper to get all memories from localStorage
function getStoredMemories(): UserMemory[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

// Helper to save memories to localStorage
function setStoredMemories(memories: UserMemory[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories))
  } catch (error) {
    console.error('Error writing to localStorage:', error)
  }
}

/**
 * Save or update user memory (localStorage version - no database needed!)
 */
export async function saveUserMemory(
  userId: string,
  type: MemoryType,
  key: string,
  value: Record<string, any>,
  context?: string,
  confidence: number = 1.0
): Promise<boolean> {
  try {
    const memories = getStoredMemories()
    const now = new Date().toISOString()
    
    // Find existing memory
    const existingIndex = memories.findIndex(
      m => m.user_id === userId && m.key === key
    )

    if (existingIndex >= 0) {
      // Update existing
      memories[existingIndex] = {
        ...memories[existingIndex],
        value,
        memory_type: type,
        context,
        confidence,
        updated_at: now,
        last_accessed: now
      }
    } else {
      // Create new
      memories.push({
        id: crypto.randomUUID(),
        user_id: userId,
        memory_type: type,
        key,
        value,
        context,
        confidence,
        created_at: now,
        updated_at: now,
        last_accessed: now
      })
    }

    setStoredMemories(memories)
    return true
  } catch (error) {
    console.error('Error saving user memory:', error)
    return false
  }
}

/**
 * Get user memory by key
 */
export async function getUserMemory(
  userId: string,
  key: string
): Promise<UserMemory | null> {
  try {
    const memories = getStoredMemories()
    const memory = memories.find(
      m => m.user_id === userId && m.key === key
    )

    if (memory) {
      // Update last_accessed
      memory.last_accessed = new Date().toISOString()
      setStoredMemories(memories)
    }

    return memory || null
  } catch (error) {
    console.error('Error getting user memory:', error)
    return null
  }
}

/**
 * Get all user memories by type
 */
export async function getUserMemoriesByType(
  userId: string,
  type: MemoryType
): Promise<UserMemory[]> {
  try {
    const memories = getStoredMemories()
    return memories
      .filter(m => m.user_id === userId && m.memory_type === type)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  } catch (error) {
    console.error('Error getting user memories by type:', error)
    return []
  }
}

/**
 * Get all memories for a user
 */
export async function getAllUserMemories(
  userId: string
): Promise<UserMemory[]> {
  try {
    const memories = getStoredMemories()
    return memories
      .filter(m => m.user_id === userId)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  } catch (error) {
    console.error('Error getting all user memories:', error)
    return []
  }
}

/**
 * Delete a specific memory
 */
export async function deleteUserMemory(
  userId: string,
  key: string
): Promise<boolean> {
  try {
    const memories = getStoredMemories()
    const filtered = memories.filter(
      m => !(m.user_id === userId && m.key === key)
    )
    setStoredMemories(filtered)
    return true
  } catch (error) {
    console.error('Error deleting user memory:', error)
    return false
  }
}

/**
 * Search user memories
 */
export async function searchUserMemories(
  userId: string,
  searchTerm: string
): Promise<UserMemory[]> {
  try {
    const memories = getStoredMemories()
    const term = searchTerm.toLowerCase()
    return memories
      .filter(m => 
        m.user_id === userId && 
        (m.key.toLowerCase().includes(term) || 
         m.context?.toLowerCase().includes(term))
      )
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  } catch (error) {
    console.error('Error searching user memories:', error)
    return []
  }
}

/**
 * Get user context for AI - returns formatted string of relevant memories
 */
export async function getUserContextForAI(
  userId: string,
  limit: number = 10
): Promise<string> {
  const memories = await getAllUserMemories(userId)
  
  if (memories.length === 0) {
    return 'No previous context available.'
  }

  const recentMemories = memories.slice(0, limit)
  
  const contextParts = recentMemories.map(memory => {
    const valueStr = JSON.stringify(memory.value)
    return `[${memory.memory_type}] ${memory.key}: ${valueStr}${memory.context ? ` (${memory.context})` : ''}`
  })

  return `User Context:\n${contextParts.join('\n')}`
}
