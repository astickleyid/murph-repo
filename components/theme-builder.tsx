'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

interface SimpleTheme {
  name: string
  primaryColor: string
  backgroundColor: string
  textColor: string
  accentColor: string
  borderRadius: number
  borderWidth: number
}

const presets = [
  { name: 'Classic Dark', primaryColor: '#000000', backgroundColor: '#0a0a0a', textColor: '#ffffff', accentColor: '#3b82f6', borderRadius: 8, borderWidth: 1 },
  { name: 'Soft Grey', primaryColor: '#2a2a2a', backgroundColor: '#18181b', textColor: '#fafafa', accentColor: '#a855f7', borderRadius: 12, borderWidth: 1 },
  { name: 'Clean White', primaryColor: '#ffffff', backgroundColor: '#fafafa', textColor: '#0a0a0a', accentColor: '#0ea5e9', borderRadius: 8, borderWidth: 1 },
  { name: 'Warm Cream', primaryColor: '#fef3c7', backgroundColor: '#fffbeb', textColor: '#78350f', accentColor: '#f59e0b', borderRadius: 12, borderWidth: 1 },
  { name: 'Ocean Blue', primaryColor: '#1e40af', backgroundColor: '#dbeafe', textColor: '#1e3a8a', accentColor: '#3b82f6', borderRadius: 10, borderWidth: 2 },
  { name: 'Forest Green', primaryColor: '#065f46', backgroundColor: '#d1fae5', textColor: '#064e3b', accentColor: '#10b981', borderRadius: 10, borderWidth: 2 },
]

export function ThemeBuilder() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<SimpleTheme>({
    name: 'Custom',
    primaryColor: '#000000',
    backgroundColor: '#0a0a0a',
    textColor: '#ffffff',
    accentColor: '#3b82f6',
    borderRadius: 8,
    borderWidth: 1,
  })

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem('simple-theme')
    if (saved) {
      setTheme(JSON.parse(saved))
    }
  }, [])

  const applyTheme = (t: SimpleTheme = theme) => {
    document.documentElement.style.setProperty('--theme-primary', t.primaryColor)
    document.documentElement.style.setProperty('--theme-bg', t.backgroundColor)
    document.documentElement.style.setProperty('--theme-text', t.textColor)
    document.documentElement.style.setProperty('--theme-accent', t.accentColor)
    document.documentElement.style.setProperty('--theme-radius', `${t.borderRadius}px`)
    document.documentElement.style.setProperty('--theme-border-width', `${t.borderWidth}px`)
  }

  const saveTheme = () => {
    localStorage.setItem('simple-theme', JSON.stringify(theme))
    applyTheme()
    alert('✅ Theme saved!')
  }

  const loadPreset = (preset: SimpleTheme) => {
    setTheme(preset)
    applyTheme(preset)
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
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold">🎨 Theme Customizer</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="size-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Presets */}
          <div>
            <Label className="text-lg font-semibold mb-3 block">Quick Presets</Label>
            <div className="grid grid-cols-3 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => loadPreset(preset)}
                  className="p-4 border-2 rounded-lg hover:border-primary transition-all"
                  style={{ 
                    backgroundColor: preset.backgroundColor, 
                    borderColor: preset.accentColor,
                    color: preset.textColor 
                  }}
                >
                  <div className="font-semibold text-sm">{preset.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Colors</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm mb-2 block">Primary Color</Label>
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer border-2"
                />
              </div>
              
              <div>
                <Label className="text-sm mb-2 block">Background</Label>
                <input
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer border-2"
                />
              </div>
              
              <div>
                <Label className="text-sm mb-2 block">Text Color</Label>
                <input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer border-2"
                />
              </div>
              
              <div>
                <Label className="text-sm mb-2 block">Accent Color</Label>
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer border-2"
                />
              </div>
            </div>
          </div>

          {/* Border Settings */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Border & Shape</Label>
            
            <div>
              <Label className="text-sm mb-2 block">Border Radius: {theme.borderRadius}px</Label>
              <Slider
                value={[theme.borderRadius]}
                onValueChange={([v]) => setTheme({ ...theme, borderRadius: v })}
                min={0}
                max={24}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="text-sm mb-2 block">Border Width: {theme.borderWidth}px</Label>
              <Slider
                value={[theme.borderWidth]}
                onValueChange={([v]) => setTheme({ ...theme, borderWidth: v })}
                min={0}
                max={4}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={() => applyTheme()} variant="outline" className="flex-1">
              👁️ Preview
            </Button>
            <Button onClick={saveTheme} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
              💾 Save Theme
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
