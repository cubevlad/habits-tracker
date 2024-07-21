import { useEffect } from 'react'

import { useStore } from '@shared/context'

export const useFetchHomePageData = () => {
  const {
    tableViewStore: { currentViewDate },
    notesStore: { fetchNotes },
  } = useStore()

  useEffect(() => {
    fetchNotes(currentViewDate)
  }, [currentViewDate, fetchNotes])
}
