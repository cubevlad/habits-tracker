import { createTheme, type PaletteMode } from '@mui/material'

export const getTheme = (mode: PaletteMode = 'light') => {
  const isLightMode = mode === 'light'
  const black = '#1a1c1e'
  const white = '#fff'

  return createTheme({
    palette: {
      mode,
      common: {
        black,
        white,
      },

      error: {
        contrastText: white,
        dark: '#7e2b17',
        light: '#d55b3c',
        main: '#d04826',
      },

      info: {
        contrastText: white,
        dark: '#04617e',
        light: '#1faad6',
        main: '#05a0d1',
      },

      primary: {
        contrastText: white,
        dark: '#31437b',
        light: '#637fd2',
        main: '#506fcc',
      },

      secondary: {
        contrastText: white,
        dark: '#7a2655',
        light: '#d05398',
        main: '#ca3f8c',
      },

      success: {
        contrastText: white,
        dark: '#1a520d',
        light: '#469732',
        main: '#2b8814',
      },

      text: {
        disabled: isLightMode ? 'rgba(26, 28, 30, 0.43)' : 'rgba(255, 255, 255, 0.5)',
        primary: isLightMode ? 'rgba(26, 28, 30, 0.97)' : white,
        secondary: isLightMode ? 'rgba(26, 28, 30, 0.75)' : 'rgba(255, 255, 255, 0.7)',
      },

      warning: {
        contrastText: white,
        dark: '#874a05',
        light: '#e38821',
        main: '#df7a07',
      },
    },
  })
}
