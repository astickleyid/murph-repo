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

  // Choose logo variant
  const logoSrc = logoSettings.variant === 'text' ? '/logo-with-text.jpg' : '/logo-icon-only.png'
  const logoWidth = logoSettings.variant === 'text' ? 2320 : 1024
  const logoHeight = logoSettings.variant === 'text' ? 2486 : 1024
  
  const sizeMap = {
    small: 'h-20',
    medium: 'h-32',
    large: 'h-48'
  }
  
  return (
    <div 
      className={cn('relative', sizeMap[logoSettings.size], className)} 
      style={{ 
        width: 'auto',
        aspectRatio: `${logoWidth}/${logoHeight}`
      }} 
      {...props}
    >
      <Image
        src={logoSrc}
        alt="StickGPT Logo"
        width={logoWidth}
        height={logoHeight}
        className={cn(
          'object-contain w-full h-full',
          logoSettings.invertInDarkMode && resolvedTheme === 'dark' && 'brightness-0 invert'
        )}
        priority
      />
    </div>
  )
}

export { IconLogo }
