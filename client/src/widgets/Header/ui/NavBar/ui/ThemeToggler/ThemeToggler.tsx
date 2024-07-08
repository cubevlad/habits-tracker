import { DarkMode, LightMode } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useThemeCtx } from '@shared/context'

export const ThemeToggler: React.FC = () => {
  const { handleToggleColorMode, mode } = useThemeCtx()
  const isLightMode = mode === 'light'

  return (
    <IconButton disableRipple size='small' onClick={handleToggleColorMode}>
      {isLightMode ? <DarkMode color='primary' /> : <LightMode sx={{ color: 'yellow' }} />}
    </IconButton>
  )
}
