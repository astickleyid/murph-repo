'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Message } from 'ai'
import { motion } from 'framer-motion'
import { ArrowUp, ChevronDown, MessageCirclePlus, Square } from 'lucide-react'

import { Model } from '@/lib/types/models'
import { cn } from '@/lib/utils'

import { useSmartInput } from '@/hooks/use-smart-input'

import { useArtifact } from './artifact/artifact-context'
import { Button } from './ui/button'
import { CenterLogo } from './center-logo'
import { EmptyScreen } from './empty-screen'
import { ModelSelector } from './model-selector'
import { SearchModeToggle } from './search-mode-toggle'
import { SmartInput } from './smart-input'

interface ChatPanelProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  messages: Message[]
  setMessages: (messages: Message[]) => void
  query?: string
  stop: () => void
  append: (message: any) => void
  models?: Model[]
  /** Whether to show the scroll to bottom button */
  showScrollToBottomButton: boolean
  /** Reference to the scroll container */
  scrollContainerRef: React.RefObject<HTMLDivElement>
}

export function ChatPanel({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
  setMessages,
  query,
  stop,
  append,
  models,
  showScrollToBottomButton,
  scrollContainerRef
}: ChatPanelProps) {
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true)
  const [isComposing, setIsComposing] = useState(false) // Composition state
  const [enterDisabled, setEnterDisabled] = useState(false) // Disable Enter after composition ends
  const { close: closeArtifact } = useArtifact()
  const { recentQueries, addQuery, suggestions } = useSmartInput()

  const handleCompositionStart = () => setIsComposing(true)

  const handleCompositionEnd = () => {
    setIsComposing(false)
    setEnterDisabled(true)
    setTimeout(() => {
      setEnterDisabled(false)
    }, 300)
  }

  const handleNewChat = () => {
    setMessages([])
    closeArtifact()
    router.push('/')
  }

  const isToolInvocationInProgress = () => {
    if (!messages.length) return false

    const lastMessage = messages[messages.length - 1]
    if (lastMessage.role !== 'assistant' || !lastMessage.parts) return false

    const parts = lastMessage.parts
    const lastPart = parts[parts.length - 1]

    return (
      lastPart?.type === 'tool-invocation' &&
      lastPart?.toolInvocation?.state === 'call'
    )
  }

  // if query is not empty, submit the query
  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      append({
        role: 'user',
        content: query
      })
      isFirstRender.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // Scroll to the bottom of the container
  const handleScrollToBottom = () => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div
        className={cn(
          'w-full bg-background group/form-container shrink-0',
          messages.length > 0 ? 'sticky bottom-0 px-2 pb-4' : 'px-6'
        )}
      >
        {messages.length === 0 && (
          <div className="mb-10 flex flex-col items-center gap-8">
            <CenterLogo hasMessages={false} />
            <p className="text-center text-3xl font-semibold">
              How can I help you today?
            </p>
          </div>
        )}
        {messages.length > 0 && (
          <CenterLogo hasMessages={true} />
        )}
      <form
        onSubmit={handleSubmit}
        className={cn('max-w-3xl w-full mx-auto relative')}
      >
        {/* Scroll to bottom button - only shown when showScrollToBottomButton is true */}
        {showScrollToBottomButton && messages.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute -top-10 right-4 z-20 size-8 rounded-full shadow-md"
            onClick={handleScrollToBottom}
            title="Scroll to bottom"
          >
            <ChevronDown size={16} />
          </Button>
        )}

        <div className="relative flex flex-col w-full gap-2 glass-strong rounded-3xl shadow-lg hover:shadow-xl hover:shadow-[hsl(210,100%,50%)]/5 focus-within:shadow-[hsl(210,100%,50%)]/10 focus-within:border-[hsl(210,100%,50%)]/20 transition-all duration-300">
          <SmartInput
            inputRef={inputRef}
            value={input}
            disabled={isLoading || isToolInvocationInProgress()}
            placeholder="Ask a question..."
            recentQueries={recentQueries}
            suggestions={suggestions}
            onSelectSuggestion={(suggestion) => {
              // Set the input value
              handleInputChange({
                target: { value: suggestion }
              } as React.ChangeEvent<HTMLTextAreaElement>)
              addQuery(suggestion)
              // Directly trigger submission
              setTimeout(() => {
                if (handleSubmit) {
                  const fakeEvent = {
                    preventDefault: () => {},
                    currentTarget: inputRef.current?.form
                  } as React.FormEvent<HTMLFormElement>
                  handleSubmit(fakeEvent)
                }
              }, 100)
            }}
            onChange={e => {
              handleInputChange(e)
              setShowEmptyScreen(e.target.value.length === 0)
            }}
            onKeyDown={e => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !isComposing &&
                !enterDisabled
              ) {
                if (input.trim().length === 0) {
                  e.preventDefault()
                  return
                }
                e.preventDefault()
                addQuery(input.trim())
                const textarea = e.target as HTMLTextAreaElement
                textarea.form?.requestSubmit()
              }
            }}
            onFocus={() => setShowEmptyScreen(true)}
            onBlur={() => setShowEmptyScreen(false)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />

          {/* Bottom menu area */}
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <ModelSelector models={models || []} />
              <SearchModeToggle />
            </div>
            <div className="flex items-center gap-1.5">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleNewChat}
                  disabled={isLoading || isToolInvocationInProgress()}
                  className="size-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all disabled:opacity-50"
                >
                  <MessageCirclePlus className="size-4" />
                </button>
              )}
              <button
                type={isLoading ? 'button' : 'submit'}
                disabled={
                  (input.length === 0 && !isLoading) ||
                  isToolInvocationInProgress()
                }
                onClick={isLoading ? stop : undefined}
                className={cn(
                  'size-9 rounded-full flex items-center justify-center',
                  'bg-[hsl(210,100%,50%)] text-white',
                  'hover:bg-[hsl(210,100%,45%)] hover:shadow-md hover:shadow-[hsl(210,100%,50%)]/25 transition-all',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isLoading && 'animate-pulse'
                )}
              >
                {isLoading ? <Square className="size-4" /> : <ArrowUp className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        {messages.length === 0 && (
          <EmptyScreen
            submitMessage={message => {
              handleInputChange({
                target: { value: message }
              } as React.ChangeEvent<HTMLTextAreaElement>)
            }}
            className={cn(showEmptyScreen ? 'visible' : 'invisible')}
          />
        )}
      </form>
      </div>
    </>
  )
}
