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
    small: 'h-12',
    medium: 'h-20',
    large: 'h-32'
  }
  
  return (
    <div className={cn('relative rounded-lg overflow-hidden', sizeMap[logoSettings.size], className)} style={{ width: 'auto', aspectRatio: '1024/1024' }} {...props}>
      <Image
        src="/logo.png"
        alt="StickGPT Logo"
        width={1024}
        height={1024}
        className={cn(
          'object-contain w-full h-full',
          resolvedTheme === 'dark' && 'mix-blend-screen',
          logoSettings.invertInDarkMode && resolvedTheme === 'dark' && 'brightness-0 invert'
        )}
        priority
      />
    </div>
  )
}

export { IconLogo }
