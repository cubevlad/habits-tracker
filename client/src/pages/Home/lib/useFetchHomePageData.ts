import { useEffect } from 'react'

import { useStore } from '@shared/context'

export const useFetchHomePageData = () => {
  const {
    tableViewStore: { currentViewDate },
    notesStore: { fetchNotes },
    habitStore: { fetchHabits },
  } = useStore()

  useEffect(() => {
    fetchNotes(currentViewDate)
  }, [currentViewDate, fetchNotes])

  useEffect(() => {
    fetchHabits(currentViewDate)
  }, [currentViewDate, fetchHabits])
}
