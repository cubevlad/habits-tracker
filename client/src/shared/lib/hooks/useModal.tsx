import { useState, useCallback, useMemo } from 'react'

import { DialogContent, Modal } from '@mui/material'

type UseModalProps<U> = {
  props?: U
  children: (props?: U) => JSX.Element
}

export const useModal = <T extends object | null>({ props, children }: UseModalProps<T>) => {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const modal = useMemo(
    () => (
      <Modal disableAutoFocus open={open} onClose={handleClose}>
        <DialogContent>{children?.(props)}</DialogContent>
      </Modal>
    ),
    [children, handleClose, open, props]
  )
  return useMemo(() => ({ modal, handleClose, handleOpen }), [modal, handleClose, handleOpen])
}
