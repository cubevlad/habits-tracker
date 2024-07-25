import { format, getDaysInMonth } from 'date-fns/esm'
import { ru as ruLocale } from 'date-fns/locale'

import type { ItemOptions, TableViewItem } from '@shared/types'

import { formatRu } from './date/formatRu'

type CreateTableViewItemsListOptions = {
  initialViewDate: Date
  currentViewDate: Date
  options?: ItemOptions
}

export const createTableViewItemsList = ({
  initialViewDate,
  currentViewDate,
  options,
}: CreateTableViewItemsListOptions): TableViewItem[] => {
  const daysCount = getDaysInMonth(currentViewDate)

  const list: TableViewItem[] = Array.from({ length: daysCount }, (_, index) => {
    // eslint-disable-next-line no-plusplus
    const curIndex = ++index
    const date = new Date(currentViewDate)
    const diff = curIndex - date.getDate()

    date.setDate(date.getDate() + diff)

    const fullDate = format(date, 'd MMMM yyyy', { locale: ruLocale })
    const standardDateFormat = new Date(date)

    const monthName = formatRu(date, 'MMMM')
    const monthNumber = date.getMonth()

    const weekDayName = formatRu(date, 'EEEE')
    const shortWeekDayName = formatRu(date, 'EEEEE')
    const weekDayNumber = date.getDay()
    const dayOfTheMonth = date.getDate()

    const year = Number(format(date, 'yyyy'))

    const isDaysAreEqual = initialViewDate.getDate() === dayOfTheMonth
    const isMonthsAreEqual = initialViewDate.getMonth() === monthNumber
    const isCurrent = isDaysAreEqual && isMonthsAreEqual

    return {
      id: fullDate,
      standardDateFormat,
      fullDate,
      index: curIndex,
      monthName,
      year,
      monthNumber,
      weekDayName,
      weekDayNumber,
      dayOfTheMonth,
      shortWeekDayName,
      isCurrent,
      ...options,
    }
  })

  return list
}
