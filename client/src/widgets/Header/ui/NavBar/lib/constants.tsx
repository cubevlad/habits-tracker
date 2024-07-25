import { Analytics, Home, Logout, Settings } from '@mui/icons-material'
import type { Theme } from '@mui/material'
import styled from 'styled-components'

import type { NavTabsType } from '../model'

export const BUTTON_STATE: Record<string, number> = {
  DISABLED: 1,
  LIGHT: 2,
  DARK: 4,
  ACTIVE: 8,
  LIGHT_AND_ACTIVE: 2 | 8,
  DARK_AND_ACTIVE: 4 | 8,
}

const getColor = (theme: Theme, state: number) => {
  switch (state) {
    case 1: {
      return theme.palette.text.disabled
    }
    case 2: {
      return theme.palette.primary.light
    }
    case 4: {
      return theme.palette.primary.dark
    }
    case 8: {
      return theme.palette.warning.main
    }
    case 2 | 8: {
      return theme.palette.warning.light
    }
    case 4 | 8: {
      return theme.palette.warning.dark
    }

    default: {
      return theme.palette.primary.main
    }
  }
}

// WIP
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledHomeIcon = styled(Home)<{ $state?: number }>`
  color: ${({ theme, $state }) => getColor(theme, $state ?? 0)};
`

const StyledLogoutIcon = styled(Logout)<{ $state?: number }>`
  color: ${({ theme, $state }) => getColor(theme, $state ?? 0)};
`

// WIP
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledSettingsIcon = styled(Settings)<{ $state?: number }>`
  color: ${({ theme, $state }) => getColor(theme, $state ?? 0)};
`
// WIP
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledAnalyticsIcon = styled(Analytics)<{ $state?: number }>`
  color: ${({ theme, $state }) => getColor(theme, $state ?? 0)};
`

export const NAV_TABS: NavTabsType[] = [
  // {
  //   to: '/',
  //   label: 'HOME',
  //   getIcon: (buttonState) => <StyledHomeIcon $state={buttonState} />,
  // },
  {
    to: '/logout',
    label: 'LOGOUT',
    getIcon: (buttonState) => <StyledLogoutIcon $state={buttonState} />,
  },
  // WIP

  // {
  //   to: '/settings',
  //   label: 'SETTINGS',
  //   getIcon: (buttonState) => <StyledSettingsIcon $state={buttonState} />,
  // },
  // {
  //   to: '/analytics',
  //   label: 'ANALYTICS',
  //   getIcon: (buttonState) => <StyledAnalyticsIcon $state={buttonState} />,
  // },
]
