'use client'

import { useEffect, useRef, useState } from 'react'
import Textarea from 'react-textarea-autosize'

import { AnimatePresence,motion } from 'framer-motion'
import { Clock, Sparkles, TrendingUp } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SmartInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onFocus?: () => void
  onBlur?: () => void
  onCompositionStart?: () => void
  onCompositionEnd?: () => void
  disabled?: boolean
  placeholder?: string
  inputRef?: React.RefObject<HTMLTextAreaElement>
  recentQueries?: string[]
  suggestions?: string[]
  onSelectSuggestion?: (suggestion: string) => void
}

export function SmartInput({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  onCompositionStart,
  onCompositionEnd,
  disabled,
  placeholder = 'Ask a question...',
  inputRef,
  recentQueries = [],
  suggestions = [],
  onSelectSuggestion
}: SmartInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Sample suggestions based on value
  const filteredSuggestions = value.length > 2
    ? suggestions.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 3)
    : []

  const recentSuggestions = value.length === 0 && recentQueries.length > 0
    ? recentQueries.slice(0, 3)
    : []

  const allSuggestions = [...filteredSuggestions, ...recentSuggestions]

  useEffect(() => {
    setShowSuggestions(allSuggestions.length > 0 && (value.length > 0 || recentSuggestions.length > 0))
  }, [value, allSuggestions.length, recentSuggestions.length])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSuggestions && allSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        )
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        return
      }
      if (e.key === 'Tab' && selectedIndex >= 0) {
        e.preventDefault()
        onSelectSuggestion?.(allSuggestions[selectedIndex])
        setShowSuggestions(false)
        return
      }
    }
    onKeyDown(e)
  }

  return (
    <div className="relative w-full">
      <Textarea
        ref={inputRef}
        name="input"
        rows={2}
        maxRows={5}
        tabIndex={0}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        placeholder={placeholder}
        spellCheck={false}
        value={value}
        disabled={disabled}
        className={cn(
          "resize-none w-full min-h-12 bg-transparent border-0 p-4 text-sm",
          "placeholder:text-muted-foreground focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200"
        )}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          onFocus?.()
          setShowSuggestions(true)
        }}
        onBlur={(e) => {
          onBlur?.()
          // Don't hide if clicking inside suggestions
          const relatedTarget = e.relatedTarget as HTMLElement
          if (relatedTarget?.closest('.suggestions-dropdown')) {
            return
          }
          setTimeout(() => setShowSuggestions(false), 300)
        }}
      />

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && allSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 right-0 mb-2 glass-strong rounded-xl p-2 shadow-xl z-50"
          >
            <div className="space-y-1">
              {allSuggestions.map((suggestion, index) => {
                const isRecent = recentSuggestions.includes(suggestion)
                const Icon = isRecent ? Clock : value.length > 0 ? Sparkles : TrendingUp
                
                return (
                  <motion.button
                    key={index}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Suggestion clicked:', suggestion)
                      onSelectSuggestion?.(suggestion)
                      setShowSuggestions(false)
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg",
                      "text-sm text-left transition-all duration-150",
                      "hover:bg-accent/50 cursor-pointer",
                      selectedIndex === index && "bg-accent"
                    )}
                  >
                    <Icon className="size-3.5 flex-shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate">{suggestion}</span>
                    {selectedIndex === index && (
                      <span className="text-xs text-muted-foreground">Tab</span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
