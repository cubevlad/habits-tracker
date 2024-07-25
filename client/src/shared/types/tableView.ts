import type { Note } from './notes'

export type ItemOptions = {
  disabled?: boolean
}

type Item = {
  id: string
  index: number
  fullDate: Date | string
  standardDateFormat: Date
  dayOfTheMonth: number
  weekDayNumber: number
  weekDayName: string
  monthNumber: number
  monthName: string
  shortWeekDayName: string
  year: number
  isCurrent: boolean
  notes?: Note[]
}

export type TableViewItem = Item & {
  [K in keyof ItemOptions]: ItemOptions[K]
}
