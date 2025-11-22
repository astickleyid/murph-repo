'use client'

import { useState } from 'react'
import Link from 'next/link'

import { motion } from 'framer-motion'

import { SearchResultItem } from '@/lib/types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export interface SearchResultsProps {
  results: SearchResultItem[]
  displayMode?: 'grid' | 'list'
}

export function SearchResults({
  results,
  displayMode = 'grid'
}: SearchResultsProps) {
  // State to manage whether to display the results
  const [showAllResults, setShowAllResults] = useState(false)

  const handleViewMore = () => {
    setShowAllResults(true)
  }

  // Logic for grid mode
  const displayedGridResults = showAllResults ? results : results.slice(0, 3)
  const additionalResultsCount = results.length > 3 ? results.length - 3 : 0
  const displayUrlName = (url: string) => {
    const hostname = new URL(url).hostname
    const parts = hostname.split('.')
    return parts.length > 2 ? parts.slice(1, -1).join('.') : parts[0]
  }

  // --- List Mode Rendering ---
  if (displayMode === 'list') {
    return (
      <div className="flex flex-col gap-2">
        {results.map((result, index) => (
          <motion.div
            key={result.url}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: Math.min(index * 0.05, 1),
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <Link href={result.url} passHref target="_blank" className="block">
              <Card className="w-full hover:bg-muted/50 transition-all duration-200 hover:shadow-sm">
                <CardContent className="p-2 flex items-start space-x-2">
                <Avatar className="h-4 w-4 mt-1 flex-shrink-0">
                  <AvatarImage
                    src={`https://www.google.com/s2/favicons?domain=${
                      new URL(result.url).hostname
                    }`}
                    alt={new URL(result.url).hostname}
                  />
                  <AvatarFallback className="text-xs">
                    {new URL(result.url).hostname[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden space-y-0.5">
                  <p className="text-sm font-medium line-clamp-1">
                    {result.title || new URL(result.url).pathname}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {result.content}
                  </p>
                  <div className="text-xs text-muted-foreground/80 mt-1 truncate">
                    <span className="underline">
                      {new URL(result.url).hostname}
                    </span>{' '}
                    - {index + 1}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          </motion.div>
        ))}
      </div>
    )
  }

  // --- Grid Mode Rendering (Enhanced with better responsive layout) ---
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {displayedGridResults.map((result, index) => (
        <motion.div
          key={result.url}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <Link href={result.url} passHref target="_blank">
            <Card className="h-full hover:bg-muted/50 transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
              <CardContent className="p-3 flex flex-col justify-between h-full min-h-[100px]">
                <p className="text-xs line-clamp-2 min-h-[2rem] font-medium">
                  {result.title || result.content}
                </p>
                <div className="mt-2 flex items-center space-x-1">
                  <Avatar className="h-4 w-4 flex-shrink-0">
                    <AvatarImage
                      src={`https://www.google.com/s2/favicons?domain=${
                        new URL(result.url).hostname
                      }`}
                      alt={new URL(result.url).hostname}
                    />
                    <AvatarFallback className="text-[8px]">
                      {new URL(result.url).hostname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs text-muted-foreground truncate">
                    {`${displayUrlName(result.url)} - ${index + 1}`}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
      {!showAllResults && additionalResultsCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: displayedGridResults.length * 0.05,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <Card className="h-full flex items-center justify-center min-h-[100px] hover:bg-muted/50 transition-all">
            <CardContent className="p-3">
              <Button
                variant={'link'}
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={handleViewMore}
              >
                View {additionalResultsCount} more
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
