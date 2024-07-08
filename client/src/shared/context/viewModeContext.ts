import { createCtx } from '@shared/lib'
import type { ViewMode } from '@shared/types'

type ViewModeProviderProps = {
  handleChangeViewMode: (viewMode: Partial<ViewMode>) => void
  mode: ViewMode
}

export const [useViewModeCtx, ViewModeProvider] = createCtx<ViewModeProviderProps>()
