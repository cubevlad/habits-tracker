import { useMemo } from 'react'

import { ViewModeProvider as ViewModeContextProvider } from '@shared/context'

import { useViewMode } from './lib'

export const ViewModeProvider = ({ children }: { children?: React.ReactNode }) => {
  const { handleChangeViewMode, mode } = useViewMode()

  const contextValue = useMemo(() => ({ mode, handleChangeViewMode }), [mode, handleChangeViewMode])

  return <ViewModeContextProvider value={contextValue}>{children}</ViewModeContextProvider>
}
