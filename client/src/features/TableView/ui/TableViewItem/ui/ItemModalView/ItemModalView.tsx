import { Stack, Typography } from '@mui/material'

import type { TableViewItem } from '@shared/types'

import { StyledItemModalViewWrapper } from './ItemModalView.styled'

type ItemModalViewProps = {
  item: TableViewItem
}

export const ItemModalView: React.FC<ItemModalViewProps> = ({ item }) => {
  const hasNotes = !!item.notes?.length

  return (
    <StyledItemModalViewWrapper>
      <Stack spacing={2}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6'>{item.id}</Typography>
          <Typography variant='h6'>{item.weekDayName}</Typography>
        </Stack>
        {hasNotes
          ? item.notes?.map((note) => <Typography key={note.id}> {note.content} </Typography>)
          : null}
        {hasNotes ? null : <Typography> Заметок не найдено </Typography>}
      </Stack>
    </StyledItemModalViewWrapper>
  )
}
