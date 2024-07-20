import { Box, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { useQueryGetNotes } from '@shared/react-query/hooks/notes'

import { useNotesForm } from './lib'
import { StyledNotesWrapper } from './Notes.styled'
import { NotesList } from './ui'

export const Notes = observer(() => {
  const {
    tableViewStore: { currentViewDate },
  } = useStore()

  const { data: notes } = useQueryGetNotes(currentViewDate)

  const { Form: NoteForm } = useNotesForm()

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
