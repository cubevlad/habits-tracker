import { CircularProgress, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { HabitsView } from '@widgets/HabitsView'

import { useFetchHomePageData } from './lib'

export const HomePage: React.FC = observer(() => {
  const {
    notesStore: { isLoading },
  } = useStore()

  useFetchHomePageData()

  if (isLoading) {
    return (
      <Stack alignItems='center' flex='1 1 auto' justifyContent='center'>
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Stack flex='1 1 auto' spacing={2}>
      <HabitsView />
    </Stack>
  )
})
