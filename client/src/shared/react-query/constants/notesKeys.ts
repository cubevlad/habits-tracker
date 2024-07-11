import { createQueryKeys } from '@lukemorales/query-key-factory'

export const notesKeys = createQueryKeys('notes', {
  all: (from: string, to: string) => [from, to],
})
