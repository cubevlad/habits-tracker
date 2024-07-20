import { useState } from 'react'

import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { formatRu } from '@shared/lib'
import { useMutateDeleteNote } from '@shared/react-query/hooks/notes'
import type { Note } from '@shared/types'

import { StyledNoteListItem, StyledNoteListItemHeader } from './NoteListItem.styled'

import { useNotesForm } from '../../../../lib'

type NoteListItemProps = {
  note: Note
}

export const NoteListItem: React.FC<NoteListItemProps> = observer(({ note }) => {
  const [isVisible, setIsVisible] = useState(false)

  const { Form: NoteForm, handleOpen } = useNotesForm(note)

  const { mutateAsync: mutDeleteNote } = useMutateDeleteNote()

  const handleDeleteNote = async (id: string) => {
    await mutDeleteNote(id)
  }

  const createdAt = formatRu(new Date(note.createdAt), 'd MMMM yyyy', false)

  return (
    <StyledNoteListItem
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <StyledNoteListItemHeader direction='row' spacing={1}>
        <Typography flex='1 1 auto' variant='body2'>
          {createdAt}
        </Typography>
        {isVisible ? (
          <IconButton size='small' onClick={handleOpen}>
            <Edit fontSize='small' />
          </IconButton>
        ) : null}
        {isVisible ? (
          <IconButton size='small' onClick={() => handleDeleteNote(note.id)}>
            <Delete fontSize='small' />
          </IconButton>
        ) : null}
      </StyledNoteListItemHeader>
      <Stack direction='row' spacing={1}>
        <Box flex='1 1 auto'>{note.content}</Box>
      </Stack>
      <NoteForm />
    </StyledNoteListItem>
  )
})
