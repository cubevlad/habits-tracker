import { CircularProgress, Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore, useViewModeCtx } from '@shared/context'
import { getCurrentViewMode } from '@shared/lib'
import { Notes } from '@shared/ui'
import { HabitsView } from '@widgets/HabitsView'

import { useFetchHomePageData } from './lib'

export const HomePage: React.FC = observer(() => {
  const {
    notesStore: { isLoading },
  } = useStore()

  const { mode } = useViewModeCtx()
  const { isTableView } = getCurrentViewMode(mode)

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
      {isTableView ? <Notes /> : null}
    </Stack>
  )
})
