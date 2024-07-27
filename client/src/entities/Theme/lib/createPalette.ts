import type { PaletteMode } from '@mui/material'

const black = '#1a1c1e'
const white = '#fff'

export const createPaletteV1 = (mode: PaletteMode = 'light') => {
  const isLightMode = mode === 'light'

  return {
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
  }
}

export const createPaletteV2 = (mode: PaletteMode = 'light') => {
  return {
    mode,
    common: {
      black,
      white,

      primary: {
        main: '#0de0a1', // Achieved color
      },
      secondary: {
        main: '#506488', // Dark blue (alternative secondary color)
      },
      error: {
        main: '#8c4b4b', // Dark red
        light: '#f2b8b8', // Light red
      },
      warning: {
        main: '#8c704a', // Dark yellow
        light: '#ffd6a5', // Light apricot
      },
      info: {
        main: '#4b5975', // Dark ice blue
        light: '#d8d2e7', // Light purple
      },
      success: {
        main: '#517a51', // Dark mint green
        light: '#c3e8c2', // Light mint green
      },
      background: {
        default: '#fdf2d0', // Light yellow
        paper: '#ffffff', // White
      },
      text: {
        primary: '#333333', // Dark text
        secondary: '#666666', // Slightly lighter dark text
      },
      action: {
        active: '#0de0a1', // Achieved color for active elements
        hover: '#c3e8c2', // Light mint green for hover
        selected: '#bfdfce', // Light green for selected
        disabled: '#d8d2e7', // Light purple for disabled
        disabledBackground: '#f9ddde', // Light salmon for disabled background
      },
      button: {
        primary: {
          main: '#0de0a1', // Achieved color
          contrastText: '#ffffff', // White text
        },
        secondary: {
          main: '#506488', // Dark blue
          contrastText: '#ffffff', // White text
        },
      },
    },
  }
}

export const createPalette = (mode: PaletteMode = 'light', type: 'v1' | 'v2') => {
  switch (type) {
    case 'v1': {
      return createPaletteV1(mode)
    }
    case 'v2': {
      return createPaletteV2(mode)
    }
    default: {
      return createPaletteV1(mode)
    }
  }
}
