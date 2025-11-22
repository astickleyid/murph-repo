'use client'

import { useState } from 'react'

import { AnimatePresence,motion } from 'framer-motion'
import {
  Bookmark,
  Check,
  Copy,
  GitBranch,
  MoreHorizontal,
  RotateCw,
  Share2} from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface MessageActionToolbarProps {
  content: string
  messageId: string
  onRegenerate?: () => void
  onBranch?: () => void
  className?: string
  visible?: boolean
}

export function MessageActionToolbar({
  content,
  messageId,
  onRegenerate,
  onBranch,
  className,
  visible = true
}: MessageActionToolbarProps) {
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shared from StickGPT',
          text: content
        })
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      handleCopy()
    }
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Removed bookmark' : 'Bookmarked')
  }

  return (
    <AnimatePresence>
      {visible && (
        <TooltipProvider>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'flex items-center gap-1 rounded-lg border bg-background/95 backdrop-blur-sm shadow-lg px-1 py-1',
              className
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy'}</p>
              </TooltipContent>
            </Tooltip>

            {onRegenerate && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={onRegenerate}
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Regenerate</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleShare}
                >
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleBookmark}>
                  <Bookmark className={cn(
                    "mr-2 h-4 w-4",
                    bookmarked && "fill-current"
                  )} />
                  {bookmarked ? 'Remove Bookmark' : 'Bookmark'}
                </DropdownMenuItem>
                {onBranch && (
                  <DropdownMenuItem onClick={onBranch}>
                    <GitBranch className="mr-2 h-4 w-4" />
                    Branch from here
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </TooltipProvider>
      )}
    </AnimatePresence>
  )
}
