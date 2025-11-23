'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Copy, Download } from 'lucide-react'

interface ThemeColors {
  name: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
}

const defaultLight: ThemeColors = {
  name: 'Light',
  background: '0 0% 100%',
  foreground: '240 10% 3.9%',
  card: '0 0% 100%',
  cardForeground: '240 10% 3.9%',
  popover: '0 0% 100%',
  popoverForeground: '240 10% 3.9%',
  primary: '240 5.9% 10%',
  primaryForeground: '0 0% 98%',
  secondary: '240 4.8% 95.9%',
  secondaryForeground: '240 5.9% 10%',
  muted: '240 4.8% 95.9%',
  mutedForeground: '240 3.8% 46.1%',
  accent: '240 4.8% 95.9%',
  accentForeground: '240 5.9% 10%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '0 0% 98%',
  border: '240 5.9% 90%',
  input: '240 5.9% 90%',
  ring: '240 5.9% 10%',
}

const defaultDark: ThemeColors = {
  name: 'Dark',
  background: '240 10% 3.9%',
  foreground: '0 0% 98%',
  card: '240 10% 3.9%',
  cardForeground: '0 0% 98%',
  popover: '240 10% 3.9%',
  popoverForeground: '0 0% 98%',
  primary: '0 0% 98%',
  primaryForeground: '240 5.9% 10%',
  secondary: '240 3.7% 15.9%',
  secondaryForeground: '0 0% 98%',
  muted: '240 3.7% 15.9%',
  mutedForeground: '240 5% 64.9%',
  accent: '240 3.7% 15.9%',
  accentForeground: '0 0% 98%',
  destructive: '0 62.8% 30.6%',
  destructiveForeground: '0 0% 98%',
  border: '240 3.7% 15.9%',
  input: '240 3.7% 15.9%',
  ring: '240 4.9% 83.9%',
}

export function ThemeBuilder() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [lightTheme, setLightTheme] = useState<ThemeColors>(defaultLight)
  const [darkTheme, setDarkTheme] = useState<ThemeColors>(defaultDark)
  const [isSaved, setIsSaved] = useState(false)

  const currentTheme = mode === 'light' ? lightTheme : darkTheme
  const setCurrentTheme = mode === 'light' ? setLightTheme : setDarkTheme

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setCurrentTheme({ ...currentTheme, [key]: value })
  }

  const applyTheme = () => {
    const root = document.documentElement
    Object.entries(currentTheme).forEach(([key, value]) => {
      if (key !== 'name') {
        root.style.setProperty(`--${key}`, value)
      }
    })
    setIsSaved(false)
  }

  const saveTheme = () => {
    // Save to localStorage so it persists
    localStorage.setItem('custom-theme-light', JSON.stringify(lightTheme))
    localStorage.setItem('custom-theme-dark', JSON.stringify(darkTheme))
    
    // Apply current theme
    applyTheme()
    setIsSaved(true)
    
    setTimeout(() => setIsSaved(false), 2000)
  }

  // Load saved theme on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedLight = localStorage.getItem('custom-theme-light')
      const savedDark = localStorage.getItem('custom-theme-dark')
      
      if (savedLight) {
        const parsed = JSON.parse(savedLight)
        setLightTheme(parsed)
      }
      if (savedDark) {
        const parsed = JSON.parse(savedDark)
        setDarkTheme(parsed)
      }
      
      // Auto-apply saved theme
      setTimeout(() => {
        const root = document.documentElement
        const isDark = root.classList.contains('dark')
        const themeToApply = isDark ? (savedDark ? JSON.parse(savedDark) : defaultDark) : (savedLight ? JSON.parse(savedLight) : defaultLight)
        
        Object.entries(themeToApply).forEach(([key, value]) => {
          if (key !== 'name') {
            root.style.setProperty(`--${key}`, value as string)
          }
        })
      }, 100)
    }
  })

  const generateCSS = () => {
    const lightCSS = Object.entries(lightTheme)
      .filter(([key]) => key !== 'name')
      .map(([key, value]) => `    --${key}: ${value};`)
      .join('\n')

    const darkCSS = Object.entries(darkTheme)
      .filter(([key]) => key !== 'name')
      .map(([key, value]) => `    --${key}: ${value};`)
      .join('\n')

    return `@layer base {
  :root {
${lightCSS}
  }

  .dark {
${darkCSS}
  }
}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS())
    alert('Theme CSS copied to clipboard!')
  }

  const downloadCSS = () => {
    const css = generateCSS()
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'theme.css'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[9999] shadow-lg"
        size="lg"
      >
        🎨 Theme Builder
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-[600px] bg-background border-l shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold">🎨 Theme Builder</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={mode === 'light' ? 'default' : 'outline'}
              onClick={() => setMode('light')}
              className="flex-1"
            >
              ☀️ Light Mode
            </Button>
            <Button
              variant={mode === 'dark' ? 'default' : 'outline'}
              onClick={() => setMode('dark')}
              className="flex-1"
            >
              🌙 Dark Mode
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Editing: <strong>{currentTheme.name}</strong>
          </div>

          {/* Color Inputs */}
          <div className="space-y-4">
            {Object.entries(currentTheme).map(([key, value]) => {
              if (key === 'name') return null
              
              return (
                <div key={key} className="space-y-2">
                  <Label className="text-xs font-mono">{key}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={value}
                      onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                      className="font-mono text-xs"
                      placeholder="e.g., 240 10% 3.9%"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={applyTheme}
                    >
                      Apply
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    HSL format: hue saturation% lightness%
                  </div>
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 bg-background border-t pt-4 space-y-2">
            <Button
              onClick={saveTheme}
              className="w-full"
              size="lg"
            >
              {isSaved ? '✅ Theme Saved!' : '💾 Save & Apply Theme'}
            </Button>
            
            <Button
              onClick={applyTheme}
              variant="outline"
              className="w-full"
              size="sm"
            >
              👁️ Preview (Don't Save)
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex-1"
              >
                <Copy className="size-4 mr-2" />
                Copy CSS
              </Button>
              <Button
                onClick={downloadCSS}
                variant="outline"
                className="flex-1"
              >
                <Download className="size-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center pt-2">
              Your theme is saved in browser storage and persists across sessions! 🎨
            </div>
            
            <Button
              onClick={() => {
                localStorage.removeItem('custom-theme-light')
                localStorage.removeItem('custom-theme-dark')
                setLightTheme(defaultLight)
                setDarkTheme(defaultDark)
                applyTheme()
              }}
              variant="ghost"
              size="sm"
              className="w-full text-xs"
            >
              🔄 Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
