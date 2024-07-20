import { Stack } from '@mui/material'

import { HabitsTableView } from '@widgets/HabitsTableView'
import { Notes } from '@widgets/Notes'

export const HomePage: React.FC = () => {
  return (
    <Stack flex='1 1 auto' spacing={2}>
      <Stack alignItems='center' flex='1 1 auto' maxHeight={800} minHeight={800}>
        <HabitsTableView />
      </Stack>
      <Notes />
    </Stack>
  )
}
