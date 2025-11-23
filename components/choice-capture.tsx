'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import { useUserMemory } from '@/hooks/use-user-memory'
import { cn } from '@/lib/utils'

interface ChoiceCaptureProps {
  userId?: string
  question: string
  choices: Array<{
    label: string
    value: string
    icon?: React.ReactNode
  }>
  memoryKey: string
  context?: string
  onSelect?: (value: string) => void
  className?: string
}

/**
 * Component to capture user choices and save to memory
 * Example usage for "Tesla vs Rivian" comparison:
 * 
 * <ChoiceCapture
 *   userId={user?.id}
 *   question="What aspect interests you most?"
 *   choices={[
 *     { label: 'Vehicles (models, specs, range)', value: 'vehicles' },
 *     { label: 'Stock performance and financials', value: 'stock' },
 *     { label: 'Technology and innovation', value: 'technology' },
 *     { label: 'Company background and strategy', value: 'strategy' },
 *   ]}
 *   memoryKey="comparison_interest_tesla_rivian"
 *   context="Tesla vs Rivian comparison"
 *   onSelect={(value) => console.log('User selected:', value)}
 * />
 */
export function ChoiceCapture({
  userId,
  question,
  choices,
  memoryKey,
  context,
  onSelect,
  className
}: ChoiceCaptureProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const { saveMemory } = useUserMemory(userId)

  const handleSelect = async (value: string) => {
    setSelected(value)

    // Save to user memory
    if (userId) {
      await saveMemory(
        'preference',
        memoryKey,
        {
          selected: value,
          question,
          timestamp: new Date().toISOString()
        },
        context,
        1.0 // High confidence since user explicitly chose
      )
    }

    // Call callback
    onSelect?.(value)
  }

  return (
    <div className={cn('w-full max-w-2xl', className)}>
      <p className="text-sm font-medium mb-4">{question}</p>
      <div className="grid gap-2">
        {choices.map((choice, index) => (
          <motion.button
            key={choice.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSelect(choice.value)}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border transition-all text-left',
              'hover:border-primary hover:bg-accent/50',
              selected === choice.value
                ? 'border-primary bg-primary/10'
                : 'border-border bg-background'
            )}
          >
            {choice.icon && (
              <div className="flex-shrink-0 text-muted-foreground">
                {choice.icon}
              </div>
            )}
            <span className="flex-1 text-sm">{choice.label}</span>
            {selected === choice.value && (
              <Check className="size-4 text-primary flex-shrink-0" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
