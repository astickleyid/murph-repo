'use client'

import { useCallback,useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

import {
  FileText,
  History,
  MessageCirclePlus,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  Zap} from 'lucide-react'

import { Model } from '@/lib/types/models'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'

interface CommandPaletteProps {
  models?: Model[]
  onNewChat?: () => void
  onModelChange?: (modelId: string) => void
  currentModelId?: string
  recentChats?: Array<{ id: string; title: string; timestamp: Date }>
}

export function CommandPalette({
  models = [],
  onNewChat,
  onModelChange,
  currentModelId,
  recentChats = []
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => onNewChat?.())}
          >
            <MessageCirclePlus className="mr-2 h-4 w-4" />
            <span>New Chat</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/'))}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Go to Home</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        {recentChats.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Recent Chats">
              {recentChats.slice(0, 5).map(chat => (
                <CommandItem
                  key={chat.id}
                  onSelect={() => runCommand(() => router.push(`/search/${chat.id}`))}
                >
                  <History className="mr-2 h-4 w-4" />
                  <span className="truncate">{chat.title || 'Untitled Chat'}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {models.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Switch Model">
              {models.map(model => (
                <CommandItem
                  key={model.id}
                  onSelect={() => runCommand(() => onModelChange?.(model.id))}
                >
                  {model.name.toLowerCase().includes('reasoning') || model.name.toLowerCase().includes('r1') ? (
                    <Sparkles className="mr-2 h-4 w-4" />
                  ) : (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  <span>{model.name}</span>
                  {currentModelId === model.id && (
                    <span className="ml-auto text-xs text-muted-foreground">Active</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
            {theme === 'light' && (
              <span className="ml-auto text-xs text-muted-foreground">Active</span>
            )}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
            {theme === 'dark' && (
              <span className="ml-auto text-xs text-muted-foreground">Active</span>
            )}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
