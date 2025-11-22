'use client'

import { motion } from 'framer-motion'
import {
  Accessibility,
  Check,
  Eye,
  EyeOff,
  Palette,
  Type,
  ZoomIn} from 'lucide-react'

import { cn } from '@/lib/utils'

import { useThemeConfig } from '@/hooks/use-theme-config'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

export function ThemeSelector() {
  const { currentTheme, setThemeConfig, themes, accessibility, updateAccessibility } = useThemeConfig()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Palette className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="size-5" />
            Theme & Accessibility
          </DialogTitle>
          <DialogDescription>
            Customize your experience with themes and accessibility options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme Presets */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Theme Presets</h3>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setThemeConfig(theme.id)}
                  className={cn(
                    'relative p-4 rounded-lg border-2 text-left transition-all',
                    currentTheme === theme.id
                      ? 'border-primary shadow-md'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{theme.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {theme.description}
                      </p>
                    </div>
                    {currentTheme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Check className="size-5 text-primary" />
                      </motion.div>
                    )}
                  </div>
                  {/* Color preview */}
                  <div className="flex gap-1 mt-3">
                    <div
                      className="h-6 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.background})` }}
                    />
                    <div
                      className="h-6 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                    />
                    <div
                      className="h-6 flex-1 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Accessibility Options */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Accessibility className="size-4" />
              Accessibility Options
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Eye className="size-4" />
                  </div>
                  <div>
                    <Label htmlFor="high-contrast" className="font-medium">
                      High Contrast
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                </div>
                <Switch
                  id="high-contrast"
                  checked={accessibility.highContrast}
                  onCheckedChange={(checked) =>
                    updateAccessibility({ highContrast: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <EyeOff className="size-4" />
                  </div>
                  <div>
                    <Label htmlFor="reduced-motion" className="font-medium">
                      Reduced Motion
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Minimize animations and transitions
                    </p>
                  </div>
                </div>
                <Switch
                  id="reduced-motion"
                  checked={accessibility.reducedMotion}
                  onCheckedChange={(checked) =>
                    updateAccessibility({ reducedMotion: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Type className="size-4" />
                  </div>
                  <div>
                    <Label htmlFor="dyslexia-font" className="font-medium">
                      Dyslexia-Friendly Font
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Use OpenDyslexic font for better readability
                    </p>
                  </div>
                </div>
                <Switch
                  id="dyslexia-font"
                  checked={accessibility.dyslexiaFont}
                  onCheckedChange={(checked) =>
                    updateAccessibility({ dyslexiaFont: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <ZoomIn className="size-4" />
                  </div>
                  <div>
                    <Label htmlFor="larger-text" className="font-medium">
                      Larger Text
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Increase base font size for easier reading
                    </p>
                  </div>
                </div>
                <Switch
                  id="larger-text"
                  checked={accessibility.largerText}
                  onCheckedChange={(checked) =>
                    updateAccessibility({ largerText: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
