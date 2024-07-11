import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import {
  useMutateCreateNote,
  useMutateDeleteNote,
  useQueryGetNotes,
} from '@shared/react-query/hooks/notes'

export const Notes = observer(() => {
  const {
    tableViewStore: { currentViewDate },
  } = useStore()

  const { data: notes } = useQueryGetNotes(currentViewDate)
  const { mutateAsync: mutCreateNote } = useMutateCreateNote()
  const { mutateAsync: mutDeleteNote } = useMutateDeleteNote()

  const handleCreateNote = async () => {
    await mutCreateNote({ content: 'test' })
  }

  const handleDeleteNote = async (id: string) => {
    await mutDeleteNote(id)
  }

  return (
    <>
      <button type='button' onClick={handleCreateNote}>
        Create note
      </button>
      {notes.map((note) => (
        <div key={note.id}>
          {note.content}{' '}
          <button type='button' onClick={() => handleDeleteNote(note.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  )
})
