import { format } from 'date-fns/esm'
import { ru as ruLocale } from 'date-fns/locale'

import { RU_LOCALIZE_MONTHS } from '@shared/localization'

export const formatRu = (date: Date, pattern: string) =>
  format(date, pattern, {
    locale: {
      ...ruLocale,
      // @ts-expect-error
      localize: {
        ...ruLocale.localize,
        month: RU_LOCALIZE_MONTHS,
      },
    },
  })
