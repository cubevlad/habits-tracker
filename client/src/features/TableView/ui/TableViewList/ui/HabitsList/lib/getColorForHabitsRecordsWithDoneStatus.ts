import { COLORS_LENGTH, DARK_COLORS, LIGHT_COLORS } from '@shared/constants'

export const getColorForHabitsRecordsWithDoneStatus = (mode: 'dark' | 'light', index: number) =>
  mode === 'light' ? LIGHT_COLORS[index % COLORS_LENGTH] : DARK_COLORS[index % COLORS_LENGTH]
