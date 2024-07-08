import type { ViewMode } from '@shared/types'

import { VIEW_MODE } from './constants'

export const getViewMode = () =>
  JSON.parse(localStorage.getItem(VIEW_MODE) ?? 'null', (_, value) =>
    value === 'null' ? undefined : value
  ) as ViewMode | null
