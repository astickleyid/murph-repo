'use client'

import { useEffect, useState } from 'react'

import { Command, Keyboard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const shortcuts = [
  { keys: ['/', 'or', 'Ctrl', 'K'], description: 'Focus search input' },
  { keys: ['Enter'], description: 'Submit query' },
  { keys: ['Shift', 'Enter'], description: 'New line in input' },
  { keys: ['Ctrl', 'N'], description: 'Start new chat' },
  { keys: ['Esc'], description: 'Clear input / Close dialogs' },
  { keys: ['Ctrl', '/'], description: 'Show keyboard shortcuts' }
]

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          title="Keyboard shortcuts (Ctrl+/)"
        >
          <Keyboard className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Command className="size-5 text-primary" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these shortcuts to navigate NexusAI more efficiently
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <span key={keyIndex}>
                    {key === 'or' ? (
                      <span className="text-xs text-muted-foreground px-1">
                        or
                      </span>
                    ) : (
                      <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[11px] font-medium text-muted-foreground">
                        {key}
                      </kbd>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> Press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px]">
              Ctrl
            </kbd>{' '}
            +{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px]">
              /
            </kbd>{' '}
            anytime to toggle this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
