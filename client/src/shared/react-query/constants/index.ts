import { mergeQueryKeys } from '@lukemorales/query-key-factory'

import { notesKeys } from './notesKeys'

export const queryKeys = mergeQueryKeys(notesKeys)
