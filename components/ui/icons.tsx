'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { LogoSettings, defaultLogoSettings } from '@/lib/themes'

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
    small: 'h-12',
    medium: 'h-16',
    large: 'h-24'
  }
  
  return (
    <div 
      className={cn('relative flex-shrink-0', sizeMap[logoSettings.size], className)} 
      style={{ width: 'auto', aspectRatio: '1' }}
      {...props}
    >
      <Image
        src="/logo.svg"
        alt="StickGPT Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

export { IconLogo }
