import CloseIcon from '@mui/icons-material/Close'
import type { ButtonProps, PaperProps } from '@mui/material'
import {
  Dialog as MuiDialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Stack,
} from '@mui/material'

import { DEFAULT_DIALOG_PAPER_PROPS } from './lib'

type DialogProps = {
  children?: React.ReactNode
  customHeader?: React.ReactNode
  modalTitle?: string
  open: boolean
  onClose?: () => void
  onOk?: () => void
  onCancel?: () => void
  okButtonProps?: {
    props: ButtonProps
    text: string
  }
  cancelButtonProps?: {
    props: ButtonProps
    text: string
  }
  hideDialogActions?: boolean
  customDialogActions?: React.ReactNode
  DialogPaperProps?: PaperProps
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  modalTitle,
  open,
  onClose,
  okButtonProps,
  cancelButtonProps,
  onOk,
  onCancel,
  hideDialogActions = false,
  customHeader,
  customDialogActions,
  DialogPaperProps,
}) => {
  const handleOk = () => {
    onOk?.()
    onClose?.()
  }

  const handleCancel = () => {
    onCancel?.()
    onClose?.()
  }

  const okProps = okButtonProps?.props ?? {}
  const okText = okButtonProps?.text ?? 'OK'

  const cancelProps = cancelButtonProps?.props ?? {}
  const cancelText = cancelButtonProps?.text ?? 'Cancel'

  const paperProps = DialogPaperProps ?? DEFAULT_DIALOG_PAPER_PROPS

  return (
    <MuiDialog
      aria-describedby='scroll-dialog-description'
      aria-labelledby='scroll-dialog-title'
      open={open}
      PaperProps={paperProps}
      scroll='paper'
      onClose={onClose}
    >
      <DialogTitle id='scroll-dialog-title' sx={{ m: 0, p: 2 }}>
        <Stack alignItems='center' direction='row' justifyContent='space-between'>
          {customHeader ?? <Typography variant='body1'>{modalTitle}</Typography>}
          <IconButton aria-label='close' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {hideDialogActions ? null : (
        <DialogActions>
          {customDialogActions ?? (
            <>
              <Button onClick={handleOk} {...okProps}>
                <Typography>{okText}</Typography>
              </Button>
              <Button onClick={handleCancel} {...cancelProps}>
                <Typography>{cancelText}</Typography>
              </Button>
            </>
          )}
        </DialogActions>
      )}
    </MuiDialog>
  )
}
