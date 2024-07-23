import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { TableViewItem } from '@shared/types'
import {
  StyledTableViewListWrapper,
  StyledTableWrapper,
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableTh,
  StyledTableBody,
  StyledTableTd,
} from '@styles'

import { EmptyTableBody, HabitsList, HabitForm } from './ui'

type TableViewListProps = {
  list: TableViewItem[]
}

export const TableViewList: React.FC<TableViewListProps> = observer(({ list }) => {
  const {
    habitStore: { habits },
  } = useStore()

  console.log({ list })

  return (
    <StyledTableViewListWrapper spacing={4}>
      <StyledTableWrapper>
        <StyledTable>
          <colgroup>
            <col key='name' width='5px' />
            {list.map(({ id }) => (
              <col key={id} width='1px' />
            ))}
            <col key='goal' width='2px' />
            <col key='done' width='3px' />
          </colgroup>
          <StyledTableHeader>
            <StyledTableRow>
              <StyledTableTh rowSpan={2}>Привычки</StyledTableTh>
              {list.map(({ id, shortWeekDayName }) => (
                <StyledTableTh key={id}>{shortWeekDayName}</StyledTableTh>
              ))}
              <StyledTableTh rowSpan={2}>Цель</StyledTableTh>
              <StyledTableTh rowSpan={2}>Выполнено</StyledTableTh>
            </StyledTableRow>
            <StyledTableRow>
              {list.map(({ id, dayOfTheMonth }) => (
                <StyledTableTh key={id}>{dayOfTheMonth}</StyledTableTh>
              ))}
            </StyledTableRow>
          </StyledTableHeader>
          <StyledTableBody>
            {!habits.length ? (
              <>
                <StyledTableRow />
                <StyledTableRow>
                  <StyledTableTd colSpan={list.length + 3}>
                    <EmptyTableBody />
                  </StyledTableTd>
                </StyledTableRow>
              </>
            ) : (
              <HabitsList daysLength={list.length} habits={habits} />
            )}
          </StyledTableBody>
        </StyledTable>
      </StyledTableWrapper>
      <HabitForm />
    </StyledTableViewListWrapper>
  )
})
