import React, { useState, useCallback, useMemo } from 'react'

import type { ModalProps } from '@mui/material'
import { DialogContent, Modal as MuiModal } from '@mui/material'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
  }, [])

  const Modal = useCallback(
    ({ children, additional }: { children: React.ReactNode; additional?: Partial<ModalProps> }) => {
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
