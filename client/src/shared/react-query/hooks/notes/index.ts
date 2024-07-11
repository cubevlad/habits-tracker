import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns/esm'

import { api } from '@shared/api'
import { getFirstAndLastDayOfMonth } from '@shared/lib'
import { queryKeys } from '@shared/react-query/constants'

export const useQueryGetNotes = (date: Date) => {
  const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(date)
  const formattedFirst = format(firstDayOfMonth, 'yyyy-MM-dd')
  const formattedLast = format(lastDayOfMonth, 'yyyy-MM-dd')

  return useQuery({
    queryKey: queryKeys.notes.all(formattedFirst, formattedLast).queryKey,
    queryFn: async () =>
      api.notesService.notes.getNotes({ start_date: formattedFirst, end_date: formattedLast }),
    initialData: [],
  })
}

export const useMutateCreateNote = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: api.notesService.notes.createNote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: queryKeys.notes.all._def })
    },
  })
}

export const useMutateDeleteNote = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: api.notesService.notes.deleteNote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: queryKeys.notes.all._def })
    },
  })
}
