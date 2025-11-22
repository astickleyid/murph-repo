'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  }
  
  return (
    <div className={cn('relative rounded-lg overflow-hidden', sizeMap[logoSettings.size], className)} {...props}>
      <Image
        src="/logo.png"
        alt="StickGPT Logo"
        fill
        className={cn(
          'object-contain',
          resolvedTheme === 'dark' && 'mix-blend-screen',
          logoSettings.invertInDarkMode && resolvedTheme === 'dark' && 'brightness-0 invert'
        )}
        priority
      />
    </div>
  )
}

export { IconLogo }
