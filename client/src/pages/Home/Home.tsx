import { Stack } from '@mui/material'

import { HabitsTableView } from '@widgets/HabitsTableView'
import { Notes } from '@widgets/Notes'

export const HomePage: React.FC = () => {
  return (
    <Stack alignItems='center' flex='1 1 auto'>
      <HabitsTableView />
      <Notes />
    </Stack>
  )
}
