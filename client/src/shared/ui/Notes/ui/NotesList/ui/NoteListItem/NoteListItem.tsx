import { useState } from 'react'

import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useFormCtx, useStore } from '@shared/context'
import { formatRu } from '@shared/lib'
import type { Note } from '@shared/types'

import { ICON_SX } from './lib'
import { StyledNoteListItem, StyledNoteListItemHeader } from './NoteListItem.styled'

type NoteListItemProps = {
  note: Note
}

export const NoteListItem: React.FC<NoteListItemProps> = observer(({ note }) => {
  const createdAt = formatRu(new Date(note.createdAt), 'd MMMM yyyy', false)

  const [isVisible, setIsVisible] = useState(false)

  const {
    notesStore: { deleteNote },
  } = useStore()

  const { handleNoteFormOpen } = useFormCtx()

  const handleDeleteNote = async () => {
    await deleteNote(note.id, note.createdAt)
  }

  const handleMouseEnter = () => setIsVisible(true)
  const handleMouseLeave = () => setIsVisible(false)

  const handleClick = () => handleNoteFormOpen(note, createdAt)

  return (
    <StyledNoteListItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <StyledNoteListItemHeader direction='row' spacing={1}>
        <Typography flex='1 1 auto' variant='body2'>
          {createdAt}
        </Typography>
        {isVisible ? (
          <IconButton size='small' onClick={handleClick}>
            <Edit fontSize='inherit' sx={ICON_SX} />
          </IconButton>
        ) : null}
        {isVisible ? (
          <IconButton size='small' onClick={handleDeleteNote}>
            <Delete fontSize='small' sx={ICON_SX} />
          </IconButton>
        ) : null}
      </StyledNoteListItemHeader>
      <Stack direction='row' spacing={1}>
        <Box flex='1 1 auto'>{note.content}</Box>
      </Stack>
    </StyledNoteListItem>
  )
})
