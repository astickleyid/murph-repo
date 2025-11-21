'use client'

import { useState } from 'react'

import {
  ArrowUp,
  Bot,
  HelpCircle,
  MessageCircle,
  Plus,
  X
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface FloatingActionsProps {
  onNewChat?: () => void
  onScrollToTop?: () => void
  className?: string
}

export function FloatingActions({
  onNewChat,
  onScrollToTop,
  className
}: FloatingActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: MessageCircle,
      label: 'New Chat',
      onClick: onNewChat,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: ArrowUp,
      label: 'Scroll to Top',
      onClick: onScrollToTop,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: HelpCircle,
      label: 'Help',
      onClick: () => {
        // Open keyboard shortcuts as help
        const event = new KeyboardEvent('keydown', {
          key: '/',
          ctrlKey: true,
          bubbles: true
        })
        document.dispatchEvent(event)
      },
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      {/* Action buttons */}
      <div
        className={cn(
          'flex flex-col-reverse gap-3 mb-3 transition-all duration-300',
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-center gap-2 justify-end group"
          >
            <span
              className={cn(
                'text-xs bg-card text-card-foreground px-3 py-1.5 rounded-full shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap',
                isOpen && 'opacity-100'
              )}
            >
              {action.label}
            </span>
            <Button
              size="icon"
              className={cn(
                'rounded-full shadow-lg hover:shadow-xl transition-all-smooth bg-gradient-to-br text-white hover:scale-110',
                action.gradient
              )}
              onClick={action.onClick}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main toggle button */}
      <Button
        size="icon"
        className="rounded-full shadow-xl hover:shadow-2xl gradient-primary text-white w-14 h-14 transition-all-smooth hover:rotate-180"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Bot className="h-6 w-6" />
        )}
      </Button>
    </div>
  )
}
