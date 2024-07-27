import { createCtx } from '@shared/lib'
import type { Habit, Note } from '@shared/types'

interface FormContext {
  NoteForm: ({ onSave }: { onSave?: () => void }) => React.ReactElement | null
  NoteFormButton: ({ disabled }: { disabled?: boolean }) => React.ReactElement | null
  isNoteFormOpen: boolean
  handleNoteFormClose: () => void
  handleNoteFormOpen: (note?: Note, createdAt?: Date | string) => void

  HabitsForm: ({ onSave }: { onSave?: () => void }) => React.ReactElement | null
  HabitsFormButton: ({ disabled }: { disabled?: boolean }) => React.ReactElement | null
  isHabitsFormOpen: boolean
  handleHabitsFormClose: () => void
  handleHabitsFormOpen: (habit?: Habit) => void
}

export const [useFormCtx, FormContextProvider] = createCtx<FormContext>()
