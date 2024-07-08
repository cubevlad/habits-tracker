import { useState, useCallback, useEffect, useMemo } from 'react'

import type { ViewMode } from '@shared/types'

import { DEFAULT_VIEW_MODE, VIEW_MODE } from './constants'
import { getViewMode } from './getViewMode'

export const useViewMode = () => {
  const savedAppViewMode = getViewMode()
  const [viewMode, setViewMode] = useState<ViewMode>(savedAppViewMode ?? DEFAULT_VIEW_MODE)

  const handleChangeViewMode = useCallback(
    ({ date, type }: Partial<ViewMode>) =>
      setViewMode((prevViewMode) => ({
        ...prevViewMode,
        date: date ?? prevViewMode.date,
        type: type ?? prevViewMode.type,
      })),
    []
  )

  useEffect(() => {
    const mode = getViewMode()

    if (!mode) {
      localStorage.setItem(VIEW_MODE, JSON.stringify(DEFAULT_VIEW_MODE))
    } else {
      setViewMode(mode)
      localStorage.setItem(VIEW_MODE, JSON.stringify(mode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(VIEW_MODE, JSON.stringify(viewMode))
  }, [viewMode])

  return useMemo(
    () => ({
      handleChangeViewMode,
      mode: viewMode,
    }),
    [viewMode, handleChangeViewMode]
  )
}
