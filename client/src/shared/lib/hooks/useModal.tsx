import { useState, useCallback, useMemo } from 'react'

import { DialogContent, Modal as MuiModal } from '@mui/material'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback((e?: React.BaseSyntheticEvent) => {
    e?.stopPropagation()
    setIsOpen(false)
  }, [])

  const Modal = useCallback(
    ({ children, additional }: { children: React.ReactNode; additional?: any }) => {
      return (
        <MuiModal disableAutoFocus open={isOpen} onClose={handleClose} {...additional}>
          <DialogContent>{children}</DialogContent>
        </MuiModal>
      )
    },
    [handleClose, isOpen]
  )

  return useMemo(
    () => ({ Modal, handleClose, handleOpen, isOpen }),
    [Modal, handleClose, handleOpen, isOpen]
  )
}
