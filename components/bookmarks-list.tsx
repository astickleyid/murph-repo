'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'
import { Bookmark, MessageSquare, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import type { Bookmark as BookmarkType } from '@/lib/bookmarks'
import { removeBookmark } from '@/lib/bookmarks'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'

interface BookmarksListProps {
  bookmarks: BookmarkType[]
  userId: string
}

export function BookmarksList({ bookmarks, userId }: BookmarksListProps) {
  const handleDelete = async (messageId: string) => {
    const success = await removeBookmark(userId, messageId)
    if (success) {
      toast.success('Bookmark removed')
      window.location.reload()
    } else {
      toast.error('Failed to remove bookmark')
    }
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Bookmark className="size-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No bookmarks yet</h3>
        <p className="text-muted-foreground max-w-md">
          Start bookmarking important messages from your conversations to find
          them easily later.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark, index) => (
        <motion.div
          key={bookmark.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            'glass-strong rounded-xl p-4 border border-border/50',
            'hover:border-border transition-all'
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="size-4 text-muted-foreground flex-shrink-0" />
                <Link
                  href={`/chat/${bookmark.chat_id}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Go to conversation
                </Link>
                <span className="text-xs text-muted-foreground">
                  {new Date(bookmark.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap break-words">
                {bookmark.content}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(bookmark.message_id)}
              className="flex-shrink-0"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
