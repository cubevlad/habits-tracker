import { useMutateDeleteNote } from "@shared/react-query/hooks/notes";
import type { Note } from "@shared/types";
import { observer } from "mobx-react-lite";

type NotesListProps = {
  currentViewDate: Date
  notes: Note[]
}

export const NotesList: React.FC<NotesListProps> = observer(({ currentViewDate, notes }) => {
  const handleDeleteNote = async (id: string) => {
    await useMutateDeleteNote(id)
  }

  return {
    notes.map((note) => (
      <div key={note.id}>
        {note.content}
        <button type='button' onClick={() => handleDeleteNote(note.id)}>
          Delete
        </button>
      </div>
    ))
  }
})
