import type { NoteForm } from './types'

export const DEFAULT_NOTE_FORM_VALUES: NoteForm = {
  content: '',
  createdAt: String(new Date(Date.now())),
}
