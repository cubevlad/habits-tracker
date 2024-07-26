import { Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'

import { StyledNotesWrapper } from './Notes.styled'
import { NotesList } from './ui'

export const Notes: React.FC = observer(() => {
  const {
    notesStore: { notes },
  } = useStore()

  return (
    <StyledNotesWrapper>
      <Typography mb={2} variant='h5'>
        Заметки
      </Typography>
      <NotesList notes={notes} />
    </StyledNotesWrapper>
  )
})
