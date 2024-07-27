import { createTheme, type PaletteMode } from '@mui/material'

import { createPalette } from './createPalette'

export const getTheme = (mode: PaletteMode = 'light') => {
  return createTheme({
    palette: createPalette(mode, 'v2'),
  })
}
