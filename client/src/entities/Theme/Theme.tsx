import { memo, useMemo } from 'react'

import { CssBaseline, type PaletteMode } from '@mui/material'
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { LocalizationProvider, type PickersLocaleText } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ru as ruLocale } from 'date-fns/locale'

import { getTheme } from './lib'

const LOCALE_TEXT: Partial<PickersLocaleText<Date>> = {
  fieldDayPlaceholder: (params) => {
    return params.format === 'dd' ? 'дд' : params.format
  },
  fieldMonthPlaceholder: (params) => {
    return params.format === 'MM' ? 'мм' : params.format
  },
  fieldYearPlaceholder: (params) => {
    return params.format === 'y' ? 'гггг' : params.format
  },
}

type ThemeModeProviderProps = {
  children?: React.ReactNode
  mode?: PaletteMode
}

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = memo(({ children, mode }) => {
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <LocalizationProvider
            adapterLocale={ruLocale}
            dateAdapter={AdapterDateFns}
            localeText={LOCALE_TEXT}
          >
            {children}
          </LocalizationProvider>
        </CssBaseline>
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
})

ThemeModeProvider.displayName = 'ThemeModeProvider'
