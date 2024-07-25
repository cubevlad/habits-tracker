import { Close } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { TableViewItem } from '@shared/types'
import { useHabitForm } from '@shared/ui/HabitForm/lib'
import { useNotesForm } from '@shared/ui/Notes/lib'
import { NotesList } from '@shared/ui/Notes/ui'

import { StyledFormButton, StyledItemModalViewWrapper } from './ItemModalView.styled'
import { HabitsCardList } from './ui/HabitsCardList'

type ItemModalViewProps = {
  item: TableViewItem
  onClose?: () => void
}

export const ItemModalView: React.FC<ItemModalViewProps> = observer(({ item, onClose }) => {
  const {
    notesStore: { getNotesById },
    habitStore: { habits },
  } = useStore()

  const notes = getNotesById(item.id) ?? []

  const { Form: NoteForm } = useNotesForm({
    canAddNewNote: true,
    customButton: <StyledFormButton variant='outlined'>+ заметка</StyledFormButton>,
  })

  const { Form: HabitsForm } = useHabitForm({
    canAddNewHabit: true,
    customButton: <StyledFormButton variant='outlined'>+ привычка</StyledFormButton>,
  })

  return (
    <StyledItemModalViewWrapper>
      <Box sx={{ alignSelf: 'flex-end' }} onClick={onClose}>
        <Close />
      </Box>
      <Stack spacing={2}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6'>{item.id}</Typography>
          <Typography variant='h6'>{item.weekDayName}</Typography>
        </Stack>
        <Box alignSelf='flex-end'>
          <HabitsForm />
        </Box>
        <HabitsCardList habits={habits} item={item} />
        <Box alignSelf='flex-end'>
          <NoteForm createdAt={item.standardDateFormat} />
        </Box>
        <NotesList notes={notes} />
      </Stack>
    </StyledItemModalViewWrapper>
  )
})
