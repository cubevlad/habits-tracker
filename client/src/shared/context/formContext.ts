import { createCtx } from '@shared/lib'
import type { Habit, Note } from '@shared/types'

interface FormContext {
  NoteForm: () => React.ReactElement | null
  NoteFormButton: React.ReactElement
  isNoteFormOpen: boolean
  handleNoteFormClose: () => void
  handleNoteFormOpen: (note?: Note, createdAt?: Date | string) => void

  HabitsForm: () => React.ReactElement | null
  HabitsFormButton: React.ReactElement
  isHabitsFormOpen: boolean
  handleHabitsFormClose: () => void
  handleHabitsFormOpen: (habit?: Habit) => void
}

export const [useFormCtx, FormContextProvider] = createCtx<FormContext>()
