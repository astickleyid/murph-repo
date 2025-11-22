'use client'

import { useState } from 'react'

import { Search, X } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'

interface SidebarSearchProps {
  onSearch: (query: string) => void
  className?: string
}

export function SidebarSearch({ onSearch, className }: SidebarSearchProps) {
  const [query, setQuery] = useState('')

  const handleChange = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search chats..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-9 pr-9 h-9 bg-muted/50 border-none focus-visible:ring-1"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
