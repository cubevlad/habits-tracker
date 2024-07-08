// @ts-expect-error
import buildLocalizeFn from 'date-fns/locale/_lib/buildLocalizeFn'

export const RU_MONTH = {
  narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
  abbreviated: [
    'янв.',
    'фев.',
    'март',
    'апр.',
    'май',
    'июнь',
    'июль',
    'авг.',
    'сент.',
    'окт.',
    'нояб.',
    'дек.',
  ],
  wide: [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ],
}

export const RU_LOCALIZE_MONTHS = buildLocalizeFn({
  values: RU_MONTH,
  defaultWidth: 'wide',
  defaultFormattingWidth: 'wide',
})
