'use client'

import { useState } from 'react'

import { useChat } from '@ai-sdk/react'
import { AnimatePresence,motion } from 'framer-motion'
import { Bookmark,Check, Copy, Share2 } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { ChatShare } from './chat-share'
import { RetryButton } from './retry-button'

interface MessageActionsProps {
  message: string
  messageId: string
  reload?: () => Promise<string | null | undefined>
  chatId: string
  enableShare?: boolean
  className?: string
}

export function MessageActions({
  message,
  messageId,
  reload,
  chatId,
  enableShare,
  className
}: MessageActionsProps) {
  const { status } = useChat({
    id: chatId
  })
  const isLoading = status === 'submitted' || status === 'streaming'
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(message)
    setCopied(true)
    toast.success('Message copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shared from StickGPT',
          text: message
        })
      } catch (error) {
        // User cancelled or error occurred
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  function handleBookmark() {
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Removed bookmark' : 'Bookmarked message')
  }

  return (
    <AnimatePresence>
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'flex items-center gap-0.5 self-end',
            className
          )}
        >
          {reload && <RetryButton reload={reload} messageId={messageId} />}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="rounded-full h-8 w-8 hover:bg-accent transition-colors"
          >
            {copied ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <Copy size={14} />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="rounded-full h-8 w-8 hover:bg-accent transition-colors"
          >
            <Share2 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className="rounded-full h-8 w-8 hover:bg-accent transition-colors"
          >
            <Bookmark
              size={14}
              className={cn(bookmarked && 'fill-current text-primary')}
            />
          </Button>
          {enableShare && chatId && <ChatShare chatId={chatId} />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
