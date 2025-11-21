'use client'

import { cn } from '@/lib/utils'

interface LoadingDotsProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingDots({ className, size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <div
        className={cn(
          sizeClasses[size],
          'bg-primary rounded-full animate-bounce'
        )}
        style={{ animationDelay: '0ms', animationDuration: '1s' }}
      />
      <div
        className={cn(
          sizeClasses[size],
          'bg-primary rounded-full animate-bounce'
        )}
        style={{ animationDelay: '150ms', animationDuration: '1s' }}
      />
      <div
        className={cn(
          sizeClasses[size],
          'bg-primary rounded-full animate-bounce'
        )}
        style={{ animationDelay: '300ms', animationDuration: '1s' }}
      />
    </div>
  )
}
