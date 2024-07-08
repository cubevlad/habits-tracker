import { memo, useMemo } from 'react'

import { ThemeModeProvider } from '@entities/Theme'
import { ThemeContextProvider } from '@shared/context'

import { useColorMode } from './lib'

export const ThemeProvider = memo(({ children }: { children?: React.ReactNode }) => {
  const { mode, toggleColorMode: handleToggleColorMode } = useColorMode()
  const contextValue = useMemo(
    () => ({ mode, handleToggleColorMode }),
    [mode, handleToggleColorMode]
  )

  return (
    <ThemeContextProvider value={contextValue}>
      <ThemeModeProvider mode={mode}>{children}</ThemeModeProvider>
    </ThemeContextProvider>
  )
})
