import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { TableViewItem } from '@shared/types'
import { NotesList } from '@shared/ui/Notes/ui'

import { StyledItemModalViewWrapper } from './ItemModalView.styled'
import { HabitsCardList } from './ui/HabitsCardList'

type ItemModalViewProps = {
  item: TableViewItem
}

export const ItemModalView: React.FC<ItemModalViewProps> = observer(({ item }) => {
  const {
    notesStore: { getNotesById },
    habitStore: { habits },
  } = useStore()

  const notes = getNotesById(item.id) ?? []

  return (
    <StyledItemModalViewWrapper>
      <Stack spacing={5}>
        <HabitsCardList habits={habits} item={item} />
        <NotesList notes={notes} />
      </Stack>
    </StyledItemModalViewWrapper>
  )
})
