import { createClient } from '@/lib/supabase/client'

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

/**
 * Save or update user memory
 * @param userId User ID
 * @param type Type of memory (preference, interest, interaction, context)
 * @param key Unique key for this memory (e.g., 'comparison_choice', 'topic_interest')
 * @param value Data to store (flexible JSON)
 * @param context Optional context about where/when this was captured
 * @param confidence How confident we are about this (0-1, default 1.0)
 */
export async function saveUserMemory(
  userId: string,
  type: MemoryType,
  key: string,
  value: Record<string, any>,
  context?: string,
  confidence: number = 1.0
): Promise<boolean> {
  const supabase = createClient()

  // Check if memory exists
  const { data: existing } = await supabase
    .from('user_memory')
    .select('id')
    .eq('user_id', userId)
    .eq('key', key)
    .single()

  if (existing) {
    // Update existing memory
    const { error } = await supabase
      .from('user_memory')
      .update({
        value,
        memory_type: type,
        context,
        confidence,
        last_accessed: new Date().toISOString()
      })
      .eq('id', existing.id)

    if (error) {
      console.error('Error updating user memory:', error)
      return false
    }
  } else {
    // Create new memory
    const { error } = await supabase
      .from('user_memory')
      .insert({
        user_id: userId,
        memory_type: type,
        key,
        value,
        context,
        confidence
      })

    if (error) {
      console.error('Error creating user memory:', error)
      return false
    }
  }

  return true
}

/**
 * Get user memory by key
 */
export async function getUserMemory(
  userId: string,
  key: string
): Promise<UserMemory | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_memory')
    .select('*')
    .eq('user_id', userId)
    .eq('key', key)
    .single()

  if (error) {
    console.error('Error fetching user memory:', error)
    return null
  }

  // Update last_accessed
  if (data) {
    await supabase
      .from('user_memory')
      .update({ last_accessed: new Date().toISOString() })
      .eq('id', data.id)
  }

  return data
}

/**
 * Get all user memories by type
 */
export async function getUserMemoriesByType(
  userId: string,
  type: MemoryType
): Promise<UserMemory[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_memory')
    .select('*')
    .eq('user_id', userId)
    .eq('memory_type', type)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching user memories:', error)
    return []
  }

  return data || []
}

/**
 * Get all memories for a user
 */
export async function getAllUserMemories(
  userId: string
): Promise<UserMemory[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_memory')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching all user memories:', error)
    return []
  }

  return data || []
}

/**
 * Delete a specific memory
 */
export async function deleteUserMemory(
  userId: string,
  key: string
): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase
    .from('user_memory')
    .delete()
    .eq('user_id', userId)
    .eq('key', key)

  if (error) {
    console.error('Error deleting user memory:', error)
    return false
  }

  return true
}

/**
 * Search user memories
 */
export async function searchUserMemories(
  userId: string,
  searchTerm: string
): Promise<UserMemory[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_memory')
    .select('*')
    .eq('user_id', userId)
    .or(`key.ilike.%${searchTerm}%,context.ilike.%${searchTerm}%`)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error searching user memories:', error)
    return []
  }

  return data || []
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
