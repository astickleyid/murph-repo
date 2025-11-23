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
    small: 'h-20',
    medium: 'h-32',
    large: 'h-48'
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
