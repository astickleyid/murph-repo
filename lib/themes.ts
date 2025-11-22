export interface ThemeConfig {
  id: string
  name: string
  description: string
  colors: {
    background: string
    foreground: string
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
}

export const themes: Record<string, ThemeConfig> = {
  light: {
    id: 'light',
    name: 'Light',
    description: 'Clean white background',
    colors: {
      background: '0 0% 100%',
      foreground: '0 0% 0%',
      primary: '0 0% 0%',
      primaryForeground: '0 0% 100%',
      secondary: '0 0% 95%',
      secondaryForeground: '0 0% 0%',
      muted: '0 0% 96%',
      mutedForeground: '0 0% 35%',
      accent: '0 0% 95%',
      accentForeground: '0 0% 0%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 100%',
      border: '0 0% 90%',
      input: '0 0% 90%',
      ring: '0 0% 70%'
    }
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    description: 'Pure black background',
    colors: {
      background: '0 0% 0%',
      foreground: '0 0% 100%',
      primary: '0 0% 100%',
      primaryForeground: '0 0% 0%',
      secondary: '0 0% 8%',
      secondaryForeground: '0 0% 100%',
      muted: '0 0% 10%',
      mutedForeground: '0 0% 60%',
      accent: '0 0% 10%',
      accentForeground: '0 0% 100%',
      destructive: '0 62.8% 50%',
      destructiveForeground: '0 0% 100%',
      border: '0 0% 15%',
      input: '0 0% 15%',
      ring: '0 0% 30%'
    }
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blue tones',
    colors: {
      background: '220 20% 97%',
      foreground: '220 15% 10%',
      primary: '210 100% 50%',
      primaryForeground: '0 0% 100%',
      secondary: '220 15% 92%',
      secondaryForeground: '220 15% 10%',
      muted: '220 15% 94%',
      mutedForeground: '220 10% 40%',
      accent: '210 100% 95%',
      accentForeground: '210 100% 35%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 100%',
      border: '220 15% 87%',
      input: '220 15% 87%',
      ring: '210 100% 50%'
    }
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    description: 'Natural green palette',
    colors: {
      background: '140 20% 97%',
      foreground: '140 15% 10%',
      primary: '142 70% 45%',
      primaryForeground: '0 0% 100%',
      secondary: '140 15% 92%',
      secondaryForeground: '140 15% 10%',
      muted: '140 15% 94%',
      mutedForeground: '140 10% 40%',
      accent: '142 70% 95%',
      accentForeground: '142 70% 35%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 100%',
      border: '140 15% 87%',
      input: '140 15% 87%',
      ring: '142 70% 45%'
    }
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and purple',
    colors: {
      background: '30 25% 97%',
      foreground: '30 15% 10%',
      primary: '25 95% 53%',
      primaryForeground: '0 0% 100%',
      secondary: '30 20% 92%',
      secondaryForeground: '30 15% 10%',
      muted: '30 20% 94%',
      mutedForeground: '30 10% 40%',
      accent: '280 65% 95%',
      accentForeground: '280 65% 35%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 100%',
      border: '30 20% 87%',
      input: '30 20% 87%',
      ring: '25 95% 53%'
    }
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep blue-black theme',
    colors: {
      background: '220 30% 8%',
      foreground: '220 10% 95%',
      primary: '210 100% 60%',
      primaryForeground: '220 30% 8%',
      secondary: '220 25% 12%',
      secondaryForeground: '220 10% 95%',
      muted: '220 25% 15%',
      mutedForeground: '220 10% 60%',
      accent: '210 100% 20%',
      accentForeground: '210 100% 90%',
      destructive: '0 62.8% 50%',
      destructiveForeground: '0 0% 100%',
      border: '220 25% 18%',
      input: '220 25% 18%',
      ring: '210 100% 60%'
    }
  },
  oled: {
    id: 'oled',
    name: 'OLED Black',
    description: 'True black for OLED screens',
    colors: {
      background: '0 0% 0%',
      foreground: '0 0% 98%',
      primary: '0 0% 98%',
      primaryForeground: '0 0% 0%',
      secondary: '0 0% 5%',
      secondaryForeground: '0 0% 98%',
      muted: '0 0% 8%',
      mutedForeground: '0 0% 65%',
      accent: '0 0% 12%',
      accentForeground: '0 0% 98%',
      destructive: '0 62.8% 50%',
      destructiveForeground: '0 0% 98%',
      border: '0 0% 14%',
      input: '0 0% 14%',
      ring: '0 0% 40%'
    }
  }
}

export const accessibilityOptions = {
  highContrast: false,
  reducedMotion: false,
  dyslexiaFont: false,
  largerText: false
}

export interface LogoSettings {
  size: 'small' | 'medium' | 'large'
  showInHeader: boolean
  invertInDarkMode: boolean
  variant: 'icon' | 'text'
}

export const defaultLogoSettings: LogoSettings = {
  size: 'medium',
  showInHeader: true,
  invertInDarkMode: false,
  variant: 'text'
}
