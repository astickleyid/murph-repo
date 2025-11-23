'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { defaultLogoSettings,LogoSettings } from '@/lib/themes'
import { cn } from '@/lib/utils'

const LOGO_SETTINGS_KEY = 'stickgpt-logo-settings'

function IconLogo({ className, ...props }: React.ComponentProps<'div'>) {
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
  
  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <div className={cn('relative flex-shrink-0', sizeMap[logoSettings.size])} style={{ width: 'auto', aspectRatio: '1' }}>
        <Image
          src="/logo.svg"
          alt="StickGPT Logo"
          fill
          className="object-contain"
          priority
        />
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
