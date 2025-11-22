'use client'

import { useState } from 'react'

import { AnimatePresence,motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Pin,
  Star
} from 'lucide-react'

import { cn } from '@/lib/utils'

interface ChatFolder {
  id: string
  name: string
  icon?: React.ReactNode
  count: number
}

interface ChatFoldersProps {
  folders: ChatFolder[]
  activeFolder: string
  onFolderChange: (folderId: string) => void
  className?: string
}

export function ChatFolders({
  folders,
  activeFolder,
  onFolderChange,
  className
}: ChatFoldersProps) {
  const [expanded, setExpanded] = useState(true)

  const defaultFolders: ChatFolder[] = [
    { id: 'all', name: 'All Chats', count: 0 },
    { id: 'pinned', name: 'Pinned', icon: <Pin className="size-3.5" />, count: 0 },
    { id: 'recent', name: 'Recent', icon: <Star className="size-3.5" />, count: 0 },
    ...folders
  ]

  return (
    <div className={cn('space-y-1', className)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-2 py-1.5 w-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {expanded ? (
          <ChevronDown className="size-3.5" />
        ) : (
          <ChevronRight className="size-3.5" />
        )}
        <span>Folders</span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-0.5 overflow-hidden"
          >
            {defaultFolders.map((folder) => {
              const isActive = activeFolder === folder.id
              const Icon = folder.icon ? (
                folder.icon
              ) : isActive ? (
                <FolderOpen className="size-3.5" />
              ) : (
                <Folder className="size-3.5" />
              )

              return (
                <motion.button
                  key={folder.id}
                  onClick={() => onFolderChange(folder.id)}
                  whileHover={{ x: 2 }}
                  className={cn(
                    'flex items-center justify-between gap-2 px-3 py-2 w-full rounded-lg text-sm transition-all',
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {Icon}
                    <span>{folder.name}</span>
                  </div>
                  {folder.count > 0 && (
                    <span
                      className={cn(
                        'text-xs px-1.5 py-0.5 rounded-full',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {folder.count}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
