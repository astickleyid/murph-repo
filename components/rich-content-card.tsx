'use client'

import { useMemo } from 'react'

import { motion } from 'framer-motion'
import {
  ExternalLink,
  MessageCircle,
  Newspaper,
  Trophy,
  Twitter,
  Video,
  X
} from 'lucide-react'

import { SearchResultItem } from '@/lib/types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

// Content type detection
type ContentType =
  | 'sports_score'
  | 'social_post'
  | 'news'
  | 'video'
  | 'general'

interface RichContentCardProps {
  result: SearchResultItem
  query: string
  index: number
}

// Detect content type based on URL and content
function detectContentType(result: SearchResultItem, query: string): ContentType {
  const url = result.url.toLowerCase()
  const content = (result.content || '').toLowerCase()
  const title = (result.title || '').toLowerCase()
  const queryLower = query.toLowerCase()

  // Sports detection
  const sportsKeywords = ['score', 'game', 'match', 'vs', 'final', 'win', 'loss', 'championship', 'playoff', 'nfl', 'nba', 'mlb', 'nhl', 'football', 'basketball', 'baseball', 'hockey', 'soccer']
  const sportsSites = ['espn.com', 'sports.yahoo.com', 'cbssports.com', 'bleacherreport.com', 'nfl.com', 'nba.com', 'mlb.com', 'nhl.com', 'sportingnews.com']
  
  if (sportsSites.some(site => url.includes(site)) || 
      sportsKeywords.some(kw => queryLower.includes(kw) || content.includes(kw) || title.includes(kw))) {
    return 'sports_score'
  }

  // Social media detection
  const socialSites = ['twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'reddit.com', 'threads.net']
  if (socialSites.some(site => url.includes(site))) {
    return 'social_post'
  }

  // Video detection
  const videoSites = ['youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com', 'twitch.tv']
  if (videoSites.some(site => url.includes(site))) {
    return 'video'
  }

  // News detection
  const newsSites = ['cnn.com', 'bbc.com', 'nytimes.com', 'wsj.com', 'reuters.com', 'apnews.com', 'theguardian.com', 'washingtonpost.com']
  if (newsSites.some(site => url.includes(site))) {
    return 'news'
  }

  return 'general'
}

// Sports Score Card
function SportsScoreCard({ result }: { result: SearchResultItem }) {
  // Extract potential score info from content
  const scoreMatch = result.content?.match(/(\d+)\s*[-–]\s*(\d+)/)?.[0]
  
  return (
    <Card className="border-[hsl(210,100%,50%)]/20 bg-gradient-to-br from-background to-[hsl(210,100%,50%)]/5">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-[hsl(210,100%,50%)]/10">
            <Trophy className="size-4 text-[hsl(210,100%,50%)]" />
          </div>
          <CardTitle className="text-sm font-medium line-clamp-1">
            {result.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {scoreMatch && (
          <div className="text-2xl font-bold text-center py-2 text-[hsl(210,100%,50%)]">
            {scoreMatch}
          </div>
        )}
        <p className="text-xs text-muted-foreground line-clamp-3">
          {result.content}
        </p>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Avatar className="h-3 w-3">
            <AvatarImage
              src={`https://www.google.com/s2/favicons?domain=${new URL(result.url).hostname}`}
              alt={new URL(result.url).hostname}
            />
            <AvatarFallback className="text-[6px]">
              {new URL(result.url).hostname[0]}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{new URL(result.url).hostname}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Social Post Card
function SocialPostCard({ result }: { result: SearchResultItem }) {
  const isTwitter = result.url.includes('twitter.com') || result.url.includes('x.com')
  
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-foreground/5">
            {isTwitter ? (
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            ) : (
              <MessageCircle className="size-4" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {isTwitter ? 'X (Twitter)' : 'Social Post'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-4">{result.content || result.title}</p>
        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
          <ExternalLink className="size-3" />
          <span>View original post</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Video Card
function VideoCard({ result }: { result: SearchResultItem }) {
  // Try to extract video ID for thumbnail
  const youtubeMatch = result.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  const videoId = youtubeMatch?.[1]
  
  return (
    <Card className="border-red-500/20 overflow-hidden">
      {videoId && (
        <div className="aspect-video bg-muted relative">
          <img
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            alt={result.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="p-3 rounded-full bg-red-600">
              <Video className="size-5 text-white" />
            </div>
          </div>
        </div>
      )}
      <CardContent className="p-3">
        <p className="text-sm font-medium line-clamp-2">{result.title}</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {result.content}
        </p>
      </CardContent>
    </Card>
  )
}

// News Card
function NewsCard({ result }: { result: SearchResultItem }) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Newspaper className="size-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">
            {new URL(result.url).hostname.replace('www.', '')}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium line-clamp-2">{result.title}</p>
        <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
          {result.content}
        </p>
      </CardContent>
    </Card>
  )
}

// Main Rich Content Card with Modal
export function RichContentCard({ result, query, index }: RichContentCardProps) {
  const contentType = useMemo(
    () => detectContentType(result, query),
    [result, query]
  )

  const renderCard = () => {
    switch (contentType) {
      case 'sports_score':
        return <SportsScoreCard result={result} />
      case 'social_post':
        return <SocialPostCard result={result} />
      case 'video':
        return <VideoCard result={result} />
      case 'news':
        return <NewsCard result={result} />
      default:
        return null // Use default rendering
    }
  }

  const specialCard = renderCard()

  // If no special card, return null to use default rendering
  if (!specialCard) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: Math.min(index * 0.05, 0.5),
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="cursor-pointer hover:scale-[1.02] transition-transform"
        >
          {specialCard}
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={`https://www.google.com/s2/favicons?domain=${new URL(result.url).hostname}&sz=64`}
                alt={new URL(result.url).hostname}
              />
              <AvatarFallback className="text-xs">
                {new URL(result.url).hostname[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {result.title || 'Content Details'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {contentType === 'video' && result.url.includes('youtube') && (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${result.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1]}`}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          )}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>{result.content}</p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(result.url, '_blank')}
          >
            <ExternalLink className="size-4 mr-2" />
            View on {new URL(result.url).hostname}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Export the detection function for use in other components
export { detectContentType }
export type { ContentType }
