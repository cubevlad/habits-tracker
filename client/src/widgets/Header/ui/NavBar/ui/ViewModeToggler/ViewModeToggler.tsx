import { useState } from 'react'

import { ViewQuilt } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'

import { useViewModeCtx } from '@shared/context'

import { RU_LOCALE_VIEW_MODE_MAP, VIEW_TYPE_MODE } from './lib'

export const ViewModeToggler: React.FC = () => {
  const {
    handleChangeViewMode,
    mode: { type },
  } = useViewModeCtx()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton disableRipple size='small' onClick={handleMenuOpen}>
        <ViewQuilt />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='basic-menu'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        {VIEW_TYPE_MODE.map((typeMode) => (
          <MenuItem
            key={typeMode}
            selected={type === typeMode}
            onClick={() => {
              handleChangeViewMode({ type: typeMode })
              handleMenuClose()
            }}
          >
            {RU_LOCALE_VIEW_MODE_MAP[typeMode]}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
