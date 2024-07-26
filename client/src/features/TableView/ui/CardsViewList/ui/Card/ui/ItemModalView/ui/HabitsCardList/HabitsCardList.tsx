import { Stack, Typography } from '@mui/material'

import type { Habit, TableViewItem } from '@shared/types'

import { HabitsCardListItem } from './ui'

type HabitsCardListProps = {
  habits: Habit[]
  item: TableViewItem
}

export const HabitsCardList: React.FC<HabitsCardListProps> = ({ habits, item }) => {
  return (
    <Stack spacing={1}>
      <Typography variant='h6'>Привычки</Typography>
      <Stack spacing={2}>
        {habits.length === 0 ? <Typography variant='body1'>Нет привычек</Typography> : null}
        {habits.map((habit) => (
          <HabitsCardListItem key={habit.id} habit={habit} item={item} />
        ))}
      </Stack>
    </Stack>
  )
}
