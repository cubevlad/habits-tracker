import { Stack } from '@mui/material'

import { useViewModeCtx } from '@shared/context'
import { HabitsView } from '@widgets/HabitsView'
import { Notes } from '@widgets/Notes'

export const HomePage: React.FC = () => {
  const { mode } = useViewModeCtx()

  const isTableView = mode.type === 'table'

  return (
    <Stack flex='1 1 auto' spacing={2}>
      <Stack alignItems='center' flex='1 1 auto' maxHeight={800} minHeight={800}>
        <HabitsView mode={mode} />
      </Stack>
      {isTableView ? <Notes /> : null}
    </Stack>
  )
}
