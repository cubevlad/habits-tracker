import { IconButton, Stack, Typography } from '@mui/material'
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'

export const MonthNavigator: React.FC = observer(() => {
  const {
    tableViewStore: { handleDecrement, handleIncrement, formattedDate },
  } = useStore()

  return (
    <Stack alignItems='center' direction='row' spacing={1}>
      <IconButton disableRipple onClick={handleDecrement}>
        <ArrowLeftIcon />
      </IconButton>
      <Typography variant='h6'>{formattedDate}</Typography>
      <IconButton disableRipple onClick={handleIncrement}>
        <ArrowRightIcon />
      </IconButton>
    </Stack>
  )
})
