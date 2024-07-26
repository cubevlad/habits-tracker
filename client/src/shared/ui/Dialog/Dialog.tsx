import CloseIcon from '@mui/icons-material/Close'
import type { ButtonProps } from '@mui/material'
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

  return (
    <MuiDialog
      aria-describedby='scroll-dialog-description'
      aria-labelledby='scroll-dialog-title'
      open={open}
      PaperProps={{
        sx: {
          height: '100%',
          width: '100%',
        },
      }}
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
