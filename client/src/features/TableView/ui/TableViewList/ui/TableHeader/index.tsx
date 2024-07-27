import { observer } from 'mobx-react-lite'

import { StyledTableHeader, StyledTableRow, StyledTableTh } from '@styles'

type Base = {
  shortWeekDayName: string
  id: string
  dayOfTheMonth: number
  isCurrent: boolean
}

type ColgroupProps<T extends Base> = {
  list: T[]
}

export const TableHeader = observer(<T extends Base>({ list }: ColgroupProps<T>) => {
  return (
    <StyledTableHeader>
      <StyledTableRow>
        <StyledTableTh rowSpan={2}>Привычки</StyledTableTh>
        {list.map(({ id, shortWeekDayName, isCurrent }) => (
          <StyledTableTh key={id} $isCurrent={isCurrent}>
            {shortWeekDayName}
          </StyledTableTh>
        ))}
        <StyledTableTh rowSpan={2}>Цель</StyledTableTh>
        <StyledTableTh rowSpan={2}>Выполнено</StyledTableTh>
      </StyledTableRow>
      <StyledTableRow>
        {list.map(({ id, dayOfTheMonth, isCurrent }) => (
          <StyledTableTh key={id} $isCurrent={isCurrent}>
            {dayOfTheMonth}
          </StyledTableTh>
        ))}
      </StyledTableRow>
    </StyledTableHeader>
  )
})
