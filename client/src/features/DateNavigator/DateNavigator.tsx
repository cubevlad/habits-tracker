import { Box, IconButton, Stack, Typography } from '@mui/material'
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'

export const DateNavigator: React.FC = observer(() => {
  const {
    tableViewStore: { handleDecrementMonth, handleIncrementMonth, formattedDate },
  } = useStore()

  return (
    <Box alignItems='center' display='flex' flexDirection='column' gap={1} justifyContent='center'>
      <Stack alignItems='center' direction='row' spacing={1}>
        <IconButton disableRipple onClick={handleDecrementMonth}>
          <ArrowLeftIcon />
        </IconButton>
        <Typography variant='h6'>{formattedDate}</Typography>
        <IconButton disableRipple onClick={handleIncrementMonth}>
          <ArrowRightIcon />
        </IconButton>
      </Stack>
    </Box>
  )
})
