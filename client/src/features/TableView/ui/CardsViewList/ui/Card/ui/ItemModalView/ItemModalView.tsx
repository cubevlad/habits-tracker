import { Stack, Typography } from '@mui/material'

import { useStore } from '@shared/context'
import type { TableViewItem } from '@shared/types'
import { NotesList } from '@shared/ui/Notes/ui'

import { StyledItemModalViewWrapper } from './ItemModalView.styled'

type ItemModalViewProps = {
  item: TableViewItem
}

export const ItemModalView: React.FC<ItemModalViewProps> = ({ item }) => {
  const {
    notesStore: { getNotesById },
  } = useStore()

  const notes = getNotesById(item.id) ?? []

  return (
    <StyledItemModalViewWrapper>
      <Stack spacing={2}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6'>{item.id}</Typography>
          <Typography variant='h6'>{item.weekDayName}</Typography>
        </Stack>
        <NotesList notes={notes} />
      </Stack>
    </StyledItemModalViewWrapper>
  )
}
