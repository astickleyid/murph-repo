'use client'

import { useEffect } from 'react'

import { Model } from '@/lib/types/models'

import { CommandPalette } from './command-palette'

interface CommandPaletteProviderProps {
  models?: Model[]
}

export function CommandPaletteProvider({ models }: CommandPaletteProviderProps) {
  return <CommandPalette models={models} />
}
