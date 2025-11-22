'use client'

import { cn } from '@/lib/utils'

import { Skeleton } from '@/components/ui/skeleton'

export function MessageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4 p-4', className)}>
      {/* User message skeleton */}
      <div className="flex justify-end">
        <div className="max-w-[80%] space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      {/* Assistant message skeleton */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="grid gap-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-2 p-3 border rounded-lg">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CodeBlockSkeleton() {
  return (
    <div className="rounded-lg border bg-muted/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
