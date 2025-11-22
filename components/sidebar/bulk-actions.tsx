'use client'

import { useState } from 'react'

import { AnimatePresence,motion } from 'framer-motion'
import { Archive, Check, Trash2, X } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface BulkActionsProps {
  selectedCount: number
  onDelete: () => void
  onArchive: () => void
  onCancel: () => void
  className?: string
}

export function BulkActions({
  selectedCount,
  onDelete,
  onArchive,
  onCancel,
  className
}: BulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
          'glass-strong rounded-full shadow-lg px-4 py-3',
          'flex items-center gap-3',
          className
        )}
      >
        <div className="flex items-center gap-2 px-2">
          <Check className="size-4 text-primary" />
          <span className="text-sm font-medium">
            {selectedCount} selected
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onArchive}
            className="h-8 px-3"
          >
            <Archive className="size-4 mr-1.5" />
            Archive
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-4 mr-1.5" />
            Delete
          </Button>
        </div>

        <div className="h-6 w-px bg-border" />

        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <X className="size-4" />
        </Button>
      </motion.div>
    </AnimatePresence>
  )
}
