import { Box, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'

import { useNotesForm } from './lib'
import { StyledNotesWrapper } from './Notes.styled'
import { NotesList } from './ui'

export const Notes: React.FC = observer(() => {
  const {
    notesStore: { notes },
  } = useStore()

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
