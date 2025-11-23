'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'

import type { MemoryType } from '@/lib/user-memory'
import {
  deleteUserMemory,
  getAllUserMemories,
  getUserMemory,
  getUserMemoriesByType,
  saveUserMemory
} from '@/lib/user-memory'

export function useUserMemory(userId?: string) {
  const saveMemory = useCallback(
    async (
      type: MemoryType,
      key: string,
      value: Record<string, any>,
      context?: string,
      confidence?: number
    ) => {
      if (!userId) {
        console.warn('No user ID provided to saveMemory')
        return false
      }

      const success = await saveUserMemory(
        userId,
        type,
        key,
        value,
        context,
        confidence
      )

      if (success) {
        console.log('Memory saved:', { type, key, value })
      }

      return success
    },
    [userId]
  )

  const getMemory = useCallback(
    async (key: string) => {
      if (!userId) return null
      return await getUserMemory(userId, key)
    },
    [userId]
  )

  const getMemoriesByType = useCallback(
    async (type: MemoryType) => {
      if (!userId) return []
      return await getUserMemoriesByType(userId, type)
    },
    [userId]
  )

  const getAllMemories = useCallback(async () => {
    if (!userId) return []
    return await getAllUserMemories(userId)
  }, [userId])

  const deleteMemory = useCallback(
    async (key: string) => {
      if (!userId) return false
      const success = await deleteUserMemory(userId, key)
      if (success) {
        toast.success('Memory deleted')
      }
      return success
    },
    [userId]
  )

  return {
    saveMemory,
    getMemory,
    getMemoriesByType,
    getAllMemories,
    deleteMemory
  }
}
