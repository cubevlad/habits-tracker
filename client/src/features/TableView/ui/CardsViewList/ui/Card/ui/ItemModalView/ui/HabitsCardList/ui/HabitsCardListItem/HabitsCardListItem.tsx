import { Delete, Edit } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { Habit, TableViewItem } from '@shared/types'
import { useHabitForm } from '@shared/ui/HabitForm/lib'

import { StyledHabitsCardListItem, StyledIconsWrapper } from './HabitsCardListItem.styled'

type HabitsCardListItemProps = {
  habit: Habit
  item: TableViewItem
}

export const HabitsCardListItem: React.FC<HabitsCardListItemProps> = observer(({ habit, item }) => {
  const {
    habitStore: { flatHabitsWithFlatRecordsList, updateHabitRecord, deleteHabit },
  } = useStore()

  const { Form, handleOpen: handleFormOpen } = useHabitForm({ habit })

  const currentRecord = flatHabitsWithFlatRecordsList[habit.id][item.habitRecordId]

  const handleCheck = async () => {
    await updateHabitRecord({ ...currentRecord, done: !currentRecord.done })
  }

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    handleFormOpen()
  }

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    await deleteHabit(habit.id)
  }

  return (
    <StyledHabitsCardListItem $achieved={currentRecord.done} direction='row' onClick={handleCheck}>
      <Typography variant='body1'>{habit.name}</Typography>
      <StyledIconsWrapper direction='row'>
        <Box onClick={handleEdit}>
          <Edit />
        </Box>
        <Box onClick={handleDelete}>
          <Delete />
        </Box>
      </StyledIconsWrapper>
      <Form />
    </StyledHabitsCardListItem>
  )
})
