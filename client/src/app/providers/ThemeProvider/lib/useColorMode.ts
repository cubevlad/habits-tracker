import { useState, useMemo, useEffect, useCallback } from 'react'

import type { ColorModeType } from '@shared/types'

import { DEFAULT_COLOR_MODE, COLOR_MODE } from './constants'
import { getColorMode } from './getColorMode'

export const useColorMode = () => {
  const savedAppColorMode = getColorMode()
  const [mode, setMode] = useState<ColorModeType>(savedAppColorMode ?? DEFAULT_COLOR_MODE)

  const toggleColorMode = useCallback(
    () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')),
    []
  )

  useEffect(() => {
    const theme = getColorMode()

    if (!theme) {
      localStorage.setItem(COLOR_MODE, DEFAULT_COLOR_MODE)
    } else {
      setMode(theme)
      localStorage.setItem(COLOR_MODE, theme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(COLOR_MODE, mode)
  }, [mode])

  return useMemo(
    () => ({
      toggleColorMode,
      mode,
    }),
    [mode, toggleColorMode]
  )
}
