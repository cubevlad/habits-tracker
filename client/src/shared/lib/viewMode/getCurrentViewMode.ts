import type { ViewMode } from '@shared/types'

export const getCurrentViewMode = (mode: ViewMode) => {
  return {
    isTableView: mode.type === 'table',
    isCardsView: mode.type === 'cards',
  }
}
