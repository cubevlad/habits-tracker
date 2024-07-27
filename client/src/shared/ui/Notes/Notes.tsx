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
      <NotesList notes={notes} />
    </StyledNotesWrapper>
  )
})
