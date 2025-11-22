'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import {
  accessibilityOptions,
  defaultLogoSettings,
  LogoSettings,
  themes,
  ThemeConfig
} from '@/lib/themes'

const THEME_CONFIG_KEY = 'stickgpt-theme-config'
const ACCESSIBILITY_KEY = 'stickgpt-accessibility'
const LOGO_SETTINGS_KEY = 'stickgpt-logo-settings'

export interface AccessibilitySettings {
  highContrast: boolean
  reducedMotion: boolean
  dyslexiaFont: boolean
  largerText: boolean
}

export function useThemeConfig() {
  const { theme: currentMode, setTheme: setMode } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string>('light')
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(accessibilityOptions)
  const [logoSettings, setLogoSettings] = useState<LogoSettings>(defaultLogoSettings)

  // Load theme config
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_CONFIG_KEY)
      if (stored) {
        setCurrentTheme(stored)
      }
    } catch (error) {
      console.error('Failed to load theme config:', error)
    }
  }, [])

  // Load accessibility settings
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ACCESSIBILITY_KEY)
      if (stored) {
        setAccessibility(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load accessibility settings:', error)
    }
  }, [])

  // Load logo settings
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

  // Apply theme colors
  useEffect(() => {
    const themeConfig = themes[currentTheme] || themes.light
    const root = document.documentElement

    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })
  }, [currentTheme])

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement

    // High contrast
    if (accessibility.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Reduced motion
    if (accessibility.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Dyslexia font
    if (accessibility.dyslexiaFont) {
      root.classList.add('dyslexia-font')
    } else {
      root.classList.remove('dyslexia-font')
    }

    // Larger text
    if (accessibility.largerText) {
      root.classList.add('larger-text')
    } else {
      root.classList.remove('larger-text')
    }
  }, [accessibility])

  const setThemeConfig = (themeId: string) => {
    setCurrentTheme(themeId)
    try {
      localStorage.setItem(THEME_CONFIG_KEY, themeId)
    } catch (error) {
      console.error('Failed to save theme config:', error)
    }

    // Set mode based on theme
    const isDark = ['dark', 'midnight', 'oled'].includes(themeId)
    setMode(isDark ? 'dark' : 'light')
  }

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    const updated = { ...accessibility, ...settings }
    setAccessibility(updated)
    try {
      localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save accessibility settings:', error)
    }
  }

  const updateLogoSettings = (settings: Partial<LogoSettings>) => {
    const updated = { ...logoSettings, ...settings }
    setLogoSettings(updated)
    try {
      localStorage.setItem(LOGO_SETTINGS_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save logo settings:', error)
    }
  }

  return {
    currentTheme,
    setThemeConfig,
    themes: Object.values(themes),
    accessibility,
    updateAccessibility,
    logoSettings,
    updateLogoSettings
  }
}
