'use client'

import { useEffect, useState } from 'react'

import { Globe } from 'lucide-react'

import { cn } from '@/lib/utils'
import { getCookie, setCookie } from '@/lib/utils/cookies'

import { Toggle } from './ui/toggle'

export function SearchModeToggle() {
  const [isSearchMode, setIsSearchMode] = useState(true)

  useEffect(() => {
    const savedMode = getCookie('search-mode')
    if (savedMode !== null) {
      setIsSearchMode(savedMode === 'true')
    } else {
      setCookie('search-mode', 'true')
    }
  }, [])

  const handleSearchModeChange = (pressed: boolean) => {
    setIsSearchMode(pressed)
    setCookie('search-mode', pressed.toString())
  }

  return (
    <Toggle
      aria-label="Toggle search mode"
      pressed={isSearchMode}
      onPressedChange={handleSearchModeChange}
      variant="outline"
      size="sm"
      className={cn(
        'size-9 rounded-full border border-input text-muted-foreground bg-transparent p-0',
        'data-[state=on]:bg-primary/10',
        'data-[state=on]:text-primary',
        'data-[state=on]:border-primary/20',
        'hover:bg-accent hover:text-accent-foreground transition-all'
      )}
    >
      <Globe className="size-4" />
    </Toggle>
  )
}
