import type { ColorModeType } from '@shared/types'

import { COLOR_MODE } from './constants'

export const getColorMode = () => localStorage.getItem(COLOR_MODE) as ColorModeType | null
