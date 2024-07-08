import type { ViewMode } from '@shared/types'

export const VIEW_DATE_MODE: ViewMode['date'][] = ['month', 'week']
export const VIEW_TYPE_MODE: ViewMode['type'][] = ['row', 'table']

export const RU_LOCALE_VIEW_MODE_MAP = {
  month: 'Месяц',
  week: 'Неделя',
  year: 'Год',
  row: 'Список',
  table: 'Таблица',
}
