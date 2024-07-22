import { Box, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { TableViewItem } from '@shared/types'
import { useNotesForm } from '@shared/ui/Notes/lib'
import { NotesList } from '@shared/ui/Notes/ui'

import { StyledItemModalViewWrapper } from './ItemModalView.styled'

type ItemModalViewProps = {
  item: TableViewItem
}

export const ItemModalView: React.FC<ItemModalViewProps> = observer(({ item }) => {
  const {
    notesStore: { getNotesById },
  } = useStore()

  const notes = getNotesById(item.id) ?? []

  const { Form: NoteForm } = useNotesForm({
    canAddNewNote: true,
  })

  return (
    <StyledItemModalViewWrapper>
      <Stack spacing={2}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6'>{item.id}</Typography>
          <Typography variant='h6'>{item.weekDayName}</Typography>
        </Stack>
        <Box alignSelf='flex-end'>
          <NoteForm createdAt={item.standardDateFormat} />
        </Box>
        <NotesList notes={notes} />
      </Stack>
    </StyledItemModalViewWrapper>
  )
})
