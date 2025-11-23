'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { defaultLogoSettings,LogoSettings } from '@/lib/themes'
import { cn } from '@/lib/utils'

const LOGO_SETTINGS_KEY = 'stickgpt-logo-settings'

function IconLogo({ className, ...props }: React.ComponentProps<'div'>) {
  const { resolvedTheme } = useTheme()
  const [logoSettings, setLogoSettings] = useState<LogoSettings>(defaultLogoSettings)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOGO_SETTINGS_KEY)
      if (stored) {
        setLogoSettings(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load logo settings:', error)
    }
  }, [])
  
  const sizeMap = {
    small: 'h-16',
    medium: 'h-24',
    large: 'h-40'
  }
  
  // Simple clean logo - adapts to theme colors automatically
  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <div className={cn('flex-shrink-0', sizeMap[logoSettings.size])} style={{ width: 'auto', aspectRatio: '1' }}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="url(#logoGrad)"
            strokeWidth="3"
            fill="none"
          />
          {/* S shape */}
          <path
            d="M 35 30 Q 35 25 40 25 L 60 25 Q 65 25 65 30 Q 65 40 50 45 Q 35 50 35 60 Q 35 65 40 65 L 60 65 Q 65 65 65 60"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      {logoSettings.variant === 'text' && (
        <span className="text-2xl font-bold tracking-tight whitespace-nowrap">
          StickGPT
        </span>
      )}
    </div>
  )
}

export { IconLogo }
