import { useEffect } from 'react'

import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'

import { useNotesForm } from './lib'
import { StyledNotesWrapper } from './Notes.styled'
import { NotesList } from './ui'

export const Notes = observer(() => {
  const {
    tableViewStore: { currentViewDate },
    notesStore: { notes, fetchNotes, isLoading },
  } = useStore()

  useEffect(() => {
    fetchNotes(currentViewDate)
  }, [currentViewDate, fetchNotes])

  const { Form: NoteForm } = useNotesForm()

  if (isLoading) {
    return (
      <Stack alignItems='center'>
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <StyledNotesWrapper>
      <Box alignSelf='flex-end'>
        <NoteForm />
      </Box>
      <Typography mb={2} variant='h5'>
        Заметки
      </Typography>
      <NotesList notes={notes} />
    </StyledNotesWrapper>
  )
})
