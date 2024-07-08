import { format, getDaysInMonth } from 'date-fns/esm'
import { ru as ruLocale } from 'date-fns/locale'

import type { ItemOptions, TableViewItem } from '@shared/types'

import { formatRu } from './formatRu'

export const createTableViewItemsList = (
  currentViewDate: Date,
  options?: ItemOptions
): TableViewItem[] => {
  const daysCount = getDaysInMonth(currentViewDate)

  const list: TableViewItem[] = Array.from({ length: daysCount }, (_, index) => {
    // eslint-disable-next-line no-plusplus
    const curIndex = ++index
    const date = new Date(currentViewDate)
    const diff = curIndex - date.getDate()

    date.setDate(date.getDate() + diff)

    const fullDate = format(date, 'd MMMM yyyy', { locale: ruLocale })

    const monthName = formatRu(date, 'MMMM')
    const monthNumber = date.getMonth()

    const weekDayName = formatRu(date, 'EEEE')
    const weekDayNumber = date.getDay()
    const dayOfTheMonth = date.getDate()

    const year = Number(format(date, 'yyyy'))

    return {
      id: fullDate,
      fullDate,
      index: curIndex,
      monthName,
      year,
      monthNumber,
      weekDayName,
      weekDayNumber,
      dayOfTheMonth,
      ...options,
    }
  })

  return list
}
