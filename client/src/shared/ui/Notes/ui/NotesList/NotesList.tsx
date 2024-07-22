import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import type { Note } from '@shared/types'

import { NoteListItem } from './ui/NoteListItem'

type NotesListProps = {
  notes: Note[]
}

export const NotesList: React.FC<NotesListProps> = observer(({ notes }) => {
  if (!notes.length) {
    return <Typography>Нет заметок</Typography>
  }

  return (
    <Stack spacing={2}>
      {notes.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </Stack>
  )
})